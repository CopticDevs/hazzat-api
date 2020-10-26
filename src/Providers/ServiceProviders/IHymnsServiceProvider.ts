import { IFormatInfo } from "../../Models/IFormatInfo";
import { IHymnInfo } from "../../Models/IHymnInfo";
import { ISeasonInfo } from "../../Models/ISeasonInfo";
import { IServiceInfo } from "../../Models/IServiceInfo";
import { IHymnContent, IVariationInfo } from "../../Models/IVariationInfo";

/**
 * Hymns Provider Interface
 */
export interface IHymnsServiceProvider {
    getSeasonList(): Promise<ISeasonInfo[]>;
    getSeason(seasonId: string): Promise<ISeasonInfo>;

    getSeasonServiceList(seasonId: string): Promise<IServiceInfo[]>;
    getSeasonService(seasonId: string, serviceId: string): Promise<IServiceInfo>;

    getServiceHymnList(seasonId: string, serviceId: string): Promise<IHymnInfo[]>;
    getServiceHymn(seasonId: string, serviceId: string, hymnId: string): Promise<IHymnInfo>;

    getServiceHymnFormatList(seasonId: string, serviceId: string, hymnId: string): Promise<IFormatInfo[]>;
    getServiceHymnFormat(seasonId: string, serviceId: string, hymnId: string, formatId: string): Promise<IFormatInfo>;

    getServiceHymnsFormatVariationList<T extends IHymnContent>(seasonId: string, serviceId: string, hymnId: string, formatId: string): Promise<IVariationInfo<T>[]>;
    getServiceHymnsFormatVariation<T extends IHymnContent>(seasonId: string, serviceId: string, hymnId: string, formatId: string, contentId: string): Promise<IVariationInfo<T>>;
}
