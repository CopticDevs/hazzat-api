import * as express from "express";
import { IConfiguration } from "../Common/Configuration";
import { LanguageHelpers } from "../Common/Utils/LanguageHelpers";
import { IHymnsServiceProvider } from "../Providers/ServiceProviders/IHymnsServiceProvider";
import { BaseController } from "./BaseController";

export class BookletsController extends BaseController {
    constructor(
        hymnsServiceProvider: IHymnsServiceProvider,
        configuration: IConfiguration) {
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
         * /booklets:
         *   get:
         *     description: Gets a list of Booklets
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: Accept-Language
         *         in: header
         *         type: string
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
                const result = await hymnsServiceProvider.getBookletList(LanguageHelpers.getResponseLanguage(req, configuration));
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });

        /**
         * @swagger
         *
         * /booklets/[bookletId]:
         *   get:
         *     description: Returns the details of the given booklet id
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: Accept-Language
         *         in: header
         *         type: string
         *       - name: bookletId
         *         description: Booklet ID
         *         in:  url
         *         required: true
         *         type: integer
         *     responses:
         *       200:
         *         description: Booklet
         *         schema:
         *           type: object
         *           items:
         *             $ref: '#/definitions/Booklet'
         *
         *       404:
         *         description: A Booklet detail was not found.
         *         schema:
         *           type: object
         *           properties:
         *             errorCode:
         *               type: string
         *             message:
         *               type: string
         */
        this.router.get("/:bookletId(\\d+)", async (req: express.Request, res: express.Response) => {
            try {
                const result = await hymnsServiceProvider.getBooklet(
                    LanguageHelpers.getResponseLanguage(req, configuration),
                    req.params.bookletId);
                res.send(result);
            } catch (ex) {
                BaseController._OnError(ex, res);
            }
        });
    }
}
