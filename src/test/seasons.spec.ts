import * as chai from "chai";
import chaiHttp = require("chai-http");
import server = require("../app");
const should = chai.should();

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
    });
});
