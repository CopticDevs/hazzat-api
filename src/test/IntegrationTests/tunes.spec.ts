import * as chai from "chai";
import { ErrorCodes } from "../../Common/Errors";
import { ResourceTypes } from "../../Routes/ResourceTypes";
import { Validators } from "../Helpers/Validators";
import chaiHttp = require("chai-http");
import server = require("../../app");

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

        it("should return a 404 for non existing tunes", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Tunes}/1234`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404, ErrorCodes.NotFoundError);
                    done();
                });
        });

        it("should return a 404 for negative tune ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Tunes}/-1`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer tune ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Tunes}/badInput`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
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

        it("should return a 404 for negative tune ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Tunes}/-1/${ResourceTypes.Seasons}`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer tune ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Tunes}/badInput/${ResourceTypes.Seasons}`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
                });
        });

        it("should return an empty array for non existing tune ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Tunes}/1234/${ResourceTypes.Seasons}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res, true);
                    done();
                });
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

        it("should return a 404 for negative tune ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Tunes}/-1/${ResourceTypes.Seasons}/33`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for negative season ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Tunes}/1/${ResourceTypes.Seasons}/-1`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer tune ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Tunes}/badInput/${ResourceTypes.Seasons}/33`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer season ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Tunes}/1/${ResourceTypes.Seasons}/badInput`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non existing tune id", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Tunes}/1234/${ResourceTypes.Seasons}/33`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404, ErrorCodes.NotFoundError);
                    done();
                });
        });

        it("should return a 404 for non existing season", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Tunes}/1/${ResourceTypes.Seasons}/1234`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404, ErrorCodes.NotFoundError);
                    done();
                });
        });
    });
});
