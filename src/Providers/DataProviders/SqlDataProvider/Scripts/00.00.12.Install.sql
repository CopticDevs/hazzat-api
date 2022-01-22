/****** Object:  StoredProcedure [dbo].[Hymns_FormatListSelectByByTuneIdAndSeasonIdAndServiceHymnId]    Script Date: 1/22/2022 11:50:26 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





CREATE PROCEDURE [dbo].[Hymns_FormatListSelectByByTuneIdAndSeasonIdAndServiceHymnId]
    @Tune_ID int,
	@Season_ID int,
	@ServiceHymn_ID int
AS 
BEGIN
	SELECT
		[dbo].[Hymns_Formats].[ID] AS ItemId,
		[dbo].[Hymns_Formats].[Name] AS Format_Name,
        [dbo].[Hymns_Structure].[Season_ID] AS Season_ID,
		[dbo].[Hymns_Seasons].[Name] AS Season_Name,
		[dbo].[Hymns_Structure].[Service_ID] AS Service_ID,
		[dbo].[Hymns_Services].[Name] AS Service_Name,
		[dbo].[Hymns_ServiceHymns].[Hymn_Order],
		[dbo].[Hymns_ServiceHymns].[ID] AS ServiceHymn_ID,
        [dbo].[Hymns_ServiceHymns].[Title] AS ServiceHymn_Title,
		COUNT([dbo].[Hymns_ServiceHymnsContent].[ID]) AS Content_Count
    FROM
        [dbo].[Hymns_Structure] INNER JOIN
        [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID] INNER JOIN
        [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID] INNER JOIN
        [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID] INNER JOIN
        [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_ServiceHymns].[ID] = [dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID] INNER JOIN
		[dbo].[Hymns_Formats] ON [dbo].[Hymns_ServiceHymnsContent].[Format_ID] = [dbo].[Hymns_Formats].[ID]
    WHERE
        [dbo].[Hymns_ServiceHymnsContent].[Tune_ID] = @Tune_ID AND
		[dbo].[Hymns_Seasons].[ID] = @Season_ID AND
		[dbo].[Hymns_ServiceHymns].[ID] = @ServiceHymn_ID
    GROUP BY
        [dbo].[Hymns_Formats].[ID],
		[dbo].[Hymns_Formats].[Name],
        [dbo].[Hymns_Structure].[Season_ID],
		[dbo].[Hymns_Seasons].[Name],
		[dbo].[Hymns_Structure].[Service_ID],
		[dbo].[Hymns_Services].[Name],
		[dbo].[Hymns_ServiceHymns].[Hymn_Order],
		[dbo].[Hymns_ServiceHymns].[ID],
        [dbo].[Hymns_ServiceHymns].[Title],
		[dbo].[Hymns_Structure].[Service_Order],
		[dbo].[Hymns_Formats].[Format_Order]
    ORDER BY
	    [dbo].[Hymns_Structure].[Service_Order],
        [dbo].[Hymns_ServiceHymns].[Hymn_Order],
		[dbo].[Hymns_Formats].[Format_Order]
END
GO


/****** Object:  StoredProcedure [dbo].[Hymns_FormatSelectByByTuneIdAndSeasonIdAndServiceHymnIdAndFormatId]    Script Date: 1/22/2022 12:57:32 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO







CREATE PROCEDURE [dbo].[Hymns_FormatSelectByByTuneIdAndSeasonIdAndServiceHymnIdAndFormatId]
    @Tune_ID int,
	@Season_ID int,
	@ServiceHymn_ID int,
	@Format_ID int
AS 
BEGIN
	SELECT
		[dbo].[Hymns_Formats].[ID] AS ItemId,
		[dbo].[Hymns_Formats].[Name] AS Format_Name,
        [dbo].[Hymns_Structure].[Season_ID] AS Season_ID,
		[dbo].[Hymns_Seasons].[Name] AS Season_Name,
		[dbo].[Hymns_Structure].[Service_ID] AS Service_ID,
		[dbo].[Hymns_Services].[Name] AS Service_Name,
		[dbo].[Hymns_ServiceHymns].[Hymn_Order],
		[dbo].[Hymns_ServiceHymns].[ID] AS ServiceHymn_ID,
        [dbo].[Hymns_ServiceHymns].[Title] AS ServiceHymn_Title,
		COUNT([dbo].[Hymns_ServiceHymnsContent].[ID]) AS Content_Count
    FROM
        [dbo].[Hymns_Structure] INNER JOIN
        [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID] INNER JOIN
        [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID] INNER JOIN
        [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID] INNER JOIN
        [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_ServiceHymns].[ID] = [dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID] INNER JOIN
		[dbo].[Hymns_Formats] ON [dbo].[Hymns_ServiceHymnsContent].[Format_ID] = [dbo].[Hymns_Formats].[ID]
    WHERE
        [dbo].[Hymns_ServiceHymnsContent].[Tune_ID] = @Tune_ID AND
		[dbo].[Hymns_Seasons].[ID] = @Season_ID AND
		[dbo].[Hymns_ServiceHymns].[ID] = @ServiceHymn_ID AND
		[dbo].[Hymns_Formats].[ID] = @Format_ID
    GROUP BY
        [dbo].[Hymns_Formats].[ID],
		[dbo].[Hymns_Formats].[Name],
        [dbo].[Hymns_Structure].[Season_ID],
		[dbo].[Hymns_Seasons].[Name],
		[dbo].[Hymns_Structure].[Service_ID],
		[dbo].[Hymns_Services].[Name],
		[dbo].[Hymns_ServiceHymns].[Hymn_Order],
		[dbo].[Hymns_ServiceHymns].[ID],
        [dbo].[Hymns_ServiceHymns].[Title],
		[dbo].[Hymns_Structure].[Service_Order],
		[dbo].[Hymns_Formats].[Format_Order]
    ORDER BY
	    [dbo].[Hymns_Structure].[Service_Order],
        [dbo].[Hymns_ServiceHymns].[Hymn_Order],
		[dbo].[Hymns_Formats].[Format_Order]
END
GO



/****** Object:  StoredProcedure [dbo].[Hymns_FormatListSelectByByTypeIdAndSeasonIdAndServiceHymnId]    Script Date: 1/22/2022 11:52:42 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO






CREATE PROCEDURE [dbo].[Hymns_FormatListSelectByByTypeIdAndSeasonIdAndServiceHymnId]
    @Type_ID int,
	@Season_ID int,
	@ServiceHymn_ID int
AS 
BEGIN
	SELECT
		[dbo].[Hymns_Formats].[ID] AS ItemId,
		[dbo].[Hymns_Formats].[Name] AS Format_Name,
        [dbo].[Hymns_Structure].[Season_ID] AS Season_ID,
		[dbo].[Hymns_Seasons].[Name] AS Season_Name,
		[dbo].[Hymns_Structure].[Service_ID] AS Service_ID,
		[dbo].[Hymns_Services].[Name] AS Service_Name,
		[dbo].[Hymns_ServiceHymns].[Hymn_Order],
		[dbo].[Hymns_ServiceHymns].[ID] AS ServiceHymn_ID,
        [dbo].[Hymns_ServiceHymns].[Title] AS ServiceHymn_Title,
		COUNT([dbo].[Hymns_ServiceHymnsContent].[ID]) AS Content_Count
    FROM
        [dbo].[Hymns_Structure] INNER JOIN
        [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID] INNER JOIN
        [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID] INNER JOIN
        [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID] INNER JOIN
        [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_ServiceHymns].[ID] = [dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID] INNER JOIN
		[dbo].[Hymns_Formats] ON [dbo].[Hymns_ServiceHymnsContent].[Format_ID] = [dbo].[Hymns_Formats].[ID]
    WHERE
        [dbo].[Hymns_ServiceHymnsContent].[Type_ID] = @Type_ID AND
		[dbo].[Hymns_Seasons].[ID] = @Season_ID AND
		[dbo].[Hymns_ServiceHymns].[ID] = @ServiceHymn_ID
    GROUP BY
        [dbo].[Hymns_Formats].[ID],
		[dbo].[Hymns_Formats].[Name],
        [dbo].[Hymns_Structure].[Season_ID],
		[dbo].[Hymns_Seasons].[Name],
		[dbo].[Hymns_Structure].[Service_ID],
		[dbo].[Hymns_Services].[Name],
		[dbo].[Hymns_ServiceHymns].[Hymn_Order],
		[dbo].[Hymns_ServiceHymns].[ID],
        [dbo].[Hymns_ServiceHymns].[Title],
		[dbo].[Hymns_Structure].[Service_Order],
		[dbo].[Hymns_Formats].[Format_Order]
    ORDER BY
	    [dbo].[Hymns_Structure].[Service_Order],
        [dbo].[Hymns_ServiceHymns].[Hymn_Order],
		[dbo].[Hymns_Formats].[Format_Order]
END
GO


/****** Object:  StoredProcedure [dbo].[Hymns_FormatSelectByByTypeIdAndSeasonIdAndServiceHymnIdAndFormatId]    Script Date: 1/22/2022 12:58:00 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO








CREATE PROCEDURE [dbo].[Hymns_FormatSelectByByTypeIdAndSeasonIdAndServiceHymnIdAndFormatId]
    @Type_ID int,
	@Season_ID int,
	@ServiceHymn_ID int,
	@Format_ID int
AS 
BEGIN
	SELECT
		[dbo].[Hymns_Formats].[ID] AS ItemId,
		[dbo].[Hymns_Formats].[Name] AS Format_Name,
        [dbo].[Hymns_Structure].[Season_ID] AS Season_ID,
		[dbo].[Hymns_Seasons].[Name] AS Season_Name,
		[dbo].[Hymns_Structure].[Service_ID] AS Service_ID,
		[dbo].[Hymns_Services].[Name] AS Service_Name,
		[dbo].[Hymns_ServiceHymns].[Hymn_Order],
		[dbo].[Hymns_ServiceHymns].[ID] AS ServiceHymn_ID,
        [dbo].[Hymns_ServiceHymns].[Title] AS ServiceHymn_Title,
		COUNT([dbo].[Hymns_ServiceHymnsContent].[ID]) AS Content_Count
    FROM
        [dbo].[Hymns_Structure] INNER JOIN
        [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID] INNER JOIN
        [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID] INNER JOIN
        [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID] INNER JOIN
        [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_ServiceHymns].[ID] = [dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID] INNER JOIN
		[dbo].[Hymns_Formats] ON [dbo].[Hymns_ServiceHymnsContent].[Format_ID] = [dbo].[Hymns_Formats].[ID]
    WHERE
        [dbo].[Hymns_ServiceHymnsContent].[Type_ID] = @Type_ID AND
		[dbo].[Hymns_Seasons].[ID] = @Season_ID AND
		[dbo].[Hymns_ServiceHymns].[ID] = @ServiceHymn_ID AND
		[dbo].[Hymns_Formats].[ID] = @Format_ID
    GROUP BY
        [dbo].[Hymns_Formats].[ID],
		[dbo].[Hymns_Formats].[Name],
        [dbo].[Hymns_Structure].[Season_ID],
		[dbo].[Hymns_Seasons].[Name],
		[dbo].[Hymns_Structure].[Service_ID],
		[dbo].[Hymns_Services].[Name],
		[dbo].[Hymns_ServiceHymns].[Hymn_Order],
		[dbo].[Hymns_ServiceHymns].[ID],
        [dbo].[Hymns_ServiceHymns].[Title],
		[dbo].[Hymns_Structure].[Service_Order],
		[dbo].[Hymns_Formats].[Format_Order]
    ORDER BY
	    [dbo].[Hymns_Structure].[Service_Order],
        [dbo].[Hymns_ServiceHymns].[Hymn_Order],
		[dbo].[Hymns_Formats].[Format_Order]
END
GO


