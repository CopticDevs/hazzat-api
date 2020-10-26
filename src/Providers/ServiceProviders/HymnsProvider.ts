 import { inject, injectable } from "inversify";
import { ErrorCodes, HazzatApplicationError } from "../../Common/Errors";
import { Language } from "../../Common/Types/Language";
import { IFormatInfo } from "../../Models/IFormatInfo";
import { IHymnInfo } from "../../Models/IHymnInfo";
import { ISeasonInfo } from "../../Models/ISeasonInfo";
import { IServiceInfo } from "../../Models/IServiceInfo";
import { ContentType, IHazzatContent, IHymnContent, IInformationContent, ITextContent, IVariationInfo, IVerticalHazzatContent, IVideoContent, TextColumn, TextParagraph } from "../../Models/IVariationInfo";
import { ResourceTypes } from "../../Routes/ResourceTypes";
import { TYPES } from "../../types";
import { IDataProvider } from "../DataProviders/IDataProvider";
import { HazzatDbSchema } from "../DataProviders/SqlDataProvider/HazzatDbSchema";
import { Constants } from "../DataProviders/SqlDataProvider/SqlConstants";
import { IHymnsProvider } from "./IHymnsProvider";

/**
 * Hymns Provider
 */
@injectable()
export class HymnsProvider implements IHymnsProvider {
    private dataProvider: IDataProvider

    private static _convertSeasonDbItemToSeasonInfo(seasonDbItem: HazzatDbSchema.ISeason): ISeasonInfo {
        return {
            id: `/${ResourceTypes.Seasons}/${seasonDbItem.ItemId}`,
            isDateSpecific: seasonDbItem.Date_Specific,
            name: seasonDbItem.Name,
            order: seasonDbItem.Season_Order,
            verse: seasonDbItem.Verse
        };
    }

    private static _convertServiceDbItemToServiceInfo(serviceDbItem: HazzatDbSchema.IService): IServiceInfo {
        return {
            id: `/${ResourceTypes.Seasons}/${serviceDbItem.Season_ID}/${ResourceTypes.Services}/${serviceDbItem.ItemId}`,
            name: serviceDbItem.Service_Name,
            order: serviceDbItem.Service_Order
        };
    }

    private static _convertServiceHymnDbItemToHymnInfo(
        serviceHymnDbItem: HazzatDbSchema.IServiceHymn
    ): IHymnInfo {
        return {
            id: `/${ResourceTypes.Seasons}/${serviceHymnDbItem.Season_ID}/${ResourceTypes.Services}/${serviceHymnDbItem.Service_ID}/${ResourceTypes.Hymns}/${serviceHymnDbItem.ItemId}`,
            name: serviceHymnDbItem.Title,
            order: serviceHymnDbItem.Hymn_Order
        };
    }

    private static _convertServiceHymnFormatDbItemToFormatInfo(
        serviceHymnFormatDbItem: HazzatDbSchema.IServiceHymnFormat
    ): IFormatInfo {
        return {
            id: `/${ResourceTypes.Seasons}/${serviceHymnFormatDbItem.Season_ID}/${ResourceTypes.Services}/${serviceHymnFormatDbItem.Service_ID}/${ResourceTypes.Hymns}/${serviceHymnFormatDbItem.ServiceHymn_ID}/${ResourceTypes.Formats}/${serviceHymnFormatDbItem.ItemId}`,
            name: serviceHymnFormatDbItem.Format_Name,
            order: serviceHymnFormatDbItem.ItemId,
            variationCount: serviceHymnFormatDbItem.Content_Count
        };
    }

    private async _replaceCommonContent(content: string): Promise<string> {
        if (!content) {
            return Promise.resolve(content);
        }

        let result = content;
        const commonContentRegEx = new RegExp(Constants.Tokens.commonContentRegEx, "i");
        let matchGroups = result.match(commonContentRegEx);

        // Keep replacing common as long as there are additional references
        while (!!matchGroups) {
            const matchedString = matchGroups[0];
            const commonId = matchGroups[1];

            const commonContent = await this.dataProvider.getCommonContent(commonId);

            result = result.replace(matchedString, commonContent);
            matchGroups = result.match(commonContentRegEx);
        }

        return result;
    }

    private async _replaceReason(content: string, language: Language, getReasonFunc: () => Promise<HazzatDbSchema.IReason>): Promise<string> {
        if (!content) {
            return Promise.resolve(content);
        }

        let result = content;
        const longReasonRegEx = new RegExp("\<reason_long\>", "i");
        const shortReasonRegEx = new RegExp("\<reason_short\>", "i");

        const longReasonMatch = result.match(longReasonRegEx);
        const shortReasonMatch = result.match(shortReasonRegEx);

        // only call the DB if there's a match
        if (!longReasonMatch && !shortReasonMatch) {
            return result;
        }

        const reasonInfo = await getReasonFunc();
        let longReason: string;
        let shortReason: string;

        switch (language) {
            case Language.English:
                longReason = reasonInfo.Long_English;
                shortReason = reasonInfo.Short_English;
                break;
            case Language.Coptic:
                longReason = reasonInfo.Long_Coptic;
                shortReason = reasonInfo.Short_Coptic;
                break;
            case Language.Arabic:
                longReason = reasonInfo.Long_Arabic;
                shortReason = reasonInfo.Short_Arabic;
                break;
            default:
        }

        if (!!longReasonMatch) {
            result = result.replace(longReasonMatch[0], longReason);
        }

        if (!!shortReasonMatch) {
            result = result.replace(shortReasonMatch[0], shortReason);
        }

        return result;
    }

    private _convertSqlTextToArray(textContent: string): string[] {
        if (!textContent) {
            return [];
        }

        return textContent.split(Constants.Tokens.ParagraphSeparator);
    }

    /**
     * Prepares the content as stored in storage and makes it ready to presented
     * to callers through API
     * @param content The text content as it was stored
     * @param language The content language
     * @param getReasonFunc A method to get the reason info.
     */
    private async _prepareTextContent(content: string, language: Language, getReasonFunc: () => Promise<HazzatDbSchema.IReason>): Promise<string[]> {
        let fixedContent = content;

        // Replace references to common content
        fixedContent = await this._replaceCommonContent(fixedContent);

        // Replace the reason for the season
        fixedContent = await this._replaceReason(fixedContent, language, getReasonFunc);

        // Convert text content into a json array
        const splitContent = this._convertSqlTextToArray(fixedContent);

        return splitContent;
    }

    private _peekHasComment(paragraphs: string[]): boolean {
        if (!paragraphs || paragraphs.length === 0) {
            return false;
        }

        let content = paragraphs[0];
        content = content && content.trim();

        if (!content || content === "") {
            return false;
        }

        if (content.toUpperCase().startsWith(Constants.Tokens.commentStartTag.toUpperCase())) {
            return true;
        }

        return false;
    }

    private _getCommentColumn(paragraphs: string[], language: Language): TextColumn {
        if (!this._peekHasComment(paragraphs)) {
            return null;
        }

        let content = paragraphs[0].trim();
        const commentRegEx = new RegExp(Constants.Tokens.commentRegEx, "i");
        const matchGroups = content.match(commentRegEx);
        const matchedString = matchGroups[0];
        const comment = matchGroups[1];
        content = content.replace(matchedString, "");
        content = content.trim();

        // put the remaining content back to be handled in the next paragraph
        paragraphs[0] = content;

        return {
            content: comment,
            language
        };
    }

    private _getTextColumn(paragraphs: string[], language: Language): TextColumn {
        if (!paragraphs || paragraphs.length === 0) {
            return null;
        }

        // In some cases this paragraph doesn't have content in the specified language
        let content = paragraphs.shift();
        content = content && content.trim();
        if (!content || content === "") {
            return null;
        }

        return {
            content,
            language
        };
    }

    private async _collateTextContent(
        englishText: string,
        copticText: string,
        arabicText: string,
        getReasonFunc: () => Promise<HazzatDbSchema.IReason>): Promise<TextParagraph[]> {

        const englishParagraphs = await this._prepareTextContent(englishText, Language.English, getReasonFunc);
        const copticParagraphs = await this._prepareTextContent(copticText, Language.Coptic, getReasonFunc);
        const arabicParagraphs = await this._prepareTextContent(arabicText, Language.Arabic, getReasonFunc);
        const result: TextParagraph[] = [];

        // keep processing while there's content left
        while (englishParagraphs.length > 0 ||
            copticParagraphs.length > 0 ||
            arabicParagraphs.length > 0) {

            let englishColumn: TextColumn;
            let copticColumn: TextColumn;
            let arabicColumn: TextColumn;
            let isComment: boolean;

            // check if any of the languages has a comment
            if (this._peekHasComment(englishParagraphs) ||
                this._peekHasComment(copticParagraphs) ||
                this._peekHasComment(arabicParagraphs)) {
                // These calls will only extract the comment from the languages that have it.  Otherwise
                // it'll return null
                englishColumn = this._getCommentColumn(englishParagraphs, Language.English);
                copticColumn = this._getCommentColumn(copticParagraphs, Language.Coptic);
                arabicColumn = this._getCommentColumn(arabicParagraphs, Language.Arabic);
                isComment = true;
            } else {
                englishColumn = this._getTextColumn(englishParagraphs, Language.English);
                copticColumn = this._getTextColumn(copticParagraphs, Language.Coptic);
                arabicColumn = this._getTextColumn(arabicParagraphs, Language.Arabic);
            }

            const paragraph: TextParagraph = {
                columns: [],
                isComment
            };

            if (!!englishColumn) {
                paragraph.columns.push(englishColumn);
            }
            if (!!copticColumn) {
                paragraph.columns.push(copticColumn);
            }
            if (!!arabicColumn) {
                paragraph.columns.push(arabicColumn);
            }

            result.push(paragraph);
        }

        return result;
    }

    /**
     * Prepares the content as stored in storage and makes it ready to presented
     * to callers through API
     * @param content The hazzat content as it was stored
     */
    private async _prepareHazzatContent(content: string): Promise<string> {
        let result = content;

        // Replace references to common content
        result = await this._replaceCommonContent(result);

        return result;
    }

    private async _convertServiceHymnFormatContentDbItemToServiceHymnFormatContentInfo<T extends IHymnContent>(
        serviceHymnFormatContentDbItem: HazzatDbSchema.IServiceHymnFormatContent
    ): Promise<IVariationInfo<T>> {

        let content: any = null;

        // to avoid making multiple calls to the db to fetch the same reason
        let reasonInfo: HazzatDbSchema.IReason;
        const getReasonFunc = async () => {
            if (!reasonInfo) {
                reasonInfo = await this.dataProvider.getReason(serviceHymnFormatContentDbItem.Reason_ID);
            }
            return reasonInfo;
        };

        switch (serviceHymnFormatContentDbItem.Format_ID) {
            case 1: // Text
                content = {
                    paragraphs: await this._collateTextContent(
                        serviceHymnFormatContentDbItem.Content_English,
                        serviceHymnFormatContentDbItem.Content_Coptic,
                        serviceHymnFormatContentDbItem.Content_Arabic,
                        getReasonFunc),
                    contentType: ContentType.TextContent
                } as ITextContent;
                break;
            case 2: // Hazzat
                content = {
                    englishHazzat: await this._prepareHazzatContent(serviceHymnFormatContentDbItem.Content_English),
                    copticHazzat: await this._prepareHazzatContent(serviceHymnFormatContentDbItem.Content_Coptic),
                    arabicHazzat: await this._prepareHazzatContent(serviceHymnFormatContentDbItem.Content_Arabic),
                    contentType: ContentType.HazzatContent
                } as IHazzatContent;
                break;
            case 3: // Vertical Hazzat
                content = {
                    englishVerticalHazzat: await this._prepareHazzatContent(serviceHymnFormatContentDbItem.Content_English),
                    copticVerticalHazzat: await this._prepareHazzatContent(serviceHymnFormatContentDbItem.Content_Coptic),
                    arabicVerticalHazzat: await this._prepareHazzatContent(serviceHymnFormatContentDbItem.Content_Arabic),
                    contentType: ContentType.VerticalHazzatContent
                } as IVerticalHazzatContent;
                break;
            case 6: // Video
                content = {
                    englishVideo: serviceHymnFormatContentDbItem.Content_English,
                    copticVideo: serviceHymnFormatContentDbItem.Content_Coptic,
                    arabicVideo: serviceHymnFormatContentDbItem.Content_Arabic,
                    contentType: ContentType.VideoContent
                } as IVideoContent;
                break;
            case 7: // Information
                content = {
                    englishInformation: serviceHymnFormatContentDbItem.Content_English,
                    arabicInformation: serviceHymnFormatContentDbItem.Content_Arabic,
                    contentType: ContentType.InformationContent
                } as IInformationContent;
                break;
            default:
                throw new HazzatApplicationError(
                    ErrorCodes[ErrorCodes.NotSupportedError],
                    `The format '${serviceHymnFormatContentDbItem.Format_Name}' is not currently supported.`,
                    `format id: '${serviceHymnFormatContentDbItem.Format_ID}'`);
        }
        return {
            id: `/${ResourceTypes.Seasons}/${serviceHymnFormatContentDbItem.Season_ID}/${ResourceTypes.Services}/${serviceHymnFormatContentDbItem.Service_ID}/${ResourceTypes.Hymns}/${serviceHymnFormatContentDbItem.ServiceHymn_ID}/${ResourceTypes.Formats}/${serviceHymnFormatContentDbItem.Format_ID}/${ResourceTypes.Variations}/${serviceHymnFormatContentDbItem.ItemId}`,
            name: serviceHymnFormatContentDbItem.Content_Name,
            content
        };
    }

    constructor(
        @inject(TYPES.IDataProvider) dataProvider: IDataProvider
    ) {
        this.dataProvider = dataProvider;
    }

    public async getSeasonList(): Promise<ISeasonInfo[]> {
        const dbResult = await this.dataProvider.getSeasonList();

        const seasons: ISeasonInfo[] = dbResult
            .map((row) => HymnsProvider._convertSeasonDbItemToSeasonInfo(row));
        return seasons;
    }

    public async getSeason(seasonId: string): Promise<ISeasonInfo> {
        const dbResult = await this.dataProvider.getSeason(seasonId);
        return HymnsProvider._convertSeasonDbItemToSeasonInfo(dbResult);
    }

    public async getSeasonServiceList(seasonId: string): Promise<IServiceInfo[]> {
        const dbResult = await this.dataProvider.getSeasonServiceList(seasonId);

        const services: IServiceInfo[] = dbResult
            .map((row) => HymnsProvider._convertServiceDbItemToServiceInfo(row));
        return services;
    }

    public async getSeasonService(seasonId: string, serviceId: string): Promise<IServiceInfo> {
        const dbResult = await this.dataProvider.getSeasonService(seasonId, serviceId);
        return HymnsProvider._convertServiceDbItemToServiceInfo(dbResult);
    }

    public async getServiceHymnList(seasonId: string, serviceId: string): Promise<IHymnInfo[]> {
        const dbResult = await this.dataProvider.getServiceHymnList(seasonId, serviceId);

        const serviceHymns: IHymnInfo[] = dbResult
            .map((row) => HymnsProvider._convertServiceHymnDbItemToHymnInfo(row));
        return serviceHymns;
    }

    public async getServiceHymn(seasonId: string, serviceId: string, hymnId: string): Promise<IHymnInfo> {
        const dbResult = await this.dataProvider.getServiceHymn(seasonId, serviceId, hymnId);
        return HymnsProvider._convertServiceHymnDbItemToHymnInfo(dbResult);
    }

    public async getServiceHymnFormatList(seasonId: string, serviceId: string, hymnId: string): Promise<IFormatInfo[]> {
        const dbResult = await this.dataProvider.getServiceHymnFormatList(seasonId, serviceId, hymnId);

        const serviceHymns: IFormatInfo[] = dbResult
            .map((row) => HymnsProvider._convertServiceHymnFormatDbItemToFormatInfo(row));
        return serviceHymns;
    }

    public async getServiceHymnFormat(seasonId: string, serviceId: string, hymnId: string, formatId: string): Promise<IFormatInfo> {
        const dbResult = await this.dataProvider.getServiceHymnFormat(seasonId, serviceId, hymnId, formatId);
        return HymnsProvider._convertServiceHymnFormatDbItemToFormatInfo(dbResult);
    }

    public async getServiceHymnsFormatVariationList<T extends IHymnContent>(seasonId: string, serviceId: string, hymnId: string, formatId: string): Promise<IVariationInfo<T>[]> {
        const dbResult = await this.dataProvider.getServiceHymnsFormatVariationList(seasonId, serviceId, hymnId, formatId);

        const serviceHymns: IVariationInfo<T>[] = await Promise.all(dbResult
            .map((row) => this._convertServiceHymnFormatContentDbItemToServiceHymnFormatContentInfo<T>(row)));
        return serviceHymns;
    }

    public async getServiceHymnsFormatVariation<T extends IHymnContent>(seasonId: string, serviceId: string, hymnId: string, formatId: string, contentId: string): Promise<IVariationInfo<T>> {
        const dbResult = await this.dataProvider.getServiceHymnsFormatVariation(seasonId, serviceId, hymnId, formatId, contentId);
        return await this._convertServiceHymnFormatContentDbItemToServiceHymnFormatContentInfo<T>(dbResult);
    }

    // getCommonContent(commonId: string): Promise<string>;
}
