import { Container } from "inversify";
import { Configuration, IConfiguration } from "./Common/Configuration";
import { IDataProvider } from "./DataProviders/IDataProvider";
import { SqlDataProvider } from "./DataProviders/SqlDataProvider/SqlDataProvider";
import { TYPES } from "./types";

const myContainer = new Container();
myContainer.bind<IDataProvider>(TYPES.IDataProvider).to(SqlDataProvider);
myContainer.bind<IConfiguration>(TYPES.IConfiguration).to(Configuration);

export { myContainer };
