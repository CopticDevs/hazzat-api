export interface ITextContent {
    arabicText: string;
    copticText: string;
    englishText: string;
}

export interface IHazzatContent {
    arabicHazzat: string;
    copticHazzat: string;
    englishHazzat: string;
}

export interface IVerticalHazzatContent {
    arabicVerticalHazzat: string;
    copticVerticalHazzat: string;
    englishVerticalHazzat: string;
}

export interface IVideoContent {
    arabicVideo: string;
    copticVideo: string;
    englishVideo: string;
}

export interface IInformationContent {
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
