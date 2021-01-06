/****** Object:  StoredProcedure [dbo].[Hymns_SeasonListSelectAll]    Script Date: 1/5/2021 11:19:34 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[Hymns_SeasonListSelectAll]
AS 
BEGIN 
    SELECT
        Hymns_Seasons.ID AS ItemId,
        Hymns_Seasons.Name,
        Hymns_Seasons.Verse,
        Hymns_Seasons.Season_Order,
        Hymns_Seasons.Reason_ID,
        Hymns_Reasons.Name AS Reason_Name,
        Hymns_Seasons.Date_Specific
    FROM
        Hymns_Seasons INNER JOIN
        Hymns_Reasons ON Hymns_Seasons.Reason_ID = Hymns_Reasons.ID
    ORDER BY Hymns_Seasons.Season_Order

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
        dbo.Hymns_Seasons.ID AS ItemId,
        dbo.Hymns_Seasons.Name,
        dbo.Hymns_Seasons.Verse,
        dbo.Hymns_Seasons.Season_Order,
        dbo.Hymns_Seasons.Reason_ID,
        dbo.Hymns_Reasons.Name AS Reason_Name,
		dbo.Hymns_Seasons.Date_Specific
    FROM
        dbo.Hymns_Seasons INNER JOIN
        dbo.Hymns_Reasons ON dbo.Hymns_Seasons.Reason_ID = dbo.Hymns_Reasons.ID
	WHERE dbo.Hymns_Seasons.ID = @ID
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
        Hymns_Structure.Service_ID as ItemId,
        Hymns_Structure.Season_ID,
        Hymns_Seasons.Name AS Season_Name,
        Hymns_Services.Name AS Service_Name,
        Hymns_Structure.Service_Order
	FROM
        Hymns_Structure INNER JOIN
        Hymns_Seasons ON Hymns_Structure.Season_ID = Hymns_Seasons.ID INNER JOIN
        Hymns_Services ON Hymns_Structure.Service_ID = Hymns_Services.ID INNER JOIN
        Hymns_ServiceHymns ON Hymns_Structure.ID = Hymns_ServiceHymns.Structure_ID
    WHERE
        (Hymns_Structure.Season_ID = @Season_ID)
    GROUP BY
        Hymns_Structure.ID,
        Hymns_Structure.Name,
        Hymns_Structure.Season_ID,
        Hymns_Seasons.Name,
        Hymns_Structure.Service_Order,
        Hymns_Structure.Service_ID,
        Hymns_Services.Name
    ORDER BY
        Hymns_Structure.Service_Order
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
        Hymns_Structure.Service_ID AS ItemId,
        Hymns_Structure.Season_ID,
        Hymns_Seasons.Name AS Season_Name,
        Hymns_Services.Name AS Service_Name,
        Hymns_Structure.Service_Order    
	FROM
        Hymns_Structure INNER JOIN
        Hymns_Seasons ON Hymns_Structure.Season_ID = Hymns_Seasons.ID INNER JOIN
        Hymns_Services ON Hymns_Structure.Service_ID = Hymns_Services.ID INNER JOIN
        Hymns_ServiceHymns ON Hymns_Structure.ID = Hymns_ServiceHymns.Structure_ID
    WHERE
        (Hymns_Structure.Season_ID = @Season_ID AND Hymns_Structure.Service_ID = @Service_ID)
    GROUP BY
        Hymns_Structure.ID,
        Hymns_Structure.Name,
        Hymns_Structure.Season_ID,
        Hymns_Seasons.Name,
        Hymns_Structure.Service_Order,
        Hymns_Structure.Service_ID,
        Hymns_Services.Name
    ORDER BY
        Hymns_Structure.Service_Order
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
        Hymns_ServiceHymns.ID AS ItemId,
        Hymns_Structure.Season_ID AS Season_ID,
		Hymns_Seasons.Name AS Season_Name,
		Hymns_Structure.Service_ID AS Service_ID,
		Hymns_Services.Name AS Service_Name,
		Hymns_ServiceHymns.Title,
		Hymns_ServiceHymns.Hymn_Order
    FROM
        Hymns_Structure INNER JOIN
        Hymns_ServiceHymns ON Hymns_Structure.ID = Hymns_ServiceHymns.Structure_ID INNER JOIN
		Hymns_Seasons ON Hymns_Structure.Season_ID = Hymns_Seasons.ID INNER JOIN
		Hymns_Services on Hymns_Structure.Service_ID = Hymns_Services.ID
    WHERE
        Hymns_Structure.Season_ID = @Season_ID AND
		Hymns_Structure.Service_ID = @Service_ID
    ORDER BY
        Hymns_ServiceHymns.Hymn_Order
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
        Hymns_ServiceHymns.ID AS ItemId,
        Hymns_Structure.Season_ID AS Season_ID,
		Hymns_Seasons.Name AS Season_Name,
		Hymns_Structure.Service_ID AS Service_ID,
		Hymns_Services.Name AS Service_Name,
		Hymns_ServiceHymns.Title,
		Hymns_ServiceHymns.Hymn_Order
    FROM
        Hymns_Structure INNER JOIN
        Hymns_ServiceHymns ON Hymns_Structure.ID = Hymns_ServiceHymns.Structure_ID INNER JOIN
		Hymns_Seasons ON Hymns_Structure.Season_ID = Hymns_Seasons.ID INNER JOIN
		Hymns_Services on Hymns_Structure.Service_ID = Hymns_Services.ID
    Where
        Hymns_Structure.Season_ID = @Season_ID AND
		Hymns_Structure.Service_ID = @Service_ID AND
		Hymns_ServiceHymns.ID = @ServiceHymn_ID
    ORDER BY
        Hymns_ServiceHymns.Hymn_Order
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
	    Hymns_ServiceHymnsContent.ID as ItemId,
		Hymns_ServiceHymnsContent.Title as Content_Name,
	    Hymns_Structure.Season_ID AS Season_ID,
		Hymns_Seasons.Name AS Season_Name,
		Hymns_Seasons.Reason_ID AS Reason_ID,
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
	    Hymns_ServiceHymnsContent.ID as ItemId,
		Hymns_ServiceHymnsContent.Title as Content_Name,
	    Hymns_Structure.Season_ID AS Season_ID,
		Hymns_Seasons.Name AS Season_Name,
		Hymns_Seasons.Reason_ID AS Reason_ID,
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
		[ID] AS ItemId,
		[Name],
		[Content],
		[Language],
		[Format_ID]
    FROM [dbo].[Hymns_Common]
    WHERE [ID] = @Common_ID
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
        ID AS ItemId,
        Name,
        Long_English,
        Long_Coptic,
        Long_Arabic,
        Short_English,
        Short_Coptic,
        Short_Arabic
    FROM Hymns_Reasons
    WHERE [ID] = @Reason_ID
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
        Hymns_ServiceHymns.ID AS ItemId,
        Hymns_Structure.ID AS Structure_ID,
        Hymns_Structure.Name AS Structure_Name,
        Hymns_ServiceHymns.Hymn_Order,
        Hymns_ServiceHymns.Title,
        (SELECT
             COUNT(ID) AS Expr1
         FROM
             Hymns_ServiceHymnsContent
         WHERE
             (Format_ID = (SELECT
                               ID
                           FROM
                               Hymns_Formats
                           WHERE
                               (Name = 'Text'))) AND
             (ServiceHymn_ID = Hymns_ServiceHymns.ID)) AS Text_Count,
        (SELECT
             COUNT(ID) AS Expr1
         FROM
             Hymns_ServiceHymnsContent
         WHERE
             (Format_ID = (SELECT
                               ID
                           FROM
                               Hymns_Formats
                           WHERE
                               (Name = 'Hazzat'))) AND
             (ServiceHymn_ID = Hymns_ServiceHymns.ID)) AS Hazzat_Count,
		(SELECT
             COUNT(ID) AS Expr1
         FROM
             Hymns_ServiceHymnsContent
         WHERE
             (Format_ID = (SELECT
                               ID
                           FROM
                               Hymns_Formats
                           WHERE
                               (Name = 'Vertical Hazzat'))) AND
             (ServiceHymn_ID = Hymns_ServiceHymns.ID)) AS VerticalHazzat_Count,
		(SELECT
             COUNT(ID) AS Expr1
         FROM
             Hymns_ServiceHymnsContent
         WHERE
             (Format_ID = (SELECT
                               ID
                           FROM
                               Hymns_Formats
                           WHERE
                               (Name = 'Musical Notes'))) AND
             (ServiceHymn_ID = Hymns_ServiceHymns.ID)) AS Music_Count,
		(SELECT
             COUNT(ID) AS Expr1
         FROM
             Hymns_ServiceHymnsContent
         WHERE
             (Format_ID = (SELECT
                               ID
                           FROM
                               Hymns_Formats
                           WHERE
                               (Name = 'Audio'))) AND
             (ServiceHymn_ID = Hymns_ServiceHymns.ID)) AS Audio_Count,
		(SELECT
             COUNT(ID) AS Expr1
         FROM
             Hymns_ServiceHymnsContent
         WHERE
             (Format_ID = (SELECT
                               ID
                           FROM
                               Hymns_Formats
                           WHERE
                               (Name = 'Video'))) AND
             (ServiceHymn_ID = Hymns_ServiceHymns.ID)) AS Video_Count,
		(SELECT
             COUNT(ID) AS Expr1
         FROM
             Hymns_ServiceHymnsContent
         WHERE
             (Format_ID = (SELECT
                               ID
                           FROM
                               Hymns_Formats
                           WHERE
                               (Name = 'Information'))) AND
             (ServiceHymn_ID = Hymns_ServiceHymns.ID)) AS Information_Count
        
    FROM
        Hymns_Structure INNER JOIN
        Hymns_ServiceHymns ON Hymns_Structure.ID = Hymns_ServiceHymns.Structure_ID
    Where
        Hymns_Structure.ID = @Structure_ID
    ORDER BY
        Hymns_ServiceHymns.Hymn_Order
END
GO


