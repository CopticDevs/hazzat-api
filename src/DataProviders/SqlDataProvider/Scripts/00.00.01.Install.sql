/************************************************************/
/*****              Create Tables                       *****/
/************************************************************/

/****** Object:  Table Hymns_Audio    Script Date: 9/12/2014 8:08:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Audio') AND type in (N'U'))
BEGIN
CREATE TABLE Hymns_Audio(
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](max) NOT NULL,
	[Author] [varchar](max) NOT NULL,
	[Language] [varchar](max) NOT NULL,
	[Audio_Path] [varchar](255) NOT NULL,
 CONSTRAINT [PK_Hymns_VideoHymns_Audio] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table Hymns_BookletReleases    Script Date: 9/12/2014 8:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_BookletReleases') AND type in (N'U'))
BEGIN
CREATE TABLE Hymns_BookletReleases(
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Booklet_ID] [int] NOT NULL,
	[Path] [varchar](255) NOT NULL,
	[Source_Path] [varchar](255) NOT NULL,
	[Thumbnail] [varchar](255) NULL,
	[Full_Picture] [varchar](255) NULL,
	[Release_Date] [datetime] NOT NULL,
	[Summary] [varchar](max) NULL,
 CONSTRAINT [PK_Hymns_VideoHymns_BookletReleases] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table Hymns_Booklets    Script Date: 9/12/2014 8:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Booklets') AND type in (N'U'))
BEGIN
CREATE TABLE Hymns_Booklets(
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Booklet_Order] [int] NOT NULL,
 CONSTRAINT [PK_Hymns_VideoHymns_Booklets] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table Hymns_Common    Script Date: 9/12/2014 8:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Common') AND type in (N'U'))
BEGIN
CREATE TABLE Hymns_Common(
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Content] [nvarchar](max) NULL,
	[Language] [varchar](50) NOT NULL,
	[Format_ID] [int] NOT NULL,
 CONSTRAINT [PK_Hymns_VideoHymns_Common] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table Hymns_Formats    Script Date: 9/12/2014 8:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Formats') AND type in (N'U'))
BEGIN
CREATE TABLE Hymns_Formats(
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Format_Order] [int] NOT NULL,
 CONSTRAINT [PK_Hymns_VideoHymns_Formats] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table Hymns_Hazzat    Script Date: 9/12/2014 8:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Hazzat') AND type in (N'U'))
BEGIN
CREATE TABLE Hymns_Hazzat(
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](max) NOT NULL,
	[Hazzat_English] [nvarchar](max) NULL,
	[Hazzat_Coptic] [nvarchar](max) NULL,
	[Hazzat_Arabic] [nvarchar](max) NULL,
 CONSTRAINT [PK_Hymns_VideoHymns_Hazzat] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table Hymns_Information    Script Date: 9/12/2014 8:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Information') AND type in (N'U'))
BEGIN
CREATE TABLE Hymns_Information(
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](max) NOT NULL,
	[Information_English] [nvarchar](max) NULL,
	[Information_Arabic] [nvarchar](max) NULL,
 CONSTRAINT [PK_Hymns_VideoHymns_Information] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table Hymns_Music    Script Date: 9/12/2014 8:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Music') AND type in (N'U'))
BEGIN
CREATE TABLE Hymns_Music(
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](max) NOT NULL,
	[Source_Path] [varchar](255) NOT NULL,
	[Document_Path] [varchar](255) NOT NULL,
	[Music_Path] [varchar](255) NOT NULL,
	[Audio_Path] [varchar](255) NOT NULL,
 CONSTRAINT [PK_Hymns_VideoHymns_Music] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table Hymns_Reasons    Script Date: 9/12/2014 8:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Reasons') AND type in (N'U'))
BEGIN
CREATE TABLE Hymns_Reasons(
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Long_English] [nvarchar](50) NOT NULL,
	[Long_Coptic] [nvarchar](50) NOT NULL,
	[Long_Arabic] [nvarchar](50) NOT NULL,
	[Short_English] [nvarchar](50) NOT NULL,
	[Short_Coptic] [nvarchar](50) NOT NULL,
	[Short_Arabic] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Hymns_VideoHymns_Reasons] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table Hymns_Requests    Script Date: 9/12/2014 8:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Requests') AND type in (N'U'))
BEGIN
CREATE TABLE Hymns_Requests(
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](max) NOT NULL,
	[Text_English] [bit] NOT NULL,
	[Text_Coptic] [bit] NOT NULL,
	[Text_Arabic] [bit] NOT NULL,
	[Hazzat_English] [bit] NOT NULL,
	[Hazzat_Coptic] [bit] NOT NULL,
	[Hazzat_Arabic] [bit] NOT NULL,
	[VerticalHazzat_English] [bit] NOT NULL,
	[VerticalHazzat_Coptic] [bit] NOT NULL,
	[VerticalHazzat_Arabic] [bit] NOT NULL,
	[Music] [bit] NOT NULL,
	[Audio_English] [bit] NOT NULL,
	[Audio_Coptic] [bit] NOT NULL,
	[Audio_Arabic] [bit] NOT NULL,
	[Video_English] [bit] NOT NULL,
	[Video_Coptic] [bit] NOT NULL,
	[Video_Arabic] [bit] NOT NULL,
	[Information_English] [bit] NOT NULL,
	[Information_Arabic] [bit] NOT NULL,
	[Status_ID] [int] NOT NULL,
	[TimeStamp] [datetime] NOT NULL,
	[User_ID] [int] NOT NULL,
	[Comments] [nvarchar](max) NULL,
 CONSTRAINT [PK_Hymns_VideoHymns_Requests] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
/****** Object:  Table Hymns_Seasons    Script Date: 9/12/2014 8:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Seasons') AND type in (N'U'))
BEGIN
CREATE TABLE Hymns_Seasons(
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](255) NOT NULL,
	[Verse] [varchar](max) NULL,
	[Season_Order] [int] NOT NULL,
	[Reason_ID] [int] NOT NULL,
	[Date_Specific] [bit] NOT NULL,
 CONSTRAINT [PK_Hymns_VideoHymns_Seasons] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table Hymns_ServiceHymns    Script Date: 9/12/2014 8:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_ServiceHymns') AND type in (N'U'))
BEGIN
CREATE TABLE Hymns_ServiceHymns(
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Structure_ID] [int] NOT NULL,
	[Hymn_Order] [int] NOT NULL,
	[Title] [varchar](max) NOT NULL,
 CONSTRAINT [PK_Hymns_VideoHymns_ServiceHymns] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table Hymns_ServiceHymnsContent    Script Date: 9/12/2014 8:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_ServiceHymnsContent') AND type in (N'U'))
BEGIN
CREATE TABLE Hymns_ServiceHymnsContent(
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](max) NOT NULL,
	[ServiceHymn_ID] [int] NOT NULL,
	[Content_ID] [int] NOT NULL,
	[Format_ID] [int] NOT NULL,
	[Type_ID] [int] NOT NULL,
	[Tune_ID] [int] NOT NULL,
	[Info] [nvarchar](max) NULL,
	[Updated_TimeStamp] [datetime] NOT NULL,
 CONSTRAINT [PK_Hymns_VideoHymns_ServiceHymnsContent] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table Hymns_Services    Script Date: 9/12/2014 8:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Services') AND type in (N'U'))
BEGIN
CREATE TABLE Hymns_Services(
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Hymns_VideoHymns_Services] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table Hymns_Status    Script Date: 9/12/2014 8:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Status') AND type in (N'U'))
BEGIN
CREATE TABLE Hymns_Status(
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Status_Order] [int] NOT NULL,
 CONSTRAINT [PK_Hymns_VideoHymns_Status] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table Hymns_Structure    Script Date: 9/12/2014 8:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Structure') AND type in (N'U'))
BEGIN
CREATE TABLE Hymns_Structure(
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](max) NOT NULL,
	[Season_ID] [int] NOT NULL,
	[Service_Order] [int] NOT NULL,
	[Service_ID] [int] NOT NULL,
 CONSTRAINT [PK_Hymns_VideoHymns_Structure] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table Hymns_Text    Script Date: 9/12/2014 8:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Text') AND type in (N'U'))
BEGIN
CREATE TABLE Hymns_Text(
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](max) NOT NULL,
	[Text_English] [nvarchar](max) NULL,
	[Text_Coptic] [nvarchar](max) NULL,
	[Text_Arabic] [nvarchar](max) NULL,
 CONSTRAINT [PK_Hymns_VideoHymns_Text] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table Hymns_Tunes    Script Date: 9/12/2014 8:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Tunes') AND type in (N'U'))
BEGIN
CREATE TABLE Hymns_Tunes(
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Tune_Order] [int] NOT NULL,
 CONSTRAINT [PK_Hymns_VideoHymns_Tunes] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table Hymns_Types    Script Date: 9/12/2014 8:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Types') AND type in (N'U'))
BEGIN
CREATE TABLE Hymns_Types(
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Name_Short] [varchar](50) NOT NULL,
	[Type_Order] [int] NOT NULL,
 CONSTRAINT [PK_Hymns_VideoHymns_Types] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table Hymns_VerticalHazzat    Script Date: 9/12/2014 8:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_VerticalHazzat') AND type in (N'U'))
BEGIN
CREATE TABLE Hymns_VerticalHazzat(
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](max) NOT NULL,
	[VerticalHazzat_English] [nvarchar](max) NULL,
	[VerticalHazzat_Coptic] [nvarchar](max) NULL,
	[VerticalHazzat_Arabic] [nvarchar](max) NULL,
 CONSTRAINT [PK_Hymns_VideoHymns_VerticalHazzat] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table Hymns_Video    Script Date: 9/12/2014 8:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Video') AND type in (N'U'))
BEGIN
CREATE TABLE Hymns_Video(
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](max) NOT NULL,
	[Video_English] [varchar](max) NULL,
	[Video_Coptic] [varchar](max) NULL,
	[Video_Arabic] [varchar](max) NULL,
 CONSTRAINT [PK_Hymns_VideoHymns_Video] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO
SET ANSI_PADDING OFF
GO

/************************************************************/
/*****              Create stored procedures            *****/
/************************************************************/

/****** Object:  StoredProcedure Hymns_SeasonListSelectAll    Script Date: 9/12/2014 8:08:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_SeasonListSelectAll') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE Hymns_SeasonListSelectAll
AS 
BEGIN 
    SELECT
        Hymns_Seasons.ID AS ItemId,
        Hymns_Seasons.Name,
        Hymns_Seasons.Verse,
        Hymns_Seasons.Season_Order,
        Hymns_Seasons.Reason_ID,
        Hymns_Reasons.Name AS Reason_Name,
        Hymns_Seasons.Date_Specific
    FROM
        Hymns_Seasons INNER JOIN
        Hymns_Reasons ON Hymns_Seasons.Reason_ID = Hymns_Reasons.ID
    ORDER BY Hymns_Seasons.Season_Order

END 

' 
END
GO
/****** Object:  StoredProcedure Hymns_SeasonSelect    Script Date: 9/12/2014 8:08:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_SeasonSelect') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE Hymns_SeasonSelect
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

' 
END
GO
/****** Object:  StoredProcedure Hymns_SeasonServicesSelect    Script Date: 9/12/2014 8:08:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_SeasonServicesSelect') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE Hymns_SeasonServicesSelect
    @Season_ID int
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
                                                          (Name = ''Text''))) AND
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
                                                          (Name = ''Hazzat''))) AND
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
                                                          (Name = ''Vertical Hazzat''))) AND
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
                                                          (Name = ''Musical Notes''))) AND
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
                                                          (Name = ''Audio''))) AND
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
                                                          (Name = ''Video''))) AND
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
                                                          (Name = ''Information''))) AND
             (Hymns_ServiceHymns.Structure_ID = Hymns_Structure.ID)) AS Information_Count
		FROM
        Hymns_Structure INNER JOIN
        Hymns_Seasons ON Hymns_Structure.Season_ID = Hymns_Seasons.ID INNER JOIN
        Hymns_Services ON Hymns_Structure.Service_ID = Hymns_Services.ID INNER JOIN
        Hymns_ServiceHymns ON Hymns_Structure.ID = Hymns_ServiceHymns.Structure_ID
    WHERE
        (Hymns_Structure.Season_ID = @Season_ID)
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
' 
END
GO
/****** Object:  StoredProcedure Hymns_ServiceHymnListSelectBySeasonServiceId    Script Date: 9/12/2014 8:08:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_ServiceHymnListSelectBySeasonServiceId') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE Hymns_ServiceHymnListSelectBySeasonServiceId
    @Structure_ID int
AS 
BEGIN 
    SELECT
        Hymns_ServiceHymns.ID AS ItemId,
        Hymns_Structure.ID AS Structure_ID,
        Hymns_Structure.Name AS Structure_Name,
        Hymns_ServiceHymns.Hymn_Order,
        Hymns_ServiceHymns.Title,
        (SELECT
             COUNT(ID) AS Expr1
         FROM
             Hymns_ServiceHymnsContent
         WHERE
             (Format_ID = (SELECT
                               ID
                           FROM
                               Hymns_Formats
                           WHERE
                               (Name = ''Text''))) AND
             (ServiceHymn_ID = Hymns_ServiceHymns.ID)) AS Text_Count,
        (SELECT
             COUNT(ID) AS Expr1
         FROM
             Hymns_ServiceHymnsContent
         WHERE
             (Format_ID = (SELECT
                               ID
                           FROM
                               Hymns_Formats
                           WHERE
                               (Name = ''Hazzat''))) AND
             (ServiceHymn_ID = Hymns_ServiceHymns.ID)) AS Hazzat_Count,
		(SELECT
             COUNT(ID) AS Expr1
         FROM
             Hymns_ServiceHymnsContent
         WHERE
             (Format_ID = (SELECT
                               ID
                           FROM
                               Hymns_Formats
                           WHERE
                               (Name = ''Vertical Hazzat''))) AND
             (ServiceHymn_ID = Hymns_ServiceHymns.ID)) AS VerticalHazzat_Count,
		(SELECT
             COUNT(ID) AS Expr1
         FROM
             Hymns_ServiceHymnsContent
         WHERE
             (Format_ID = (SELECT
                               ID
                           FROM
                               Hymns_Formats
                           WHERE
                               (Name = ''Musical Notes''))) AND
             (ServiceHymn_ID = Hymns_ServiceHymns.ID)) AS Music_Count,
		(SELECT
             COUNT(ID) AS Expr1
         FROM
             Hymns_ServiceHymnsContent
         WHERE
             (Format_ID = (SELECT
                               ID
                           FROM
                               Hymns_Formats
                           WHERE
                               (Name = ''Audio''))) AND
             (ServiceHymn_ID = Hymns_ServiceHymns.ID)) AS Audio_Count,
		(SELECT
             COUNT(ID) AS Expr1
         FROM
             Hymns_ServiceHymnsContent
         WHERE
             (Format_ID = (SELECT
                               ID
                           FROM
                               Hymns_Formats
                           WHERE
                               (Name = ''Video''))) AND
             (ServiceHymn_ID = Hymns_ServiceHymns.ID)) AS Video_Count,
		(SELECT
             COUNT(ID) AS Expr1
         FROM
             Hymns_ServiceHymnsContent
         WHERE
             (Format_ID = (SELECT
                               ID
                           FROM
                               Hymns_Formats
                           WHERE
                               (Name = ''Information''))) AND
             (ServiceHymn_ID = Hymns_ServiceHymns.ID)) AS Information_Count
        
    FROM
        Hymns_Structure INNER JOIN
        Hymns_ServiceHymns ON Hymns_Structure.ID = Hymns_ServiceHymns.Structure_ID
    Where
        Hymns_Structure.ID = @Structure_ID
    ORDER BY
        Hymns_ServiceHymns.Hymn_Order
END
' 
END
GO
