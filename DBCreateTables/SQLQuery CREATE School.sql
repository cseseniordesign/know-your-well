USE [kyw]
GO

/****** Object:  Table [dbo].[tblSchool]    Script Date: 11/29/2022 10:42:45 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP TABLE IF EXISTS [dbo].[tblSchool]

CREATE TABLE [dbo].[tblSchool](
	[school_id] [int] NOT NULL IDENTITY(1, 1),
	[sch_name] [nvarchar](255) NOT NULL,
	[sch_code] [nvarchar](3) NOT NULL,
	[sch_address] [nvarchar](255) NULL,
	[nrd_id][int] NOT NULL,
    [sch_latitude] [decimal](10,5) NULL,
	[sch_longitude] [decimal](10,5) NULL,
	[sch_activeflag] [bit] NOT NULL DEFAULT (1),
	[sch_datedeactivated] [datetime] NULL,
	[sch_comments] [nvarchar](max) NULL,
	[sch_dateentered] [datetime] NOT NULL,
 CONSTRAINT [PK_tblSchool] PRIMARY KEY CLUSTERED 
(
	[school_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[tblSchool] ADD  CONSTRAINT [DF_tblSchool_sch_dateentered]  DEFAULT (getdate()) FOR [sch_dateentered]
GO

ALTER TABLE [dbo].[tblSchool]   WITH CHECK ADD  CONSTRAINT [FK_tblSchool_tblNRDLookup] FOREIGN KEY([nrd_id])
REFERENCES [dbo].[tblNRDLookup] ([nrd_id])
GO

ALTER TABLE [dbo].[tblSchool]  CHECK CONSTRAINT [FK_tblSchool_tblNRDLookup]
GO

