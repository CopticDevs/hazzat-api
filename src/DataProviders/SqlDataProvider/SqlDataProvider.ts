import { inject, injectable } from "inversify";
import * as Sql from "mssql";
import { IConfiguration } from "../../Common/Configuration";
import { ErrorCodes, HazzatApplicationError } from "../../Common/Errors";
import { FormatType } from "../../Common/Types/FormatType";
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
    private static connectionPool: Promise<ConnectionPool>;

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
        SqlDataProvider.connectionPool = new ConnectionPool(configuration.dbConnectionString).connect()
            .then((value) => {
                console.debug("Established SQL connection");
                return value;
            }).catch((ex) => {
                console.debug("Unable to establish Sql connection: " + JSON.stringify(ex));
                throw ex;
            });
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
        const connection = await SqlDataProvider.connectionPool;
        if (!connection.connected) {
            await connection.connect();
        }

        try {
            return await action(connection);
        } finally {
            await connection.close();
        }
    }

    private _getQualifiedName(sp: string): string {
        return `${this.tablePrefix}${sp}`;
    }
}
