 import { inject, injectable } from "inversify";
import { ServiceLanguage } from "../../Common/Types/ServiceLanguage";
import { measure } from "../../Common/Utils/MeasureDecorator";
import { IBookletInfo } from "../../Models/IBookletInfo";
import { IFormatInfo } from "../../Models/IFormatInfo";
import { IHymnInfo, IHymnInfoWithServiceDetails } from "../../Models/IHymnInfo";
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
    public async getSeasonList(lang: ServiceLanguage): Promise<ISeasonInfo[]> {
        const dbResult = await this._dataProvider.getSeasonList();

        const seasons: ISeasonInfo[] = dbResult
            .map((row) => HazzatContentUtils.convertSeasonDbItemToSeasonInfo(lang, row));
        return seasons;
    }

    @measure
    public async getSeason(lang: ServiceLanguage, seasonId: string): Promise<ISeasonInfo> {
        const dbResult = await this._dataProvider.getSeason(seasonId);
        return HazzatContentUtils.convertSeasonDbItemToSeasonInfo(lang, dbResult);
    }

    @measure
    public async getSeasonServiceList(lang: ServiceLanguage, seasonId: string): Promise<IServiceInfo[]> {
        const dbResult = await this._dataProvider.getSeasonServiceList(seasonId);

        const services: IServiceInfo[] = dbResult
            .map((row) => HazzatContentUtils.convertServiceDbItemToServiceInfo(lang, row));
        return services;
    }

    @measure
    public async getSeasonService(lang: ServiceLanguage, seasonId: string, serviceId: string): Promise<IServiceInfo> {
        const dbResult = await this._dataProvider.getSeasonService(seasonId, serviceId);
        return HazzatContentUtils.convertServiceDbItemToServiceInfo(lang, dbResult);
    }

    @measure
    public async getServiceHymnList(lang: ServiceLanguage, seasonId: string, serviceId: string): Promise<IHymnInfo[]> {
        const dbResult = await this._dataProvider.getServiceHymnList(seasonId, serviceId);

        const serviceHymns: IHymnInfo[] = dbResult
            .map((row) => HazzatContentUtils.convertServiceHymnDbItemToHymnInfo(lang, row));
        return serviceHymns;
    }

    @measure
    public async getServiceHymn(lang: ServiceLanguage, seasonId: string, serviceId: string, hymnId: string): Promise<IHymnInfo> {
        const dbResult = await this._dataProvider.getServiceHymn(seasonId, serviceId, hymnId);
        return HazzatContentUtils.convertServiceHymnDbItemToHymnInfo(lang, dbResult);
    }

    @measure
    public async getServiceHymnFormatList(lang: ServiceLanguage, seasonId: string, serviceId: string, hymnId: string): Promise<IFormatInfo[]> {
        const dbResult = await this._dataProvider.getServiceHymnFormatList(seasonId, serviceId, hymnId);

        const formats: IFormatInfo[] = dbResult
            .map((row) => HazzatContentUtils.convertServiceHymnFormatDbItemToFormatInfo(lang, row));
        return formats;
    }

    @measure
    public async getServiceHymnFormat(lang: ServiceLanguage, seasonId: string, serviceId: string, hymnId: string, formatId: string): Promise<IFormatInfo> {
        const dbResult = await this._dataProvider.getServiceHymnFormat(seasonId, serviceId, hymnId, formatId);
        return HazzatContentUtils.convertServiceHymnFormatDbItemToFormatInfo(lang, dbResult);
    }

    @measure
    public async getServiceHymnsFormatVariationList<T extends IHymnContent>(lang: ServiceLanguage, seasonId: string, serviceId: string, hymnId: string, formatId: string): Promise<IVariationInfo<T>[]> {
        const dbResult = await this._dataProvider.getServiceHymnsFormatVariationList(seasonId, serviceId, hymnId, formatId);

        const variations: IVariationInfo<T>[] = await Promise.all(dbResult
            .map((row) => HazzatContentUtils.convertServiceHymnFormatContentDbItemToServiceHymnFormatContentInfo<T>(lang, row, this._dataProvider)));
        return variations;
    }

    @measure
    public async getServiceHymnsFormatVariation<T extends IHymnContent>(lang: ServiceLanguage, seasonId: string, serviceId: string, hymnId: string, formatId: string, variationId: string): Promise<IVariationInfo<T>> {
        const dbResult = await this._dataProvider.getServiceHymnsFormatVariation(seasonId, serviceId, hymnId, formatId, variationId);
        return await HazzatContentUtils.convertServiceHymnFormatContentDbItemToServiceHymnFormatContentInfo<T>(lang, dbResult, this._dataProvider);
    }

    @measure
    public async getTypeList(lang: ServiceLanguage): Promise<ITypeInfo[]> {
        const dbResult = await this._dataProvider.getTypeList();

        const types: ITypeInfo[] = dbResult
            .map((row) => HazzatContentUtils.convertTypeDbItemToTypeInfo(lang, row));
        return types;
    }

    @measure
    public async getType(lang: ServiceLanguage, typeId: string): Promise<ITypeInfo> {
        const dbResult = await this._dataProvider.getType(typeId);
        return HazzatContentUtils.convertTypeDbItemToTypeInfo(lang, dbResult);
    }

    @measure
    public async getTypeSeasonList(lang: ServiceLanguage, typeId: string): Promise<ISeasonInfo[]> {
        const dbResult = await this._dataProvider.getTypeSeasonList(typeId);

        const seasons: ISeasonInfo[] = dbResult
            .map((row) => HazzatContentUtils.convertSeasonDbItemToTypeSeasonInfo(lang, row, typeId));
        return seasons;
    }

    @measure
    public async getTypeSeason(lang: ServiceLanguage, typeId: string, seasonId: string): Promise<ISeasonInfo> {
        const dbResult = await this._dataProvider.getTypeSeason(typeId, seasonId);
        return HazzatContentUtils.convertSeasonDbItemToTypeSeasonInfo(lang, dbResult, typeId);
    }

    @measure
    public async getTypeSeasonServiceHymnList(lang: ServiceLanguage, typeId: string, seasonId: string): Promise<IHymnInfoWithServiceDetails[]> {
        const dbResult = await this._dataProvider.getTypeSeasonServiceHymnList(typeId, seasonId);

        const serviceHymns: IHymnInfoWithServiceDetails[] = dbResult
            .map((row) => HazzatContentUtils.convertTypeServiceHymnDbItemToHymnInfoWithServiceDetails(lang, row, typeId));
        return serviceHymns;
    }

    @measure
    public async getTypeSeasonServiceHymn(lang: ServiceLanguage, typeId: string, seasonId: string, hymnId: string): Promise<IHymnInfoWithServiceDetails> {
        const dbResult = await this._dataProvider.getTypeSeasonServiceHymn(typeId, seasonId, hymnId);
        return HazzatContentUtils.convertTypeServiceHymnDbItemToHymnInfoWithServiceDetails(lang, dbResult, typeId);
    }

    @measure
    public async getTypeSeasonServiceHymnFormatList(lang: ServiceLanguage, typeId: string, seasonId: string, hymnId: string): Promise<IFormatInfo[]> {
        const dbResult = await this._dataProvider.getTypeSeasonServiceHymnFormatList(typeId, seasonId, hymnId);

        const formats: IFormatInfo[] = dbResult
            .map((row) => HazzatContentUtils.convertServiceHymnFormatDbItemToTypeFormatInfo(lang, row, typeId));
        return formats;
    }

    @measure
    public async getTypeSeasonServiceHymnFormat(lang: ServiceLanguage, typeId: string, seasonId: string, hymnId: string, formatId: string): Promise<IFormatInfo> {
        const dbResult = await this._dataProvider.getTypeSeasonServiceHymnFormat(typeId, seasonId, hymnId, formatId);
        return HazzatContentUtils.convertServiceHymnFormatDbItemToTypeFormatInfo(lang, dbResult, typeId);
    }

    @measure
    public async getTypeSeasonServiceHymnFormatVariationList<T extends IHymnContent>(lang: ServiceLanguage, typeId: string, seasonId: string, hymnId: string, formatId: string): Promise<IVariationInfo<T>[]> {
        const dbResult = await this._dataProvider.getTypeSeasonServiceHymnFormatVariationList(typeId, seasonId, hymnId, formatId);

        const variations: IVariationInfo<T>[] = await Promise.all(dbResult
            .map((row) => HazzatContentUtils.convertServiceHymnFormatContentDbItemToTypeServiceHymnFormatContentInfo<T>(lang, row, this._dataProvider, typeId)));
        return variations;
    }

    @measure
    public async getTypeSeasonServiceHymnFormatVariation<T extends IHymnContent>(lang: ServiceLanguage, typeId: string, seasonId: string, hymnId: string, formatId: string, variationId: string): Promise<IVariationInfo<T>> {
        const dbResult = await this._dataProvider.getTypeSeasonServiceHymnFormatVariation(typeId, seasonId, hymnId, formatId, variationId);
        return HazzatContentUtils.convertServiceHymnFormatContentDbItemToTypeServiceHymnFormatContentInfo<T>(lang, dbResult, this._dataProvider, typeId);
    }

    @measure
    public async getTuneList(lang: ServiceLanguage): Promise<ITuneInfo[]> {
        const dbResult = await this._dataProvider.getTuneList();

        const types: ITuneInfo[] = dbResult
            .map((row) => HazzatContentUtils.convertTuneDbItemToTypeInfo(lang, row));
        return types;
    }

    @measure
    public async getTune(lang: ServiceLanguage, tuneId: string): Promise<ITuneInfo> {
        const dbResult = await this._dataProvider.getTune(tuneId);
        return HazzatContentUtils.convertTuneDbItemToTypeInfo(lang, dbResult);
    }

    @measure
    public async getTuneSeasonList(lang: ServiceLanguage, tuneId: string): Promise<ISeasonInfo[]> {
        const dbResult = await this._dataProvider.getTuneSeasonList(tuneId);

        const seasons: ISeasonInfo[] = dbResult
            .map((row) => HazzatContentUtils.convertSeasonDbItemToTuneSeasonInfo(lang, row, tuneId));
        return seasons;
    }

    @measure
    public async getTuneSeason(lang: ServiceLanguage, tuneId: string, seasonId: string): Promise<ISeasonInfo> {
        const dbResult = await this._dataProvider.getTuneSeason(tuneId, seasonId);
        return HazzatContentUtils.convertSeasonDbItemToTuneSeasonInfo(lang, dbResult, tuneId);
    }

    @measure
    public async getTuneSeasonServiceHymnList(lang: ServiceLanguage, tuneId: string, seasonId: string): Promise<IHymnInfoWithServiceDetails[]> {
        const dbResult = await this._dataProvider.getTuneSeasonServiceHymnList(tuneId, seasonId);

        const serviceHymns: IHymnInfoWithServiceDetails[] = dbResult
            .map((row) => HazzatContentUtils.convertTuneServiceHymnDbItemToHymnInfoWithServiceDetails(lang, row, tuneId));
        return serviceHymns;
    }

    @measure
    public async getTuneSeasonServiceHymn(lang: ServiceLanguage, tuneId: string, seasonId: string, hymnId: string): Promise<IHymnInfoWithServiceDetails> {
        const dbResult = await this._dataProvider.getTuneSeasonServiceHymn(tuneId, seasonId, hymnId);
        return HazzatContentUtils.convertTuneServiceHymnDbItemToHymnInfoWithServiceDetails(lang, dbResult, tuneId);
    }

    @measure
    public async getTuneSeasonServiceHymnFormatList(lang: ServiceLanguage, tuneId: string, seasonId: string, hymnId: string): Promise<IFormatInfo[]> {
        const dbResult = await this._dataProvider.getTuneSeasonServiceHymnFormatList(tuneId, seasonId, hymnId);

        const formats: IFormatInfo[] = dbResult
            .map((row) => HazzatContentUtils.convertServiceHymnFormatDbItemToTuneFormatInfo(lang, row, tuneId));
        return formats;
    }

    @measure
    public async getTuneSeasonServiceHymnFormat(lang: ServiceLanguage, tuneId: string, seasonId: string, hymnId: string, formatId: string): Promise<IFormatInfo> {
        const dbResult = await this._dataProvider.getTuneSeasonServiceHymnFormat(tuneId, seasonId, hymnId, formatId);
        return HazzatContentUtils.convertServiceHymnFormatDbItemToTuneFormatInfo(lang, dbResult, tuneId);
    }

    @measure
    public async getTuneSeasonServiceHymnFormatVariationList<T extends IHymnContent>(lang: ServiceLanguage, tuneId: string, seasonId: string, hymnId: string, formatId: string): Promise<IVariationInfo<T>[]> {
        const dbResult = await this._dataProvider.getTuneSeasonServiceHymnFormatVariationList(tuneId, seasonId, hymnId, formatId);

        const variations: IVariationInfo<T>[] = await Promise.all(dbResult
            .map((row) => HazzatContentUtils.convertServiceHymnFormatContentDbItemToTuneServiceHymnFormatContentInfo<T>(lang, row, this._dataProvider, tuneId)))
        return variations;
    }

    @measure
    public async getTuneSeasonServiceHymnFormatVariation<T extends IHymnContent>(lang: ServiceLanguage, tuneId: string, seasonId: string, hymnId: string, formatId: string, variationId: string): Promise<IVariationInfo<T>> {
        const dbResult = await this._dataProvider.getTuneSeasonServiceHymnFormatVariation(tuneId, seasonId, hymnId, formatId, variationId);
        return HazzatContentUtils.convertServiceHymnFormatContentDbItemToTuneServiceHymnFormatContentInfo<T>(lang, dbResult, this._dataProvider, tuneId);
    }

    @measure
    public async getBookletList(): Promise<IBookletInfo[]> {
        const dbResult = await this._dataProvider.getBookletList();

        const variations: IBookletInfo[] = await Promise.all(dbResult
            .map((row) => HazzatContentUtils.convertBookletDbItemToBookletInfo(row)))
        return variations;
    }

    @measure
    public async getBooklet(bookletId: string): Promise<IBookletInfo> {
        const dbResult = await this._dataProvider.getBooklet(bookletId);
        return HazzatContentUtils.convertBookletDbItemToBookletInfo(dbResult);
    }
}
