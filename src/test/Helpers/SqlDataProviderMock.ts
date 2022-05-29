import { HazzatDbSchema } from "../../Providers/DataProviders/SqlDataProvider/HazzatDbSchema";

export class SqlDataProviderMock {
    private static _season1: HazzatDbSchema.ISeason = {
        ItemId: 1,
        Name: "First Season",
        Name_Arabic: "الموسم الأول",
        Date_Specific: true,
        Reason_ID: 2,
        Reason_Name: "Some Reason Name",
        Verse: "First Verse",
        Verse_Arabic: "الأية الأولى",
        Season_Order: 1
    };
    private static _season2: HazzatDbSchema.ISeason = {
        ItemId: 5,
        Name: "Second Season",
        Name_Arabic: "الموسم الثاني",
        Date_Specific: true,
        Reason_ID: 2,
        Reason_Name: "Some Reason Name",
        Verse: "Second Verse",
        Verse_Arabic: "الأية الثانية",
        Season_Order: 2
    };
    private static _season3: HazzatDbSchema.ISeason = {
        ItemId: 4,
        Name: "Third Season",
        Name_Arabic: "الموسم الثالث",
        Date_Specific: false,
        Reason_ID: 3,
        Reason_Name: "Some Other Reason Name",
        Verse: "Third Verse",
        Verse_Arabic: "الأية الثالثة",
        Season_Order: 3
    };

    private static _service1: HazzatDbSchema.IService = {
        ItemId: 1,
        Season_ID: 2,
        Season_Name: "Some Season Name",
        Season_Name_Arabic: "إسم الموسم",
        Service_Name: "First Service Name",
        Service_Name_Arabic: "إسم الخدمة الأولى",
        Service_Order: 1
    };
    private static _service2: HazzatDbSchema.IService = {
        ItemId: 90,
        Season_ID: 2,
        Season_Name: "Some Season Name",
        Season_Name_Arabic: "إسم الموسم",
        Service_Name: "Second Service Name",
        Service_Name_Arabic: "إسم الخدمة الثانية",
        Service_Order: 2
    };
    private static _service3: HazzatDbSchema.IService = {
        ItemId: 4,
        Season_ID: 1,
        Season_Name: "Another Season Name",
        Season_Name_Arabic: "إسم الموسم",
        Service_Name: "Third Service Name",
        Service_Name_Arabic: "إسم الخدمة الثالثة",
        Service_Order: 3
    };

    private static _serviceHymn1: HazzatDbSchema.IServiceHymn = {
        ItemId: 1,
        Title: "First Hymn Title",
        Title_Arabic: "إسم اللحن الأول",
        Season_ID: 2,
        Season_Name: "Some Season Name",
        Season_Name_Arabic: "إسم الموسم",
        Service_ID: 3,
        Service_Name: "Some Service Name",
        Service_Name_Arabic: "إسم الخدمة",
        Hymn_Order: 1
    };
    private static _serviceHymn2: HazzatDbSchema.IServiceHymn = {
        ItemId: 87,
        Title: "Second Hymn Title",
        Title_Arabic: "إسم اللحن الثاني",
        Season_ID: 2,
        Season_Name: "Some Season Name",
        Season_Name_Arabic: "إسم الموسم",
        Service_ID: 3,
        Service_Name: "Some Service Name",
        Service_Name_Arabic: "إسم الخدمة",
        Hymn_Order: 2
    };
    private static _serviceHymn3: HazzatDbSchema.IServiceHymn = {
        ItemId: 73,
        Title: "Third Hymn Title",
        Title_Arabic: "إسم اللحن الثالث",
        Season_ID: 1,
        Season_Name: "Another Season Name",
        Season_Name_Arabic: "إسم الموسم",
        Service_ID: 2,
        Service_Name: "Another Service Name",
        Service_Name_Arabic: "إسم الخدمة",
        Hymn_Order: 3
    };

    private static _serviceHymnFormat1: HazzatDbSchema.IServiceHymnFormat = {
        ItemId: 1,
        Format_Name: "First Format Name",
        Format_Name_Arabic: "إسم الطريقة الأولى",
        Season_ID: 2,
        Season_Name: "Some Season Name",
        Season_Name_Arabic: "إسم الموسم",
        Service_ID: 3,
        Service_Name: "Some Service Name",
        Service_Name_Arabic: "إسم الخدمة",
        ServiceHymn_ID: 4,
        ServiceHymn_Title: "Some Hymn Name",
        ServiceHymn_Title_Arabic: "إسم اللحن",
        Content_Count: 123,
        Hymn_Order: 1
    };
    private static _serviceHymnFormat2: HazzatDbSchema.IServiceHymnFormat = {
        ItemId: 5,
        Format_Name: "Second Format Name",
        Format_Name_Arabic: "إسم الطريقة الثانية",
        Season_ID: 2,
        Season_Name: "Some Season Name",
        Season_Name_Arabic: "إسم الموسم",
        Service_ID: 3,
        Service_Name: "Some Service Name",
        Service_Name_Arabic: "إسم الخدمة",
        ServiceHymn_ID: 4,
        ServiceHymn_Title: "Some Hymn Name",
        ServiceHymn_Title_Arabic: "إسم اللحن",
        Content_Count: 12,
        Hymn_Order: 2
    };
    private static _serviceHymnFormat3: HazzatDbSchema.IServiceHymnFormat = {
        ItemId: 2,
        Format_Name: "First Format Name",
        Format_Name_Arabic: "إسم الطريقة الثالثة",
        Season_ID: 5,
        Season_Name: "Other Season Name",
        Season_Name_Arabic: "إسم الموسم",
        Service_ID: 3,
        Service_Name: "Some Service Name",
        Service_Name_Arabic: "إسم الخدمة",
        ServiceHymn_ID: 4,
        ServiceHymn_Title: "Some Hymn Name",
        ServiceHymn_Title_Arabic: "إسم اللحن",
        Content_Count: 13,
        Hymn_Order: 3
    };

    private static _serviceHymnFormatContent1: HazzatDbSchema.IServiceHymnFormatContent = {
        ItemId: 1,
        Content_Name: "First Content Name",
        Content_Name_Arabic: "أسم المحتوى الأول",
        Season_ID: 2,
        Season_Name: "Some Season Name",
        Season_Name_Arabic: "إسم الموسم",
        Service_ID: 3,
        Service_Name: "Some Service Name",
        Service_Name_Arabic: "إسم الخدمة",
        ServiceHymn_ID: 4,
        ServiceHymn_Title: "Some Hymn Name",
        ServiceHymn_Title_Arabic: "إسم اللحن",
        Format_ID: 5,
        Format_Name: "Some Format Name",
        Format_Name_Arabic: "إسم الطريقة",
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
        Content_Name_Arabic: "أسم المحتوى الثاني",
        Season_ID: 2,
        Season_Name: "Some Season Name",
        Season_Name_Arabic: "إسم الموسم",
        Service_ID: 3,
        Service_Name: "Some Service Name",
        Service_Name_Arabic: "إسم الخدمة",
        ServiceHymn_ID: 4,
        ServiceHymn_Title: "Some Hymn Name",
        ServiceHymn_Title_Arabic: "إسم اللحن",
        Format_ID: 5,
        Format_Name: "Some Format Name",
        Format_Name_Arabic: "إسم الطريقة",
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
        Content_Name_Arabic: "أسم المحتوى الثالث",
        Season_ID: 2,
        Season_Name: "Some Season Name",
        Season_Name_Arabic: "إسم الموسم",
        Service_ID: 3,
        Service_Name: "Some Service Name",
        Service_Name_Arabic: "إسم الخدمة",
        ServiceHymn_ID: 4,
        ServiceHymn_Title: "Some Hymn Name",
        ServiceHymn_Title_Arabic: "إسم اللحن",
        Format_ID: 5,
        Format_Name: "Some Format Name",
        Format_Name_Arabic: "إسم الطريقة",
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
        Name_Arabic: "النغمة الأولى",
        ServiceHymnsCount: 12,
        Tune_Order: 1
    };
    private static _tune2: HazzatDbSchema.ITune = {
        ItemId: 7,
        Name: "Second Tune",
        Name_Arabic: "النغمة الثانية",
        ServiceHymnsCount: 23,
        Tune_Order: 2
    };
    private static _tune3: HazzatDbSchema.ITune = {
        ItemId: 4,
        Name: "Second Tune",
        Name_Arabic: "النغمة الثالثة",
        ServiceHymnsCount: 2,
        Tune_Order: 3
    };

    private static _type1: HazzatDbSchema.IType = {
        ItemId: 1,
        Name: "First Type Hymns",
        Name_Arabic: "الأنواع الأولى",
        Name_Short: "First Type Hymn",
        Name_Short_Arabic: "النوع الأول",
        ServiceHymnsCount: 12,
        Type_Order: 1
    };
    private static _type2: HazzatDbSchema.IType = {
        ItemId: 9,
        Name: "Second Type Hymns",
        Name_Arabic: "الأنواع الثانية",
        Name_Short: "Second Type Hymn",
        Name_Short_Arabic: "النوع االثاني",
        ServiceHymnsCount: 32,
        Type_Order: 2
    };
    private static _type3: HazzatDbSchema.IType = {
        ItemId: 5,
        Name: "Third Type Hymns",
        Name_Arabic: "الأنواع الثالثة",
        Name_Short: "Third Type Hymn",
        Name_Short_Arabic: "النوع االثالث",
        ServiceHymnsCount: 7,
        Type_Order: 3
    };
    private static _booklet1: HazzatDbSchema.IBooklet = {
        ItemId: 1,
        Name: "First Booklet Name",
        Summary: "First Booklet Summary",
        Booklet_Order: 1,
        Display_Path: "First Display Path",
        Full_Picture: "First Full Picture Path",
        Print_Path: "First Print Path",
        Source_Path: "First Source Path",
        Thumbnail: "First Thumbnail Path",
        Release_Date: "2007-09-20 00:00:00.000"
    };
    private static _booklet2: HazzatDbSchema.IBooklet = {
        ItemId: 7,
        Name: "Second Booklet Name",
        Summary: "Second Booklet Summary",
        Booklet_Order: 2,
        Display_Path: "Second Display Path",
        Full_Picture: "Second Full Picture Path",
        Print_Path: "Second Print Path",
        Source_Path: "Second Source Path",
        Thumbnail: "Second Thumbnail Path",
        Release_Date: "2007-09-20 00:00:00.000"
    };
    private static _booklet3: HazzatDbSchema.IBooklet = {
        ItemId: 4,
        Name: "Third Booklet Name",
        Summary: "Third Booklet Summary",
        Booklet_Order: 3,
        Display_Path: "Third Display Path",
        Full_Picture: "Third Full Picture Path",
        Print_Path: "Third Print Path",
        Source_Path: "Third Source Path",
        Thumbnail: "Third Thumbnail Path",
        Release_Date: "2007-09-20 00:00:00.000"
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
            Content_Name_Arabic: "أسم المحتوى",
            Season_ID: 2,
            Season_Name: "Some Season Name",
            Season_Name_Arabic: "إسم الموسم",
            Service_ID: 3,
            Service_Name: "Some Service Name",
            Service_Name_Arabic: "إسم الخدمة",
            ServiceHymn_ID: 4,
            ServiceHymn_Title: "Some Hymn Name",
            ServiceHymn_Title_Arabic: "إسم اللحن",
            Format_ID: 5,
            Format_Name: "Some Format Name",
            Format_Name_Arabic: "إسم الطريقة",
            Reason_ID: 6,
            Content_Arabic: null,
            Content_Coptic: null,
            Content_English: null,
            Audio_Path: null,
            Music_Path: null
        };
    }

    public static getDbReason(): HazzatDbSchema.IReason {
        return {
            ItemId: 12,
            Name: "Reason Name",
            Long_Arabic: "Long Arabic reason",
            Long_Coptic: "Long Coptic reason",
            Long_English: "Long English reason",
            Short_Arabic: "Short Arabic reason",
            Short_Coptic: "Short Coptic reason",
            Short_English: "Short English reason"
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

    public static getDbTuneSeasonList(): HazzatDbSchema.ISeason[] {
        return SqlDataProviderMock.getDbSeasonsList();
    }

    public static getDbTuneSeason(): HazzatDbSchema.ISeason {
        return SqlDataProviderMock.getDbSeason();
    }

    public static getDbTuneSeasonServiceHymnList(): HazzatDbSchema.IServiceHymn[] {
        return SqlDataProviderMock.getDbServiceHymnList();
    }

    public static getDbTuneSeasonServiceHymn(): HazzatDbSchema.IServiceHymn {
        return SqlDataProviderMock.getDbServiceHymn();
    }

    public static getDbTuneSeasonServiceHymnFormatList(): HazzatDbSchema.IServiceHymnFormat[] {
        return SqlDataProviderMock.getDbServiceHymnFormatList();
    }

    public static getDbTuneSeasonServiceHymnFormat(): HazzatDbSchema.IServiceHymnFormat {
        return SqlDataProviderMock.getDbServiceHymnFormat();
    }

    public static getDbTuneServiceHymnsFormatVariationList(): HazzatDbSchema.IServiceHymnFormatContent[] {
        return SqlDataProviderMock.getDbServiceHymnsFormatVariationList();
    }

    public static getDbTypeServiceHymnsFormatVariationList(): HazzatDbSchema.IServiceHymnFormatContent[] {
        return SqlDataProviderMock.getDbServiceHymnsFormatVariationList();
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

    public static getDbTypeSeasonList(): HazzatDbSchema.ISeason[] {
        return SqlDataProviderMock.getDbSeasonsList();
    }

    public static getDbTypeSeason(): HazzatDbSchema.ISeason {
        return SqlDataProviderMock.getDbSeason();
    }

    public static getDbTypeSeasonServiceHymnList(): HazzatDbSchema.IServiceHymn[] {
        return SqlDataProviderMock.getDbServiceHymnList();
    }

    public static getDbTypeSeasonServiceHymn(): HazzatDbSchema.IServiceHymn {
        return SqlDataProviderMock.getDbServiceHymn();
    }

    public static getDbTypeSeasonServiceHymnFormatList(): HazzatDbSchema.IServiceHymnFormat[] {
        return SqlDataProviderMock.getDbServiceHymnFormatList();
    }

    public static getDbTypeSeasonServiceHymnFormat(): HazzatDbSchema.IServiceHymnFormat {
        return SqlDataProviderMock.getDbServiceHymnFormat();
    }

    public static getDbBookletList(): HazzatDbSchema.IBooklet[] {
        return [
            SqlDataProviderMock._booklet1,
            SqlDataProviderMock._booklet2,
            SqlDataProviderMock._booklet3
        ];
    }

    public static getDbBooklet(): HazzatDbSchema.IBooklet {
        return SqlDataProviderMock._booklet1;
    }
}
