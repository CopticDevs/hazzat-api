 import { ErrorCodes, HazzatApplicationError } from "../../../Common/Errors";
import { ContentLanguage } from "../../../Common/Types/ContentLanguage";
import { IBookletInfo } from "../../../Models/IBookletInfo";
import { IFormatInfo } from "../../../Models/IFormatInfo";
import { IHymnInfo, IHymnInfoWithServiceDetails } from "../../../Models/IHymnInfo";
import { ISeasonInfo } from "../../../Models/ISeasonInfo";
import { IServiceInfo } from "../../../Models/IServiceInfo";
import { ITuneInfo } from "../../../Models/ITuneInfo";
import { ITypeInfo } from "../../../Models/ITypeInfo";
import { ContentType, IAudioContent, IHazzatContent, IHymnContent, IInformationContent, IMusicalNotesContent, ITextContent, IVariationInfo, IVerticalHazzatContent, IVideoContent, TextColumn, TextParagraph } from "../../../Models/IVariationInfo";
import { ResourceTypes } from "../../../Routes/ResourceTypes";
import { IDataProvider } from "../../DataProviders/IDataProvider";
import { HazzatDbSchema } from "../../DataProviders/SqlDataProvider/HazzatDbSchema";
import { Constants } from "../../DataProviders/SqlDataProvider/SqlConstants";

/**
 * Hymns Content Utilities
 */
export class HazzatContentUtils {

    public static convertSeasonDbItemToSeasonInfo(seasonDbItem: HazzatDbSchema.ISeason): ISeasonInfo {
        return HazzatContentUtils._convertSeasonDbItemToSeasonInfo(seasonDbItem, `/${ResourceTypes.Seasons}/${seasonDbItem.ItemId}`);
    }

    public static convertSeasonDbItemToTuneSeasonInfo(seasonDbItem: HazzatDbSchema.ISeason, tuneId: string): ISeasonInfo {
        return HazzatContentUtils._convertSeasonDbItemToSeasonInfo(seasonDbItem, `/${ResourceTypes.Tunes}/${tuneId}/${ResourceTypes.Seasons}/${seasonDbItem.ItemId}`);
    }

    public static convertSeasonDbItemToTypeSeasonInfo(seasonDbItem: HazzatDbSchema.ISeason, typeId: string): ISeasonInfo {
        return HazzatContentUtils._convertSeasonDbItemToSeasonInfo(seasonDbItem, `/${ResourceTypes.Types}/${typeId}/${ResourceTypes.Seasons}/${seasonDbItem.ItemId}`);
    }

    private static _convertSeasonDbItemToSeasonInfo(seasonDbItem: HazzatDbSchema.ISeason, id: string): ISeasonInfo {
        return {
            id,
            isDateSpecific: seasonDbItem.Date_Specific,
            name: seasonDbItem.Name,
            order: seasonDbItem.Season_Order,
            verse: seasonDbItem.Verse
        };
    }

    public static convertServiceDbItemToServiceInfo(serviceDbItem: HazzatDbSchema.IService): IServiceInfo {
        return {
            id: `/${ResourceTypes.Seasons}/${serviceDbItem.Season_ID}/${ResourceTypes.Services}/${serviceDbItem.ItemId}`,
            name: serviceDbItem.Service_Name,
            order: serviceDbItem.Service_Order
        };
    }

    public static convertServiceHymnDbItemToHymnInfo(
        serviceHymnDbItem: HazzatDbSchema.IServiceHymn
    ): IHymnInfo {
        return HazzatContentUtils._convertServiceHymnDbItemToHymnInfo(serviceHymnDbItem, `/${ResourceTypes.Seasons}/${serviceHymnDbItem.Season_ID}/${ResourceTypes.Services}/${serviceHymnDbItem.Service_ID}/${ResourceTypes.Hymns}/${serviceHymnDbItem.ItemId}`);
    }

    public static convertTypeServiceHymnDbItemToHymnInfoWithServiceDetails(
        serviceHymnDbItem: HazzatDbSchema.IServiceHymn,
        typeId: string
    ): IHymnInfoWithServiceDetails {
        const hymnInfo = HazzatContentUtils._convertServiceHymnDbItemToHymnInfo(serviceHymnDbItem, `/${ResourceTypes.Types}/${typeId}/${ResourceTypes.Seasons}/${serviceHymnDbItem.Season_ID}/${ResourceTypes.Hymns}/${serviceHymnDbItem.ItemId}`);
        return {
            ...hymnInfo,
            serviceId: serviceHymnDbItem.Service_ID,
            serviceName: serviceHymnDbItem.Service_Name
        };
    }

    public static convertTuneServiceHymnDbItemToHymnInfoWithServiceDetails(
        serviceHymnDbItem: HazzatDbSchema.IServiceHymn,
        tuneId: string
    ): IHymnInfoWithServiceDetails {
        const hymnInfo = HazzatContentUtils._convertServiceHymnDbItemToHymnInfo(serviceHymnDbItem, `/${ResourceTypes.Tunes}/${tuneId}/${ResourceTypes.Seasons}/${serviceHymnDbItem.Season_ID}/${ResourceTypes.Hymns}/${serviceHymnDbItem.ItemId}`);
        return {
            ...hymnInfo,
            serviceId: serviceHymnDbItem.Service_ID,
            serviceName: serviceHymnDbItem.Service_Name
        };
    }

    private static _convertServiceHymnDbItemToHymnInfo(
        serviceHymnDbItem: HazzatDbSchema.IServiceHymn,
        id: string
    ): IHymnInfo {
        return {
            id,
            name: serviceHymnDbItem.Title,
            order: serviceHymnDbItem.Hymn_Order
        };
    }

    public static convertServiceHymnFormatDbItemToFormatInfo(
        serviceHymnFormatDbItem: HazzatDbSchema.IServiceHymnFormat
    ): IFormatInfo {
        return HazzatContentUtils._convertServiceHymnFormatDbItemToFormatInfo(
            serviceHymnFormatDbItem,
            `/${ResourceTypes.Seasons}/${serviceHymnFormatDbItem.Season_ID}/${ResourceTypes.Services}/${serviceHymnFormatDbItem.Service_ID}/${ResourceTypes.Hymns}/${serviceHymnFormatDbItem.ServiceHymn_ID}/${ResourceTypes.Formats}/${serviceHymnFormatDbItem.ItemId}`);
    }

    public static convertServiceHymnFormatDbItemToTuneFormatInfo(
        serviceHymnFormatDbItem: HazzatDbSchema.IServiceHymnFormat,
        tuneId: string
    ): IFormatInfo {
        return HazzatContentUtils._convertServiceHymnFormatDbItemToFormatInfo(
            serviceHymnFormatDbItem,
            `/${ResourceTypes.Tunes}/${tuneId}/${ResourceTypes.Seasons}/${serviceHymnFormatDbItem.Season_ID}/${ResourceTypes.Hymns}/${serviceHymnFormatDbItem.ServiceHymn_ID}/${ResourceTypes.Formats}/${serviceHymnFormatDbItem.ItemId}`);
    }

    public static convertServiceHymnFormatDbItemToTypeFormatInfo(
        serviceHymnFormatDbItem: HazzatDbSchema.IServiceHymnFormat,
        typeId: string
    ): IFormatInfo {
        return HazzatContentUtils._convertServiceHymnFormatDbItemToFormatInfo(
            serviceHymnFormatDbItem,
            `/${ResourceTypes.Types}/${typeId}/${ResourceTypes.Seasons}/${serviceHymnFormatDbItem.Season_ID}/${ResourceTypes.Hymns}/${serviceHymnFormatDbItem.ServiceHymn_ID}/${ResourceTypes.Formats}/${serviceHymnFormatDbItem.ItemId}`);
    }

    private static _convertServiceHymnFormatDbItemToFormatInfo(
        serviceHymnFormatDbItem: HazzatDbSchema.IServiceHymnFormat,
        id: string
    ): IFormatInfo {
        return {
            id,
            name: serviceHymnFormatDbItem.Format_Name,
            order: serviceHymnFormatDbItem.ItemId,
            variationCount: serviceHymnFormatDbItem.Content_Count
        };
    }

    public static convertBookletDbItemToBookletInfo(
        bookletDbItem: HazzatDbSchema.IBooklet
    ): IBookletInfo {
        return {
            id: `/${ResourceTypes.Booklets}/${bookletDbItem.ItemId}`,
            name: bookletDbItem.Name,
            summary: bookletDbItem.Summary,
            order: bookletDbItem.Booklet_Order,
            sourcePath: bookletDbItem.Source_Path,
            displayPath: bookletDbItem.Display_Path,
            printPath: bookletDbItem.Print_Path,
            thumbnailPath: bookletDbItem.Thumbnail,
            fullPicturePath: bookletDbItem.Full_Picture,
            releaseDate: bookletDbItem.Release_Date
        };
    }

    private static async _replaceCommonContent(content: string, dataProvider: IDataProvider): Promise<string> {
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

            const commonContent = await dataProvider.getCommonContent(commonId);

            result = result.replace(matchedString, commonContent);
            matchGroups = result.match(commonContentRegEx);
        }

        return result;
    }

    private static async _replaceReason(content: string, language: ContentLanguage, getReasonFunc: () => Promise<HazzatDbSchema.IReason>): Promise<string> {
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
            case ContentLanguage.English:
                longReason = reasonInfo.Long_English;
                shortReason = reasonInfo.Short_English;
                break;
            case ContentLanguage.Coptic:
                longReason = reasonInfo.Long_Coptic;
                shortReason = reasonInfo.Short_Coptic;
                break;
            case ContentLanguage.Arabic:
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

    private static _convertSqlTextToArray(textContent: string): string[] {
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
    private static async _prepareTextContent(content: string, language: ContentLanguage, dataProvider: IDataProvider, getReasonFunc: () => Promise<HazzatDbSchema.IReason>): Promise<string[]> {
        let fixedContent = content;

        // Replace references to common content
        fixedContent = await HazzatContentUtils._replaceCommonContent(fixedContent, dataProvider);

        // Replace the reason for the season
        fixedContent = await HazzatContentUtils._replaceReason(fixedContent, language, getReasonFunc);

        // Convert text content into a json array
        const splitContent = HazzatContentUtils._convertSqlTextToArray(fixedContent);

        return splitContent;
    }

    private static _peekHasComment(paragraphs: string[]): boolean {
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

    private static _getCommentColumn(paragraphs: string[], language: ContentLanguage): TextColumn {
        if (!HazzatContentUtils._peekHasComment(paragraphs)) {
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

    private static _getTextColumn(paragraphs: string[], language: ContentLanguage): TextColumn {
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

    private static async _collateTextContent(
        englishText: string,
        copticText: string,
        arabicText: string,
        dataProvider: IDataProvider,
        getReasonFunc: () => Promise<HazzatDbSchema.IReason>): Promise<TextParagraph[]> {

        const englishParagraphs = await HazzatContentUtils._prepareTextContent(englishText, ContentLanguage.English, dataProvider, getReasonFunc);
        const copticParagraphs = await HazzatContentUtils._prepareTextContent(copticText, ContentLanguage.Coptic, dataProvider, getReasonFunc);
        const arabicParagraphs = await HazzatContentUtils._prepareTextContent(arabicText, ContentLanguage.Arabic, dataProvider, getReasonFunc);
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
            if (HazzatContentUtils._peekHasComment(englishParagraphs) ||
                HazzatContentUtils._peekHasComment(copticParagraphs) ||
                HazzatContentUtils._peekHasComment(arabicParagraphs)) {
                // These calls will only extract the comment from the languages that have it.  Otherwise
                // it'll return null
                englishColumn = HazzatContentUtils._getCommentColumn(englishParagraphs, ContentLanguage.English);
                copticColumn = HazzatContentUtils._getCommentColumn(copticParagraphs, ContentLanguage.Coptic);
                arabicColumn = HazzatContentUtils._getCommentColumn(arabicParagraphs, ContentLanguage.Arabic);
                isComment = true;
            } else {
                englishColumn = HazzatContentUtils._getTextColumn(englishParagraphs, ContentLanguage.English);
                copticColumn = HazzatContentUtils._getTextColumn(copticParagraphs, ContentLanguage.Coptic);
                arabicColumn = HazzatContentUtils._getTextColumn(arabicParagraphs, ContentLanguage.Arabic);
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
    private static async _prepareHazzatContent(content: string, dataProvider: IDataProvider): Promise<string> {
        let result = content;

        // Replace references to common content
        result = await HazzatContentUtils._replaceCommonContent(result, dataProvider);

        return result;
    }

    public static async convertServiceHymnFormatContentDbItemToServiceHymnFormatContentInfo<T extends IHymnContent>(
        serviceHymnFormatContentDbItem: HazzatDbSchema.IServiceHymnFormatContent,
        dataProvider: IDataProvider
    ): Promise<IVariationInfo<T>> {
        return HazzatContentUtils._convertServiceHymnFormatContentDbItemToServiceHymnFormatContentInfo(
            serviceHymnFormatContentDbItem,
            dataProvider,
            `/${ResourceTypes.Seasons}/${serviceHymnFormatContentDbItem.Season_ID}/${ResourceTypes.Services}/${serviceHymnFormatContentDbItem.Service_ID}/${ResourceTypes.Hymns}/${serviceHymnFormatContentDbItem.ServiceHymn_ID}/${ResourceTypes.Formats}/${serviceHymnFormatContentDbItem.Format_ID}/${ResourceTypes.Variations}/${serviceHymnFormatContentDbItem.ItemId}`);
    }

    public static async convertServiceHymnFormatContentDbItemToTuneServiceHymnFormatContentInfo<T extends IHymnContent>(
        serviceHymnFormatContentDbItem: HazzatDbSchema.IServiceHymnFormatContent,
        dataProvider: IDataProvider,
        tuneId: string
    ): Promise<IVariationInfo<T>> {
        return HazzatContentUtils._convertServiceHymnFormatContentDbItemToServiceHymnFormatContentInfo(
            serviceHymnFormatContentDbItem,
            dataProvider,
            `/${ResourceTypes.Tunes}/${tuneId}/${ResourceTypes.Seasons}/${serviceHymnFormatContentDbItem.Season_ID}/${ResourceTypes.Hymns}/${serviceHymnFormatContentDbItem.ServiceHymn_ID}/${ResourceTypes.Formats}/${serviceHymnFormatContentDbItem.Format_ID}/${ResourceTypes.Variations}/${serviceHymnFormatContentDbItem.ItemId}`);
    }

    public static async convertServiceHymnFormatContentDbItemToTypeServiceHymnFormatContentInfo<T extends IHymnContent>(
        serviceHymnFormatContentDbItem: HazzatDbSchema.IServiceHymnFormatContent,
        dataProvider: IDataProvider,
        typeId: string
    ): Promise<IVariationInfo<T>> {
        return HazzatContentUtils._convertServiceHymnFormatContentDbItemToServiceHymnFormatContentInfo(
            serviceHymnFormatContentDbItem,
            dataProvider,
            `/${ResourceTypes.Types}/${typeId}/${ResourceTypes.Seasons}/${serviceHymnFormatContentDbItem.Season_ID}/${ResourceTypes.Hymns}/${serviceHymnFormatContentDbItem.ServiceHymn_ID}/${ResourceTypes.Formats}/${serviceHymnFormatContentDbItem.Format_ID}/${ResourceTypes.Variations}/${serviceHymnFormatContentDbItem.ItemId}`);
    }

    private static async _convertServiceHymnFormatContentDbItemToServiceHymnFormatContentInfo<T extends IHymnContent>(
        serviceHymnFormatContentDbItem: HazzatDbSchema.IServiceHymnFormatContent,
        dataProvider: IDataProvider,
        id: string
    ): Promise<IVariationInfo<T>> {

        let content: any = null;

        // to avoid making multiple calls to the db to fetch the same reason
        let reasonInfo: HazzatDbSchema.IReason;
        const getReasonFunc = async () => {
            if (!reasonInfo) {
                reasonInfo = await dataProvider.getReason(serviceHymnFormatContentDbItem.Reason_ID);
            }
            return reasonInfo;
        };

        switch (serviceHymnFormatContentDbItem.Format_ID) {
            case 1: // Text
                content = {
                    paragraphs: await HazzatContentUtils._collateTextContent(
                        serviceHymnFormatContentDbItem.Content_English,
                        serviceHymnFormatContentDbItem.Content_Coptic,
                        serviceHymnFormatContentDbItem.Content_Arabic,
                        dataProvider,
                        getReasonFunc),
                    contentType: ContentType.TextContent
                } as ITextContent;
                break;
            case 2: // Hazzat
                content = {
                    englishHazzat: await HazzatContentUtils._prepareHazzatContent(serviceHymnFormatContentDbItem.Content_English, dataProvider),
                    copticHazzat: await HazzatContentUtils._prepareHazzatContent(serviceHymnFormatContentDbItem.Content_Coptic, dataProvider),
                    arabicHazzat: await HazzatContentUtils._prepareHazzatContent(serviceHymnFormatContentDbItem.Content_Arabic, dataProvider),
                    contentType: ContentType.HazzatContent
                } as IHazzatContent;
                break;
            case 3: // Vertical Hazzat
                content = {
                    englishVerticalHazzat: await HazzatContentUtils._prepareHazzatContent(serviceHymnFormatContentDbItem.Content_English, dataProvider),
                    copticVerticalHazzat: await HazzatContentUtils._prepareHazzatContent(serviceHymnFormatContentDbItem.Content_Coptic, dataProvider),
                    arabicVerticalHazzat: await HazzatContentUtils._prepareHazzatContent(serviceHymnFormatContentDbItem.Content_Arabic, dataProvider),
                    contentType: ContentType.VerticalHazzatContent
                } as IVerticalHazzatContent;
                break;
            case 4: // Musical Notes
                content = {
                    musicFilePath: serviceHymnFormatContentDbItem.Music_Path,
                    audioFilePath: serviceHymnFormatContentDbItem.Audio_Path,
                    contentType: ContentType.MusicalNotesContent
                } as IMusicalNotesContent;
                break;
            case 5: // Audio
                content = {
                    audioFilePath: serviceHymnFormatContentDbItem.Audio_Path,
                    contentType: ContentType.AudioContent
                } as IAudioContent;
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
            id,
            name: serviceHymnFormatContentDbItem.Content_Name,
            content
        };
    }

    public static convertTypeDbItemToTypeInfo(typeDbItem: HazzatDbSchema.IType): ITypeInfo {
        return {
            id: `/${ResourceTypes.Types}/${typeDbItem.ItemId}`,
            name: typeDbItem.Name,
            nameSingular: typeDbItem.Name_Short,
            order: typeDbItem.Type_Order,
            hymnCount: typeDbItem.ServiceHymnsCount
        };
    }

    public static convertTuneDbItemToTypeInfo(tuneDbItem: HazzatDbSchema.ITune): ITuneInfo {
        return {
            id: `/${ResourceTypes.Tunes}/${tuneDbItem.ItemId}`,
            name: tuneDbItem.Name,
            order: tuneDbItem.Tune_Order,
            hymnCount: tuneDbItem.ServiceHymnsCount
        };
    }
}
