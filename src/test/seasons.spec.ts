import * as chai from "chai";
import chaiHttp = require("chai-http");
import server = require("../app");
import { ErrorCodes } from "../Common/Errors";
const should = chai.should();

process.env.NODE_ENV = "test";

chai.use(chaiHttp);

describe("Seasons", () => {
    describe("/GET Seasons", () => {
        it("should get all seasons", (done) => {
            chai.request(server)
                .get("/seasons")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.length.should.be.not.eql(0);
                    res.body[0].should.have.property("id");
                    res.body[0].should.have.property("name");
                    res.body[0].should.have.property("order");
                    res.body[0].should.have.property("verse");
                    res.body[0].should.have.property("isDateSpecific");
                    done();
                });
        });

        it("should get a single season", (done) => {
            chai.request(server)
                .get("/seasons/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("id");
                    res.body.should.have.property("name");
                    res.body.should.have.property("order");
                    res.body.should.have.property("verse");
                    res.body.should.have.property("isDateSpecific");
                    done();
                });
        });

        it("should return a 404 for non existing seasons", (done) => {
            chai.request(server)
                .get("/seasons/1234")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a("object");
                    res.body.should.have.property("errorCode");
                    res.body.should.have.property("errorCode").eql(ErrorCodes[ErrorCodes.NotFoundError]);
                    res.body.should.have.property("message");
                    done();
                });
        });

        it("should return a 404 for negative season ids", (done) => {
            chai.request(server)
                .get("/seasons/-1")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message");
                    done();
                });
        });

        it("should return a 404 for non integer season ids", (done) => {
            chai.request(server)
                .get("/seasons/badInput")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message");
                    done();
                });
        });
    });

    describe("/GET Season Services", () => {
        it("should get all season services", (done) => {
            chai.request(server)
                .get("/seasons/1/services")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.length.should.be.not.eql(0);
                    res.body[0].should.have.property("id");
                    res.body[0].should.have.property("seasonId");
                    res.body[0].should.have.property("serviceId");
                    res.body[0].should.have.property("name");
                    res.body[0].should.have.property("order");
                    done();
                });
        });

        it("should return a 404 for negative season ids", (done) => {
            chai.request(server)
                .get("/seasons/-1/services")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message");
                    done();
                });
        });

        it("should return a 404 for non integer season ids", (done) => {
            chai.request(server)
                .get("/seasons/badInput/services")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message");
                    done();
                });
        });

        it("should return an empty array for non existing season ids", (done) => {
            chai.request(server)
                .get("/seasons/1234/services")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe("/GET Season Service by season id and service id", () => {
        it("should get a season services", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("id");
                    res.body.should.have.property("seasonId");
                    res.body.should.have.property("serviceId");
                    res.body.should.have.property("name");
                    res.body.should.have.property("order");
                    done();
                });
        });

        it("should return a 404 for negative season ids", (done) => {
            chai.request(server)
                .get("/seasons/-1/services/1")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message");
                    done();
                });
        });

        it("should return a 404 for negative service ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/-1")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message");
                    done();
                });
        });

        it("should return a 404 for non integer season ids", (done) => {
            chai.request(server)
                .get("/seasons/badInput/services")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message");
                    done();
                });
        });

        it("should return a 404 for non integer service ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/badInput")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message");
                    done();
                });
        });

        it("should return a 404 for non existing season id for service", (done) => {
            chai.request(server)
                .get("/seasons/1234/services/1")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a("object");
                    res.body.should.have.property("errorCode");
                    res.body.should.have.property("errorCode").eql(ErrorCodes[ErrorCodes.NotFoundError]);
                    res.body.should.have.property("message");
                    done();
                });
        });

        it("should return a 404 for non existing service id for service", (done) => {
            chai.request(server)
                .get("/seasons/1/services/1234")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a("object");
                    res.body.should.have.property("errorCode");
                    res.body.should.have.property("errorCode").eql(ErrorCodes[ErrorCodes.NotFoundError]);
                    res.body.should.have.property("message");
                    done();
                });
        });
    });
});
