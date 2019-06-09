import debug = require("debug");
import * as express from "express";
import { AddressInfo } from "net";
import "reflect-metadata";
import { IConfiguration } from "./Common/Configuration";
import { HttpError } from "./Common/HttpError";
import { IDataProvider } from "./DataProviders/IDataProvider";
import { myContainer } from "./inversify.config";
import { HomeController } from "./Routes/HomeController";
import { SeasonsController } from "./Routes/SeasonsController";
import { TYPES } from "./types";

const configuration: IConfiguration = myContainer.get<IConfiguration>(TYPES.IConfiguration);
const dataProvider: IDataProvider = myContainer.get<IDataProvider>(TYPES.IDataProvider);
const homeController = new HomeController();
const seasonsController = new SeasonsController(dataProvider);

const app = express();
const port = configuration.port;

app.use("/", homeController.router);
app.use("/seasons", seasonsController.router);

// Allow Let's Encrypt to access challenge static content
app.use("/.well-known/acme-challenge", express.static(__dirname + "/.well-known/acme-challenge"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    throw new HttpError(404, "Not Found");
});

// error handlers
app.use((err: any, req, res, next) => {
    console.log(JSON.stringify(err));
    res.status(err.status || 500).send(err);
});

app.set("port", port);

const server = app.listen(app.get("port"), () => {
    debug("Express server listening on port " + (server.address() as AddressInfo).port);
});
