import { injectable } from "inversify";
import { ConnectionPool } from "mssql";
import { Configuration } from "../../Common/Configuration";
import { SeasonInfo } from "../../Models/SeasonInfo";
import { IDataProvider } from "../IDataProvider";
import { HazzatDbSchema } from "./HazzatDbSchema";
import { SqlHelpers } from "../../Common/Utils/SqlHelpers";
import { HazzatApplicationError, ErrorCodes } from "../../Common/Errors";

/*
 * Sql Data Provider
 */
@injectable()
export class SqlDataProvider implements IDataProvider {
    private _tablePrefix: string = "Hymns_";
    private _cp: Promise<ConnectionPool>;

    constructor() {
        this._cp = new ConnectionPool(Configuration.dbConnectionString).connect();
    }

    private _getQualifiedName(sp: string): string {
        return `${this._tablePrefix}${sp}`
    }

    public async getSeasonList(): Promise<SeasonInfo[]> {
        const connection = await this._cp;
        const result = await connection.request()
            .query("select * from Hymns_Seasons");

        if (!SqlHelpers.isValidResult(result)) {
            throw new HazzatApplicationError(500, ErrorCodes[ErrorCodes.DatabaseError], "Unexpected database error");
        }

        const seasons: SeasonInfo[] = result.recordsets[0]
            .map((row) => SqlDataProvider._convertSeasonDbItemToSeasonInfo(row));
        return seasons;
    }

    public async getSeason(seasonId: string): Promise<SeasonInfo> {
        if (!SqlHelpers.isValidNumberParameter(seasonId)) {
            throw new HazzatApplicationError(400, ErrorCodes[ErrorCodes.InvalidParameterError], "Invalid season id specified.", `Season id: '${seasonId}'`);
        }
        const connection = await this._cp;
        const result = await connection.request()
            .query(`select * from Hymns_Seasons where ID = ` + seasonId);

        if (!SqlHelpers.isValidResult(result)) {
            throw new HazzatApplicationError(500, ErrorCodes[ErrorCodes.DatabaseError], "Unexpected database error");
        }

        const row = result.recordsets[0][0];
        if (!row) {
            throw new HazzatApplicationError(404, ErrorCodes[ErrorCodes.NotFoundError], `Unable to find Season with id '${seasonId}'`);
        }
        return SqlDataProvider._convertSeasonDbItemToSeasonInfo(row);
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
