import * as express from "express";
import { Log } from "../Common/Utils/Logger";
import { ErrorCodes, HazzatApplicationError } from "../Common/Errors";

/*
 * Base controller
 */
export class BaseController {

    protected static _OnError(ex: any, res: express.Response): void {
        Log.exception("BaseController", "_onError", ex);
        if (ex instanceof HazzatApplicationError) {
            switch (ex.errorCode) {
                case ErrorCodes[ErrorCodes.DatabaseError]:
                    res.status(500).send(ex);
                    break;
                case ErrorCodes[ErrorCodes.InvalidParameterError]:
                    res.status(400).send(ex);
                    break;
                case ErrorCodes[ErrorCodes.NotSupportedError]:
                    res.status(501).send(ex);
                    break;
                case ErrorCodes[ErrorCodes.NotFoundError]:
                    res.status(404).send(ex);
                    break;
                default:
                    Log.error("BaseController", "_onError", "Unhandled error code: " + ErrorCodes[ex.errorCode]);
                    res.status(500).send(HazzatApplicationError.UnknownError);
                    break;
            }
        } else {
            res.status(500).send(HazzatApplicationError.UnknownError);
        }
    }
    public router = express.Router();
}
