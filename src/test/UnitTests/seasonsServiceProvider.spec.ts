import * as chai from "chai";
import { ImportMock, MockManager } from 'ts-mock-imports';
import { Language } from "../../Common/Types/Language";
import { ContentType, IHazzatContent, ITextContent, IVerticalHazzatContent } from '../../Models/IVariationInfo';
import * as SqlDataProviderModule from '../../Providers/DataProviders/SqlDataProvider/SqlDataProvider';
import { HymnsServiceProvider } from "../../Providers/ServiceProviders/HymnsServiceProvider";
import { IHymnsServiceProvider } from "../../Providers/ServiceProviders/IHymnsServiceProvider";
import { SqlDataProviderMock } from "../Helpers/SqlDataProviderMock";
import { Validators } from "../Helpers/Validators";
import { Constants as SqlConstants } from "../../Providers/DataProviders/SqlDataProvider/SqlConstants";

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
            chai.assert(season.isDateSpecific);
        });

        it("should get a non-date-specific season", async () => {
            // Setup mocked result
            mockManager.mock('getSeason', SqlDataProviderMock.getDbSeason(false));

            const season = await hymnsProvider.getSeason("seasonId");
            Validators.validateObject(season);
            Validators.validateSeason(season);
            chai.assert(!season.isDateSpecific);
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
        });

        it("should get a text with a comment", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_English = "<comment=Some Comment Text>Some English content";
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<ITextContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate comment
            variationContent.content.paragraphs.length.should.be.equal(2);
            chai.assert(variationContent.content.paragraphs[0].isComment);
        });

        it("should get a text without a comment", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_English = "Some English content";
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<ITextContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate comment
            variationContent.content.paragraphs.length.should.be.equal(1);
            chai.assert(!variationContent.content.paragraphs[0].isComment);
        });

        it("should get a text with only Arabic paragraph", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_Arabic = "Some Arabic content";
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<ITextContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that there's only one paragraph
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(contentDb.Content_Arabic);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(Language.Arabic);
        });

        it("should get a text with only Coptic paragraph", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_Coptic = "Some Coptic content";
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<ITextContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that there's only one paragraph
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(contentDb.Content_Coptic);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(Language.Coptic);
        });

        it("should get a text with only English paragraph", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_English = "Some English content";
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<ITextContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that there's only one paragraph
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(contentDb.Content_English);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(Language.English);
        });

        it("should get a text with only English & Arabic only, multiple paragraphs", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 1; // Text
            const englishParagraphs = [
                "English paragraph one.",
                "English paragraph two.",
                "English paragraph three.",
            ];
            const arabicParagraphs = [
                "Arabic paragraph one.",
                "Arabic paragraph two.",
                "Arabic paragraph three.",
            ];
            contentDb.Content_English = englishParagraphs.join(SqlConstants.Tokens.ParagraphSeparator);
            contentDb.Content_Arabic = arabicParagraphs.join(SqlConstants.Tokens.ParagraphSeparator);
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<ITextContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate paragraphs
            variationContent.content.paragraphs.length.should.be.equal(3);

            for (let i = 0; i < variationContent.content.paragraphs.length; i++) {
                const paragraph = variationContent.content.paragraphs[i];

                paragraph.columns.length.should.be.equal(2);

                paragraph.columns.forEach((col) => {
                    switch (col.language) {
                        case Language.Arabic:
                            col.content.should.be.equal(arabicParagraphs[i]);
                            break;
                        case Language.English:
                            col.content.should.be.equal(englishParagraphs[i]);
                            break;
                        default:
                            chai.assert(false, `Unexpected language encountered '${col.language}'`);
                    }
                });
            }
        });

        it("should get a text with only Coptic not having all paragraphs", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 1; // Text
            const englishParagraphs = [
                "English paragraph one.",
                "English paragraph two.",
                "English paragraph three.",
            ];
            const arabicParagraphs = [
                "Arabic paragraph one.",
                "Arabic paragraph two.",
                "Arabic paragraph three.",
            ];
            const copticParagraphs = [
                "Coptic paragraph one.",
                "",
                "Coptic paragraph three.",
            ];
            contentDb.Content_English = englishParagraphs.join(SqlConstants.Tokens.ParagraphSeparator);
            contentDb.Content_Arabic = arabicParagraphs.join(SqlConstants.Tokens.ParagraphSeparator);
            contentDb.Content_Coptic = copticParagraphs.join(SqlConstants.Tokens.ParagraphSeparator);
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<ITextContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate paragraphs
            variationContent.content.paragraphs.length.should.be.equal(3);

            // First paragraph should have all 3 cols
            let pIdx = 0;
            let paragraph = variationContent.content.paragraphs[pIdx];
            paragraph.columns.length.should.be.equal(3);

            paragraph.columns.forEach((col) => {
                switch (col.language) {
                    case Language.Arabic:
                        col.content.should.be.equal(arabicParagraphs[pIdx]);
                        break;
                    case Language.Coptic:
                        col.content.should.be.equal(copticParagraphs[pIdx]);
                        break;
                    case Language.English:
                        col.content.should.be.equal(englishParagraphs[pIdx]);
                        break;
                    default:
                        chai.assert(false, `Unexpected language encountered '${col.language}'`);
                }
            });

            // Second paragraph should not have Coptic
            pIdx = 1;
            paragraph = variationContent.content.paragraphs[pIdx];
            paragraph.columns.length.should.be.equal(2);

            paragraph.columns.forEach((col) => {
                switch (col.language) {
                    case Language.Arabic:
                        col.content.should.be.equal(arabicParagraphs[pIdx]);
                        break;
                    case Language.English:
                        col.content.should.be.equal(englishParagraphs[pIdx]);
                        break;
                    default:
                        chai.assert(false, `Unexpected language encountered '${col.language}'`);
                }
            });

            // Third paragraph should have all 3 cols again
            pIdx = 2;
            paragraph = variationContent.content.paragraphs[pIdx];
            paragraph.columns.length.should.be.equal(3);

            paragraph.columns.forEach((col) => {
                switch (col.language) {
                    case Language.Arabic:
                        col.content.should.be.equal(arabicParagraphs[pIdx]);
                        break;
                    case Language.Coptic:
                        col.content.should.be.equal(copticParagraphs[pIdx]);
                        break;
                    case Language.English:
                        col.content.should.be.equal(englishParagraphs[pIdx]);
                        break;
                    default:
                        chai.assert(false, `Unexpected language encountered '${col.language}'`);
                }
            });
        });

        it("should get a text with common English content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_English = "Some English content. <common=123>";
            const commonContent = "Common content.";
            const expectedContent = "Some English content. Common content.";
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<ITextContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that common content has been replaced
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(expectedContent);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(Language.English);
        });

        it("should get a text with common Coptic content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_Coptic = "Some Coptic content. <common=123>";
            const commonContent = "Common content.";
            const expectedContent = "Some Coptic content. Common content.";
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<ITextContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that common content has been replaced
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(expectedContent);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(Language.Coptic);
        });

        it("should get a text with common Arabic content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_Arabic = "Some Arabic content. <common=123>";
            const commonContent = "Common content.";
            const expectedContent = "Some Arabic content. Common content.";
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<ITextContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that common content has been replaced
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(expectedContent);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(Language.Arabic);
        });

        it("should get a text with multiple common English content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_English = "Some English content. <common=123><common=456>";
            const commonContent = "Common content.";
            const expectedContent = "Some English content. Common content.Common content.";
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<ITextContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that all common content has been replaced
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(expectedContent);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(Language.English);
        });

        it("should get a text with nested common English content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_English = "Some English content. <common=123>";
            const parentCommonContent = "Common content. <common=456>";
            const nestedCommonContent = "Nested common content.";
            const expectedContent = "Some English content. Common content. Nested common content.";

            const mockedGetCommonContent = (commonIdStr: string): string => {
                // TODO: No idea why commonIdStr is not just 123
                console.log(`common id is '${commonIdStr}'`);
                if (commonIdStr === "<common=123>") {
                    return parentCommonContent;
                }
                return nestedCommonContent;
            };
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);
            mockManager.mock('getCommonContent', (commonId) => mockedGetCommonContent(commonId));

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<ITextContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that all common content has been replaced
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(expectedContent);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(Language.English);
        });

        it("should get a text with English long reason content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            const reasonDb = SqlDataProviderMock.getDbReason();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_English = "Some English content with <reason_long>.";
            const expectedContent = `Some English content with ${reasonDb.Long_English}.`;
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);
            mockManager.mock('getReason', reasonDb);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<ITextContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that reason content has been replaced
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(expectedContent);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(Language.English);
        });

        it("should get a text with English short reason content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            const reasonDb = SqlDataProviderMock.getDbReason();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_English = "Some English content with <reason_short>.";
            const expectedContent = `Some English content with ${reasonDb.Short_English}.`;
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);
            mockManager.mock('getReason', reasonDb);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<ITextContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that reason content has been replaced
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(expectedContent);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(Language.English);
        });

        it("should get a text with Coptic long reason content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            const reasonDb = SqlDataProviderMock.getDbReason();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_Coptic = "Some Coptic content with <reason_long>.";
            const expectedContent = `Some Coptic content with ${reasonDb.Long_Coptic}.`;
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);
            mockManager.mock('getReason', reasonDb);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<ITextContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that reason content has been replaced
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(expectedContent);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(Language.Coptic);
        });

        it("should get a text with Coptic short reason content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            const reasonDb = SqlDataProviderMock.getDbReason();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_Coptic = "Some Coptic content with <reason_short>.";
            const expectedContent = `Some Coptic content with ${reasonDb.Short_Coptic}.`;
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);
            mockManager.mock('getReason', reasonDb);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<ITextContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that reason content has been replaced
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(expectedContent);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(Language.Coptic);
        });

        it("should get a text with Arabic long reason content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            const reasonDb = SqlDataProviderMock.getDbReason();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_Arabic = "Some Arabic content with <reason_long>.";
            const expectedContent = `Some Arabic content with ${reasonDb.Long_Arabic}.`;
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);
            mockManager.mock('getReason', reasonDb);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<ITextContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that reason content has been replaced
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(expectedContent);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(Language.Arabic);
        });

        it("should get a text with Arabic short reason content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            const reasonDb = SqlDataProviderMock.getDbReason();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_Arabic = "Some Arabic content with <reason_short>.";
            const expectedContent = `Some Arabic content with ${reasonDb.Short_Arabic}.`;
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);
            mockManager.mock('getReason', reasonDb);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<ITextContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that reason content has been replaced
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(expectedContent);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(Language.Arabic);
        });

        it("should get a text with common English content containing a reason", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            const reasonDb = SqlDataProviderMock.getDbReason();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_English = "Some English content. <common=123>";
            const commonContent = "Common content with <reason_long>.";
            const expectedContent = `Some English content. Common content with ${reasonDb.Long_English}.`;
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);
            mockManager.mock('getReason', reasonDb);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<ITextContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that common and reason content have been replaced
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(expectedContent);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(Language.English);
        });
    });

    describe("A single variation (Hazzat)", () => {
        it("should get a hazzat with one paragraph", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 2; // Hazzat
            contentDb.Content_Arabic = "Some Arabic content";
            contentDb.Content_English = "Some English content";
            contentDb.Content_Coptic = "Some Coptic content";
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<IHazzatContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateHazzatContent(variationContent.content);

            // Validate that the contract was mapped out correctly from db results
            variationContent.name.should.be.equal(contentDb.Content_Name);
            variationContent.content.arabicHazzat.should.be.equal(contentDb.Content_Arabic);
            variationContent.content.copticHazzat.should.be.equal(contentDb.Content_Coptic);
            variationContent.content.englishHazzat.should.be.equal(contentDb.Content_English);
        });

        it("should get a hazzat with only Arabic content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 2; // Hazzat
            contentDb.Content_Arabic = "Some Arabic content";
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<IHazzatContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateHazzatContent(variationContent.content);

            // Validate that there's only Arabic
            variationContent.content.arabicHazzat.should.be.equal(contentDb.Content_Arabic);
            chai.assert(variationContent.content.copticHazzat === null);
            chai.assert(variationContent.content.englishHazzat === null);
        });

        it("should get a hazzat with only Coptic content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 2; // Hazzat
            contentDb.Content_Coptic = "Some Coptic content";
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<IHazzatContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateHazzatContent(variationContent.content);

            // Validate that there's only Coptic
            chai.assert(variationContent.content.arabicHazzat === null);
            variationContent.content.copticHazzat.should.be.equal(contentDb.Content_Coptic);
            chai.assert(variationContent.content.englishHazzat === null);
        });

        it("should get a hazzat with only English content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 2; // Hazzat
            contentDb.Content_English = "Some English content";
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<IHazzatContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateHazzatContent(variationContent.content);

            // Validate that there's only English
            chai.assert(variationContent.content.arabicHazzat === null);
            chai.assert(variationContent.content.copticHazzat === null);
            variationContent.content.englishHazzat.should.be.equal(contentDb.Content_English);
        });

        it("should get a hazzat with common Coptic content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 2; // Hazzat
            contentDb.Content_Coptic = "Some Coptic content. <common=123>";
            const commonContent = "Common content.";
            const expectedContent = "Some Coptic content. Common content.";
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<IHazzatContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateHazzatContent(variationContent.content);

            // Validate that common content has been replaced
            variationContent.content.copticHazzat.should.be.equal(expectedContent);
        });

        it("should get a hazzat with common Arabic content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 2; // Hazzat
            contentDb.Content_Arabic = "Some Arabic content. <common=123>";
            const commonContent = "Common content.";
            const expectedContent = "Some Arabic content. Common content.";
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<IHazzatContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateHazzatContent(variationContent.content);

            // Validate that common content has been replaced
            variationContent.content.arabicHazzat.should.be.equal(expectedContent);
        });

        it("should get a hazzat with multiple common English content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 2; // Hazzat
            contentDb.Content_English = "Some English content. <common=123><common=456>";
            const commonContent = "Common content.";
            const expectedContent = "Some English content. Common content.Common content.";
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<IHazzatContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateHazzatContent(variationContent.content);

            // Validate that all common content has been replaced
            variationContent.content.englishHazzat.should.be.equal(expectedContent);
        });

        it("should get a hazzat with nested common English content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 2; // Hazzat
            contentDb.Content_English = "Some English content. <common=123>";
            const parentCommonContent = "Common content. <common=456>";
            const nestedCommonContent = "Nested common content.";
            const expectedContent = "Some English content. Common content. Nested common content.";

            const mockedGetCommonContent = (commonIdStr: string): string => {
                // TODO: No idea why commonIdStr is not just 123
                console.log(`common id is '${commonIdStr}'`);
                if (commonIdStr === "<common=123>") {
                    return parentCommonContent;
                }
                return nestedCommonContent;
            };
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);
            mockManager.mock('getCommonContent', (commonId) => mockedGetCommonContent(commonId));

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<IHazzatContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateHazzatContent(variationContent.content);

            // Validate that all common content has been replaced
            variationContent.content.englishHazzat.should.be.equal(expectedContent);
        });
    });

    describe("A single variation (Vertical Hazzat)", () => {
        it("should get a vertical hazzat with one paragraph", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 3; // Vertical Hazzat
            contentDb.Content_Arabic = "Some Arabic content";
            contentDb.Content_English = "Some English content";
            contentDb.Content_Coptic = "Some Coptic content";
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<IVerticalHazzatContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateVerticalHazzatContent(variationContent.content);

            // Validate that the contract was mapped out correctly from db results
            variationContent.name.should.be.equal(contentDb.Content_Name);
            variationContent.content.arabicVerticalHazzat.should.be.equal(contentDb.Content_Arabic);
            variationContent.content.copticVerticalHazzat.should.be.equal(contentDb.Content_Coptic);
            variationContent.content.englishVerticalHazzat.should.be.equal(contentDb.Content_English);
        });

        it("should get a vertical hazzat with only Arabic content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 3; // Vertical Hazzat
            contentDb.Content_Arabic = "Some Arabic content";
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<IVerticalHazzatContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateVerticalHazzatContent(variationContent.content);

            // Validate that there's only Arabic
            variationContent.content.arabicVerticalHazzat.should.be.equal(contentDb.Content_Arabic);
            chai.assert(variationContent.content.copticVerticalHazzat === null);
            chai.assert(variationContent.content.englishVerticalHazzat === null);
        });

        it("should get a vertical hazzat with only Coptic content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 3; // Vertical Hazzat
            contentDb.Content_Coptic = "Some Coptic content";
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<IVerticalHazzatContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateVerticalHazzatContent(variationContent.content);

            // Validate that there's only Coptic
            chai.assert(variationContent.content.arabicVerticalHazzat === null);
            variationContent.content.copticVerticalHazzat.should.be.equal(contentDb.Content_Coptic);
            chai.assert(variationContent.content.englishVerticalHazzat === null);
        });

        it("should get a vertical hazzat with only English content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 3; // Vertical Hazzat
            contentDb.Content_English = "Some English content";
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<IVerticalHazzatContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateVerticalHazzatContent(variationContent.content);

            // Validate that there's only English
            chai.assert(variationContent.content.arabicVerticalHazzat === null);
            chai.assert(variationContent.content.copticVerticalHazzat === null);
            variationContent.content.englishVerticalHazzat.should.be.equal(contentDb.Content_English);
        });

        it("should get a vertical hazzat with common Coptic content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 3; // Vertical Hazzat
            contentDb.Content_Coptic = "Some Coptic content. <common=123>";
            const commonContent = "Common content.";
            const expectedContent = "Some Coptic content. Common content.";
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<IVerticalHazzatContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateVerticalHazzatContent(variationContent.content);

            // Validate that common content has been replaced
            variationContent.content.copticVerticalHazzat.should.be.equal(expectedContent);
        });

        it("should get a vertical hazzat with common Arabic content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 3; // Vertical Hazzat
            contentDb.Content_Arabic = "Some Arabic content. <common=123>";
            const commonContent = "Common content.";
            const expectedContent = "Some Arabic content. Common content.";
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<IVerticalHazzatContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateVerticalHazzatContent(variationContent.content);

            // Validate that common content has been replaced
            variationContent.content.arabicVerticalHazzat.should.be.equal(expectedContent);
        });

        it("should get a vertical hazzat with multiple common English content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 3; // Vertical Hazzat
            contentDb.Content_English = "Some English content. <common=123><common=456>";
            const commonContent = "Common content.";
            const expectedContent = "Some English content. Common content.Common content.";
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<IVerticalHazzatContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateVerticalHazzatContent(variationContent.content);

            // Validate that all common content has been replaced
            variationContent.content.englishVerticalHazzat.should.be.equal(expectedContent);
        });

        it("should get a vertical hazzat with nested common English content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 3; // Vertical Hazzat
            contentDb.Content_English = "Some English content. <common=123>";
            const parentCommonContent = "Common content. <common=456>";
            const nestedCommonContent = "Nested common content.";
            const expectedContent = "Some English content. Common content. Nested common content.";

            const mockedGetCommonContent = (commonIdStr: string): string => {
                // TODO: No idea why commonIdStr is not just 123
                console.log(`common id is '${commonIdStr}'`);
                if (commonIdStr === "<common=123>") {
                    return parentCommonContent;
                }
                return nestedCommonContent;
            };
            mockManager.mock('getServiceHymnsFormatVariation', contentDb);
            mockManager.mock('getCommonContent', (commonId) => mockedGetCommonContent(commonId));

            const variationContent = await hymnsProvider.getServiceHymnsFormatVariation<IVerticalHazzatContent>("seasonId", "serviceId", "hymnId", "formatId", "contentId");
            Validators.validateObject(variationContent);
            Validators.validateServiceHymnFormatVariation(variationContent);
            Validators.validateVerticalHazzatContent(variationContent.content);

            // Validate that all common content has been replaced
            variationContent.content.englishVerticalHazzat.should.be.equal(expectedContent);
        });
    });
});
