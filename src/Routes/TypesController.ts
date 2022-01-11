import * as express from "express";
import { IHymnsServiceProvider } from "../Providers/ServiceProviders/IHymnsServiceProvider";
import { BaseController } from "./BaseController";
import { ResourceTypes } from "./ResourceTypes";

export class TypesController extends BaseController {
    constructor(hymnsServiceProvider: IHymnsServiceProvider) {
        super();

        /**
         * @swagger
         *
         * definitions:
         *   Type:
         *     type: object
         *     properties:
         *       id:
         *         type: string
         *       name:
         *         type: string
         *       nameSingular:
         *         type: string
         *       order:
         *         type: integer
         *       hymnCount:
         *         type: integer
         *     required: [id, name, nameSingular, order, hymnCount]
         *
         * /types:
         *   get:
         *     description: Gets a list of hymn types
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Types
         *         schema:
         *           type: array
         *           items:
         *             $ref: '#/definitions/Type'
         *
         */
        this.router.get("/", async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getTypeList();
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * /types/[typeId]:
         *   get:
         *     description: Returns the details of the given type id
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: typeId
         *         description: Type ID
         *         in:  url
         *         required: true
         *         type: integer
         *     responses:
         *       200:
         *         description: Type
         *         schema:
         *           type: object
         *           items:
         *             $ref: '#/definitions/Type'
         *
         *       404:
         *         description: A Type detail was not found.
         *         schema:
         *           type: object
         *           properties:
         *             errorCode:
         *               type: string
         *             message:
         *               type: string
         */
        this.router.get("/:typeId(\\d+)", async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getType(req.params.typeId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * /types/[typeId]/seasons:
         *   get:
         *     description: Gets a list of Seasons
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: typeId
         *         description: Type ID
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
        this.router.get(`/:typeId(\\d+)/${ResourceTypes.Seasons}`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getTypeSeasonList(req.params.typeId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * /types/[typeId]/seasons/[seasonId]:
         *   get:
         *     description: Gets a Season
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: typeId
         *         description: Type ID
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
        this.router.get(`/:typeId(\\d+)/${ResourceTypes.Seasons}/:seasonId(\\d+)`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getTypeSeason(req.params.typeId, req.params.seasonId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * /types/[typeId]/seasons/[seasonId]/hymns:
         *   get:
         *     description: Gets a list of hymns of the specified type in the specified Season
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: typeId
         *         description: Type ID
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
         *         description: Hymns
         *         schema:
         *           type: array
         *           items:
         *             $ref: '#/definitions/Hymn'
         */
        this.router.get(`/:typeId(\\d+)/${ResourceTypes.Seasons}/:seasonId(\\d+)/${ResourceTypes.Hymns}`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getTypeSeasonServiceHymnList(req.params.typeId, req.params.seasonId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });
    }
}
