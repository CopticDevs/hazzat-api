import * as express from "express";
import { Net } from "../Common/Utils/Net";
import { IDataProvider } from "../DataProviders/IDataProvider";
import { HazzatApplicationError, ErrorCodes } from "../Common/Errors";

/*
 * Seasons controller
 */
export class SeasonsController {
    public router = express.Router();

    constructor(_dataProvider: IDataProvider) {
        this.router.get('/', async (req: express.Request, res: express.Response) => {
            try {
                const result = await _dataProvider.getSeasonList();
                res.send(result);
            } catch (ex) {
                console.log(JSON.stringify(ex));
                if (ex instanceof HazzatApplicationError) {
                    res.status(ex.statusCode).send(ex);
                } else {
                    res.status(500).send(HazzatApplicationError.UnknownError);
                }
            }
        });

        this.router.get("/:seasonId", async (req: express.Request, res: express.Response) => {            
            try {
                const result = await _dataProvider.getSeason(req.params.seasonId);
                res.send(result);
            } catch (ex) {
                if (ex instanceof HazzatApplicationError) {
                    res.status(ex.statusCode).send(ex);
                } else {
                    res.status(500).send(HazzatApplicationError.UnknownError);
                }
            }
        });
    }
}
