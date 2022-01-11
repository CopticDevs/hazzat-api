/****** Object:  StoredProcedure [dbo].[Hymns_ServiceHymnListSelectByTuneIdAndSeasonId]    Script Date: 1/10/2022 6:47:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[Hymns_ServiceHymnListSelectByTuneIdAndSeasonId]
    @Tune_ID int,
	@Season_ID int
AS 
BEGIN
	SELECT
        [dbo].[Hymns_ServiceHymns].[ID] AS ItemId,
		[dbo].[Hymns_Seasons].[ID] AS Season_ID,
		[dbo].[Hymns_Seasons].[Name] AS Season_Name,
		[dbo].[Hymns_Services].[ID] AS Service_ID,
		[dbo].[Hymns_Services].[Name] AS Service_Name,
		[dbo].[Hymns_ServiceHymns].[Hymn_Order],
		[dbo].[Hymns_ServiceHymns].[Title]
    FROM
        [dbo].[Hymns_Structure] INNER JOIN
        [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID] INNER JOIN
        [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID] INNER JOIN
        [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID] INNER JOIN
        [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_ServiceHymns].[ID] = [dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID]
    WHERE
        [dbo].[Hymns_ServiceHymnsContent].[Tune_ID] = @Tune_ID AND
		[dbo].[Hymns_Seasons].[ID] = @Season_ID
    GROUP BY
        [dbo].[Hymns_ServiceHymns].[ID],
		[dbo].[Hymns_Seasons].[ID],
		[dbo].[Hymns_Seasons].[Name],
		[dbo].[Hymns_Services].[ID],
		[dbo].[Hymns_Services].[Name],
		[dbo].[Hymns_ServiceHymns].[Hymn_Order],
		[dbo].[Hymns_ServiceHymns].[Title],
		[dbo].[Hymns_Structure].[Service_Order]
    ORDER BY
	    [dbo].[Hymns_Structure].[Service_Order],
        [dbo].[Hymns_ServiceHymns].[Hymn_Order]
END
GO


/****** Object:  StoredProcedure [dbo].[Hymns_ServiceHymnListSelectByTypeIdAndSeasonId]    Script Date: 1/10/2022 6:50:23 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[Hymns_ServiceHymnListSelectByTypeIdAndSeasonId]
    @Type_ID int,
	@Season_ID int
AS 
BEGIN
	SELECT
        [dbo].[Hymns_ServiceHymns].[ID] AS ItemId,
		[dbo].[Hymns_Seasons].[ID] AS Season_ID,
		[dbo].[Hymns_Seasons].[Name] AS Season_Name,
		[dbo].[Hymns_Services].[ID] AS Service_ID,
		[dbo].[Hymns_Services].[Name] AS Service_Name,
		[dbo].[Hymns_ServiceHymns].[Hymn_Order],
		[dbo].[Hymns_ServiceHymns].[Title]
    FROM
        [dbo].[Hymns_Structure] INNER JOIN
        [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID] INNER JOIN
        [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID] INNER JOIN
        [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID] INNER JOIN
        [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_ServiceHymns].[ID] = [dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID]
    WHERE
        [dbo].[Hymns_ServiceHymnsContent].[Type_ID] = @Type_ID AND
		[dbo].[Hymns_Seasons].[ID] = @Season_ID
    GROUP BY
        [dbo].[Hymns_ServiceHymns].[ID],
		[dbo].[Hymns_Seasons].[ID],
		[dbo].[Hymns_Seasons].[Name],
		[dbo].[Hymns_Services].[ID],
		[dbo].[Hymns_Services].[Name],
		[dbo].[Hymns_ServiceHymns].[Hymn_Order],
		[dbo].[Hymns_ServiceHymns].[Title],
		[dbo].[Hymns_Structure].[Service_Order]
    ORDER BY
	    [dbo].[Hymns_Structure].[Service_Order],
        [dbo].[Hymns_ServiceHymns].[Hymn_Order]
END
GO


--Rename the stored procedures.  
EXEC sp_rename 'Hymns_SeasonListSelectByTypeID', 'Hymns_SeasonListSelectByTypeId';
EXEC sp_rename 'Hymns_SeasonSelectByTypeIDAndSeasonID', 'Hymns_SeasonSelectByTypeIdAndSeasonId';
EXEC sp_rename 'Hymns_SeasonListSelectByTuneID', 'Hymns_SeasonListSelectByTuneId';
EXEC sp_rename 'Hymns_SeasonSelectByTuneIDAndSeasonID', 'Hymns_SeasonSelectByTuneIdAndSeasonId';

