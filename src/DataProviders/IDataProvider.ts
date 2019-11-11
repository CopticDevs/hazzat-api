import { ISeasonInfo } from "../Models/ISeasonInfo";
import { IServiceInfo } from "../Models/IServiceInfo";

/**
 * Data Provider Interface
 */
export interface IDataProvider {
    getSeasonList(): Promise<ISeasonInfo[]>;
    getSeason(seasonId: string): Promise<ISeasonInfo>;
    getSeasonServices(seasonId: string): Promise<IServiceInfo[]>;
}
