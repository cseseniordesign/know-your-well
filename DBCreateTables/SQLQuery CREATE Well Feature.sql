USE [kyw]
GO

/****** Object:  Table [dbo].[tblWellFeature]    Script Date: 11/29/2022 10:42:45 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP TABLE IF EXISTS [dbo].[tblWellFeature]

CREATE TABLE [dbo].[tblWellFeature](
	[wellfeature_id] [int] NOT NULL IDENTITY(1, 1),
	[fieldactivity_id][int] NOT NULL,
	[wf_type] [nvarchar](100) NOT NULL,
	[wf_latitude][decimal](10,5) NOT NULL,
	[wf_longitude][decimal](10,5) NOT NULL,
	[wf_genlatitude][decimal](10,3) NOT NULL,
	[wf_genlongitude][decimal](10,3) NOT NULL,
	[wf_datacollector] [nvarchar](255) NULL,	
	[wf_observation] [nvarchar](max) NULL,
	[wf_filename] [nvarchar](255) NULL,
	[wf_comments][nvarchar](max) NULL,
	[wf_datecollected] [datetime] NOT NULL,
 CONSTRAINT [PK_tblWellFeature] PRIMARY KEY CLUSTERED 
(
	[wellfeature_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[tblWellFeature] ADD  CONSTRAINT [DF_tblWellFeature_wf_datecollected]  DEFAULT (getdate()) FOR [wf_datecollected]
GO

ALTER TABLE [dbo].[tblWellFeature]  WITH CHECK ADD  CONSTRAINT [FK_tblWellFeature_tblFieldActivity] FOREIGN KEY([fieldactivity_id])
REFERENCES [dbo].[tblFieldActivity] ([fieldactivity_id])
GO

ALTER TABLE [dbo].[tblWellFeature] CHECK CONSTRAINT [FK_tblWellFeature_tblFieldActivity]
GO


