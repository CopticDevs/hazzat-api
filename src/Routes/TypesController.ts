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
         *     required: [id, name, order, hymnCount]
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
    }
}
