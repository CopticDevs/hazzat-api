ALTER TABLE dbo.Hymns_Seasons
ADD
	Name_Arabic [nvarchar](255) NOT NULL,
	Verse_Arabic [nvarchar](max);


/****** Object:  StoredProcedure [dbo].[Hymns_SeasonListSelectAll]    Script Date: 5/7/2022 7:30:03 PM ******/
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
		[dbo].[Hymns_Seasons].[Name_Arabic],
        [dbo].[Hymns_Seasons].[Verse],
		[dbo].[Hymns_Seasons].[Verse_Arabic],
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


/****** Object:  StoredProcedure [dbo].[Hymns_SeasonSelect]    Script Date: 5/7/2022 7:33:00 PM ******/
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
		[dbo].[Hymns_Seasons].[Name_Arabic],
        [dbo].[Hymns_Seasons].[Verse],
		[dbo].[Hymns_Seasons].[Verse_Arabic],
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


