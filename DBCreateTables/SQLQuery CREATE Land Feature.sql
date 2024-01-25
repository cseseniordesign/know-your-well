USE [kyw]
GO

/****** Object:  Table [dbo].[tblLandFeature]    Script Date: 11/29/2022 10:42:45 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP TABLE IF EXISTS [dbo].[tblLandFeature]

CREATE TABLE [dbo].[tblLandFeature](
	[landfeature_id] [int] NOT NULL IDENTITY(1, 1),
	[fieldactivity_id][int] NOT NULL,
	[lf_type] [nvarchar](100) NOT NULL,
	[lf_latitude][decimal](10,5) NOT NULL,
	[lf_longitude][decimal](10,5) NOT NULL,
    [lf_genlatitude][decimal](10,3) NOT NULL,
	[lf_genlongitude][decimal](10,3) NOT NULL,
	[lf_datacollector][nvarchar](255) NULL,	
	[lf_observation] [nvarchar](max) NULL,
	[lf_filename] [nvarchar](255) NULL,
	[lf_comments][nvarchar](max) NULL,
	[lf_datecollected] [datetime] NOT NULL,
 CONSTRAINT [PK_tblLandFeature] PRIMARY KEY CLUSTERED 
(
	[landfeature_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[tblLandFeature] ADD  CONSTRAINT [DF_tblLandFeature_lf_datecollected]  DEFAULT (getdate()) FOR [lf_datecollected]
GO

ALTER TABLE [dbo].[tblLandFeature]  WITH CHECK ADD  CONSTRAINT [FK_tblLandFeature_tblFieldActivity] FOREIGN KEY([fieldactivity_id])
REFERENCES [dbo].[tblFieldActivity] ([fieldactivity_id])
GO

ALTER TABLE [dbo].[tblLandFeature] CHECK CONSTRAINT [FK_tblLandFeature_tblFieldActivity]
GO


