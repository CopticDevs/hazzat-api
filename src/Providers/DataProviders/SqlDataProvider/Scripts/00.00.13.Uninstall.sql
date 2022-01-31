--Rename the stored procedures.  
EXEC sp_rename 'Hymns_FormatListSelectByTypeIdAndSeasonIdAndServiceHymnId', 'Hymns_FormatListSelectByByTypeIdAndSeasonIdAndServiceHymnId';
EXEC sp_rename 'Hymns_FormatSelectByTypeIdAndSeasonIdAndServiceHymnIdAndFormatId', 'Hymns_FormatSelectByByTypeIdAndSeasonIdAndServiceHymnIdAndFormatId';
EXEC sp_rename 'Hymns_FormatListSelectByTuneIdAndSeasonIdAndServiceHymnId', 'Hymns_FormatListSelectByByTuneIdAndSeasonIdAndServiceHymnId';
EXEC sp_rename 'Hymns_FormatSelectByTuneIdAndSeasonIdAndServiceHymnIdAndFormatId', 'Hymns_FormatSelectByByTuneIdAndSeasonIdAndServiceHymnIdAndFormatId';
EXEC sp_rename 'Hymns_HymnContentSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatIdAndContentId', 'Hymns_HymnContentSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId';


/****** Object:  StoredProcedure [dbo].[Hymns_HymnContentListSelectByTuneIdAndSeasonIdAndServiceHymnIdAndFormatId]    Script Date: 1/29/2022 1:28:21 PM ******/
DROP PROCEDURE [dbo].[Hymns_HymnContentListSelectByTuneIdAndSeasonIdAndServiceHymnIdAndFormatId]
GO


/****** Object:  StoredProcedure [dbo].[Hymns_HymnContentSelectByTuneIdAndSeasonIdAndServiceHymnIdAndFormatIdAndContentId]    Script Date: 1/29/2022 2:40:09 PM ******/
DROP PROCEDURE [dbo].[Hymns_HymnContentSelectByTuneIdAndSeasonIdAndServiceHymnIdAndFormatIdAndContentId]
GO


/****** Object:  StoredProcedure [dbo].[Hymns_HymnContentListSelectByTypeIdAndSeasonIdAndServiceHymnIdAndFormatId]    Script Date: 1/29/2022 1:28:55 PM ******/
DROP PROCEDURE [dbo].[Hymns_HymnContentListSelectByTypeIdAndSeasonIdAndServiceHymnIdAndFormatId]
GO


/****** Object:  StoredProcedure [dbo].[Hymns_HymnContentSelectByTypeIdAndSeasonIdAndServiceHymnIdAndFormatIdAndContentId]    Script Date: 1/29/2022 2:40:25 PM ******/
DROP PROCEDURE [dbo].[Hymns_HymnContentSelectByTypeIdAndSeasonIdAndServiceHymnIdAndFormatIdAndContentId]
GO


