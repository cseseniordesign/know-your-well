USE [kyw]
GO

/****** Object:  Table [dbo].[tblTooltip]    Script Date: 10/17/2024 2:01:43 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblTooltip](
	[prompt_id] [nvarchar](255) NOT NULL,
	[text] [nvarchar](max) NULL,
	[active] [bit] NOT NULL,
	[comments] [nvarchar](max) NULL,
	[databaseentered][datetime] NOT NULL,

 CONSTRAINT [PK_tblTooltip] PRIMARY KEY CLUSTERED 
(
	[prompt_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[tblTooltip] ADD  CONSTRAINT [DF_tblTooltip_databaseentered]  DEFAULT (getdate()) FOR [databaseentered]
GO
