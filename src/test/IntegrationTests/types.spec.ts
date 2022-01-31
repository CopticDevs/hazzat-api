import * as chai from "chai";
import { assert } from "chai";
import { ErrorCodes } from "../../Common/Errors";
import { Constants } from "../../Providers/DataProviders/SqlDataProvider/SqlConstants";
import { ResourceTypes } from "../../Routes/ResourceTypes";
import { ApiValidator, TestCaseType } from "../Helpers/ApiValidator";
import { Validators } from "../Helpers/Validators";
import chaiHttp = require("chai-http");
import server = require("../../app");

process.env.NODE_ENV = "test";

chai.use(chaiHttp);

describe("Types controller", () => {

    describe("/GET all types", () => {
        it("should get all types", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res);
                    Validators.validateHymnType(res.body[0]);
                    done();
                });
        });
    });

    describe("/GET a type", () => {
        it("should get a single type", (done) => {
            const resourceId = `/${ResourceTypes.Types}/17`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateHymnType(res.body, resourceId);
                    done();
                });
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Types, value: "17" })
            .generate().forEach((testCase) => {
                it(testCase.description, (done) => {
                    try {
                        chai.request(server)
                            .get(testCase.resourceId)
                            .end((err, res) => {
                                if (testCase.testCase === TestCaseType.NonExisting) {
                                    Validators.validateErrorChaiResponse(res, 404, ErrorCodes.NotFoundError);
                                }
                                else {
                                    Validators.validateErrorChaiResponse(res, 404);
                                }
                                done();
                            });
                    }
                    catch (ex) {
                        assert.fail();
                    }
                });
            });
    });

    describe("/GET all type seasons", () => {
        it("should get all type seasons", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res);
                    Validators.validateTypeSeason(res.body[0]);
                    done();
                });
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Types, value: "17" })
            .generate().forEach((testCase) => {
                if (testCase.testCase === TestCaseType.NonExisting) {
                    it(`should return an empty array for non existing ${testCase.partUnderTest} ids`, (done) => {
                        chai.request(server)
                            .get(`${testCase.resourceId}/${ResourceTypes.Seasons}`)
                            .end((err, res) => {
                                Validators.validateArrayChaiResponse(res, true);
                                done();
                            });
                    });
                }
                else {
                    it(testCase.description, (done) => {
                        try {
                            chai.request(server)
                                .get(`${testCase.resourceId}/${ResourceTypes.Seasons}`)
                                .end((err, res) => {
                                    Validators.validateErrorChaiResponse(res, 404);
                                    done();
                                });
                        }
                        catch (ex) {
                            assert.fail();
                        }
                    });
                }
            });
    });

    describe("/GET a type season", () => {
        it("should get a type season", (done) => {
            const resourceId = `/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTypeSeason(res.body, resourceId);
                    done();
                });
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Types, value: "17" })
            .withPart({ typeName: ResourceTypes.Seasons, value: "1" })
            .generate().forEach((testCase) => {
                it(testCase.description, (done) => {
                    try {
                        chai.request(server)
                            .get(testCase.resourceId)
                            .end((err, res) => {
                                if (testCase.testCase === TestCaseType.NonExisting) {
                                    Validators.validateErrorChaiResponse(res, 404, ErrorCodes.NotFoundError);
                                }
                                else {
                                    Validators.validateErrorChaiResponse(res, 404);
                                }
                                done();
                            });
                    }
                    catch (ex) {
                        assert.fail();
                    }
                });
            });
    });

    describe("/GET all hymns in a type season", () => {
        it("should get all hymns in a type season", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res);
                    Validators.validateTypeServiceHymnWithServiceDetails(res.body[0]);
                    done();
                });
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Types, value: "17" })
            .withPart({ typeName: ResourceTypes.Seasons, value: "1" })
            .generate().forEach((testCase) => {
                if (testCase.testCase === TestCaseType.NonExisting) {
                    it(`should return an empty array for non existing ${testCase.partUnderTest} ids`, (done) => {
                        chai.request(server)
                            .get(`${testCase.resourceId}/${ResourceTypes.Hymns}`)
                            .end((err, res) => {
                                Validators.validateArrayChaiResponse(res, true);
                                done();
                            });
                    });
                }
                else {
                    it(testCase.description, (done) => {
                        try {
                            chai.request(server)
                                .get(`${testCase.resourceId}/${ResourceTypes.Seasons}`)
                                .end((err, res) => {
                                    Validators.validateErrorChaiResponse(res, 404);
                                    done();
                                });
                        }
                        catch (ex) {
                            assert.fail();
                        }
                    });
                }
            });
    });

    describe("/GET a hymn type season", () => {
        it("should get a hymn type season", (done) => {
            const resourceId = `/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/311`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTypeServiceHymnWithServiceDetails(res.body, resourceId);
                    done();
                });
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Types, value: "17" })
            .withPart({ typeName: ResourceTypes.Seasons, value: "1" })
            .withPart({ typeName: ResourceTypes.Hymns, value: "311" })
            .generate().forEach((testCase) => {
                it(testCase.description, (done) => {
                    try {
                        chai.request(server)
                            .get(testCase.resourceId)
                            .end((err, res) => {
                                if (testCase.testCase === TestCaseType.NonExisting) {
                                    Validators.validateErrorChaiResponse(res, 404, ErrorCodes.NotFoundError);
                                }
                                else {
                                    Validators.validateErrorChaiResponse(res, 404);
                                }
                                done();
                            });
                    }
                    catch (ex) {
                        assert.fail();
                    }
                });
            });
    });

    describe("/GET all formats in a type season hymn", () => {
        it("should get all formats in a type season hymn", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/311/${ResourceTypes.Formats}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res);
                    Validators.validateTypeServiceHymnFormat(res.body[0]);
                    done();
                });
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Types, value: "17" })
            .withPart({ typeName: ResourceTypes.Seasons, value: "1" })
            .withPart({ typeName: ResourceTypes.Hymns, value: "311" })
            .generate().forEach((testCase) => {
                if (testCase.testCase === TestCaseType.NonExisting) {
                    it(`should return an empty array for non existing ${testCase.partUnderTest} ids`, (done) => {
                        chai.request(server)
                            .get(`${testCase.resourceId}/${ResourceTypes.Formats}`)
                            .end((err, res) => {
                                Validators.validateArrayChaiResponse(res, true);
                                done();
                            });
                    });
                }
                else {
                    it(testCase.description, (done) => {
                        try {
                            chai.request(server)
                                .get(`${testCase.resourceId}/${ResourceTypes.Formats}`)
                                .end((err, res) => {
                                    Validators.validateErrorChaiResponse(res, 404);
                                    done();
                                });
                        }
                        catch (ex) {
                            assert.fail();
                        }
                    });
                }
            });
    });

    describe("/GET a format type season hymn", () => {
        it("should get a format type season hymn", (done) => {
            const resourceId = `/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/311/${ResourceTypes.Formats}/2`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTypeServiceHymnFormat(res.body, resourceId);
                    done();
                });
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Types, value: "17" })
            .withPart({ typeName: ResourceTypes.Seasons, value: "1" })
            .withPart({ typeName: ResourceTypes.Hymns, value: "311" })
            .withPart({ typeName: ResourceTypes.Formats, value: "2" })
            .generate().forEach((testCase) => {
                it(testCase.description, (done) => {
                    try {
                        chai.request(server)
                            .get(testCase.resourceId)
                            .end((err, res) => {
                                if (testCase.testCase === TestCaseType.NonExisting) {
                                    Validators.validateErrorChaiResponse(res, 404, ErrorCodes.NotFoundError);
                                }
                                else {
                                    Validators.validateErrorChaiResponse(res, 404);
                                }
                                done();
                            });
                    }
                    catch (ex) {
                        assert.fail();
                    }
                });
            });
    });




    describe("/GET all type season service hymn format variations", () => {
        it("should get a type season service hymn format variations (text)", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/311/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body[0]);
                    Validators.validateTextContent(res.body[0].content);
                    done();
                });
        });

        it("should get a type season service hymn format variations (text) with comment", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/19/${ResourceTypes.Seasons}/24/${ResourceTypes.Hymns}/284/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body[0]);
                    Validators.validateTextContent(res.body[0].content);

                    res.body[0].content.paragraphs[0].should.have.property("isComment");
                    Validators.validateDoesNotInclude(res.body[0].content.paragraphs[0].columns[0].content, Constants.Tokens.commentStartTag);
                    done();
                });
        });

        it("should get a type season service hymn format variations (text) with common content", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/18/${ResourceTypes.Seasons}/33/${ResourceTypes.Hymns}/460/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body[0]);
                    Validators.validateTextContent(res.body[0].content);

                    res.body[0].content.paragraphs.forEach((paragraph) => {
                        paragraph.columns.forEach((col) => {
                            Validators.validateDoesNotInclude(col.content, "<common=");
                        });
                    });
                    done();
                });
        });

        it("should get a type season service hymn format variations (text) with short reason content", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/9/${ResourceTypes.Seasons}/6/${ResourceTypes.Hymns}/48/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body[0]);
                    Validators.validateTextContent(res.body[0].content);

                    res.body[0].content.paragraphs.forEach((paragraph) => {
                        paragraph.columns.forEach((col) => {
                            Validators.validateDoesNotInclude(col.content, Constants.Tokens.ReasonShort);
                        });
                    });
                    done();
                });
        });

        it("should get a type season service hymn format variations (text) with long reason content", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/331/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body[0]);
                    Validators.validateTextContent(res.body[0].content);

                    res.body[0].content.paragraphs.forEach((paragraph) => {
                        paragraph.columns.forEach((col) => {
                            Validators.validateDoesNotInclude(col.content, Constants.Tokens.ReasonLong);
                        });
                    });
                    done();
                });
        });

        it("should get a type season service hymn format variations (text) with reason & common content", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/11/${ResourceTypes.Seasons}/33/${ResourceTypes.Hymns}/456/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body[0]);
                    Validators.validateTextContent(res.body[0].content);

                    res.body[0].content.paragraphs.forEach((paragraph) => {
                        paragraph.columns.forEach((col) => {
                            Validators.validateDoesNotInclude(col.content, "<common=");
                            Validators.validateDoesNotInclude(col.content, "<reason_");
                        });
                    });
                    done();
                });
        });

        it("should get a type season service hymn format variations (hazzat)", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/311/${ResourceTypes.Formats}/2/${ResourceTypes.Variations}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body[0]);
                    Validators.validateHazzatContent(res.body[0].content);
                    done();
                });
        });

        it("should get a type season service hymn format variations (hazzat) with common content", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/2/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/377/${ResourceTypes.Formats}/2/${ResourceTypes.Variations}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body[0]);
                    Validators.validateHazzatContent(res.body[0].content);
                    Validators.validateDoesNotInclude(res.body[0].content.arabicHazzat, "<common=");
                    Validators.validateDoesNotInclude(res.body[0].content.copticHazzat, "<common=");
                    Validators.validateDoesNotInclude(res.body[0].content.englishHazzat, "<common=");
                    done();
                });
        });

        it("should get a type season service hymn format variations (vertical hazzat)", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/279/${ResourceTypes.Formats}/3/${ResourceTypes.Variations}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body[0]);
                    Validators.validateVerticalHazzatContent(res.body[0].content);
                    done();
                });
        });

        it("should get a type season service hymn format variations (vertical hazzat) with common content", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/2/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/377/${ResourceTypes.Formats}/3/${ResourceTypes.Variations}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body[0]);
                    Validators.validateVerticalHazzatContent(res.body[0].content);
                    Validators.validateDoesNotInclude(res.body[0].content.arabicVerticalHazzat, "<common=");
                    Validators.validateDoesNotInclude(res.body[0].content.copticVerticalHazzat, "<common=");
                    Validators.validateDoesNotInclude(res.body[0].content.englishVerticalHazzat, "<common=");
                    done();
                });
        });

        it("should get a type season service hymn format variations (Musical Notes)", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/11/${ResourceTypes.Seasons}/32/${ResourceTypes.Hymns}/334/${ResourceTypes.Formats}/4/${ResourceTypes.Variations}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body[0]);
                    Validators.validateMusicalNotesContent(res.body[0].content);
                    done();
                });
        });

        it("should get a type season service hymn format variations (audio)", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/15/${ResourceTypes.Seasons}/14/${ResourceTypes.Hymns}/162/${ResourceTypes.Formats}/5/${ResourceTypes.Variations}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body[0]);
                    Validators.validateAudioContent(res.body[0].content);
                    done();
                });
        });

        it("should get a type season service hymn format variations (video)", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/15/${ResourceTypes.Seasons}/14/${ResourceTypes.Hymns}/162/${ResourceTypes.Formats}/6/${ResourceTypes.Variations}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body[0]);
                    Validators.validateVideoContent(res.body[0].content);
                    done();
                });
        });

        it("should get a type season service hymn format variations (information)", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/15/${ResourceTypes.Seasons}/14/${ResourceTypes.Hymns}/162/${ResourceTypes.Formats}/7/${ResourceTypes.Variations}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body[0]);
                    Validators.validateInformationContent(res.body[0].content);
                    done();
                });
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Seasons, value: "17" })
            .withPart({ typeName: ResourceTypes.Services, value: "1" })
            .withPart({ typeName: ResourceTypes.Hymns, value: "311" })
            .withPart({ typeName: ResourceTypes.Formats, value: "1" })
            .generate().forEach((testCase) => {
                if (testCase.testCase === TestCaseType.NonExisting) {
                    it(`should return an empty array for non existing ${testCase.partUnderTest} ids`, (done) => {
                        chai.request(server)
                            .get(`${testCase.resourceId}/${ResourceTypes.Variations}`)
                            .end((err, res) => {
                                Validators.validateArrayChaiResponse(res, true);
                                done();
                            });
                    });
                }
                else {
                    it(testCase.description, (done) => {
                        try {
                            chai.request(server)
                                .get(`${testCase.resourceId}/${ResourceTypes.Seasons}`)
                                .end((err, res) => {
                                    Validators.validateErrorChaiResponse(res, 404);
                                    done();
                                });
                        }
                        catch (ex) {
                            assert.fail();
                        }
                    });
                }
            });
    });

    describe("/GET a type season service hymn format variation", () => {
        it("should get a type season service hymn content (text)", (done) => {
            const resourceId = `/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/311/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}/288`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body, resourceId);
                    Validators.validateTextContent(res.body.content);
                    done();
                });
        });

        it("should get a type season service hymn content (text) with comment content", (done) => {
            const resourceId = `/${ResourceTypes.Types}/19/${ResourceTypes.Seasons}/24/${ResourceTypes.Hymns}/284/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}/266`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body, resourceId);
                    Validators.validateTextContent(res.body.content);

                    res.body.content.paragraphs[0].should.have.property("isComment");
                    Validators.validateDoesNotInclude(res.body.content.paragraphs[0].columns[0].content, Constants.Tokens.commentStartTag);
                    done();
                });
        });

        it("should get a type season service hymn content (text) with common content", (done) => {
            const resourceId = `/${ResourceTypes.Types}/18/${ResourceTypes.Seasons}/33/${ResourceTypes.Hymns}/460/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}/721`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body, resourceId);
                    Validators.validateTextContent(res.body.content);

                    res.body.content.paragraphs.forEach((paragraph) => {
                        paragraph.columns.forEach((col) => {
                            Validators.validateDoesNotInclude(col.content, "<common=");
                        });
                    });
                    done();
                });
        });

        it("should get a type season service hymn content (text) with short reason content", (done) => {
            const resourceId = `/${ResourceTypes.Types}/9/${ResourceTypes.Seasons}/6/${ResourceTypes.Hymns}/48/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}/37`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body, resourceId);
                    Validators.validateTextContent(res.body.content);

                    res.body.content.paragraphs.forEach((paragraph) => {
                        paragraph.columns.forEach((col) => {
                            Validators.validateDoesNotInclude(col.content, Constants.Tokens.ReasonShort);
                        });
                    });
                    done();
                });
        });

        it("should get a type season service hymn content (text) with long reason content", (done) => {
            const resourceId = `/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/331/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}/302`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body, resourceId);
                    Validators.validateTextContent(res.body.content);

                    res.body.content.paragraphs.forEach((paragraph) => {
                        paragraph.columns.forEach((col) => {
                            Validators.validateDoesNotInclude(col.content, Constants.Tokens.ReasonLong);
                        });
                    });
                    done();
                });
        });

        it("should get a type season service hymn content (text) with reason & common content", (done) => {
            const resourceId = `/${ResourceTypes.Types}/11/${ResourceTypes.Seasons}/33/${ResourceTypes.Hymns}/456/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}/713`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body, resourceId);
                    Validators.validateTextContent(res.body.content);

                    res.body.content.paragraphs.forEach((paragraph) => {
                        paragraph.columns.forEach((col) => {
                            Validators.validateDoesNotInclude(col.content, "<common=");
                            Validators.validateDoesNotInclude(col.content, "<reason_");
                        });
                    });
                    done();
                });
        });

        it("should get a type season service hymn variation (hazzat)", (done) => {
            const resourceId = `/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/311/${ResourceTypes.Formats}/2/${ResourceTypes.Variations}/379`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body, resourceId);
                    Validators.validateHazzatContent(res.body.content);
                    done();
                });
        });

        it("should get a type season service hymn variation (hazzat) with common content", (done) => {
            const resourceId = `/${ResourceTypes.Types}/2/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/377/${ResourceTypes.Formats}/2/${ResourceTypes.Variations}/436`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body, resourceId);
                    Validators.validateHazzatContent(res.body.content);
                    Validators.validateDoesNotInclude(res.body.content.arabicHazzat, "<common=");
                    Validators.validateDoesNotInclude(res.body.content.copticHazzat, "<common=");
                    Validators.validateDoesNotInclude(res.body.content.englishHazzat, "<common=");
                    done();
                });
        });

        it("should get a type season service hymn format variation (vertical hazzat)", (done) => {
            const resourceId = `/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/279/${ResourceTypes.Formats}/3/${ResourceTypes.Variations}/622`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body, resourceId);
                    Validators.validateVerticalHazzatContent(res.body.content);
                    done();
                });
        });

        it("should get a type season service hymn format variation (vertical hazzat) with common content", (done) => {
            const resourceId = `/${ResourceTypes.Types}/2/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/377/${ResourceTypes.Formats}/3/${ResourceTypes.Variations}/546`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body, resourceId);
                    Validators.validateVerticalHazzatContent(res.body.content);
                    Validators.validateDoesNotInclude(res.body.content.arabicVerticalHazzat, "<common=");
                    Validators.validateDoesNotInclude(res.body.content.copticVerticalHazzat, "<common=");
                    Validators.validateDoesNotInclude(res.body.content.englishVerticalHazzat, "<common=");
                    done();
                });
        });

        it("should get a type season service hymn format variation (Musical Notes)", (done) => {
            const resourceId = `/${ResourceTypes.Types}/11/${ResourceTypes.Seasons}/32/${ResourceTypes.Hymns}/334/${ResourceTypes.Formats}/4/${ResourceTypes.Variations}/639`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body, resourceId);
                    Validators.validateMusicalNotesContent(res.body.content);
                    done();
                });
        });

        it("should get a type season service hymn format variation (audio)", (done) => {
            const resourceId = `/${ResourceTypes.Types}/15/${ResourceTypes.Seasons}/14/${ResourceTypes.Hymns}/162/${ResourceTypes.Formats}/5/${ResourceTypes.Variations}/703`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body, resourceId);
                    Validators.validateAudioContent(res.body.content);
                    done();
                });
        });

        it("should get a type season service hymn format variation (video)", (done) => {
            const resourceId = `/${ResourceTypes.Types}/15/${ResourceTypes.Seasons}/14/${ResourceTypes.Hymns}/162/${ResourceTypes.Formats}/6/${ResourceTypes.Variations}/704`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body, resourceId);
                    Validators.validateVideoContent(res.body.content);
                    done();
                });
        });

        it("should get a type season service hymn format variation (information)", (done) => {
            const resourceId = `/${ResourceTypes.Types}/15/${ResourceTypes.Seasons}/14/${ResourceTypes.Hymns}/162/${ResourceTypes.Formats}/7/${ResourceTypes.Variations}/705`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTypeServiceHymnFormatVariation(res.body, resourceId);
                    Validators.validateInformationContent(res.body.content);
                    done();
                });
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Seasons, value: "17" })
            .withPart({ typeName: ResourceTypes.Services, value: "1" })
            .withPart({ typeName: ResourceTypes.Hymns, value: "311" })
            .withPart({ typeName: ResourceTypes.Formats, value: "1" })
            .withPart({ typeName: ResourceTypes.Variations, value: "288" })
            .generate().forEach((testCase) => {
                it(testCase.description, (done) => {
                    try {
                        chai.request(server)
                            .get(testCase.resourceId)
                            .end((err, res) => {
                                if (testCase.testCase === TestCaseType.NonExisting) {
                                    Validators.validateErrorChaiResponse(res, 404, ErrorCodes.NotFoundError);
                                }
                                else {
                                    Validators.validateErrorChaiResponse(res, 404);
                                }
                                done();
                            });
                    }
                    catch (ex) {
                        assert.fail();
                    }
                });
            });
    });
});
