ALTER Table dbo.[Hymns_Types]
DROP COLUMN Name_Arabic

ALTER Table dbo.[Hymns_Types]
DROP COLUMN Name_Short_Arabic

ALTER Table dbo.[Hymns_Tunes]
DROP COLUMN Name_Arabic


/****** Object:  StoredProcedure [dbo].[Hymns_TypeListSelect]    Script Date: 5/28/2022 11:46:00 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[Hymns_TypeListSelect]
AS 
BEGIN 
    SELECT
        [dbo].[Hymns_Types].[ID] AS ItemId,
        [dbo].[Hymns_Types].[Name],
        [dbo].[Hymns_Types].[Name_Short],
        [dbo].[Hymns_Types].[Type_Order],
        COUNT([dbo].[Hymns_ServiceHymnsContent].[ID]) AS ServiceHymnsCount
    FROM
        [dbo].[Hymns_Types]
		INNER JOIN [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_Types].[ID] = [dbo].[Hymns_ServiceHymnsContent].[Type_ID]
    GROUP BY
        [dbo].[Hymns_Types].[ID],
        [dbo].[Hymns_Types].[Name],
        [dbo].[Hymns_Types].[Name_Short],
        [dbo].[Hymns_Types].[Type_Order]
    ORDER BY
        [dbo].[Hymns_Types].[Type_Order]
END 

GO


/****** Object:  StoredProcedure [dbo].[Hymns_TypeSelect]    Script Date: 5/28/2022 2:28:49 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


ALTER PROCEDURE [dbo].[Hymns_TypeSelect]
    @Type_ID int 
AS 
BEGIN
    SELECT
        [dbo].[Hymns_Types].[ID] AS ItemId,
        [dbo].[Hymns_Types].[Name],
        [dbo].[Hymns_Types].[Name_Short],
        [dbo].[Hymns_Types].[Type_Order],
        COUNT([dbo].[Hymns_ServiceHymnsContent].[ID]) AS ServiceHymnsCount
    FROM
        [dbo].[Hymns_Types]
		INNER JOIN [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_Types].[ID] = [dbo].[Hymns_ServiceHymnsContent].[Type_ID]
    WHERE [dbo].[Hymns_Types].[ID] = @Type_ID
	GROUP BY
        [dbo].[Hymns_Types].[ID],
        [dbo].[Hymns_Types].[Name],
        [dbo].[Hymns_Types].[Name_Short],
        [dbo].[Hymns_Types].[Type_Order]
    ORDER BY
        [dbo].[Hymns_Types].[Type_Order]
END 
GO



/****** Object:  StoredProcedure [dbo].[Hymns_SeasonListSelectByTypeId]    Script Date: 5/28/2022 3:25:06 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



ALTER PROCEDURE [dbo].[Hymns_SeasonListSelectByTypeId]
    @Type_ID int
AS 
BEGIN 
    SELECT
        [dbo].[Hymns_Seasons].[ID] AS ItemId,
        [dbo].[Hymns_Seasons].[Name],
        [dbo].[Hymns_Seasons].[Verse],
        [dbo].[Hymns_Seasons].[Season_Order],
        [dbo].[Hymns_Seasons].[Reason_ID],
        [dbo].[Hymns_Reasons].[Name] AS Reason_Name,
        [dbo].[Hymns_Seasons].[Date_Specific]
    FROM
        [dbo].[Hymns_Structure] INNER JOIN
        [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID] INNER JOIN
        [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID] INNER JOIN
        [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID] INNER JOIN
        [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_ServiceHymns].[ID] = [dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID] INNER JOIN
		[dbo].[Hymns_Reasons] ON [dbo].[Hymns_Seasons].[Reason_ID] = [dbo].[Hymns_Reasons].[ID]
    WHERE
        [dbo].[Hymns_ServiceHymnsContent].[Type_ID] = @Type_ID
    GROUP BY
        [dbo].[Hymns_Seasons].[ID],
        [dbo].[Hymns_Seasons].[Name],
		[dbo].[Hymns_Seasons].[Verse],
		[dbo].[Hymns_Seasons].[Season_Order],
		[dbo].[Hymns_Seasons].[Reason_ID],
		[dbo].[Hymns_Reasons].[Name],
        [dbo].[Hymns_Seasons].[Date_Specific]
    ORDER BY
        [dbo].[Hymns_Seasons].[Date_Specific],
        [dbo].[Hymns_Seasons].[Season_Order]
END 

GO


/****** Object:  StoredProcedure [dbo].[Hymns_SeasonSelectByTypeIdAndSeasonId]    Script Date: 5/28/2022 3:27:52 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





ALTER PROCEDURE [dbo].[Hymns_SeasonSelectByTypeIdAndSeasonId]
    @Type_ID int,
	@Season_ID int
AS 
BEGIN 
    SELECT
        [dbo].[Hymns_Seasons].[ID] AS ItemId,
        [dbo].[Hymns_Seasons].[Name],
        [dbo].[Hymns_Seasons].[Verse],
        [dbo].[Hymns_Seasons].[Season_Order],
        [dbo].[Hymns_Seasons].[Reason_ID],
        [dbo].[Hymns_Reasons].[Name] AS Reason_Name,
        [dbo].[Hymns_Seasons].[Date_Specific]
    FROM
        [dbo].[Hymns_Structure] INNER JOIN
        [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID] INNER JOIN
        [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID] INNER JOIN
        [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID] INNER JOIN
        [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_ServiceHymns].[ID] = [dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID] INNER JOIN
		[dbo].[Hymns_Reasons] ON [dbo].[Hymns_Seasons].[Reason_ID] = [dbo].[Hymns_Reasons].[ID]
    WHERE
        [dbo].[Hymns_ServiceHymnsContent].[Type_ID] = @Type_ID AND
		[dbo].[Hymns_Seasons].[ID] = @Season_ID
    GROUP BY
        [dbo].[Hymns_Seasons].[ID],
        [dbo].[Hymns_Seasons].[Name],
		[dbo].[Hymns_Seasons].[Verse],
		[dbo].[Hymns_Seasons].[Season_Order],
		[dbo].[Hymns_Seasons].[Reason_ID],
		[dbo].[Hymns_Reasons].[Name],
        [dbo].[Hymns_Seasons].[Date_Specific]
END 

GO



/****** Object:  StoredProcedure [dbo].[Hymns_ServiceHymnListSelectByTypeIdAndSeasonId]    Script Date: 5/28/2022 4:54:08 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




ALTER PROCEDURE [dbo].[Hymns_ServiceHymnListSelectByTypeIdAndSeasonId]
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


/****** Object:  StoredProcedure [dbo].[Hymns_ServiceHymnSelectByTypeIdAndSeasonIdAndServiceHymnId]    Script Date: 5/28/2022 4:56:58 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO






ALTER PROCEDURE [dbo].[Hymns_ServiceHymnSelectByTypeIdAndSeasonIdAndServiceHymnId]
    @Type_ID int,
	@Season_ID int,
	@ServiceHymn_ID int
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
		[dbo].[Hymns_Seasons].[ID] = @Season_ID AND
		[dbo].[Hymns_ServiceHymns].[ID] = @ServiceHymn_ID
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



/****** Object:  StoredProcedure [dbo].[Hymns_FormatListSelectByTypeIdAndSeasonIdAndServiceHymnId]    Script Date: 5/28/2022 6:48:30 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO







ALTER PROCEDURE [dbo].[Hymns_FormatListSelectByTypeIdAndSeasonIdAndServiceHymnId]
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


/****** Object:  StoredProcedure [dbo].[Hymns_FormatSelectByTypeIdAndSeasonIdAndServiceHymnIdAndFormatId]    Script Date: 5/28/2022 6:52:15 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO








ALTER PROCEDURE [dbo].[Hymns_FormatSelectByTypeIdAndSeasonIdAndServiceHymnIdAndFormatId]
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



/****** Object:  StoredProcedure [dbo].[Hymns_HymnContentListSelectByTypeIdAndSeasonIdAndServiceHymnIdAndFormatId]    Script Date: 5/28/2022 7:35:00 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO







ALTER PROCEDURE [dbo].[Hymns_HymnContentListSelectByTypeIdAndSeasonIdAndServiceHymnIdAndFormatId]
    @Type_ID int,
	@Season_ID int,
	@ServiceHymn_ID int,
	@Format_ID int
AS 
BEGIN 
    SELECT
	    [dbo].[Hymns_ServiceHymnsContent].[ID] AS ItemId,
		[dbo].[Hymns_ServiceHymnsContent].[Title] AS Content_Name,
	    [dbo].[Hymns_Structure].[Season_ID] AS Season_ID,
		[dbo].[Hymns_Seasons].[Name] AS Season_Name,
		[dbo].[Hymns_Seasons].[Reason_ID] AS Reason_ID,
		[dbo].[Hymns_Structure].[Service_ID] AS Service_ID,
		[dbo].[Hymns_Services].[Name] AS Service_Name,
		[dbo].[Hymns_ServiceHymns].[ID] AS ServiceHymn_ID,
        [dbo].[Hymns_ServiceHymns].[Title] AS ServiceHymn_Title,
		[dbo].[Hymns_Formats].[ID] AS Format_ID,
		[dbo].[Hymns_Formats].[Name] AS Format_Name,
	CASE
		WHEN @Format_ID = 1 THEN [dbo].[Hymns_Text].[Text_Arabic]
		WHEN @Format_ID = 2 THEN [dbo].[Hymns_Hazzat].[Hazzat_Arabic]
		WHEN @Format_ID = 3 THEN [dbo].[Hymns_VerticalHazzat].[VerticalHazzat_Arabic]
		WHEN @Format_ID = 4 THEN NULL
		WHEN @Format_ID = 5 THEN NULL
		WHEN @Format_ID = 6 THEN [dbo].[Hymns_Video].[Video_Arabic]
		WHEN @Format_ID = 7 THEN [dbo].[Hymns_Information].[Information_Arabic]
	END AS Content_Arabic,
	CASE
		WHEN @Format_ID = 1 THEN [dbo].[Hymns_Text].[Text_Coptic]
		WHEN @Format_ID = 2 THEN [dbo].[Hymns_Hazzat].[Hazzat_Coptic]
		WHEN @Format_ID = 3 THEN [dbo].[Hymns_VerticalHazzat].[VerticalHazzat_Coptic]
		WHEN @Format_ID = 4 THEN NULL
		WHEN @Format_ID = 5 THEN NULL
		WHEN @Format_ID = 6 THEN [dbo].[Hymns_Video].[Video_Coptic]
		WHEN @Format_ID = 7 THEN NULL
	END AS Content_Coptic,
	CASE
		WHEN @Format_ID = 1 THEN [dbo].[Hymns_Text].[Text_English]
		WHEN @Format_ID = 2 THEN [dbo].[Hymns_Hazzat].[Hazzat_English]
		WHEN @Format_ID = 3 THEN [dbo].[Hymns_VerticalHazzat].[VerticalHazzat_English]
		WHEN @Format_ID = 4 THEN NULL
		WHEN @Format_ID = 5 THEN NULL
		WHEN @Format_ID = 6 THEN [dbo].[Hymns_Video].[Video_English]
		WHEN @Format_ID = 7 THEN [dbo].[Hymns_Information].[Information_English]
	END AS Content_English,
	CASE
		WHEN @Format_ID = 1 THEN NULL
		WHEN @Format_ID = 2 THEN NULL
		WHEN @Format_ID = 3 THEN NULL
		WHEN @Format_ID = 4 THEN [dbo].[Hymns_Music].[Audio_Path]
		WHEN @Format_ID = 5 THEN [dbo].[Hymns_Audio].[Audio_Path]
		WHEN @Format_ID = 6 THEN NULL
		WHEN @Format_ID = 7 THEN NULL
	END AS Audio_Path,
	CASE
		WHEN @Format_ID = 1 THEN NULL
		WHEN @Format_ID = 2 THEN NULL
		WHEN @Format_ID = 3 THEN NULL
		WHEN @Format_ID = 4 THEN [dbo].[Hymns_Music].[Music_Path]
		WHEN @Format_ID = 5 THEN NULL
		WHEN @Format_ID = 6 THEN NULL
		WHEN @Format_ID = 7 THEN NULL
	END AS Music_Path
    FROM
        [dbo].[Hymns_Structure]
		INNER JOIN [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID]
		INNER JOIN [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_ServiceHymns].[ID] = [dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID]
		INNER JOIN [dbo].[Hymns_Formats] ON [dbo].[Hymns_ServiceHymnsContent].[Format_ID] = [dbo].[Hymns_Formats].[ID]
		INNER JOIN [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID]
		INNER JOIN [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID]
		LEFT JOIN [dbo].[Hymns_Text] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Text].[ID]
		LEFT JOIN [dbo].[Hymns_Hazzat] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Hazzat].[ID]
		LEFT JOIN [dbo].[Hymns_VerticalHazzat] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_VerticalHazzat].[ID]
		LEFT JOIN [dbo].[Hymns_Music] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Music].[ID]
		LEFT JOIN [dbo].[Hymns_Audio] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Audio].[ID]
		LEFT JOIN [dbo].[Hymns_Video] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Video].[ID]
		LEFT JOIN [dbo].[Hymns_Information] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Information].[ID]
    WHERE
        [dbo].[Hymns_ServiceHymnsContent].[Type_ID] = @Type_ID AND
		[dbo].[Hymns_Seasons].[ID] = @Season_ID AND
		[dbo].[Hymns_ServiceHymns].[ID] = @ServiceHymn_ID AND
		[dbo].[Hymns_Formats].[ID] = @Format_ID
	ORDER BY
        ItemId
END
GO


/****** Object:  StoredProcedure [dbo].[Hymns_HymnContentSelectByTypeIdAndSeasonIdAndServiceHymnIdAndFormatIdAndContentId]    Script Date: 5/28/2022 7:45:43 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO








ALTER PROCEDURE [dbo].[Hymns_HymnContentSelectByTypeIdAndSeasonIdAndServiceHymnIdAndFormatIdAndContentId]
    @Type_ID int,
	@Season_ID int,
	@ServiceHymn_ID int,
	@Format_ID int,
	@Content_ID int
AS 
BEGIN 
    SELECT
	    [dbo].[Hymns_ServiceHymnsContent].[ID] AS ItemId,
		[dbo].[Hymns_ServiceHymnsContent].[Title] AS Content_Name,
	    [dbo].[Hymns_Structure].[Season_ID] AS Season_ID,
		[dbo].[Hymns_Seasons].[Name] AS Season_Name,
		[dbo].[Hymns_Seasons].[Reason_ID] AS Reason_ID,
		[dbo].[Hymns_Structure].[Service_ID] AS Service_ID,
		[dbo].[Hymns_Services].[Name] AS Service_Name,
		[dbo].[Hymns_ServiceHymns].[ID] AS ServiceHymn_ID,
        [dbo].[Hymns_ServiceHymns].[Title] AS ServiceHymn_Title,
		[dbo].[Hymns_Formats].[ID] AS Format_ID,
		[dbo].[Hymns_Formats].[Name] AS Format_Name,
	CASE
		WHEN @Format_ID = 1 THEN [dbo].[Hymns_Text].[Text_Arabic]
		WHEN @Format_ID = 2 THEN [dbo].[Hymns_Hazzat].[Hazzat_Arabic]
		WHEN @Format_ID = 3 THEN [dbo].[Hymns_VerticalHazzat].[VerticalHazzat_Arabic]
		WHEN @Format_ID = 4 THEN NULL
		WHEN @Format_ID = 5 THEN NULL
		WHEN @Format_ID = 6 THEN [dbo].[Hymns_Video].[Video_Arabic]
		WHEN @Format_ID = 7 THEN [dbo].[Hymns_Information].[Information_Arabic]
	END AS Content_Arabic,
	CASE
		WHEN @Format_ID = 1 THEN [dbo].[Hymns_Text].[Text_Coptic]
		WHEN @Format_ID = 2 THEN [dbo].[Hymns_Hazzat].[Hazzat_Coptic]
		WHEN @Format_ID = 3 THEN [dbo].[Hymns_VerticalHazzat].[VerticalHazzat_Coptic]
		WHEN @Format_ID = 4 THEN NULL
		WHEN @Format_ID = 5 THEN NULL
		WHEN @Format_ID = 6 THEN [dbo].[Hymns_Video].[Video_Coptic]
		WHEN @Format_ID = 7 THEN NULL
	END AS Content_Coptic,
	CASE
		WHEN @Format_ID = 1 THEN [dbo].[Hymns_Text].[Text_English]
		WHEN @Format_ID = 2 THEN [dbo].[Hymns_Hazzat].[Hazzat_English]
		WHEN @Format_ID = 3 THEN [dbo].[Hymns_VerticalHazzat].[VerticalHazzat_English]
		WHEN @Format_ID = 4 THEN NULL
		WHEN @Format_ID = 5 THEN NULL
		WHEN @Format_ID = 6 THEN [dbo].[Hymns_Video].[Video_English]
		WHEN @Format_ID = 7 THEN [dbo].[Hymns_Information].[Information_English]
	END AS Content_English,
	CASE
		WHEN @Format_ID = 1 THEN NULL
		WHEN @Format_ID = 2 THEN NULL
		WHEN @Format_ID = 3 THEN NULL
		WHEN @Format_ID = 4 THEN [dbo].[Hymns_Music].[Audio_Path]
		WHEN @Format_ID = 5 THEN [dbo].[Hymns_Audio].[Audio_Path]
		WHEN @Format_ID = 6 THEN NULL
		WHEN @Format_ID = 7 THEN NULL
	END AS Audio_Path,
	CASE
		WHEN @Format_ID = 1 THEN NULL
		WHEN @Format_ID = 2 THEN NULL
		WHEN @Format_ID = 3 THEN NULL
		WHEN @Format_ID = 4 THEN [dbo].[Hymns_Music].[Music_Path]
		WHEN @Format_ID = 5 THEN NULL
		WHEN @Format_ID = 6 THEN NULL
		WHEN @Format_ID = 7 THEN NULL
	END AS Music_Path
    FROM
        [dbo].[Hymns_Structure]
		INNER JOIN [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID]
		INNER JOIN [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_ServiceHymns].[ID] = [dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID]
		INNER JOIN [dbo].[Hymns_Formats] ON [dbo].[Hymns_ServiceHymnsContent].[Format_ID] = [dbo].[Hymns_Formats].[ID]
		INNER JOIN [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID]
		INNER JOIN [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID]
		LEFT JOIN [dbo].[Hymns_Text] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Text].[ID]
		LEFT JOIN [dbo].[Hymns_Hazzat] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Hazzat].[ID]
		LEFT JOIN [dbo].[Hymns_VerticalHazzat] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_VerticalHazzat].[ID]
		LEFT JOIN [dbo].[Hymns_Music] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Music].[ID]
		LEFT JOIN [dbo].[Hymns_Audio] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Audio].[ID]
		LEFT JOIN [dbo].[Hymns_Video] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Video].[ID]
		LEFT JOIN [dbo].[Hymns_Information] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Information].[ID]
    WHERE
        [dbo].[Hymns_ServiceHymnsContent].[Type_ID] = @Type_ID AND
		[dbo].[Hymns_Seasons].[ID] = @Season_ID AND
		[dbo].[Hymns_ServiceHymns].[ID] = @ServiceHymn_ID AND
		[dbo].[Hymns_Formats].[ID] = @Format_ID AND
		[dbo].[Hymns_ServiceHymnsContent].[ID] = @Content_ID
	ORDER BY
        ItemId
END
GO



/****** Object:  StoredProcedure [dbo].[Hymns_TuneListSelect]    Script Date: 5/28/2022 1:35:50 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[Hymns_TuneListSelect]
AS 
BEGIN 
    SELECT
        [dbo].[Hymns_Tunes].[ID] AS ItemId,
        [dbo].[Hymns_Tunes].[Name],
        [dbo].[Hymns_Tunes].[Tune_Order],
        COUNT([dbo].[Hymns_ServiceHymnsContent].[ID]) AS ServiceHymnsCount

    FROM
        [dbo].[Hymns_Tunes]
		INNER JOIN [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_Tunes].[ID] = [dbo].[Hymns_ServiceHymnsContent].[Tune_ID]
    GROUP BY
        [dbo].[Hymns_Tunes].[ID],
        [dbo].[Hymns_Tunes].[Name],
        [dbo].[Hymns_Tunes].[Tune_Order]
    ORDER BY
        [dbo].[Hymns_Tunes].[Tune_Order]
END 

GO


/****** Object:  StoredProcedure [dbo].[Hymns_TuneSelect]    Script Date: 5/28/2022 2:31:43 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


ALTER PROCEDURE [dbo].[Hymns_TuneSelect]
    @Tune_ID int 
AS 
BEGIN
    SELECT
        [dbo].[Hymns_Tunes].[ID] AS ItemId,
        [dbo].[Hymns_Tunes].[Name],
        [dbo].[Hymns_Tunes].[Tune_Order],
        COUNT([dbo].[Hymns_ServiceHymnsContent].[ID]) AS ServiceHymnsCount

    FROM
        [dbo].[Hymns_Tunes]
		INNER JOIN [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_Tunes].[ID] = [dbo].[Hymns_ServiceHymnsContent].[Tune_ID]
    WHERE [dbo].[Hymns_Tunes].[ID] = @Tune_ID
	GROUP BY
        [dbo].[Hymns_Tunes].[ID],
        [dbo].[Hymns_Tunes].[Name],
        [dbo].[Hymns_Tunes].[Tune_Order]
    ORDER BY
        [dbo].[Hymns_Tunes].[Tune_Order]
END 

GO


/****** Object:  StoredProcedure [dbo].[Hymns_SeasonListSelectByTuneId]    Script Date: 5/28/2022 3:30:49 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


ALTER PROCEDURE [dbo].[Hymns_SeasonListSelectByTuneId]
    @Tune_ID int
AS 
BEGIN 
    SELECT
        [dbo].[Hymns_Seasons].[ID] AS ItemId,
        [dbo].[Hymns_Seasons].[Name],
        [dbo].[Hymns_Seasons].[Verse],
        [dbo].[Hymns_Seasons].[Season_Order],
        [dbo].[Hymns_Seasons].[Reason_ID],
        [dbo].[Hymns_Reasons].[Name] AS Reason_Name,
        [dbo].[Hymns_Seasons].[Date_Specific]
    FROM
        [dbo].[Hymns_Structure] INNER JOIN
        [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID] INNER JOIN
        [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID] INNER JOIN
        [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID] INNER JOIN
        [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_ServiceHymns].[ID] = [dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID] INNER JOIN
		[dbo].[Hymns_Reasons] ON [dbo].[Hymns_Seasons].[Reason_ID] = [dbo].[Hymns_Reasons].[ID]
    WHERE
        [dbo].[Hymns_ServiceHymnsContent].[Tune_ID] = @Tune_ID
    GROUP BY
        [dbo].[Hymns_Seasons].[ID],
        [dbo].[Hymns_Seasons].[Name],
		[dbo].[Hymns_Seasons].[Verse],
		[dbo].[Hymns_Seasons].[Season_Order],
		[dbo].[Hymns_Seasons].[Reason_ID],
		[dbo].[Hymns_Reasons].[Name],
        [dbo].[Hymns_Seasons].[Date_Specific]
    ORDER BY
        [dbo].[Hymns_Seasons].[Date_Specific],
        [dbo].[Hymns_Seasons].[Season_Order]
END 

GO


/****** Object:  StoredProcedure [dbo].[Hymns_SeasonSelectByTuneIdAndSeasonId]    Script Date: 5/28/2022 3:32:51 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




ALTER PROCEDURE [dbo].[Hymns_SeasonSelectByTuneIdAndSeasonId]
    @Tune_ID int,
	@Season_ID int
AS 
BEGIN 
    SELECT
        [dbo].[Hymns_Seasons].[ID] AS ItemId,
        [dbo].[Hymns_Seasons].[Name],
        [dbo].[Hymns_Seasons].[Verse],
        [dbo].[Hymns_Seasons].[Season_Order],
        [dbo].[Hymns_Seasons].[Reason_ID],
        [dbo].[Hymns_Reasons].[Name] AS Reason_Name,
        [dbo].[Hymns_Seasons].[Date_Specific]
    FROM
        [dbo].[Hymns_Structure] INNER JOIN
        [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID] INNER JOIN
        [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID] INNER JOIN
        [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID] INNER JOIN
        [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_ServiceHymns].[ID] = [dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID] INNER JOIN
		[dbo].[Hymns_Reasons] ON [dbo].[Hymns_Seasons].[Reason_ID] = [dbo].[Hymns_Reasons].[ID]
    WHERE
        [dbo].[Hymns_ServiceHymnsContent].[Tune_ID] = @Tune_ID AND
		[dbo].[Hymns_Seasons].[ID] = @Season_ID
    GROUP BY
        [dbo].[Hymns_Seasons].[ID],
        [dbo].[Hymns_Seasons].[Name],
		[dbo].[Hymns_Seasons].[Verse],
		[dbo].[Hymns_Seasons].[Season_Order],
		[dbo].[Hymns_Seasons].[Reason_ID],
		[dbo].[Hymns_Reasons].[Name],
        [dbo].[Hymns_Seasons].[Date_Specific]
END 

GO


/****** Object:  StoredProcedure [dbo].[Hymns_ServiceHymnListSelectByTuneIdAndSeasonId]    Script Date: 5/28/2022 4:59:21 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



ALTER PROCEDURE [dbo].[Hymns_ServiceHymnListSelectByTuneIdAndSeasonId]
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


/****** Object:  StoredProcedure [dbo].[Hymns_ServiceHymnSelectByTuneIdAndSeasonIdAndServiceHymnId]    Script Date: 5/28/2022 5:01:09 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




ALTER PROCEDURE [dbo].[Hymns_ServiceHymnSelectByTuneIdAndSeasonIdAndServiceHymnId]
    @Tune_ID int,
	@Season_ID int,
	@ServiceHymn_ID int
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
		[dbo].[Hymns_Seasons].[ID] = @Season_ID AND
		[dbo].[Hymns_ServiceHymns].[ID] = @ServiceHymn_ID
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


/****** Object:  StoredProcedure [dbo].[Hymns_FormatListSelectByTuneIdAndSeasonIdAndServiceHymnId]    Script Date: 5/28/2022 6:54:48 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO






ALTER PROCEDURE [dbo].[Hymns_FormatListSelectByTuneIdAndSeasonIdAndServiceHymnId]
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


/****** Object:  StoredProcedure [dbo].[Hymns_FormatSelectByTuneIdAndSeasonIdAndServiceHymnIdAndFormatId]    Script Date: 5/28/2022 6:57:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO







ALTER PROCEDURE [dbo].[Hymns_FormatSelectByTuneIdAndSeasonIdAndServiceHymnIdAndFormatId]
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


/****** Object:  StoredProcedure [dbo].[Hymns_HymnContentListSelectByTuneIdAndSeasonIdAndServiceHymnIdAndFormatId]    Script Date: 5/28/2022 8:01:17 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO







ALTER PROCEDURE [dbo].[Hymns_HymnContentListSelectByTuneIdAndSeasonIdAndServiceHymnIdAndFormatId]
    @Tune_ID int,
	@Season_ID int,
	@ServiceHymn_ID int,
	@Format_ID int
AS 
BEGIN 
    SELECT
	    [dbo].[Hymns_ServiceHymnsContent].[ID] AS ItemId,
		[dbo].[Hymns_ServiceHymnsContent].[Title] AS Content_Name,
	    [dbo].[Hymns_Structure].[Season_ID] AS Season_ID,
		[dbo].[Hymns_Seasons].[Name] AS Season_Name,
		[dbo].[Hymns_Seasons].[Reason_ID] AS Reason_ID,
		[dbo].[Hymns_Structure].[Service_ID] AS Service_ID,
		[dbo].[Hymns_Services].[Name] AS Service_Name,
		[dbo].[Hymns_ServiceHymns].[ID] AS ServiceHymn_ID,
        [dbo].[Hymns_ServiceHymns].[Title] AS ServiceHymn_Title,
		[dbo].[Hymns_Formats].[ID] AS Format_ID,
		[dbo].[Hymns_Formats].[Name] AS Format_Name,
	CASE
		WHEN @Format_ID = 1 THEN [dbo].[Hymns_Text].[Text_Arabic]
		WHEN @Format_ID = 2 THEN [dbo].[Hymns_Hazzat].[Hazzat_Arabic]
		WHEN @Format_ID = 3 THEN [dbo].[Hymns_VerticalHazzat].[VerticalHazzat_Arabic]
		WHEN @Format_ID = 4 THEN NULL
		WHEN @Format_ID = 5 THEN NULL
		WHEN @Format_ID = 6 THEN [dbo].[Hymns_Video].[Video_Arabic]
		WHEN @Format_ID = 7 THEN [dbo].[Hymns_Information].[Information_Arabic]
	END AS Content_Arabic,
	CASE
		WHEN @Format_ID = 1 THEN [dbo].[Hymns_Text].[Text_Coptic]
		WHEN @Format_ID = 2 THEN [dbo].[Hymns_Hazzat].[Hazzat_Coptic]
		WHEN @Format_ID = 3 THEN [dbo].[Hymns_VerticalHazzat].[VerticalHazzat_Coptic]
		WHEN @Format_ID = 4 THEN NULL
		WHEN @Format_ID = 5 THEN NULL
		WHEN @Format_ID = 6 THEN [dbo].[Hymns_Video].[Video_Coptic]
		WHEN @Format_ID = 7 THEN NULL
	END AS Content_Coptic,
	CASE
		WHEN @Format_ID = 1 THEN [dbo].[Hymns_Text].[Text_English]
		WHEN @Format_ID = 2 THEN [dbo].[Hymns_Hazzat].[Hazzat_English]
		WHEN @Format_ID = 3 THEN [dbo].[Hymns_VerticalHazzat].[VerticalHazzat_English]
		WHEN @Format_ID = 4 THEN NULL
		WHEN @Format_ID = 5 THEN NULL
		WHEN @Format_ID = 6 THEN [dbo].[Hymns_Video].[Video_English]
		WHEN @Format_ID = 7 THEN [dbo].[Hymns_Information].[Information_English]
	END AS Content_English,
	CASE
		WHEN @Format_ID = 1 THEN NULL
		WHEN @Format_ID = 2 THEN NULL
		WHEN @Format_ID = 3 THEN NULL
		WHEN @Format_ID = 4 THEN [dbo].[Hymns_Music].[Audio_Path]
		WHEN @Format_ID = 5 THEN [dbo].[Hymns_Audio].[Audio_Path]
		WHEN @Format_ID = 6 THEN NULL
		WHEN @Format_ID = 7 THEN NULL
	END AS Audio_Path,
	CASE
		WHEN @Format_ID = 1 THEN NULL
		WHEN @Format_ID = 2 THEN NULL
		WHEN @Format_ID = 3 THEN NULL
		WHEN @Format_ID = 4 THEN [dbo].[Hymns_Music].[Music_Path]
		WHEN @Format_ID = 5 THEN NULL
		WHEN @Format_ID = 6 THEN NULL
		WHEN @Format_ID = 7 THEN NULL
	END AS Music_Path
    FROM
        [dbo].[Hymns_Structure]
		INNER JOIN [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID]
		INNER JOIN [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_ServiceHymns].[ID] = [dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID]
		INNER JOIN [dbo].[Hymns_Formats] ON [dbo].[Hymns_ServiceHymnsContent].[Format_ID] = [dbo].[Hymns_Formats].[ID]
		INNER JOIN [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID]
		INNER JOIN [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID]
		LEFT JOIN [dbo].[Hymns_Text] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Text].[ID]
		LEFT JOIN [dbo].[Hymns_Hazzat] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Hazzat].[ID]
		LEFT JOIN [dbo].[Hymns_VerticalHazzat] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_VerticalHazzat].[ID]
		LEFT JOIN [dbo].[Hymns_Music] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Music].[ID]
		LEFT JOIN [dbo].[Hymns_Audio] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Audio].[ID]
		LEFT JOIN [dbo].[Hymns_Video] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Video].[ID]
		LEFT JOIN [dbo].[Hymns_Information] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Information].[ID]
    WHERE
        [dbo].[Hymns_ServiceHymnsContent].[Tune_ID] = @Tune_ID AND
		[dbo].[Hymns_Seasons].[ID] = @Season_ID AND
		[dbo].[Hymns_ServiceHymns].[ID] = @ServiceHymn_ID AND
		[dbo].[Hymns_Formats].[ID] = @Format_ID
	ORDER BY
        ItemId
END
GO


/****** Object:  StoredProcedure [dbo].[Hymns_HymnContentSelectByTuneIdAndSeasonIdAndServiceHymnIdAndFormatIdAndContentId]    Script Date: 5/28/2022 8:03:25 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO








ALTER PROCEDURE [dbo].[Hymns_HymnContentSelectByTuneIdAndSeasonIdAndServiceHymnIdAndFormatIdAndContentId]
    @Tune_ID int,
	@Season_ID int,
	@ServiceHymn_ID int,
	@Format_ID int,
	@Content_ID int
AS 
BEGIN 
    SELECT
	    [dbo].[Hymns_ServiceHymnsContent].[ID] AS ItemId,
		[dbo].[Hymns_ServiceHymnsContent].[Title] AS Content_Name,
	    [dbo].[Hymns_Structure].[Season_ID] AS Season_ID,
		[dbo].[Hymns_Seasons].[Name] AS Season_Name,
		[dbo].[Hymns_Seasons].[Reason_ID] AS Reason_ID,
		[dbo].[Hymns_Structure].[Service_ID] AS Service_ID,
		[dbo].[Hymns_Services].[Name] AS Service_Name,
		[dbo].[Hymns_ServiceHymns].[ID] AS ServiceHymn_ID,
        [dbo].[Hymns_ServiceHymns].[Title] AS ServiceHymn_Title,
		[dbo].[Hymns_Formats].[ID] AS Format_ID,
		[dbo].[Hymns_Formats].[Name] AS Format_Name,
	CASE
		WHEN @Format_ID = 1 THEN [dbo].[Hymns_Text].[Text_Arabic]
		WHEN @Format_ID = 2 THEN [dbo].[Hymns_Hazzat].[Hazzat_Arabic]
		WHEN @Format_ID = 3 THEN [dbo].[Hymns_VerticalHazzat].[VerticalHazzat_Arabic]
		WHEN @Format_ID = 4 THEN NULL
		WHEN @Format_ID = 5 THEN NULL
		WHEN @Format_ID = 6 THEN [dbo].[Hymns_Video].[Video_Arabic]
		WHEN @Format_ID = 7 THEN [dbo].[Hymns_Information].[Information_Arabic]
	END AS Content_Arabic,
	CASE
		WHEN @Format_ID = 1 THEN [dbo].[Hymns_Text].[Text_Coptic]
		WHEN @Format_ID = 2 THEN [dbo].[Hymns_Hazzat].[Hazzat_Coptic]
		WHEN @Format_ID = 3 THEN [dbo].[Hymns_VerticalHazzat].[VerticalHazzat_Coptic]
		WHEN @Format_ID = 4 THEN NULL
		WHEN @Format_ID = 5 THEN NULL
		WHEN @Format_ID = 6 THEN [dbo].[Hymns_Video].[Video_Coptic]
		WHEN @Format_ID = 7 THEN NULL
	END AS Content_Coptic,
	CASE
		WHEN @Format_ID = 1 THEN [dbo].[Hymns_Text].[Text_English]
		WHEN @Format_ID = 2 THEN [dbo].[Hymns_Hazzat].[Hazzat_English]
		WHEN @Format_ID = 3 THEN [dbo].[Hymns_VerticalHazzat].[VerticalHazzat_English]
		WHEN @Format_ID = 4 THEN NULL
		WHEN @Format_ID = 5 THEN NULL
		WHEN @Format_ID = 6 THEN [dbo].[Hymns_Video].[Video_English]
		WHEN @Format_ID = 7 THEN [dbo].[Hymns_Information].[Information_English]
	END AS Content_English,
	CASE
		WHEN @Format_ID = 1 THEN NULL
		WHEN @Format_ID = 2 THEN NULL
		WHEN @Format_ID = 3 THEN NULL
		WHEN @Format_ID = 4 THEN [dbo].[Hymns_Music].[Audio_Path]
		WHEN @Format_ID = 5 THEN [dbo].[Hymns_Audio].[Audio_Path]
		WHEN @Format_ID = 6 THEN NULL
		WHEN @Format_ID = 7 THEN NULL
	END AS Audio_Path,
	CASE
		WHEN @Format_ID = 1 THEN NULL
		WHEN @Format_ID = 2 THEN NULL
		WHEN @Format_ID = 3 THEN NULL
		WHEN @Format_ID = 4 THEN [dbo].[Hymns_Music].[Music_Path]
		WHEN @Format_ID = 5 THEN NULL
		WHEN @Format_ID = 6 THEN NULL
		WHEN @Format_ID = 7 THEN NULL
	END AS Music_Path
    FROM
        [dbo].[Hymns_Structure]
		INNER JOIN [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID]
		INNER JOIN [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_ServiceHymns].[ID] = [dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID]
		INNER JOIN [dbo].[Hymns_Formats] ON [dbo].[Hymns_ServiceHymnsContent].[Format_ID] = [dbo].[Hymns_Formats].[ID]
		INNER JOIN [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID]
		INNER JOIN [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID]
		LEFT JOIN [dbo].[Hymns_Text] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Text].[ID]
		LEFT JOIN [dbo].[Hymns_Hazzat] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Hazzat].[ID]
		LEFT JOIN [dbo].[Hymns_VerticalHazzat] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_VerticalHazzat].[ID]
		LEFT JOIN [dbo].[Hymns_Music] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Music].[ID]
		LEFT JOIN [dbo].[Hymns_Audio] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Audio].[ID]
		LEFT JOIN [dbo].[Hymns_Video] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Video].[ID]
		LEFT JOIN [dbo].[Hymns_Information] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Information].[ID]
    WHERE
        [dbo].[Hymns_ServiceHymnsContent].[Tune_ID] = @Tune_ID AND
		[dbo].[Hymns_Seasons].[ID] = @Season_ID AND
		[dbo].[Hymns_ServiceHymns].[ID] = @ServiceHymn_ID AND
		[dbo].[Hymns_Formats].[ID] = @Format_ID AND
		[dbo].[Hymns_ServiceHymnsContent].[ID] = @Content_ID
	ORDER BY
        ItemId
END
GO


