USE [KYW]
GO

/****** Object:  Table [dbo].[tblSchool]    Script Date: 5/21/2024 4:31:03 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblSchool](
	[school_id] [int] IDENTITY(1,1) NOT NULL,
	[sch_name] [nvarchar](255) NOT NULL,
	[sch_code] [nvarchar](3) NOT NULL,
	[sch_address] [nvarchar](255) NULL,
	[nrd_id] [int] NOT NULL,
	[sch_latitude] [decimal](10, 5) NULL,
	[sch_longitude] [decimal](10, 5) NULL,
	[sch_activeflag] [bit] NOT NULL,
	[sch_datedeactivated] [datetime] NULL,
	[sch_comments] [nvarchar](max) NULL,
	[sch_dateentered] [datetime] NOT NULL,
 CONSTRAINT [PK_tblSchool] PRIMARY KEY CLUSTERED 
(
	[school_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[tblSchool] ADD  DEFAULT ((1)) FOR [sch_activeflag]
GO

ALTER TABLE [dbo].[tblSchool] ADD  CONSTRAINT [DF_tblSchool_sch_dateentered]  DEFAULT (getdate()) FOR [sch_dateentered]
GO

ALTER TABLE [dbo].[tblSchool]  WITH CHECK ADD  CONSTRAINT [FK_tblSchool_tblNRDLookup] FOREIGN KEY([nrd_id])
REFERENCES [dbo].[tblNRDLookup] ([nrd_id])
GO

ALTER TABLE [dbo].[tblSchool] CHECK CONSTRAINT [FK_tblSchool_tblNRDLookup]
GO


