/*
 * Seasons controller
 */
import * as express from "express";
import { Configuration } from "../Common/Configuration";
import { IDataProvider } from "../DataProviders/IDataProvider";
import { SqlDataProvider } from "../DataProviders/SqlDataProvider/SqlDataProvider";
const router = express.Router();

// TODO: Add a factory pattern or dependency injection
const dataProvider: IDataProvider = new SqlDataProvider(Configuration.dbConnectionString);

router.get('/', async (req: express.Request, res: express.Response) => {
    const result = await dataProvider.getSeasonList();
    res.send(result);
});

router.get("/:seasonId", async (req: express.Request, res: express.Response) => {
    const result = dataProvider.getSeason(req.params.seasonId);
    res.send(result);
});

export default router;
