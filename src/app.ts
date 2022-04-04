import * as express from "express";
import * as cors from "cors";
import { AddressInfo } from "net";
import "reflect-metadata";
import * as swaggerJSDoc from "swagger-jsdoc";
import * as swaggerUI from "swagger-ui-express";
import { IConfiguration } from "./Common/Configuration";
import { HttpError } from "./Common/HttpError";
import { logger } from "./Common/Utils/Logger";
import { myContainer } from "./inversify.config";
import { IHymnsServiceProvider } from "./Providers/ServiceProviders/IHymnsServiceProvider";
import { BookletsController } from "./Routes/BookletsController";
import { HomeController } from "./Routes/HomeController";
import { ResourceTypes } from "./Routes/ResourceTypes";
import { SeasonsController } from "./Routes/SeasonsController";
import { TunesController } from "./Routes/TunesController";
import { TypesController } from "./Routes/TypesController";
import { TYPES } from "./types";

const configuration: IConfiguration = myContainer.get<IConfiguration>(TYPES.IConfiguration);
const hymnsProvider: IHymnsServiceProvider = myContainer.get<IHymnsServiceProvider>(TYPES.IHymnsServiceProvider);

const homeController = new HomeController();
const seasonsController = new SeasonsController(hymnsProvider);
const typesController = new TypesController(hymnsProvider);
const tunesController = new TunesController(hymnsProvider);
const bookletsController = new BookletsController(hymnsProvider);

const app = express();
app.use(cors());

const port = configuration.port;

const options = {
    apis: ["./**/Routes/*.js"],
    definition: {
        basePath: "/",
        info: {
            title: "hazzat-api",
            version: "0.0.1",
          },
      }
  };

const swaggerSpec = swaggerJSDoc(options);

// Log requests
app.use((req, res, next) => {
    logger.info(req.url);
    next();
});

// Log errors
app.use((err, req, res, next) => {
    logger.error(err);
    next();
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use("/", homeController.router);
app.use(`/${ResourceTypes.Seasons}`, seasonsController.router);
app.use(`/${ResourceTypes.Types}`, typesController.router);
app.use(`/${ResourceTypes.Tunes}`, tunesController.router);
app.use(`/${ResourceTypes.Booklets}`, bookletsController.router);

// Allow Let's Encrypt to access challenge static content
app.use("/.well-known/acme-challenge", express.static(__dirname + "/.well-known/acme-challenge"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    throw new HttpError(404, "Not Found");
});

// error handlers
app.use((err: any, req, res, next) => {
    logger.info(err);
    res.status(err.status || 500).send(err);
});

app.set("port", port);

const server = app.listen(app.get("port"), () => {
    logger.debug("Express server listening on port " + (server.address() as AddressInfo).port);
});

module.exports = server;
