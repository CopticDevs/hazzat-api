export namespace HazzatDbSchema {
    export interface ISeason {
        ItemId: number;
        Name: string;
        Name_Arabic: string;
        Verse: string;
        Verse_Arabic: string;
        Season_Order: number;
        Reason_ID: number;
        Reason_Name: string;
        Date_Specific: boolean;
    }

    export interface IService {
        ItemId: number;
        Season_ID: number;
        Season_Name: string;
        Season_Name_Arabic: string;
        Service_Name: string;
        Service_Name_Arabic: string;
        Service_Order: number;
    }

    export interface IServiceHymn {
        ItemId: number;
        Season_ID: number;
        Season_Name: string;
        Season_Name_Arabic: string;
        Service_ID: number;
        Service_Name: string;
        Service_Name_Arabic: string;
        Service_Order: number;
        Hymn_Order: number;
        Title: string;
        Title_Arabic: string;
    }

    export interface IServiceHymnFormat {
        ItemId: number;
        Format_Name: string;
        Format_Name_Arabic: string;
        Season_ID: number;
        Season_Name: string;
        Season_Name_Arabic: string;
        Service_ID: number;
        Service_Name: string;
        Service_Name_Arabic: string;
        Hymn_Order: number;
        ServiceHymn_ID: number;
        ServiceHymn_Title: string;
        ServiceHymn_Title_Arabic: string;
        Content_Count: number;
    }

    export interface IServiceHymnFormatContent {
        ItemId: number;
        Content_Name: string;
        Content_Name_Arabic: string;
        Content_Arabic: string;
        Content_Coptic: string;
        Content_English: string;
        Audio_Path: string;
        Music_Path: string;
        Season_ID: number;
        Season_Name: string;
        Season_Name_Arabic: string;
        Reason_ID: number;
        Service_ID: number;
        Service_Name: string;
        Service_Name_Arabic: string;
        ServiceHymn_ID: number;
        ServiceHymn_Title: string;
        ServiceHymn_Title_Arabic: string;
        Format_ID: number;
        Format_Name: string;
        Format_Name_Arabic: string;
    }

    export interface ICommonContent {
        ItemId: number;
        Name: string;
        Content: string;
        Language: string;
        Format_ID: number;
    }

    export interface IReason {
        ItemId: number;
        Name: string;
        Long_English: string;
        Long_Coptic: string;
        Long_Arabic: string;
        Short_English: string;
        Short_Coptic: string;
        Short_Arabic: string;
    }

    export interface IType {
        ItemId: number;
        Name: string;
        Name_Arabic: string;
        Name_Short: string;
        Name_Short_Arabic: string;
        Type_Order: number;
        ServiceHymnsCount: number;
    }

    export interface ITune {
        ItemId: number;
        Name: string;
        Name_Arabic: string;
        Tune_Order: number;
        ServiceHymnsCount: number;
    }

    export interface IBooklet {
        ItemId: number;
        Name: string;
        Name_Arabic: string;
        Booklet_Order: number;
        Source_Path: string;
        Display_Path: string;
        Print_Path: string;
        Thumbnail: string;
        Full_Picture: string;
        Release_Date: string;
        Summary: string;
        Summary_Arabic: string;
    }
}
