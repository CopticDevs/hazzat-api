import * as express from "express";
import { IDataProvider } from "../DataProviders/IDataProvider";
import { BaseController } from "./BaseController";

/**
 * @swagger
 *
 * definitions:
 *   Seasons:
 *     type: object
 *     properties:
 *       isDataSpecific:
 *         type: boolean
 *       name:
 *         type: string
 *       order:
 *         type: integer
 *       reasonId:
 *         type: integer
 *       verse:
 *         type: string
 *
 * /seasons/:
 *   get:
 *     description: Gets a list of Seasons
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Seasons
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Seasons'
 *
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
 * definitions:
 *   Structs:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       order:
 *         type: integer
 *       reasonId:
 *         type: integer
 *       verse:
 *         type: string
 *
 * /seasons/[seasonId]:
 *   get:
 *     description: Returns the details of the given season id
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
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Structs'
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
