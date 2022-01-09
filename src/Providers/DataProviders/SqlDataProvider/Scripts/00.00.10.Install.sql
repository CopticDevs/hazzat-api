/****** Object:  StoredProcedure [dbo].[Hymns_SeasonSelect]    Script Date: 1/8/2022 4:34:01 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



ALTER PROCEDURE [dbo].[Hymns_SeasonSelect]
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
        [dbo].[Hymns_Seasons]
		INNER JOIN [dbo].[Hymns_Reasons] ON [dbo].[Hymns_Seasons].[Reason_ID] = [dbo].[Hymns_Reasons].[ID]
	WHERE
	    [dbo].[Hymns_Seasons].[ID] = @Season_ID
END 

GO


/****** Object:  StoredProcedure [dbo].[Hymns_TypeSelect]    Script Date: 1/8/2022 4:38:02 PM ******/
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


/****** Object:  StoredProcedure [dbo].[Hymns_TuneSelect]    Script Date: 1/8/2022 4:39:21 PM ******/
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


/****** Object:  StoredProcedure [dbo].[Hymns_SeasonListSelectByTuneID]    Script Date: 1/8/2022 5:11:15 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[Hymns_SeasonListSelectByTuneID]
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


/****** Object:  StoredProcedure [dbo].[Hymns_SeasonListSelectByTypeID]    Script Date: 1/8/2022 5:13:27 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[Hymns_SeasonListSelectByTypeID]
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


/****** Object:  StoredProcedure [dbo].[Hymns_SeasonSelectByTuneIDAndSeasonID]    Script Date: 1/8/2022 5:45:39 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[Hymns_SeasonSelectByTuneIDAndSeasonID]
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


/****** Object:  StoredProcedure [dbo].[Hymns_SeasonSelectByTypeIDAndSeasonID]    Script Date: 1/8/2022 5:46:12 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





CREATE PROCEDURE [dbo].[Hymns_SeasonSelectByTypeIDAndSeasonID]
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


