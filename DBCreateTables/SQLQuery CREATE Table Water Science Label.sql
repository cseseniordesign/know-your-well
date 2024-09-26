USE [kyw]
GO

/****** Object:  Table [dbo].[tblWaterScienceLab]    Script Date: 5/21/2024 4:47:08 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblWaterScienceLab](
	[watersciencelab_id] [int] IDENTITY(1,1) NOT NULL,
	[fieldactivity_id] [int] NOT NULL,
	[wsl_samplecode] [nvarchar](255) NULL,
	[wsl_ph] [decimal](8, 2) NOT NULL,
	[wsl_conductivity] [decimal](8, 0) NOT NULL,
	[wsl_calciumhardness] [decimal](8, 0) NULL,
	[wsl_no3no2n] [decimal](8, 4) NOT NULL,
	[wsl_nh4n] [decimal](8, 3)  NULL,
	[wsl_bromide] [decimal](8, 2) NULL,
	[wsl_chloride] [decimal](8, 2) NULL,
	[wsl_fluoride] [decimal](8, 3)  NULL,
	[wsl_orthophosphate] [decimal](8, 3) NULL,
	[wsl_sulfate] [decimal](8, 1) NULL,
	[wsl_arsenic] [decimal](8, 2) NULL,
	[wsl_chromium][decimal](8,2) NULL,
	[wsl_copper] [decimal](8, 2) NULL,
	[wsl_iron] [decimal](8, 2) NULL,
	[wsl_manganese] [decimal](8, 2) NULL,
	[wsl_selenium] [decimal](8, 2) NULL,
	[wsl_uranium] [decimal](8, 2) NULL,
	[wsl_zinc] [decimal](8, 2) NULL,
	[wsl_acetochlor][decimal](8,2) NULL,
	[wsl_alachlor][decimal](8,2) NULL,
	[wsl_atrazine][decimal](8,2) NULL,
	[wsl_butylate][decimal](8,2) NULL,
	[wsl_chlorothalonil][decimal](8,2) NULL,
	[wsl_cyanazine][decimal](8,2) NULL,
	[wsl_de_ethylatrazine][decimal](8,2) NULL,
	[wsl_de_isopropylatrazine][decimal](8,2) NULL,
	[wsl_dimethenamid][decimal](8,2) NULL,
	[wsl_EPTC][decimal](8,2) NULL,
	[wsl_metolachlor][decimal](8,2) NULL,
	[wsl_metribuzin][decimal](8,2) NULL,
	[wsl_norflurazon][decimal](8,2) NULL,
	[wsl_pendamethalin][decimal](8,2) NULL,
	[wsl_permethrin][decimal](8,2) NULL,
	[wsl_prometon][decimal](8,2) NULL,
	[wsl_propazine][decimal](8,2) NULL,
	[wsl_propachlor][decimal](8,2) NULL,
	[wsl_simazine][decimal](8,2) NULL,
	[wsl_teflurthrin][decimal](8,2) NULL,
	[wsl_trifluralin][decimal](8,4) NULL,
	[wsl_totalcoliform] [nvarchar](255) NULL,
	[wsl_ecoli] [nvarchar](255) NULL,
	[wsl_magnesium] [nvarchar](255) NULL,
	[wsl_comments] [nvarchar](max) NULL,
	[wsl_dateentered] [datetime] NOT NULL,
 CONSTRAINT [PK_tblWaterScienceLab] PRIMARY KEY CLUSTERED 
(
	[watersciencelab_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[tblWaterScienceLab] ADD  CONSTRAINT [DF_tblWaterScienceLab_wsl_dateentered]  DEFAULT (getdate()) FOR [wsl_dateentered]
GO

ALTER TABLE [dbo].[tblWaterScienceLab]  WITH CHECK ADD  CONSTRAINT [FK_tblWaterScienceLab_tblFieldActivity] FOREIGN KEY([fieldactivity_id])
REFERENCES [dbo].[tblFieldActivity] ([fieldactivity_id])
GO

ALTER TABLE [dbo].[tblWaterScienceLab] CHECK CONSTRAINT [FK_tblWaterScienceLab_tblFieldActivity]
GO
