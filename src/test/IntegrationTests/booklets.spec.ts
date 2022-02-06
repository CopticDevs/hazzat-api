import * as chai from "chai";
import { assert } from "chai";
import { ErrorCodes } from "../../Common/Errors";
import { ResourceTypes } from "../../Routes/ResourceTypes";
import { ApiValidator, TestCaseType } from "../Helpers/ApiValidator";
import { Validators } from "../Helpers/Validators";
import chaiHttp = require("chai-http");
import server = require("../../app");

process.env.NODE_ENV = "test";

chai.use(chaiHttp);

describe("Booklets controller", () => {
    describe("/GET all booklets", () => {
        it("should get all booklets", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Booklets}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res);
                    Validators.validateBooklet(res.body[0]);
                    done();
                });
        });
    });

    describe("/GET a booklet", () => {
        it("should get a single booklet", (done) => {
            const resourceId = `/${ResourceTypes.Booklets}/1`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateBooklet(res.body, resourceId);
                    done();
                });
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Booklets, value: "1" })
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
