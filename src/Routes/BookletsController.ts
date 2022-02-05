import * as express from "express";
import { IHymnsServiceProvider } from "../Providers/ServiceProviders/IHymnsServiceProvider";
import { BaseController } from "./BaseController";

export class BookletsController extends BaseController {
    constructor(hymnsServiceProvider: IHymnsServiceProvider) {
        super();

        /**
         * @swagger
         *
         * definitions:
         *   Booklet:
         *     type: object
         *     properties:
         *       id:
         *         type: string
         *       name:
         *         type: string
         *       summary:
         *         type: string
         *       order:
         *         type: integer
         *       sourcePath:
         *         type: string
         *       displayPath:
         *         type: string
         *       printPath:
         *         type: string
         *       thumbnailPath:
         *         type: string
         *       fullPicturePath:
         *         type: string
         *       releaseDate:
         *         type: string
         *     required: [id, name, summary, order, sourcePath, displayPath, printPath, thumbnailPath, fullPicturePath, releaseDate]
         *
         * /seasons:
         *   get:
         *     description: Gets a list of Booklets
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Booklets
         *         schema:
         *           type: array
         *           items:
         *             $ref: '#/definitions/Booklet'
         */
        this.router.get("/", async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getBookletList();
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });
    }
}
