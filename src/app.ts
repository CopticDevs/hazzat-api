import * as debug from "debug";
import * as express from "express";
import { AddressInfo } from "net";
import "reflect-metadata";
import * as swaggerJSDoc from "swagger-jsdoc";
import * as swaggerUI from "swagger-ui-express";
import { IConfiguration } from "./Common/Configuration";
import { HttpError } from "./Common/HttpError";
import { IDataProvider } from "./DataProviders/IDataProvider";
import { myContainer } from "./inversify.config";
import { HomeController } from "./Routes/HomeController";
import { SeasonsController } from "./Routes/SeasonsController";
import { ServicesController } from "./Routes/ServicesController";
import { TYPES } from "./types";

const configuration: IConfiguration = myContainer.get<IConfiguration>(TYPES.IConfiguration);
const dataProvider: IDataProvider = myContainer.get<IDataProvider>(TYPES.IDataProvider);
const homeController = new HomeController();
const seasonsController = new SeasonsController(dataProvider);
const servicesController = new ServicesController(dataProvider);

const app = express();
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

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use("/", homeController.router);
app.use("/seasons", seasonsController.router);
app.use("/services", servicesController.router);

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

module.exports = server;
