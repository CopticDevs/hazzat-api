import * as chai from "chai";
import chaiHttp = require("chai-http");
import server = require("../app");
import { ErrorCodes } from "../Common/Errors";
const should = chai.should();

process.env.NODE_ENV = "test";

chai.use(chaiHttp);

describe("Services", () => {
    describe("/GET Service Hymns", () => {
        it("should get all service hymns", (done) => {
            chai.request(server)
                .get("/services/73/hymns")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.length.should.be.not.eql(0);
                    res.body[0].should.have.property("id");
                    res.body[0].should.have.property("name");
                    res.body[0].should.have.property("order");
                    res.body[0].should.have.property("contentCount");
                    const contentCount = res.body[0].contentCount;
                    contentCount.should.have.property("Text");
                    contentCount.should.have.property("Hazzat");
                    contentCount.should.have.property("VerticalHazzat");
                    contentCount.should.have.property("Music");
                    contentCount.should.have.property("Audio");
                    contentCount.should.have.property("Video");
                    contentCount.should.have.property("Information");
                    done();
                });
        });

        it("should return a 404 for negative service ids", (done) => {
            chai.request(server)
                .get("/services/-1/hymns")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message");
                    done();
                });
        });

        it("should return a 404 for non integer service ids", (done) => {
            chai.request(server)
                .get("/services/badInput/hymns")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a("object");
                    res.body.should.have.property("message");
                    done();
                });
        });

        it("should return an empty array for non existing season ids", (done) => {
            chai.request(server)
                .get("/services/1234/hymns")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
});
