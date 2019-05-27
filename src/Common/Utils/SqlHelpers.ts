import { IResult } from "mssql";

export class SqlHelpers {
    public static isValidResult<T>(result: IResult<T>): boolean {
        if (!result || !result.recordsets || !result.recordsets.length || result.recordsets.length !== 1) {
            return false;
        }
        return true;
    }

    public static isValidPositiveIntParameter(param: string): boolean {
        // Check for valid input
        if (!param) {
            return false;
        }

        // Check if it's a number
        if (isNaN(Number(param))) {
            return false;
        }

        // Check if it's an integer
        const val: number = Number(param);
        if (!Number.isInteger(val)) {
            return false;
        }

        // Check if it's positive
        if (val < 0) {
            return false;
        }
        return true;
    }
}
