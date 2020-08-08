import * as chai from "chai";
import { ErrorCodes } from "../../Common/Errors";
import chaiHttp = require("chai-http");
const should = chai.should();

export class Validators {
    public static validateErrorResponse(res: any, statusCode: number, errorCode?: ErrorCodes): void {
        res.should.have.status(statusCode);
        res.body.should.be.a("object");
        res.body.should.not.be.a("array");
        if (errorCode !== null && errorCode !== undefined) {
            res.body.should.have.property("errorCode");
            res.body.should.have.property("errorCode").eql(ErrorCodes[errorCode]);
        }
        res.body.should.have.property("message");
    }

    public static validateArrayResponse(res: any, isEmpty: boolean = false): void {
        res.should.have.status(200);
        res.body.should.be.a("array");
        isEmpty ? res.body.length.should.be.eql(0) : res.body.length.should.be.not.eql(0);
    }

    public static validateObjectResponse(res: any): void {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.not.be.a("array");
    }

    public static validateSeasonResponse(resBody: any): void {
        resBody.should.have.property("id");
        resBody.should.have.property("name");
        resBody.should.have.property("order");
        resBody.should.have.property("verse");
        resBody.should.have.property("isDateSpecific");
    }

    public static validateServiceResponse(resBody: any): void {
        resBody.should.have.property("id");
        resBody.should.have.property("name");
        resBody.should.have.property("seasonId");
        resBody.should.have.property("seasonName");
        resBody.should.have.property("order");
    }

    public static validateServiceHymnResponse(resBody: any): void {
        resBody.should.have.property("id");
        resBody.should.have.property("name");
        resBody.should.have.property("seasonId");
        resBody.should.have.property("seasonName");
        resBody.should.have.property("serviceId");
        resBody.should.have.property("serviceName");
        resBody.should.have.property("order");
    }

    public static validateServiceHymnFormatResponse(resBody: any): void {
        resBody.should.have.property("id");
        resBody.should.have.property("name");
        resBody.should.have.property("seasonId");
        resBody.should.have.property("seasonName");
        resBody.should.have.property("serviceId");
        resBody.should.have.property("serviceName");
        resBody.should.have.property("serviceHymnId");
        resBody.should.have.property("serviceHymnName");
        resBody.should.have.property("contentCount");
        resBody.should.have.property("order");
    }

    public static validateServiceHymnFormatContentResponse(resBody: any): void {
        resBody.should.have.property("id");
        resBody.should.have.property("name");
        resBody.should.have.property("content");
        resBody.should.have.property("seasonId");
        resBody.should.have.property("seasonName");
        resBody.should.have.property("serviceId");
        resBody.should.have.property("serviceName");
        resBody.should.have.property("serviceHymnId");
        resBody.should.have.property("serviceHymnName");
        resBody.should.have.property("formatId");
        resBody.should.have.property("formatName");
    }

    public static validateTextContentResponse(contentBody: any): void {
        contentBody.should.have.property("arabicText");
        contentBody.should.have.property("copticText");
        contentBody.should.have.property("englishText");
        contentBody.should.have.property("contentType").eq("TextContent");
    }

    public static validateHazzatContentResponse(contentBody: any): void {
        contentBody.should.have.property("arabicHazzat");
        contentBody.should.have.property("copticHazzat");
        contentBody.should.have.property("englishHazzat");
        contentBody.should.have.property("contentType").eq("HazzatContent");
    }

    public static validateVerticalHazzatContentResponse(contentBody: any): void {
        contentBody.should.have.property("arabicVerticalHazzat");
        contentBody.should.have.property("copticVerticalHazzat");
        contentBody.should.have.property("englishVerticalHazzat");
        contentBody.should.have.property("contentType").eq("VerticalHazzatContent");
    }

    public static validateVideoContentResponse(contentBody: any): void {
        contentBody.should.have.property("arabicVideo");
        contentBody.should.have.property("copticVideo");
        contentBody.should.have.property("englishVideo");
        contentBody.should.have.property("contentType").eq("VideoContent");
    }

    public static validateInformationContentResponse(contentBody: any): void {
        contentBody.should.have.property("arabicInformation");
        contentBody.should.have.property("englishInformation");
        contentBody.should.have.property("contentType").eq("InformationContent");
    }
}
