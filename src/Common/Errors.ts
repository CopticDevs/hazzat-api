export enum ErrorCodes {
    DatabaseError,
    InvalidParameterError,
    NotFoundError,
    UnknownError
}

export class HazzatApplicationError {
    public static UnknownError: HazzatApplicationError = new HazzatApplicationError(500, ErrorCodes[ErrorCodes.UnknownError], "An unexpected error has occured");

    constructor(public statusCode: number, public errorCode: string, public message: string, public details?: string) {
    }
}
