/************************************************************/
/*****              Create stored procedures            *****/
/************************************************************/

/****** Object:  StoredProcedure [dbo].[Hymns_SeasonServicesSelectBySeasonIdAndServiceId]    Script Date: 5/31/2020 11:33:59 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[Hymns_SeasonServicesSelectBySeasonIdAndServiceId]
    @Season_ID int,
	@Service_ID int

AS 
BEGIN 
    SELECT
        Hymns_Structure.ID AS ItemId,
        Hymns_Structure.Name AS Structure_Name,
        Hymns_Structure.Season_ID,
        Hymns_Seasons.Name AS Season_Name,
        Hymns_Structure.Service_Order,
        Hymns_Structure.Service_ID,
        Hymns_Services.Name AS Service_Name,
        (SELECT
             COUNT(Hymns_ServiceHymnsContent.ID) AS Expr1
         FROM
             Hymns_ServiceHymnsContent INNER JOIN
             Hymns_ServiceHymns ON Hymns_ServiceHymnsContent.ServiceHymn_ID = Hymns_ServiceHymns.ID
         WHERE
             (Hymns_ServiceHymnsContent.Format_ID = (SELECT
                                                          ID
                                                      FROM
                                                          Hymns_Formats
                                                      WHERE
                                                          (Name = 'Text'))) AND
             (Hymns_ServiceHymns.Structure_ID = Hymns_Structure.ID)) AS Text_Count,
        (SELECT
             COUNT(Hymns_ServiceHymnsContent.ID) AS Expr1
         FROM
             Hymns_ServiceHymnsContent INNER JOIN
             Hymns_ServiceHymns ON Hymns_ServiceHymnsContent.ServiceHymn_ID = Hymns_ServiceHymns.ID
         WHERE
             (Hymns_ServiceHymnsContent.Format_ID = (SELECT
                                                          ID
                                                      FROM
                                                          Hymns_Formats
                                                      WHERE
                                                          (Name = 'Hazzat'))) AND
             (Hymns_ServiceHymns.Structure_ID = Hymns_Structure.ID)) AS Hazzat_Count,
		(SELECT
             COUNT(Hymns_ServiceHymnsContent.ID) AS Expr1
         FROM
             Hymns_ServiceHymnsContent INNER JOIN
             Hymns_ServiceHymns ON Hymns_ServiceHymnsContent.ServiceHymn_ID = Hymns_ServiceHymns.ID
         WHERE
             (Hymns_ServiceHymnsContent.Format_ID = (SELECT
                                                          ID
                                                      FROM
                                                          Hymns_Formats
                                                      WHERE
                                                          (Name = 'Vertical Hazzat'))) AND
             (Hymns_ServiceHymns.Structure_ID = Hymns_Structure.ID)) AS VerticalHazzat_Count,
		(SELECT
             COUNT(Hymns_ServiceHymnsContent.ID) AS Expr1
         FROM
             Hymns_ServiceHymnsContent INNER JOIN
             Hymns_ServiceHymns ON Hymns_ServiceHymnsContent.ServiceHymn_ID = Hymns_ServiceHymns.ID
         WHERE
             (Hymns_ServiceHymnsContent.Format_ID = (SELECT
                                                          ID
                                                      FROM
                                                          Hymns_Formats
                                                      WHERE
                                                          (Name = 'Musical Notes'))) AND
             (Hymns_ServiceHymns.Structure_ID = Hymns_Structure.ID)) AS Music_Count,
		(SELECT
             COUNT(Hymns_ServiceHymnsContent.ID) AS Expr1
         FROM
             Hymns_ServiceHymnsContent INNER JOIN
             Hymns_ServiceHymns ON Hymns_ServiceHymnsContent.ServiceHymn_ID = Hymns_ServiceHymns.ID
         WHERE
             (Hymns_ServiceHymnsContent.Format_ID = (SELECT
                                                          ID
                                                      FROM
                                                          Hymns_Formats
                                                      WHERE
                                                          (Name = 'Audio'))) AND
             (Hymns_ServiceHymns.Structure_ID = Hymns_Structure.ID)) AS Audio_Count,
		(SELECT
             COUNT(Hymns_ServiceHymnsContent.ID) AS Expr1
         FROM
             Hymns_ServiceHymnsContent INNER JOIN
             Hymns_ServiceHymns ON Hymns_ServiceHymnsContent.ServiceHymn_ID = Hymns_ServiceHymns.ID
         WHERE
             (Hymns_ServiceHymnsContent.Format_ID = (SELECT
                                                          ID
                                                      FROM
                                                          Hymns_Formats
                                                      WHERE
                                                          (Name = 'Video'))) AND
             (Hymns_ServiceHymns.Structure_ID = Hymns_Structure.ID)) AS Video_Count,
		(SELECT
             COUNT(Hymns_ServiceHymnsContent.ID) AS Expr1
         FROM
             Hymns_ServiceHymnsContent INNER JOIN
             Hymns_ServiceHymns ON Hymns_ServiceHymnsContent.ServiceHymn_ID = Hymns_ServiceHymns.ID
         WHERE
             (Hymns_ServiceHymnsContent.Format_ID = (SELECT
                                                          ID
                                                      FROM
                                                          Hymns_Formats
                                                      WHERE
                                                          (Name = 'Information'))) AND
             (Hymns_ServiceHymns.Structure_ID = Hymns_Structure.ID)) AS Information_Count
		FROM
        Hymns_Structure INNER JOIN
        Hymns_Seasons ON Hymns_Structure.Season_ID = Hymns_Seasons.ID INNER JOIN
        Hymns_Services ON Hymns_Structure.Service_ID = Hymns_Services.ID INNER JOIN
        Hymns_ServiceHymns ON Hymns_Structure.ID = Hymns_ServiceHymns.Structure_ID
    WHERE
        (Hymns_Structure.Season_ID = @Season_ID AND Hymns_Structure.Service_ID= @Service_ID)
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


/****** Object:  StoredProcedure [dbo].[Hymns_SeasonSelect]    Script Date: 6/1/2020 12:30:54 AM ******/
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
