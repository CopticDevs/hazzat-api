import * as chai from "chai";
import { ErrorCodes } from "../../Common/Errors";
import { ResourceTypes } from "../../Routes/ResourceTypes";
import { ContentType } from "../../Models/IVariationInfo";
const should = chai.should();

export class Validators {
    public static validateObject(value: any): void {
        value.should.be.a("object");
        value.should.not.be.a("array");
    }

    public static validateArray(arr: any): void {
        arr.should.be.a("array");
    }

    public static validateErrorResponse(res: any, statusCode: number, errorCode?: ErrorCodes): void {
        res.should.have.status(statusCode);
        Validators.validateObject(res.body);
        if (errorCode !== null && errorCode !== undefined) {
            res.body.should.have.property("errorCode");
            res.body.should.have.property("errorCode").eql(ErrorCodes[errorCode]);
        }
        res.body.should.have.property("message");
    }

    public static validateArrayResponse(res: any, isEmpty: boolean = false): void {
        res.should.have.status(200);
        Validators.validateArray(res.body);
        isEmpty ? res.body.length.should.be.eql(0) : res.body.length.should.be.not.eql(0);
    }

    public static validateObjectResponse(res: any): void {
        res.should.have.status(200);
        Validators.validateObject(res.body);
    }

    public static validateSeason(value: any, resourceId: string = null): void {
        value.should.have.property("id").matches(new RegExp(`^\/${ResourceTypes.Seasons}\/[0-9]+$`));
        if (!!resourceId) {
            value.should.have.property("id").eq(resourceId);
        }
        value.should.have.property("name");
        value.should.have.property("order");
        value.should.have.property("verse");
        value.should.have.property("isDateSpecific");
    }

    public static validateService(value: any, resourceId: string = null): void {
        value.should.have.property("id").matches(new RegExp(`^\/${ResourceTypes.Seasons}\/[0-9]+\/${ResourceTypes.Services}\/[0-9]+$`));
        if (!!resourceId) {
            value.should.have.property("id").eq(resourceId);
        }
        value.should.have.property("name");
        value.should.have.property("order");
    }

    public static validateServiceHymn(value: any, resourceId: string = null): void {
        value.should.have.property("id").matches(new RegExp(`^\/${ResourceTypes.Seasons}\/[0-9]+\/${ResourceTypes.Services}\/[0-9]+\/${ResourceTypes.Hymns}\/[0-9]+$`));
        if (!!resourceId) {
            value.should.have.property("id").eq(resourceId);
        }
        value.should.have.property("name");
        value.should.have.property("order");
    }

    public static validateServiceHymnFormat(value: any, resourceId: string = null): void {
        value.should.have.property("id").matches(new RegExp(`^\/${ResourceTypes.Seasons}\/[0-9]+\/${ResourceTypes.Services}\/[0-9]+\/${ResourceTypes.Hymns}\/[0-9]+\/${ResourceTypes.Formats}\/[0-9]+$`));
        if (!!resourceId) {
            value.should.have.property("id").eq(resourceId);
        }
        value.should.have.property("name");
        value.should.have.property("variationCount");
        value.should.have.property("order");
    }

    public static validateServiceHymnFormatVariation(value: any, resourceId: string = null): void {
        value.should.have.property("id").matches(new RegExp(`^\/${ResourceTypes.Seasons}\/[0-9]+\/${ResourceTypes.Services}\/[0-9]+\/${ResourceTypes.Hymns}\/[0-9]+\/${ResourceTypes.Formats}\/[0-9]+\/${ResourceTypes.Variations}\/[0-9]+$`));
        if (!!resourceId) {
            value.should.have.property("id").eq(resourceId);
        }
        value.should.have.property("name");
        value.should.have.property("content");
    }

    public static validateTextContent(value: any): void {
        value.should.have.property("paragraphs");
        value.should.have.property("contentType").eq(ContentType.TextContent);
        Validators.validateTextParagraphArrayContent(value.paragraphs);
    }

    public static validateTextParagraphArrayContent(textParagraphs: any): void {
        Validators.validateArray(textParagraphs);
        textParagraphs[0].should.have.property("columns");
        Validators.validateTextColumnArrayContent(textParagraphs[0].columns);
    }

    public static validateTextColumnArrayContent(textColumns: any): void {
        Validators.validateArray(textColumns);
        textColumns[0].should.have.property("content");
        textColumns[0].should.have.property("language");
    }

    public static validateHazzatContentResponse(contentBody: any): void {
        contentBody.should.have.property("arabicHazzat");
        contentBody.should.have.property("copticHazzat");
        contentBody.should.have.property("englishHazzat");
        contentBody.should.have.property("contentType").eq(ContentType.HazzatContent);
    }

    public static validateVerticalHazzatContentResponse(contentBody: any): void {
        contentBody.should.have.property("arabicVerticalHazzat");
        contentBody.should.have.property("copticVerticalHazzat");
        contentBody.should.have.property("englishVerticalHazzat");
        contentBody.should.have.property("contentType").eq(ContentType.VerticalHazzatContent);
    }

    public static validateMusicalNotesContentResponse(contentBody: any): void {
        contentBody.should.have.property("musicFilePath");
        contentBody.should.have.property("audioFilePath");
        contentBody.should.have.property("contentType").eq(ContentType.MusicalNotesContent);
    }

    public static validateAudioContentResponse(contentBody: any): void {
        contentBody.should.have.property("audioFilePath");
        contentBody.should.have.property("contentType").eq(ContentType.AudioContent);
    }

    public static validateVideoContentResponse(contentBody: any): void {
        contentBody.should.have.property("arabicVideo");
        contentBody.should.have.property("copticVideo");
        contentBody.should.have.property("englishVideo");
        contentBody.should.have.property("contentType").eq(ContentType.VideoContent);
    }

    public static validateInformationContentResponse(contentBody: any): void {
        contentBody.should.have.property("arabicInformation");
        contentBody.should.have.property("englishInformation");
        contentBody.should.have.property("contentType").eq(ContentType.InformationContent);
    }

    public static validateHymnType(value: any, resourceId: string = null): void {
        value.should.have.property("id").matches(new RegExp(`^\/${ResourceTypes.Types}\/[0-9]+$`));
        if (!!resourceId) {
            value.should.have.property("id").eq(resourceId);
        }
        value.should.have.property("name");
        value.should.have.property("nameSingular");
        value.should.have.property("order");
        value.should.have.property("hymnCount");
    }

    public static validateHymnTune(value: any, resourceId: string = null): void {
        value.should.have.property("id").matches(new RegExp(`^\/${ResourceTypes.Tunes}\/[0-9]+$`));
        if (!!resourceId) {
            value.should.have.property("id").eq(resourceId);
        }
        value.should.have.property("name");
        value.should.have.property("order");
        value.should.have.property("hymnCount");
    }

    public static validateDoesNotInclude(contentString: string, searchString: string): void {
        if (!contentString) {
            return;
        }

        contentString.should.not.contain(searchString);
    }
}
