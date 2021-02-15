import * as chai from "chai";
import { ResourceTypes } from "../Routes/ResourceTypes";
import { Validators } from "./Helpers/Validators";
import chaiHttp = require("chai-http");
import server = require("../app");

process.env.NODE_ENV = "test";

chai.use(chaiHttp);

describe("Tunes controller", () => {
    describe("/GET all tunes", () => {
        it("should get all tunes", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Tunes}`)
                .end((err, res) => {
                    Validators.validateArrayResponse(res);
                    Validators.validateTuneResponse(res.body[0]);
                    done();
                });
        });
    });
});
