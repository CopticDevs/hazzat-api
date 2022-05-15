ALTER Table dbo.[Hymns_ServiceHymns]
DROP COLUMN [Title_Arabic]


/****** Object:  StoredProcedure [dbo].[Hymns_ServiceHymnListSelectBySeasonIdAndServiceId]    Script Date: 5/14/2022 3:04:52 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




ALTER PROCEDURE [dbo].[Hymns_ServiceHymnListSelectBySeasonIdAndServiceId]
    @Season_ID int,
	@Service_ID int
AS 
BEGIN 
    SELECT
        [dbo].[Hymns_ServiceHymns].[ID] AS ItemId,
        [dbo].[Hymns_Structure].[Season_ID] AS Season_ID,
		[dbo].[Hymns_Seasons].[Name] AS Season_Name,
		[dbo].[Hymns_Structure].[Service_ID] AS Service_ID,
		[dbo].[Hymns_Services].[Name] AS Service_Name,
		[dbo].[Hymns_ServiceHymns].[Title],
		[dbo].[Hymns_ServiceHymns].[Hymn_Order]
    FROM
        [dbo].[Hymns_Structure]
		INNER JOIN [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID]
		INNER JOIN [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID]
		INNER JOIN [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID]
    WHERE
        [dbo].[Hymns_Structure].[Season_ID] = @Season_ID AND
		[dbo].[Hymns_Structure].[Service_ID] = @Service_ID
    ORDER BY
        [dbo].[Hymns_ServiceHymns].[Hymn_Order]
END
GO


/****** Object:  StoredProcedure [dbo].[Hymns_ServiceHymnSelectBySeasonIdAndServiceIdAndServiceHymnId]    Script Date: 5/15/2022 12:34:52 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




ALTER PROCEDURE [dbo].[Hymns_ServiceHymnSelectBySeasonIdAndServiceIdAndServiceHymnId]
    @Season_ID int,
	@Service_ID int,
	@ServiceHymn_ID int
AS 
BEGIN 
    SELECT
        [dbo].[Hymns_ServiceHymns].[ID] AS ItemId,
        [dbo].[Hymns_Structure].[Season_ID] AS Season_ID,
		[dbo].[Hymns_Seasons].[Name] AS Season_Name,
		[dbo].[Hymns_Structure].[Service_ID] AS Service_ID,
		[dbo].[Hymns_Services].[Name] AS Service_Name,
		[dbo].[Hymns_ServiceHymns].[Title],
		[dbo].[Hymns_ServiceHymns].[Hymn_Order]
    FROM
        [dbo].[Hymns_Structure]
		INNER JOIN [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID]
		INNER JOIN [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID]
		INNER JOIN [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID]
    WHERE
        [dbo].[Hymns_Structure].[Season_ID] = @Season_ID AND
		[dbo].[Hymns_Structure].[Service_ID] = @Service_ID AND
		[dbo].[Hymns_ServiceHymns].[ID] = @ServiceHymn_ID
    ORDER BY
        [dbo].[Hymns_ServiceHymns].[Hymn_Order]
END
GO


