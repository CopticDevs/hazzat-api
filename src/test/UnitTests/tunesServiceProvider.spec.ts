import { ImportMock, MockManager } from 'ts-mock-imports';
import * as SqlDataProviderModule from '../../Providers/DataProviders/SqlDataProvider/SqlDataProvider';
import { HymnsServiceProvider } from "../../Providers/ServiceProviders/HymnsServiceProvider";
import { IHymnsServiceProvider } from "../../Providers/ServiceProviders/IHymnsServiceProvider";
import { SqlDataProviderMock } from "../Helpers/SqlDataProviderMock";
import { Validators } from "../Helpers/Validators";

process.env.NODE_ENV = "test";

describe("Tunes Service Provider Unit Tests", () => {
    let mockManager: MockManager<SqlDataProviderModule.SqlDataProvider>;
    let hymnsProvider: IHymnsServiceProvider;

    beforeEach("Mock out Tunes Data Provider", () => {
        // Setup Mocking for SqlDataProvider
        mockManager = ImportMock.mockClass(SqlDataProviderModule, 'SqlDataProvider');

        // Create the service
        hymnsProvider = new HymnsServiceProvider(mockManager.getMockInstance());
    });

    afterEach("Restore dependencies", () => {
        mockManager.restore();
    });

    describe("All tunes", () => {
        it("should get all tunes with results", async () => {
            // Setup mocked result
            mockManager.mock('getTuneList', SqlDataProviderMock.getDbTunesList());

            const tunesList = await hymnsProvider.getTuneList();
            Validators.validateArray(tunesList);
            tunesList.length.should.be.eql(3);
            tunesList.forEach((tune) => Validators.validateHymnTune(tune));
        });

        it("should get tunes with empty results", async () => {
            // Setup mocked result
            mockManager.mock('getTuneList', []);

            const tunesList = await hymnsProvider.getTuneList();
            Validators.validateArray(tunesList);
            tunesList.length.should.be.eql(0);
        });
    });

    describe("A single tune", () => {
        it("should get a single tune", async () => {
            // Setup mocked result
            mockManager.mock('getTune', SqlDataProviderMock.getDbTune());

            const tune = await hymnsProvider.getTune("tuneId");
            Validators.validateObject(tune);
            Validators.validateHymnTune(tune);
        });

        it("should have correct db to contract hymn tune mapping", async () => {
            // Setup mocked result
            mockManager.mock('getTune', SqlDataProviderMock.getDbTune());

            const tuneDb = SqlDataProviderMock.getDbTune();
            const tune = await hymnsProvider.getTune("tuneId");

            // Validate that the contract was mapped out correctly from db results
            tune.name.should.be.equal(tuneDb.Name);
            tune.hymnCount.should.be.equal(tuneDb.ServiceHymnsCount);
            tune.order.should.be.equal(tuneDb.Tune_Order);
        });
    });
});
