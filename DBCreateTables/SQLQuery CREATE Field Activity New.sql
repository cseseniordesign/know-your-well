USE [kyw]
GO

/****** Object:  Table [dbo].[tblFieldActivity]    Script Date: 11/29/2022 10:42:45 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP TABLE IF EXISTS [dbo].[tblFieldActivity]

CREATE TABLE [dbo].[tblFieldActivity](
	[fieldactivity_id] [int] NOT NULL IDENTITY(1, 1),
	[well_id][int] NOT NULL,
	[fa_latitude][decimal](10,5) NOT NULL,
	[fa_longitude][decimal](10,5) NOT NULL,
	[fa_genlatitude][decimal](8,3) NOT NULL,
	[fa_genlongitude][decimal](8,3) NOT Null,
	[fa_weather][nvarchar](max) NOT NULL,
	[fa_wellcovercondition] [nvarchar](255) NOT NULL,
	[fa_wellcoverdescription][nvarchar](max) NULL,
	[fa_surfacerunoff] [nvarchar](255) NOT NULL,	
	[fa_pooling] [nvarchar](255) NOT NULL,	
	[fa_groundwatertemp][decimal](8,2) NOT NULL,
	[fa_ph][decimal](8,2) NOT NULL,
	[fa_conductivity][decimal](8,2) NOT NULL,
	[fa_datacollector] [nvarchar](255) NULL,
	[fa_observation][nvarchar](max) NULL,
	[fa_comments] [nvarchar](max) NULL,
	[fa_datecollected] [datetime] NOT NULL,
 CONSTRAINT [PK_tblFieldActivity] PRIMARY KEY CLUSTERED 
(
	[fieldactivity_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[tblFieldActivity]  WITH CHECK ADD  CONSTRAINT [FK_tblFieldActivity_tblWellInfo] FOREIGN KEY([well_id])
REFERENCES [dbo].[tblWellInfo] ([well_id])
GO

ALTER TABLE [dbo].[tblFieldActivity] CHECK CONSTRAINT [FK_tblFieldActivity_tblWellInfo]
GO

