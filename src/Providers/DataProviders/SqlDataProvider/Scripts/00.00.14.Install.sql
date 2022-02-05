/****** Object:  StoredProcedure [dbo].[Hymns_BookletListSelect]    Script Date: 2/5/2022 2:04:29 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[Hymns_BookletListSelect]
AS 
BEGIN 
    SELECT
        [dbo].[Hymns_Booklets].[ID] AS ItemId,
		[dbo].[Hymns_Booklets].[Name],
        [dbo].[Hymns_Booklets].[Booklet_Order],
        [dbo].[Hymns_BookletReleases].[Source_Path],
        [dbo].[Hymns_BookletReleases].[Display_Path],
        [dbo].[Hymns_BookletReleases].[Print_Path],
        [dbo].[Hymns_BookletReleases].[Thumbnail],
        [dbo].[Hymns_BookletReleases].[Full_Picture],
        [dbo].[Hymns_BookletReleases].[Release_Date],
        [dbo].[Hymns_BookletReleases].[Summary]
    FROM
        [dbo].[Hymns_BookletReleases]
		INNER JOIN [dbo].[Hymns_Booklets] ON [dbo].[Hymns_BookletReleases].[Booklet_ID] = [dbo].[Hymns_Booklets].[ID]
    WHERE
		([dbo].[Hymns_BookletReleases].[Release_Date] = (SELECT
			MAX([dbo].[Hymns_BookletReleases].[Release_Date])
                FROM
                    [dbo].[Hymns_BookletReleases]
                WHERE
                    [dbo].[Hymns_BookletReleases].[Booklet_ID] = [dbo].[Hymns_Booklets].[ID]))
    ORDER BY
        [dbo].[Hymns_Booklets].[Booklet_Order]
END 

GO


