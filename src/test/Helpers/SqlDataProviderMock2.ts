import { injectable } from "inversify";
import { IDataProvider } from "../../Providers/DataProviders/IDataProvider";
import { HazzatDbSchema } from "../../Providers/DataProviders/SqlDataProvider/HazzatDbSchema";

@injectable()
export class SqlDataProviderMock2 implements IDataProvider {
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

    getSeasonList(): Promise<HazzatDbSchema.ISeason[]> {
        throw new Error("Method not implemented.");
    }
    getSeason(seasonId: string): Promise<HazzatDbSchema.ISeason> {
        throw new Error("Method not implemented.");
    }
    getSeasonServiceList(seasonId: string): Promise<HazzatDbSchema.IService[]> {
        throw new Error("Method not implemented.");
    }
    getSeasonService(seasonId: string, serviceId: string): Promise<HazzatDbSchema.IService> {
        throw new Error("Method not implemented.");
    }
    getServiceHymnList(seasonId: string, serviceId: string): Promise<HazzatDbSchema.IServiceHymn[]> {
        throw new Error("Method not implemented.");
    }
    getServiceHymn(seasonId: string, serviceId: string, hymnId: string): Promise<HazzatDbSchema.IServiceHymn> {
        throw new Error("Method not implemented.");
    }
    getServiceHymnFormatList(seasonId: string, serviceId: string, hymnId: string): Promise<HazzatDbSchema.IServiceHymnFormat[]> {
        throw new Error("Method not implemented.");
    }
    getServiceHymnFormat(seasonId: string, serviceId: string, hymnId: string, formatId: string): Promise<HazzatDbSchema.IServiceHymnFormat> {
        throw new Error("Method not implemented.");
    }
    getServiceHymnsFormatVariationList(seasonId: string, serviceId: string, hymnId: string, formatId: string): Promise<HazzatDbSchema.IServiceHymnFormatContent[]> {
        throw new Error("Method not implemented.");
    }
    getServiceHymnsFormatVariation(seasonId: string, serviceId: string, hymnId: string, formatId: string, contentId: string): Promise<HazzatDbSchema.IServiceHymnFormatContent> {
        throw new Error("Method not implemented.");
    }
    getCommonContent(commonId: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    getReason(reasonId: number): Promise<HazzatDbSchema.IReason> {
        throw new Error("Method not implemented.");
    }
    getTypeList(): Promise<HazzatDbSchema.IType[]> {
        throw new Error("Method not implemented.");
    }
    getType(typeId: string): Promise<HazzatDbSchema.IType> {
        throw new Error("Method not implemented.");
    }
    getTuneList(): Promise<HazzatDbSchema.ITune[]> {
        return Promise.resolve([
            SqlDataProviderMock2._tune1,
            SqlDataProviderMock2._tune2,
            SqlDataProviderMock2._tune3
        ]);
    }
    getTune(tuneId: string): Promise<HazzatDbSchema.ITune> {
        throw new Error("Method not implemented.");
    }
}
