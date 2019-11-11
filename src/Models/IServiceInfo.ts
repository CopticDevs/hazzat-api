import { ReadonlyStringMap } from "../Common/Types/StringMap";

/*
 * Service Info
 */
export interface IServiceInfo {
    id: number;
    name: string;
    order: number;
    contentCount: ReadonlyStringMap<number>;
}
