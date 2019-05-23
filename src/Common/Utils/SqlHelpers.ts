import { IResult } from "mssql";

export module SqlHelpers {
    export function isValidResult<T>(result: IResult<T>): boolean {
        if (!result || !result.recordsets || !result.recordsets.length || result.recordsets.length !== 1) {
            return false;
        }
        return true;
    }

    export function isValidNumberParameter(param: string): boolean {
        // Check for valid input
        if (!param) {
            return false;
        }

        // Check if it's a number
        if (Number(param) === NaN) {
            return false;
        }

        // Check if it's an ingeger
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
