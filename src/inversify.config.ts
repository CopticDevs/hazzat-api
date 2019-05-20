import { Container } from "inversify";
import { IDataProvider, IDataProviderOptions } from "./DataProviders/IDataProvider";
import { SqlDataProvider, SqlDataProviderOptions } from "./DataProviders/SqlDataProvider/SqlDataProvider";
import { TYPES } from "./types";

const myContainer = new Container();
myContainer.bind<IDataProvider>(TYPES.IDataProvider).to(SqlDataProvider);
myContainer.bind<IDataProviderOptions>(TYPES.IDataProviderOptions).to(SqlDataProviderOptions);

export { myContainer };
