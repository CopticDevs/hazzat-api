import { inject, injectable } from "inversify";
import * as Sql from "mssql";
import { IConfiguration } from "../../Common/Configuration";
import { ErrorCodes, HazzatApplicationError } from "../../Common/Errors";
import { FormatType } from "../../Common/Types/FormatType";
import { StringMap } from "../../Common/Types/StringMap";
import { SqlHelpers } from "../../Common/Utils/SqlHelpers";
import { ISeasonInfo } from "../../Models/ISeasonInfo";
import { IServiceInfo } from "../../Models/IServiceInfo";
import { TYPES } from "../../types";
import { IDataProvider } from "../IDataProvider";
import { HazzatDbSchema } from "./HazzatDbSchema";
import ConnectionPool = Sql.ConnectionPool;

/*
 * Sql Data Provider
 */
@injectable()
export class SqlDataProvider implements IDataProvider {
    private static connectionPool: ConnectionPool;
    private static configuration: IConfiguration;

    private static convertSeasonDbItemToSeasonInfo(seasonDbItem: HazzatDbSchema.ISeason): ISeasonInfo {
        return {
            id: seasonDbItem.ItemId,
            isDateSpecific: seasonDbItem.Date_Specific,
            name: seasonDbItem.Name,
            order: seasonDbItem.Season_Order,
            reasonId: seasonDbItem.Reason_ID,
            reasonName: seasonDbItem.Reason_Name,
            verse: seasonDbItem.Verse
        };
    }

    private static convertServiceDbItemToServiceInfo(serviceDbItem: HazzatDbSchema.IService): IServiceInfo {
        const contentCount: StringMap<number> = {};
        contentCount[FormatType.Text] = serviceDbItem.Text_Count;
        contentCount[FormatType.Hazzat] = serviceDbItem.Hazzat_Count;
        contentCount[FormatType.VerticalHazzat] = serviceDbItem.VerticalHazzat_Count;
        contentCount[FormatType.Music] = serviceDbItem.Music_Count;
        contentCount[FormatType.Audio] = serviceDbItem.Audio_Count;
        contentCount[FormatType.Video] = serviceDbItem.Video_Count;
        contentCount[FormatType.Information] = serviceDbItem.Information_Count;

        return {
            contentCount,
            id: serviceDbItem.ItemId,
            name: serviceDbItem.Structure_Name,
            order: serviceDbItem.Service_Order
        };
    }

    private tablePrefix: string = "Hymns_";

    constructor(
        @inject(TYPES.IConfiguration) configuration: IConfiguration
    ) {
        SqlDataProvider.configuration = configuration;
    }

    public async getConnectionPool(): Promise<ConnectionPool> {
        if (SqlDataProvider.connectionPool) {
            console.log("getConnectionPool: Connection pool already initialized.");
            return SqlDataProvider.connectionPool;
        }

        try {
            console.log("getConnectionPool: Initializing Connection pool singleton.");
            SqlDataProvider.connectionPool =
                await new ConnectionPool(SqlDataProvider.configuration.dbConnectionString).connect();
            console.log("Established SQL connection");
            return SqlDataProvider.connectionPool;
        } catch (ex) {
            console.log("Unable to establish Sql connection: " + JSON.stringify(ex));
            throw ex;
        }
    }

    public async getSeasonList(): Promise<ISeasonInfo[]> {
        return this._connectAndExecute(async (cp: ConnectionPool) => {
            const result = await cp.request()
                .execute(this._getQualifiedName("SeasonListSelectAll"));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(ErrorCodes[ErrorCodes.DatabaseError], "Unexpected database error");
            }

            const seasons: ISeasonInfo[] = result.recordsets[0]
                .map((row) => SqlDataProvider.convertSeasonDbItemToSeasonInfo(row));
            return seasons;
        });
    }

    public async getSeason(seasonId: string): Promise<ISeasonInfo> {
        return this._connectAndExecute(async (cp: ConnectionPool) => {
            if (!SqlHelpers.isValidPositiveIntParameter(seasonId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid season id specified.",
                    `Season id: '${seasonId}'`);
            }
            const result = await cp.request()
                .input("ID", Sql.Int, seasonId)
                .execute(this._getQualifiedName("SeasonSelect"));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.DatabaseError],
                    "Unexpected database error");
            }

            const row = result.recordsets[0][0];
            if (!row) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.NotFoundError],
                    `Unable to find Season with id '${seasonId}'`);
            }
            return SqlDataProvider.convertSeasonDbItemToSeasonInfo(row);
        });
    }

    public async getSeasonServices(seasonId: string): Promise<IServiceInfo[]> {
        return this._connectAndExecute<IServiceInfo[]>(async (cp: ConnectionPool) => {
            if (!SqlHelpers.isValidPositiveIntParameter(seasonId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid season id specified.",
                    `Season id: '${seasonId}'`);
            }
            const result = await cp.request()
                .input("Season_ID", Sql.Int, seasonId)
                .execute(this._getQualifiedName("SeasonServicesSelect"));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.DatabaseError],
                    "Unexpected database error");
            }

            const services: IServiceInfo[] = result.recordsets[0]
                .map((row) => SqlDataProvider.convertServiceDbItemToServiceInfo(row));
            return services;

        });
    }

    /**
     * Helper method to create connection, execute the given action, then close the connection
     * @param action
     */
    private async _connectAndExecute<TResult>(action: (cp: ConnectionPool) => Promise<TResult>): Promise<TResult> {
        let connection: ConnectionPool;
        try {
            connection = await this.getConnectionPool();
            if (!connection.connected) {
                console.log("_connectAndExecute: Establishing sql connection");
                await connection.connect();
            }

            console.log("_connectAndExecute: Sql connection established.  Executing action");
            return await action(connection);
        } catch (ex) {
            console.log("_connectAndExecute error occured: " + JSON.stringify(ex));
            throw ex;
        } finally {
            console.log("_connectAndExecute: Action successfully executed.  Closing SQL connection");
            await connection.close();
            console.log("_connectAndExecute: SQL connection successfully closed");
        }
    }

    private _getQualifiedName(sp: string): string {
        return `${this.tablePrefix}${sp}`;
    }
}
