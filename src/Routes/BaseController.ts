import * as express from "express";
import { ErrorCodes, HazzatApplicationError } from "../Common/Errors";

/*
 * Base controller
 */
export class BaseController {

    protected static _OnError(ex: any, res: express.Response): void {
        console.log(JSON.stringify(ex));
        if (ex instanceof HazzatApplicationError) {
            switch (ex.errorCode) {
                case ErrorCodes[ErrorCodes.DatabaseError]:
                    res.status(500).send(ex);
                    break;
                case ErrorCodes[ErrorCodes.InvalidParameterError]:
                    res.status(400).send(ex);
                    break;
                case ErrorCodes[ErrorCodes.NotFoundError]:
                    res.status(404).send(ex);
                    break;
                default:
                    console.log("SeasonsController: Unhandled error code: " + ErrorCodes[ex.errorCode]);
                    res.status(500).send(HazzatApplicationError.UnknownError);
                    break;
            }
        } else {
            res.status(500).send(HazzatApplicationError.UnknownError);
        }
    }
    public router = express.Router();
}
