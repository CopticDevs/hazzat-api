import * as chai from "chai";
import { ImportMock, MockManager } from 'ts-mock-imports';
import { Language } from "../../Common/Types/Language";
import { ContentType, ITextContent } from '../../Models/IVariationInfo';
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

    describe("All service hymns", () => {
        it("should get all service hymns with results", async () => {
            // Setup mocked result
            mockManager.mock('getServiceHymnList', SqlDataProviderMock.getDbServiceHymnList());

            const hymnList = await hymnsProvider.getServiceHymnList("seasonId", "serviceId");
            Validators.validateArray(hymnList);
            hymnList.length.should.be.eql(3);
            hymnList.forEach((hymn) => Validators.validateServiceHymn(hymn));
        });

        it("should get seasons with empty results", async () => {
            // Setup mocked result
            mockManager.mock('getServiceHymnList', []);

            const hymnList = await hymnsProvider.getServiceHymnList("seasonId", "serviceId");
            Validators.validateArray(hymnList);
            hymnList.length.should.be.eql(0);
        });
    });

    describe("A single service hymn", () => {
        it("should get a single service hymn", async () => {
            // Setup mocked result
            mockManager.mock('getServiceHymn', SqlDataProviderMock.getDbServiceHymn());

            const hymn = await hymnsProvider.getServiceHymn("seasonId", "serviceId", "hymnId");
            Validators.validateObject(hymn);
            Validators.validateServiceHymn(hymn);
        });

        it("should have correct db to contract service mapping", async () => {
            // Setup mocked result
            mockManager.mock('getServiceHymn', SqlDataProviderMock.getDbServiceHymn());

            const hymnDb = SqlDataProviderMock.getDbServiceHymn();
            const hymn = await hymnsProvider.getServiceHymn("seasonId", "serviceId", "hymnId");

            // Validate that the contract was mapped out correctly from db results
            hymn.name.should.be.equal(hymnDb.Title);
            hymn.order.should.be.equal(hymnDb.Hymn_Order);
        });
    });

    describe("All formats", () => {
        it("should get all formats with results", async () => {
            // Setup mocked result
            mockManager.mock('getServiceHymnFormatList', SqlDataProviderMock.getDbServiceHymnFormatList());

            const formatList = await hymnsProvider.getServiceHymnFormatList("seasonId", "serviceId", "hymnId");
            Validators.validateArray(formatList);
            formatList.length.should.be.eql(3);
            formatList.forEach((format) => Validators.validateServiceHymnFormat(format));
        });

        it("should get format with empty results", async () => {
            // Setup mocked result
            mockManager.mock('getServiceHymnFormatList', []);

            const formatList = await hymnsProvider.getServiceHymnFormatList("seasonId", "serviceId", "hymnId");
            Validators.validateArray(formatList);
            formatList.length.should.be.eql(0);
        });
    });

    describe("A single format", () => {
        it("should get a single format", async () => {
            // Setup mocked result
            mockManager.mock('getServiceHymnFormat', SqlDataProviderMock.getDbServiceHymnFormat());

            const format = await hymnsProvider.getServiceHymnFormat("seasonId", "serviceId", "hymnId", "formatId");
            Validators.validateObject(format);
            Validators.validateServiceHymnFormat(format);
        });

        it("should have correct db to contract service mapping", async () => {
            // Setup mocked result
            mockManager.mock('getServiceHymnFormat', SqlDataProviderMock.getDbServiceHymnFormat());

            const formatDb = SqlDataProviderMock.getDbServiceHymnFormat();
            const format = await hymnsProvider.getServiceHymnFormat("seasonId", "serviceId", "hymnId", "formatId");

            // Validate that the contract was mapped out correctly from db results
            format.name.should.be.equal(formatDb.Format_Name);
            format.variationCount.should.be.equal(formatDb.Content_Count);
            format.order.should.be.equal(formatDb.Hymn_Order);
        });
    });

    describe("All variations", () => {
        it("should get all variations with results", async () => {
            // Setup mocked result
            mockManager.mock('getServiceHymnsFormatVariationList', SqlDataProviderMock.getDbServiceHymnsFormatVariationList());

            const variationList = await hymnsProvider.getServiceHymnsFormatVariationList("seasonId", "serviceId", "hymnId", "formatId");
            Validators.validateArray(variationList);
            variationList.length.should.be.eql(3);
            variationList.forEach((format) => Validators.validateServiceHymnFormatVariation(format));
        });

        it("should get variation with empty results", async () => {
            // Setup mocked result
            mockManager.mock('getServiceHymnsFormatVariationList', []);

            const variationList = await hymnsProvider.getServiceHymnsFormatVariationList("seasonId", "serviceId", "hymnId", "formatId");
            Validators.validateArray(variationList);
            variationList.length.should.be.eql(0);
        });
    });

    describe("A single variation (Text)", () => {
        it("should get a text with one paragraph", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_Arabic = "Some Arabic content";
            contentDb.Content_English = "Some English content";
            contentDb.Content_Coptic = "Some Coptic content";
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<ITextContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that the contract was mapped out correctly from db results
            variationContent.name.should.be.equal(contentDb.Content_Name);
            variationContent.content.contentType.should.be.equal(ContentType.TextContent);
            variationContent.content.paragraphs.length.should.be.equal(1);
            chai.assert(!variationContent.content.paragraphs[0].isComment);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(3);

            variationContent.content.paragraphs[0].columns.forEach((col) => {
                switch (col.language) {
                    case Language.Arabic:
                        col.content.should.be.equal(contentDb.Content_Arabic);
                        break;
                    case Language.Coptic:
                        col.content.should.be.equal(contentDb.Content_Coptic);
                        break;
                    case Language.English:
                        col.content.should.be.equal(contentDb.Content_English);
                        break;
                    default:
                        chai.assert(false, `Unexpected language encountered '${col.language}'`);
                }
            });

            // Other text test cases:
            // with comment
            // without comment
            // With only arabic paragraph
            // with only english paragraph
            // with only coptic paragraph
            // with english & arabic only multiple paragraphs
            // with coptic not having all paragraphs
            // With common
            // with multiple common
            // with nested common
            // with reason
            // with common containing reason
        });
    });
});
