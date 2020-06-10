export namespace HazzatDbSchema {
    export interface ISeason {
        ItemId: number;
        Name: string;
        Verse: string;
        Season_Order: number;
        Reason_ID: number;
        Reason_Name: string;
        Date_Specific: boolean;
    }

    export interface IService {
        ItemId: number;
        Season_ID: number;
        Season_Name: string;
        Service_Name: string;
        Service_Order: number;
    }

    export interface IServiceHymn {
        ItemId: number;
        Season_ID: number;
        Season_Name: string;
        Service_ID: number;
        Service_Name: string;
        Hymn_Order: number;
        Title: string;
    }

    export interface IServiceHymnFormat {
        ItemId: number;
        Format_Name: string;
        Season_ID: number;
        Season_Name: string;
        Service_ID: number;
        Service_Name: string;
        Hymn_Order: number;
        ServiceHymn_ID: number;
        ServiceHymn_Title: string;
        Format_Count: number;
    }
}
