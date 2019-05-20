import * as express from "express";
import { ReflectiveInjector } from 'injection-js';
import { SqlDataProvider } from "../DataProviders/SqlDataProvider/SqlDataProvider";
import { Net } from "../Common/Utils/Net";

/*
 * Seasons controller
 */
export class SeasonsController {
    public router = express.Router();

    //constructor(_dataProvider: SqlDataProvider) {
    constructor() {
        const injector = ReflectiveInjector.resolveAndCreate([SqlDataProvider]);
        const _dataProvider: SqlDataProvider = injector.get(SqlDataProvider);
        
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
