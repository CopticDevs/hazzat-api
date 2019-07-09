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
                    done();
                });
        });

        it("should get a single season", (done) => {
            chai.request(server)
                .get("/seasons/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("name");
                    res.body.should.have.property("order");
                    res.body.should.have.property("reasonId");
                    res.body.should.have.property("verse");
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
});
