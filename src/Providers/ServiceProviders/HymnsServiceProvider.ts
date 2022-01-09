 import { inject, injectable } from "inversify";
import { measure } from "../../Common/Utils/MeasureDecorator";
import { IFormatInfo } from "../../Models/IFormatInfo";
import { IHymnInfo } from "../../Models/IHymnInfo";
import { ISeasonInfo } from "../../Models/ISeasonInfo";
import { IServiceInfo } from "../../Models/IServiceInfo";
import { ITuneInfo } from "../../Models/ITuneInfo";
import { ITypeInfo } from "../../Models/ITypeInfo";
import { IHymnContent, IVariationInfo } from "../../Models/IVariationInfo";
import { TYPES } from "../../types";
import { IDataProvider } from "../DataProviders/IDataProvider";
import { HazzatContentUtils } from "./Helpers/HazzatContentUtils";
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

    @measure
    public async getSeasonList(): Promise<ISeasonInfo[]> {
        const dbResult = await this._dataProvider.getSeasonList();

        const seasons: ISeasonInfo[] = dbResult
            .map((row) => HazzatContentUtils.convertSeasonDbItemToSeasonInfo(row));
        return seasons;
    }

    @measure
    public async getSeason(seasonId: string): Promise<ISeasonInfo> {
        const dbResult = await this._dataProvider.getSeason(seasonId);
        return HazzatContentUtils.convertSeasonDbItemToSeasonInfo(dbResult);
    }

    @measure
    public async getSeasonServiceList(seasonId: string): Promise<IServiceInfo[]> {
        const dbResult = await this._dataProvider.getSeasonServiceList(seasonId);

        const services: IServiceInfo[] = dbResult
            .map((row) => HazzatContentUtils.convertServiceDbItemToServiceInfo(row));
        return services;
    }

    @measure
    public async getSeasonService(seasonId: string, serviceId: string): Promise<IServiceInfo> {
        const dbResult = await this._dataProvider.getSeasonService(seasonId, serviceId);
        return HazzatContentUtils.convertServiceDbItemToServiceInfo(dbResult);
    }

    @measure
    public async getServiceHymnList(seasonId: string, serviceId: string): Promise<IHymnInfo[]> {
        const dbResult = await this._dataProvider.getServiceHymnList(seasonId, serviceId);

        const serviceHymns: IHymnInfo[] = dbResult
            .map((row) => HazzatContentUtils.convertServiceHymnDbItemToHymnInfo(row));
        return serviceHymns;
    }

    @measure
    public async getServiceHymn(seasonId: string, serviceId: string, hymnId: string): Promise<IHymnInfo> {
        const dbResult = await this._dataProvider.getServiceHymn(seasonId, serviceId, hymnId);
        return HazzatContentUtils.convertServiceHymnDbItemToHymnInfo(dbResult);
    }

    @measure
    public async getServiceHymnFormatList(seasonId: string, serviceId: string, hymnId: string): Promise<IFormatInfo[]> {
        const dbResult = await this._dataProvider.getServiceHymnFormatList(seasonId, serviceId, hymnId);

        const serviceHymns: IFormatInfo[] = dbResult
            .map((row) => HazzatContentUtils.convertServiceHymnFormatDbItemToFormatInfo(row));
        return serviceHymns;
    }

    @measure
    public async getServiceHymnFormat(seasonId: string, serviceId: string, hymnId: string, formatId: string): Promise<IFormatInfo> {
        const dbResult = await this._dataProvider.getServiceHymnFormat(seasonId, serviceId, hymnId, formatId);
        return HazzatContentUtils.convertServiceHymnFormatDbItemToFormatInfo(dbResult);
    }

    @measure
    public async getServiceHymnsFormatVariationList<T extends IHymnContent>(seasonId: string, serviceId: string, hymnId: string, formatId: string): Promise<IVariationInfo<T>[]> {
        const dbResult = await this._dataProvider.getServiceHymnsFormatVariationList(seasonId, serviceId, hymnId, formatId);

        const serviceHymns: IVariationInfo<T>[] = await Promise.all(dbResult
            .map((row) => HazzatContentUtils.convertServiceHymnFormatContentDbItemToServiceHymnFormatContentInfo<T>(row, this._dataProvider)));
        return serviceHymns;
    }

    @measure
    public async getServiceHymnsFormatVariation<T extends IHymnContent>(seasonId: string, serviceId: string, hymnId: string, formatId: string, contentId: string): Promise<IVariationInfo<T>> {
        const dbResult = await this._dataProvider.getServiceHymnsFormatVariation(seasonId, serviceId, hymnId, formatId, contentId);
        return await HazzatContentUtils.convertServiceHymnFormatContentDbItemToServiceHymnFormatContentInfo<T>(dbResult, this._dataProvider);
    }

    @measure
    public async getTypeList(): Promise<ITypeInfo[]> {
        const dbResult = await this._dataProvider.getTypeList();

        const types: ITypeInfo[] = dbResult
            .map((row) => HazzatContentUtils.convertTypeDbItemToTypeInfo(row));
        return types;
    }

    @measure
    public async getType(typeId: string): Promise<ITypeInfo> {
        const dbResult = await this._dataProvider.getType(typeId);
        return HazzatContentUtils.convertTypeDbItemToTypeInfo(dbResult);
    }

    @measure
    public async getTypeSeasonList(typeId: string): Promise<ISeasonInfo[]> {
        const dbResult = await this._dataProvider.getTypeSeasonList(typeId);

        const seasons: ISeasonInfo[] = dbResult
            .map((row) => HazzatContentUtils.convertSeasonDbItemToTypeSeasonInfo(row, typeId));
        return seasons;
    }

    @measure
    public async getTypeSeason(typeId: string, seasonId: string): Promise<ISeasonInfo> {
        const dbResult = await this._dataProvider.getTypeSeason(typeId, seasonId);
        return HazzatContentUtils.convertSeasonDbItemToTypeSeasonInfo(dbResult, typeId);
    }

    @measure
    public async getTuneList(): Promise<ITuneInfo[]> {
        const dbResult = await this._dataProvider.getTuneList();

        const types: ITuneInfo[] = dbResult
            .map((row) => HazzatContentUtils.convertTuneDbItemToTypeInfo(row));
        return types;
    }

    @measure
    public async getTune(tuneId: string): Promise<ITuneInfo> {
        const dbResult = await this._dataProvider.getTune(tuneId);
        return HazzatContentUtils.convertTuneDbItemToTypeInfo(dbResult);
    }

    @measure
    public async getTuneSeasonList(tuneId: string): Promise<ISeasonInfo[]> {
        const dbResult = await this._dataProvider.getTuneSeasonList(tuneId);

        const seasons: ISeasonInfo[] = dbResult
            .map((row) => HazzatContentUtils.convertSeasonDbItemToTuneSeasonInfo(row, tuneId));
        return seasons;
    }

    @measure
    public async getTuneSeason(tuneId: string, seasonId: string): Promise<ISeasonInfo> {
        const dbResult = await this._dataProvider.getTuneSeason(tuneId, seasonId);
        return HazzatContentUtils.convertSeasonDbItemToTuneSeasonInfo(dbResult, tuneId);
    }
}
