﻿import * as assert from "assert";
import { ConnectionPool } from "mssql";
import { SeasonInfo } from "../../Models/SeasonInfo";
import { IDataProvider } from "../IDataProvider";
import { HazzatDbSchema } from "./HazzatDbSchema";

/*
 * Sql Data Provider
 */
export class SqlDataProvider implements IDataProvider {
    private _tablePrefix: string = "Hymns_";
    private _cp: Promise<ConnectionPool>;

    constructor(private _connectionString: string) {
        this._cp = new ConnectionPool(this._connectionString).connect();
    }

    private _getQualifiedName(sp: string): string {
        return `${this._tablePrefix}${sp}`
    }

    public async getSeasonList(): Promise<SeasonInfo[]> {
        try {
            const connection = await this._cp;
            const result = await connection.request()
                .query("select * from Hymns_Seasons");

            assert.ok(result);
            assert.ok(result.recordsets);
            assert.ok(result.recordsets.length);
            assert.notEqual(result.recordsets.length, 0);

            const seasons: SeasonInfo[] = result.recordsets[0]
                .map((row) => SqlDataProvider._convertSeasonDbItemToSeasonInfo(row));
            return seasons;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async getSeason(seasonId: string): Promise<SeasonInfo> {
        try {
            const connection = await this._cp;
            const result = await connection.request()
                .query(`select * from Hymns_Seasons where ID = ` + seasonId);

            assert.ok(result);
            assert.ok(result.recordsets);
            assert.ok(result.recordsets.length);
            assert.notEqual(result.recordsets.length, 0);
            const row = result.recordsets[0][0];
            return SqlDataProvider._convertSeasonDbItemToSeasonInfo(row);   
        } catch (e) {       
            console.log(e);
            throw e;
        }
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
