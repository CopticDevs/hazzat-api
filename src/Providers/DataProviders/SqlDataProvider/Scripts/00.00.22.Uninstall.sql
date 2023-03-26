/****** Object:  StoredProcedure [dbo].[Hymns_ServiceHymnListSelectByTypeIdAndSeasonId]    Script Date: 3/25/2023 7:57:49 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





ALTER PROCEDURE [dbo].[Hymns_ServiceHymnListSelectByTypeIdAndSeasonId]
    @Type_ID int,
    @Season_ID int
AS 
BEGIN
    SELECT
        [dbo].[Hymns_ServiceHymns].[ID] AS ItemId,
        [dbo].[Hymns_Seasons].[ID] AS Season_ID,
        [dbo].[Hymns_Seasons].[Name] AS Season_Name,
        [dbo].[Hymns_Seasons].[Name_Arabic] AS Season_Name_Arabic,
        [dbo].[Hymns_Services].[ID] AS Service_ID,
        [dbo].[Hymns_Services].[Name] AS Service_Name,
        [dbo].[Hymns_Services].[Name_Arabic] AS Service_Name_Arabic,
        [dbo].[Hymns_ServiceHymns].[Hymn_Order],
        [dbo].[Hymns_ServiceHymns].[Title],
        [dbo].[Hymns_ServiceHymns].[Title_Arabic]
    FROM
        [dbo].[Hymns_Structure] INNER JOIN
        [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID] INNER JOIN
        [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID] INNER JOIN
        [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID] INNER JOIN
        [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_ServiceHymns].[ID] = [dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID]
    WHERE
        [dbo].[Hymns_ServiceHymnsContent].[Type_ID] = @Type_ID AND
        [dbo].[Hymns_Seasons].[ID] = @Season_ID
    GROUP BY
        [dbo].[Hymns_ServiceHymns].[ID],
        [dbo].[Hymns_Seasons].[ID],
        [dbo].[Hymns_Seasons].[Name],
        [dbo].[Hymns_Seasons].[Name_Arabic],
        [dbo].[Hymns_Services].[ID],
        [dbo].[Hymns_Services].[Name],
        [dbo].[Hymns_Services].[Name_Arabic],
        [dbo].[Hymns_ServiceHymns].[Hymn_Order],
        [dbo].[Hymns_ServiceHymns].[Title],
        [dbo].[Hymns_ServiceHymns].[Title_Arabic],
        [dbo].[Hymns_Structure].[Service_Order]
    ORDER BY
        [dbo].[Hymns_Structure].[Service_Order],
        [dbo].[Hymns_ServiceHymns].[Hymn_Order]
END
GO


/****** Object:  StoredProcedure [dbo].[Hymns_ServiceHymnSelectByTypeIdAndSeasonIdAndServiceHymnId]    Script Date: 3/25/2023 8:03:03 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO








ALTER PROCEDURE [dbo].[Hymns_ServiceHymnSelectByTypeIdAndSeasonIdAndServiceHymnId]
    @Type_ID int,
    @Season_ID int,
    @ServiceHymn_ID int
AS 
BEGIN
    SELECT
        [dbo].[Hymns_ServiceHymns].[ID] AS ItemId,
        [dbo].[Hymns_Seasons].[ID] AS Season_ID,
        [dbo].[Hymns_Seasons].[Name] AS Season_Name,
        [dbo].[Hymns_Seasons].[Name_Arabic] AS Season_Name_Arabic,
        [dbo].[Hymns_Services].[ID] AS Service_ID,
        [dbo].[Hymns_Services].[Name] AS Service_Name,
        [dbo].[Hymns_Services].[Name_Arabic] AS Service_Name_Arabic,
        [dbo].[Hymns_ServiceHymns].[Hymn_Order],
        [dbo].[Hymns_ServiceHymns].[Title],
        [dbo].[Hymns_ServiceHymns].[Title_Arabic]
    FROM
        [dbo].[Hymns_Structure] INNER JOIN
        [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID] INNER JOIN
        [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID] INNER JOIN
        [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID] INNER JOIN
        [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_ServiceHymns].[ID] = [dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID]
    WHERE
        [dbo].[Hymns_ServiceHymnsContent].[Type_ID] = @Type_ID AND
        [dbo].[Hymns_Seasons].[ID] = @Season_ID AND
        [dbo].[Hymns_ServiceHymns].[ID] = @ServiceHymn_ID
    GROUP BY
        [dbo].[Hymns_ServiceHymns].[ID],
        [dbo].[Hymns_Seasons].[ID],
        [dbo].[Hymns_Seasons].[Name],
        [dbo].[Hymns_Seasons].[Name_Arabic],
        [dbo].[Hymns_Services].[ID],
        [dbo].[Hymns_Services].[Name],
        [dbo].[Hymns_Services].[Name_Arabic],
        [dbo].[Hymns_ServiceHymns].[Hymn_Order],
        [dbo].[Hymns_ServiceHymns].[Title],
        [dbo].[Hymns_ServiceHymns].[Title_Arabic],
        [dbo].[Hymns_Structure].[Service_Order]
    ORDER BY
        [dbo].[Hymns_Structure].[Service_Order],
        [dbo].[Hymns_ServiceHymns].[Hymn_Order]
END
GO


/****** Object:  StoredProcedure [dbo].[Hymns_ServiceHymnListSelectByTuneIdAndSeasonId]    Script Date: 3/25/2023 8:04:31 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




ALTER PROCEDURE [dbo].[Hymns_ServiceHymnListSelectByTuneIdAndSeasonId]
    @Tune_ID int,
    @Season_ID int
AS 
BEGIN
    SELECT
        [dbo].[Hymns_ServiceHymns].[ID] AS ItemId,
        [dbo].[Hymns_Seasons].[ID] AS Season_ID,
        [dbo].[Hymns_Seasons].[Name] AS Season_Name,
        [dbo].[Hymns_Seasons].[Name_Arabic] AS Season_Name_Arabic,
        [dbo].[Hymns_Services].[ID] AS Service_ID,
        [dbo].[Hymns_Services].[Name] AS Service_Name,
        [dbo].[Hymns_Services].[Name_Arabic] AS Service_Name_Arabic,
        [dbo].[Hymns_ServiceHymns].[Hymn_Order],
        [dbo].[Hymns_ServiceHymns].[Title],
        [dbo].[Hymns_ServiceHymns].[Title_Arabic]
    FROM
        [dbo].[Hymns_Structure] INNER JOIN
        [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID] INNER JOIN
        [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID] INNER JOIN
        [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID] INNER JOIN
        [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_ServiceHymns].[ID] = [dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID]
    WHERE
        [dbo].[Hymns_ServiceHymnsContent].[Tune_ID] = @Tune_ID AND
        [dbo].[Hymns_Seasons].[ID] = @Season_ID
    GROUP BY
        [dbo].[Hymns_ServiceHymns].[ID],
        [dbo].[Hymns_Seasons].[ID],
        [dbo].[Hymns_Seasons].[Name],
        [dbo].[Hymns_Seasons].[Name_Arabic],
        [dbo].[Hymns_Services].[ID],
        [dbo].[Hymns_Services].[Name],
        [dbo].[Hymns_Services].[Name_Arabic],
        [dbo].[Hymns_ServiceHymns].[Hymn_Order],
        [dbo].[Hymns_ServiceHymns].[Title],
        [dbo].[Hymns_ServiceHymns].[Title_Arabic],
        [dbo].[Hymns_Structure].[Service_Order]
    ORDER BY
        [dbo].[Hymns_Structure].[Service_Order],
        [dbo].[Hymns_ServiceHymns].[Hymn_Order]
END
GO


/****** Object:  StoredProcedure [dbo].[Hymns_ServiceHymnSelectByTuneIdAndSeasonIdAndServiceHymnId]    Script Date: 3/25/2023 8:05:23 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO





ALTER PROCEDURE [dbo].[Hymns_ServiceHymnSelectByTuneIdAndSeasonIdAndServiceHymnId]
    @Tune_ID int,
    @Season_ID int,
    @ServiceHymn_ID int
AS 
BEGIN
    SELECT
        [dbo].[Hymns_ServiceHymns].[ID] AS ItemId,
        [dbo].[Hymns_Seasons].[ID] AS Season_ID,
        [dbo].[Hymns_Seasons].[Name] AS Season_Name,
        [dbo].[Hymns_Seasons].[Name_Arabic] AS Season_Name_Arabic,
        [dbo].[Hymns_Services].[ID] AS Service_ID,
        [dbo].[Hymns_Services].[Name] AS Service_Name,
        [dbo].[Hymns_Services].[Name_Arabic] AS Service_Name_Arabic,
        [dbo].[Hymns_ServiceHymns].[Hymn_Order],
        [dbo].[Hymns_ServiceHymns].[Title],
        [dbo].[Hymns_ServiceHymns].[Title_Arabic]
    FROM
        [dbo].[Hymns_Structure] INNER JOIN
        [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID] INNER JOIN
        [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID] INNER JOIN
        [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID] INNER JOIN
        [dbo].[Hymns_ServiceHymnsContent] ON [dbo].[Hymns_ServiceHymns].[ID] = [dbo].[Hymns_ServiceHymnsContent].[ServiceHymn_ID]
    WHERE
        [dbo].[Hymns_ServiceHymnsContent].[Tune_ID] = @Tune_ID AND
        [dbo].[Hymns_Seasons].[ID] = @Season_ID AND
        [dbo].[Hymns_ServiceHymns].[ID] = @ServiceHymn_ID
    GROUP BY
        [dbo].[Hymns_ServiceHymns].[ID],
        [dbo].[Hymns_Seasons].[ID],
        [dbo].[Hymns_Seasons].[Name],
        [dbo].[Hymns_Seasons].[Name_Arabic],
        [dbo].[Hymns_Services].[ID],
        [dbo].[Hymns_Services].[Name],
        [dbo].[Hymns_Services].[Name_Arabic],
        [dbo].[Hymns_ServiceHymns].[Hymn_Order],
        [dbo].[Hymns_ServiceHymns].[Title],
        [dbo].[Hymns_ServiceHymns].[Title_Arabic],
        [dbo].[Hymns_Structure].[Service_Order]
    ORDER BY
        [dbo].[Hymns_Structure].[Service_Order],
        [dbo].[Hymns_ServiceHymns].[Hymn_Order]
END
GO


/****** Object:  StoredProcedure [dbo].[Hymns_ServiceHymnListSelectBySeasonIdAndServiceId]    Script Date: 3/25/2023 8:06:35 PM ******/
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
        [dbo].[Hymns_ServiceHymns].[ID] AS ItemId,
        [dbo].[Hymns_Structure].[Season_ID] AS Season_ID,
        [dbo].[Hymns_Seasons].[Name] AS Season_Name,
        [dbo].[Hymns_Seasons].[Name_Arabic] AS Season_Name_Arabic,
        [dbo].[Hymns_Structure].[Service_ID] AS Service_ID,
        [dbo].[Hymns_Services].[Name] AS Service_Name,
        [dbo].[Hymns_Services].[Name_Arabic] AS Service_Name_Arabic,
        [dbo].[Hymns_ServiceHymns].[Title],
        [dbo].[Hymns_ServiceHymns].[Title_Arabic],
        [dbo].[Hymns_ServiceHymns].[Hymn_Order]
    FROM
        [dbo].[Hymns_Structure]
        INNER JOIN [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID]
        INNER JOIN [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID]
        INNER JOIN [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID]
    WHERE
        [dbo].[Hymns_Structure].[Season_ID] = @Season_ID AND
        [dbo].[Hymns_Structure].[Service_ID] = @Service_ID
    ORDER BY
        [dbo].[Hymns_ServiceHymns].[Hymn_Order]
END
GO


/****** Object:  StoredProcedure [dbo].[Hymns_ServiceHymnSelectBySeasonIdAndServiceIdAndServiceHymnId]    Script Date: 3/25/2023 8:08:38 PM ******/
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
        [dbo].[Hymns_ServiceHymns].[ID] AS ItemId,
        [dbo].[Hymns_Structure].[Season_ID] AS Season_ID,
        [dbo].[Hymns_Seasons].[Name] AS Season_Name,
        [dbo].[Hymns_Seasons].[Name_Arabic] AS Season_Name_Arabic,
        [dbo].[Hymns_Structure].[Service_ID] AS Service_ID,
        [dbo].[Hymns_Services].[Name] AS Service_Name,
        [dbo].[Hymns_Services].[Name_Arabic] AS Service_Name_Arabic,
        [dbo].[Hymns_ServiceHymns].[Title],
        [dbo].[Hymns_ServiceHymns].[Title_Arabic],
        [dbo].[Hymns_ServiceHymns].[Hymn_Order]
    FROM
        [dbo].[Hymns_Structure]
        INNER JOIN [dbo].[Hymns_ServiceHymns] ON [dbo].[Hymns_Structure].[ID] = [dbo].[Hymns_ServiceHymns].[Structure_ID]
        INNER JOIN [dbo].[Hymns_Seasons] ON [dbo].[Hymns_Structure].[Season_ID] = [dbo].[Hymns_Seasons].[ID]
        INNER JOIN [dbo].[Hymns_Services] ON [dbo].[Hymns_Structure].[Service_ID] = [dbo].[Hymns_Services].[ID]
    WHERE
        [dbo].[Hymns_Structure].[Season_ID] = @Season_ID AND
        [dbo].[Hymns_Structure].[Service_ID] = @Service_ID AND
        [dbo].[Hymns_ServiceHymns].[ID] = @ServiceHymn_ID
    ORDER BY
        [dbo].[Hymns_ServiceHymns].[Hymn_Order]
END
GO


