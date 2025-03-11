USE [kyw]
GO

/****** Object:  View [dbo].[qryAllWellImages]    Script Date: 11/24/2025 3:15:39 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


Create View [dbo].[qryAllWellImages] AS
SELECT        dbo.tblWellInfo.school_id, dbo.tblSchool.sch_name, dbo.tblWellInfo.well_id, dbo.tblWellInfo.wi_wellcode, dbo.tblWellInfo.wi_wellname, dbo.tblImage.im_type, dbo.tblImage.im_latitude, dbo.tblImage.im_longitude, 
                         dbo.tblImage.im_filename, dbo.tblImage.im_datacollector, dbo.tblImage.im_observation, dbo.tblImage.im_datecollected
FROM            dbo.tblWellInfo INNER JOIN
                         dbo.tblImage ON dbo.tblWellInfo.well_id = dbo.tblImage.well_id INNER JOIN
                         dbo.tblSchool ON dbo.tblWellInfo.school_id = dbo.tblSchool.school_id
