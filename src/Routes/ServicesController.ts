import * as express from "express";
import { IDataProvider } from "../DataProviders/IDataProvider";
import { BaseController } from "./BaseController";

export class ServicesController extends BaseController {
    constructor(dataProvider: IDataProvider) {
        super();

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
         * /services/[serviceId]/hymns:
         *   get:
         *     description: Gets a list of Hymns within a given service id
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: serviceId
         *         description: Service ID
         *         in:  url
         *         required: true
         *         type: string
         *     responses:
         *       200:
         *         description: ServiceHymns
         *         schema:
         *           type: array
         *           items:
         *             $ref: '#/definitions/ServiceHymn'
         */
        this.router.get("/:serviceId(\\d+)/hymns", async (req: express.Request, res: express.Response) => {
            try {
                const result = await dataProvider.getServiceHymnList(req.params.serviceId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });
    }
}
