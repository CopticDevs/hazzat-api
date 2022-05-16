﻿import { ServiceLanguage } from "../../Common/Types/ServiceLanguage";
import { IBookletInfo } from "../../Models/IBookletInfo";
import { IFormatInfo } from "../../Models/IFormatInfo";
import { IHymnInfo, IHymnInfoWithServiceDetails } from "../../Models/IHymnInfo";
import { ISeasonInfo } from "../../Models/ISeasonInfo";
import { IServiceInfo } from "../../Models/IServiceInfo";
import { ITuneInfo } from "../../Models/ITuneInfo";
import { ITypeInfo } from "../../Models/ITypeInfo";
import { IHymnContent, IVariationInfo } from "../../Models/IVariationInfo";

/**
 * Hymns Provider Interface
 */
export interface IHymnsServiceProvider {
    getSeasonList(lang: ServiceLanguage): Promise<ISeasonInfo[]>;
    getSeason(lang: ServiceLanguage, seasonId: string): Promise<ISeasonInfo>;

    getSeasonServiceList(lang: ServiceLanguage, seasonId: string): Promise<IServiceInfo[]>;
    getSeasonService(lang: ServiceLanguage, seasonId: string, serviceId: string): Promise<IServiceInfo>;

    getServiceHymnList(lang: ServiceLanguage, seasonId: string, serviceId: string): Promise<IHymnInfo[]>;
    getServiceHymn(lang: ServiceLanguage, seasonId: string, serviceId: string, hymnId: string): Promise<IHymnInfo>;

    getServiceHymnFormatList(lang: ServiceLanguage, seasonId: string, serviceId: string, hymnId: string): Promise<IFormatInfo[]>;
    getServiceHymnFormat(lang: ServiceLanguage, seasonId: string, serviceId: string, hymnId: string, formatId: string): Promise<IFormatInfo>;

    getServiceHymnsFormatVariationList<T extends IHymnContent>(lang: ServiceLanguage, seasonId: string, serviceId: string, hymnId: string, formatId: string): Promise<IVariationInfo<T>[]>;
    getServiceHymnsFormatVariation<T extends IHymnContent>(lang: ServiceLanguage, seasonId: string, serviceId: string, hymnId: string, formatId: string, variationId: string): Promise<IVariationInfo<T>>;

    getTypeList(): Promise<ITypeInfo[]>;
    getType(typeId: string): Promise<ITypeInfo>;

    getTypeSeasonList(typeId: string): Promise<ISeasonInfo[]>;
    getTypeSeason(typeId: string, seasonId: string): Promise<ISeasonInfo>;

    getTypeSeasonServiceHymnList(typeId: string, seasonId: string): Promise<IHymnInfoWithServiceDetails[]>;
    getTypeSeasonServiceHymn(typeId: string, seasonId: string, hymnId: string): Promise<IHymnInfoWithServiceDetails>;

    getTypeSeasonServiceHymnFormatList(typeId: string, seasonId: string, hymnId: string): Promise<IFormatInfo[]>;
    getTypeSeasonServiceHymnFormat(typeId: string, seasonId: string, hymnId: string, formatId: string): Promise<IFormatInfo>;

    getTypeSeasonServiceHymnFormatVariationList<T extends IHymnContent>(typeId: string, seasonId: string, hymnId: string, formatId: string): Promise<IVariationInfo<T>[]>;
    getTypeSeasonServiceHymnFormatVariation<T extends IHymnContent>(typeId: string, seasonId: string, hymnId: string, formatId: string, variationId: string): Promise<IVariationInfo<T>>;

    getTuneList(): Promise<ITuneInfo[]>;
    getTune(tuneId: string): Promise<ITuneInfo>;

    getTuneSeasonList(tuneId: string): Promise<ISeasonInfo[]>;
    getTuneSeason(tuneId: string, seasonId: string): Promise<ISeasonInfo>;

    getTuneSeasonServiceHymnList(tuneId: string, seasonId: string): Promise<IHymnInfoWithServiceDetails[]>;
    getTuneSeasonServiceHymn(tuneId: string, seasonId: string, hymnId: string): Promise<IHymnInfoWithServiceDetails>;

    getTuneSeasonServiceHymnFormatList(tuneId: string, seasonId: string, hymnId: string): Promise<IFormatInfo[]>;
    getTuneSeasonServiceHymnFormat(tuneId: string, seasonId: string, hymnId: string, formatId: string): Promise<IFormatInfo>;

    getTuneSeasonServiceHymnFormatVariationList<T extends IHymnContent>(tuneId: string, seasonId: string, hymnId: string, formatId: string): Promise<IVariationInfo<T>[]>;
    getTuneSeasonServiceHymnFormatVariation<T extends IHymnContent>(tuneId: string, seasonId: string, hymnId: string, formatId: string, variationId: string): Promise<IVariationInfo<T>>;

    getBookletList(): Promise<IBookletInfo[]>;
    getBooklet(bookletId: string): Promise<IBookletInfo>;
}
