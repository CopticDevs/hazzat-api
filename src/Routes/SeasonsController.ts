import * as express from "express";
import { IDataProvider } from "../DataProviders/IDataProvider";

/*
 * Seasons controller
 */
export class SeasonsController {
    public router = express.Router();

    constructor(_dataProvider: IDataProvider) {
        this.router.get('/', async (req: express.Request, res: express.Response) => {
            const result = await _dataProvider.getSeasonList();
            res.send(result);
        });

        this.router.get("/:seasonId", async (req: express.Request, res: express.Response) => {
            const result = await _dataProvider.getSeason(req.params.seasonId);
            res.send(result);
        });
    }
}
