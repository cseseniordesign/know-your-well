USE [kyw]
GO

/****** Object:  Table [dbo].[tblClassroomLab]    Script Date: 9/16/2022 10:42:45 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP TABLE IF EXISTS [dbo].[tblClassroomLab]

CREATE TABLE [dbo].[tblClassroomLab](
	[classlab_id] [int] NOT NULL IDENTITY(1, 1),
	[fieldactivity_id][int] NOT NULL,
	[cl_ammonia][decimal](8,2) NULL,
	[cl_calciumhardness][decimal](8,2) NULL,	
	[cl_chloride][decimal](8,2) NULL,	
	[cl_bacteria] [nvarchar](255) NULL,
	[cl_copper][decimal](8,2) NULL,	
	[cl_iron][decimal](8,2) NULL,	
	[cl_manganese][decimal](8,2) NULL,	
	[cl_nitrate][decimal](8,2) NULL,	
	[cl_observation][nvarchar](max) NULL,
	[cl_nitrite][decimal](8,2) NULL,	
	[cl_pest_atrazine] [nvarchar](255) NULL,	
	[cl_wsl_sample_id] [nvarchar](255) NOT NULL,
	[cl_datacollector] [nvarchar](255) NULL,	
	[cl_comments] [nvarchar](max) NULL,
	[cl_datecollected] [datetime] NOT NULL,
 CONSTRAINT [PK_tblClassroomLab] PRIMARY KEY CLUSTERED 
(
	[classlab_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[tblClassroomLab] ADD  CONSTRAINT [DF_tblClassroomLab_cl_datecollected]  DEFAULT (getdate()) FOR [cl_datecollected]
GO

ALTER TABLE [dbo].[tblClassroomLab]  WITH CHECK ADD  CONSTRAINT [FK_tblClassroomLab_tblFieldActivity] FOREIGN KEY([fieldactivity_id])
REFERENCES [dbo].[tblFieldActivity] ([fieldactivity_id])
GO

ALTER TABLE [dbo].[tblClassroomLab] CHECK CONSTRAINT [FK_tblClassroomLab_tblFieldActivity]
GO 





