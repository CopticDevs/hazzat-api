import "reflect-metadata";
import { ImportMock, MockManager } from 'ts-mock-imports';
import { myContainer } from "../../inversify.config";
import * as SqlDataProviderModule from '../../Providers/DataProviders/SqlDataProvider/SqlDataProvider';
import { IHymnsServiceProvider } from "../../Providers/ServiceProviders/IHymnsServiceProvider";
import { TYPES } from "../../types";
import { SqlDataProviderMock } from "../Helpers/SqlDataProviderMock";
import { Validators } from "../Helpers/Validators";

process.env.NODE_ENV = "test";

describe("Tunes Controller", () => {
    let mockManager: MockManager<SqlDataProviderModule.SqlDataProvider>;
    let hymnsProvider: IHymnsServiceProvider;

    beforeEach("Mock out Tunes Data Provider", () => {
        // Setup Mocking for SqlDataProvider
        mockManager = ImportMock.mockClass(SqlDataProviderModule, 'SqlDataProvider');

        // Create the service
        hymnsProvider = myContainer.get<IHymnsServiceProvider>(TYPES.IHymnsServiceProvider);
    });

    afterEach("Restore dependencies", () => {
        mockManager.restore();
    });

    describe("/GET all tunes", () => {
        it("should get all tunes with results", async () => {
            // Setup mocked result
            mockManager.mock('getTuneList', SqlDataProviderMock.getDbTunesList());

            const tunesList = await hymnsProvider.getTuneList();
            tunesList.should.be.a("array");
            tunesList.length.should.be.not.eql(0);
            tunesList.forEach((tune) => Validators.validateTuneResponse(tune));
        });

        it("should get all tunes with empty results", async () => {
            // Setup mocked result
            mockManager.mock('getTuneList', []);

            const tunesList = await hymnsProvider.getTuneList();
            tunesList.should.be.a("array");
            tunesList.length.should.be.eql(0);
            tunesList.forEach((tune) => {
                console.log("name: " + tune.name);
            });
        });
    });
});
