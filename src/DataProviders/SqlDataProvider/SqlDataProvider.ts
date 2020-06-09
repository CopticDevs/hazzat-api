import { inject, injectable } from "inversify";
import * as Sql from "mssql";
import { IConfiguration } from "../../Common/Configuration";
import { ErrorCodes, HazzatApplicationError } from "../../Common/Errors";
import { Log } from "../../Common/Utils/Logger";
import { SqlHelpers } from "../../Common/Utils/SqlHelpers";
import { ISeasonInfo } from "../../Models/ISeasonInfo";
import { IServiceHymnInfo } from "../../Models/IServiceHymnInfo";
import { IServiceInfo } from "../../Models/IServiceInfo";
import { IServiceHymnFormatInfo } from "../../Models/IServiceHymnFormatInfo";
import { TYPES } from "../../types";
import { IDataProvider } from "../IDataProvider";
import { HazzatDbSchema } from "./HazzatDbSchema";
import { Constants } from "./SqlConstants";
import ConnectionPool = Sql.ConnectionPool;

/*
 * Sql Data Provider
 */
@injectable()
export class SqlDataProvider implements IDataProvider {
    private static convertSeasonDbItemToSeasonInfo(seasonDbItem: HazzatDbSchema.ISeason): ISeasonInfo {
        return {
            id: seasonDbItem.ItemId,
            isDateSpecific: seasonDbItem.Date_Specific,
            name: seasonDbItem.Name,
            order: seasonDbItem.Season_Order,
            verse: seasonDbItem.Verse
        };
    }

    private static convertServiceDbItemToServiceInfo(serviceDbItem: HazzatDbSchema.IService): IServiceInfo {
        return {
            id: serviceDbItem.ItemId,
            seasonId: serviceDbItem.Season_ID,
            seasonName: serviceDbItem.Season_Name,
            name: serviceDbItem.Service_Name,
            order: serviceDbItem.Service_Order
        };
    }

    private static convertServiceHymnDbItemToServiceHymnInfo(
        serviceHymnDbItem: HazzatDbSchema.IServiceHymn
    ): IServiceHymnInfo {
        return {
            id: serviceHymnDbItem.ItemId,
            name: serviceHymnDbItem.Title,
            seasonId: serviceHymnDbItem.Season_ID,
            seasonName: serviceHymnDbItem.Season_Name,
            serviceId: serviceHymnDbItem.Service_ID,
            serviceName: serviceHymnDbItem.Service_Name,
            order: serviceHymnDbItem.Hymn_Order
        };
    }

    public static convertServiceHymnFormatDbItemToServiceHymnFormatInfo(
        serviceHymnFormatDbItem: HazzatDbSchema.IServiceHymnFormat
    ): IServiceHymnFormatInfo {
        return {
            id: serviceHymnFormatDbItem.ItemId,
            name: serviceHymnFormatDbItem.Format_Name,
            seasonId: serviceHymnFormatDbItem.Season_ID,
            seasonName: serviceHymnFormatDbItem.Season_Name,
            serviceId: serviceHymnFormatDbItem.Service_ID,
            serviceName: serviceHymnFormatDbItem.Service_Name,
            order: serviceHymnFormatDbItem.ItemId,
            serviceHymnId: serviceHymnFormatDbItem.ServiceHymn_ID,
            serviceHymnName: serviceHymnFormatDbItem.ServiceHymn_Title,
            formatCount: serviceHymnFormatDbItem.Format_Count
        };
    }

    private connectionPool: ConnectionPool;
    private configuration: IConfiguration;
    private tablePrefix: string = "Hymns_";

    constructor(
        @inject(TYPES.IConfiguration) configuration: IConfiguration
    ) {
        this.configuration = configuration;
    }

    public getConnectionPool(): ConnectionPool {
        if (this.connectionPool) {
            Log.verbose("SqlDataProvider", "getConnectionPool", "Connection pool already initialized.");
            return this.connectionPool;
        }

        try {
            Log.verbose("SqlDataProvider", "getConnectionPool", "Initializing Connection pool singleton.");
            this.connectionPool = new ConnectionPool(this.configuration.dbConnectionString);
            return this.connectionPool;
        } catch (ex) {
            Log.error(
                "SqlDataProvider",
                "getConnectionPool",
                "Unable to initialize SQL connection pool: " + JSON.stringify(ex));
            throw ex;
        }
    }

    public async getSeasonList(): Promise<ISeasonInfo[]> {
        return this._connectAndExecute<ISeasonInfo[]>(async (cp: ConnectionPool) => {
            const result = await cp.request()
                .execute(this._getQualifiedName(Constants.StoredProcedures.SeasonListSelectAll));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(ErrorCodes[ErrorCodes.DatabaseError], "Unexpected database error");
            }

            const seasons: ISeasonInfo[] = result.recordsets[0]
                .map((row) => SqlDataProvider.convertSeasonDbItemToSeasonInfo(row));
            return seasons;
        });
    }

    public async getSeason(seasonId: string): Promise<ISeasonInfo> {
        return this._connectAndExecute<ISeasonInfo>(async (cp: ConnectionPool) => {
            if (!SqlHelpers.isValidPositiveIntParameter(seasonId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid season id specified.",
                    `Season id: '${seasonId}'`);
            }
            const result = await cp.request()
                .input("ID", Sql.Int, seasonId)
                .execute(this._getQualifiedName(Constants.StoredProcedures.SeasonSelect));

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

    public async getSeasonServiceList(seasonId: string): Promise<IServiceInfo[]> {
        return this._connectAndExecute<IServiceInfo[]>(async (cp: ConnectionPool) => {
            if (!SqlHelpers.isValidPositiveIntParameter(seasonId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid season id specified.",
                    `Season id: '${seasonId}'`);
            }
            const result = await cp.request()
                .input("Season_ID", Sql.Int, seasonId)
                .execute(this._getQualifiedName(Constants.StoredProcedures.SeasonServicesSelect));

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

    public async getSeasonService(seasonId: string, serviceId: string): Promise<IServiceInfo> {
        return this._connectAndExecute<IServiceInfo>(async (cp: ConnectionPool) => {
            if (!SqlHelpers.isValidPositiveIntParameter(seasonId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid season id specified.",
                    `Season id: '${seasonId}'`);
            }
            if (!SqlHelpers.isValidPositiveIntParameter(serviceId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid service id specified.",
                    `Service id: '${serviceId}'`);
            }
            const result = await cp.request()
                .input("Season_ID", Sql.Int, seasonId)
                .input("Service_ID", Sql.Int, serviceId)
                .execute(this._getQualifiedName(Constants.StoredProcedures.SeasonServicesSelectBySeasonIdAndServiceId));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.DatabaseError],
                    "Unexpected database error");
            }

            const row = result.recordsets[0][0];
            if (!row) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.NotFoundError],
                    `Unable to find Service with Season id '${seasonId}' and Service id '${serviceId}`);
            }
            return SqlDataProvider.convertServiceDbItemToServiceInfo(row);
        });
    }

    public async getServiceHymnList(seasonId: string, serviceId: string): Promise<IServiceHymnInfo[]> {
        return this._connectAndExecute<IServiceHymnInfo[]>(async (cp: ConnectionPool) => {
            if (!SqlHelpers.isValidPositiveIntParameter(seasonId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid season id specified.",
                    `Season id: '${seasonId}'`);
            }
            if (!SqlHelpers.isValidPositiveIntParameter(serviceId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid service id specified.",
                    `Service id: '${serviceId}'`);
            }

            const result = await cp.request()
                .input("Season_ID", Sql.Int, seasonId)
                .input("Service_ID", Sql.Int, serviceId)
                .execute(this._getQualifiedName(Constants.StoredProcedures.ServiceHymnListSelectBySeasonIdAndServiceId));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.DatabaseError],
                    "Unexpected database error");
            }

            const serviceHymns: IServiceHymnInfo[] = result.recordsets[0]
                .map((row) => SqlDataProvider.convertServiceHymnDbItemToServiceHymnInfo(row));
            return serviceHymns;
        });
    }

    public getServiceHymn(seasonId: string, serviceId: string, serviceHymnId: string): Promise<IServiceHymnInfo> {
        return this._connectAndExecute<IServiceHymnInfo>(async (cp: ConnectionPool) => {
            if (!SqlHelpers.isValidPositiveIntParameter(seasonId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid season id specified.",
                    `Season id: '${seasonId}'`);
            }
            if (!SqlHelpers.isValidPositiveIntParameter(serviceId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid service id specified.",
                    `Service id: '${serviceId}'`);
            }
            if (!SqlHelpers.isValidPositiveIntParameter(serviceHymnId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid hymn id specified.",
                    `Hymn id: '${serviceHymnId}'`);
            }
            const result = await cp.request()
                .input("Season_ID", Sql.Int, seasonId)
                .input("Service_ID", Sql.Int, serviceId)
                .input("ServiceHymn_ID", Sql.Int, serviceHymnId)
                .execute(this._getQualifiedName(Constants.StoredProcedures.ServiceHymnSelectBySeasonIdAndServiceIdAndServiceHymnId));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.DatabaseError],
                    "Unexpected database error");
            }

            const row = result.recordsets[0][0];
            if (!row) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.NotFoundError],
                    `Unable to find hymn with season id '${seasonId}', service id '${serviceId}, and hymn id '${serviceHymnId}'`);
            }
            return SqlDataProvider.convertServiceHymnDbItemToServiceHymnInfo(row);
        });
    }

    public getServiceHymnFormatList(seasonId: string, serviceId: string, serviceHymnId: string): Promise<IServiceHymnFormatInfo[]> {
        return this._connectAndExecute<IServiceHymnFormatInfo[]>(async (cp: ConnectionPool) => {
            if (!SqlHelpers.isValidPositiveIntParameter(seasonId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid season id specified.",
                    `Season id: '${seasonId}'`);
            }
            if (!SqlHelpers.isValidPositiveIntParameter(serviceId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid service id specified.",
                    `Service id: '${serviceId}'`);
            }
            if (!SqlHelpers.isValidPositiveIntParameter(serviceHymnId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid hymn id specified.",
                    `Hymn id: '${serviceHymnId}'`);
            }

            const result = await cp.request()
                .input("Season_ID", Sql.Int, seasonId)
                .input("Service_ID", Sql.Int, serviceId)
                .input("ServiceHymn_ID", Sql.Int, serviceHymnId)
                .execute(this._getQualifiedName(Constants.StoredProcedures.HymnFormatListSelectBySeasonIdAndServiceIdAndServiceHymnId));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.DatabaseError],
                    "Unexpected database error");
            }

            const serviceHymns: IServiceHymnFormatInfo[] = result.recordsets[0]
                .map((row) => SqlDataProvider.convertServiceHymnFormatDbItemToServiceHymnFormatInfo(row));
            return serviceHymns;
        });
    }

    public getServiceHymnFormat(seasonId: string, serviceId: string, serviceHymnId: string, formatId: string): Promise<IServiceHymnFormatInfo> {
        return this._connectAndExecute<IServiceHymnFormatInfo>(async (cp: ConnectionPool) => {
            if (!SqlHelpers.isValidPositiveIntParameter(seasonId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid season id specified.",
                    `Season id: '${seasonId}'`);
            }
            if (!SqlHelpers.isValidPositiveIntParameter(serviceId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid service id specified.",
                    `Service id: '${serviceId}'`);
            }
            if (!SqlHelpers.isValidPositiveIntParameter(serviceHymnId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid hymn id specified.",
                    `Hymn id: '${serviceHymnId}'`);
            }
            if (!SqlHelpers.isValidPositiveIntParameter(formatId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid format id specified.",
                    `Format id: '${formatId}'`);
            }
            const result = await cp.request()
                .input("Season_ID", Sql.Int, seasonId)
                .input("Service_ID", Sql.Int, serviceId)
                .input("ServiceHymn_ID", Sql.Int, serviceHymnId)
                .input("Format_ID", Sql.Int, formatId)
                .execute(this._getQualifiedName(Constants.StoredProcedures.HymnFormatSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.DatabaseError],
                    "Unexpected database error");
            }

            const row = result.recordsets[0][0];
            if (!row) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.NotFoundError],
                    `Unable to find hymn with season id '${seasonId}', service id '${serviceId}, hymn id '${serviceHymnId}', and format id '${formatId}'`);
            }
            return SqlDataProvider.convertServiceHymnFormatDbItemToServiceHymnFormatInfo(row);
        });
    }

    /**
     * Helper method to create connection, execute the given action, then close the connection
     * @param action
     */
    private async _connectAndExecute<TResult>(action: (cp: ConnectionPool) => Promise<TResult>): Promise<TResult> {
        let connection: ConnectionPool;
        try {
            connection = this.getConnectionPool();
            if (!connection.connected) {
                Log.verbose("SqlDataProvider", "_connectAndExecute", "Establishing sql connection.");
                await connection.connect();
            }

            Log.verbose("SqlDataProvider", "_connectAndExecute", "Sql connection established.  Executing action.");
            return await action(connection);
        } catch (ex) {
            Log.error("SqlDataProvider", "_connectAndExecute", "Error occured: " + JSON.stringify(ex));
            throw ex;
        } finally {
            Log.verbose("SqlDataProvider", "_connectAndExecute", "Action successfully executed.  Closing SQL connection.");
            await connection.close();
            Log.verbose("SqlDataProvider", "_connectAndExecute", "SQL connection successfully closed.");
        }
    }

    private _getQualifiedName(sp: string): string {
        return `${this.tablePrefix}${sp}`;
    }
}
