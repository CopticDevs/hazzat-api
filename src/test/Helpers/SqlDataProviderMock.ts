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
