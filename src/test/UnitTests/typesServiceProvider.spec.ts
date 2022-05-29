import * as chai from "chai";
import { assert } from "chai";
import { ImportMock, MockManager } from 'ts-mock-imports';
import { ContentLanguage } from '../../Common/Types/ContentLanguage';
import { ServiceLanguage } from "../../Common/Types/ServiceLanguage";
import { IAudioContent, IHazzatContent, IInformationContent, IMusicalNotesContent, ITextContent, IVerticalHazzatContent, IVideoContent } from '../../Models/IVariationInfo';
import { Constants as SqlConstants } from "../../Providers/DataProviders/SqlDataProvider/SqlConstants";
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

            const typesList = await hymnsProvider.getTypeList(ServiceLanguage.English);
            Validators.validateArray(typesList);
            typesList.length.should.be.eql(3);
            typesList.forEach((type) => Validators.validateHymnType(type));
        });

        it("should get types with empty results", async () => {
            // Setup mocked result
            mockManager.mock('getTypeList', []);

            const typesList = await hymnsProvider.getTypeList(ServiceLanguage.English);
            Validators.validateArray(typesList, true);
        });

        it("should get all types with English results", async () => {
            // Setup mocked result
            mockManager.mock('getTypeList', SqlDataProviderMock.getDbTypesList());

            const typesList = await hymnsProvider.getTypeList(ServiceLanguage.English);
            Validators.validateArray(typesList);
            typesList.length.should.be.eql(3);
            typesList.forEach((type) => Validators.validateHymnType(type));
            assert.equal(typesList[0].name, SqlDataProviderMock.getDbTypesList()[0].Name);
            assert.equal(typesList[0].nameSingular, SqlDataProviderMock.getDbTypesList()[0].Name_Short);
        });

        it("should get all types with Arabic results", async () => {
            // Setup mocked result
            mockManager.mock('getTypeList', SqlDataProviderMock.getDbTypesList());

            const typesList = await hymnsProvider.getTypeList(ServiceLanguage.Arabic);
            Validators.validateArray(typesList);
            typesList.length.should.be.eql(3);
            typesList.forEach((type) => Validators.validateHymnType(type));
            assert.equal(typesList[0].name, SqlDataProviderMock.getDbTypesList()[0].Name_Arabic);
            assert.equal(typesList[0].nameSingular, SqlDataProviderMock.getDbTypesList()[0].Name_Short_Arabic);
        });
    });

    describe("A single type", () => {
        it("should get a single type", async () => {
            // Setup mocked result
            mockManager.mock('getType', SqlDataProviderMock.getDbType());

            const type = await hymnsProvider.getType(ServiceLanguage.English, "typeId");
            Validators.validateObject(type);
            Validators.validateHymnType(type);
        });

        it("should have correct db to contract hymn type mapping", async () => {
            // Setup mocked result
            mockManager.mock('getType', SqlDataProviderMock.getDbType());

            const typeDb = SqlDataProviderMock.getDbType();
            const type = await hymnsProvider.getType(ServiceLanguage.English, "typeId");

            // Validate that the contract was mapped out correctly from db results
            type.name.should.be.equal(typeDb.Name);
            type.nameSingular.should.be.equal(typeDb.Name_Short);
            type.hymnCount.should.be.equal(typeDb.ServiceHymnsCount);
            type.order.should.be.equal(typeDb.Type_Order);
        });

        it("should get a single type in English", async () => {
            // Setup mocked result
            mockManager.mock('getType', SqlDataProviderMock.getDbType());

            const type = await hymnsProvider.getType(ServiceLanguage.English, "typeId");
            Validators.validateObject(type);
            Validators.validateHymnType(type);
            assert.equal(type.name, SqlDataProviderMock.getDbType().Name);
            assert.equal(type.nameSingular, SqlDataProviderMock.getDbType().Name_Short);
        });

        it("should get a single type in Arabic", async () => {
            // Setup mocked result
            mockManager.mock('getType', SqlDataProviderMock.getDbType());

            const type = await hymnsProvider.getType(ServiceLanguage.Arabic, "typeId");
            Validators.validateObject(type);
            Validators.validateHymnType(type);
            assert.equal(type.name, SqlDataProviderMock.getDbType().Name_Arabic);
            assert.equal(type.nameSingular, SqlDataProviderMock.getDbType().Name_Short_Arabic);
        });
    });

    describe("All seasons in a type", () => {
        it("should get all seasons for a type with results", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonList', SqlDataProviderMock.getDbTypeSeasonList());

            const seasonList = await hymnsProvider.getTypeSeasonList(ServiceLanguage.English, "12");
            Validators.validateArray(seasonList);
            seasonList.length.should.be.eql(3);
            seasonList.forEach((season) => Validators.validateTypeSeason(season));
        });

        it("should get all seasons for a type with empty results", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonList', []);

            const seasonList = await hymnsProvider.getTypeSeasonList(ServiceLanguage.English, "typeId");
            Validators.validateArray(seasonList, true);
        });

        it("should get all seasons for a type with English results", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonList', SqlDataProviderMock.getDbTypeSeasonList());

            const seasonList = await hymnsProvider.getTypeSeasonList(ServiceLanguage.English, "12");
            Validators.validateArray(seasonList);
            seasonList.length.should.be.eql(3);
            seasonList.forEach((season) => Validators.validateTypeSeason(season));
            assert.equal(seasonList[0].name, SqlDataProviderMock.getDbTypeSeasonList()[0].Name);
            assert.equal(seasonList[0].verse, SqlDataProviderMock.getDbTypeSeasonList()[0].Verse);
        });

        it("should get all seasons for a type with Arabic results", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonList', SqlDataProviderMock.getDbTypeSeasonList());

            const seasonList = await hymnsProvider.getTypeSeasonList(ServiceLanguage.Arabic, "12");
            Validators.validateArray(seasonList);
            seasonList.length.should.be.eql(3);
            seasonList.forEach((season) => Validators.validateTypeSeason(season));
            assert.equal(seasonList[0].name, SqlDataProviderMock.getDbTypeSeasonList()[0].Name_Arabic);
            assert.equal(seasonList[0].verse, SqlDataProviderMock.getDbTypeSeasonList()[0].Verse_Arabic);
        });
    });

    describe("A single season in a type", () => {
        it("should get a single season for a type", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeason', SqlDataProviderMock.getDbTypeSeason());

            const season = await hymnsProvider.getTypeSeason(ServiceLanguage.English, "12", "seasonId");
            Validators.validateObject(season);
            Validators.validateTypeSeason(season);
        });

        it("should have correct db to contract service mapping", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeason', SqlDataProviderMock.getDbTypeSeason());

            const seasonDb = SqlDataProviderMock.getDbTypeSeason();
            const season = await hymnsProvider.getTypeSeason(ServiceLanguage.English, "typeId", "seasonId");

            // Validate that the contract was mapped out correctly from db results
            season.name.should.be.equal(seasonDb.Name);
            season.verse.should.be.equal(seasonDb.Verse);
        });

        it("should get a single season for a type in English", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeason', SqlDataProviderMock.getDbTypeSeason());

            const season = await hymnsProvider.getTypeSeason(ServiceLanguage.English, "12", "seasonId");
            Validators.validateObject(season);
            Validators.validateTypeSeason(season);
            assert.equal(season.name, SqlDataProviderMock.getDbTypeSeason().Name);
            assert.equal(season.verse, SqlDataProviderMock.getDbTypeSeason().Verse);
        });

        it("should get a single season for a type in Arabic", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeason', SqlDataProviderMock.getDbTypeSeason());

            const season = await hymnsProvider.getTypeSeason(ServiceLanguage.Arabic, "12", "seasonId");
            Validators.validateObject(season);
            Validators.validateTypeSeason(season);
            assert.equal(season.name, SqlDataProviderMock.getDbTypeSeason().Name_Arabic);
            assert.equal(season.verse, SqlDataProviderMock.getDbTypeSeason().Verse_Arabic);
        });
    });

    describe("All hymns in a type season", () => {
        it("should get all hymns for a type for a season with results", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonServiceHymnList', SqlDataProviderMock.getDbTypeSeasonServiceHymnList());

            const serviceHymnList = await hymnsProvider.getTypeSeasonServiceHymnList(ServiceLanguage.English, "12", "seasonId");
            Validators.validateArray(serviceHymnList);
            serviceHymnList.length.should.be.eql(3);
            serviceHymnList.forEach((serviceHymn) => Validators.validateTypeServiceHymnWithServiceDetails(serviceHymn));
        });

        it("should get all hymns for a type for a season with empty results", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonServiceHymnList', []);

            const seasonList = await hymnsProvider.getTypeSeasonServiceHymnList(ServiceLanguage.English, "typeId", "seasonId");
            Validators.validateArray(seasonList, true);
        });

        it("should get all hymns for a type for a season with English results", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonServiceHymnList', SqlDataProviderMock.getDbTypeSeasonServiceHymnList());

            const serviceHymnList = await hymnsProvider.getTypeSeasonServiceHymnList(ServiceLanguage.English, "12", "seasonId");
            Validators.validateArray(serviceHymnList);
            serviceHymnList.length.should.be.eql(3);
            serviceHymnList.forEach((serviceHymn) => Validators.validateTypeServiceHymnWithServiceDetails(serviceHymn));
            assert.equal(serviceHymnList[0].name, SqlDataProviderMock.getDbTypeSeasonServiceHymnList()[0].Title);
        });

        it("should get all hymns for a type for a season with Arabic results", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonServiceHymnList', SqlDataProviderMock.getDbTypeSeasonServiceHymnList());

            const serviceHymnList = await hymnsProvider.getTypeSeasonServiceHymnList(ServiceLanguage.Arabic, "12", "seasonId");
            Validators.validateArray(serviceHymnList);
            serviceHymnList.length.should.be.eql(3);
            serviceHymnList.forEach((serviceHymn) => Validators.validateTypeServiceHymnWithServiceDetails(serviceHymn));
            assert.equal(serviceHymnList[0].name, SqlDataProviderMock.getDbTypeSeasonServiceHymnList()[0].Title_Arabic);
        });
    });

    describe("A single hymn in a type in a season", () => {
        it("should get a single hymn for a type in a season", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonServiceHymn', SqlDataProviderMock.getDbTypeSeasonServiceHymn());

            const serviceHymn = await hymnsProvider.getTypeSeasonServiceHymn(ServiceLanguage.English, "12", "seasonId", "hymnId");
            Validators.validateObject(serviceHymn);
            Validators.validateTypeServiceHymnWithServiceDetails(serviceHymn);
        });

        it("should have correct db to contract service mapping", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonServiceHymn', SqlDataProviderMock.getDbTypeSeasonServiceHymn());

            const serviceHymnDb = SqlDataProviderMock.getDbTypeSeasonServiceHymn();
            const serviceHymn = await hymnsProvider.getTypeSeasonServiceHymn(ServiceLanguage.English, "typeId", "seasonId", "hymnId");

            // Validate that the contract was mapped out correctly from db results
            serviceHymn.name.should.be.equal(serviceHymnDb.Title);
            serviceHymn.serviceId.should.be.equal(serviceHymnDb.Service_ID);
            serviceHymn.serviceName.should.be.equal(serviceHymnDb.Service_Name);
            serviceHymn.order.should.be.equal(serviceHymnDb.Hymn_Order);
        });

        it("should get a single hymn for a type in a season in English", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonServiceHymn', SqlDataProviderMock.getDbTypeSeasonServiceHymn());

            const serviceHymn = await hymnsProvider.getTypeSeasonServiceHymn(ServiceLanguage.English, "12", "seasonId", "hymnId");
            Validators.validateObject(serviceHymn);
            Validators.validateTypeServiceHymnWithServiceDetails(serviceHymn);
            assert.equal(serviceHymn.name, SqlDataProviderMock.getDbTypeSeasonServiceHymn().Title);
        });

        it("should get a single hymn for a type in a season in Arabic", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonServiceHymn', SqlDataProviderMock.getDbTypeSeasonServiceHymn());

            const serviceHymn = await hymnsProvider.getTypeSeasonServiceHymn(ServiceLanguage.Arabic, "12", "seasonId", "hymnId");
            Validators.validateObject(serviceHymn);
            Validators.validateTypeServiceHymnWithServiceDetails(serviceHymn);
            assert.equal(serviceHymn.name, SqlDataProviderMock.getDbTypeSeasonServiceHymn().Title_Arabic);
        });
    });

    describe("All formats in a type season hymn", () => {
        it("should get all formats for a type for a season for a hymn with results", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonServiceHymnFormatList', SqlDataProviderMock.getDbTypeSeasonServiceHymnFormatList());

            const formatList = await hymnsProvider.getTypeSeasonServiceHymnFormatList(ServiceLanguage.English, "12", "seasonId", "hymnId");
            Validators.validateArray(formatList);
            formatList.length.should.be.eql(3);
            formatList.forEach((format) => Validators.validateTypeServiceHymnFormat(format));
        });

        it("should get all formats for a type for a season for a hymn with empty results", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonServiceHymnFormatList', []);

            const formatList = await hymnsProvider.getTypeSeasonServiceHymnFormatList(ServiceLanguage.English, "typeId", "seasonId", "hymnId");
            Validators.validateArray(formatList, true);
        });

        it("should get all formats for a type for a season for a hymn with English results", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonServiceHymnFormatList', SqlDataProviderMock.getDbTypeSeasonServiceHymnFormatList());

            const formatList = await hymnsProvider.getTypeSeasonServiceHymnFormatList(ServiceLanguage.English, "12", "seasonId", "hymnId");
            Validators.validateArray(formatList);
            formatList.length.should.be.eql(3);
            formatList.forEach((format) => Validators.validateTypeServiceHymnFormat(format));
            assert.equal(formatList[0].name, SqlDataProviderMock.getDbTypeSeasonServiceHymnFormatList()[0].Format_Name);
        });

        it("should get all formats for a type for a season for a hymn with Arabic results", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonServiceHymnFormatList', SqlDataProviderMock.getDbTypeSeasonServiceHymnFormatList());

            const formatList = await hymnsProvider.getTypeSeasonServiceHymnFormatList(ServiceLanguage.Arabic, "12", "seasonId", "hymnId");
            Validators.validateArray(formatList);
            formatList.length.should.be.eql(3);
            formatList.forEach((format) => Validators.validateTypeServiceHymnFormat(format));
            assert.equal(formatList[0].name, SqlDataProviderMock.getDbTypeSeasonServiceHymnFormatList()[0].Format_Name_Arabic);
        });
    });

    describe("A single format in a type in a season in a hymn", () => {
        it("should get a single format for a type in a season in a hymn", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonServiceHymnFormat', SqlDataProviderMock.getDbTypeSeasonServiceHymnFormat());

            const format = await hymnsProvider.getTypeSeasonServiceHymnFormat(ServiceLanguage.English, "12", "seasonId", "hymnId", "formatId");
            Validators.validateObject(format);
            Validators.validateTypeServiceHymnFormat(format);
        });

        it("should have correct db to contract service mapping", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonServiceHymnFormat', SqlDataProviderMock.getDbTypeSeasonServiceHymnFormat());

            const formatDb = SqlDataProviderMock.getDbTypeSeasonServiceHymnFormat();
            const format = await hymnsProvider.getTypeSeasonServiceHymnFormat(ServiceLanguage.English, "typeId", "seasonId", "hymnId", "formatId");

            // Validate that the contract was mapped out correctly from db results
            format.name.should.be.equal(formatDb.Format_Name);
            format.variationCount.should.be.equal(formatDb.Content_Count);
        });

        it("should get a single format for a type in a season in a hymn in English", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonServiceHymnFormat', SqlDataProviderMock.getDbTypeSeasonServiceHymnFormat());

            const format = await hymnsProvider.getTypeSeasonServiceHymnFormat(ServiceLanguage.English, "12", "seasonId", "hymnId", "formatId");
            Validators.validateObject(format);
            Validators.validateTypeServiceHymnFormat(format);
            assert.equal(format.name, SqlDataProviderMock.getDbTypeSeasonServiceHymnFormat().Format_Name);
        });

        it("should get a single format for a type in a season in a hymn in Arabic", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonServiceHymnFormat', SqlDataProviderMock.getDbTypeSeasonServiceHymnFormat());

            const format = await hymnsProvider.getTypeSeasonServiceHymnFormat(ServiceLanguage.Arabic, "12", "seasonId", "hymnId", "formatId");
            Validators.validateObject(format);
            Validators.validateTypeServiceHymnFormat(format);
            assert.equal(format.name, SqlDataProviderMock.getDbTypeSeasonServiceHymnFormat().Format_Name_Arabic);
        });
    });

    describe("All variations in a type season hymn format", () => {
        it("should get all variations for a type for a season for a hymn for a format with results", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonServiceHymnFormatVariationList', SqlDataProviderMock.getDbTypeServiceHymnsFormatVariationList());

            const variationList = await hymnsProvider.getTypeSeasonServiceHymnFormatVariationList("12", "seasonId", "hymnId", "variationId");
            Validators.validateArray(variationList);
            variationList.length.should.be.eql(3);
            variationList.forEach((variation) => Validators.validateTypeServiceHymnFormatVariation(variation));
        });

        it("should get all formats for a type for a season for a hymn with empty results", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonServiceHymnFormatVariationList', []);

            const variationList = await hymnsProvider.getTypeSeasonServiceHymnFormatVariationList("typeId", "seasonId", "hymnId", "variationId");
            Validators.validateArray(variationList, true);
        });
    });

    describe("A single variation in a type in a season in a hymn in a format", () => {
        it("should get a single variation for a type in a season in a hymn in a format", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase());

            const variation = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variation);
            Validators.validateTypeServiceHymnFormatVariation(variation);
        });

        it("should have correct db to contract service mapping", async () => {
            // Setup mocked result
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase());

            const variationDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            const variation = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation("typeId", "seasonId", "hymnId", "formatId", "variationId");

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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that the contract was mapped out correctly from db results
            variationContent.name.should.be.equal(contentDb.Content_Name);
            variationContent.content.paragraphs.length.should.be.equal(1);
            chai.assert(!variationContent.content.paragraphs[0].isComment);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(3);

            variationContent.content.paragraphs[0].columns.forEach((col) => {
                switch (col.language) {
                    case ContentLanguage.Arabic:
                        col.content.should.be.equal(contentDb.Content_Arabic);
                        break;
                    case ContentLanguage.Coptic:
                        col.content.should.be.equal(contentDb.Content_Coptic);
                        break;
                    case ContentLanguage.English:
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that there's only one paragraph
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(contentDb.Content_Arabic);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(ContentLanguage.Arabic);
        });

        it("should get a text with only Coptic paragraph", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_Coptic = "Some Coptic content";
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that there's only one paragraph
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(contentDb.Content_Coptic);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(ContentLanguage.Coptic);
        });

        it("should get a text with only English paragraph", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_English = "Some English content";
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that there's only one paragraph
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(contentDb.Content_English);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(ContentLanguage.English);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate paragraphs
            variationContent.content.paragraphs.length.should.be.equal(3);

            for (let i = 0; i < variationContent.content.paragraphs.length; i++) {
                const paragraph = variationContent.content.paragraphs[i];

                paragraph.columns.length.should.be.equal(2);

                paragraph.columns.forEach((col) => {
                    switch (col.language) {
                        case ContentLanguage.Arabic:
                            col.content.should.be.equal(arabicParagraphs[i]);
                            break;
                        case ContentLanguage.English:
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate paragraphs
            variationContent.content.paragraphs.length.should.be.equal(3);

            // First paragraph should have all 3 cols
            let pIdx = 0;
            let paragraph = variationContent.content.paragraphs[pIdx];
            paragraph.columns.length.should.be.equal(3);

            paragraph.columns.forEach((col) => {
                switch (col.language) {
                    case ContentLanguage.Arabic:
                        col.content.should.be.equal(arabicParagraphs[pIdx]);
                        break;
                    case ContentLanguage.Coptic:
                        col.content.should.be.equal(copticParagraphs[pIdx]);
                        break;
                    case ContentLanguage.English:
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
                    case ContentLanguage.Arabic:
                        col.content.should.be.equal(arabicParagraphs[pIdx]);
                        break;
                    case ContentLanguage.English:
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
                    case ContentLanguage.Arabic:
                        col.content.should.be.equal(arabicParagraphs[pIdx]);
                        break;
                    case ContentLanguage.Coptic:
                        col.content.should.be.equal(copticParagraphs[pIdx]);
                        break;
                    case ContentLanguage.English:
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that common content has been replaced
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(expectedContent);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(ContentLanguage.English);
        });

        it("should get a text with common Coptic content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_Coptic = "Some Coptic content. <common=123>";
            const commonContent = "Common content.";
            const expectedContent = "Some Coptic content. Common content.";
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that common content has been replaced
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(expectedContent);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(ContentLanguage.Coptic);
        });

        it("should get a text with common Arabic content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_Arabic = "Some Arabic content. <common=123>";
            const commonContent = "Common content.";
            const expectedContent = "Some Arabic content. Common content.";
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that common content has been replaced
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(expectedContent);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(ContentLanguage.Arabic);
        });

        it("should get a text with multiple common English content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_English = "Some English content. <common=123><common=456>";
            const commonContent = "Common content.";
            const expectedContent = "Some English content. Common content.Common content.";
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that all common content has been replaced
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(expectedContent);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(ContentLanguage.English);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', (commonId) => mockedGetCommonContent(commonId));

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that all common content has been replaced
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(expectedContent);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(ContentLanguage.English);
        });

        it("should get a text with English long reason content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            const reasonDb = SqlDataProviderMock.getDbReason();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_English = "Some English content with <reason_long>.";
            const expectedContent = `Some English content with ${reasonDb.Long_English}.`;
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getReason', reasonDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that reason content has been replaced
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(expectedContent);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(ContentLanguage.English);
        });

        it("should get a text with English short reason content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            const reasonDb = SqlDataProviderMock.getDbReason();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_English = "Some English content with <reason_short>.";
            const expectedContent = `Some English content with ${reasonDb.Short_English}.`;
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getReason', reasonDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that reason content has been replaced
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(expectedContent);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(ContentLanguage.English);
        });

        it("should get a text with Coptic long reason content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            const reasonDb = SqlDataProviderMock.getDbReason();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_Coptic = "Some Coptic content with <reason_long>.";
            const expectedContent = `Some Coptic content with ${reasonDb.Long_Coptic}.`;
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getReason', reasonDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that reason content has been replaced
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(expectedContent);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(ContentLanguage.Coptic);
        });

        it("should get a text with Coptic short reason content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            const reasonDb = SqlDataProviderMock.getDbReason();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_Coptic = "Some Coptic content with <reason_short>.";
            const expectedContent = `Some Coptic content with ${reasonDb.Short_Coptic}.`;
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getReason', reasonDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that reason content has been replaced
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(expectedContent);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(ContentLanguage.Coptic);
        });

        it("should get a text with Arabic long reason content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            const reasonDb = SqlDataProviderMock.getDbReason();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_Arabic = "Some Arabic content with <reason_long>.";
            const expectedContent = `Some Arabic content with ${reasonDb.Long_Arabic}.`;
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getReason', reasonDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that reason content has been replaced
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(expectedContent);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(ContentLanguage.Arabic);
        });

        it("should get a text with Arabic short reason content", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            const reasonDb = SqlDataProviderMock.getDbReason();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_Arabic = "Some Arabic content with <reason_short>.";
            const expectedContent = `Some Arabic content with ${reasonDb.Short_Arabic}.`;
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getReason', reasonDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that reason content has been replaced
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(expectedContent);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(ContentLanguage.Arabic);
        });

        it("should get a text with common English content containing a reason", async () => {
            // Setup mocked result
            const contentDb = SqlDataProviderMock.getDbServiceHymnsFormatVariationContentBase();
            const reasonDb = SqlDataProviderMock.getDbReason();
            contentDb.Format_ID = 1; // Text
            contentDb.Content_English = "Some English content. <common=123>";
            const commonContent = "Common content with <reason_long>.";
            const expectedContent = `Some English content. Common content with ${reasonDb.Long_English}.`;
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);
            mockManager.mock('getReason', reasonDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<ITextContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
            Validators.validateTextContent(variationContent.content);

            // Validate that common and reason content have been replaced
            variationContent.content.paragraphs.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns.length.should.be.equal(1);
            variationContent.content.paragraphs[0].columns[0].content.should.be.equal(expectedContent);
            variationContent.content.paragraphs[0].columns[0].language.should.be.equal(ContentLanguage.English);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<IHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<IHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<IHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<IHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<IHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<IHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<IHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', (commonId) => mockedGetCommonContent(commonId));

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<IHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<IVerticalHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<IVerticalHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<IVerticalHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<IVerticalHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<IVerticalHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<IVerticalHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', commonContent);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<IVerticalHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);
            mockManager.mock('getCommonContent', (commonId) => mockedGetCommonContent(commonId));

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<IVerticalHazzatContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<IMusicalNotesContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<IAudioContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<IVideoContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<IVideoContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<IVideoContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<IVideoContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<IInformationContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<IInformationContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
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
            mockManager.mock('getTypeSeasonServiceHymnFormatVariation', contentDb);

            const variationContent = await hymnsProvider.getTypeSeasonServiceHymnFormatVariation<IInformationContent>("12", "seasonId", "hymnId", "formatId", "variationId");
            Validators.validateObject(variationContent);
            Validators.validateTypeServiceHymnFormatVariation(variationContent);
            Validators.validateInformationContent(variationContent.content);

            // Validate that there's only English
            chai.assert(variationContent.content.arabicInformation === null);
            variationContent.content.englishInformation.should.be.equal(contentDb.Content_English);
        });
    });
});
