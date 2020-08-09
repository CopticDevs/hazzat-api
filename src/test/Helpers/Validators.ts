import * as chai from "chai";
import { ErrorCodes } from "../../Common/Errors";
import chaiHttp = require("chai-http");
import { ResourceTypes } from "../../Routes/ResourceTypes";
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

    public static validateSeasonResponse(resBody: any, resourceId: string = null): void {
        resBody.should.have.property("id").matches(new RegExp(`^\/${ResourceTypes.Seasons}\/[0-9]+$`));
        if (!!resourceId) {
            resBody.should.have.property("id").eq(resourceId);
        }
        resBody.should.have.property("name");
        resBody.should.have.property("order");
        resBody.should.have.property("verse");
        resBody.should.have.property("isDateSpecific");
    }

    public static validateServiceResponse(resBody: any, resourceId: string = null): void {
        resBody.should.have.property("id").matches(new RegExp(`^\/${ResourceTypes.Seasons}\/[0-9]+\/${ResourceTypes.Services}\/[0-9]+$`));
        if (!!resourceId) {
            resBody.should.have.property("id").eq(resourceId);
        }
        resBody.should.have.property("name");
        resBody.should.have.property("order");
    }

    public static validateServiceHymnResponse(resBody: any, resourceId: string = null): void {
        resBody.should.have.property("id").matches(new RegExp(`^\/${ResourceTypes.Seasons}\/[0-9]+\/${ResourceTypes.Services}\/[0-9]+\/${ResourceTypes.Hymns}\/[0-9]+$`));
        if (!!resourceId) {
            resBody.should.have.property("id").eq(resourceId);
        }
        resBody.should.have.property("name");
        resBody.should.have.property("order");
    }

    public static validateServiceHymnFormatResponse(resBody: any, resourceId: string = null): void {
        resBody.should.have.property("id").matches(new RegExp(`^\/${ResourceTypes.Seasons}\/[0-9]+\/${ResourceTypes.Services}\/[0-9]+\/${ResourceTypes.Hymns}\/[0-9]+\/${ResourceTypes.Formats}\/[0-9]+$`));
        if (!!resourceId) {
            resBody.should.have.property("id").eq(resourceId);
        }
        resBody.should.have.property("name");
        resBody.should.have.property("variationCount");
        resBody.should.have.property("order");
    }

    public static validateServiceHymnFormatVariationResponse(resBody: any, resourceId: string = null): void {
        resBody.should.have.property("id").matches(new RegExp(`^\/${ResourceTypes.Seasons}\/[0-9]+\/${ResourceTypes.Services}\/[0-9]+\/${ResourceTypes.Hymns}\/[0-9]+\/${ResourceTypes.Formats}\/[0-9]+\/${ResourceTypes.Variations}\/[0-9]+$`));
        if (!!resourceId) {
            resBody.should.have.property("id").eq(resourceId);
        }
        resBody.should.have.property("name");
        resBody.should.have.property("content");
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
