export module HazzatDbSchema {
    export interface Season {
        ID: number;
        Name: string;
        Verse: string;
        Season_Order: number;
        Reason_ID: number;
        Date_Specific: boolean;
    }
}
