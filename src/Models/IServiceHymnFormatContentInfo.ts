interface ContentType {
    TextContent: undefined;
    HazzatContent: undefined;
    VerticalHazzatContent: undefined;
    VideoContent: undefined;
    InformationContent: undefined;
}

interface ContentCommon {
    contentType: keyof ContentType;
}

export interface ITextContent extends ContentCommon {
    arabicText: string;
    copticText: string;
    englishText: string;
}

export interface IHazzatContent extends ContentCommon {
    arabicHazzat: string;
    copticHazzat: string;
    englishHazzat: string;
}

export interface IVerticalHazzatContent extends ContentCommon {
    arabicVerticalHazzat: string;
    copticVerticalHazzat: string;
    englishVerticalHazzat: string;
}

export interface IVideoContent extends ContentCommon {
    arabicVideo: string;
    copticVideo: string;
    englishVideo: string;
}

export interface IInformationContent extends ContentCommon {
    arabicInformation: string;
    englishInformation: string;
}

export declare type IHymnContent =
    ITextContent |
    IHazzatContent |
    IVerticalHazzatContent |
    IVideoContent |
    IInformationContent;

/*
 * Service Hymn Format Content Info
 */
export interface IServiceHymnFormatContentInfo<T extends IHymnContent> {
    id: number;
    name: string;
    content: T;  // TODO: Not sure how I feel about having this being polymorphic.  Bad design?
    seasonId: number;
    seasonName: string;
    serviceId: number;
    serviceName: string;
    serviceHymnId: number;
    serviceHymnName: string;
    formatId: number;
    formatName: string;
}
