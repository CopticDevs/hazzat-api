import { inject, injectable } from "inversify";
import * as Sql from "mssql";
import "reflect-metadata";
import { IConfiguration } from "../../../Common/Configuration";
import { ErrorCodes, HazzatApplicationError } from "../../../Common/Errors";
import { Log } from "../../../Common/Utils/Logger";
import { OperationExecutor } from "../../../Common/Utils/OperationExecutor";
import { SqlHelpers } from "../../../Common/Utils/SqlHelpers";
import { TYPES } from "../../../types";
import { IDataProvider } from "../IDataProvider";
import { HazzatDbSchema } from "./HazzatDbSchema";
import { Constants } from "./SqlConstants";
import ConnectionPool = Sql.ConnectionPool;

/*
 * Sql Data Provider
 */
@injectable()
export class SqlDataProvider implements IDataProvider {
    private connectionPool: ConnectionPool;
    private connectionPromise: Promise<ConnectionPool>;
    private configuration: IConfiguration;
    private tablePrefix: string = "Hymns_";

    constructor(
        @inject(TYPES.IConfiguration) configuration: IConfiguration
    ) {
        this.configuration = configuration;
    }

    public async getSeasonList(): Promise<HazzatDbSchema.ISeason[]> {
        return this._connectAndExecute<HazzatDbSchema.ISeason[]>(async (cp: ConnectionPool) => {
            const result = await cp.request()
                .execute<HazzatDbSchema.ISeason>(this._getQualifiedName(Constants.StoredProcedures.SeasonListSelectAll));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(ErrorCodes[ErrorCodes.DatabaseError], "Unexpected database error");
            }

            return result.recordsets[0];
        });
    }

    public async getSeason(seasonId: string): Promise<HazzatDbSchema.ISeason> {
        return this._connectAndExecute<HazzatDbSchema.ISeason>(async (cp: ConnectionPool) => {
            if (!SqlHelpers.isValidPositiveIntParameter(seasonId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid season id specified.",
                    `Season id: '${seasonId}'`);
            }
            const result = await cp.request()
                .input("ID", Sql.Int, seasonId)
                .execute<HazzatDbSchema.ISeason>(this._getQualifiedName(Constants.StoredProcedures.SeasonSelect));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.DatabaseError],
                    "Unexpected database error");
            }

            const row = result.recordsets[0][0];
            if (!row) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.NotFoundError],
                    `Unable to find season with id '${seasonId}'`);
            }

            return row;
        });
    }

    public async getSeasonServiceList(seasonId: string): Promise<HazzatDbSchema.IService[]> {
        return this._connectAndExecute<HazzatDbSchema.IService[]>(async (cp: ConnectionPool) => {
            if (!SqlHelpers.isValidPositiveIntParameter(seasonId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid season id specified.",
                    `Season id: '${seasonId}'`);
            }
            const result = await cp.request()
                .input(Constants.Parameters.SeasonId, Sql.Int, seasonId)
                .execute<HazzatDbSchema.IService>(this._getQualifiedName(Constants.StoredProcedures.SeasonServicesSelect));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.DatabaseError],
                    "Unexpected database error");
            }

            return result.recordsets[0];
        });
    }

    public async getSeasonService(seasonId: string, serviceId: string): Promise<HazzatDbSchema.IService> {
        return this._connectAndExecute<HazzatDbSchema.IService>(async (cp: ConnectionPool) => {
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
                .input(Constants.Parameters.SeasonId, Sql.Int, seasonId)
                .input(Constants.Parameters.ServiceId, Sql.Int, serviceId)
                .execute<HazzatDbSchema.IService>(this._getQualifiedName(Constants.StoredProcedures.SeasonServicesSelectBySeasonIdAndServiceId));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.DatabaseError],
                    "Unexpected database error");
            }

            const row = result.recordsets[0][0];
            if (!row) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.NotFoundError],
                    `Unable to find service with season id '${seasonId}' and Service id '${serviceId}`);
            }
            return row;
        });
    }

    public async getServiceHymnList(seasonId: string, serviceId: string): Promise<HazzatDbSchema.IServiceHymn[]> {
        return this._connectAndExecute<HazzatDbSchema.IServiceHymn[]>(async (cp: ConnectionPool) => {
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
                .input(Constants.Parameters.SeasonId, Sql.Int, seasonId)
                .input(Constants.Parameters.ServiceId, Sql.Int, serviceId)
                .execute<HazzatDbSchema.IServiceHymn>(this._getQualifiedName(Constants.StoredProcedures.ServiceHymnListSelectBySeasonIdAndServiceId));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.DatabaseError],
                    "Unexpected database error");
            }

            return result.recordsets[0];
        });
    }

    public getServiceHymn(seasonId: string, serviceId: string, hymnId: string): Promise<HazzatDbSchema.IServiceHymn> {
        return this._connectAndExecute<HazzatDbSchema.IServiceHymn>(async (cp: ConnectionPool) => {
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
            if (!SqlHelpers.isValidPositiveIntParameter(hymnId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid hymn id specified.",
                    `Hymn id: '${hymnId}'`);
            }
            const result = await cp.request()
                .input(Constants.Parameters.SeasonId, Sql.Int, seasonId)
                .input(Constants.Parameters.ServiceId, Sql.Int, serviceId)
                .input(Constants.Parameters.ServiceHymnId, Sql.Int, hymnId)
                .execute<HazzatDbSchema.IServiceHymn>(this._getQualifiedName(Constants.StoredProcedures.ServiceHymnSelectBySeasonIdAndServiceIdAndServiceHymnId));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.DatabaseError],
                    "Unexpected database error");
            }

            const row = result.recordsets[0][0];
            if (!row) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.NotFoundError],
                    `Unable to find hymn with season id '${seasonId}', service id '${serviceId}, and hymn id '${hymnId}'`);
            }
            return row;
        });
    }

    public getServiceHymnFormatList(seasonId: string, serviceId: string, hymnId: string): Promise<HazzatDbSchema.IServiceHymnFormat[]> {
        return this._connectAndExecute<HazzatDbSchema.IServiceHymnFormat[]>(async (cp: ConnectionPool) => {
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
            if (!SqlHelpers.isValidPositiveIntParameter(hymnId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid hymn id specified.",
                    `Hymn id: '${hymnId}'`);
            }

            const result = await cp.request()
                .input(Constants.Parameters.SeasonId, Sql.Int, seasonId)
                .input(Constants.Parameters.ServiceId, Sql.Int, serviceId)
                .input(Constants.Parameters.ServiceHymnId, Sql.Int, hymnId)
                .execute<HazzatDbSchema.IServiceHymnFormat>(this._getQualifiedName(Constants.StoredProcedures.HymnFormatListSelectBySeasonIdAndServiceIdAndServiceHymnId));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.DatabaseError],
                    "Unexpected database error");
            }

            return result.recordsets[0];
        });
    }

    public getServiceHymnFormat(seasonId: string, serviceId: string, hymnId: string, formatId: string): Promise<HazzatDbSchema.IServiceHymnFormat> {
        return this._connectAndExecute<HazzatDbSchema.IServiceHymnFormat>(async (cp: ConnectionPool) => {
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
            if (!SqlHelpers.isValidPositiveIntParameter(hymnId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid hymn id specified.",
                    `Hymn id: '${hymnId}'`);
            }
            if (!SqlHelpers.isValidPositiveIntParameter(formatId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid format id specified.",
                    `Format id: '${formatId}'`);
            }
            const result = await cp.request()
                .input(Constants.Parameters.SeasonId, Sql.Int, seasonId)
                .input(Constants.Parameters.ServiceId, Sql.Int, serviceId)
                .input(Constants.Parameters.ServiceHymnId, Sql.Int, hymnId)
                .input(Constants.Parameters.FormatId, Sql.Int, formatId)
                .execute<HazzatDbSchema.IServiceHymnFormat>(this._getQualifiedName(Constants.StoredProcedures.HymnFormatSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.DatabaseError],
                    "Unexpected database error");
            }

            const row = result.recordsets[0][0];
            if (!row) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.NotFoundError],
                    `Unable to find hymn formats with season id '${seasonId}', service id '${serviceId}, hymn id '${hymnId}', and format id '${formatId}'`);
            }
            return row;
        });
    }

    public getServiceHymnsFormatVariationList(seasonId: string, serviceId: string, hymnId: string, formatId: string): Promise<HazzatDbSchema.IServiceHymnFormatContent[]> {
        return this._connectAndExecute<HazzatDbSchema.IServiceHymnFormatContent[]>(async (cp: ConnectionPool) => {
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
            if (!SqlHelpers.isValidPositiveIntParameter(hymnId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid hymn id specified.",
                    `Hymn id: '${hymnId}'`);
            }
            if (!SqlHelpers.isValidPositiveIntParameter(formatId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid format id specified.",
                    `Format id: '${formatId}'`);
            }

            const result = await cp.request()
                .input(Constants.Parameters.SeasonId, Sql.Int, seasonId)
                .input(Constants.Parameters.ServiceId, Sql.Int, serviceId)
                .input(Constants.Parameters.ServiceHymnId, Sql.Int, hymnId)
                .input(Constants.Parameters.FormatId, Sql.Int, formatId)
                .execute<HazzatDbSchema.IServiceHymnFormatContent>(this._getQualifiedName(Constants.StoredProcedures.HymnContentListSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.DatabaseError],
                    "Unexpected database error");
            }

            return result.recordsets[0];
        });
    }

    public getServiceHymnsFormatVariation(seasonId: string, serviceId: string, hymnId: string, formatId: string, variationId: string): Promise<HazzatDbSchema.IServiceHymnFormatContent> {
        return this._connectAndExecute<HazzatDbSchema.IServiceHymnFormatContent>(async (cp: ConnectionPool) => {
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
            if (!SqlHelpers.isValidPositiveIntParameter(hymnId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid hymn id specified.",
                    `Hymn id: '${hymnId}'`);
            }
            if (!SqlHelpers.isValidPositiveIntParameter(formatId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid format id specified.",
                    `Format id: '${formatId}'`);
            }
            if (!SqlHelpers.isValidPositiveIntParameter(variationId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid variation id specified.",
                    `Variation id: '${variationId}'`);
            }

            const result = await cp.request()
                .input(Constants.Parameters.SeasonId, Sql.Int, seasonId)
                .input(Constants.Parameters.ServiceId, Sql.Int, serviceId)
                .input(Constants.Parameters.ServiceHymnId, Sql.Int, hymnId)
                .input(Constants.Parameters.FormatId, Sql.Int, formatId)
                .input(Constants.Parameters.ContentId, Sql.Int, variationId)
                .execute<HazzatDbSchema.IServiceHymnFormatContent>(this._getQualifiedName(Constants.StoredProcedures.HymnContentSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.DatabaseError],
                    "Unexpected database error");
            }

            const row = result.recordsets[0][0];
            if (!row) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.NotFoundError],
                    `Unable to find hymn variation with season id '${seasonId}', service id '${serviceId}, hymn id '${hymnId}', format id '${formatId}', and variation id '${variationId}'`);
            }
            return row;
        });
    }

    public async getTypeList(): Promise<HazzatDbSchema.IType[]> {
        return this._connectAndExecute<HazzatDbSchema.IType[]>(async (cp: ConnectionPool) => {
            const result = await cp.request()
                .execute<HazzatDbSchema.IType>(this._getQualifiedName(Constants.StoredProcedures.TypeListSelect));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(ErrorCodes[ErrorCodes.DatabaseError], "Unexpected database error");
            }

            return result.recordsets[0];
        });
    }

    public async getType(typeId: string): Promise<HazzatDbSchema.IType> {
        return this._connectAndExecute<HazzatDbSchema.IType>(async (cp: ConnectionPool) => {
            if (!SqlHelpers.isValidPositiveIntParameter(typeId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid type id specified.",
                    `Type id: '${typeId}'`);
            }
            const result = await cp.request()
                .input("ID", Sql.Int, typeId)
                .execute<HazzatDbSchema.IType>(this._getQualifiedName(Constants.StoredProcedures.TypeSelect));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.DatabaseError],
                    "Unexpected database error");
            }

            const row = result.recordsets[0][0];
            if (!row) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.NotFoundError],
                    `Unable to find type with id '${typeId}'`);
            }

            return row;
        });
    }

    public async getTuneList(): Promise<HazzatDbSchema.ITune[]> {
        return this._connectAndExecute<HazzatDbSchema.ITune[]>(async (cp: ConnectionPool) => {
            const result = await cp.request()
                .execute<HazzatDbSchema.ITune>(this._getQualifiedName(Constants.StoredProcedures.TuneListSelect));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(ErrorCodes[ErrorCodes.DatabaseError], "Unexpected database error");
            }

            return result.recordsets[0];
        });
    }

    public async getTune(tuneId: string): Promise<HazzatDbSchema.ITune> {
        return this._connectAndExecute<HazzatDbSchema.ITune>(async (cp: ConnectionPool) => {
            if (!SqlHelpers.isValidPositiveIntParameter(tuneId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid tune id specified.",
                    `Tune id: '${tuneId}'`);
            }
            const result = await cp.request()
                .input("ID", Sql.Int, tuneId)
                .execute<HazzatDbSchema.ITune>(this._getQualifiedName(Constants.StoredProcedures.TuneSelect));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.DatabaseError],
                    "Unexpected database error");
            }

            const row = result.recordsets[0][0];
            if (!row) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.NotFoundError],
                    `Unable to find te with id '${tuneId}'`);
            }

            return row;
        });
    }

    public getCommonContent(commonId: string): Promise<string> {
        return this._connectAndExecute<string>(async (cp: ConnectionPool) => {
            if (!SqlHelpers.isValidPositiveIntParameter(commonId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid common id specified.",
                    `Common id: '${commonId}'`);
            }

            const result = await cp.request()
                .input(Constants.Parameters.CommonId, Sql.Int, commonId)
                .execute(this._getQualifiedName(Constants.StoredProcedures.CommonSelect));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.DatabaseError],
                    "Unexpected database error");
            }

            const row = result.recordsets[0][0];
            if (!row) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.NotFoundError],
                    `Unable to get common hymn content common id '${commonId}'`);
            }

            const contentResult: HazzatDbSchema.ICommonContent = row;
            return contentResult.Content;
        });
    }

    public getReason(reasonId: number): Promise<HazzatDbSchema.IReason> {
        return this._connectAndExecute<HazzatDbSchema.IReason>(async (cp: ConnectionPool) => {
            const result = await cp.request()
                .input(Constants.Parameters.ReasonId, Sql.Int, reasonId)
                .execute(this._getQualifiedName(Constants.StoredProcedures.ReasonSelect));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.DatabaseError],
                    "Unexpected database error");
            }

            const row = result.recordsets[0][0];
            if (!row) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.NotFoundError],
                    `Unable to get reason with id '${reasonId}'`);
            }

            return row;
        });
    }

    private _getConnectionPool(): ConnectionPool {
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

    /**
     * Helper method to create connection, execute the given action, then close the connection
     * @param action
     */
    private async _connectAndExecute<TResult>(action: (cp: ConnectionPool) => Promise<TResult>): Promise<TResult> {
        let connection: ConnectionPool;
        try {
            connection = this._getConnectionPool();

            if (!connection.connected) {
                Log.verbose("SqlDataProvider", "_connectAndExecute", "Establishing sql connection.");
                if (!connection.connecting) {
                    Log.verbose("SqlDataProvider", "_connectAndExecute", "Starting sql connection.");
                    this.connectionPromise = connection.connect();
                } else {
                    Log.verbose("SqlDataProvider", "_connectAndExecute", "Waiting on previous connection attempt.");
                }
                await this.connectionPromise;
                Log.verbose("SqlDataProvider", "_connectAndExecute", "Successfully connected.");
            } else {
                Log.verbose("SqlDataProvider", "_connectAndExecute", "Sql connection already connected.");
            }

            Log.verbose("SqlDataProvider", "_connectAndExecute", "Sql connection established.  Executing action.");
            return await action(connection);
        } catch (ex) {
            Log.error("SqlDataProvider", "_connectAndExecute", "Error occured: " + JSON.stringify(ex));
            throw ex;
        }
    }

    private _getQualifiedName(sp: string): string {
        return `${this.tablePrefix}${sp}`;
    }
}
