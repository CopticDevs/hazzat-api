import { HazzatDbSchema } from "../../Providers/DataProviders/SqlDataProvider/HazzatDbSchema";

export class SqlDataProviderMock {
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
