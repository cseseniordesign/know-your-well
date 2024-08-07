USE [kyw]
GO

/****** Object:  Table [dbo].[tblImage]    Script Date: 5/21/2024 4:48:36 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblImage](
	[image_id] [int] IDENTITY(1,1) NOT NULL,
	[well_id] [int] NOT NULL,
	[im_type] [nvarchar](100) NOT NULL,
	[im_latitude] [decimal](10, 5) NOT NULL,
	[im_longitude] [decimal](10, 5) NOT NULL,
	[im_genlatitude] [decimal](10, 3) NOT NULL,
	[im_genlongitude] [decimal](10, 3) NOT NULL,
	[im_datacollector] [nvarchar](255) NULL,
	[im_observation] [nvarchar](max) NULL,
	[im_filename] [nvarchar](255) NULL,
	[im_comments] [nvarchar](max) NULL,
	[im_datecollected] [datetime] NOT NULL,	
	[im_dateentered][datetime] NOT NULL,

 CONSTRAINT [PK_tblImage] PRIMARY KEY CLUSTERED 
(
	[image_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[tblImage] ADD  CONSTRAINT [DF_tblImage_im_datecollected]  DEFAULT (getdate()) FOR [im_datecollected]
GO

ALTER TABLE [dbo].[tblImage] ADD  CONSTRAINT [DF_tblImage_im_dateentered]  DEFAULT (getdate()) FOR [im_dateentered]
GO


ALTER TABLE [dbo].[tblImage]  WITH CHECK ADD  CONSTRAINT [FK_tblImage_tblWellInfo] FOREIGN KEY([well_id])
REFERENCES [dbo].[tblWellInfo] ([well_id])
GO

ALTER TABLE [dbo].[tblImage] CHECK CONSTRAINT [FK_tblImage_tblWellInfo]
GO


