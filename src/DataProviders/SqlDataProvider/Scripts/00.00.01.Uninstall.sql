/************************************************************/
/*****              DROP tables                         *****/
/************************************************************/

/****** Object:  Table Hymns_Video    Script Date: 9/12/2014 8:08:22 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Video') AND type in (N'U'))
DROP TABLE Hymns_Video
GO
/****** Object:  Table Hymns_VerticalHazzat    Script Date: 9/12/2014 8:08:22 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_VerticalHazzat') AND type in (N'U'))
DROP TABLE Hymns_VerticalHazzat
GO
/****** Object:  Table Hymns_Types    Script Date: 9/12/2014 8:08:22 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Types') AND type in (N'U'))
DROP TABLE Hymns_Types
GO
/****** Object:  Table Hymns_Tunes    Script Date: 9/12/2014 8:08:22 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Tunes') AND type in (N'U'))
DROP TABLE Hymns_Tunes
GO
/****** Object:  Table Hymns_Text    Script Date: 9/12/2014 8:08:22 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Text') AND type in (N'U'))
DROP TABLE Hymns_Text
GO
/****** Object:  Table Hymns_Structure    Script Date: 9/12/2014 8:08:22 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Structure') AND type in (N'U'))
DROP TABLE Hymns_Structure
GO
/****** Object:  Table Hymns_Status    Script Date: 9/12/2014 8:08:22 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Status') AND type in (N'U'))
DROP TABLE Hymns_Status
GO
/****** Object:  Table Hymns_Services    Script Date: 9/12/2014 8:08:22 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Services') AND type in (N'U'))
DROP TABLE Hymns_Services
GO
/****** Object:  Table Hymns_ServiceHymnsContent    Script Date: 9/12/2014 8:08:22 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_ServiceHymnsContent') AND type in (N'U'))
DROP TABLE Hymns_ServiceHymnsContent
GO
/****** Object:  Table Hymns_ServiceHymns    Script Date: 9/12/2014 8:08:22 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_ServiceHymns') AND type in (N'U'))
DROP TABLE Hymns_ServiceHymns
GO
/****** Object:  Table Hymns_Seasons    Script Date: 9/12/2014 8:08:22 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Seasons') AND type in (N'U'))
DROP TABLE Hymns_Seasons
GO
/****** Object:  Table Hymns_Requests    Script Date: 9/12/2014 8:08:22 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Requests') AND type in (N'U'))
DROP TABLE Hymns_Requests
GO
/****** Object:  Table Hymns_Reasons    Script Date: 9/12/2014 8:08:22 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Reasons') AND type in (N'U'))
DROP TABLE Hymns_Reasons
GO
/****** Object:  Table Hymns_Music    Script Date: 9/12/2014 8:08:22 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Music') AND type in (N'U'))
DROP TABLE Hymns_Music
GO
/****** Object:  Table Hymns_Information    Script Date: 9/12/2014 8:08:22 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Information') AND type in (N'U'))
DROP TABLE Hymns_Information
GO
/****** Object:  Table Hymns_Hazzat    Script Date: 9/12/2014 8:08:22 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Hazzat') AND type in (N'U'))
DROP TABLE Hymns_Hazzat
GO
/****** Object:  Table Hymns_Formats    Script Date: 9/12/2014 8:08:22 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Formats') AND type in (N'U'))
DROP TABLE Hymns_Formats
GO
/****** Object:  Table Hymns_Common    Script Date: 9/12/2014 8:08:22 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Common') AND type in (N'U'))
DROP TABLE Hymns_Common
GO
/****** Object:  Table Hymns_Booklets    Script Date: 9/12/2014 8:08:22 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Booklets') AND type in (N'U'))
DROP TABLE Hymns_Booklets
GO
/****** Object:  Table Hymns_BookletReleases    Script Date: 9/12/2014 8:08:22 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_BookletReleases') AND type in (N'U'))
DROP TABLE Hymns_BookletReleases
GO
/****** Object:  Table Hymns_Audio    Script Date: 9/12/2014 8:08:22 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_Audio') AND type in (N'U'))
DROP TABLE Hymns_Audio
GO

/************************************************************/
/*****              DROP Stored Procedures              *****/
/************************************************************/

/****** Object:  StoredProcedure Hymns_SeasonListSelectAll    Script Date: 9/12/2014 8:08:22 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_SeasonListSelectAll') AND type in (N'P', N'PC'))
DROP PROCEDURE Hymns_SeasonListSelectAll
GO
/****** Object:  StoredProcedure Hymns_SeasonSelect    Script Date: 9/12/2014 8:08:22 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_SeasonSelect') AND type in (N'P', N'PC'))
DROP PROCEDURE Hymns_SeasonSelect
GO
/****** Object:  StoredProcedure Hymns_SeasonServicesSelect    Script Date: 9/12/2014 8:08:22 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_SeasonServicesSelect') AND type in (N'P', N'PC'))
DROP PROCEDURE Hymns_SeasonServicesSelect
GO
/****** Object:  StoredProcedure Hymns_ServiceHymnListSelectBySeasonServiceId    Script Date: 9/12/2014 8:08:22 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Hymns_ServiceHymnListSelectBySeasonServiceId') AND type in (N'P', N'PC'))
DROP PROCEDURE Hymns_ServiceHymnListSelectBySeasonServiceId
GO
