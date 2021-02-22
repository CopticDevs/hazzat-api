import { ImportMock, MockManager } from 'ts-mock-imports';
import * as SqlDataProviderModule from '../../Providers/DataProviders/SqlDataProvider/SqlDataProvider';
import { HymnsServiceProvider } from "../../Providers/ServiceProviders/HymnsServiceProvider";
import { IHymnsServiceProvider } from "../../Providers/ServiceProviders/IHymnsServiceProvider";
import { SqlDataProviderMock } from "../Helpers/SqlDataProviderMock";
import { Validators } from "../Helpers/Validators";

process.env.NODE_ENV = "test";

describe("Seasons Service Provider Unit Tests", () => {
    let mockManager: MockManager<SqlDataProviderModule.SqlDataProvider>;
    let hymnsProvider: IHymnsServiceProvider;

    beforeEach("Mock out Seasons Data Provider", () => {
        // Setup Mocking for SqlDataProvider
        mockManager = ImportMock.mockClass(SqlDataProviderModule, 'SqlDataProvider');

        // Create the service
        hymnsProvider = new HymnsServiceProvider(mockManager.getMockInstance());
    });

    afterEach("Restore dependencies", () => {
        mockManager.restore();
    });

    describe("All Seasons", () => {
        it("should get all seasons with results", async () => {
            // Setup mocked result
            mockManager.mock('getSeasonList', SqlDataProviderMock.getDbSeasonsList());

            const seasonsList = await hymnsProvider.getSeasonList();
            Validators.validateArray(seasonsList);
            seasonsList.length.should.be.eql(3);
            seasonsList.forEach((season) => Validators.validateSeason(season));
        });

        it("should get seasons with empty results", async () => {
            // Setup mocked result
            mockManager.mock('getSeasonList', []);

            const seasonsList = await hymnsProvider.getSeasonList();
            Validators.validateArray(seasonsList);
            seasonsList.length.should.be.eql(0);
        });
    });

    describe("A single season", () => {
        it("should get a single season", async () => {
            // Setup mocked result
            mockManager.mock('getSeason', SqlDataProviderMock.getDbSeason());

            const season = await hymnsProvider.getSeason("seasonId");
            Validators.validateObject(season);
            Validators.validateSeason(season);
        });

        it("should get a date-specific season", async () => {
            // Setup mocked result
            mockManager.mock('getSeason', SqlDataProviderMock.getDbSeason(true));

            const season = await hymnsProvider.getSeason("seasonId");
            Validators.validateObject(season);
            Validators.validateSeason(season);
            season.isDateSpecific.should.be.true;
        });

        it("should get a non-date-specific season", async () => {
            // Setup mocked result
            mockManager.mock('getSeason', SqlDataProviderMock.getDbSeason(false));

            const season = await hymnsProvider.getSeason("seasonId");
            Validators.validateObject(season);
            Validators.validateSeason(season);
            season.isDateSpecific.should.be.false;
        });
    });

    describe("All Season Services", () => {
        it("should get all seasons services with results", async () => {
            // Setup mocked result
            mockManager.mock('getSeasonServiceList', SqlDataProviderMock.getDbSeasonServiceList());

            const serviceList = await hymnsProvider.getSeasonServiceList("seasonId");
            Validators.validateArray(serviceList);
            serviceList.length.should.be.eql(3);
            serviceList.forEach((service) => Validators.validateService(service));
        });

        it("should get services with empty results", async () => {
            // Setup mocked result
            mockManager.mock('getSeasonServiceList', []);

            const serviceList = await hymnsProvider.getSeasonServiceList("seasonId");
            Validators.validateArray(serviceList);
            serviceList.length.should.be.eql(0);
        });
    });

    describe("A single service", () => {
        it("should get a single service", async () => {
            // Setup mocked result
            mockManager.mock('getSeasonService', SqlDataProviderMock.getDbSeasonService());

            const service = await hymnsProvider.getSeasonService("seasonId", "serviceId");
            Validators.validateObject(service);
            Validators.validateService(service);
        });

        it("should have correct db to contract service mapping", async () => {
            // Setup mocked result
            mockManager.mock('getSeasonService', SqlDataProviderMock.getDbSeasonService());

            const serviceDb = SqlDataProviderMock.getDbSeasonService();
            const service = await hymnsProvider.getSeasonService("seasonId", "serviceId");

            // Validate that the contract was mapped out correctly from db results
            service.name.should.be.equal(serviceDb.Service_Name);
            service.order.should.be.equal(serviceDb.Service_Order);
        });
    });
});
