import { AxiosResponse, default as axios } from "axios";
import { assert } from "chai";
import { ErrorCodes } from "../../Common/Errors";
import { AsyncDelayer } from "../../Common/Utils/AsyncDelayer";
import { IFormatInfo } from "../../Models/IFormatInfo";
import { IHymnInfo } from "../../Models/IHymnInfo";
import { ISeasonInfo } from "../../Models/ISeasonInfo";
import { IServiceInfo } from "../../Models/IServiceInfo";
import { IAudioContent, IHazzatContent, IInformationContent, IMusicalNotesContent, ITextContent, IVariationInfo, IVerticalHazzatContent, IVideoContent } from "../../Models/IVariationInfo";
import { Constants } from "../../Providers/DataProviders/SqlDataProvider/SqlConstants";
import { ResourceTypes } from "../../Routes/ResourceTypes";
import { Validators } from "../Helpers/Validators";
import { ApiValidator, TestCaseType } from "./ApiValidator";
import { TestConfiguration } from "./TestConfiguration";

describe("Seasons controller", () => {
    let tc: TestConfiguration;

    before("Initialize Test Configuration", async () => {
        tc = new TestConfiguration();

        console.log(`Using test location ${tc.testLocation}`);
        console.log(`Using baseurl ${tc.baseTestUrl}`);

        // Wake up the service before first test
        await tc.ensureServiceIsAwake();
    });

    describe("/GET all seasons", () => {
        it("should get all seasons", async () => {
            const response: AxiosResponse<ISeasonInfo[]> = await axios.get(`${tc.baseTestUrl}/seasons`);

            Validators.validateArray(response.data);
            response.data.forEach((season) => Validators.validateSeason(season));
        });
    });

    describe("/GET a season", () => {
        it("should get a single season", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/1`;
            const response: AxiosResponse<ISeasonInfo> = await axios.get(`${tc.baseTestUrl}${resourceId}`);

            Validators.validateObject(response.data);
            Validators.validateSeason(response.data, resourceId);
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Seasons, value: "1" })
            .generate().forEach((testCase) => {
                it(testCase.description, async () => {
                    try {
                        await axios.get(`${tc.baseTestUrl}${testCase.resourceId}`);
                        assert.fail();
                    }
                    catch (ex) {
                        if (testCase.testCase === TestCaseType.NonExisting) {
                            Validators.validateErrorAxiosResponse(ex.response, 404, ErrorCodes.NotFoundError);
                        }
                        else {
                            Validators.validateErrorAxiosResponse(ex.response, 404);
                        }
                    }
                });
            });
    });

    describe("/GET all season services", () => {
        it("should get all season services", async () => {
            const response: AxiosResponse<IServiceInfo[]> = await axios.get(`${tc.baseTestUrl}/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}`);

            Validators.validateArray(response.data);
            response.data.forEach((service) => Validators.validateService(service));
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Seasons, value: "1" })
            .generate().forEach((testCase) => {
                if (testCase.testCase === TestCaseType.NonExisting) {
                    it(`should return an empty array for non existing ${testCase.partUnderTest} ids`, async () => {
                        const response: AxiosResponse<IServiceInfo[]> = await axios.get(`${tc.baseTestUrl}${testCase.resourceId}/${ResourceTypes.Services}`);

                        Validators.validateArray(response.data, true);
                    });
                }
                else {
                    it(testCase.description, async () => {
                        try {
                            await axios.get(`${tc.baseTestUrl}${testCase.resourceId}/${ResourceTypes.Services}`);
                            assert.fail();
                        }
                        catch (ex) {
                            Validators.validateErrorAxiosResponse(ex.response, 404);
                        }
                    });
                }
            });
    });

    describe("/GET a season service", () => {
        it("should get a season services", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/15`;
            const response: AxiosResponse<IServiceInfo[]> = await axios.get(`${tc.baseTestUrl}${resourceId}`);

            Validators.validateObject(response.data);
            Validators.validateService(response.data, resourceId);
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Seasons, value: "1" })
            .withPart({ typeName: ResourceTypes.Services, value: "15" })
            .generate().forEach((testCase) => {
                it(testCase.description, async () => {
                    try {
                        await axios.get(`${tc.baseTestUrl}${testCase.resourceId}`);
                        assert.fail();
                    }
                    catch (ex) {
                        if (testCase.testCase === TestCaseType.NonExisting) {
                            Validators.validateErrorAxiosResponse(ex.response, 404, ErrorCodes.NotFoundError);
                        }
                        else {
                            Validators.validateErrorAxiosResponse(ex.response, 404);
                        }
                    }
                });
            });
    });

    describe("/GET all season service hymns", () => {
        it("should get all season service hymns", async () => {
            const response: AxiosResponse<IHymnInfo[]> = await axios.get(`${tc.baseTestUrl}/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/15/${ResourceTypes.Hymns}`);

            Validators.validateArray(response.data);
            response.data.forEach((hymn) => Validators.validateServiceHymn(hymn));
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Seasons, value: "1" })
            .withPart({ typeName: ResourceTypes.Services, value: "15" })
            .generate().forEach((testCase) => {
                if (testCase.testCase === TestCaseType.NonExisting) {
                    it(`should return an empty array for non existing ${testCase.partUnderTest} ids`, async () => {
                        const response: AxiosResponse<IHymnInfo[]> = await axios.get(`${tc.baseTestUrl}${testCase.resourceId}/${ResourceTypes.Hymns}`);

                        Validators.validateArray(response.data, true);
                    });
                }
                else {
                    it(testCase.description, async () => {
                        try {
                            await axios.get(`${tc.baseTestUrl}${testCase.resourceId}/${ResourceTypes.Hymns}`);
                            assert.fail();
                        }
                        catch (ex) {
                            Validators.validateErrorAxiosResponse(ex.response, 404);
                        }
                    });
                }
            });
    });

    describe("/GET a season service hymn", () => {
        it("should get a season services", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/15/${ResourceTypes.Hymns}/311`;
            const response: AxiosResponse<ISeasonInfo> = await axios.get(`${tc.baseTestUrl}${resourceId}`);

            Validators.validateObject(response.data);
            Validators.validateServiceHymn(response.data, resourceId);
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Seasons, value: "1" })
            .withPart({ typeName: ResourceTypes.Services, value: "15" })
            .withPart({ typeName: ResourceTypes.Hymns, value: "311" })
            .generate().forEach((testCase) => {
                it(testCase.description, async () => {
                    try {
                        await axios.get(`${tc.baseTestUrl}${testCase.resourceId}`);
                        assert.fail();
                    }
                    catch (ex) {
                        if (testCase.testCase === TestCaseType.NonExisting) {
                            Validators.validateErrorAxiosResponse(ex.response, 404, ErrorCodes.NotFoundError);
                        }
                        else {
                            Validators.validateErrorAxiosResponse(ex.response, 404);
                        }
                    }
                });
            });
    });

    describe("/GET all season service hymn formats", () => {
        it("should get a season service hymn format", async () => {
            const response: AxiosResponse<IFormatInfo[]> = await axios.get(`${tc.baseTestUrl}/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/15/${ResourceTypes.Hymns}/311/${ResourceTypes.Formats}`);

            Validators.validateArray(response.data);
            response.data.forEach((format) => Validators.validateServiceHymnFormat(format));
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Seasons, value: "1" })
            .withPart({ typeName: ResourceTypes.Services, value: "15" })
            .withPart({ typeName: ResourceTypes.Hymns, value: "311" })
            .generate().forEach((testCase) => {
                if (testCase.testCase === TestCaseType.NonExisting) {
                    it(`should return an empty array for non existing ${testCase.partUnderTest} ids`, async () => {
                        const response: AxiosResponse<IFormatInfo[]> = await axios.get(`${tc.baseTestUrl}${testCase.resourceId}/${ResourceTypes.Formats}`);

                        Validators.validateArray(response.data, true);
                    });
                }
                else {
                    it(testCase.description, async () => {
                        try {
                            await axios.get(`${tc.baseTestUrl}${testCase.resourceId}/${ResourceTypes.Formats}`);
                            assert.fail();
                        }
                        catch (ex) {
                            Validators.validateErrorAxiosResponse(ex.response, 404);
                        }
                    });
                }
            });
    });

    describe("/GET a season service hymn format", () => {
        it("should get a season service hymn", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/15/${ResourceTypes.Hymns}/311/${ResourceTypes.Formats}/1`;
            const response: AxiosResponse<IFormatInfo> = await axios.get(`${tc.baseTestUrl}${resourceId}`);

            Validators.validateObject(response.data);
            Validators.validateServiceHymnFormat(response.data, resourceId);
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Seasons, value: "1" })
            .withPart({ typeName: ResourceTypes.Services, value: "15" })
            .withPart({ typeName: ResourceTypes.Hymns, value: "311" })
            .withPart({ typeName: ResourceTypes.Formats, value: "1" })
            .generate().forEach((testCase) => {
                it(testCase.description, async () => {
                    try {
                        await axios.get(`${tc.baseTestUrl}${testCase.resourceId}`);
                        assert.fail();
                    }
                    catch (ex) {
                        if (testCase.testCase === TestCaseType.NonExisting) {
                            Validators.validateErrorAxiosResponse(ex.response, 404, ErrorCodes.NotFoundError);
                        }
                        else {
                            Validators.validateErrorAxiosResponse(ex.response, 404);
                        }
                    }
                });
            });
    });

    describe("/GET all season service hymn format variations", () => {
        it("should get a season service hymn format variations (text)", async () => {
            const response: AxiosResponse<IVariationInfo<ITextContent>[]> = await axios.get(`${tc.baseTestUrl}/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/15/${ResourceTypes.Hymns}/311/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}`);

            Validators.validateArray(response.data);
            response.data.forEach((variation) => Validators.validateServiceHymnFormatVariation(variation));
            Validators.validateTextContent(response.data[0].content);
        });

        it("should get a season service hymn format variations (text) with comment", async () => {
            const response: AxiosResponse<IVariationInfo<ITextContent>[]> = await axios.get(`${tc.baseTestUrl}/${ResourceTypes.Seasons}/24/${ResourceTypes.Services}/4/${ResourceTypes.Hymns}/284/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}`);

            Validators.validateArray(response.data);
            response.data.forEach((variation) => Validators.validateServiceHymnFormatVariation(variation));
            Validators.validateTextContent(response.data[0].content);

            response.data[0].content.paragraphs[0].should.have.property("isComment");
            Validators.validateDoesNotInclude(response.data[0].content.paragraphs[0].columns[0].content, Constants.Tokens.commentStartTag);
        });

        it("should get a season service hymn format variations (text) with common content", async () => {
            const response: AxiosResponse<IVariationInfo<ITextContent>[]> = await axios.get(`${tc.baseTestUrl}/${ResourceTypes.Seasons}/33/${ResourceTypes.Services}/4/${ResourceTypes.Hymns}/460/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}`);

            Validators.validateArray(response.data);
            response.data.forEach((variation) => Validators.validateServiceHymnFormatVariation(variation));
            Validators.validateTextContent(response.data[0].content);

            response.data[0].content.paragraphs.forEach((paragraph) => {
                paragraph.columns.forEach((col) => {
                    Validators.validateDoesNotInclude(col.content, "<common=");
                });
            });
        });

        it("should get a season service hymn format variations (text) with short reason content", async () => {
            const response: AxiosResponse<IVariationInfo<ITextContent>[]> = await axios.get(`${tc.baseTestUrl}/${ResourceTypes.Seasons}/6/${ResourceTypes.Services}/3/${ResourceTypes.Hymns}/48/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}`);

            Validators.validateArray(response.data);
            response.data.forEach((variation) => Validators.validateServiceHymnFormatVariation(variation));
            Validators.validateTextContent(response.data[0].content);

            response.data[0].content.paragraphs.forEach((paragraph) => {
                paragraph.columns.forEach((col) => {
                    Validators.validateDoesNotInclude(col.content, Constants.Tokens.ReasonShort);
                });
            });
        });

        it("should get a season service hymn format variations (text) with long reason content", async () => {
            const response: AxiosResponse<IVariationInfo<ITextContent>[]> = await axios.get(`${tc.baseTestUrl}/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/2/${ResourceTypes.Hymns}/331/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}`);

            Validators.validateArray(response.data);
            response.data.forEach((variation) => Validators.validateServiceHymnFormatVariation(variation));
            Validators.validateTextContent(response.data[0].content);

            response.data[0].content.paragraphs.forEach((paragraph) => {
                paragraph.columns.forEach((col) => {
                    Validators.validateDoesNotInclude(col.content, Constants.Tokens.ReasonLong);
                });
            });
        });

        it("should get a season service hymn format variations (text) with reason & common content", async () => {
            const response: AxiosResponse<IVariationInfo<ITextContent>[]> = await axios.get(`${tc.baseTestUrl}/${ResourceTypes.Seasons}/33/${ResourceTypes.Services}/24/${ResourceTypes.Hymns}/456/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}`);

            Validators.validateArray(response.data);
            response.data.forEach((variation) => Validators.validateServiceHymnFormatVariation(variation));
            Validators.validateTextContent(response.data[0].content);

            response.data[0].content.paragraphs.forEach((paragraph) => {
                paragraph.columns.forEach((col) => {
                    Validators.validateDoesNotInclude(col.content, "<common=");
                    Validators.validateDoesNotInclude(col.content, "<reason_");
                });
            });
        });

        it("should get a season service hymn format variations (hazzat)", async () => {
            const response: AxiosResponse<IVariationInfo<IHazzatContent>[]> = await axios.get(`${tc.baseTestUrl}/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/15/${ResourceTypes.Hymns}/311/${ResourceTypes.Formats}/2/${ResourceTypes.Variations}`);

            Validators.validateArray(response.data);
            response.data.forEach((variation) => Validators.validateServiceHymnFormatVariation(variation));
            Validators.validateHazzatContent(response.data[0].content);
        });

        it("should get a season service hymn format variations (hazzat) with common content", async () => {
            const response: AxiosResponse<IVariationInfo<IHazzatContent>[]> = await axios.get(`${tc.baseTestUrl}/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/21/${ResourceTypes.Hymns}/377/${ResourceTypes.Formats}/2/${ResourceTypes.Variations}`);

            Validators.validateArray(response.data);
            response.data.forEach((variation) => Validators.validateServiceHymnFormatVariation(variation));
            Validators.validateHazzatContent(response.data[0].content);

            Validators.validateDoesNotInclude(response.data[0].content.arabicHazzat, "<common=");
            Validators.validateDoesNotInclude(response.data[0].content.copticHazzat, "<common=");
            Validators.validateDoesNotInclude(response.data[0].content.englishHazzat, "<common=");
        });

        it("should get a season service hymn format variations (vertical hazzat)", async () => {
            const response: AxiosResponse<IVariationInfo<IVerticalHazzatContent>[]> = await axios.get(`${tc.baseTestUrl}/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/2/${ResourceTypes.Hymns}/279/${ResourceTypes.Formats}/3/${ResourceTypes.Variations}`);

            Validators.validateArray(response.data);
            response.data.forEach((variation) => Validators.validateServiceHymnFormatVariation(variation));
            Validators.validateVerticalHazzatContent(response.data[0].content);
        });

        it("should get a season service hymn format variations (vertical hazzat) with common content", async () => {
            const response: AxiosResponse<IVariationInfo<IVerticalHazzatContent>[]> = await axios.get(`${tc.baseTestUrl}/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/21/${ResourceTypes.Hymns}/377/${ResourceTypes.Formats}/3/${ResourceTypes.Variations}`);

            Validators.validateArray(response.data);
            response.data.forEach((variation) => Validators.validateServiceHymnFormatVariation(variation));
            Validators.validateVerticalHazzatContent(response.data[0].content);

            Validators.validateDoesNotInclude(response.data[0].content.arabicVerticalHazzat, "<common=");
            Validators.validateDoesNotInclude(response.data[0].content.copticVerticalHazzat, "<common=");
            Validators.validateDoesNotInclude(response.data[0].content.englishVerticalHazzat, "<common=");
        });

        it("should get a season service hymn format variations (Musical Notes)", async () => {
            const response: AxiosResponse<IVariationInfo<IMusicalNotesContent>[]> = await axios.get(`${tc.baseTestUrl}/${ResourceTypes.Seasons}/32/${ResourceTypes.Services}/17/${ResourceTypes.Hymns}/334/${ResourceTypes.Formats}/4/${ResourceTypes.Variations}`);

            Validators.validateArray(response.data);
            response.data.forEach((variation) => Validators.validateServiceHymnFormatVariation(variation));
            Validators.validateMusicalNotesContent(response.data[0].content);
        });

        it("should get a season service hymn format variations (audio)", async () => {
            const response: AxiosResponse<IVariationInfo<IAudioContent>[]> = await axios.get(`${tc.baseTestUrl}/${ResourceTypes.Seasons}/14/${ResourceTypes.Services}/4/${ResourceTypes.Hymns}/162/${ResourceTypes.Formats}/5/${ResourceTypes.Variations}`);

            Validators.validateArray(response.data);
            response.data.forEach((variation) => Validators.validateServiceHymnFormatVariation(variation));
            Validators.validateAudioContent(response.data[0].content);
        });

        it("should get a season service hymn format variations (video)", async () => {
            const response: AxiosResponse<IVariationInfo<IVideoContent>[]> = await axios.get(`${tc.baseTestUrl}/${ResourceTypes.Seasons}/14/${ResourceTypes.Services}/4/${ResourceTypes.Hymns}/162/${ResourceTypes.Formats}/6/${ResourceTypes.Variations}`);

            Validators.validateArray(response.data);
            response.data.forEach((variation) => Validators.validateServiceHymnFormatVariation(variation));
            Validators.validateVideoContent(response.data[0].content);
        });

        it("should get a season service hymn format variations (information)", async () => {
            const response: AxiosResponse<IVariationInfo<IInformationContent>[]> = await axios.get(`${tc.baseTestUrl}/${ResourceTypes.Seasons}/14/${ResourceTypes.Services}/4/${ResourceTypes.Hymns}/162/${ResourceTypes.Formats}/7/${ResourceTypes.Variations}`);

            Validators.validateArray(response.data);
            response.data.forEach((variation) => Validators.validateServiceHymnFormatVariation(variation));
            Validators.validateInformationContent(response.data[0].content);
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Seasons, value: "1" })
            .withPart({ typeName: ResourceTypes.Services, value: "15" })
            .withPart({ typeName: ResourceTypes.Hymns, value: "311" })
            .withPart({ typeName: ResourceTypes.Formats, value: "1" })
            .generate().forEach((testCase) => {
                if (testCase.testCase === TestCaseType.NonExisting) {
                    it(`should return an empty array for non existing ${testCase.partUnderTest} ids`, async () => {
                        const response: AxiosResponse<IVariationInfo<any>[]> = await axios.get(`${tc.baseTestUrl}${testCase.resourceId}/${ResourceTypes.Variations}`);

                        Validators.validateArray(response.data, true);
                    });
                }
                else {
                    it(testCase.description, async () => {
                        try {
                            await axios.get(`${tc.baseTestUrl}${testCase.resourceId}/${ResourceTypes.Variations}`);
                            assert.fail();
                        }
                        catch (ex) {
                            Validators.validateErrorAxiosResponse(ex.response, 404);
                        }
                    });
                }
            });
    });

    describe("/GET a season service hymn format variation", () => {
        it("should get a season service hymn content (text)", async () => {
            it("should get a season service hymn", async () => {
                const resourceId = `/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/15/${ResourceTypes.Hymns}/311/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}/288`;
                const response: AxiosResponse<IVariationInfo<ITextContent>> = await axios.get(`${tc.baseTestUrl}${resourceId}`);

                Validators.validateObject(response.data);
                Validators.validateServiceHymnFormatVariation(response.data, resourceId);
                Validators.validateTextContent(response.data.content);
            });
        });

        it("should get a season service hymn content (text) with comment content", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/24/${ResourceTypes.Services}/4/${ResourceTypes.Hymns}/284/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}/266`;
            const response: AxiosResponse<IVariationInfo<ITextContent>> = await axios.get(`${tc.baseTestUrl}${resourceId}`);

            Validators.validateObject(response.data);
            Validators.validateServiceHymnFormatVariation(response.data, resourceId);
            Validators.validateTextContent(response.data.content);

            response.data.content.paragraphs[0].should.have.property("isComment");
            Validators.validateDoesNotInclude(response.data.content.paragraphs[0].columns[0].content, Constants.Tokens.commentStartTag);
        });

        it("should get a season service hymn content (text) with common content", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/33/${ResourceTypes.Services}/4/${ResourceTypes.Hymns}/460/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}/721`;
            const response: AxiosResponse<IVariationInfo<ITextContent>> = await axios.get(`${tc.baseTestUrl}${resourceId}`);

            Validators.validateObject(response.data);
            Validators.validateServiceHymnFormatVariation(response.data, resourceId);
            Validators.validateTextContent(response.data.content);

            response.data.content.paragraphs.forEach((paragraph) => {
                paragraph.columns.forEach((col) => {
                    Validators.validateDoesNotInclude(col.content, "<common=");
                });
            });
        });

        it("should get a season service hymn content (text) with short reason content", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/6/${ResourceTypes.Services}/3/${ResourceTypes.Hymns}/48/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}/37`;
            const response: AxiosResponse<IVariationInfo<ITextContent>> = await axios.get(`${tc.baseTestUrl}${resourceId}`);

            Validators.validateObject(response.data);
            Validators.validateServiceHymnFormatVariation(response.data, resourceId);
            Validators.validateTextContent(response.data.content);

            response.data.content.paragraphs.forEach((paragraph) => {
                paragraph.columns.forEach((col) => {
                    Validators.validateDoesNotInclude(col.content, Constants.Tokens.ReasonShort);
                });
            });
        });

        it("should get a season service hymn content (text) with long reason content", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/2/${ResourceTypes.Hymns}/331/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}/302`;
            const response: AxiosResponse<IVariationInfo<ITextContent>> = await axios.get(`${tc.baseTestUrl}${resourceId}`);

            Validators.validateObject(response.data);
            Validators.validateServiceHymnFormatVariation(response.data, resourceId);
            Validators.validateTextContent(response.data.content);

            response.data.content.paragraphs.forEach((paragraph) => {
                paragraph.columns.forEach((col) => {
                    Validators.validateDoesNotInclude(col.content, Constants.Tokens.ReasonLong);
                });
            });
        });

        it("should get a season service hymn content (text) with reason & common content", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/33/${ResourceTypes.Services}/24/${ResourceTypes.Hymns}/456/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}/713`;
            const response: AxiosResponse<IVariationInfo<ITextContent>> = await axios.get(`${tc.baseTestUrl}${resourceId}`);

            Validators.validateObject(response.data);
            Validators.validateServiceHymnFormatVariation(response.data, resourceId);
            Validators.validateTextContent(response.data.content);

            response.data.content.paragraphs.forEach((paragraph) => {
                paragraph.columns.forEach((col) => {
                    Validators.validateDoesNotInclude(col.content, "<common=");
                    Validators.validateDoesNotInclude(col.content, "<reason_");
                });
            });
        });

        it("should get a season service hymn variation (hazzat)", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/15/${ResourceTypes.Hymns}/311/${ResourceTypes.Formats}/2/${ResourceTypes.Variations}/379`;
            const response: AxiosResponse<IVariationInfo<IHazzatContent>> = await axios.get(`${tc.baseTestUrl}${resourceId}`);

            Validators.validateObject(response.data);
            Validators.validateServiceHymnFormatVariation(response.data, resourceId);
            Validators.validateHazzatContent(response.data.content);
        });

        it("should get a season service hymn variation (hazzat) with common content", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/21/${ResourceTypes.Hymns}/377/${ResourceTypes.Formats}/2/${ResourceTypes.Variations}/436`;
            const response: AxiosResponse<IVariationInfo<IHazzatContent>> = await axios.get(`${tc.baseTestUrl}${resourceId}`);

            Validators.validateObject(response.data);
            Validators.validateServiceHymnFormatVariation(response.data, resourceId);
            Validators.validateHazzatContent(response.data.content);

            Validators.validateDoesNotInclude(response.data.content.arabicHazzat, "<common=");
            Validators.validateDoesNotInclude(response.data.content.copticHazzat, "<common=");
            Validators.validateDoesNotInclude(response.data.content.englishHazzat, "<common=");
        });

        it("should get a season service hymn format variation (vertical hazzat)", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/2/${ResourceTypes.Hymns}/279/${ResourceTypes.Formats}/3/${ResourceTypes.Variations}/622`;
            const response: AxiosResponse<IVariationInfo<IVerticalHazzatContent>> = await axios.get(`${tc.baseTestUrl}${resourceId}`);

            Validators.validateObject(response.data);
            Validators.validateServiceHymnFormatVariation(response.data, resourceId);
            Validators.validateVerticalHazzatContent(response.data.content);
        });

        it("should get a season service hymn format variation (vertical hazzat) with common content", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/21/${ResourceTypes.Hymns}/377/${ResourceTypes.Formats}/3/${ResourceTypes.Variations}/546`;
            const response: AxiosResponse<IVariationInfo<IVerticalHazzatContent>> = await axios.get(`${tc.baseTestUrl}${resourceId}`);

            Validators.validateObject(response.data);
            Validators.validateServiceHymnFormatVariation(response.data, resourceId);
            Validators.validateVerticalHazzatContent(response.data.content);

            Validators.validateDoesNotInclude(response.data.content.arabicVerticalHazzat, "<common=");
            Validators.validateDoesNotInclude(response.data.content.copticVerticalHazzat, "<common=");
            Validators.validateDoesNotInclude(response.data.content.englishVerticalHazzat, "<common=");
        });

        it("should get a season service hymn format variation (Musical Notes)", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/32/${ResourceTypes.Services}/17/${ResourceTypes.Hymns}/334/${ResourceTypes.Formats}/4/${ResourceTypes.Variations}/639`;
            const response: AxiosResponse<IVariationInfo<IMusicalNotesContent>> = await axios.get(`${tc.baseTestUrl}${resourceId}`);

            Validators.validateObject(response.data);
            Validators.validateServiceHymnFormatVariation(response.data, resourceId);
            Validators.validateMusicalNotesContent(response.data.content);
        });

        it("should get a season service hymn format variation (audio)", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/14/${ResourceTypes.Services}/4/${ResourceTypes.Hymns}/162/${ResourceTypes.Formats}/5/${ResourceTypes.Variations}/703`;
            const response: AxiosResponse<IVariationInfo<IAudioContent>> = await axios.get(`${tc.baseTestUrl}${resourceId}`);

            Validators.validateObject(response.data);
            Validators.validateServiceHymnFormatVariation(response.data, resourceId);
            Validators.validateAudioContent(response.data.content);
        });

        it("should get a season service hymn format variation (video)", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/14/${ResourceTypes.Services}/4/${ResourceTypes.Hymns}/162/${ResourceTypes.Formats}/6/${ResourceTypes.Variations}/704`;
            const response: AxiosResponse<IVariationInfo<IVideoContent>> = await axios.get(`${tc.baseTestUrl}${resourceId}`);

            Validators.validateObject(response.data);
            Validators.validateServiceHymnFormatVariation(response.data, resourceId);
            Validators.validateVideoContent(response.data.content);
        });

        it("should get a season service hymn format variation (information)", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/14/${ResourceTypes.Services}/4/${ResourceTypes.Hymns}/162/${ResourceTypes.Formats}/7/${ResourceTypes.Variations}/705`;
            const response: AxiosResponse<IVariationInfo<IInformationContent>> = await axios.get(`${tc.baseTestUrl}${resourceId}`);

            Validators.validateObject(response.data);
            Validators.validateServiceHymnFormatVariation(response.data, resourceId);
            Validators.validateInformationContent(response.data.content);
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Seasons, value: "1" })
            .withPart({ typeName: ResourceTypes.Services, value: "15" })
            .withPart({ typeName: ResourceTypes.Hymns, value: "311" })
            .withPart({ typeName: ResourceTypes.Formats, value: "1" })
            .withPart({ typeName: ResourceTypes.Variations, value: "288" })
            .generate().forEach((testCase) => {
                it(testCase.description, async () => {
                    try {
                        await axios.get(`${tc.baseTestUrl}${testCase.resourceId}`);
                        assert.fail();
                    }
                    catch (ex) {
                        if (testCase.testCase === TestCaseType.NonExisting) {
                            Validators.validateErrorAxiosResponse(ex.response, 404, ErrorCodes.NotFoundError);
                        }
                        else {
                            Validators.validateErrorAxiosResponse(ex.response, 404);
                        }
                    }
                });
            });
    });
});
