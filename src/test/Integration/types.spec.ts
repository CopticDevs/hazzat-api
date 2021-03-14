import * as chai from "chai";
import { ErrorCodes } from "../../Common/Errors";
import { ResourceTypes } from "../../Routes/ResourceTypes";
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
                    Validators.validateArrayResponse(res);
                    Validators.validateHymnType(res.body[0]);
                    done();
                });
        });
    });

    describe("/GET a type", () => {
        it("should get a single type", (done) => {
            const resourceId = `/${ResourceTypes.Types}/1`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectResponse(res);
                    Validators.validateHymnType(res.body, resourceId);
                    done();
                });
        });

        it("should return a 404 for non existing types", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/1234`)
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404, ErrorCodes.NotFoundError);
                    done();
                });
        });

        it("should return a 404 for negative type ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/-1`)
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer type ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/badInput`)
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });
    });
});
