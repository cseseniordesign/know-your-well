USE [kyw]
GO

/****** Object:  Table [dbo].[tblWaterScienceLab]    Script Date: 9/16/2022 10:42:45 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DROP TABLE IF EXISTS [dbo].[tblWaterScienceLab]

CREATE TABLE [dbo].[tblWaterScienceLab](
	[watersciencelab_id] [int] NOT NULL IDENTITY(1, 1),
	[fieldactivity_id][int] NOT NULL,
	[wsl_samplecode] [nvarchar](255) NOT NULL,
	[wsl_nh4n][decimal](8,2) NOT NULL,
	[wsl_no3no2n][decimal](8,2) NOT NULL,
	[wsl_conductivity][decimal](8,2) NOT NULL,
	[wsl_ph][decimal](8,2) NOT NULL,
	[wsl_pesticides] [nvarchar](255) NULL,	
	[wsl_chloride][decimal](8,2) NOT NULL,
	[wsl_orthophosphate][decimal](8,2) NOT NULL,
	[wsl_sulfate][decimal](8,2) NOT NULL,
	[wsl_bromide][decimal](8,2) NOT NULL,
	[wsl_fluoride][decimal](8,2) NOT NULL,
	[wsl_copper][decimal](8,2) NOT NULL,
	[wsl_iron][decimal](8,2) NOT NULL,
	[wsl_manganese][decimal](8,2) NOT NULL,
	[wsl_uranium][decimal](8,2) NOT NULL,
	[wsl_arsenic][decimal](8,2) NOT NULL,
	[wsl_hardness][decimal](8,2) NOT NULL,
	[wsl_calcium][decimal](8,2) NOT NULL,
	[wsl_magnesium] [nvarchar](255) NOT NULL,
	[wsl_totalcoliform] [nvarchar](255) NOT NULL,
	[wsl_ecoli] [nvarchar](255) NOT NULL,
	[wsl_comments][nvarchar](max) NULL,
	[wsl_dateentered] [datetime] NOT NULL,
 CONSTRAINT [PK_tblWaterScienceLab] PRIMARY KEY CLUSTERED 
(
	[watersciencelab_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[tblWaterScienceLab] ADD  CONSTRAINT [DF_tblWaterScienceLab_wsl_dateentered]  DEFAULT (getdate()) FOR [wsl_dateentered]
GO

ALTER TABLE [dbo].[tblWaterScienceLab]  WITH CHECK ADD  CONSTRAINT [FK_tblWaterScienceLab_tblFieldActivity] FOREIGN KEY([fieldactivity_id])
REFERENCES [dbo].[tblFieldActivity] ([fieldactivity_id])
GO

ALTER TABLE [dbo].[tblWaterScienceLab] CHECK CONSTRAINT [FK_tblWaterScienceLab_tblFieldActivity]
GO




