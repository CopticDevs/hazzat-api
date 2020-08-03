export enum ErrorCodes {
    DatabaseError = "DatabaseError",
    InvalidParameterError = "InvalidParameterError",
    NotFoundError = "NotFoundError",
    NotSupportedError = "NotSupportedError",
    UnknownError = "UnknownError"
}

export class HazzatApplicationError {
    public static readonly UnknownError: HazzatApplicationError =
        new HazzatApplicationError(ErrorCodes[ErrorCodes.UnknownError], "An unexpected error has occured");

    constructor(public errorCode: string, public message: string, public details?: string) {
    }
}
