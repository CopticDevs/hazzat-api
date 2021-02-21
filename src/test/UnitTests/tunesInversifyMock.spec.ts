import { Container } from "inversify";
import "reflect-metadata";
import { Configuration, IConfiguration } from "../../Common/Configuration";
import { IDataProvider } from "../../Providers/DataProviders/IDataProvider";
import { HymnsServiceProvider } from "../../Providers/ServiceProviders/HymnsServiceProvider";
import { IHymnsServiceProvider } from "../../Providers/ServiceProviders/IHymnsServiceProvider";
import { TYPES } from "../../types";
import { SqlDataProviderMock2 } from "../Helpers/SqlDataProviderMock2";
import { Validators } from "../Helpers/Validators";

process.env.NODE_ENV = "test";

describe("Tunes Controller", () => {
    let myContainer: Container;
    let hymnsProvider: IHymnsServiceProvider;

    beforeEach("Mock out Data Provider", () => {
        // Setup Mocking for SqlDataProvider
        myContainer = new Container();
        myContainer.bind<IDataProvider>(TYPES.IDataProvider).to(SqlDataProviderMock2);
        myContainer.bind<IConfiguration>(TYPES.IConfiguration).to(Configuration);
        myContainer.bind<IHymnsServiceProvider>(TYPES.IHymnsServiceProvider).to(HymnsServiceProvider);

        // Create the service
        hymnsProvider = myContainer.get<IHymnsServiceProvider>(TYPES.IHymnsServiceProvider);
    });

    describe("/GET all tunes", () => {
        it("should get all tunes with results", async () => {
            const tunesList = await hymnsProvider.getTuneList();
            tunesList.should.be.a("array");
            tunesList.length.should.be.eql(3);
            tunesList.forEach((tune) => Validators.validateTuneResponse(tune));
        });
    });
});
