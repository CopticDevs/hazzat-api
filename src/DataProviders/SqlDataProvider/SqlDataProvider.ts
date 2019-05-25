import { inject, injectable } from "inversify";
import * as Sql from "mssql";
import { IConfiguration } from "../../Common/Configuration";
import { ErrorCodes, HazzatApplicationError } from "../../Common/Errors";
import { SqlHelpers } from "../../Common/Utils/SqlHelpers";
import { SeasonInfo } from "../../Models/SeasonInfo";
import { TYPES } from "../../types";
import { IDataProvider } from "../IDataProvider";
import { HazzatDbSchema } from "./HazzatDbSchema";
import ConnectionPool = Sql.ConnectionPool;

/*
 * Sql Data Provider
 */
@injectable()
export class SqlDataProvider implements IDataProvider {
    private _tablePrefix: string = "Hymns_";
    private _cp: Promise<ConnectionPool>;

    constructor(
        @inject(TYPES.IConfiguration) configuration: IConfiguration
    ) {
        this._cp = new ConnectionPool(configuration.dbConnectionString).connect();
    }

    private _getQualifiedName(sp: string): string {
        return `${this._tablePrefix}${sp}`
    }

    public async getSeasonList(): Promise<SeasonInfo[]> {
        const connection = await this._cp;
        const result = await connection.request()
            .execute(this._getQualifiedName("SeasonListSelectAll"));

        if (!SqlHelpers.isValidResult(result)) {
            throw new HazzatApplicationError(ErrorCodes[ErrorCodes.DatabaseError], "Unexpected database error");
        }

        const seasons: SeasonInfo[] = result.recordsets[0]
            .map((row) => SqlDataProvider._convertSeasonDbItemToSeasonInfo(row));
        return seasons;
    }

    public async getSeason(seasonId: string): Promise<SeasonInfo> {
        if (!SqlHelpers.isValidPositiveIntParameter(seasonId)) {
            throw new HazzatApplicationError(ErrorCodes[ErrorCodes.InvalidParameterError], "Invalid season id specified.", `Season id: '${seasonId}'`);
        }
        const connection = await this._cp;
        const result = await connection.request()
            .input("ID", Sql.Int, seasonId)
            .execute(this._getQualifiedName("SeasonSelect"));

        if (!SqlHelpers.isValidResult(result)) {
            throw new HazzatApplicationError(ErrorCodes[ErrorCodes.DatabaseError], "Unexpected database error");
        }

        const row = result.recordsets[0][0];
        if (!row) {
            throw new HazzatApplicationError(ErrorCodes[ErrorCodes.NotFoundError], `Unable to find Season with id '${seasonId}'`);
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
