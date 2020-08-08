import * as express from "express";
import { IDataProvider } from "../DataProviders/IDataProvider";
import { BaseController } from "./BaseController";

const RouteParts = {
    services: "services",
    serviceHymns: "serviceHymns",
    formats: "formats",
    contents: "contents"
};

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
         *       seasonId:
         *         type: integer
         *       seasonName:
         *         type: string
         *       order:
         *         type: integer
         *     required: [id, name, seasonId, seasonName, order]
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
         *         type: integer
         *     responses:
         *       200:
         *         description: Services
         *         schema:
         *           type: array
         *           items:
         *             $ref: '#/definitions/Service'
         */
        this.router.get(`/:seasonId(\\d+)/${RouteParts.services}`, async (req: express.Request, res: express.Response) => {
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
        this.router.get(`/:seasonId(\\d+)/${RouteParts.services}/:serviceId(\\d+)`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await dataProvider.getSeasonService(req.params.seasonId, req.params.serviceId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * definitions:
         *   ServiceHymn:
         *     type: object
         *     properties:
         *       id:
         *         type: integer
         *       name:
         *         type: string
         *       seasonId:
         *         type: integer
         *       seasonName:
         *         type: string
         *       serviceId:
         *         type: integer
         *       serviceName:
         *         type: string
         *       order:
         *         type: integer
         *     required: [id, name, seasonId, seasonName, serviceId, serviceName, order]
         *
         * /seasons/[seasonId]/services/[serviceId]/serviceHymns:
         *   get:
         *     description: Gets a list of hymns in the services within a given season id
         *     produces:
         *       - application/json
         *     parameters:
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
         *         description: Service Hymns
         *         schema:
         *           type: array
         *           items:
         *             $ref: '#/definitions/ServiceHymn'
         */
        this.router.get(`/:seasonId(\\d+)/${RouteParts.services}/:serviceId(\\d+)/${RouteParts.serviceHymns}`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await dataProvider.getServiceHymnList(req.params.seasonId, req.params.serviceId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * /seasons/[seasonId]/services/[serviceId]/serviceHymn/[serviceHymnId]:
         *   get:
         *     description: Returns the details of the given service hymn
         *     produces:
         *       - application/json
         *     parameters:
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
         *       - name: serviceHymnId
         *         description: Service hymn ID
         *         in:  url
         *         required: true
         *         type: integer
         *     responses:
         *       200:
         *         description: ServiceHymn
         *         schema:
         *           type: object
         *           items:
         *             $ref: '#/definitions/ServiceHymn'
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
        this.router.get(`/:seasonId(\\d+)/${RouteParts.services}/:serviceId(\\d+)/${RouteParts.serviceHymns}/:serviceHymnId(\\d+)`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await dataProvider.getServiceHymn(req.params.seasonId, req.params.serviceId, req.params.serviceHymnId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * definitions:
         *   ServiceHymnFormat:
         *     type: object
         *     properties:
         *       id:
         *         type: integer
         *       name:
         *         type: string
         *       seasonId:
         *         type: integer
         *       seasonName:
         *         type: string
         *       serviceId:
         *         type: integer
         *       serviceName:
         *         type: string
         *       order:
         *         type: integer
         *       serviceHymnId:
         *         type: integer
         *       serviceHymnName:
         *         type: string
         *       contentCount:
         *         type: integer
         *     required: [id, name, seasonId, seasonName, serviceId, serviceName, order, serviceHymnId, serviceHymnName, contentCount]
         *
         * /seasons/[seasonId]/services/[serviceId]/serviceHymn/[serviceHymnId]/formats:
         *   get:
         *     description: Gets a list of formats for the given hymn
         *     produces:
         *       - application/json
         *     parameters:
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
         *       - name: serviceHymnId
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
         *             $ref: '#/definitions/ServiceHymnFormat'
         */
        this.router.get(`/:seasonId(\\d+)/${RouteParts.services}/:serviceId(\\d+)/${RouteParts.serviceHymns}/:serviceHymnId(\\d+)/${RouteParts.formats}`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await dataProvider.getServiceHymnFormatList(req.params.seasonId, req.params.serviceId, req.params.serviceHymnId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * /seasons/[seasonId]/services/[serviceId]/serviceHymn/[serviceHymnId]/formats/[formatId]:
         *   get:
         *     description: Returns the details of the format for the given service hymn
         *     produces:
         *       - application/json
         *     parameters:
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
         *       - name: serviceHymnId
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
         *         description: ServiceHymnFormat
         *         schema:
         *           type: object
         *           items:
         *             $ref: '#/definitions/ServiceHymnFormat'
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
        this.router.get(`/:seasonId(\\d+)/${RouteParts.services}/:serviceId(\\d+)/${RouteParts.serviceHymns}/:serviceHymnId(\\d+)/${RouteParts.formats}/:formatId(\\d+)`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await dataProvider.getServiceHymnFormat(req.params.seasonId, req.params.serviceId, req.params.serviceHymnId, req.params.formatId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * definitions:
         *   TextContent:
         *     type: object
         *     properties:
         *       arabicText:
         *         type: string
         *       copticText:
         *         type: string
         *       englishText:
         *         type: string
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
         *
         *   InformationContent:
         *     type: object
         *     properties:
         *       arabicInformation:
         *         type: string
         *       englishInformation:
         *         type: string
         *
         *   HymnContent:
         *     schema:
         *       oneOf:
         *         - $ref: '#/definitions/TextContent'
         *         - $ref: '#/definitions/HazzatContent'
         *         - $ref: '#/definitions/VerticalHazzatContent'
         *         - $ref: '#/definitions/VideoContent'
         *         - $ref: '#/definitions/InformationContent'
         *       discriminator:
         *         propertyName: contentType
         *
         *   ServiceHymnFormatContent:
         *     type: object
         *     properties:
         *       id:
         *         type: integer
         *       name:
         *         type: string
         *       content:
         *         $ref: '#/definitions/HymnContent'
         *       seasonId:
         *         type: integer
         *       seasonName:
         *         type: string
         *       serviceId:
         *         type: integer
         *       serviceName:
         *         type: string
         *       serviceHymnId:
         *         type: integer
         *       serviceHymnName:
         *         type: string
         *       formatId:
         *         type: integer
         *       formatName:
         *         type: string
         *     required: [id, name, content, seasonId, seasonName, serviceId, serviceName, serviceHymnId, serviceHymnName, formatId, formatName]
         *
         * /seasons/[seasonId]/services/[serviceId]/serviceHymn/[serviceHymnId]/formats/[formatId]/contents:
         *   get:
         *     description: Gets a list of contents for the given hymn
         *     produces:
         *       - application/json
         *     parameters:
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
         *       - name: serviceHymnId
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
         *         description: Hymn format contents
         *         schema:
         *           type: array
         *           items:
         *             $ref: '#/definitions/ServiceHymnFormatContent'
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
        this.router.get(`/:seasonId(\\d+)/${RouteParts.services}/:serviceId(\\d+)/${RouteParts.serviceHymns}/:serviceHymnId(\\d+)/${RouteParts.formats}/:formatId(\\d+)/${RouteParts.contents}`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await dataProvider.getServiceHymnsFormatContentList(req.params.seasonId, req.params.serviceId, req.params.serviceHymnId, req.params.formatId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * /seasons/[seasonId]/services/[serviceId]/serviceHymn/[serviceHymnId]/formats/[formatId]/contents/[contentId]:
         *   get:
         *     description: Returns the details of the format content
         *     produces:
         *       - application/json
         *     parameters:
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
         *       - name: serviceHymnId
         *         description: Service hymn ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: formatId
         *         description: Format ID
         *         in:  url
         *         required: true
         *         type: integer
         *       - name: contentId
         *         description: Content ID
         *         in:  url
         *         required: true
         *         type: integer
         *     responses:
         *       200:
         *         description: ServiceHymnFormatContent
         *         schema:
         *           type: object
         *           items:
         *             $ref: '#/definitions/ServiceHymnFormatContent'
         *
         *       404:
         *         description: A content detail was not found.
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
        this.router.get(`/:seasonId(\\d+)/${RouteParts.services}/:serviceId(\\d+)/${RouteParts.serviceHymns}/:serviceHymnId(\\d+)/${RouteParts.formats}/:formatId(\\d+)/${RouteParts.contents}/:contentId(\\d+)`, async (req: express.Request, res: express.Response) => {
            try {
                const result = await dataProvider.getServiceHymnsFormatContent(req.params.seasonId, req.params.serviceId, req.params.serviceHymnId, req.params.formatId, req.params.contentId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });
    }
}
