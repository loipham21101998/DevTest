USE [StaffManagement]
GO
/****** Object:  Table [dbo].[Staff]    Script Date: 9/14/2023 8:16:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Staff](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [nvarchar](250) NULL,
	[ShortName] [nvarchar](250) NULL,
 CONSTRAINT [PK_Staff] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StaffInTask]    Script Date: 9/14/2023 8:16:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StaffInTask](
	[Id] [int] NOT NULL,
	[StaffId] [int] NOT NULL,
	[TaskId] [int] NOT NULL,
 CONSTRAINT [PK_StaffInTask] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Task]    Script Date: 9/14/2023 8:16:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Task](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ParentId] [int] NULL,
	[Label] [nchar](100) NULL,
	[Type] [int] NULL,
	[Name] [nvarchar](250) NULL,
	[StartDate] [date] NULL,
	[EndDate] [date] NULL,
	[Duration] [int] NULL,
	[Progress] [nchar](10) NULL,
	[IsUnscheduled] [bit] NULL,
 CONSTRAINT [PK_Task] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Staff] ON 

INSERT [dbo].[Staff] ([Id], [FullName], [ShortName]) VALUES (1, N'Pham Huu Loi', N'LoiPham')
INSERT [dbo].[Staff] ([Id], [FullName], [ShortName]) VALUES (2, N'Pham Huu Loi', N'LoiPham')
INSERT [dbo].[Staff] ([Id], [FullName], [ShortName]) VALUES (3, N'Loi', N'Pham')
INSERT [dbo].[Staff] ([Id], [FullName], [ShortName]) VALUES (4, N'Loi1', N'Pham1')
INSERT [dbo].[Staff] ([Id], [FullName], [ShortName]) VALUES (8, N'Loi123', N'Pham123')
INSERT [dbo].[Staff] ([Id], [FullName], [ShortName]) VALUES (9, N'Pham Huu Loi 888', N'LoiPham888')
SET IDENTITY_INSERT [dbo].[Staff] OFF
GO
SET IDENTITY_INSERT [dbo].[Task] ON 

INSERT [dbo].[Task] ([Id], [ParentId], [Label], [Type], [Name], [StartDate], [EndDate], [Duration], [Progress], [IsUnscheduled]) VALUES (2, 1, N'Task #1                                                                                             ', 1, N'Task #1', CAST(N'2023-09-13' AS Date), CAST(N'2023-09-21' AS Date), 3, N'0.2       ', 1)
INSERT [dbo].[Task] ([Id], [ParentId], [Label], [Type], [Name], [StartDate], [EndDate], [Duration], [Progress], [IsUnscheduled]) VALUES (4, 1, N'Task1                                                                                               ', 1, N'Task1', CAST(N'2023-09-13' AS Date), CAST(N'2023-09-13' AS Date), 2, N'0.5       ', 1)
INSERT [dbo].[Task] ([Id], [ParentId], [Label], [Type], [Name], [StartDate], [EndDate], [Duration], [Progress], [IsUnscheduled]) VALUES (5, 4, N'Task2                                                                                               ', 1, N'Task2', CAST(N'2023-09-14' AS Date), CAST(N'2023-09-14' AS Date), 2, N'0.7       ', 1)
INSERT [dbo].[Task] ([Id], [ParentId], [Label], [Type], [Name], [StartDate], [EndDate], [Duration], [Progress], [IsUnscheduled]) VALUES (6, 1, N'Task1                                                                                               ', 2, N'Task1', CAST(N'2023-09-12' AS Date), CAST(N'2023-09-14' AS Date), 2, N'0.7       ', 1)
INSERT [dbo].[Task] ([Id], [ParentId], [Label], [Type], [Name], [StartDate], [EndDate], [Duration], [Progress], [IsUnscheduled]) VALUES (8, 2, N'Task110                                                                                             ', 1, N'Task110', CAST(N'2023-09-14' AS Date), CAST(N'2023-09-20' AS Date), 2, N'0.5       ', 0)
SET IDENTITY_INSERT [dbo].[Task] OFF
GO
ALTER TABLE [dbo].[StaffInTask]  WITH CHECK ADD FOREIGN KEY([StaffId])
REFERENCES [dbo].[Staff] ([Id])
GO
ALTER TABLE [dbo].[StaffInTask]  WITH CHECK ADD FOREIGN KEY([TaskId])
REFERENCES [dbo].[Task] ([Id])
GO
