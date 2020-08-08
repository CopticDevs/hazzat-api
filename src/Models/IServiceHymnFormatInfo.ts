import { IServiceHymnInfo } from "./IServiceHymnInfo";

/*
 * Service Hymn Format Info
 */
export interface IServiceHymnFormatInfo extends IServiceHymnInfo {
    serviceHymnId: number;
    serviceHymnName: string;
    contentCount: number;
}
