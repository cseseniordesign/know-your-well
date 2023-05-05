USE [kyw]
GO

/****** Object:  Table [dbo].[tblWellForm]    Script Date: 11/29/2022 10:42:45 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP TABLE IF EXISTS [dbo].[tblWellForm]

CREATE TABLE [dbo].[tblWellForm](
	[wellform_id] [int] NOT NULL IDENTITY(1, 1),
	[well_id][int] NOT NULL,
	[wform_type] [nvarchar](100) NOT NULL,
	[wform_datacollector] [nvarchar](255) NULL,	
	[wform_observation] [nvarchar](max) NULL,
	[wform_filename] [nvarchar](255) NULL,
	[wform_comments][nvarchar](max) NULL,
	[wform_datecollected] [datetime] NOT NULL,
 CONSTRAINT [PK_tblWellForm] PRIMARY KEY CLUSTERED 
(
	[wellform_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[tblWellForm] ADD  CONSTRAINT [DF_tblWellForm_wform_datecollected]  DEFAULT (getdate()) FOR [wform_datecollected]
GO

ALTER TABLE [dbo].[tblWellForm]  WITH CHECK ADD  CONSTRAINT [FK_tblWellForm_tblWellInfo] FOREIGN KEY([well_id])
REFERENCES [dbo].[tblWellinfo] ([well_id])
GO

ALTER TABLE [dbo].[tblWellForm] CHECK CONSTRAINT [FK_tblWellForm_tblWellInfo]
GO


