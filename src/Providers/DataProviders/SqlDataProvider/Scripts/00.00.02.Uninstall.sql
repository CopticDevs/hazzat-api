/************************************************************/
/*****              DROP Stored Procedures              *****/
/************************************************************/

/****** Object:  StoredProcedure [dbo].[Hymns_SeasonServicesSelectBySeasonIdAndServiceId]    Script Date: 5/31/2020 11:34:37 PM ******/
DROP PROCEDURE [dbo].[Hymns_SeasonServicesSelectBySeasonIdAndServiceId]
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
        Hymns_Seasons.ID AS ItemId,
        Hymns_Seasons.Name,
        Hymns_Seasons.Verse,
        Hymns_Seasons.Season_Order,
        Hymns_Seasons.Reason_ID,
        Hymns_Reasons.Name AS Reason_Name
    FROM
        Hymns_Seasons INNER JOIN
        Hymns_Reasons ON Hymns_Seasons.Reason_ID = Hymns_Reasons.ID
	WHERE Hymns_Seasons.ID = @ID
END 

GO
