USE [kyw]
GO

/****** Object:  Table [dbo].[tblCountyLookup]    Script Date: 11/29/2022 10:42:45 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblCountyLookup](
	[county_id] [int] NOT NULL,
	[county_name] [nvarchar](255) NOT NULL,

 CONSTRAINT [PK_tblCountyLookup] PRIMARY KEY CLUSTERED 
(
	[county_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] 
GO

