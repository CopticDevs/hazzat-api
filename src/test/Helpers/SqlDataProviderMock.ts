import { HazzatDbSchema } from "../../Providers/DataProviders/SqlDataProvider/HazzatDbSchema";

export class SqlDataProviderMock {
    private static _season1: HazzatDbSchema.ISeason = {
        ItemId: 1,
        Name: "First Season",
        Date_Specific: true,
        Reason_ID: 2,
        Reason_Name: "Some Reason Name",
        Verse: "First Verse",
        Season_Order: 1
    };
    private static _season2: HazzatDbSchema.ISeason = {
        ItemId: 5,
        Name: "Second Season",
        Date_Specific: true,
        Reason_ID: 2,
        Reason_Name: "Some Reason Name",
        Verse: "Second Verse",
        Season_Order: 2
    };
    private static _season3: HazzatDbSchema.ISeason = {
        ItemId: 4,
        Name: "Third Season",
        Date_Specific: false,
        Reason_ID: 3,
        Reason_Name: "Some Other Reason Name",
        Verse: "Third Verse",
        Season_Order: 3
    };

    private static _service1: HazzatDbSchema.IService = {
        ItemId: 1,
        Season_ID: 2,
        Season_Name: "Some Season Name",
        Service_Name: "First Service Name",
        Service_Order: 1
    };
    private static _service2: HazzatDbSchema.IService = {
        ItemId: 90,
        Season_ID: 2,
        Season_Name: "Some Season Name",
        Service_Name: "Second Service Name",
        Service_Order: 2
    };
    private static _service3: HazzatDbSchema.IService = {
        ItemId: 4,
        Season_ID: 1,
        Season_Name: "Another Season Name",
        Service_Name: "Third Service Name",
        Service_Order: 3
    };

    private static _serviceHymn1: HazzatDbSchema.IServiceHymn = {
        ItemId: 1,
        Title: "First Hymn Title",
        Season_ID: 2,
        Season_Name: "Some Season Name",
        Service_ID: 3,
        Service_Name: "Some Service Name",
        Hymn_Order: 1
    };
    private static _serviceHymn2: HazzatDbSchema.IServiceHymn = {
        ItemId: 87,
        Title: "Second Hymn Title",
        Season_ID: 2,
        Season_Name: "Some Season Name",
        Service_ID: 3,
        Service_Name: "Some Service Name",
        Hymn_Order: 2
    };
    private static _serviceHymn3: HazzatDbSchema.IServiceHymn = {
        ItemId: 73,
        Title: "Third Hymn Title",
        Season_ID: 1,
        Season_Name: "Another Season Name",
        Service_ID: 2,
        Service_Name: "Another Service Name",
        Hymn_Order: 3
    };

    private static _serviceHymnFormat1: HazzatDbSchema.IServiceHymnFormat = {
        ItemId: 1,
        Format_Name: "First Format Name",
        Season_ID: 2,
        Season_Name: "Some Season Name",
        Service_ID: 3,
        Service_Name: "Some Service Name",
        ServiceHymn_ID: 4,
        ServiceHymn_Title: "Some Hymn Name",
        Content_Count: 123,
        Hymn_Order: 1
    };
    private static _serviceHymnFormat2: HazzatDbSchema.IServiceHymnFormat = {
        ItemId: 5,
        Format_Name: "Second Format Name",
        Season_ID: 2,
        Season_Name: "Some Season Name",
        Service_ID: 3,
        Service_Name: "Some Service Name",
        ServiceHymn_ID: 4,
        ServiceHymn_Title: "Some Hymn Name",
        Content_Count: 12,
        Hymn_Order: 2
    };
    private static _serviceHymnFormat3: HazzatDbSchema.IServiceHymnFormat = {
        ItemId: 2,
        Format_Name: "First Format Name",
        Season_ID: 5,
        Season_Name: "Other Season Name",
        Service_ID: 3,
        Service_Name: "Some Service Name",
        ServiceHymn_ID: 4,
        ServiceHymn_Title: "Some Hymn Name",
        Content_Count: 13,
        Hymn_Order: 3
    };

    private static _serviceHymnFormatContent1: HazzatDbSchema.IServiceHymnFormatContent = {
        ItemId: 1,
        Content_Name: "First Content Name",
        Season_ID: 2,
        Season_Name: "Some Season Name",
        Service_ID: 3,
        Service_Name: "Some Service Name",
        ServiceHymn_ID: 4,
        ServiceHymn_Title: "Some Hymn Name",
        Format_ID: 5,
        Format_Name: "Some Format Name",
        Reason_ID: 6,
        Content_Arabic: "Some sample Arabic content",
        Content_Coptic: "Some sample Coptic content",
        Content_English: "Some sample English content",
        Audio_Path: "Some Audio path",
        Music_Path: "Some Music path"
    };
    private static _serviceHymnFormatContent2: HazzatDbSchema.IServiceHymnFormatContent = {
        ItemId: 70,
        Content_Name: "Second Content Name",
        Season_ID: 2,
        Season_Name: "Some Season Name",
        Service_ID: 3,
        Service_Name: "Some Service Name",
        ServiceHymn_ID: 4,
        ServiceHymn_Title: "Some Hymn Name",
        Format_ID: 5,
        Format_Name: "Some Format Name",
        Reason_ID: 6,
        Content_Arabic: "Some sample Arabic content",
        Content_Coptic: "Some sample Coptic content",
        Content_English: "Some sample English content",
        Audio_Path: "Some Audio path",
        Music_Path: "Some Music path"
    };
    private static _serviceHymnFormatContent3: HazzatDbSchema.IServiceHymnFormatContent = {
        ItemId: 60,
        Content_Name: "First Content Name",
        Season_ID: 2,
        Season_Name: "Some Season Name",
        Service_ID: 3,
        Service_Name: "Some Service Name",
        ServiceHymn_ID: 4,
        ServiceHymn_Title: "Some Hymn Name",
        Format_ID: 5,
        Format_Name: "Some Format Name",
        Reason_ID: 6,
        Content_Arabic: "Some sample Arabic content",
        Content_Coptic: "Some sample Coptic content",
        Content_English: "Some sample English content",
        Audio_Path: "Some Audio path",
        Music_Path: "Some Music path"
    };

    private static _tune1: HazzatDbSchema.ITune = {
        ItemId: 1,
        Name: "First Tune",
        ServiceHymnsCount: 12,
        Tune_Order: 1
    };
    private static _tune2: HazzatDbSchema.ITune = {
        ItemId: 7,
        Name: "Second Tune",
        ServiceHymnsCount: 23,
        Tune_Order: 2
    };
    private static _tune3: HazzatDbSchema.ITune = {
        ItemId: 4,
        Name: "Second Tune",
        ServiceHymnsCount: 2,
        Tune_Order: 3
    };

    public static _type1: HazzatDbSchema.IType = {
        ItemId: 1,
        Name: "First Type Hymns",
        Name_Short: "First Type Hymn",
        ServiceHymnsCount: 12,
        Type_Order: 1
    };
    public static _type2: HazzatDbSchema.IType = {
        ItemId: 9,
        Name: "Second Type Hymns",
        Name_Short: "Second Type Hymn",
        ServiceHymnsCount: 32,
        Type_Order: 2
    };
    public static _type3: HazzatDbSchema.IType = {
        ItemId: 5,
        Name: "Third Type Hymns",
        Name_Short: "Thurd Type Hymn",
        ServiceHymnsCount: 7,
        Type_Order: 3
    };

    public static getDbSeasonsList(): HazzatDbSchema.ISeason[] {
        return [
            SqlDataProviderMock._season1,
            SqlDataProviderMock._season2,
            SqlDataProviderMock._season3
        ];
    }

    public static getDbSeason(dateSpecific: boolean = false): HazzatDbSchema.ISeason {
        return dateSpecific ? SqlDataProviderMock._season1 : SqlDataProviderMock._season3;
    }

    public static getDbSeasonServiceList(): HazzatDbSchema.IService[] {
        return [
            SqlDataProviderMock._service1,
            SqlDataProviderMock._service2,
            SqlDataProviderMock._service3
        ];
    }

    public static getDbSeasonService(): HazzatDbSchema.IService {
        return SqlDataProviderMock._service1;
    }

    public static getDbServiceHymnList(): HazzatDbSchema.IServiceHymn[] {
        return [
            SqlDataProviderMock._serviceHymn1,
            SqlDataProviderMock._serviceHymn2,
            SqlDataProviderMock._serviceHymn3
        ];
    }

    public static getDbServiceHymn(): HazzatDbSchema.IServiceHymn {
        return SqlDataProviderMock._serviceHymn1;
    }

    public static getDbServiceHymnFormatList(): HazzatDbSchema.IServiceHymnFormat[] {
        return [
            SqlDataProviderMock._serviceHymnFormat1,
            SqlDataProviderMock._serviceHymnFormat2,
            SqlDataProviderMock._serviceHymnFormat3
        ];
    }

    public static getDbServiceHymnFormat(): HazzatDbSchema.IServiceHymnFormat {
        return SqlDataProviderMock._serviceHymnFormat1;
    }

    public static getDbServiceHymnsFormatVariationList(): HazzatDbSchema.IServiceHymnFormatContent[] {
        return [
            SqlDataProviderMock._serviceHymnFormatContent1,
            SqlDataProviderMock._serviceHymnFormatContent2,
            SqlDataProviderMock._serviceHymnFormatContent3
        ];
    }

    public static getDbServiceHymnsFormatVariationContentBase(): HazzatDbSchema.IServiceHymnFormatContent {
        return {
            ItemId: 1,
            Content_Name: "Some Content Name",
            Season_ID: 2,
            Season_Name: "Some Season Name",
            Service_ID: 3,
            Service_Name: "Some Service Name",
            ServiceHymn_ID: 4,
            ServiceHymn_Title: "Some Hymn Name",
            Format_ID: 5,
            Format_Name: "Some Format Name",
            Reason_ID: 6,
            Content_Arabic: null,
            Content_Coptic: null,
            Content_English: null,
            Audio_Path: null,
            Music_Path: null
        };
    }

    public static getDbTunesList(): HazzatDbSchema.ITune[] {
        return [
            SqlDataProviderMock._tune1,
            SqlDataProviderMock._tune2,
            SqlDataProviderMock._tune3
        ];
    }

    public static getDbTune(): HazzatDbSchema.ITune {
        return SqlDataProviderMock._tune1;
    }

    public static getDbTypesList(): HazzatDbSchema.IType[] {
        return [
            SqlDataProviderMock._type1,
            SqlDataProviderMock._type2,
            SqlDataProviderMock._type3
        ];
    }

    public static getDbType(): HazzatDbSchema.IType {
        return SqlDataProviderMock._type1;
    }
}
