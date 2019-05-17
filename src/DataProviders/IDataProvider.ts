import { SeasonInfo } from "../DataModels/SeasonInfo";

/*
 * Data Provider Interface
 */
export interface IDataProvider {
    getSeasonList(): Promise<void | SeasonInfo[]>;
    getSeason(seasonId: string): Promise<void | SeasonInfo>;
}
