export enum ErrorCodes {
    DatabaseError,
    InvalidParameterError,
    NotFoundError,
    UnknownError
}

export class HazzatApplicationError {
    public static readonly UnknownError: HazzatApplicationError = new HazzatApplicationError(ErrorCodes[ErrorCodes.UnknownError], "An unexpected error has occured");

    constructor(public errorCode: string, public message: string, public details?: string) {
    }
}
