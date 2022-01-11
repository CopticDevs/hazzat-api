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
});
