/****** Object:  StoredProcedure [dbo].[Hymns_TypeListSelect]    Script Date: 2/14/2021 12:23:15 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Hymns_TypeListSelect]
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


/****** Object:  StoredProcedure [dbo].[Hymns_TuneListSelect]    Script Date: 2/14/2021 1:26:26 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Hymns_TuneListSelect]
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


