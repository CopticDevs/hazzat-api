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
         *       verse:
         *         type: string
         *     required: [id, isDateSpecific, name, order, verse]
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
         *       seasonId:
         *         type: integer
         *       serviceId:
         *         type: integer
         *       name:
         *         type: string
         *       order:
         *         type: integer
         *     required: [id, seasonId, serviceId, name, order]
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
                const result = await dataProvider.getSeasonServiceList(req.params.seasonId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

       /**
        * @swagger
        *
        * /seasons/[seasonId]/services/[serviceId]:
        *   get:
        *     description: Returns the details of the given service
        *     produces:
        *       - application/json
        *     parameters:
        *       - name: seasonId
        *         description: Season ID
        *         in:  url
        *         required: true
        *         type: string
        *       - name: serviceId
        *         description: Service ID
        *         in:  url
        *         required: true
        *         type: string
        *     responses:
        *       200:
        *         description: Service
        *         schema:
        *           type: object
        *           items:
        *             $ref: '#/definitions/Service'
        *
        *       404:
        *         description: A service detail was not found.
        *         schema:
        *           type: object
        *           properties:
        *             errorCode:
        *               type: string
        *             message:
        *               type: string
        */
        this.router.get("/:seasonId(\\d+)/services/:serviceId(\\d+)", async (req: express.Request, res: express.Response) => {
            try {
                const result = await dataProvider.getSeasonService(req.params.seasonId, req.params.serviceId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });
    }
}
