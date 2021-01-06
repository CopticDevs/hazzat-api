/****** Object:  StoredProcedure [dbo].[Hymns_SeasonListSelectAll]    Script Date: 1/5/2021 11:19:34 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[Hymns_SeasonListSelectAll]
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
        [dbo].[Hymns_Seasons]
		INNER JOIN [dbo].[Hymns_Reasons] ON [dbo].[Hymns_Seasons].[Reason_ID] = [dbo].[Hymns_Reasons].[ID]
    ORDER BY [dbo].[Hymns_Seasons].[Season_Order]

END 

GO


/****** Object:  StoredProcedure [dbo].[Hymns_SeasonSelect]    Script Date: 1/5/2021 11:22:29 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


ALTER PROCEDURE [dbo].[Hymns_SeasonSelect]
    @ID int 
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
        [dbo].[Hymns_Seasons]
		INNER JOIN [dbo].[Hymns_Reasons] ON [dbo].[Hymns_Seasons].[Reason_ID] = [dbo].[Hymns_Reasons].[ID]
	WHERE
	    [dbo].[Hymns_Seasons].[ID] = @ID
END 

GO


/****** Object:  StoredProcedure [dbo].[Hymns_SeasonServicesSelect]    Script Date: 1/5/2021 11:28:02 PM ******/
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


/****** Object:  StoredProcedure [dbo].[Hymns_SeasonServicesSelectBySeasonIdAndServiceId]    Script Date: 1/5/2021 11:34:32 PM ******/
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


/****** Object:  StoredProcedure [dbo].[Hymns_ServiceHymnListSelectBySeasonIdAndServiceId]    Script Date: 1/5/2021 11:44:34 PM ******/
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


/****** Object:  StoredProcedure [dbo].[Hymns_ServiceHymnSelectBySeasonIdAndServiceIdAndServiceHymnId]    Script Date: 1/5/2021 11:50:25 PM ******/
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


/****** Object:  StoredProcedure [dbo].[Hymns_HymnFormatListSelectBySeasonIdAndServiceIdAndServiceHymnId]    Script Date: 1/6/2021 12:05:41 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



ALTER PROCEDURE [dbo].[Hymns_HymnFormatListSelectBySeasonIdAndServiceIdAndServiceHymnId]
    @Season_ID int,
	@Service_ID int,
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
        [dbo].[Hymns_Structure]
		INNER JOIN [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID]
		INNER JOIN [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_ServiceHymns].[ID] = [dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID]
		INNER JOIN [dbo].[Hymns_Formats] ON [dbo].[Hymns_ServiceHymnsContent].[Format_ID] = [dbo].[Hymns_Formats].[ID]
		INNER JOIN [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID]
		INNER JOIN [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID]
    WHERE
        [dbo].[Hymns_Structure].[Season_ID] = @Season_ID AND
		[dbo].[Hymns_Structure].[Service_ID] = @Service_ID AND
		[dbo].[Hymns_ServiceHymns].[ID] = @ServiceHymn_ID
	GROUP BY
		[dbo].[Hymns_ServiceHymnsContent].[Format_ID],
		[dbo].[Hymns_ServiceHymns].[ID],
		[dbo].[Hymns_Structure].[ID],
		[dbo].[Hymns_Structure].[Name],
		[dbo].[Hymns_Structure].[Season_ID],
		[dbo].[Hymns_Structure].[Service_ID],
		[dbo].[Hymns_ServiceHymns].[Hymn_Order],
		[dbo].[Hymns_ServiceHymns].[Title],
		[dbo].[Hymns_Formats].[ID],
		[dbo].[Hymns_Formats].[Name],
		[dbo].[Hymns_Seasons].[Name],
		[dbo].[Hymns_Services].[Name]
    ORDER BY
        [dbo].[Hymns_ServiceHymns].[Hymn_Order]
END
GO


/****** Object:  StoredProcedure [dbo].[Hymns_HymnFormatSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId]    Script Date: 1/6/2021 12:22:05 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




ALTER PROCEDURE [dbo].[Hymns_HymnFormatSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId]
    @Season_ID int,
	@Service_ID int,
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
        [dbo].[Hymns_Structure]
		INNER JOIN [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID]
		INNER JOIN [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_ServiceHymns].[ID] = [dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID]
		INNER JOIN [dbo].[Hymns_Formats] ON [dbo].[Hymns_ServiceHymnsContent].[Format_ID] = [dbo].[Hymns_Formats].[ID]
		INNER JOIN [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID]
		INNER JOIN [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID]
    WHERE
        [dbo].[Hymns_Structure].[Season_ID] = @Season_ID AND
		[dbo].[Hymns_Structure].[Service_ID] = @Service_ID AND
		[dbo].[Hymns_ServiceHymns].[ID] = @ServiceHymn_ID AND
		[dbo].[Hymns_Formats].[ID] = @Format_ID
	GROUP BY
		[dbo].[Hymns_ServiceHymnsContent].[Format_ID],
		[dbo].[Hymns_ServiceHymns].[ID],
		[dbo].[Hymns_Structure].[ID],
		[dbo].[Hymns_Structure].[Name],
		[dbo].[Hymns_Structure].[Season_ID],
		[dbo].[Hymns_Structure].[Service_ID],
		[dbo].[Hymns_ServiceHymns].[Hymn_Order],
		[dbo].[Hymns_ServiceHymns].[Title],
		[dbo].[Hymns_Formats].[ID],
		[dbo].[Hymns_Formats].[Name],
		[dbo].[Hymns_Seasons].[Name],
		[dbo].[Hymns_Services].[Name]
    ORDER BY
        [dbo].[Hymns_ServiceHymns].[Hymn_Order]
END
GO


/****** Object:  StoredProcedure [dbo].[Hymns_HymnContentListSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId]    Script Date: 1/6/2021 12:33:43 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



ALTER PROCEDURE [dbo].[Hymns_HymnContentListSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId]
    @Season_ID int,
	@Service_ID int,
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
		WHEN @Format_ID = 6 THEN [dbo].[Hymns_Video].[Video_Arabic]
		WHEN @Format_ID = 7 THEN [dbo].[Hymns_Information].[Information_Arabic]
	END AS Content_Arabic,
	CASE
		WHEN @Format_ID = 1 THEN [dbo].[Hymns_Text].[Text_Coptic]
		WHEN @Format_ID = 2 THEN [dbo].[Hymns_Hazzat].[Hazzat_Coptic]
		WHEN @Format_ID = 3 THEN [dbo].[Hymns_VerticalHazzat].[VerticalHazzat_Coptic]
		WHEN @Format_ID = 6 THEN [dbo].[Hymns_Video].[Video_Coptic]
		WHEN @Format_ID = 7 THEN NULL
	END AS Content_Coptic,
	CASE
		WHEN @Format_ID = 1 THEN [dbo].[Hymns_Text].[Text_English]
		WHEN @Format_ID = 2 THEN [dbo].[Hymns_Hazzat].[Hazzat_English]
		WHEN @Format_ID = 3 THEN [dbo].[Hymns_VerticalHazzat].[VerticalHazzat_English]
		WHEN @Format_ID = 6 THEN [dbo].[Hymns_Video].[Video_English]
		WHEN @Format_ID = 7 THEN [dbo].[Hymns_Information].[Information_English]
	END AS Content_English
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
		LEFT JOIN [dbo].[Hymns_Video] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Video].[ID]
		LEFT JOIN [dbo].[Hymns_Information] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Information].[ID]
    WHERE
        [dbo].[Hymns_Structure].[Season_ID] = @Season_ID AND
		[dbo].[Hymns_Structure].[Service_ID] = @Service_ID AND
		[dbo].[Hymns_ServiceHymns].[ID] = @ServiceHymn_ID AND
		[dbo].[Hymns_Formats].[ID] = @Format_ID
	ORDER BY
        ItemId
END
GO


/****** Object:  StoredProcedure [dbo].[Hymns_HymnContentSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId]    Script Date: 1/6/2021 12:52:07 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



ALTER PROCEDURE [dbo].[Hymns_HymnContentSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId]
    @Season_ID int,
	@Service_ID int,
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
		WHEN @Format_ID = 6 THEN [dbo].[Hymns_Video].[Video_Arabic]
		WHEN @Format_ID = 7 THEN [dbo].[Hymns_Information].[Information_Arabic]
	END AS Content_Arabic,
	CASE
		WHEN @Format_ID = 1 THEN [dbo].[Hymns_Text].[Text_Coptic]
		WHEN @Format_ID = 2 THEN [dbo].[Hymns_Hazzat].[Hazzat_Coptic]
		WHEN @Format_ID = 3 THEN [dbo].[Hymns_VerticalHazzat].[VerticalHazzat_Coptic]
		WHEN @Format_ID = 6 THEN [dbo].[Hymns_Video].[Video_Coptic]
		WHEN @Format_ID = 7 THEN NULL
	END AS Content_Coptic,
	CASE
		WHEN @Format_ID = 1 THEN [dbo].[Hymns_Text].[Text_English]
		WHEN @Format_ID = 2 THEN [dbo].[Hymns_Hazzat].[Hazzat_English]
		WHEN @Format_ID = 3 THEN [dbo].[Hymns_VerticalHazzat].[VerticalHazzat_English]
		WHEN @Format_ID = 6 THEN [dbo].[Hymns_Video].[Video_English]
		WHEN @Format_ID = 7 THEN [dbo].[Hymns_Information].[Information_English]
	END AS Content_English
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
		LEFT JOIN [dbo].[Hymns_Video] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Video].[ID]
		LEFT JOIN [dbo].[Hymns_Information] ON [dbo].[Hymns_ServiceHymnsContent].[Content_ID] = [dbo].[Hymns_Information].[ID]
    WHERE
        [dbo].[Hymns_Structure].[Season_ID] = @Season_ID AND
		[dbo].[Hymns_Structure].[Service_ID] = @Service_ID AND
		[dbo].[Hymns_ServiceHymns].[ID] = @ServiceHymn_ID AND
		[dbo].[Hymns_Formats].[ID] = @Format_ID AND
		[dbo].[Hymns_ServiceHymnsContent].[ID] = @Content_ID
	ORDER BY
        ItemId
END
GO


/****** Object:  StoredProcedure [dbo].[Hymns_CommonSelect]    Script Date: 1/6/2021 12:59:58 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


ALTER PROCEDURE [dbo].[Hymns_CommonSelect]
    @Common_ID int
AS 
BEGIN 
    SELECT
		[dbo].[Hymns_Common].[ID] AS ItemId,
		[dbo].[Hymns_Common].[Name],
		[dbo].[Hymns_Common].[Content],
		[dbo].[Hymns_Common].[Language],
		[dbo].[Hymns_Common].[Format_ID]
    FROM
		[dbo].[Hymns_Common]
    WHERE
		[dbo].[Hymns_Common].[ID] = @Common_ID
END 

GO


/****** Object:  StoredProcedure [dbo].[Hymns_ReasonSelect]    Script Date: 1/6/2021 1:01:52 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


ALTER PROCEDURE [dbo].[Hymns_ReasonSelect]
    @Reason_ID int 
AS 
BEGIN 
    SELECT
        [dbo].[Hymns_Reasons].[ID] AS ItemId,
        [dbo].[Hymns_Reasons].[Name],
        [dbo].[Hymns_Reasons].[Long_English],
        [dbo].[Hymns_Reasons].[Long_Coptic],
        [dbo].[Hymns_Reasons].[Long_Arabic],
        [dbo].[Hymns_Reasons].[Short_English],
        [dbo].[Hymns_Reasons].[Short_Coptic],
        [dbo].[Hymns_Reasons].[Short_Arabic]
    FROM
		[dbo].[Hymns_Reasons]
    WHERE
		[dbo].[Hymns_Reasons].[ID] = @Reason_ID
END 

GO


/****** Object:  StoredProcedure [dbo].[Hymns_ServiceHymnListSelectBySeasonServiceId]    Script Date: 1/6/2021 1:03:26 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[Hymns_ServiceHymnListSelectBySeasonServiceId]
    @Structure_ID int
AS 
BEGIN 
    SELECT
        [dbo].[Hymns_ServiceHymns].[ID] AS ItemId,
        [dbo].[Hymns_Structure].[ID] AS Structure_ID,
        [dbo].[Hymns_Structure].[Name] AS Structure_Name,
        [dbo].[Hymns_ServiceHymns].[Hymn_Order],
        [dbo].[Hymns_ServiceHymns].[Title],
        (SELECT
             COUNT([dbo].[Hymns_ServiceHymnsContent].[ID]) AS Expr1
         FROM
             [dbo].[Hymns_ServiceHymnsContent]
         WHERE
             ([dbo].[Hymns_ServiceHymnsContent].[Format_ID] = (SELECT
                               [dbo].[Hymns_Formats].[ID]
                           FROM
                               [dbo].[Hymns_Formats]
                           WHERE
                               ([dbo].[Hymns_Formats].[Name] = 'Text'))) AND
             ([dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID] = [dbo].[Hymns_ServiceHymns].[ID])) AS Text_Count,
        (SELECT
             COUNT([dbo].[Hymns_ServiceHymnsContent].[ID]) AS Expr1
         FROM
             [dbo].[Hymns_ServiceHymnsContent]
         WHERE
             ([dbo].[Hymns_ServiceHymnsContent].[Format_ID] = (SELECT
                               [dbo].[Hymns_Formats].[ID]
                           FROM
                               [dbo].[Hymns_Formats]
                           WHERE
                               ([dbo].[Hymns_Formats].[Name] = 'Hazzat'))) AND
             ([dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID] = [dbo].[Hymns_ServiceHymns].[ID])) AS Hazzat_Count,
		(SELECT
             COUNT([dbo].[Hymns_ServiceHymnsContent].[ID]) AS Expr1
         FROM
             [dbo].[Hymns_ServiceHymnsContent]
         WHERE
             ([dbo].[Hymns_ServiceHymnsContent].[Format_ID] = (SELECT
                               [dbo].[Hymns_Formats].[ID]
                           FROM
                               [dbo].[Hymns_Formats]
                           WHERE
                               ([dbo].[Hymns_Formats].[Name] = 'Vertical Hazzat'))) AND
             ([dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID] = [dbo].[Hymns_ServiceHymns].[ID])) AS VerticalHazzat_Count,
		(SELECT
             COUNT([dbo].[Hymns_ServiceHymnsContent].[ID]) AS Expr1
         FROM
             [dbo].[Hymns_ServiceHymnsContent]
         WHERE
             ([dbo].[Hymns_ServiceHymnsContent].[Format_ID] = (SELECT
                               [dbo].[Hymns_Formats].[ID]
                           FROM
                               [dbo].[Hymns_Formats]
                           WHERE
                               ([dbo].[Hymns_Formats].[Name] = 'Musical Notes'))) AND
             ([dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID] = [dbo].[Hymns_ServiceHymns].[ID])) AS Music_Count,
		(SELECT
             COUNT([dbo].[Hymns_ServiceHymnsContent].[ID]) AS Expr1
         FROM
             [dbo].[Hymns_ServiceHymnsContent]
         WHERE
             ([dbo].[Hymns_ServiceHymnsContent].[Format_ID] = (SELECT
                               [dbo].[Hymns_Formats].[ID]
                           FROM
                               [dbo].[Hymns_Formats]
                           WHERE
                               ([dbo].[Hymns_Formats].[Name] = 'Audio'))) AND
             ([dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID] = [dbo].[Hymns_ServiceHymns].[ID])) AS Audio_Count,
		(SELECT
             COUNT([dbo].[Hymns_ServiceHymnsContent].[ID]) AS Expr1
         FROM
             [dbo].[Hymns_ServiceHymnsContent]
         WHERE
             ([dbo].[Hymns_ServiceHymnsContent].[Format_ID] = (SELECT
                               [dbo].[Hymns_Formats].[ID]
                           FROM
                               [dbo].[Hymns_Formats]
                           WHERE
                               ([dbo].[Hymns_Formats].[Name] = 'Video'))) AND
             ([dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID] = [dbo].[Hymns_ServiceHymns].[ID])) AS Video_Count,
		(SELECT
             COUNT([dbo].[Hymns_ServiceHymnsContent].[ID]) AS Expr1
         FROM
             [dbo].[Hymns_ServiceHymnsContent]
         WHERE
             ([dbo].[Hymns_ServiceHymnsContent].[Format_ID] = (SELECT
                               [dbo].[Hymns_Formats].[ID]
                           FROM
                               [dbo].[Hymns_Formats]
                           WHERE
                               ([dbo].[Hymns_Formats].[Name] = 'Information'))) AND
             ([dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID] = [dbo].[Hymns_ServiceHymns].[ID])) AS Information_Count
        
    FROM
        [dbo].[Hymns_Structure] INNER JOIN
        [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID]
    Where
        [dbo].[Hymns_Structure].[ID] = @Structure_ID
    ORDER BY
        [dbo].[Hymns_ServiceHymns].[Hymn_Order]
END
GO


