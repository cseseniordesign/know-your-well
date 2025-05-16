/****** Object:  Table [dbo].[tblTooltipImage]    Script Date: 5/5/2025 1:42:52 PM ******/
use [kyw]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblTooltipImage](
	[image_id] [int] IDENTITY(1,1) NOT NULL,
	[prompt_id] [nvarchar](255) NOT NULL,
	[im_filename] [nvarchar](255) NULL,
	[comments] [nvarchar](max) NULL,
	[active] [bit] NOT NULL,
	[databaseentered] [datetime] NOT NULL,
 CONSTRAINT [PK_tblTooltipImage] PRIMARY KEY CLUSTERED 
(
	[image_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[tblTooltipImage] ADD  CONSTRAINT [DF_tblTooltipImage_databaseentered]  DEFAULT (getdate()) FOR [databaseentered]
GO

ALTER TABLE [dbo].[tblTooltipImage]  WITH CHECK ADD  CONSTRAINT [FK_tblTooltipImage_tblTooltip] FOREIGN KEY([prompt_id])
REFERENCES [dbo].[tblTooltip] ([prompt_id])
GO

ALTER TABLE [dbo].[tblTooltipImage] CHECK CONSTRAINT [FK_tblTooltipImage_tblTooltip]
GO

