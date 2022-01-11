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

    getTypeSeasonList(typeId: string): Promise<HazzatDbSchema.ISeason[]>;
    getTypeSeason(typeId: string, seasonId: string): Promise<HazzatDbSchema.ISeason>;

    getTypeSeasonServiceHymnList(typeId: string, seasonId: string): Promise<HazzatDbSchema.IServiceHymn[]>;
    getTypeSeasonServiceHymn(typeId: string, seasonId: string, hymnId: string): Promise<HazzatDbSchema.IServiceHymn>;

    getTuneList(): Promise<HazzatDbSchema.ITune[]>;
    getTune(tuneId: string): Promise<HazzatDbSchema.ITune>;

    getTuneSeasonList(tuneId: string): Promise<HazzatDbSchema.ISeason[]>;
    getTuneSeason(tuneId: string, seasonId: string): Promise<HazzatDbSchema.ISeason>;

    getTuneSeasonServiceHymnList(tuneId: string, seasonId: string): Promise<HazzatDbSchema.IServiceHymn[]>;
    getTuneSeasonServiceHymn(tuneId: string, seasonId: string, hymnId: string): Promise<HazzatDbSchema.IServiceHymn>;
}
