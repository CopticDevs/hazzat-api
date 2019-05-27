import express = require("express");
import { BaseController } from "./BaseController";

/*
 * Home Controller.
 */
export class HomeController extends BaseController {
    constructor() {
        super();
        this.router.get("/", (req: express.Request, res: express.Response) => {
            res.send("hazzat-api");
        });
    }
}
