import { inject, injectable } from "inversify";
import * as Sql from "mssql";
import { IConfiguration } from "../../Common/Configuration";
import { ErrorCodes, HazzatApplicationError } from "../../Common/Errors";
import { Language } from "../../Common/Types/Language";
import { Log } from "../../Common/Utils/Logger";
import { SqlHelpers } from "../../Common/Utils/SqlHelpers";
import { IFormatInfo } from "../../Models/IFormatInfo";
import { IHymnInfo } from "../../Models/IHymnInfo";
import { ISeasonInfo } from "../../Models/ISeasonInfo";
import { IServiceInfo } from "../../Models/IServiceInfo";
import { ContentType, IHazzatContent, IHymnContent, IInformationContent, ITextContent, IVariationInfo, IVerticalHazzatContent, IVideoContent } from "../../Models/IVariationInfo";
import { ResourceTypes } from "../../Routes/ResourceTypes";
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
    private static _convertSeasonDbItemToSeasonInfo(seasonDbItem: HazzatDbSchema.ISeason): ISeasonInfo {
        return {
            id: `/${ResourceTypes.Seasons}/${seasonDbItem.ItemId}`,
            isDateSpecific: seasonDbItem.Date_Specific,
            name: seasonDbItem.Name,
            order: seasonDbItem.Season_Order,
            verse: seasonDbItem.Verse
        };
    }

    private static _convertServiceDbItemToServiceInfo(serviceDbItem: HazzatDbSchema.IService): IServiceInfo {
        return {
            id: `/${ResourceTypes.Seasons}/${serviceDbItem.Season_ID}/${ResourceTypes.Services}/${serviceDbItem.ItemId}`,
            name: serviceDbItem.Service_Name,
            order: serviceDbItem.Service_Order
        };
    }

    private static _convertServiceHymnDbItemToHymnInfo(
        serviceHymnDbItem: HazzatDbSchema.IServiceHymn
    ): IHymnInfo {
        return {
            id: `/${ResourceTypes.Seasons}/${serviceHymnDbItem.Season_ID}/${ResourceTypes.Services}/${serviceHymnDbItem.Service_ID}/${ResourceTypes.Hymns}/${serviceHymnDbItem.ItemId}`,
            name: serviceHymnDbItem.Title,
            order: serviceHymnDbItem.Hymn_Order
        };
    }

    private static _convertServiceHymnFormatDbItemToFormatInfo(
        serviceHymnFormatDbItem: HazzatDbSchema.IServiceHymnFormat
    ): IFormatInfo {
        return {
            id: `/${ResourceTypes.Seasons}/${serviceHymnFormatDbItem.Season_ID}/${ResourceTypes.Services}/${serviceHymnFormatDbItem.Service_ID}/${ResourceTypes.Hymns}/${serviceHymnFormatDbItem.ServiceHymn_ID}/${ResourceTypes.Formats}/${serviceHymnFormatDbItem.ItemId}`,
            name: serviceHymnFormatDbItem.Format_Name,
            order: serviceHymnFormatDbItem.ItemId,
            variationCount: serviceHymnFormatDbItem.Content_Count
        };
    }

    private async _convertServiceHymnFormatContentDbItemToServiceHymnFormatContentInfo<T extends IHymnContent>(
        serviceHymnFormatContentDbItem: HazzatDbSchema.IServiceHymnFormatContent
    ): Promise<IVariationInfo<T>> {

        let content: any = null;

        // to avoid making multiple calls to the db to fetch the same reason
        let reasonInfo: HazzatDbSchema.IReason;
        const getReasonFunc = async () => {
            if (!reasonInfo) {
                reasonInfo = await this._getReason(serviceHymnFormatContentDbItem.Reason_ID);
            }
            return reasonInfo;
        };

        switch (serviceHymnFormatContentDbItem.Format_ID) {
            case 1: // Text
                content = {
                    arabicText: await this._prepareTextContent(
                        serviceHymnFormatContentDbItem.Content_Arabic,
                        Language.Arabic,
                        getReasonFunc),
                    copticText: await this._prepareTextContent(
                        serviceHymnFormatContentDbItem.Content_Coptic,
                        Language.Coptic,
                        getReasonFunc),
                    englishText: await this._prepareTextContent(
                        serviceHymnFormatContentDbItem.Content_English,
                        Language.English,
                        getReasonFunc),
                    contentType: ContentType.TextContent
                } as ITextContent;
                break;
            case 2: // Hazzat
                content = {
                    arabicHazzat: await this._prepareHazzatContent(serviceHymnFormatContentDbItem.Content_Arabic),
                    copticHazzat: await this._prepareHazzatContent(serviceHymnFormatContentDbItem.Content_Coptic),
                    englishHazzat: await this._prepareHazzatContent(serviceHymnFormatContentDbItem.Content_English),
                    contentType: ContentType.HazzatContent
                } as IHazzatContent;
                break;
            case 3: // Vertical Hazzat
                content = {
                    arabicVerticalHazzat: await this._prepareHazzatContent(serviceHymnFormatContentDbItem.Content_Arabic),
                    copticVerticalHazzat: await this._prepareHazzatContent(serviceHymnFormatContentDbItem.Content_Coptic),
                    englishVerticalHazzat: await this._prepareHazzatContent(serviceHymnFormatContentDbItem.Content_English),
                    contentType: ContentType.VerticalHazzatContent
                } as IVerticalHazzatContent;
                break;
            case 6: // Video
                content = {
                    arabicVideo: serviceHymnFormatContentDbItem.Content_Arabic,
                    copticVideo: serviceHymnFormatContentDbItem.Content_Coptic,
                    englishVideo: serviceHymnFormatContentDbItem.Content_English,
                    contentType: ContentType.VideoContent
                } as IVideoContent;
                break;
            case 7: // Information
                content = {
                    arabicInformation: serviceHymnFormatContentDbItem.Content_Arabic,
                    englishInformation: serviceHymnFormatContentDbItem.Content_English,
                    contentType: ContentType.InformationContent
                } as IInformationContent;
                break;
            default:
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.NotSupportedError],
                    `The format '${serviceHymnFormatContentDbItem.Format_Name}' is not currently supported.`,
                    `format id: '${serviceHymnFormatContentDbItem.Format_ID}'`);
        }
        return {
            id: `/${ResourceTypes.Seasons}/${serviceHymnFormatContentDbItem.Season_ID}/${ResourceTypes.Services}/${serviceHymnFormatContentDbItem.Service_ID}/${ResourceTypes.Hymns}/${serviceHymnFormatContentDbItem.ServiceHymn_ID}/${ResourceTypes.Formats}/${serviceHymnFormatContentDbItem.Format_ID}/${ResourceTypes.Variations}/${serviceHymnFormatContentDbItem.ItemId}`,
            name: serviceHymnFormatContentDbItem.Content_Name,
            content
        };
    }

    /**
     * Prepares the content as stored in storage and makes it ready to presented
     * to callers through API
     * @param content The text content as it was stored
     * @param language The content language
     * @param getReasonFunc A method to get the reason info.
     */
    private async _prepareTextContent(content: string, language: Language, getReasonFunc: () => Promise<HazzatDbSchema.IReason>): Promise<string> {
        let result = content;

        // Replace references to common content
        result = await this._replaceCommonContent(result);

        // Replace the reason for the season
        result = await this._replaceReason(result, language, getReasonFunc);

        return result;
    }

    private async _replaceCommonContent(content: string): Promise<string> {
        if (!content) {
            return Promise.resolve(content);
        }

        let result = content;
        const commonContentRegEx = new RegExp("\<common\=([0-9]+)\>", "i");
        let matchGroups = result.match(commonContentRegEx);

        // Keep replacing common as long as there are additional references
        while (!!matchGroups) {
            const matchedString = matchGroups[0];
            const commonId = matchGroups[1];

            const commonContent = await this.getCommonContent(commonId);

            result = result.replace(matchedString, commonContent);
            matchGroups = result.match(commonContentRegEx);
        }

        return result;
    }

    private async _replaceReason(content: string, language: Language, getReasonFunc: () => Promise<HazzatDbSchema.IReason>): Promise<string> {
        if (!content) {
            return Promise.resolve(content);
        }

        let result = content;
        const longReasonRegEx = new RegExp("\<reason_long\>", "i");
        const shortReasonRegEx = new RegExp("\<short_long\>", "i");

        const longReasonMatch = result.match(longReasonRegEx);
        const shortReasonMatch = result.match(shortReasonRegEx);

        // only call the DB if there's a match
        if (!longReasonMatch && !shortReasonMatch) {
            return result;
        }

        const reasonInfo = await getReasonFunc();
        let longReason: string;
        let shortReason: string;

        switch (language) {
            case Language.English:
                longReason = reasonInfo.Long_English;
                shortReason = reasonInfo.Short_English;
                break;
            case Language.Coptic:
                longReason = reasonInfo.Long_Coptic;
                shortReason = reasonInfo.Short_Coptic;
                break;
            case Language.Arabic:
                longReason = reasonInfo.Long_Arabic;
                shortReason = reasonInfo.Short_Arabic;
                break;
            default:
        }

        if (!!longReasonMatch) {
            result = result.replace(longReasonMatch[0], longReason);
        }

        if (!!shortReasonMatch) {
            result = result.replace(shortReasonMatch[0], shortReason);
        }

        return result;
    }

    /**
     * Prepares the content as stored in storage and makes it ready to presented
     * to callers through API
     * @param content The hazzat content as it was stored
     */
    private async _prepareHazzatContent(content: string): Promise<string> {
        let result = content;

        // Replace references to common content
        result = await this._replaceCommonContent(result);

        return result;
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
                .map((row) => SqlDataProvider._convertSeasonDbItemToSeasonInfo(row));
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
            return SqlDataProvider._convertSeasonDbItemToSeasonInfo(row);
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
                .map((row) => SqlDataProvider._convertServiceDbItemToServiceInfo(row));
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
            return SqlDataProvider._convertServiceDbItemToServiceInfo(row);
        });
    }

    public async getServiceHymnList(seasonId: string, serviceId: string): Promise<IHymnInfo[]> {
        return this._connectAndExecute<IHymnInfo[]>(async (cp: ConnectionPool) => {
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

            const serviceHymns: IHymnInfo[] = result.recordsets[0]
                .map((row) => SqlDataProvider._convertServiceHymnDbItemToHymnInfo(row));
            return serviceHymns;
        });
    }

    public getServiceHymn(seasonId: string, serviceId: string, hymnId: string): Promise<IHymnInfo> {
        return this._connectAndExecute<IHymnInfo>(async (cp: ConnectionPool) => {
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
                    `Unable to find hymn with season id '${seasonId}', service id '${serviceId}, and hymn id '${hymnId}'`);
            }
            return SqlDataProvider._convertServiceHymnDbItemToHymnInfo(row);
        });
    }

    public getServiceHymnFormatList(seasonId: string, serviceId: string, hymnId: string): Promise<IFormatInfo[]> {
        return this._connectAndExecute<IFormatInfo[]>(async (cp: ConnectionPool) => {
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
                .execute(this._getQualifiedName(Constants.StoredProcedures.HymnFormatListSelectBySeasonIdAndServiceIdAndServiceHymnId));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.DatabaseError],
                    "Unexpected database error");
            }

            const serviceHymns: IFormatInfo[] = result.recordsets[0]
                .map((row) => SqlDataProvider._convertServiceHymnFormatDbItemToFormatInfo(row));
            return serviceHymns;
        });
    }

    public getServiceHymnFormat(seasonId: string, serviceId: string, hymnId: string, formatId: string): Promise<IFormatInfo> {
        return this._connectAndExecute<IFormatInfo>(async (cp: ConnectionPool) => {
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
                    `Unable to find hymn formats with season id '${seasonId}', service id '${serviceId}, hymn id '${hymnId}', and format id '${formatId}'`);
            }
            return SqlDataProvider._convertServiceHymnFormatDbItemToFormatInfo(row);
        });
    }

    public getServiceHymnsFormatVariationList<T extends IHymnContent>(seasonId: string, serviceId: string, hymnId: string, formatId: string): Promise<IVariationInfo<T>[]> {
        return this._connectAndExecute<IVariationInfo<any>[]>(async (cp: ConnectionPool) => {
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
                .execute(this._getQualifiedName(Constants.StoredProcedures.HymnContentListSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId));

            if (!SqlHelpers.isValidResult(result)) {
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.DatabaseError],
                    "Unexpected database error");
            }

            const serviceHymns: IVariationInfo<IHymnContent>[] = await Promise.all(result.recordsets[0]
                .map((row) => this._convertServiceHymnFormatContentDbItemToServiceHymnFormatContentInfo(row)));

            return serviceHymns;
        });
    }

    public getServiceHymnsFormatVariation<T extends IHymnContent>(seasonId: string, serviceId: string, hymnId: string, formatId: string, variationId: string): Promise<IVariationInfo<T>> {
        return this._connectAndExecute<IVariationInfo<T>>(async (cp: ConnectionPool) => {
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
                    `Unable to find hymn variation with season id '${seasonId}', service id '${serviceId}, hymn id '${hymnId}', format id '${formatId}', and variation id '${variationId}'`);
            }
            return this._convertServiceHymnFormatContentDbItemToServiceHymnFormatContentInfo(row);
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

    private _getReason(reasonId: number): Promise<HazzatDbSchema.IReason> {
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
