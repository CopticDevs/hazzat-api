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
    public static getDbTunesList(): HazzatDbSchema.ITune[] {
        return [
            SqlDataProviderMock._tune1,
            SqlDataProviderMock._tune2,
            SqlDataProviderMock._tune3
        ];
    }
}
