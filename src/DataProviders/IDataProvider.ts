import { ISeasonInfo } from "../Models/ISeasonInfo";

/**
 * Data Provider Interface
 */
export interface IDataProvider {
    getSeasonList(): Promise<ISeasonInfo[]>;
    getSeason(seasonId: string): Promise<ISeasonInfo>;
}
