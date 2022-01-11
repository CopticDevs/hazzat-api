/****** Object:  StoredProcedure [dbo].[Hymns_ServiceHymnListSelectByTuneIdAndSeasonId]    Script Date: 1/10/2022 6:47:42 PM ******/
DROP PROCEDURE [dbo].[Hymns_ServiceHymnListSelectByTuneIdAndSeasonId]
GO


/****** Object:  StoredProcedure [dbo].[Hymns_ServiceHymnListSelectByTypeIdAndSeasonId]    Script Date: 1/10/2022 6:50:40 PM ******/
DROP PROCEDURE [dbo].[Hymns_ServiceHymnListSelectByTypeIdAndSeasonId]
GO


--Rename the stored procedures.  
EXEC sp_rename 'Hymns_SeasonListSelectByTypeId', 'Hymns_SeasonListSelectByTypeID';
EXEC sp_rename 'Hymns_SeasonSelectByTypeIdAndSeasonId', 'Hymns_SeasonSelectByTypeIDAndSeasonID';
EXEC sp_rename 'Hymns_SeasonListSelectByTuneId', 'Hymns_SeasonListSelectByTuneID';
EXEC sp_rename 'Hymns_SeasonSelectByTuneIdAndSeasonId', 'Hymns_SeasonSelectByTuneIDAndSeasonID';
