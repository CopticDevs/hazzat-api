/*
 * Seasons controller
 */
import * as express from "express";
import { Configuration } from "../Common/Configuration";
import { IDataProvider } from "../DataProviders/IDataProvider";
import { SqlDataProvider } from "../DataProviders/SqlDataProvider/SqlDataProvider";
const router = express.Router();

// TODO: Add a factory pattern
const dataProvider: IDataProvider = new SqlDataProvider(Configuration.dbConnectionString);

router.get('/', (req: express.Request, res: express.Response) => {
    dataProvider.getSeasonList()
        .then((result) => {
            res.send(result);
        });
});

router.get("/:seasonId", (req: express.Request, res: express.Response) => {
    dataProvider.getSeason(req.params.seasonId)
        .then((result) => {
            res.send(result);
    });
});

export default router;
