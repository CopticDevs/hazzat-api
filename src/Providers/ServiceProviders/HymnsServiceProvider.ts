 import { inject, injectable } from "inversify";
import { IFormatInfo } from "../../Models/IFormatInfo";
import { IHymnInfo } from "../../Models/IHymnInfo";
import { ISeasonInfo } from "../../Models/ISeasonInfo";
import { IServiceInfo } from "../../Models/IServiceInfo";
import { IHymnContent, IVariationInfo } from "../../Models/IVariationInfo";
import { TYPES } from "../../types";
import { IDataProvider } from "../DataProviders/IDataProvider";
import { HazzatContentUtils } from "./Helpers/HazzatContentUrils";
import { IHymnsServiceProvider } from "./IHymnsServiceProvider";

/**
 * Hymns Service Provider
 */
@injectable()
export class HymnsServiceProvider implements IHymnsServiceProvider {
    private _dataProvider: IDataProvider

    constructor(
        @inject(TYPES.IDataProvider) dataProvider: IDataProvider
    ) {
        this._dataProvider = dataProvider;
    }

    public async getSeasonList(): Promise<ISeasonInfo[]> {
        const dbResult = await this._dataProvider.getSeasonList();

        const seasons: ISeasonInfo[] = dbResult
            .map((row) => HazzatContentUtils.convertSeasonDbItemToSeasonInfo(row));
        return seasons;
    }

    public async getSeason(seasonId: string): Promise<ISeasonInfo> {
        const dbResult = await this._dataProvider.getSeason(seasonId);
        return HazzatContentUtils.convertSeasonDbItemToSeasonInfo(dbResult);
    }

    public async getSeasonServiceList(seasonId: string): Promise<IServiceInfo[]> {
        const dbResult = await this._dataProvider.getSeasonServiceList(seasonId);

        const services: IServiceInfo[] = dbResult
            .map((row) => HazzatContentUtils.convertServiceDbItemToServiceInfo(row));
        return services;
    }

    public async getSeasonService(seasonId: string, serviceId: string): Promise<IServiceInfo> {
        const dbResult = await this._dataProvider.getSeasonService(seasonId, serviceId);
        return HazzatContentUtils.convertServiceDbItemToServiceInfo(dbResult);
    }

    public async getServiceHymnList(seasonId: string, serviceId: string): Promise<IHymnInfo[]> {
        const dbResult = await this._dataProvider.getServiceHymnList(seasonId, serviceId);

        const serviceHymns: IHymnInfo[] = dbResult
            .map((row) => HazzatContentUtils.convertServiceHymnDbItemToHymnInfo(row));
        return serviceHymns;
    }

    public async getServiceHymn(seasonId: string, serviceId: string, hymnId: string): Promise<IHymnInfo> {
        const dbResult = await this._dataProvider.getServiceHymn(seasonId, serviceId, hymnId);
        return HazzatContentUtils.convertServiceHymnDbItemToHymnInfo(dbResult);
    }

    public async getServiceHymnFormatList(seasonId: string, serviceId: string, hymnId: string): Promise<IFormatInfo[]> {
        const dbResult = await this._dataProvider.getServiceHymnFormatList(seasonId, serviceId, hymnId);

        const serviceHymns: IFormatInfo[] = dbResult
            .map((row) => HazzatContentUtils.convertServiceHymnFormatDbItemToFormatInfo(row));
        return serviceHymns;
    }

    public async getServiceHymnFormat(seasonId: string, serviceId: string, hymnId: string, formatId: string): Promise<IFormatInfo> {
        const dbResult = await this._dataProvider.getServiceHymnFormat(seasonId, serviceId, hymnId, formatId);
        return HazzatContentUtils.convertServiceHymnFormatDbItemToFormatInfo(dbResult);
    }

    public async getServiceHymnsFormatVariationList<T extends IHymnContent>(seasonId: string, serviceId: string, hymnId: string, formatId: string): Promise<IVariationInfo<T>[]> {
        const dbResult = await this._dataProvider.getServiceHymnsFormatVariationList(seasonId, serviceId, hymnId, formatId);

        const serviceHymns: IVariationInfo<T>[] = await Promise.all(dbResult
            .map((row) => HazzatContentUtils.convertServiceHymnFormatContentDbItemToServiceHymnFormatContentInfo<T>(row, this._dataProvider)));
        return serviceHymns;
    }

    public async getServiceHymnsFormatVariation<T extends IHymnContent>(seasonId: string, serviceId: string, hymnId: string, formatId: string, contentId: string): Promise<IVariationInfo<T>> {
        const dbResult = await this._dataProvider.getServiceHymnsFormatVariation(seasonId, serviceId, hymnId, formatId, contentId);
        return await HazzatContentUtils.convertServiceHymnFormatContentDbItemToServiceHymnFormatContentInfo<T>(dbResult, this._dataProvider);
    }
}
