import express = require('express');

/*
 * Home Controller.
 */export class HomeController {
    public router = express.Router();

     constructor() {
         this.router.get('/', (req: express.Request, res: express.Response) => {
             res.send("hazzat-api");
         });
     }
}
