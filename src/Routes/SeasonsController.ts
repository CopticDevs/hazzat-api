import * as express from "express";
import { IConfiguration } from "../Common/Configuration";
import { LanguageHelpers } from "../Common/Utils/LanguageHelpers";
import { IHymnsServiceProvider } from "../Providers/ServiceProviders/IHymnsServiceProvider";
import { BaseController } from "./BaseController";
import { ResourceTypes } from "./ResourceTypes";

export class SeasonsController extends BaseController {

    constructor(
        hymnsServiceProvider: IHymnsServiceProvider,
        configuration: IConfiguration) {
        super();

        /**
         * @swagger
         *
         * definitions:
         *   Season:
         *     type: object
         *     properties:
         *       id:
         *         type: string
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
         *     parameters:
         *       - name: Accept-Language
         *         in: header
         *         type: string
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
                const result = await hymnsServiceProvider.getSeasonList(LanguageHelpers.getResponseLanguage(req, configuration));
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
         *       - name: Accept-Language
         *         in: header
         *         type: string
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
        this.router.get("/:seasonId(\\d+)", async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getSeason(
                    LanguageHelpers.getResponseLanguage(req, configuration),
                    req.params.seasonId);
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
         *         type: string
         *       name:
         *         type: string
         *       order:
         *         type: integer
         *     required: [id, name, order]
         *
         * /seasons/[seasonId]/services:
         *   get:
         *     description: Gets a list of Services within a given season id
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: Accept-Language
         *         in: header
         *         type: string
         *       - name: seasonId
         *         description: Season ID
         *         in:  url
         *         required: true
         *         type: integer
         *     responses:
         *       200:
         *         description: Services
         *         schema:
         *           type: array
         *           items:
         *             $ref: '#/definitions/Service'
         */
        this.router.get(`/:seasonId(\\d+)/${ResourceTypes.Services}`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getSeasonServiceList(
                    LanguageHelpers.getResponseLanguage(req, configuration),
                    req.params.seasonId);
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
         *       - name: Accept-Language
         *         in: header
         *         type: string
         *       - name: seasonId
         *         description: Season ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: serviceId
         *         description: Service ID
         *         in:  url
         *         required: true
         *         type: integer
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
        this.router.get(`/:seasonId(\\d+)/${ResourceTypes.Services}/:serviceId(\\d+)`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getSeasonService(
                    LanguageHelpers.getResponseLanguage(req, configuration),
                    req.params.seasonId, req.params.serviceId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * definitions:
         *   Hymn:
         *     type: object
         *     properties:
         *       id:
         *         type: string
         *       name:
         *         type: string
         *       order:
         *         type: integer
         *     required: [id, name, order]
         *
         * /seasons/[seasonId]/services/[serviceId]/hymns:
         *   get:
         *     description: Gets a list of hymns in the service
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: Accept-Language
         *         in: header
         *         type: string
         *       - name: seasonId
         *         description: Season ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: serviceId
         *         description: Service ID
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
        this.router.get(`/:seasonId(\\d+)/${ResourceTypes.Services}/:serviceId(\\d+)/${ResourceTypes.Hymns}`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getServiceHymnList(
                    LanguageHelpers.getResponseLanguage(req, configuration),
                    req.params.seasonId,
                    req.params.serviceId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * /seasons/[seasonId]/services/[serviceId]/hymns/[hymnId]:
         *   get:
         *     description: Returns the details of the given hymn
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: Accept-Language
         *         in: header
         *         type: string
         *       - name: seasonId
         *         description: Season ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: serviceId
         *         description: Service ID
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
         *         description: Hymn
         *         schema:
         *           type: object
         *           items:
         *             $ref: '#/definitions/Hymn'
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
        this.router.get(`/:seasonId(\\d+)/${ResourceTypes.Services}/:serviceId(\\d+)/${ResourceTypes.Hymns}/:hymnId(\\d+)`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getServiceHymn(
                    LanguageHelpers.getResponseLanguage(req, configuration),
                    req.params.seasonId,
                    req.params.serviceId, req.params.hymnId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * definitions:
         *   Format:
         *     type: object
         *     properties:
         *       id:
         *         type: string
         *       name:
         *         type: string
         *       order:
         *         type: integer
         *       variationCount:
         *         type: integer
         *     required: [id, name, order, variationCount]
         *
         * /seasons/[seasonId]/services/[serviceId]/hymns/[hymnId]/formats:
         *   get:
         *     description: Gets a list of formats for the given hymn
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: Accept-Language
         *         in: header
         *         type: string
         *       - name: seasonId
         *         description: Season ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: serviceId
         *         description: Service ID
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
        this.router.get(`/:seasonId(\\d+)/${ResourceTypes.Services}/:serviceId(\\d+)/${ResourceTypes.Hymns}/:hymnId(\\d+)/${ResourceTypes.Formats}`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getServiceHymnFormatList(
                    LanguageHelpers.getResponseLanguage(req, configuration),
                    req.params.seasonId,
                    req.params.serviceId,
                    req.params.hymnId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * /seasons/[seasonId]/services/[serviceId]/hymns/[hymnId]/formats/[formatId]:
         *   get:
         *     description: Returns the details of the format for the given hymn
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: Accept-Language
         *         in: header
         *         type: string
         *       - name: seasonId
         *         description: Season ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: serviceId
         *         description: Service ID
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
        this.router.get(`/:seasonId(\\d+)/${ResourceTypes.Services}/:serviceId(\\d+)/${ResourceTypes.Hymns}/:hymnId(\\d+)/${ResourceTypes.Formats}/:formatId(\\d+)`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getServiceHymnFormat(
                    LanguageHelpers.getResponseLanguage(req, configuration),
                    req.params.seasonId,
                    req.params.serviceId,
                    req.params.hymnId,
                    req.params.formatId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * definitions:
         *   TextColumn:
         *     type: object
         *     properties:
         *       content:
         *         type: string
         *       language:
         *         type: string
         *     required: [content, language]
         *
         *   TextParagraph:
         *     type: object
         *     properties:
         *       columns:
         *         type: array
         *         items:
         *           $ref: '#/definitions/TextColumn'
         *       isComment:
         *         type: boolean
         *     required: [columns]
         *
         *   TextContent:
         *     type: object
         *     properties:
         *       paragraphs:
         *         type: array
         *         items:
         *           $ref: '#/definitions/TextParagraph'
         *       contentType:
         *         type: string
         *     required: [paragraphs]
         *
         *   HazzatContent:
         *     type: object
         *     properties:
         *       arabicHazzat:
         *         type: string
         *       copticHazzat:
         *         type: string
         *       englishHazzat:
         *         type: string
         *       contentType:
         *         type: string
         *
         *   VerticalHazzatContent:
         *     type: object
         *     properties:
         *       arabicVerticalHazzat:
         *         type: string
         *       copticVerticalHazzat:
         *         type: string
         *       englishVerticalHazzat:
         *         type: string
         *       contentType:
         *         type: string
         *
         *   MusicalNotesContent:
         *     type: object
         *     properties:
         *       musicFilePath:
         *         type: string
         *       audioFilePath:
         *         type: string
         *       contentType:
         *         type: string
         *
         *   AudioContent:
         *     type: object
         *     properties:
         *       audioFilePath:
         *         type: string
         *       contentType:
         *         type: string
         *
         *   VideoContent:
         *     type: object
         *     properties:
         *       arabicVideo:
         *         type: string
         *       copticVideo:
         *         type: string
         *       englishVideo:
         *         type: string
         *       contentType:
         *         type: string
         *
         *   InformationContent:
         *     type: object
         *     properties:
         *       arabicInformation:
         *         type: string
         *       englishInformation:
         *         type: string
         *       contentType:
         *         type: string
         *
         *   Variation:
         *     type: object
         *     properties:
         *       id:
         *         type: string
         *       name:
         *         type: string
         *       content:
         *         oneOf:
         *           - $ref: '#/definitions/TextContent'
         *           - $ref: '#/definitions/HazzatContent'
         *           - $ref: '#/definitions/VerticalHazzatContent'
         *           - $ref: '#/definitions/MusicalNotesContent'
         *           - $ref: '#/definitions/AudioContent'
         *           - $ref: '#/definitions/VideoContent'
         *           - $ref: '#/definitions/InformationContent'
         *         discriminator:
         *           propertyName: contentType
         *     required: [id, name, content]
         *
         * /seasons/[seasonId]/services/[serviceId]/hymns/[hymnId]/formats/[formatId]/variations:
         *   get:
         *     description: Gets a list of variations for the given hymn
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: Accept-Language
         *         in: header
         *         type: string
         *       - name: seasonId
         *         description: Season ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: serviceId
         *         description: Service ID
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
        this.router.get(`/:seasonId(\\d+)/${ResourceTypes.Services}/:serviceId(\\d+)/${ResourceTypes.Hymns}/:hymnId(\\d+)/${ResourceTypes.Formats}/:formatId(\\d+)/${ResourceTypes.Variations}`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getServiceHymnsFormatVariationList(
                    LanguageHelpers.getResponseLanguage(req, configuration),
                    req.params.seasonId,
                    req.params.serviceId,
                    req.params.hymnId,
                    req.params.formatId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * /seasons/[seasonId]/services/[serviceId]/hymns/[hymnId]/formats/[formatId]/variations/[variationId]:
         *   get:
         *     description: Returns the details of the variation
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: Accept-Language
         *         in: header
         *         type: string
         *       - name: seasonId
         *         description: Season ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: serviceId
         *         description: Service ID
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
        this.router.get(`/:seasonId(\\d+)/${ResourceTypes.Services}/:serviceId(\\d+)/${ResourceTypes.Hymns}/:hymnId(\\d+)/${ResourceTypes.Formats}/:formatId(\\d+)/${ResourceTypes.Variations}/:variationId(\\d+)`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getServiceHymnsFormatVariation(
                    LanguageHelpers.getResponseLanguage(req, configuration),
                    req.params.seasonId,
                    req.params.serviceId,
                    req.params.hymnId,
                    req.params.formatId,
                    req.params.variationId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });
    }
}
