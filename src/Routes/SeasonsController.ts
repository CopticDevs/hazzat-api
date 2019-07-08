import * as express from "express";
import { IDataProvider } from "../DataProviders/IDataProvider";
import { BaseController } from "./BaseController";

/**
 * @swagger
 *
 * /:
 *   get:
 *     description: Gets a list of Seasons
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Seasons
 */
export class SeasonsController extends BaseController {
    constructor(dataProvider: IDataProvider) {
        super();
        this.router.get("/seasons", async (req: express.Request, res: express.Response) => {
            try {
                const result = await dataProvider.getSeasonList();
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });
/**
 * @swagger
 *
 * /seasons/[seasonId]:
 *   get:
 *     description: Returns a list of Structs in a Season
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Season ID
 *         in:  url
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Structs
 */
        this.router.get("/:seasonId(\\d+)", async (req: express.Request, res: express.Response) => {
            try {
                const result = await dataProvider.getSeason(req.params.seasonId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });
    }
}
