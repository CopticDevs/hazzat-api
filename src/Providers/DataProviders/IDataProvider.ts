import { IHymnContent, IVariationInfo } from "../../Models/IVariationInfo";
import { HazzatDbSchema } from "./SqlDataProvider/HazzatDbSchema";

/**
 * Data Provider Interface
 */
export interface IDataProvider {
    getSeasonList(): Promise<HazzatDbSchema.ISeason[]>;
    getSeason(seasonId: string): Promise<HazzatDbSchema.ISeason>;

    getSeasonServiceList(seasonId: string): Promise<HazzatDbSchema.IService[]>;
    getSeasonService(seasonId: string, serviceId: string): Promise<HazzatDbSchema.IService>;

    getServiceHymnList(seasonId: string, serviceId: string): Promise<HazzatDbSchema.IServiceHymn[]>;
    getServiceHymn(seasonId: string, serviceId: string, hymnId: string): Promise<HazzatDbSchema.IServiceHymn>;

    getServiceHymnFormatList(seasonId: string, serviceId: string, hymnId: string): Promise<HazzatDbSchema.IServiceHymnFormat[]>;
    getServiceHymnFormat(seasonId: string, serviceId: string, hymnId: string, formatId: string): Promise<HazzatDbSchema.IServiceHymnFormat>;

    getServiceHymnsFormatVariationList<T extends IHymnContent>(seasonId: string, serviceId: string, hymnId: string, formatId: string): Promise<IVariationInfo<T>[]>;
    getServiceHymnsFormatVariation<T extends IHymnContent>(seasonId: string, serviceId: string, hymnId: string, formatId: string, contentId: string): Promise<IVariationInfo<T>>;

    getCommonContent(commonId: string): Promise<string>;
}
