import * as express from "express";
import { IHymnsServiceProvider } from "../Providers/ServiceProviders/IHymnsServiceProvider";
import { BaseController } from "./BaseController";
import { ResourceTypes } from "./ResourceTypes";

export class TunesController extends BaseController {
    constructor(hymnsServiceProvider: IHymnsServiceProvider) {
        super();

        /**
         * @swagger
         *
         * definitions:
         *   Tune:
         *     type: object
         *     properties:
         *       id:
         *         type: string
         *       name:
         *         type: string
         *       order:
         *         type: integer
         *       hymnCount:
         *         type: integer
         *     required: [id, name, order, hymnCount]
         *
         * /tunes:
         *   get:
         *     description: Gets a list of hymn tunes
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Types
         *         schema:
         *           type: array
         *           items:
         *             $ref: '#/definitions/Tune'
         *
         */
        this.router.get("/", async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getTuneList();
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * /tunes/[tuneId]:
         *   get:
         *     description: Returns the details of the given tune id
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: tuneId
         *         description: Tune ID
         *         in:  url
         *         required: true
         *         type: integer
         *     responses:
         *       200:
         *         description: Tune
         *         schema:
         *           type: object
         *           items:
         *             $ref: '#/definitions/Tune'
         *
         *       404:
         *         description: A Tune detail was not found.
         *         schema:
         *           type: object
         *           properties:
         *             errorCode:
         *               type: string
         *             message:
         *               type: string
         */
        this.router.get("/:tuneId(\\d+)", async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getTune(req.params.tuneId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * /tunes/[tuneId]/seasons:
         *   get:
         *     description: Gets a list of Seasons
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: tuneId
         *         description: Tune ID
         *         in:  url
         *         required: true
         *         type: integer
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
        this.router.get(`/:tuneId(\\d+)/${ResourceTypes.Seasons}`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getTuneSeasonList(req.params.tuneId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * /tunes/[tuneId]/seasons/[seasonId]:
         *   get:
         *     description: Gets a Season
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: tuneId
         *         description: Tune ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: seasonId
         *         description: Season ID
         *         in:  url
         *         required: true
         *         type: integer
         *     responses:
         *       200:
         *         description: Season
         *         schema:
         *           type: object
         *           items:
         *             $ref: '#/definitions/Season'
         *
         *
         */
        this.router.get(`/:tuneId(\\d+)/${ResourceTypes.Seasons}/:seasonId(\\d+)`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getTuneSeason(req.params.tuneId, req.params.seasonId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });
    }
}
