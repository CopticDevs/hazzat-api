 import { IFormatInfo } from "../../Models/IFormatInfo";
// import { IHymnContent, IVariationInfo } from "../../Models/IVariationInfo";
import { inject, injectable } from "inversify";
import { ISeasonInfo } from "../../Models/ISeasonInfo";
import { ResourceTypes } from "../../Routes/ResourceTypes";
import { TYPES } from "../../types";
import { IDataProvider } from "../DataProviders/IDataProvider";
import { HazzatDbSchema } from "../DataProviders/SqlDataProvider/HazzatDbSchema";
import { IHymnsProvider } from "./IHymnsProvider";
import { IServiceInfo } from "../../Models/IServiceInfo";
import { IHymnInfo } from "../../Models/IHymnInfo";

/**
 * Hymns Provider
 */
@injectable()
export class HymnsProvider implements IHymnsProvider {
    private dataProvider: IDataProvider

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

    constructor(
        @inject(TYPES.IDataProvider) dataProvider: IDataProvider
    ) {
        this.dataProvider = dataProvider;
    }

    public async getSeasonList(): Promise<ISeasonInfo[]> {
        const dbResult = await this.dataProvider.getSeasonList();

        const seasons: ISeasonInfo[] = dbResult
            .map((row) => HymnsProvider._convertSeasonDbItemToSeasonInfo(row));
        return seasons;
    }

    public async getSeason(seasonId: string): Promise<ISeasonInfo> {
        const dbResult = await this.dataProvider.getSeason(seasonId);
        return HymnsProvider._convertSeasonDbItemToSeasonInfo(dbResult);
    }

    public async getSeasonServiceList(seasonId: string): Promise<IServiceInfo[]> {
        const dbResult = await this.dataProvider.getSeasonServiceList(seasonId);

        const services: IServiceInfo[] = dbResult
            .map((row) => HymnsProvider._convertServiceDbItemToServiceInfo(row));
        return services;
    }

    public async getSeasonService(seasonId: string, serviceId: string): Promise<IServiceInfo> {
        const dbResult = await this.dataProvider.getSeasonService(seasonId, serviceId);
        return HymnsProvider._convertServiceDbItemToServiceInfo(dbResult);
    }

    public async getServiceHymnList(seasonId: string, serviceId: string): Promise<IHymnInfo[]> {
        const dbResult = await this.dataProvider.getServiceHymnList(seasonId, serviceId);

        const serviceHymns: IHymnInfo[] = dbResult
            .map((row) => HymnsProvider._convertServiceHymnDbItemToHymnInfo(row));
        return serviceHymns;
    }

    public async getServiceHymn(seasonId: string, serviceId: string, hymnId: string): Promise<IHymnInfo> {
        const dbResult = await this.dataProvider.getServiceHymn(seasonId, serviceId, hymnId);
        return HymnsProvider._convertServiceHymnDbItemToHymnInfo(dbResult);
    }

    public async getServiceHymnFormatList(seasonId: string, serviceId: string, hymnId: string): Promise<IFormatInfo[]> {
        const dbResult = await this.dataProvider.getServiceHymnFormatList(seasonId, serviceId, hymnId);

        const serviceHymns: IFormatInfo[] = dbResult
            .map((row) => HymnsProvider._convertServiceHymnFormatDbItemToFormatInfo(row));
        return serviceHymns;
    }

    public async getServiceHymnFormat(seasonId: string, serviceId: string, hymnId: string, formatId: string): Promise<IFormatInfo> {
        const dbresult = await this.dataProvider.getServiceHymnFormat(seasonId, serviceId, hymnId, formatId);
        return HymnsProvider._convertServiceHymnFormatDbItemToFormatInfo(dbresult);
    }

    // getServiceHymnsFormatVariationList<T extends IHymnContent>(seasonId: string, serviceId: string, hymnId: string, formatId: string): Promise<IVariationInfo<T>[]>;
    // getServiceHymnsFormatVariation<T extends IHymnContent>(seasonId: string, serviceId: string, hymnId: string, formatId: string, contentId: string): Promise<IVariationInfo<T>>;

    // getCommonContent(commonId: string): Promise<string>;
}
