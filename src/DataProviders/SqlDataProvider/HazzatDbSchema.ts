export namespace HazzatDbSchema {
    export interface ISeason {
        ID: number;
        Name: string;
        Verse: string;
        Season_Order: number;
        Reason_ID: number;
        Date_Specific: boolean;
    }
}
