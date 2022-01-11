import { ImportMock, MockManager } from 'ts-mock-imports';
import * as SqlDataProviderModule from '../../Providers/DataProviders/SqlDataProvider/SqlDataProvider';
import { HymnsServiceProvider } from "../../Providers/ServiceProviders/HymnsServiceProvider";
import { IHymnsServiceProvider } from "../../Providers/ServiceProviders/IHymnsServiceProvider";
import { SqlDataProviderMock } from "../Helpers/SqlDataProviderMock";
import { Validators } from "../Helpers/Validators";

process.env.NODE_ENV = "test";

describe("Types Service Provider Unit Tests", () => {
    let mockManager: MockManager<SqlDataProviderModule.SqlDataProvider>;
    let hymnsProvider: IHymnsServiceProvider;

    beforeEach("Mock out Types Data Provider", () => {
        // Setup Mocking for SqlDataProvider
        mockManager = ImportMock.mockClass(SqlDataProviderModule, 'SqlDataProvider');

        // Create the service
        hymnsProvider = new HymnsServiceProvider(mockManager.getMockInstance());
    });

    afterEach("Restore dependencies", () => {
        mockManager.restore();
    });

    describe("All types", () => {
        it("should get all types with results", async () => {
            // Setup mocked result
            mockManager.mock('getTypeList', SqlDataProviderMock.getDbTypesList());

            const typesList = await hymnsProvider.getTypeList();
            Validators.validateArray(typesList);
            typesList.length.should.be.eql(3);
            typesList.forEach((type) => Validators.validateHymnType(type));
        });

        it("should get types with empty results", async () => {
            // Setup mocked result
            mockManager.mock('getTypeList', []);

            const typesList = await hymnsProvider.getTypeList();
            Validators.validateArray(typesList, true);
        });
    });

    describe("A single type", () => {
        it("should get a single type", async () => {
            // Setup mocked result
            mockManager.mock('getType', SqlDataProviderMock.getDbType());

            const type = await hymnsProvider.getType("typeId");
            Validators.validateObject(type);
            Validators.validateHymnType(type);
        });

        it("should have correct db to contract hymn type mapping", async () => {
            // Setup mocked result
            mockManager.mock('getType', SqlDataProviderMock.getDbType());

            const typeDb = SqlDataProviderMock.getDbType();
            const type = await hymnsProvider.getType("typeId");

            // Validate that the contract was mapped out correctly from db results
            type.name.should.be.equal(typeDb.Name);
            type.nameSingular.should.be.equal(typeDb.Name_Short);
            type.hymnCount.should.be.equal(typeDb.ServiceHymnsCount);
            type.order.should.be.equal(typeDb.Type_Order);
        });
    });

    describe("All seasons in a type", () => {
        it("should get all seasons for a type with results", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonList', SqlDataProviderMock.getDbTypeSeasonList());

            const seasonList = await hymnsProvider.getTypeSeasonList("12");
            Validators.validateArray(seasonList);
            seasonList.length.should.be.eql(3);
            seasonList.forEach((season) => Validators.validateTypeSeason(season));
        });

        it("should get all seasons for a type with empty results", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonList', []);

            const seasonList = await hymnsProvider.getTypeSeasonList("typeId");
            Validators.validateArray(seasonList, true);
        });
    });

    describe("A single season in a type", () => {
        it("should get a single season for a type", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeason', SqlDataProviderMock.getDbTypeSeason());

            const season = await hymnsProvider.getTypeSeason("12", "seasonId");
            Validators.validateObject(season);
            Validators.validateTypeSeason(season);
        });

        it("should have correct db to contract service mapping", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeason', SqlDataProviderMock.getDbTypeSeason());

            const seasonDb = SqlDataProviderMock.getDbTypeSeason();
            const season = await hymnsProvider.getTypeSeason("typeId", "seasonId");

            // Validate that the contract was mapped out correctly from db results
            season.name.should.be.equal(seasonDb.Name);
            season.verse.should.be.equal(seasonDb.Verse);
        });
    });

    describe("All hymns in a type season", () => {
        it("should get all hymns for a type for a season with results", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonServiceHymnList', SqlDataProviderMock.getDbTypeSeasonServiceHymnList());

            const serviceHymnList = await hymnsProvider.getTypeSeasonServiceHymnList("12", "seasonId");
            Validators.validateArray(serviceHymnList);
            serviceHymnList.length.should.be.eql(3);
            serviceHymnList.forEach((serviceHymn) => Validators.validateTypeServiceHymnWithServiceDetails(serviceHymn));
        });

        it("should get all hymns for a type for a season with empty results", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonServiceHymnList', []);

            const seasonList = await hymnsProvider.getTypeSeasonServiceHymnList("typeId", "seasonId");
            Validators.validateArray(seasonList, true);
        });
    });

    describe("A single hymn in a type in a season", () => {
        it("should get a single hymn for a type in a season", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonServiceHymn', SqlDataProviderMock.getDbTypeSeasonServiceHymn());

            const serviceHymn = await hymnsProvider.getTypeSeasonServiceHymn("12", "seasonId", "hymnId");
            Validators.validateObject(serviceHymn);
            Validators.validateTypeServiceHymnWithServiceDetails(serviceHymn);
        });

        it("should have correct db to contract service mapping", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonServiceHymn', SqlDataProviderMock.getDbTypeSeasonServiceHymn());

            const serviceHymnDb = SqlDataProviderMock.getDbTypeSeasonServiceHymn();
            const serviceHymn = await hymnsProvider.getTypeSeasonServiceHymn("typeId", "seasonId", "hymnId");

            // Validate that the contract was mapped out correctly from db results
            serviceHymn.name.should.be.equal(serviceHymnDb.Title);
            serviceHymn.serviceId.should.be.equal(serviceHymnDb.Service_ID);
            serviceHymn.serviceName.should.be.equal(serviceHymnDb.Service_Name);
            serviceHymn.order.should.be.equal(serviceHymnDb.Hymn_Order);
        });
    });
});
