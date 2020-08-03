import { inject, injectable } from "inversify";
import * as Sql from "mssql";
import { IConfiguration } from "../../Common/Configuration";
import { ErrorCodes, HazzatApplicationError } from "../../Common/Errors";
import { Log } from "../../Common/Utils/Logger";
import { SqlHelpers } from "../../Common/Utils/SqlHelpers";
import { ISeasonInfo } from "../../Models/ISeasonInfo";
import { IHazzatContent, IHymnContent, IInformationContent, IServiceHymnFormatContentInfo, ITextContent, IVerticalHazzatContent, IVideoContent } from "../../Models/IServiceHymnFormatContentInfo";
import { IServiceHymnFormatInfo } from "../../Models/IServiceHymnFormatInfo";
import { IServiceHymnInfo } from "../../Models/IServiceHymnInfo";
import { IServiceInfo } from "../../Models/IServiceInfo";
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
            contentCount: serviceHymnFormatDbItem.Content_Count
        };
    }

    public static convertServiceHymnFormatContentDbItemToServiceHymnFormatContentInfo<T extends IHymnContent>(
        serviceHymnFormatContentDbItem: HazzatDbSchema.IServiceHymnFormatContent,
        formatId: number
    ): IServiceHymnFormatContentInfo<T> {

        let content: any = null;

        switch (formatId) {
            case 1: // Text
                content = {
                    arabicText: serviceHymnFormatContentDbItem.Content_Arabic,
                    copticText: serviceHymnFormatContentDbItem.Content_Coptic,
                    englishText: serviceHymnFormatContentDbItem.Content_English
                } as ITextContent;
                break;
            case 2: // Hazzat
                content = {
                    arabicHazzat: serviceHymnFormatContentDbItem.Content_Arabic,
                    copticHazzat: serviceHymnFormatContentDbItem.Content_Coptic,
                    englishHazzat: serviceHymnFormatContentDbItem.Content_English
                } as IHazzatContent;
                break;
            case 3: // Vertical Hazzat
                content = {
                    arabicVerticalHazzat: serviceHymnFormatContentDbItem.Content_Arabic,
                    copticVerticalHazzat: serviceHymnFormatContentDbItem.Content_Coptic,
                    englishVerticalHazzat: serviceHymnFormatContentDbItem.Content_English
                } as IVerticalHazzatContent;
                break;
            case 6: // Video
                content = {
                    arabicVideo: serviceHymnFormatContentDbItem.Content_Arabic,
                    copticVideo: serviceHymnFormatContentDbItem.Content_Coptic,
                    englishVideo: serviceHymnFormatContentDbItem.Content_English
                } as IVideoContent;
                break;
            case 7: // Information
                content = {
                    arabicInformation: serviceHymnFormatContentDbItem.Content_Arabic,
                    englishInformation: serviceHymnFormatContentDbItem.Content_English
                } as IInformationContent;
                break;
            default:
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.NotSupportedError],
                    `The format '${serviceHymnFormatContentDbItem.Format_Name}' is not currently supported.`,
                    `format id: '${formatId}'`);
        }
        return {
            id: serviceHymnFormatContentDbItem.ItemId,
            name: serviceHymnFormatContentDbItem.Content_Name,
            content,
            seasonId: serviceHymnFormatContentDbItem.Season_ID,
            seasonName: serviceHymnFormatContentDbItem.Season_Name,
            serviceId: serviceHymnFormatContentDbItem.Service_ID,
            serviceName: serviceHymnFormatContentDbItem.Service_Name,
            serviceHymnId: serviceHymnFormatContentDbItem.ServiceHymn_ID,
            serviceHymnName: serviceHymnFormatContentDbItem.ServiceHymn_Title,
            formatId: serviceHymnFormatContentDbItem.Format_ID,
            formatName: serviceHymnFormatContentDbItem.Format_Name
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
                    `Unable to find season with id '${seasonId}'`);
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
                .input(Constants.Parameters.SeasonId, Sql.Int, seasonId)
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
                .input(Constants.Parameters.SeasonId, Sql.Int, seasonId)
                .input(Constants.Parameters.ServiceId, Sql.Int, serviceId)
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
                    `Unable to find service with season id '${seasonId}' and Service id '${serviceId}`);
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
                .input(Constants.Parameters.SeasonId, Sql.Int, seasonId)
                .input(Constants.Parameters.ServiceId, Sql.Int, serviceId)
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
                .input(Constants.Parameters.SeasonId, Sql.Int, seasonId)
                .input(Constants.Parameters.ServiceId, Sql.Int, serviceId)
                .input(Constants.Parameters.ServiceHymnId, Sql.Int, serviceHymnId)
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
                .input(Constants.Parameters.SeasonId, Sql.Int, seasonId)
                .input(Constants.Parameters.ServiceId, Sql.Int, serviceId)
                .input(Constants.Parameters.ServiceHymnId, Sql.Int, serviceHymnId)
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
                .input(Constants.Parameters.SeasonId, Sql.Int, seasonId)
                .input(Constants.Parameters.ServiceId, Sql.Int, serviceId)
                .input(Constants.Parameters.ServiceHymnId, Sql.Int, serviceHymnId)
                .input(Constants.Parameters.FormatId, Sql.Int, formatId)
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
                    `Unable to find hymn formats with season id '${seasonId}', service id '${serviceId}, hymn id '${serviceHymnId}', and format id '${formatId}'`);
            }
            return SqlDataProvider.convertServiceHymnFormatDbItemToServiceHymnFormatInfo(row);
        });
    }

    public getServiceHymnsFormatContentList<T extends IHymnContent>(seasonId: string, serviceId: string, serviceHymnId: string, formatId: string): Promise<IServiceHymnFormatContentInfo<T>[]> {
        return this._connectAndExecute<IServiceHymnFormatContentInfo<T>[]>(async (cp: ConnectionPool) => {
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
                .input(Constants.Parameters.SeasonId, Sql.Int, seasonId)
                .input(Constants.Parameters.ServiceId, Sql.Int, serviceId)
                .input(Constants.Parameters.ServiceHymnId, Sql.Int, serviceHymnId)
                .input(Constants.Parameters.FormatId, Sql.Int, formatId)
                .execute(this._getQualifiedName(Constants.StoredProcedures.HymnContentListSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.DatabaseError],
                    "Unexpected database error");
            }

            const serviceHymns: IServiceHymnFormatContentInfo<T>[] = result.recordsets[0]
                .map((row) => SqlDataProvider.convertServiceHymnFormatContentDbItemToServiceHymnFormatContentInfo(row, +formatId));
            return serviceHymns;
        });
    }

    public getServiceHymnsFormatContent<T extends IHymnContent>(seasonId: string, serviceId: string, serviceHymnId: string, formatId: string, contentId: string): Promise<IServiceHymnFormatContentInfo<T>> {
        return this._connectAndExecute<IServiceHymnFormatContentInfo<T>>(async (cp: ConnectionPool) => {
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
            if (!SqlHelpers.isValidPositiveIntParameter(contentId)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.InvalidParameterError],
                    "Invalid content id specified.",
                    `Content id: '${contentId}'`);
            }

            const result = await cp.request()
                .input(Constants.Parameters.SeasonId, Sql.Int, seasonId)
                .input(Constants.Parameters.ServiceId, Sql.Int, serviceId)
                .input(Constants.Parameters.ServiceHymnId, Sql.Int, serviceHymnId)
                .input(Constants.Parameters.FormatId, Sql.Int, formatId)
                .input(Constants.Parameters.ContentId, Sql.Int, contentId)
                .execute(this._getQualifiedName(Constants.StoredProcedures.HymnContentSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.DatabaseError],
                    "Unexpected database error");
            }

            const row = result.recordsets[0][0];
            if (!row) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.NotFoundError],
                    `Unable to find hymn content with season id '${seasonId}', service id '${serviceId}, hymn id '${serviceHymnId}', format id '${formatId}', and content id '${contentId}'`);
            }
            return SqlDataProvider.convertServiceHymnFormatContentDbItemToServiceHymnFormatContentInfo(row, +formatId);
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
