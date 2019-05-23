import { Container } from "inversify";
import { IDataProvider } from "./DataProviders/IDataProvider";
import { SqlDataProvider } from "./DataProviders/SqlDataProvider/SqlDataProvider";
import { TYPES } from "./types";

const myContainer = new Container();
myContainer.bind<IDataProvider>(TYPES.IDataProvider).to(SqlDataProvider);

export { myContainer };
