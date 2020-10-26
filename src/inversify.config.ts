import { Container } from "inversify";
import { Configuration, IConfiguration } from "./Common/Configuration";
import { IDataProvider } from "./Providers/DataProviders/IDataProvider";
import { SqlDataProvider } from "./Providers/DataProviders/SqlDataProvider/SqlDataProvider";
import { HymnsProvider } from "./Providers/ServiceProviders/HymnsProvider";
import { IHymnsProvider } from "./Providers/ServiceProviders/IHymnsProvider";
import { TYPES } from "./types";

const myContainer = new Container();
myContainer.bind<IDataProvider>(TYPES.IDataProvider).to(SqlDataProvider);
myContainer.bind<IConfiguration>(TYPES.IConfiguration).to(Configuration);
myContainer.bind<IHymnsProvider>(TYPES.IHymnsProvider).to(HymnsProvider);

export { myContainer };
