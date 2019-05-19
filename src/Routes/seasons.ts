/*
 * Seasons controller
 */
import * as express from "express";
import { Configuration } from "../Common/Configuration";
import { Net } from "../Common/Utils/Net";
import { IDataProvider } from "../DataProviders/IDataProvider";
import { SqlDataProvider } from "../DataProviders/SqlDataProvider/SqlDataProvider";
const router = express.Router();

// TODO: Add a factory pattern
const dataProvider: IDataProvider = new SqlDataProvider(Configuration.dbConnectionString);

router.get('/', (req: express.Request, res: express.Response) => {
    dataProvider.getSeasonList()
        .then((result) => {
            Net.setResponseHeaders(res);
            res.end(JSON.stringify(result));
        });
});

router.get("/:seasonId", (req: express.Request, res: express.Response) => {
    dataProvider.getSeason(req.params.seasonId)
        .then((result) => {
            Net.setResponseHeaders(res);
            res.end(JSON.stringify(result));
    });
});

export default router;
