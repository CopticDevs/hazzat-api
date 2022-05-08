import * as chai from "chai";
import { assert } from "chai";
import { ResourceTypes } from "../../Routes/ResourceTypes";
import { Validators } from "../Helpers/Validators";
import chaiHttp = require("chai-http");
import server = require("../../app");

process.env.NODE_ENV = "test";

chai.use(chaiHttp);

describe("Localization Tests", () => {
    it("should get english for no headers", (done) => {
        const resourceId = `/${ResourceTypes.Seasons}/2`;
        chai.request(server)
            .get(resourceId)
            .end((err, res) => {
                Validators.validateObjectChaiResponse(res);
                Validators.validateSeason(res.body, resourceId);
                assert.equal(res.body.name, "Nairouz");
                assert.equal(res.body.verse, "Bless the crown of the year with Your goodness O Lord");
                done();
            });
    });

    it("should get english for en header", (done) => {
        const resourceId = `/${ResourceTypes.Seasons}/2`;
        chai.request(server)
            .get(resourceId)
            .set("Accept-Language", "en")
            .end((err, res) => {
                Validators.validateObjectChaiResponse(res);
                Validators.validateSeason(res.body, resourceId);
                assert.equal(res.body.name, "Nairouz");
                assert.equal(res.body.verse, "Bless the crown of the year with Your goodness O Lord");
                done();
            });
    });

    it("should get english for en-US header", (done) => {
        const resourceId = `/${ResourceTypes.Seasons}/2`;
        chai.request(server)
            .get(resourceId)
            .set("Accept-Language", "en-US")
            .end((err, res) => {
                Validators.validateObjectChaiResponse(res);
                Validators.validateSeason(res.body, resourceId);
                assert.equal(res.body.name, "Nairouz");
                assert.equal(res.body.verse, "Bless the crown of the year with Your goodness O Lord");
                done();
            });
    });

    it("should get english for fr header", (done) => {
        const resourceId = `/${ResourceTypes.Seasons}/2`;
        chai.request(server)
            .get(resourceId)
            .set("Accept-Language", "fr")
            .end((err, res) => {
                Validators.validateObjectChaiResponse(res);
                Validators.validateSeason(res.body, resourceId);
                assert.equal(res.body.name, "Nairouz");
                assert.equal(res.body.verse, "Bless the crown of the year with Your goodness O Lord");
                done();
            });
    });

    it("should get english for bad header", (done) => {
        const resourceId = `/${ResourceTypes.Seasons}/2`;
        chai.request(server)
            .get(resourceId)
            .set("Accept-Language", "bad")
            .end((err, res) => {
                Validators.validateObjectChaiResponse(res);
                Validators.validateSeason(res.body, resourceId);
                assert.equal(res.body.name, "Nairouz");
                assert.equal(res.body.verse, "Bless the crown of the year with Your goodness O Lord");
                done();
            });
    });

    it("should get english for qualified header", (done) => {
        const resourceId = `/${ResourceTypes.Seasons}/2`;
        chai.request(server)
            .get(resourceId)
            .set("Accept-Language", "en;q=0.9,ar;q=0.8")
            .end((err, res) => {
                Validators.validateObjectChaiResponse(res);
                Validators.validateSeason(res.body, resourceId);
                assert.equal(res.body.name, "Nairouz");
                assert.equal(res.body.verse, "Bless the crown of the year with Your goodness O Lord");
                done();
            });
    });

    it("should get english for unordered qualified header", (done) => {
        const resourceId = `/${ResourceTypes.Seasons}/2`;
        chai.request(server)
            .get(resourceId)
            .set("Accept-Language", "ar;q=0.8,en;q=0.9")
            .end((err, res) => {
                Validators.validateObjectChaiResponse(res);
                Validators.validateSeason(res.body, resourceId);
                assert.equal(res.body.name, "Nairouz");
                assert.equal(res.body.verse, "Bless the crown of the year with Your goodness O Lord");
                done();
            });
    });

    it("should get arabic for ar header", (done) => {
        const resourceId = `/${ResourceTypes.Seasons}/2`;
        chai.request(server)
            .get(resourceId)
            .set("Accept-Language", "ar")
            .end((err, res) => {
                Validators.validateObjectChaiResponse(res);
                Validators.validateSeason(res.body, resourceId);
                assert.equal(res.body.name, "نيروز");
                assert.equal(res.body.verse, "بارك إكليل السنة بصلاحك يا رب");
                done();
            });
    });

    it("should get arabic for ar-AR header", (done) => {
        const resourceId = `/${ResourceTypes.Seasons}/2`;
        chai.request(server)
            .get(resourceId)
            .set("Accept-Language", "ar-AR")
            .end((err, res) => {
                Validators.validateObjectChaiResponse(res);
                Validators.validateSeason(res.body, resourceId);
                assert.equal(res.body.name, "نيروز");
                assert.equal(res.body.verse, "بارك إكليل السنة بصلاحك يا رب");
                done();
            });
    });

    it("should get arabic for qualified header", (done) => {
        const resourceId = `/${ResourceTypes.Seasons}/2`;
        chai.request(server)
            .get(resourceId)
            .set("Accept-Language", "ar;q=0.9,en;q=0.8")
            .end((err, res) => {
                Validators.validateObjectChaiResponse(res);
                Validators.validateSeason(res.body, resourceId);
                assert.equal(res.body.name, "نيروز");
                assert.equal(res.body.verse, "بارك إكليل السنة بصلاحك يا رب");
                done();
            });
    });

    it("should get arabic for unordered qualified header", (done) => {
        const resourceId = `/${ResourceTypes.Seasons}/2`;
        chai.request(server)
            .get(resourceId)
            .set("Accept-Language", "en;q=0.8,ar;q=0.9")
            .end((err, res) => {
                Validators.validateObjectChaiResponse(res);
                Validators.validateSeason(res.body, resourceId);
                assert.equal(res.body.name, "نيروز");
                assert.equal(res.body.verse, "بارك إكليل السنة بصلاحك يا رب");
                done();
            });
    });
});
