import * as chai from "chai";
import { ErrorCodes } from "../../Common/Errors";
import { ResourceTypes } from "../../Routes/ResourceTypes";
import { Validators } from "../Helpers/Validators";
import chaiHttp = require("chai-http");
import server = require("../../app");

process.env.NODE_ENV = "test";

chai.use(chaiHttp);

describe("Types controller", () => {

    describe("/GET all types", () => {
        it("should get all types", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res);
                    Validators.validateHymnType(res.body[0]);
                    done();
                });
        });
    });

    describe("/GET a type", () => {
        it("should get a single type", (done) => {
            const resourceId = `/${ResourceTypes.Types}/1`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateHymnType(res.body, resourceId);
                    done();
                });
        });

        it("should return a 404 for non existing types", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/1234`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404, ErrorCodes.NotFoundError);
                    done();
                });
        });

        it("should return a 404 for negative type ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/-1`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer type ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/badInput`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
                });
        });
    });

    describe("/GET all type seasons", () => {
        it("should get all type seasons", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res);
                    Validators.validateTypeSeason(res.body[0]);
                    done();
                });
        });

        it("should return a 404 for negative type ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/-1/${ResourceTypes.Seasons}`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer type ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/badInput/${ResourceTypes.Seasons}`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
                });
        });

        it("should return an empty array for non existing type ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/1234/${ResourceTypes.Seasons}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res, true);
                    done();
                });
        });
    });

    describe("/GET a type season", () => {
        it("should get a type season", (done) => {
            const resourceId = `/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTypeSeason(res.body, resourceId);
                    done();
                });
        });

        it("should return a 404 for negative type ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/-1/${ResourceTypes.Seasons}/1`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for negative season ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/-1`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer type ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/badInput/${ResourceTypes.Seasons}/1`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer season ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/badInput`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non existing type id", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/1234/${ResourceTypes.Seasons}/1`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404, ErrorCodes.NotFoundError);
                    done();
                });
        });

        it("should return a 404 for non existing season", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1234`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404, ErrorCodes.NotFoundError);
                    done();
                });
        });
    });

    describe("/GET all hymns in a type season", () => {
        it("should get all hymns in a type season", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res);
                    Validators.validateTypeServiceHymnWithServiceDetails(res.body[0]);
                    done();
                });
        });

        it("should return a 404 for negative type ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/-1/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for negative season ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/-1/${ResourceTypes.Hymns}`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer type ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/badInput/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer season ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/badInput/${ResourceTypes.Hymns}`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
                });
        });

        it("should return an empty array for non existing type ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/1234/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res, true);
                    done();
                });
        });

        it("should return an empty array for non existing season ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1234/${ResourceTypes.Hymns}`)
                .end((err, res) => {
                    Validators.validateArrayChaiResponse(res, true);
                    done();
                });
        });
    });

    describe("/GET a hymn type season", () => {
        it("should get a hymn type season", (done) => {
            const resourceId = `/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/311`;
            chai.request(server)
                .get(resourceId)
                .end((err, res) => {
                    Validators.validateObjectChaiResponse(res);
                    Validators.validateTypeServiceHymnWithServiceDetails(res.body, resourceId);
                    done();
                });
        });

        it("should return a 404 for negative type ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/-1/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/311`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for negative season ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/-1/${ResourceTypes.Hymns}/311`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for negative hymn ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/-1`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer type ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/badInput/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/311`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer season ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/badInput/${ResourceTypes.Hymns}/311`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer hymn ids", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/badInput`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non existing type id", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/1234/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/311`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404, ErrorCodes.NotFoundError);
                    done();
                });
        });

        it("should return a 404 for non existing season", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1234/${ResourceTypes.Hymns}/311`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404, ErrorCodes.NotFoundError);
                    done();
                });
        });

        it("should return a 404 for non existing hymn", (done) => {
            chai.request(server)
                .get(`/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/1234`)
                .end((err, res) => {
                    Validators.validateErrorChaiResponse(res, 404, ErrorCodes.NotFoundError);
                    done();
                });
        });
    });
});
