import * as chai from "chai";
import { assert } from "chai";
import { ResourceTypes } from "../../Routes/ResourceTypes";
import { Validators } from "../Helpers/Validators";
import chaiHttp = require("chai-http");
import server = require("../../app");

process.env.NODE_ENV = "test";

chai.use(chaiHttp);

describe("Localization Tests", () => {
    describe("Header parsing tests", () => {
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

    describe("Season localization tests", () => {
        it("should get a season in English", (done) => {
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

        it("should get a season in Arabic", (done) => {
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
    });

    describe("Service localization tests", () => {
        it("should get a service in English", (done) => {
            const resourceId = `/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/15`;
            chai.request(server)
                .get(resourceId)
                .set("Accept-Language", "en")
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateService(res.body, resourceId);
                    assert.equal(res.body.name, "Vespers Psalmody");
                    done();
                });
        });

        it("should get a service in Arabic", (done) => {
            const resourceId = `/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/15`;
            chai.request(server)
                .get(resourceId)
                .set("Accept-Language", "ar")
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateService(res.body, resourceId);
                    assert.equal(res.body.name, "تسبحة عشية");
                    done();
                });
        });
    });

    describe("Service Hymn localization tests", () => {
        it("should get a service Hymn in English", (done) => {
            const resourceId = `/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/15/${ResourceTypes.Hymns}/311`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateServiceHymn(res.body, resourceId);
                    assert.equal(res.body.name, "Psalm 116 (Ni Ethnos Teero)");
                    done();
                });
        });

        it("should get a service Hymn in Arabic", (done) => {
            const resourceId = `/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/15/${ResourceTypes.Hymns}/311`;
            chai.request(server)
                .get(resourceId)
                .set("Accept-Language", "ar")
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateServiceHymn(res.body, resourceId);
                    assert.equal(res.body.name, "المزمور المائة والسادس عشر (ني إثنوس تيرو)");
                    done();
                });
        });
    });

    describe("Format localization tests", () => {
        it("should get a Format in English", (done) => {
            const resourceId = `/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/15/${ResourceTypes.Hymns}/311/${ResourceTypes.Formats}/1`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateServiceHymnFormat(res.body, resourceId);
                    assert.equal(res.body.name, "Text");
                    done();
                });
        });

        it("should get a Format in Arabic", (done) => {
            const resourceId = `/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/15/${ResourceTypes.Hymns}/311/${ResourceTypes.Formats}/1`;
            chai.request(server)
                .get(resourceId)
                .set("Accept-Language", "ar")
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateServiceHymnFormat(res.body, resourceId);
                    assert.equal(res.body.name, "نَص");
                    done();
                });
        });
    });

    describe("Variation localization tests", () => {
        it("should get a Variation in English", (done) => {
            const resourceId = `/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/15/${ResourceTypes.Hymns}/311/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}/288`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTextContent(res.body.content);
                    assert.equal(res.body.name, "Psalm 116 (Ni Ethnos Teero)");
                    done();
                });
        });

        it("should get a Variation in Arabic", (done) => {
            const resourceId = `/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/15/${ResourceTypes.Hymns}/311/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}/288`;
            chai.request(server)
                .get(resourceId)
                .set("Accept-Language", "ar")
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTextContent(res.body.content);
                    assert.equal(res.body.name, "المزمور المائة والسادس عشر (ني إثنوس تيرو)");
                    done();
                });
        });
    });
});
