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

    describe("All hymns in a tune season", () => {
        it("should get all hymns for a tune for a season with results", async () => {
            // Setup mocked result
            mockManager.mock('getTuneSeasonServiceHymnList', SqlDataProviderMock.getDbTuneSeasonServiceHymnList());

            const serviceHymnList = await hymnsProvider.getTuneSeasonServiceHymnList("12", "seasonId");
            Validators.validateArray(serviceHymnList);
            serviceHymnList.length.should.be.eql(3);
            serviceHymnList.forEach((serviceHymn) => Validators.validateTuneServiceHymnWithServiceDetails(serviceHymn));
        });

        it("should get all hymns for a tune for a season with empty results", async () => {
            // Setup mocked result
            mockManager.mock('getTuneSeasonServiceHymnList', []);

            const hymnList = await hymnsProvider.getTuneSeasonServiceHymnList("tuneId", "seasonId");
            Validators.validateArray(hymnList, true);
        });
    });

    describe("A single hymn in a tune in a season", () => {
        it("should get a single hymn for a tune in a season", async () => {
            // Setup mocked result
            mockManager.mock('getTuneSeasonServiceHymn', SqlDataProviderMock.getDbTuneSeasonServiceHymn());

            const serviceHymn = await hymnsProvider.getTuneSeasonServiceHymn("12", "seasonId", "hymnId");
            Validators.validateObject(serviceHymn);
            Validators.validateTuneServiceHymnWithServiceDetails(serviceHymn);
        });

        it("should have correct db to contract service mapping", async () => {
            // Setup mocked result
            mockManager.mock('getTuneSeasonServiceHymn', SqlDataProviderMock.getDbTuneSeasonServiceHymn());

            const serviceHymnDb = SqlDataProviderMock.getDbTuneSeasonServiceHymn();
            const serviceHymn = await hymnsProvider.getTuneSeasonServiceHymn("tuneId", "seasonId", "hymnId");

            // Validate that the contract was mapped out correctly from db results
            serviceHymn.name.should.be.equal(serviceHymnDb.Title);
            serviceHymn.serviceId.should.be.equal(serviceHymnDb.Service_ID);
            serviceHymn.serviceName.should.be.equal(serviceHymnDb.Service_Name);
            serviceHymn.order.should.be.equal(serviceHymnDb.Hymn_Order);
        });
    });

    describe("All formats in a tune season hymn", () => {
        it("should get all formats for a tune for a season for a hymn with results", async () => {
            // Setup mocked result
            mockManager.mock('getTuneSeasonServiceHymnFormatList', SqlDataProviderMock.getDbTuneSeasonServiceHymnFormatList());

            const formatList = await hymnsProvider.getTuneSeasonServiceHymnFormatList("12", "seasonId", "hymnId");
            Validators.validateArray(formatList);
            formatList.length.should.be.eql(3);
            formatList.forEach((format) => Validators.validateTuneServiceHymnFormat(format));
        });

        it("should get all formats for a tune for a season for a hymn with empty results", async () => {
            // Setup mocked result
            mockManager.mock('getTuneSeasonServiceHymnFormatList', []);

            const formatList = await hymnsProvider.getTuneSeasonServiceHymnFormatList("tuneId", "seasonId", "hymnId");
            Validators.validateArray(formatList, true);
        });
    });

    describe("A single format in a tune in a season in a hymn", () => {
        it("should get a single format for a tune in a season in a hymn", async () => {
            // Setup mocked result
            mockManager.mock('getTuneSeasonServiceHymnFormat', SqlDataProviderMock.getDbTuneSeasonServiceHymnFormat());

            const format = await hymnsProvider.getTuneSeasonServiceHymnFormat("12", "seasonId", "hymnId", "formatId");
            Validators.validateObject(format);
            Validators.validateTuneServiceHymnFormat(format);
        });

        it("should have correct db to contract service mapping", async () => {
            // Setup mocked result
            mockManager.mock('getTuneSeasonServiceHymnFormat', SqlDataProviderMock.getDbTuneSeasonServiceHymnFormat());

            const formatDb = SqlDataProviderMock.getDbTuneSeasonServiceHymnFormat();
            const format = await hymnsProvider.getTuneSeasonServiceHymnFormat("tuneId", "seasonId", "hymnId", "formatId");

            // Validate that the contract was mapped out correctly from db results
            format.name.should.be.equal(formatDb.Format_Name);
            format.variationCount.should.be.equal(formatDb.Content_Count);
        });
    });
});
