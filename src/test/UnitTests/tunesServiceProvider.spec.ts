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
            Validators.validateArray(tunesList, true);
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

    describe("All seasons in a tune", () => {
        it("should get all seasons for a tune with results", async () => {
            // Setup mocked result
            mockManager.mock('getTuneSeasonList', SqlDataProviderMock.getDbTuneSeasonList());

            const seasonList = await hymnsProvider.getTuneSeasonList("12");
            Validators.validateArray(seasonList);
            seasonList.length.should.be.eql(3);
            seasonList.forEach((season) => Validators.validateTuneSeason(season));
        });

        it("should get all seasons for a tune with empty results", async () => {
            // Setup mocked result
            mockManager.mock('getTuneSeasonList', []);

            const seasonList = await hymnsProvider.getTuneSeasonList("tuneId");
            Validators.validateArray(seasonList, true);
        });
    });

    describe("A single season in a tune", () => {
        it("should get a single season for a tune", async () => {
            // Setup mocked result
            mockManager.mock('getTuneSeason', SqlDataProviderMock.getDbTuneSeason());

            const season = await hymnsProvider.getTuneSeason("12", "seasonId");
            Validators.validateObject(season);
            Validators.validateTuneSeason(season);
        });

        it("should have correct db to contract service mapping", async () => {
            // Setup mocked result
            mockManager.mock('getTuneSeason', SqlDataProviderMock.getDbTuneSeason());

            const seasonDb = SqlDataProviderMock.getDbTuneSeason();
            const season = await hymnsProvider.getTuneSeason("tuneId", "seasonId");

            // Validate that the contract was mapped out correctly from db results
            season.name.should.be.equal(seasonDb.Name);
            season.verse.should.be.equal(seasonDb.Verse);
        });
    });
});
