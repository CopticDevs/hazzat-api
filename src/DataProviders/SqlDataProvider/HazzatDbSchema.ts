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
        Structure_Name: string;
        Season_ID: number;
        Season_Name: string;
        Service_Order: number;
        Service_ID: number;
        Service_Name: string;
        Text_Count: number;
        Hazzat_Count: number;
        VerticalHazzat_Count: number;
        Music_Count: number;
        Audio_Count: number;
        Video_Count: number;
        Information_Count: number;
    }

    export interface IServiceHymn {
        ItemId: number;
        Structure_ID: number;
        Structure_Name: string;
        Hymn_Order: number;
        Title: string;
        Text_Count: number;
        Hazzat_Count: number;
        VerticalHazzat_Count: number;
        Music_Count: number;
        Audio_Count: number;
        Video_Count: number;
        Information_Count: number;
    }
}
