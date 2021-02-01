/****** Object:  StoredProcedure [dbo].[Hymns_HymnContentListSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId]    Script Date: 1/22/2021 12:27:38 AM ******/
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


/****** Object:  StoredProcedure [dbo].[Hymns_HymnContentSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId]    Script Date: 1/22/2021 1:05:14 AM ******/
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


