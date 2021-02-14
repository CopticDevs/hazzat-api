export namespace Constants {
    export namespace StoredProcedures {
        export const SeasonListSelectAll = "SeasonListSelectAll";
        export const SeasonSelect = "SeasonSelect";
        export const SeasonServicesSelect = "SeasonServicesSelect";
        export const SeasonServicesSelectBySeasonIdAndServiceId = "SeasonServicesSelectBySeasonIdAndServiceId";
        export const ServiceHymnListSelectBySeasonIdAndServiceId = "ServiceHymnListSelectBySeasonIdAndServiceId";
        export const ServiceHymnSelectBySeasonIdAndServiceIdAndServiceHymnId = "ServiceHymnSelectBySeasonIdAndServiceIdAndServiceHymnId";
        export const HymnFormatListSelectBySeasonIdAndServiceIdAndServiceHymnId = "HymnFormatListSelectBySeasonIdAndServiceIdAndServiceHymnId";
        export const HymnFormatSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId = "HymnFormatSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId";
        export const HymnContentListSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId = "HymnContentListSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId";
        export const HymnContentSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId = "HymnContentSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId";
        export const TypeListSelect = "TypeListSelect";
        export const TuneListSelect = "TuneListSelect";
        export const CommonSelect = "CommonSelect";
        export const ReasonSelect = "ReasonSelect";

        export const ServiceHymnListSelectBySeasonServiceId = "ServiceHymnListSelectBySeasonServiceId";
    }

    export namespace Parameters {
        export const SeasonId = "Season_ID";
        export const ServiceId = "Service_ID";
        export const ServiceHymnId = "ServiceHymn_ID";
        export const FormatId = "Format_ID";
        export const ContentId = "Content_ID";
        export const CommonId = "Common_ID";
        export const ReasonId = "Reason_ID";
    }

    export namespace Tokens {
        export const ParagraphSeparator = "<BR><BR>";
        export const ReasonLong = "<reason_long>";
        export const ReasonShort = "<reason_short>";
        export const commentStartTag = "<comment=";

        export const commonContentRegEx = "\<common\=([0-9]+)\>";
        export const commentRegEx = "\<comment\=([^\>]+)\>";
    }
}
