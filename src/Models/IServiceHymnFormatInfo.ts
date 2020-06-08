import { IServiceHymnInfo } from "./IServiceHymnInfo";

/*
 * Service Info
 */
export interface IServiceHymnFormatInfo extends IServiceHymnInfo {
    serviceHymnId: number;
    serviceHymnName: string;
    formatCount: number;
}
