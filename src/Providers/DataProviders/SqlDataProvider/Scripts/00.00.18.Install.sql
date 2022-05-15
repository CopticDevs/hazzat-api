ALTER Table dbo.[Hymns_Formats]
ADD [Name_Arabic] [nvarchar](50) NOT NULL


/****** Object:  StoredProcedure [dbo].[Hymns_HymnFormatListSelectBySeasonIdAndServiceIdAndServiceHymnId]    Script Date: 5/15/2022 2:23:16 PM ******/
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
        [dbo].[Hymns_Formats].[ID] AS ItemId,
        [dbo].[Hymns_Formats].[Name] AS Format_Name,
        [dbo].[Hymns_Formats].[Name_Arabic] AS Format_Name_Arabic,
        [dbo].[Hymns_Structure].[Season_ID] AS Season_ID,
        [dbo].[Hymns_Seasons].[Name] AS Season_Name,
        [dbo].[Hymns_Seasons].[Name_Arabic] AS Season_Name_Arabic,
        [dbo].[Hymns_Structure].[Service_ID] AS Service_ID,
        [dbo].[Hymns_Services].[Name] AS Service_Name,
        [dbo].[Hymns_Services].[Name_Arabic] AS Service_Name_Arabic,
        [dbo].[Hymns_ServiceHymns].[Hymn_Order],
        [dbo].[Hymns_ServiceHymns].[ID] AS ServiceHymn_ID,
        [dbo].[Hymns_ServiceHymns].[Title] AS ServiceHymn_Title,
        [dbo].[Hymns_ServiceHymns].[Title_Arabic] AS ServiceHymn_Title_Arabic,
        COUNT([dbo].[Hymns_ServiceHymnsContent].[ID]) AS Content_Count        
    FROM
        [dbo].[Hymns_Structure]
        INNER JOIN [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID]
        INNER JOIN [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_ServiceHymns].[ID] = [dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID]
        INNER JOIN [dbo].[Hymns_Formats] ON [dbo].[Hymns_ServiceHymnsContent].[Format_ID] = [dbo].[Hymns_Formats].[ID]
        INNER JOIN [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID]
        INNER JOIN [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID]
    WHERE
        [dbo].[Hymns_Structure].[Season_ID] = @Season_ID AND
        [dbo].[Hymns_Structure].[Service_ID] = @Service_ID AND
        [dbo].[Hymns_ServiceHymns].[ID] = @ServiceHymn_ID
    GROUP BY
        [dbo].[Hymns_ServiceHymnsContent].[Format_ID],
        [dbo].[Hymns_ServiceHymns].[ID],
        [dbo].[Hymns_Structure].[ID],
        [dbo].[Hymns_Structure].[Season_ID],
        [dbo].[Hymns_Structure].[Service_ID],
        [dbo].[Hymns_ServiceHymns].[Hymn_Order],
        [dbo].[Hymns_ServiceHymns].[Title],
        [dbo].[Hymns_ServiceHymns].[Title_Arabic],
        [dbo].[Hymns_Formats].[ID],
        [dbo].[Hymns_Formats].[Name],
        [dbo].[Hymns_Formats].[Name_Arabic],
        [dbo].[Hymns_Seasons].[Name],
        [dbo].[Hymns_Seasons].[Name_Arabic],
        [dbo].[Hymns_Services].[Name],
        [dbo].[Hymns_Services].[Name_Arabic]
    ORDER BY
        [dbo].[Hymns_ServiceHymns].[Hymn_Order]
END
GO


/****** Object:  StoredProcedure [dbo].[Hymns_HymnFormatSelectBySeasonIdAndServiceIdAndServiceHymnIdAndFormatId]    Script Date: 5/15/2022 2:33:53 PM ******/
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
        [dbo].[Hymns_Formats].[ID] AS ItemId,
        [dbo].[Hymns_Formats].[Name] AS Format_Name,
        [dbo].[Hymns_Formats].[Name_Arabic] AS Format_Name_Arabic,
        [dbo].[Hymns_Structure].[Season_ID] AS Season_ID,
        [dbo].[Hymns_Seasons].[Name] AS Season_Name,
        [dbo].[Hymns_Seasons].[Name_Arabic] AS Season_Name_Arabic,
        [dbo].[Hymns_Structure].[Service_ID] AS Service_ID,
        [dbo].[Hymns_Services].[Name] AS Service_Name,
        [dbo].[Hymns_Services].[Name_Arabic] AS Service_Name_Arabic,
        [dbo].[Hymns_ServiceHymns].[Hymn_Order],
        [dbo].[Hymns_ServiceHymns].[ID] AS ServiceHymn_ID,
        [dbo].[Hymns_ServiceHymns].[Title] AS ServiceHymn_Title,
        [dbo].[Hymns_ServiceHymns].[Title_Arabic] AS ServiceHymn_Title_Arabic,
        COUNT([dbo].[Hymns_ServiceHymnsContent].[ID]) AS Content_Count
    FROM
        [dbo].[Hymns_Structure]
        INNER JOIN [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID]
        INNER JOIN [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_ServiceHymns].[ID] = [dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID]
        INNER JOIN [dbo].[Hymns_Formats] ON [dbo].[Hymns_ServiceHymnsContent].[Format_ID] = [dbo].[Hymns_Formats].[ID]
        INNER JOIN [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID]
        INNER JOIN [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID]
    WHERE
        [dbo].[Hymns_Structure].[Season_ID] = @Season_ID AND
        [dbo].[Hymns_Structure].[Service_ID] = @Service_ID AND
        [dbo].[Hymns_ServiceHymns].[ID] = @ServiceHymn_ID AND
        [dbo].[Hymns_Formats].[ID] = @Format_ID
    GROUP BY
        [dbo].[Hymns_ServiceHymnsContent].[Format_ID],
        [dbo].[Hymns_ServiceHymns].[ID],
        [dbo].[Hymns_Structure].[ID],
        [dbo].[Hymns_Structure].[Season_ID],
        [dbo].[Hymns_Structure].[Service_ID],
        [dbo].[Hymns_ServiceHymns].[Hymn_Order],
        [dbo].[Hymns_ServiceHymns].[Title],
        [dbo].[Hymns_ServiceHymns].[Title_Arabic],
        [dbo].[Hymns_Formats].[ID],
        [dbo].[Hymns_Formats].[Name],
        [dbo].[Hymns_Formats].[Name_Arabic],
        [dbo].[Hymns_Seasons].[Name],
        [dbo].[Hymns_Seasons].[Name_Arabic],
        [dbo].[Hymns_Services].[Name],
        [dbo].[Hymns_Services].[Name_Arabic]
    ORDER BY
        [dbo].[Hymns_ServiceHymns].[Hymn_Order]
END
GO


