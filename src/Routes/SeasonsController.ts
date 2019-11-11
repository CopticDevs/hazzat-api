import * as express from "express";
import { IDataProvider } from "../DataProviders/IDataProvider";
import { BaseController } from "./BaseController";

export class SeasonsController extends BaseController {
    constructor(dataProvider: IDataProvider) {
        super();

        /**
         * @swagger
         *
         * definitions:
         *   Season:
         *     type: object
         *     properties:
         *       id:
         *         type: integer
         *       isDateSpecific:
         *         type: boolean
         *       name:
         *         type: string
         *       order:
         *         type: integer
         *       reasonId:
         *         type: integer
         *       reasonName:
         *         type: string
         *       verse:
         *         type: string
         *     required: [id, isDateSpecific, name, order, reasonId, reasonName, verse]
         *
         * /seasons:
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
         *             $ref: '#/definitions/Season'
         *
         *
         */
        this.router.get("/", async (req: express.Request, res: express.Response) => {
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
         *     description: Returns the details of the given season id
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: seasonId
         *         description: Season ID
         *         in:  url
         *         required: true
         *         type: string
         *     responses:
         *       200:
         *         description: Season
         *         schema:
         *           type: object
         *           items:
         *             $ref: '#/definitions/Season'
         *
         *       404:
         *         description: A Season detail was not found.
         *         schema:
         *           type: object
         *           properties:
         *             errorCode:
         *               type: string
         *             message:
         *               type: string
         */
        this.router.get("/:seasonId(\\d+)", async (req: express.Request, res: express.Response) => {
            try {
                const result = await dataProvider.getSeason(req.params.seasonId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * definitions:
         *   Service:
         *     type: object
         *     properties:
         *       id:
         *         type: integer
         *       name:
         *         type: string
         *       order:
         *         type: integer
         *       contentCount:
         *         type: object
         *         description: A dictionary of the format types and the number of items of that format type
         *         properties:
         *           Text:
         *             type: integer
         *           Hazzat:
         *             type: integer
         *           VerticalHazzat:
         *             type: integer
         *           Music:
         *             type: integer
         *           Audio:
         *             type: integer
         *           Video:
         *             type: integer
         *           Information:
         *             type: integer
         *         required: [Text, Hazzat, VerticalHazzat, Music, Audio, Video, Information]
         *     required: [id, name, order, contentCount]
         *
         * /seasons/[seasonId]/services:
         *   get:
         *     description: Gets a list of Services within a given season id
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: seasonId
         *         description: Season ID
         *         in:  url
         *         required: true
         *         type: string
         *     responses:
         *       200:
         *         description: Services
         *         schema:
         *           type: array
         *           items:
         *             $ref: '#/definitions/Service'
         */
        this.router.get("/:seasonId(\\d+)/services", async (req: express.Request, res: express.Response) => {
            try {
                const result = await dataProvider.getSeasonServices(req.params.seasonId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });
    }
}
