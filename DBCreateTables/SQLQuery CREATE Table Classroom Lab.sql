USE [kyw]
GO


/****** Object:  Table [dbo].[tblClassroomLab]    Script Date: 5/21/2024 4:44:21 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblClassroomLab](
	[classlab_id] [int] IDENTITY(1,1) NOT NULL,
	[fieldactivity_id] [int] NULL,
	[cl_ammonia] [decimal](8, 2) NULL,
	[cl_calciumhardness] [decimal](8, 2) NULL,
	[cl_chloride] [decimal](8, 2) NULL,
	[cl_bacteria] [nvarchar](255) NULL,
	[cl_copper] [decimal](8, 2) NULL,
	[cl_iron] [decimal](8, 2) NULL,
	[cl_manganese] [decimal](8, 2) NULL,
	[cl_nitrate] [decimal](8, 2) NULL,
	[cl_observation] [nvarchar](max) NULL,
	[cl_nitrite] [decimal](8, 2) NULL,
	[cl_pest_atrazine] [nvarchar](255) NULL,
	[cl_datacollector] [nvarchar](255) NULL,
	[cl_comments] [nvarchar](max) NULL,
	[cl_datecollected] [datetime] NOT NULL,	
	[cl_databaseentered][datetime] NOT NULL,

 CONSTRAINT [PK_tblClassroomLab] PRIMARY KEY CLUSTERED 
(
	[classlab_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[tblClassroomLab] ADD  CONSTRAINT [DF_tblClassroomLab_cl_datecollected]  DEFAULT (getdate()) FOR [cl_datecollected]
GO

ALTER TABLE [dbo].[tblClassroomLab] ADD  CONSTRAINT [DF_tblClassroomLab_cl_databaseentered]  DEFAULT (getdate()) FOR [cl_databaseentered]
GO


ALTER TABLE [dbo].[tblClassroomLab]  WITH CHECK ADD  CONSTRAINT [FK_tblClassroomLab_tblFieldActivity] FOREIGN KEY([fieldactivity_id])
REFERENCES [dbo].[tblFieldActivity] ([fieldactivity_id])
GO

ALTER TABLE [dbo].[tblClassroomLab] CHECK CONSTRAINT [FK_tblClassroomLab_tblFieldActivity]
GO


