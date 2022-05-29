import * as express from "express";
import { IConfiguration } from "../Common/Configuration";
import { LanguageHelpers } from "../Common/Utils/LanguageHelpers";
import { IHymnsServiceProvider } from "../Providers/ServiceProviders/IHymnsServiceProvider";
import { BaseController } from "./BaseController";
import { ResourceTypes } from "./ResourceTypes";

export class TunesController extends BaseController {
    constructor(
        hymnsServiceProvider: IHymnsServiceProvider,
        configuration: IConfiguration) {
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
         */
        this.router.get("/", async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getTuneList(LanguageHelpers.getResponseLanguage(req, configuration));
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
                const result = await hymnsServiceProvider.getTune(
                    LanguageHelpers.getResponseLanguage(req, configuration),
                    req.params.tuneId);
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
         */
        this.router.get(`/:tuneId(\\d+)/${ResourceTypes.Seasons}`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getTuneSeasonList(
                    LanguageHelpers.getResponseLanguage(req, configuration),
                    req.params.tuneId);
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
        this.router.get(`/:tuneId(\\d+)/${ResourceTypes.Seasons}/:seasonId(\\d+)`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getTuneSeason(
                    LanguageHelpers.getResponseLanguage(req, configuration),
                    req.params.tuneId,
                    req.params.seasonId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * /tunes/[tuneId]/seasons/[seasonId]/hymns:
         *   get:
         *     description: Gets a list of hymns of the specified tune in the specified Season
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
         *         description: Hymns with Service Details
         *         schema:
         *           type: array
         *           items:
         *             $ref: '#/definitions/HymnWithServiceDetails'
         */
        this.router.get(`/:tuneId(\\d+)/${ResourceTypes.Seasons}/:seasonId(\\d+)/${ResourceTypes.Hymns}`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getTuneSeasonServiceHymnList(
                    LanguageHelpers.getResponseLanguage(req, configuration),
                    req.params.tuneId,
                    req.params.seasonId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * /tunes/[tuneId]/seasons/[seasonId]/hymns/[hymnId]:
         *   get:
         *     description: Gets a hymn of the specified tune in the specified Season
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
         *       - name: hymnId
         *         description: Service hymn ID
         *         in:  url
         *         required: true
         *         type: integer
         *     responses:
         *       200:
         *         description: Hymn with Service Details
         *         schema:
         *           type: object
         *           items:
         *             $ref: '#/definitions/HymnWithServiceDetails'
         *
         *       404:
         *         description: A hymn detail was not found.
         *         schema:
         *           type: object
         *           properties:
         *             errorCode:
         *               type: string
         *             message:
         *               type: string
         */
        this.router.get(`/:tuneId(\\d+)/${ResourceTypes.Seasons}/:seasonId(\\d+)/${ResourceTypes.Hymns}/:hymnId(\\d+)`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getTuneSeasonServiceHymn(
                    LanguageHelpers.getResponseLanguage(req, configuration),
                    req.params.tuneId,
                    req.params.seasonId,
                    req.params.hymnId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * /tunes/[tuneId]/seasons/[seasonId]/hymns/[hymnId]/formats:
         *   get:
         *     description: Gets a list of formats of the specified tune in the specified Season and hymn
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
         *       - name: hymnId
         *         description: Service hymn ID
         *         in:  url
         *         required: true
         *         type: integer
         *     responses:
         *       200:
         *         description: Hymn formats
         *         schema:
         *           type: array
         *           items:
         *             $ref: '#/definitions/Format'
         */
        this.router.get(`/:tuneId(\\d+)/${ResourceTypes.Seasons}/:seasonId(\\d+)/${ResourceTypes.Hymns}/:hymnId(\\d+)/${ResourceTypes.Formats}`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getTuneSeasonServiceHymnFormatList(req.params.tuneId, req.params.seasonId, req.params.hymnId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * /tunes/[tuneId]/seasons/[seasonId]/hymns/[hymnId]/formats/[formatId]:
         *   get:
         *     description: Gets a format of the specified tune in the specified Season and hymn
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
         *       - name: hymnId
         *         description: Service hymn ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: formatId
         *         description: Format ID
         *         in:  url
         *         required: true
         *         type: integer
         *     responses:
         *       200:
         *         description: Format
         *         schema:
         *           type: object
         *           items:
         *             $ref: '#/definitions/Format'
         *
         *       404:
         *         description: A format detail was not found.
         *         schema:
         *           type: object
         *           properties:
         *             errorCode:
         *               type: string
         *             message:
         *               type: string
         */
        this.router.get(`/:tuneId(\\d+)/${ResourceTypes.Seasons}/:seasonId(\\d+)/${ResourceTypes.Hymns}/:hymnId(\\d+)/${ResourceTypes.Formats}/:formatId(\\d+)`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getTuneSeasonServiceHymnFormat(req.params.tuneId, req.params.seasonId, req.params.hymnId, req.params.formatId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * /tunes/[tuneId]/seasons/[seasonId]/hymns/[hymnId]/formats/[formatId]/variations:
         *   get:
         *     description: Gets a list of variations of the specified tune in the specified Season, hymn, and format
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
         *       - name: hymnId
         *         description: Service hymn ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: formatId
         *         description: Format ID
         *         in:  url
         *         required: true
         *         type: integer
         *     responses:
         *       200:
         *         description: Hymn format variations
         *         schema:
         *           type: array
         *           items:
         *             $ref: '#/definitions/Variation'
         *
         *       501:
         *         description: Format variation is not supported at this time
         *         schema:
         *           type: object
         *           properties:
         *             errorCode:
         *               type: string
         *             message:
         *               type: string
         *             details:
         *               type: string
         */
        this.router.get(`/:tuneId(\\d+)/${ResourceTypes.Seasons}/:seasonId(\\d+)/${ResourceTypes.Hymns}/:hymnId(\\d+)/${ResourceTypes.Formats}/:formatId(\\d+)/${ResourceTypes.Variations}`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getTuneSeasonServiceHymnFormatVariationList(req.params.tuneId, req.params.seasonId, req.params.hymnId, req.params.formatId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * /tunes/[tuneId]/seasons/[seasonId]/hymns/[hymnId]/formats/[formatId]/variations/[variationId]:
         *   get:
         *     description: Gets a variation of the specified tune in the specified Season, hymn, format, and variation
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
         *       - name: hymnId
         *         description: Service hymn ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: formatId
         *         description: Format ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: variationId
         *         description: Variation ID
         *         in:  url
         *         required: true
         *         type: integer
         *     responses:
         *       200:
         *         description: Variation
         *         schema:
         *           type: object
         *           items:
         *             $ref: '#/definitions/Variation'
         *
         *       404:
         *         description: A variation detail was not found.
         *         schema:
         *           type: object
         *           properties:
         *             errorCode:
         *               type: string
         *             message:
         *               type: string
         *
         *       501:
         *         description: Format content is not supported at this time
         *         schema:
         *           type: object
         *           properties:
         *             errorCode:
         *               type: string
         *             message:
         *               type: string
         *             details:
         *               type: string
         */
        this.router.get(`/:tuneId(\\d+)/${ResourceTypes.Seasons}/:seasonId(\\d+)/${ResourceTypes.Hymns}/:hymnId(\\d+)/${ResourceTypes.Formats}/:formatId(\\d+)/${ResourceTypes.Variations}/:variationId(\\d+)`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getTuneSeasonServiceHymnFormatVariation(req.params.tuneId, req.params.seasonId, req.params.hymnId, req.params.formatId, req.params.variationId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });
    }
}
