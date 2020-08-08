/****** Object:  StoredProcedure [dbo].[Hymns_HymnFormatListSelectBySeasonIdAndServiceIdAndServiceHymnId]    Script Date: 8/2/2020 3:44:22 PM ******/
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
	    Hymns_Formats.ID AS ItemId,
		Hymns_Formats.Name AS Format_Name,
        Hymns_Structure.Season_ID AS Season_ID,
		Hymns_Seasons.Name AS Season_Name,
		Hymns_Structure.Service_ID AS Service_ID,
		Hymns_Services.Name AS Service_Name,
		Hymns_ServiceHymns.Hymn_Order,
		Hymns_ServiceHymns.ID AS ServiceHymn_ID,
        Hymns_ServiceHymns.Title AS ServiceHymn_Title,
		COUNT(Hymns_ServiceHymnsContent.ID) as Content_Count        
    FROM
        Hymns_Structure INNER JOIN
        Hymns_ServiceHymns ON Hymns_Structure.ID = Hymns_ServiceHymns.Structure_ID INNER JOIN
		Hymns_ServiceHymnsContent ON Hymns_ServiceHymns.ID = Hymns_ServiceHymnsContent.ServiceHymn_ID INNER JOIN
		Hymns_Formats ON Hymns_ServiceHymnsContent.Format_ID = Hymns_Formats.ID INNER JOIN
		Hymns_Seasons ON Hymns_Structure.Season_ID = Hymns_Seasons.ID INNER JOIN
		Hymns_Services on Hymns_Structure.Service_ID = Hymns_Services.ID
    Where
        Hymns_Structure.Season_ID = @Season_ID AND
		Hymns_Structure.Service_ID = @Service_ID AND
		Hymns_ServiceHymns.ID = @ServiceHymn_ID
	GROUP BY
		Hymns_ServiceHymnsContent.Format_ID, Hymns_ServiceHymns.ID,
		Hymns_Structure.ID, Hymns_Structure.Name, Hymns_Structure.Season_ID, Hymns_Structure.Service_ID,
		Hymns_ServiceHymns.Hymn_Order, Hymns_ServiceHymns.Title, Hymns_Formats.ID, Hymns_Formats.Name,
		Hymns_Seasons.Name, Hymns_Services.Name
    ORDER BY
        Hymns_ServiceHymns.Hymn_Order
END
GO


/****** Object:  StoredProcedure [dbo].[Hymns_HymnFormatSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId]    Script Date: 8/2/2020 3:46:18 PM ******/
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
        Hymns_Formats.ID AS ItemId,
		Hymns_Formats.Name AS Format_Name,
        Hymns_Structure.Season_ID AS Season_ID,
		Hymns_Seasons.Name AS Season_Name,
		Hymns_Structure.Service_ID AS Service_ID,
		Hymns_Services.Name AS Service_Name,
		Hymns_ServiceHymns.Hymn_Order,
		Hymns_ServiceHymns.ID AS ServiceHymn_ID,
        Hymns_ServiceHymns.Title AS ServiceHymn_Title,
		COUNT(Hymns_ServiceHymnsContent.ID) as Content_Count
    FROM
        Hymns_Structure INNER JOIN
        Hymns_ServiceHymns ON Hymns_Structure.ID = Hymns_ServiceHymns.Structure_ID INNER JOIN
		Hymns_ServiceHymnsContent ON Hymns_ServiceHymns.ID = Hymns_ServiceHymnsContent.ServiceHymn_ID INNER JOIN
		Hymns_Formats ON Hymns_ServiceHymnsContent.Format_ID = Hymns_Formats.ID INNER JOIN
		Hymns_Seasons ON Hymns_Structure.Season_ID = Hymns_Seasons.ID INNER JOIN
		Hymns_Services on Hymns_Structure.Service_ID = Hymns_Services.ID
    Where
        Hymns_Structure.Season_ID = @Season_ID AND
		Hymns_Structure.Service_ID = @Service_ID AND
		Hymns_ServiceHymns.ID = @ServiceHymn_ID AND
		Hymns_Formats.ID = @Format_ID
	GROUP BY
		Hymns_ServiceHymnsContent.Format_ID, Hymns_ServiceHymns.ID,
		Hymns_Structure.ID, Hymns_Structure.Name, Hymns_Structure.Season_ID, Hymns_Structure.Service_ID,
		Hymns_ServiceHymns.Hymn_Order, Hymns_ServiceHymns.Title, Hymns_Formats.ID, Hymns_Formats.Name,
		Hymns_Seasons.Name, Hymns_Services.Name
    ORDER BY
        Hymns_ServiceHymns.Hymn_Order
END
GO


/****** Object:  StoredProcedure [dbo].[Hymns_HymnContentListSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId]    Script Date: 8/2/2020 4:00:08 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




/****** Object:  StoredProcedure [dbo].[Hymns_HymnContentListSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId]    Script Date: 8/2/2020 5:48:41 PM ******/
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
	    Hymns_ServiceHymnsContent.ID as ItemId,
		Hymns_ServiceHymnsContent.Title as Content_Name,
	    Hymns_Structure.Season_ID AS Season_ID,
		Hymns_Seasons.Name AS Season_Name,
		Hymns_Structure.Service_ID AS Service_ID,
		Hymns_Services.Name AS Service_Name,
		Hymns_ServiceHymns.ID AS ServiceHymn_ID,
        Hymns_ServiceHymns.Title AS ServiceHymn_Title,
		Hymns_Formats.ID AS Format_ID,
		Hymns_Formats.Name AS Format_Name,
	CASE
		WHEN @Format_ID = 1 THEN Hymns_Text.Text_Arabic
		WHEN @Format_ID = 2 THEN Hymns_Hazzat.Hazzat_Arabic
		WHEN @Format_ID = 3 THEN Hymns_VerticalHazzat.VerticalHazzat_Arabic
		WHEN @Format_ID = 6 THEN Hymns_Video.Video_Arabic
		WHEN @Format_ID = 7 THEN Hymns_Information.Information_Arabic
	END as Content_Arabic,
	CASE
		WHEN @Format_ID = 1 THEN Hymns_Text.Text_Coptic
		WHEN @Format_ID = 2 THEN Hymns_Hazzat.Hazzat_Coptic
		WHEN @Format_ID = 3 THEN Hymns_VerticalHazzat.VerticalHazzat_Coptic
		WHEN @Format_ID = 6 THEN Hymns_Video.Video_Coptic
		WHEN @Format_ID = 7 THEN NULL
	END as Content_Coptic,
	CASE
		WHEN @Format_ID = 1 THEN Hymns_Text.Text_English
		WHEN @Format_ID = 2 THEN Hymns_Hazzat.Hazzat_English
		WHEN @Format_ID = 3 THEN Hymns_VerticalHazzat.VerticalHazzat_English
		WHEN @Format_ID = 6 THEN Hymns_Video.Video_English
		WHEN @Format_ID = 7 THEN Hymns_Information.Information_English
	END as Content_English
    FROM
        Hymns_Structure
		INNER JOIN Hymns_ServiceHymns ON Hymns_Structure.ID = Hymns_ServiceHymns.Structure_ID
		INNER JOIN Hymns_ServiceHymnsContent ON Hymns_ServiceHymns.ID = Hymns_ServiceHymnsContent.ServiceHymn_ID
		INNER JOIN Hymns_Formats ON Hymns_ServiceHymnsContent.Format_ID = Hymns_Formats.ID
		INNER JOIN Hymns_Seasons ON Hymns_Structure.Season_ID = Hymns_Seasons.ID
		INNER JOIN Hymns_Services on Hymns_Structure.Service_ID = Hymns_Services.ID
		LEFT JOIN Hymns_Text ON Hymns_ServiceHymnsContent.Content_ID = Hymns_Text.ID
		LEFT JOIN Hymns_Hazzat ON Hymns_ServiceHymnsContent.Content_ID = Hymns_Hazzat.ID
		LEFT JOIN Hymns_VerticalHazzat ON Hymns_ServiceHymnsContent.Content_ID = Hymns_VerticalHazzat.ID
		LEFT JOIN Hymns_Video ON Hymns_ServiceHymnsContent.Content_ID = Hymns_Video.ID
		LEFT JOIN Hymns_Information ON Hymns_ServiceHymnsContent.Content_ID = Hymns_Information.ID
    Where
        Hymns_Structure.Season_ID = @Season_ID AND
		Hymns_Structure.Service_ID = @Service_ID AND
		Hymns_ServiceHymns.ID = @ServiceHymn_ID AND
		Hymns_Formats.ID = @Format_ID
	ORDER BY
        ItemId
END
GO


/****** Object:  StoredProcedure [dbo].[Hymns_HymnContentSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId]    Script Date: 8/2/2020 6:32:21 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO






CREATE PROCEDURE [dbo].[Hymns_HymnContentSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId]
    @Season_ID int,
	@Service_ID int,
	@ServiceHymn_ID int,
	@Format_ID int,
	@Content_ID int

AS 
BEGIN 
    SELECT
	    Hymns_ServiceHymnsContent.ID as ItemId,
		Hymns_ServiceHymnsContent.Title as Content_Name,
	    Hymns_Structure.Season_ID AS Season_ID,
		Hymns_Seasons.Name AS Season_Name,
		Hymns_Structure.Service_ID AS Service_ID,
		Hymns_Services.Name AS Service_Name,
		Hymns_ServiceHymns.ID AS ServiceHymn_ID,
        Hymns_ServiceHymns.Title AS ServiceHymn_Title,
		Hymns_Formats.ID AS Format_ID,
		Hymns_Formats.Name AS Format_Name,
	CASE
		WHEN @Format_ID = 1 THEN Hymns_Text.Text_Arabic
		WHEN @Format_ID = 2 THEN Hymns_Hazzat.Hazzat_Arabic
		WHEN @Format_ID = 3 THEN Hymns_VerticalHazzat.VerticalHazzat_Arabic
		WHEN @Format_ID = 6 THEN Hymns_Video.Video_Arabic
		WHEN @Format_ID = 7 THEN Hymns_Information.Information_Arabic
	END as Content_Arabic,
	CASE
		WHEN @Format_ID = 1 THEN Hymns_Text.Text_Coptic
		WHEN @Format_ID = 2 THEN Hymns_Hazzat.Hazzat_Coptic
		WHEN @Format_ID = 3 THEN Hymns_VerticalHazzat.VerticalHazzat_Coptic
		WHEN @Format_ID = 6 THEN Hymns_Video.Video_Coptic
		WHEN @Format_ID = 7 THEN NULL
	END as Content_Coptic,
	CASE
		WHEN @Format_ID = 1 THEN Hymns_Text.Text_English
		WHEN @Format_ID = 2 THEN Hymns_Hazzat.Hazzat_English
		WHEN @Format_ID = 3 THEN Hymns_VerticalHazzat.VerticalHazzat_English
		WHEN @Format_ID = 6 THEN Hymns_Video.Video_English
		WHEN @Format_ID = 7 THEN Hymns_Information.Information_English
	END as Content_English
    FROM
        Hymns_Structure
		INNER JOIN Hymns_ServiceHymns ON Hymns_Structure.ID = Hymns_ServiceHymns.Structure_ID
		INNER JOIN Hymns_ServiceHymnsContent ON Hymns_ServiceHymns.ID = Hymns_ServiceHymnsContent.ServiceHymn_ID
		INNER JOIN Hymns_Formats ON Hymns_ServiceHymnsContent.Format_ID = Hymns_Formats.ID
		INNER JOIN Hymns_Seasons ON Hymns_Structure.Season_ID = Hymns_Seasons.ID
		INNER JOIN Hymns_Services on Hymns_Structure.Service_ID = Hymns_Services.ID
		LEFT JOIN Hymns_Text ON Hymns_ServiceHymnsContent.Content_ID = Hymns_Text.ID
		LEFT JOIN Hymns_Hazzat ON Hymns_ServiceHymnsContent.Content_ID = Hymns_Hazzat.ID
		LEFT JOIN Hymns_VerticalHazzat ON Hymns_ServiceHymnsContent.Content_ID = Hymns_VerticalHazzat.ID
		LEFT JOIN Hymns_Video ON Hymns_ServiceHymnsContent.Content_ID = Hymns_Video.ID
		LEFT JOIN Hymns_Information ON Hymns_ServiceHymnsContent.Content_ID = Hymns_Information.ID
    Where
        Hymns_Structure.Season_ID = @Season_ID AND
		Hymns_Structure.Service_ID = @Service_ID AND
		Hymns_ServiceHymns.ID = @ServiceHymn_ID AND
		Hymns_Formats.ID = @Format_ID AND
		Hymns_ServiceHymnsContent.ID = @Content_ID
	ORDER BY
        ItemId
END
GO


