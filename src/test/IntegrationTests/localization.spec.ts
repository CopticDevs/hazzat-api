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

    describe("Types localization tests", () => {
        it("should get a Type in English", (done) => {
            const resourceId = `/${ResourceTypes.Types}/17`;
            chai.request(server)
                .get(resourceId)
                .set("Accept-Language", "en")
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateHymnType(res.body, resourceId);
                    assert.equal(res.body.name, "Psalmody Hymns");
                    assert.equal(res.body.nameSingular, "Psalmody");
                    done();
                });
        });

        it("should get a Type in Arabic", (done) => {
            const resourceId = `/${ResourceTypes.Types}/17`;
            chai.request(server)
                .get(resourceId)
                .set("Accept-Language", "ar")
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateHymnType(res.body, resourceId);
                    assert.equal(res.body.name, "تسابيح");
                    assert.equal(res.body.nameSingular, "تسبحة");
                    done();
                });
        });
    });

    describe("Type Season localization tests", () => {
        it("should get a Type Season in English", (done) => {
            const resourceId = `/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1`;
            chai.request(server)
                .get(resourceId)
                .set("Accept-Language", "en")
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTypeSeason(res.body, resourceId);
                    assert.equal(res.body.name, "Annual");
                    assert.isTrue(res.body.verse.startsWith("\"How lovely is Your tabernacle, O Lord of hosts!"));
                    done();
                });
        });

        it("should get a Type Season in Arabic", (done) => {
            const resourceId = `/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1`;
            chai.request(server)
                .get(resourceId)
                .set("Accept-Language", "ar")
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTypeSeason(res.body, resourceId);
                    assert.equal(res.body.name, "سنوي");
                    assert.isTrue(res.body.verse.startsWith("\"ما أحلى مساكنك يا رب الجنود"));
                    done();
                });
        });
    });

    describe("Type Season hymns localization tests", () => {
        it("should get a Type Season hymn in English", (done) => {
            const resourceId = `/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/311`;
            chai.request(server)
                .get(resourceId)
                .set("Accept-Language", "en")
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTypeServiceHymnWithServiceDetails(res.body, resourceId);
                    assert.equal(res.body.name, "Psalm 116 (Ni Ethnos Teero)");
                    assert.equal(res.body.serviceName, "Vespers Psalmody");
                    done();
                });
        });

        it("should get a Type Season hymn in Arabic", (done) => {
            const resourceId = `/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/311`;
            chai.request(server)
                .get(resourceId)
                .set("Accept-Language", "ar")
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTypeServiceHymnWithServiceDetails(res.body, resourceId);
                    assert.equal(res.body.name, "المزمور المائة والسادس عشر (ني إثنوس تيرو)");
                    assert.equal(res.body.serviceName, "تسبحة عشية");
                    done();
                });
        });
    });

    describe("Type Season hymn Formats localization tests", () => {
        it("should get a Type Season hymn Format in English", (done) => {
            const resourceId = `/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/311/${ResourceTypes.Formats}/2`;
            chai.request(server)
                .get(resourceId)
                .set("Accept-Language", "en")
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTypeServiceHymnFormat(res.body, resourceId);
                    assert.equal(res.body.name, "Hazzat");
                    done();
                });
        });

        it("should get a Type Season hymn Format in Arabic", (done) => {
            const resourceId = `/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/311/${ResourceTypes.Formats}/2`;
            chai.request(server)
                .get(resourceId)
                .set("Accept-Language", "ar")
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTypeServiceHymnFormat(res.body, resourceId);
                    assert.equal(res.body.name, "هزّات");
                    done();
                });
        });
    });

    describe("Tunes localization tests", () => {
        it("should get a Tune in Arabic", (done) => {
            const resourceId = `/${ResourceTypes.Tunes}/1`;
            chai.request(server)
                .get(resourceId)
                .set("Accept-Language", "en")
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateHymnTune(res.body, resourceId);
                    assert.equal(res.body.name, "Annual");
                    done();
                });
        });

        it("should get a Tune in Arabic", (done) => {
            const resourceId = `/${ResourceTypes.Tunes}/1`;
            chai.request(server)
                .get(resourceId)
                .set("Accept-Language", "ar")
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateHymnTune(res.body, resourceId);
                    assert.equal(res.body.name, "سنوي");
                    done();
                });
        });
    });

    describe("Tune Season localization tests", () => {
        it("should get a Tune Season in English", (done) => {
            const resourceId = `/${ResourceTypes.Tunes}/1/${ResourceTypes.Seasons}/33`;
            chai.request(server)
                .get(resourceId)
                .set("Accept-Language", "en")
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTuneSeason(res.body, resourceId);
                    assert.equal(res.body.name, "Papal Hymns");
                    assert.isTrue(res.body.verse.startsWith("\"Your people shall be volunteers in the day of Your power"));
                    done();
                });
        });

        it("should get a Tune Season in Arabic", (done) => {
            const resourceId = `/${ResourceTypes.Tunes}/1/${ResourceTypes.Seasons}/33`;
            chai.request(server)
                .get(resourceId)
                .set("Accept-Language", "ar")
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTuneSeason(res.body, resourceId);
                    assert.equal(res.body.name, "الحآن البطاركة");
                    assert.isTrue(res.body.verse.startsWith("شعبك مُنتدب في يوم قوتك في زينة مقدسة من رحم الفجر."));
                    done();
                });
        });
    });

    describe("Tune Season hymns localization tests", () => {
        it("should get a Tune Season hymn in English", (done) => {
            const resourceId = `/${ResourceTypes.Tunes}/1/${ResourceTypes.Seasons}/33/${ResourceTypes.Hymns}/456`;
            chai.request(server)
                .get(resourceId)
                .set("Accept-Language", "en")
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTuneServiceHymnWithServiceDetails(res.body, resourceId);
                    assert.equal(res.body.name, "O King of Peace (Epouro)");
                    assert.equal(res.body.serviceName, "Procession");
                    done();
                });
        });

        it("should get a Tune Season hymn in Arabic", (done) => {
            const resourceId = `/${ResourceTypes.Tunes}/1/${ResourceTypes.Seasons}/33/${ResourceTypes.Hymns}/456`;
            chai.request(server)
                .get(resourceId)
                .set("Accept-Language", "ar")
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTuneServiceHymnWithServiceDetails(res.body, resourceId);
                    assert.equal(res.body.name, "يا ملك السلام (أبؤورو)");
                    assert.equal(res.body.serviceName, "زفّة");
                    done();
                });
        });
    });

    describe("Tune Season hymn Formats localization tests", () => {
        it("should get a Tune Season hymn Format in English", (done) => {
            const resourceId = `/${ResourceTypes.Tunes}/1/${ResourceTypes.Seasons}/33/${ResourceTypes.Hymns}/456/${ResourceTypes.Formats}/1`;
            chai.request(server)
                .get(resourceId)
                .set("Accept-Language", "en")
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTuneServiceHymnFormat(res.body, resourceId);
                    assert.equal(res.body.name, "Text");
                    done();
                });
        });

        it("should get a Tune Season hymn Format in Arabic", (done) => {
            const resourceId = `/${ResourceTypes.Tunes}/1/${ResourceTypes.Seasons}/33/${ResourceTypes.Hymns}/456/${ResourceTypes.Formats}/1`;
            chai.request(server)
                .get(resourceId)
                .set("Accept-Language", "ar")
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTuneServiceHymnFormat(res.body, resourceId);
                    assert.equal(res.body.name, "نَص");
                    done();
                });
        });
    });
});
