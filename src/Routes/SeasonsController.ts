import * as express from "express";
import { Net } from "../Common/Utils/Net";
import { IDataProvider } from "../DataProviders/IDataProvider";

/*
 * Seasons controller
 */
export class SeasonsController {
    public router = express.Router();

    constructor(_dataProvider: IDataProvider) {
        
        this.router.get('/', async (req: express.Request, res: express.Response) => {
            const result = await _dataProvider.getSeasonList();
            Net.sendResponse(res, result);
        });

        this.router.get("/:seasonId", async (req: express.Request, res: express.Response) => {
            const result = await _dataProvider.getSeason(req.params.seasonId);
            Net.sendResponse(res, result);
        });
    }
}
