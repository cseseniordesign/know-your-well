USE [kyw]
GO

/****** Object:  Table [dbo].[tblNRDLookup]    Script Date: 11/29/2022 10:42:45 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblNRDLookup](
	[nrd_id] [int] NOT NULL,
	[nrd_name] [nvarchar](255) NOT NULL,
	[nrd_abbr] [nvarchar](10) NOT NULL,
	
 CONSTRAINT [PK_tblNRDLookup] PRIMARY KEY CLUSTERED 
(
	[nrd_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] 
GO

