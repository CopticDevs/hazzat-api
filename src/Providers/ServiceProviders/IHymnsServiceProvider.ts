import { ServiceLanguage } from "../../Common/Types/ServiceLanguage";
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

    getTypeList(lang: ServiceLanguage): Promise<ITypeInfo[]>;
    getType(lang: ServiceLanguage, typeId: string): Promise<ITypeInfo>;

    getTypeSeasonList(lang: ServiceLanguage, typeId: string): Promise<ISeasonInfo[]>;
    getTypeSeason(lang: ServiceLanguage, typeId: string, seasonId: string): Promise<ISeasonInfo>;

    getTypeSeasonServiceHymnList(lang: ServiceLanguage, typeId: string, seasonId: string): Promise<IHymnInfoWithServiceDetails[]>;
    getTypeSeasonServiceHymn(lang: ServiceLanguage, typeId: string, seasonId: string, hymnId: string): Promise<IHymnInfoWithServiceDetails>;

    getTypeSeasonServiceHymnFormatList(lang: ServiceLanguage, typeId: string, seasonId: string, hymnId: string): Promise<IFormatInfo[]>;
    getTypeSeasonServiceHymnFormat(lang: ServiceLanguage, typeId: string, seasonId: string, hymnId: string, formatId: string): Promise<IFormatInfo>;

    getTypeSeasonServiceHymnFormatVariationList<T extends IHymnContent>(lang: ServiceLanguage, typeId: string, seasonId: string, hymnId: string, formatId: string): Promise<IVariationInfo<T>[]>;
    getTypeSeasonServiceHymnFormatVariation<T extends IHymnContent>(lang: ServiceLanguage, typeId: string, seasonId: string, hymnId: string, formatId: string, variationId: string): Promise<IVariationInfo<T>>;

    getTuneList(lang: ServiceLanguage): Promise<ITuneInfo[]>;
    getTune(lang: ServiceLanguage, tuneId: string): Promise<ITuneInfo>;

    getTuneSeasonList(lang: ServiceLanguage, tuneId: string): Promise<ISeasonInfo[]>;
    getTuneSeason(lang: ServiceLanguage, tuneId: string, seasonId: string): Promise<ISeasonInfo>;

    getTuneSeasonServiceHymnList(lang: ServiceLanguage, tuneId: string, seasonId: string): Promise<IHymnInfoWithServiceDetails[]>;
    getTuneSeasonServiceHymn(lang: ServiceLanguage, tuneId: string, seasonId: string, hymnId: string): Promise<IHymnInfoWithServiceDetails>;

    getTuneSeasonServiceHymnFormatList(lang: ServiceLanguage, tuneId: string, seasonId: string, hymnId: string): Promise<IFormatInfo[]>;
    getTuneSeasonServiceHymnFormat(lang: ServiceLanguage, tuneId: string, seasonId: string, hymnId: string, formatId: string): Promise<IFormatInfo>;

    getTuneSeasonServiceHymnFormatVariationList<T extends IHymnContent>(lang: ServiceLanguage, tuneId: string, seasonId: string, hymnId: string, formatId: string): Promise<IVariationInfo<T>[]>;
    getTuneSeasonServiceHymnFormatVariation<T extends IHymnContent>(lang: ServiceLanguage, tuneId: string, seasonId: string, hymnId: string, formatId: string, variationId: string): Promise<IVariationInfo<T>>;

    getBookletList(): Promise<IBookletInfo[]>;
    getBooklet(bookletId: string): Promise<IBookletInfo>;
}
