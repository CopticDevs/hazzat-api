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
		COUNT(Hymns_ServiceHymnsContent.ID) as Format_Count        
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
		COUNT(Hymns_ServiceHymnsContent.ID) as Format_Count
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


/****** Object:  StoredProcedure [dbo].[Hymns_HymnContentListSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId]    Script Date: 8/2/2020 4:00:26 PM ******/
DROP PROCEDURE [dbo].[Hymns_HymnContentListSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId]
GO


/****** Object:  StoredProcedure [dbo].[Hymns_HymnContentSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId]    Script Date: 8/2/2020 6:32:43 PM ******/
DROP PROCEDURE [dbo].[Hymns_HymnContentSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId]
GO


