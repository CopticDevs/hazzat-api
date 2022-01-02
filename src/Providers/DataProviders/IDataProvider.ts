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

    getServiceHymnsFormatVariationList(seasonId: string, serviceId: string, hymnId: string, formatId: string): Promise<HazzatDbSchema.IServiceHymnFormatContent[]>;
    getServiceHymnsFormatVariation(seasonId: string, serviceId: string, hymnId: string, formatId: string, contentId: string): Promise<HazzatDbSchema.IServiceHymnFormatContent>;

    getCommonContent(commonId: string): Promise<string>;
    getReason(reasonId: number): Promise<HazzatDbSchema.IReason>;

    getTypeList(): Promise<HazzatDbSchema.IType[]>;
    getType(typeId: string): Promise<HazzatDbSchema.IType>;

    getTuneList(): Promise<HazzatDbSchema.ITune[]>;
    getTune(tuneId: string): Promise<HazzatDbSchema.ITune>;
}
