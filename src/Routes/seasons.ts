/*
 * Seasons controller
 */
//import * as assert from "assert";
import * as express from "express";
import { SqlDataProvider } from "../DataProviders/SqlDataProvider/SqlDataProvider";
import { Configuration } from "../Common/Configuration";
import { Networking } from "../Common/Helpers";
import { IDataProvider } from "../DataProviders/IDataProvider";
const router = express.Router();

// TODO: Add a factory pattern
const dataProvider: IDataProvider = new SqlDataProvider(Configuration.sqlConfig);

router.get('/', (req: express.Request, res: express.Response) => {
    dataProvider.getSeasonList()
        .then((result) => {
            Networking.setResponseHeaders(res);
            res.end(JSON.stringify(result));
        });
});

router.get("/:seasonId", (req: express.Request, res: express.Response) => {
    dataProvider.getSeason(req.params.seasonId)
        .then((result) => {
            Networking.setResponseHeaders(res);
            res.end(JSON.stringify(result));
    });
});

export default router;
