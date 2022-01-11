import * as chai from "chai";
import { assert } from "chai";
import { ErrorCodes } from "../../Common/Errors";
import { ResourceTypes } from "../../Routes/ResourceTypes";
import { Validators } from "../Helpers/Validators";
import chaiHttp = require("chai-http");
import server = require("../../app");
import { ApiValidator, TestCaseType } from "../Helpers/ApiValidator";

process.env.NODE_ENV = "test";

chai.use(chaiHttp);

describe("Tunes controller", () => {

    describe("/GET all tunes", () => {
        it("should get all tunes", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Tunes}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res);
                    Validators.validateHymnTune(res.body[0]);
                    done();
                });
        });
    });

    describe("/GET a tune", () => {
        it("should get a single tune", (done) => {
            const resourceId = `/${ResourceTypes.Tunes}/1`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateHymnTune(res.body, resourceId);
                    done();
                });
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Tunes, value: "1" })
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

    describe("/GET all tune seasons", () => {
        it("should get all tune seasons", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Tunes}/1/${ResourceTypes.Seasons}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res);
                    Validators.validateTuneSeason(res.body[0]);
                    done();
                });
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Tunes, value: "1" })
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

    describe("/GET a tune season", () => {
        it("should get a tune season", (done) => {
            const resourceId = `/${ResourceTypes.Tunes}/1/${ResourceTypes.Seasons}/33`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTuneSeason(res.body, resourceId);
                    done();
                });
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Tunes, value: "1" })
            .withPart({ typeName: ResourceTypes.Seasons, value: "33" })
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

    describe("/GET all hymns in a tune season", () => {
        it("should get all hymns in a tune season", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Tunes}/1/${ResourceTypes.Seasons}/33/${ResourceTypes.Hymns}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res);
                    Validators.validateTuneServiceHymnWithServiceDetails(res.body[0]);
                    done();
                });
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Tunes, value: "1" })
            .withPart({ typeName: ResourceTypes.Seasons, value: "33" })
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

    describe("/GET a hymn tune season", () => {
        it("should get a hymn tune season", (done) => {
            const resourceId = `/${ResourceTypes.Tunes}/1/${ResourceTypes.Seasons}/33/${ResourceTypes.Hymns}/456`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTuneServiceHymnWithServiceDetails(res.body, resourceId);
                    done();
                });
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Tunes, value: "1" })
            .withPart({ typeName: ResourceTypes.Seasons, value: "33" })
            .withPart({ typeName: ResourceTypes.Hymns, value: "456" })
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
