import * as express from "express";
import { IHymnsServiceProvider } from "../Providers/ServiceProviders/IHymnsServiceProvider";
import { BaseController } from "./BaseController";

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
    }
}
