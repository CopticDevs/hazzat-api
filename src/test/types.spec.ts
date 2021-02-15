import * as chai from "chai";
import { ResourceTypes } from "../Routes/ResourceTypes";
import { Validators } from "./Helpers/Validators";
import chaiHttp = require("chai-http");
import server = require("../app");

process.env.NODE_ENV = "test";

chai.use(chaiHttp);

describe("Types controller", () => {
    describe("/GET all types", () => {
        it("should get all types", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}`)
                .end((err, res) => {
                    Validators.validateArrayResponse(res);
                    Validators.validateTypeResponse(res.body[0]);
                    done();
                });
        });
    });
});
