import { ReadonlyStringMap } from "../Common/Types/StringMap";

/*
 * Service Info
 */
export interface IServiceInfo {
    id: number;
    seasonId: number;
    serviceId: number;
    name: string;
    order: number;
}
