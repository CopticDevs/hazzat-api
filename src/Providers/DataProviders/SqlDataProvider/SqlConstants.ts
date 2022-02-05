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
        export const HymnContentSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatIdAndContentId = "HymnContentSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatIdAndContentId";
        export const TypeListSelect = "TypeListSelect";
        export const TypeSelect = "TypeSelect";
        export const SeasonListSelectByTypeId = "SeasonListSelectByTypeId";
        export const SeasonSelectByTypeIdAndSeasonId = "SeasonSelectByTypeIdAndSeasonId";
        export const ServiceHymnListSelectByTypeIdAndSeasonId = "ServiceHymnListSelectByTypeIdAndSeasonId";
        export const ServiceHymnSelectByTypeIdAndSeasonIdAndServiceHymnId = "ServiceHymnSelectByTypeIdAndSeasonIdAndServiceHymnId";
        export const FormatListSelectByTypeIdAndSeasonIdAndServiceHymnId = "FormatListSelectByTypeIdAndSeasonIdAndServiceHymnId";
        export const FormatSelectByTypeIdAndSeasonIdAndServiceHymnIdAndFormatId = "FormatSelectByTypeIdAndSeasonIdAndServiceHymnIdAndFormatId";
        export const HymnContentListSelectByTypeIdAndSeasonIdAndServiceHymnIdAndFormatId = "HymnContentListSelectByTypeIdAndSeasonIdAndServiceHymnIdAndFormatId";
        export const HymnContentSelectByTypeIdAndSeasonIdAndServiceHymnIdAndFormatIdAndContentId = "HymnContentSelectByTypeIdAndSeasonIdAndServiceHymnIdAndFormatIdAndContentId";
        export const TuneListSelect = "TuneListSelect";
        export const TuneSelect = "TuneSelect";
        export const SeasonListSelectByTuneId = "SeasonListSelectByTuneId";
        export const SeasonSelectByTuneIdAndSeasonId = "SeasonSelectByTuneIdAndSeasonId";
        export const ServiceHymnListSelectByTuneIdAndSeasonId = "ServiceHymnListSelectByTuneIdAndSeasonId";
        export const ServiceHymnSelectByTuneIdAndSeasonIdAndServiceHymnId = "ServiceHymnSelectByTuneIdAndSeasonIdAndServiceHymnId";
        export const FormatListSelectByTuneIdAndSeasonIdAndServiceHymnId = "FormatListSelectByTuneIdAndSeasonIdAndServiceHymnId";
        export const FormatSelectByTuneIdAndSeasonIdAndServiceHymnIdAndFormatId = "FormatSelectByTuneIdAndSeasonIdAndServiceHymnIdAndFormatId";
        export const HymnContentListSelectByTuneIdAndSeasonIdAndServiceHymnIdAndFormatId = "HymnContentListSelectByTuneIdAndSeasonIdAndServiceHymnIdAndFormatId";
        export const HymnContentSelectByTuneIdAndSeasonIdAndServiceHymnIdAndFormatIdAndContentId = "HymnContentSelectByTuneIdAndSeasonIdAndServiceHymnIdAndFormatIdAndContentId";
        export const CommonSelect = "CommonSelect";
        export const ReasonSelect = "ReasonSelect";
        export const BookletListSelect = "BookletListSelect";

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
        export const TypeId = "Type_ID";
        export const TuneId = "Tune_ID";
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
