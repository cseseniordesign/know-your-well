USE [kyw]
GO

/****** Object:  Table [dbo].[tblWellinfo]    Script Date: 11/29/2022 10:42:45 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP TABLE IF EXISTS [dbo].[tblWellInfo]

CREATE TABLE [dbo].[tblWellInfo](
	[well_id] [int] NOT NULL IDENTITY(1, 1),
	[wi_wellcode] [nvarchar](100) NOT NULL,
	[wi_wellname] [nvarchar](255) NOT NULL,
	[school_id][int] NOT NULL,
	[wi_well_user] [nvarchar](255) NULL,	
	[wi_address] [nvarchar](255) NULL,
	[wi_city] [nvarchar](255) NULL,
	[wi_state] [nvarchar](2) NULL,
	[wi_zipcode] [nvarchar](100) NULL,
	[county_id] [int] NOT NULL,
	[nrd_id][int] NOT NULL,
	[wi_phone_well_user][nvarchar](255) NULL,
	[wi_email_well_user][nvarchar](255) NULL,
	[wi_well_owner] [nvarchar](255) NULL,
	[wi_installyear] [int] NOT NULL,
	[wi_smelltaste][nvarchar](max) NULL,
	[wi_smelltaste_description][nvarchar](max) NULL,
	[wi_welldry][nvarchar](max) NULL,
	[wi_welldry_description][nvarchar](max) NULL,
	[wi_maintenance5yr] [nvarchar](255) NOT NULL,
	[wi_landuse5yr][nvarchar](255) NOT NULL,
	[wi_numberwelluser] [int] NULL,
	[wi_pestmanure][nvarchar](255) NOT NULL,
	[wi_estlatitude][decimal](10,5) NOT NULL,
	[wi_estlongitude][decimal](10,5)  NOT NULL,
	[wi_boreholediameter][decimal](8,2) NOT NULL,
	[wi_totaldepth][decimal](8,2) NOT NULL,	
	[wi_waterleveldepth][decimal](8,2) NOT NULL,
	[wi_aquifertype][nvarchar](100) NOT NULL,
	[wi_aquiferclass][nvarchar](100) NOT NULL,
	[wi_welltype][nvarchar](100) NOT NULL,
	[wi_wellcasematerial][nvarchar](max) NOT NULL,
	[wi_datacollector][nvarchar](255) NULL,
	[wi_observation][nvarchar](max) NULL,
	[wi_topography][nvarchar](100) NULL,
	[wi_commonid][int] NULL,
	[wi_comments] [nvarchar](max) NULL,
	[wi_dateentered] [datetime] NOT NULL,
 CONSTRAINT [PK_tblWellInfo] PRIMARY KEY CLUSTERED 
(
	[well_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[tblWellInfo] ADD  CONSTRAINT [DF_tblWellInfo_wi_dateentered]  DEFAULT (getdate()) FOR [wi_dateentered]
GO

ALTER TABLE [dbo].[tblWellInfo]   WITH CHECK ADD  CONSTRAINT [FK_tblWellInfo_tblSchool] FOREIGN KEY([school_id])
REFERENCES [dbo].[tblSchool] ([school_id])
GO

ALTER TABLE [dbo].[tblWellInfo]  CHECK CONSTRAINT [FK_tblWellInfo_tblSchool]
GO





