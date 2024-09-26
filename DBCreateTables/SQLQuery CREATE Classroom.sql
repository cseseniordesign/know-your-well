USE [kyw]
GO

/****** Object:  Table [dbo].[tblClassroom]    Script Date: 03/21/2023 10:42:45 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP TABLE IF EXISTS [dbo].[tblClassroom]

CREATE TABLE [dbo].[tblClassroom](
	[classroom_id] [int] NOT NULL IDENTITY(1, 1),
	[cl_name][nvarchar](255) NOT NULL,
	[school_id][int] NOT NULL,
	[cl_firstname] [nvarchar](255) NOT NULL,	
	[cl_lastname] [nvarchar](255) NOT NULL,
	[cl_email] [nvarchar](255) NOT NULL,
	[cl_comments] [nvarchar](max) NULL,
	[cl_dateentered] [datetime] NOT NULL,
 CONSTRAINT [PK_tblClassroom] PRIMARY KEY CLUSTERED 
(
	[classroom_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[tblClassroom] ADD  CONSTRAINT [DF_tblClassroom_cl_dateentered]  DEFAULT (getdate()) FOR [cl_dateentered]
GO

ALTER TABLE [dbo].[tblClassroom]   WITH CHECK ADD  CONSTRAINT [FK_tblClassroom_tblSchool] FOREIGN KEY([school_id])
REFERENCES [dbo].[tblSchool] ([school_id])
GO

ALTER TABLE [dbo].[tblClassroom]  CHECK CONSTRAINT [FK_tblClassroom_tblSchool]
GO 





