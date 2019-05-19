import * as assert from "assert";
import { ConnectionPool } from "mssql";
import { SeasonInfo } from "../../Models/SeasonInfo";
import { IDataProvider } from "../IDataProvider";
import { HazzatDbSchema } from "./HazzatDbSchema";

/*
 * Sql Data Provider
 */
export class SqlDataProvider implements IDataProvider {
    private _tablePrefix: string = "Hymns_";

    constructor(private _connectionString: string) {
    }

    private _getQualifiedName(sp: string): string {
        return `${this._tablePrefix}${sp}`
    }

    //TODO: why is the return type requiring void?
    public getSeasonList(): Promise<void | SeasonInfo[]> {
        const cp = new ConnectionPool(this._connectionString);
        return cp.connect()
            .then((pool) => {
                return pool.request()
                    .query("select * from Hymns_Seasons");
            }).then((result) => {
                assert.ok(result);
                assert.ok(result.recordsets);
                assert.ok(result.recordsets.length);
                assert.notEqual(result.recordsets.length, 0);

                const seasons: SeasonInfo[] = result.recordsets[0]
                    .map((row) => SqlDataProvider._convertSeasonDbItemToSeasonInfo(row));
                return seasons;
            }).catch((err) => {
                console.log(err);
            });
    }

    public getSeason(seasonId: string): Promise<void | SeasonInfo> {
        const cp = new ConnectionPool(this._connectionString);
        return cp.connect()
            .then((pool) => {
                return pool.request()
                    .query(`select * from Hymns_Seasons where ID = ` + seasonId);
            }).then((result) => {
                assert.ok(result);
                assert.ok(result.recordsets);
                assert.ok(result.recordsets.length);
                assert.notEqual(result.recordsets.length, 0);
                const row = result.recordsets[0][0];
                return SqlDataProvider._convertSeasonDbItemToSeasonInfo(row);
            }).catch((err) => {
                console.log(err);
            });
    }

    private static _convertSeasonDbItemToSeasonInfo(seasonDbItem: HazzatDbSchema.Season): SeasonInfo {
        return {
            id: seasonDbItem.ID,
            name: seasonDbItem.Name,
            verse: seasonDbItem.Verse,
            order: seasonDbItem.Season_Order,
            reasonId: seasonDbItem.Reason_ID,
            isDateSpecific: seasonDbItem.Date_Specific
        }
    }
}
