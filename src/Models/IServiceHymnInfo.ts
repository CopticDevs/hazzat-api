import { ReadonlyStringMap } from "../Common/Types/StringMap";

/*
 * Service Hymn Info
 */
export interface IServiceHymnInfo {
    id: number;
    name: string;
    order: number;
    contentCount: ReadonlyStringMap<number>;
}
