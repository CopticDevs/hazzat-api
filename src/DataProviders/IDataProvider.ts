import { SeasonInfo } from "../Models/SeasonInfo";

/**
 * Data Provider Interface
 */
export interface IDataProvider {
    getSeasonList(): Promise<SeasonInfo[]>;
    getSeason(seasonId: string): Promise<SeasonInfo>;
}

/** Options for Data Provider */
export interface IDataProviderOptions {
    settings: string;
}
