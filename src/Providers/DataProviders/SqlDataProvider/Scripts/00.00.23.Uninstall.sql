/****** Object:  StoredProcedure [dbo].[Hymns_SeasonListSelectAll]    Script Date: 10/8/2023 6:04:38 PM ******/
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


