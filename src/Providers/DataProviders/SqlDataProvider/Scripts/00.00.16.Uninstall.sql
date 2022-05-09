ALTER TABLE dbo.[Hymns_Services]
DROP COLUMN Name_Arabic




/****** Object:  StoredProcedure [dbo].[Hymns_SeasonServicesSelect]    Script Date: 5/8/2022 4:35:01 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



ALTER PROCEDURE [dbo].[Hymns_SeasonServicesSelect]
    @Season_ID int
AS 
BEGIN 
    SELECT
        [dbo].[Hymns_Structure].[Service_ID] AS ItemId,
        [dbo].[Hymns_Structure].[Season_ID],
        [dbo].[Hymns_Seasons].[Name] AS Season_Name,
        [dbo].[Hymns_Services].[Name] AS Service_Name,
        [dbo].[Hymns_Structure].[Service_Order]
	FROM
        [dbo].[Hymns_Structure]
		INNER JOIN [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID]
		INNER JOIN [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID]
		INNER JOIN [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID]
    WHERE
        ([dbo].[Hymns_Structure].[Season_ID] = @Season_ID)
    GROUP BY
        [dbo].[Hymns_Structure].[ID],
        [dbo].[Hymns_Structure].[Name],
        [dbo].[Hymns_Structure].[Season_ID],
        [dbo].[Hymns_Seasons].[Name],
        [dbo].[Hymns_Structure].[Service_Order],
        [dbo].[Hymns_Structure].[Service_ID],
        [dbo].[Hymns_Services].[Name]
    ORDER BY
        [dbo].[Hymns_Structure].[Service_Order]
END 
GO


/****** Object:  StoredProcedure [dbo].[Hymns_SeasonServicesSelectBySeasonIdAndServiceId]    Script Date: 5/8/2022 5:34:46 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




ALTER PROCEDURE [dbo].[Hymns_SeasonServicesSelectBySeasonIdAndServiceId]
    @Season_ID int,
	@Service_ID int

AS 
BEGIN 
    SELECT
        [dbo].[Hymns_Structure].[Service_ID] AS ItemId,
        [dbo].[Hymns_Structure].[Season_ID],
        [dbo].[Hymns_Seasons].[Name] AS Season_Name,
        [dbo].[Hymns_Services].[Name] AS Service_Name,
        [dbo].[Hymns_Structure].[Service_Order]
	FROM
        [dbo].[Hymns_Structure]
		INNER JOIN [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID]
		INNER JOIN [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID]
		INNER JOIN [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID]
    WHERE
        ([dbo].[Hymns_Structure].[Season_ID] = @Season_ID AND [dbo].[Hymns_Structure].[Service_ID] = @Service_ID)
    GROUP BY
        [dbo].[Hymns_Structure].[ID],
        [dbo].[Hymns_Structure].[Name],
        [dbo].[Hymns_Structure].[Season_ID],
        [dbo].[Hymns_Seasons].[Name],
        [dbo].[Hymns_Structure].[Service_Order],
        [dbo].[Hymns_Structure].[Service_ID],
        [dbo].[Hymns_Services].[Name]
    ORDER BY
        [dbo].[Hymns_Structure].[Service_Order]
END 
GO


