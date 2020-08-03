import { ISeasonInfo } from "../Models/ISeasonInfo";
import { IServiceHymnFormatInfo } from "../Models/IServiceHymnFormatInfo";
import { IServiceHymnInfo } from "../Models/IServiceHymnInfo";
import { IServiceInfo } from "../Models/IServiceInfo";
import { IServiceHymnFormatContentInfo, ITextContent, IHazzatContent, IHymnContent } from "../Models/IServiceHymnFormatContentInfo";

/**
 * Data Provider Interface
 */
export interface IDataProvider {
    getSeasonList(): Promise<ISeasonInfo[]>;
    getSeason(seasonId: string): Promise<ISeasonInfo>;

    getSeasonServiceList(seasonId: string): Promise<IServiceInfo[]>;
    getSeasonService(seasonId: string, serviceId: string): Promise<IServiceInfo>;

    getServiceHymnList(seasonId: string, serviceId: string): Promise<IServiceHymnInfo[]>;
    getServiceHymn(seasonId: string, serviceId: string, serviceHymnId: string): Promise<IServiceHymnInfo>;

    getServiceHymnFormatList(seasonId: string, serviceId: string, serviceHymnId: string): Promise<IServiceHymnFormatInfo[]>;
    getServiceHymnFormat(seasonId: string, serviceId: string, serviceHymnId: string, formatId: string): Promise<IServiceHymnFormatInfo>;

    getServiceHymnsFormatContentList<T extends IHymnContent>(seasonId: string, serviceId: string, serviceHymnId: string, formatId: string): Promise<IServiceHymnFormatContentInfo<T>[]>;
    getServiceHymnsFormatContent<T extends IHymnContent>(seasonId: string, serviceId: string, serviceHymnId: string, formatId: string, contentId: string): Promise<IServiceHymnFormatContentInfo<T>>;
}
