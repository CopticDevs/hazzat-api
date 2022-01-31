import * as chai from "chai";
import { ImportMock, MockManager } from 'ts-mock-imports';
import { Language } from '../../Common/Types/Language';
import { IAudioContent, IHazzatContent, IInformationContent, IMusicalNotesContent, ITextContent, IVerticalHazzatContent, IVideoContent } from '../../Models/IVariationInfo';
import { Constants as SqlConstants } from "../../Providers/DataProviders/SqlDataProvider/SqlConstants";
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

    describe("All variations in a tune season hymn format", () => {
        it("should get all variations for a tune for a season for a hymn for a format with results", async () => {
            // Setup mocked result
            mockManager.mock('getTuneSeasonServiceHymnFormatVariationList', SqlDataProviderMock.getDbTuneServiceHymnsFormatVariationList());

            const variationList = await hymnsProvider.getTuneSeasonServiceHymnFormatVariationList("12", "seasonId", "hymnId", "variationId");
            Validators.validateArray(variationList);
            variationList.length.should.be.eql(3);
            variationList.forEach((variation) => Validators.validateTuneServiceHymnFormatVariation(variation));
        });

        it("should get all formats for a tune for a season for a hymn with empty results", async () => {
            // Setup mocked result
            mockManager.mock('getTuneSeasonServiceHymnFormatVariationList', []);

            const variationList = await hymnsProvider.getTuneSeasonServiceHymnFormatVariationList("tuneId", "seasonId", "hymnId", "variationId");
            Validators.validateArray(variationList, true);
        });
    });

    describe("A single variation in a tune in a season in a hymn in a format", () => {
        it("should get a single variation for a tune in a season in a hymn in a format", async () => {
            // Setup mocked result
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase());

            const variation = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variation);
            Validators.validateTuneServiceHymnFormatVariation(variation);
        });

        it("should have correct db to contract service mapping", async () => {
            // Setup mocked result
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase());

            const variationDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            const variation = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation("tuneId", "seasonId", "hymnId", "formatId", "variationId");

            // Validate that the contract was mapped out correctly from db results
            variation.name.should.be.equal(variationDb.Content_Name);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', (commonId) => mockedGetCommonContent(commonId));

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getReason', reasonDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getReason', reasonDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getReason', reasonDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getReason', reasonDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getReason', reasonDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getReason', reasonDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);
            mockManager.mock('getReason', reasonDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<IHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<IHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<IHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<IHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<IHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<IHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<IHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', (commonId) => mockedGetCommonContent(commonId));

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<IHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<IVerticalHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<IVerticalHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<IVerticalHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<IVerticalHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<IVerticalHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<IVerticalHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<IVerticalHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', (commonId) => mockedGetCommonContent(commonId));

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<IVerticalHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
            Validators.validateVerticalHazzatContent(variationContent.content);

            // Validate that all common content has been replaced
            variationContent.content.englishVerticalHazzat.should.be.equal(expectedContent);
        });
    });

    describe("A single variation (Musical Notes)", () => {
        it("should get a Musical Notes", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 4; // Musical Notes
            contentDb.Music_Path = "Some Music Path";
            contentDb.Audio_Path = "Some Audio Path";
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<IMusicalNotesContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
            Validators.validateMusicalNotesContent(variationContent.content);

            // Validate that the contract was mapped out correctly from db results
            variationContent.name.should.be.equal(contentDb.Content_Name);
            variationContent.content.musicFilePath.should.be.equal(contentDb.Music_Path);
            variationContent.content.audioFilePath.should.be.equal(contentDb.Audio_Path);
        });
    });

    describe("A single variation (Autio)", () => {
        it("should get an Audio content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 5; // Audio
            contentDb.Audio_Path = "Some Audio Path";
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<IAudioContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
            Validators.validateAudioContent(variationContent.content);

            // Validate that the contract was mapped out correctly from db results
            variationContent.name.should.be.equal(contentDb.Content_Name);
            variationContent.content.audioFilePath.should.be.equal(contentDb.Audio_Path);
        });
    });

    describe("A single variation (Video)", () => {
        it("should get a video with", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 6; // Video
            contentDb.Content_Arabic = "Some Arabic content";
            contentDb.Content_English = "Some English content";
            contentDb.Content_Coptic = "Some Coptic content";
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<IVideoContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
            Validators.validateVideoContent(variationContent.content);

            // Validate that the contract was mapped out correctly from db results
            variationContent.name.should.be.equal(contentDb.Content_Name);
            variationContent.content.arabicVideo.should.be.equal(contentDb.Content_Arabic);
            variationContent.content.copticVideo.should.be.equal(contentDb.Content_Coptic);
            variationContent.content.englishVideo.should.be.equal(contentDb.Content_English);
        });

        it("should get a video with only Arabic content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 6; // Video
            contentDb.Content_Arabic = "Some Arabic content";
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<IVideoContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
            Validators.validateVideoContent(variationContent.content);

            // Validate that there's only Arabic
            variationContent.content.arabicVideo.should.be.equal(contentDb.Content_Arabic);
            chai.assert(variationContent.content.copticVideo === null);
            chai.assert(variationContent.content.englishVideo === null);
        });

        it("should get a video with only Coptic content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 6; // Video
            contentDb.Content_Coptic = "Some Coptic content";
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<IVideoContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
            Validators.validateVideoContent(variationContent.content);

            // Validate that there's only Coptic
            chai.assert(variationContent.content.arabicVideo === null);
            variationContent.content.copticVideo.should.be.equal(contentDb.Content_Coptic);
            chai.assert(variationContent.content.englishVideo === null);
        });

        it("should get a video with only English content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 6; // Video
            contentDb.Content_English = "Some English content";
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<IVideoContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
            Validators.validateVideoContent(variationContent.content);

            // Validate that there's only English
            chai.assert(variationContent.content.copticVideo === null);
            chai.assert(variationContent.content.arabicVideo === null);
            variationContent.content.englishVideo.should.be.equal(contentDb.Content_English);
        });
    });

    describe("A single variation (Information)", () => {
        it("should get an Information with", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 7; // Information
            contentDb.Content_Arabic = "Some Arabic content";
            contentDb.Content_English = "Some English content";
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<IInformationContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
            Validators.validateInformationContent(variationContent.content);

            // Validate that the contract was mapped out correctly from db results
            variationContent.name.should.be.equal(contentDb.Content_Name);
            variationContent.content.arabicInformation.should.be.equal(contentDb.Content_Arabic);
            variationContent.content.englishInformation.should.be.equal(contentDb.Content_English);
        });

        it("should get an Information with only Arabic content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 7; // Information
            contentDb.Content_Arabic = "Some Arabic content";
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<IInformationContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
            Validators.validateInformationContent(variationContent.content);

            // Validate that there's only Arabic
            variationContent.content.arabicInformation.should.be.equal(contentDb.Content_Arabic);
            chai.assert(variationContent.content.englishInformation === null);
        });

        it("should get an Information with only English content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 7; // Information
            contentDb.Content_English = "Some English content";
            mockManager.mock('getTuneSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTuneSeasonServiceHymnFormatVariation<IInformationContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTuneServiceHymnFormatVariation(variationContent);
            Validators.validateInformationContent(variationContent.content);

            // Validate that there's only English
            chai.assert(variationContent.content.arabicInformation === null);
            variationContent.content.englishInformation.should.be.equal(contentDb.Content_English);
        });
    });
});
