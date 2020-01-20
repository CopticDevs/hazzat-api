import { ISeasonInfo } from "../Models/ISeasonInfo";
import { IServiceHymnInfo } from "../Models/IServiceHymnInfo";
import { IServiceInfo } from "../Models/IServiceInfo";

/**
 * Data Provider Interface
 */
export interface IDataProvider {
    getSeasonList(): Promise<ISeasonInfo[]>;
    getSeason(seasonId: string): Promise<ISeasonInfo>;
    getSeasonServiceList(seasonId: string): Promise<IServiceInfo[]>;
    getServiceHymnList(serviceId: string): Promise<IServiceHymnInfo[]>;
}
