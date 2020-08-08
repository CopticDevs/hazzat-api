import * as chai from "chai";
import chaiHttp = require("chai-http");
import server = require("../app");
import { ErrorCodes } from "../Common/Errors";
import { Validators } from "./Helpers/Validators";
const should = chai.should();

process.env.NODE_ENV = "test";

chai.use(chaiHttp);

describe("Seasons controller", () => {
    describe("/GET all seasons", () => {
        it("should get all seasons", (done) => {
            chai.request(server)
                .get("/seasons")
                .end((err, res) => {
                    Validators.validateArrayResponse(res);
                    Validators.validateSeasonResponse(res.body[0]);
                    done();
                });
        });
    });

    describe("/GET a season", () => {
        it("should get a single season", (done) => {
            chai.request(server)
                .get("/seasons/1")
                .end((err, res) => {
                    Validators.validateObjectResponse(res);
                    Validators.validateSeasonResponse(res.body);
                    done();
                });
        });

        it("should return a 404 for non existing seasons", (done) => {
            chai.request(server)
                .get("/seasons/1234")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404, ErrorCodes.NotFoundError);
                    done();
                });
        });

        it("should return a 404 for negative season ids", (done) => {
            chai.request(server)
                .get("/seasons/-1")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer season ids", (done) => {
            chai.request(server)
                .get("/seasons/badInput")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });
    });

    describe("/GET all season services", () => {
        it("should get all season services", (done) => {
            chai.request(server)
                .get("/seasons/1/services")
                .end((err, res) => {
                    Validators.validateArrayResponse(res);
                    Validators.validateServiceResponse(res.body[0]);
                    done();
                });
        });

        it("should return a 404 for negative season ids", (done) => {
            chai.request(server)
                .get("/seasons/-1/services")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer season ids", (done) => {
            chai.request(server)
                .get("/seasons/badInput/services")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return an empty array for non existing season ids", (done) => {
            chai.request(server)
                .get("/seasons/1234/services")
                .end((err, res) => {
                    Validators.validateArrayResponse(res, true);
                    done();
                });
        });
    });

    describe("/GET a season service", () => {
        it("should get a season services", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15")
                .end((err, res) => {
                    Validators.validateObjectResponse(res);
                    Validators.validateServiceResponse(res.body);
                    done();
                });
        });

        it("should return a 404 for negative season ids", (done) => {
            chai.request(server)
                .get("/seasons/-1/services/1")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for negative service ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/-1")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer season ids", (done) => {
            chai.request(server)
                .get("/seasons/badInput/services")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer service ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/badInput")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non existing season id", (done) => {
            chai.request(server)
                .get("/seasons/1234/services/1")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404, ErrorCodes.NotFoundError);
                    done();
                });
        });

        it("should return a 404 for non existing service", (done) => {
            chai.request(server)
                .get("/seasons/1/services/1234")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404, ErrorCodes.NotFoundError);
                    done();
                });
        });
    });

    describe("/GET all season service hymns", () => {
        it("should get all season service hymns", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns")
                .end((err, res) => {
                    Validators.validateArrayResponse(res);
                    Validators.validateServiceHymnResponse(res.body[0]);
                    done();
                });
        });

        it("should return a 404 for negative season ids", (done) => {
            chai.request(server)
                .get("/seasons/-1/services/15/serviceHymns")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for negative service ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/-1/serviceHymns")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer season ids", (done) => {
            chai.request(server)
                .get("/seasons/badInput/services/15/serviceHymns")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer service ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/badInput/serviceHymns")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return an empty array for non existing season ids", (done) => {
            chai.request(server)
                .get("/seasons/1234/services/15/serviceHymns")
                .end((err, res) => {
                    Validators.validateArrayResponse(res, true);
                    done();
                });
        });

        it("should return an empty array for non existing service ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/12345/serviceHymns")
                .end((err, res) => {
                    Validators.validateArrayResponse(res, true);
                    done();
                });
        });
    });

    describe("/GET a season service hymn", () => {
        it("should get a season services", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/311")
                .end((err, res) => {
                    Validators.validateObjectResponse(res);
                    Validators.validateServiceHymnResponse(res.body);
                    done();
                });
        });

        it("should return a 404 for negative season ids", (done) => {
            chai.request(server)
                .get("/seasons/-1/services/15/serviceHymns/311")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for negative service ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/-1/serviceHymns/311")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for negative service hymn ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/-1")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer season ids", (done) => {
            chai.request(server)
                .get("/seasons/badInput/services/15/serviceHymns/311")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer service ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/badInput/serviceHymns/311")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer service hymn ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/badInput")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non existing season id", (done) => {
            chai.request(server)
                .get("/seasons/1234/services/15/serviceHymns/311")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404, ErrorCodes.NotFoundError);
                    done();
                });
        });

        it("should return a 404 for non existing service id", (done) => {
            chai.request(server)
                .get("/seasons/1/services/1234/serviceHymns/311")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404, ErrorCodes.NotFoundError);
                    done();
                });
        });

        it("should return a 404 for non existing service hymn id", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/12345")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404, ErrorCodes.NotFoundError);
                    done();
                });
        });
    });

    describe("/GET all season service hymn formats", () => {
        it("should get a season service hymn format", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/311/formats")
                .end((err, res) => {
                    Validators.validateArrayResponse(res);
                    Validators.validateServiceHymnFormatResponse(res.body[0]);
                    done();
                });
        });

        it("should return a 404 for negative season ids", (done) => {
            chai.request(server)
                .get("/seasons/-1/services/15/serviceHymns/311/formats")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for negative service ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/-1/serviceHymns/311/formats")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for negative service hymn ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/-1/formats")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer season ids", (done) => {
            chai.request(server)
                .get("/seasons/badInput/services/15/serviceHymns/311/formats")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer service ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/badInput/serviceHymns/311/formats")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer service hymn ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/badInput/formats")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return an empty array for non existing season ids", (done) => {
            chai.request(server)
                .get("/seasons/12345/services/15/serviceHymns/311/formats")
                .end((err, res) => {
                    Validators.validateArrayResponse(res, true);
                    done();
                });
        });

        it("should return an empty array for non existing service ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/12345/serviceHymns/311/formats")
                .end((err, res) => {
                    Validators.validateArrayResponse(res, true);
                    done();
                });
        });

        it("should return an empty array for non existing service hymn ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/12345/formats")
                .end((err, res) => {
                    Validators.validateArrayResponse(res, true);
                    done();
                });
        });
    });

    describe("/GET a season service hymn format", () => {
        it("should get a season service hymn", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/311/formats/1")
                .end((err, res) => {
                    Validators.validateObjectResponse(res);
                    Validators.validateServiceHymnFormatResponse(res.body);
                    done();
                });
        });

        it("should return a 404 for negative season ids", (done) => {
            chai.request(server)
                .get("/seasons/-1/services/15/serviceHymns/311/formats/1")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for negative service ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/-1/serviceHymns/311/formats/1")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for negative service hymn ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/-1/formats/1")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for negative service hymn format ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/311/formats/-1")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer season ids", (done) => {
            chai.request(server)
                .get("/seasons/badInput/services/15/serviceHymns/311/formats/1")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer service ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/badInput/serviceHymns/311/formats/1")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer service hymn ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/badInput/formats/1")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer service hymn format ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/311/formats/badInput")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non existing season id", (done) => {
            chai.request(server)
                .get("/seasons/1234/services/15/serviceHymns/311/formats/1")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404, ErrorCodes.NotFoundError);
                    done();
                });
        });

        it("should return a 404 for non existing service id", (done) => {
            chai.request(server)
                .get("/seasons/1/services/1234/serviceHymns/311/formats/1")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404, ErrorCodes.NotFoundError);
                    done();
                });
        });

        it("should return a 404 for non existing service hymn id", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/12345/formats/1")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404, ErrorCodes.NotFoundError);
                    done();
                });
        });

        it("should return a 404 for non existing service hymn format id", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/311/formats/1234")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404, ErrorCodes.NotFoundError);
                    done();
                });
        });
    });

    describe("/GET all season service hymn format contents", () => {
        it("should get a season service hymn format contents (text)", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/311/formats/1/contents")
                .end((err, res) => {
                    Validators.validateArrayResponse(res);
                    Validators.validateServiceHymnFormatContentResponse(res.body[0]);
                    Validators.validateTextContentResponse(res.body[0].content);
                    done();
                });
        });

        it("should get a season service hymn format contents (hazzat)", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/311/formats/2/contents")
                .end((err, res) => {
                    Validators.validateArrayResponse(res);
                    Validators.validateServiceHymnFormatContentResponse(res.body[0]);
                    Validators.validateHazzatContentResponse(res.body[0].content);
                    done();
                });
        });

        it("should get a season service hymn format contents (vertical hazzat)", (done) => {
            chai.request(server)
                .get("/seasons/1/services/2/serviceHymns/279/formats/3/contents")
                .end((err, res) => {
                    Validators.validateArrayResponse(res);
                    Validators.validateServiceHymnFormatContentResponse(res.body[0]);
                    Validators.validateVerticalHazzatContentResponse(res.body[0].content);
                    done();
                });
        });

        it("should return a 501 for unsupported season service hymn format contents (Musical Notes)", (done) => {
            chai.request(server)
                .get("/seasons/32/services/17/serviceHymns/334/formats/4/contents")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 501);
                    done();
                });
        });

        it("should return a 501 for unsupported season service hymn format contents (Audio)", (done) => {
            chai.request(server)
                .get("/seasons/14/services/4/serviceHymns/162/formats/5/contents")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 501);
                    done();
                });
        });

        it("should get a season service hymn format contents (video)", (done) => {
            chai.request(server)
                .get("/seasons/14/services/4/serviceHymns/162/formats/6/contents")
                .end((err, res) => {
                    Validators.validateArrayResponse(res);
                    Validators.validateServiceHymnFormatContentResponse(res.body[0]);
                    Validators.validateVideoContentResponse(res.body[0].content);
                    done();
                });
        });

        it("should get a season service hymn format contents (information)", (done) => {
            chai.request(server)
                .get("/seasons/14/services/4/serviceHymns/162/formats/7/contents")
                .end((err, res) => {
                    Validators.validateArrayResponse(res);
                    Validators.validateServiceHymnFormatContentResponse(res.body[0]);
                    Validators.validateInformationContentResponse(res.body[0].content);
                    done();
                });
        });

        it("should return a 404 for negative season ids", (done) => {
            chai.request(server)
                .get("/seasons/-1/services/15/serviceHymns/311/formats/1/contents")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for negative service ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/-1/serviceHymns/311/formats/1/contents")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for negative service hymn ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/-1/formats/1/contents")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for negative service hymn format ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/311/formats/-1/contents")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer season ids", (done) => {
            chai.request(server)
                .get("/seasons/badInput/services/15/serviceHymns/311/formats/1/contents")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer service ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/badInput/serviceHymns/311/formats/1/contents")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer service hymn ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/badInput/formats/1/contents")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer service hymn format ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/311/formats/badInput/contents")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return an empty array for non existing season ids", (done) => {
            chai.request(server)
                .get("/seasons/12345/services/15/serviceHymns/311/formats/1/contents")
                .end((err, res) => {
                    Validators.validateArrayResponse(res, true);
                    done();
                });
        });

        it("should return an empty array for non existing service ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/12345/serviceHymns/311/formats/1/contents")
                .end((err, res) => {
                    Validators.validateArrayResponse(res, true);
                    done();
                });
        });

        it("should return an empty array for non existing service hymn ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/12345/formats/1/contents")
                .end((err, res) => {
                    Validators.validateArrayResponse(res, true);
                    done();
                });
        });

        it("should return an empty array for non existing service hymn format ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/311/formats/12345/contents")
                .end((err, res) => {
                    Validators.validateArrayResponse(res, true);
                    done();
                });
        });
    });

    describe("/GET a season service hymn format content", () => {
        it("should get a season service hymn content (text)", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/311/formats/1/contents/288")
                .end((err, res) => {
                    Validators.validateObjectResponse(res);
                    Validators.validateServiceHymnFormatContentResponse(res.body);
                    Validators.validateTextContentResponse(res.body.content);
                    done();
                });
        });

        it("should get a season service hymn content (hazzat)", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/311/formats/2/contents/379")
                .end((err, res) => {
                    Validators.validateObjectResponse(res);
                    Validators.validateServiceHymnFormatContentResponse(res.body);
                    Validators.validateHazzatContentResponse(res.body.content);
                    done();
                });
        });

        it("should get a season service hymn format contents (vertical hazzat)", (done) => {
            chai.request(server)
                .get("/seasons/1/services/2/serviceHymns/279/formats/3/contents/622")
                .end((err, res) => {
                    Validators.validateObjectResponse(res);
                    Validators.validateServiceHymnFormatContentResponse(res.body);
                    Validators.validateVerticalHazzatContentResponse(res.body.content);
                    done();
                });
        });

        it("should return a 501 for unsupported season service hymn format contents (Musical Notes)", (done) => {
            chai.request(server)
                .get("/seasons/32/services/17/serviceHymns/334/formats/4/contents/639")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 501);
                    done();
                });
        });

        it("should return a 501 for unsupported season service hymn format contents (Audio)", (done) => {
            chai.request(server)
                .get("/seasons/14/services/4/serviceHymns/162/formats/5/contents/703")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 501);
                    done();
                });
        });

        it("should get a season service hymn format contents (video)", (done) => {
            chai.request(server)
                .get("/seasons/14/services/4/serviceHymns/162/formats/6/contents/704")
                .end((err, res) => {
                    Validators.validateObjectResponse(res);
                    Validators.validateServiceHymnFormatContentResponse(res.body);
                    Validators.validateVideoContentResponse(res.body.content);
                    done();
                });
        });

        it("should get a season service hymn format contents (information)", (done) => {
            chai.request(server)
                .get("/seasons/14/services/4/serviceHymns/162/formats/7/contents/705")
                .end((err, res) => {
                    Validators.validateObjectResponse(res);
                    Validators.validateServiceHymnFormatContentResponse(res.body);
                    Validators.validateInformationContentResponse(res.body.content);
                    done();
                });
        });

        it("should return a 404 for negative season ids", (done) => {
            chai.request(server)
                .get("/seasons/-1/services/15/serviceHymns/311/formats/1/contents/288")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for negative service ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/-1/serviceHymns/311/formats/1/contents/288")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for negative service hymn ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/-1/formats/1/contents/288")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for negative service hymn format ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/311/formats/-1/contents/288")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for negative service hymn format content ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/311/formats/1/contents/-1")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer season ids", (done) => {
            chai.request(server)
                .get("/seasons/badInput/services/15/serviceHymns/311/formats/1/contents/288")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer service ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/badInput/serviceHymns/311/formats/1/contents/288")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer service hymn ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/badInput/formats/1/contents/288")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer service hymn format ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/311/formats/badInput/contents/288")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non integer service hymn format content ids", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/311/formats/1/contents/badInput")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404);
                    done();
                });
        });

        it("should return a 404 for non existing season id", (done) => {
            chai.request(server)
                .get("/seasons/1234/services/15/serviceHymns/311/formats/1/contents/288")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404, ErrorCodes.NotFoundError);
                    done();
                });
        });

        it("should return a 404 for non existing service id", (done) => {
            chai.request(server)
                .get("/seasons/1/services/1234/serviceHymns/311/formats/1/contents/288")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404, ErrorCodes.NotFoundError);
                    done();
                });
        });

        it("should return a 404 for non existing service hymn id", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/12345/formats/1/contents/288")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404, ErrorCodes.NotFoundError);
                    done();
                });
        });

        it("should return a 404 for non existing service hymn format id", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/311/formats/1234/contents/288")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404, ErrorCodes.NotFoundError);
                    done();
                });
        });

        it("should return a 404 for non existing service hymn format id", (done) => {
            chai.request(server)
                .get("/seasons/1/services/15/serviceHymns/311/formats/1/contents/1234")
                .end((err, res) => {
                    Validators.validateErrorResponse(res, 404, ErrorCodes.NotFoundError);
                    done();
                });
        });
    });
});
