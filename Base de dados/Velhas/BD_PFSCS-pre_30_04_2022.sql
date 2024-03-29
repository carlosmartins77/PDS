USE [master]
GO
/****** Object:  Database [PFSCS]    Script Date: 03/04/2022 14:30:47 ******/
CREATE DATABASE [PFSCS]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'PFSCS', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\PFSCS.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'PFSCS_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\PFSCS_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [PFSCS] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [PFSCS].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [PFSCS] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [PFSCS] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [PFSCS] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [PFSCS] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [PFSCS] SET ARITHABORT OFF 
GO
ALTER DATABASE [PFSCS] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [PFSCS] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [PFSCS] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [PFSCS] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [PFSCS] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [PFSCS] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [PFSCS] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [PFSCS] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [PFSCS] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [PFSCS] SET  ENABLE_BROKER 
GO
ALTER DATABASE [PFSCS] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [PFSCS] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [PFSCS] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [PFSCS] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [PFSCS] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [PFSCS] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [PFSCS] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [PFSCS] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [PFSCS] SET  MULTI_USER 
GO
ALTER DATABASE [PFSCS] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [PFSCS] SET DB_CHAINING OFF 
GO
ALTER DATABASE [PFSCS] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [PFSCS] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [PFSCS] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [PFSCS] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [PFSCS] SET QUERY_STORE = OFF
GO
USE [PFSCS]
GO
/****** Object:  Table [dbo].[AdminLoja]    Script Date: 03/04/2022 14:30:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AdminLoja](
	[idAdminLoja] [smallint] IDENTITY(1,1) NOT NULL,
	[utilizadorId] [smallint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idAdminLoja] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CarrinhoDeCompras]    Script Date: 03/04/2022 14:30:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarrinhoDeCompras](
	[idCarrinhoDeCompras] [smallint] IDENTITY(1,1) NOT NULL,
	[clienteId] [smallint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idCarrinhoDeCompras] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Categoria]    Script Date: 03/04/2022 14:30:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categoria](
	[idCategoria] [smallint] IDENTITY(1,1) NOT NULL,
	[nome] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idCategoria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CategoriaProduto]    Script Date: 03/04/2022 14:30:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CategoriaProduto](
	[idCategoriaProd] [smallint] IDENTITY(1,1) NOT NULL,
	[nome] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idCategoriaProd] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Checkout]    Script Date: 03/04/2022 14:30:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Checkout](
	[idCheckout] [smallint] IDENTITY(1,1) NOT NULL,
	[carrinhoId] [smallint] NOT NULL,
	[tipoPagamentoId] [smallint] NOT NULL,
	[dadosCheckoutId] [smallint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idCheckout] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cliente]    Script Date: 03/04/2022 14:30:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cliente](
	[idCliente] [smallint] IDENTITY(1,1) NOT NULL,
	[dataNascimento] [date] NOT NULL,
	[pais] [varchar](25) NOT NULL,
	[localizacao] [varchar](50) NOT NULL,
	[distanciaRaio] [int] NOT NULL,
	[utilizadorId] [smallint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idCliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DadosCheckout]    Script Date: 03/04/2022 14:30:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DadosCheckout](
	[idDadosCheckout] [smallint] IDENTITY(1,1) NOT NULL,
	[nome] [varchar](255) NOT NULL,
	[morada] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idDadosCheckout] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DocumentosEstafeta]    Script Date: 03/04/2022 14:30:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DocumentosEstafeta](
	[idDocEstafeta] [smallint] IDENTITY(1,1) NOT NULL,
	[fotoPerfil] [nvarchar](255) NOT NULL,
	[fotoCartaoCidadaoFrente] [nvarchar](255) NOT NULL,
	[fotoCartaoCidadaoVerso] [nvarchar](255) NOT NULL,
	[pdfRegistoCriminal] [nvarchar](255) NOT NULL,
	[estafetaId] [smallint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idDocEstafeta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DocumentosLoja]    Script Date: 03/04/2022 14:30:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DocumentosLoja](
	[idDocLoja] [smallint] IDENTITY(1,1) NOT NULL,
	[pdfExtratoAnoAnterior] [nvarchar](255) NOT NULL,
	[lojaId] [smallint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idDocLoja] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Encomenda]    Script Date: 03/04/2022 14:30:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Encomenda](
	[idEncomenda] [smallint] IDENTITY(1,1) NOT NULL,
	[numEncomenda] [int] NOT NULL,
	[dataEncomenda] [date] NOT NULL,
	[estado] [varchar](50) NOT NULL,
	[valorTotal] [int] NOT NULL,
	[lojaId] [smallint] NOT NULL,
	[clienteId] [smallint] NOT NULL,
	[estafetaId] [smallint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idEncomenda] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Estafeta]    Script Date: 03/04/2022 14:30:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Estafeta](
	[idEstafeta] [smallint] IDENTITY(1,1) NOT NULL,
	[estado] [smallint] NOT NULL,
	[aprovacao] [smallint] NULL,
	[utilizadorId] [smallint] NOT NULL,
	[deleted] [smallint] NULL,
 CONSTRAINT [PK__Estafeta__252A818D9E608691] PRIMARY KEY CLUSTERED 
(
	[idEstafeta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HistoricoDePagamentos]    Script Date: 03/04/2022 14:30:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HistoricoDePagamentos](
	[idHistoricoPagamentos] [smallint] IDENTITY(1,1) NOT NULL,
	[numeroEncomendasa] [int] NOT NULL,
	[clienteId] [smallint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idHistoricoPagamentos] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LinhaEncomenda]    Script Date: 03/04/2022 14:30:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LinhaEncomenda](
	[idLinhaEncomenda] [smallint] IDENTITY(1,1) NOT NULL,
	[encomendaId] [smallint] NOT NULL,
	[quantidade] [int] NULL,
	[produtoId] [smallint] NOT NULL,
 CONSTRAINT [PK__LinhaEnc__B0831184A9F1CA88] PRIMARY KEY CLUSTERED 
(
	[idLinhaEncomenda] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ListaMedalhas]    Script Date: 03/04/2022 14:30:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ListaMedalhas](
	[idMedalha] [smallint] IDENTITY(1,1) NOT NULL,
	[nomeMedalha] [varchar](50) NOT NULL,
	[descricao] [nvarchar](255) NOT NULL,
	[icon] [nvarchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idMedalha] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Loja]    Script Date: 03/04/2022 14:30:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Loja](
	[idLoja] [smallint] IDENTITY(1,1) NOT NULL,
	[morada] [varchar](50) NOT NULL,
	[nif] [int] NOT NULL,
	[adminlojaId] [smallint] NOT NULL,
	[aprovacao] [smallint] NULL,
	[categoriaId] [smallint] NOT NULL,
	[deleted] [smallint] NULL,
 CONSTRAINT [PK__Loja__E00D7763EDB6CEF1] PRIMARY KEY CLUSTERED 
(
	[idLoja] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MedalhasUtilizador]    Script Date: 03/04/2022 14:30:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MedalhasUtilizador](
	[idListaMedalha] [smallint] IDENTITY(1,1) NOT NULL,
	[medalhaId] [smallint] NOT NULL,
	[dataDesbloqueio] [date] NULL,
	[clienteId] [smallint] NOT NULL,
 CONSTRAINT [PK__ListaMed__21130EB68522C6B4] PRIMARY KEY CLUSTERED 
(
	[idListaMedalha] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Produto]    Script Date: 03/04/2022 14:30:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Produto](
	[idProduto] [smallint] IDENTITY(1,1) NOT NULL,
	[nomeProduto] [varchar](255) NOT NULL,
	[quantidade] [int] NOT NULL,
	[preco] [float] NOT NULL,
	[horaRecolhaMin] [date] NOT NULL,
	[horaRecolhaMax] [date] NOT NULL,
	[fotoProduto] [nvarchar](255) NOT NULL,
	[lojaId] [smallint] NOT NULL,
	[SubcategoriaProdId] [smallint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idProduto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SubCategoriaProduto]    Script Date: 03/04/2022 14:30:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubCategoriaProduto](
	[idSubcategoriaProd] [smallint] IDENTITY(1,1) NOT NULL,
	[nome] [varchar](255) NOT NULL,
	[categoria] [smallint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idSubcategoriaProd] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TipoPagamento]    Script Date: 03/04/2022 14:30:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoPagamento](
	[idTipoPagamento] [smallint] IDENTITY(1,1) NOT NULL,
	[nome] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idTipoPagamento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Utilizador]    Script Date: 03/04/2022 14:30:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Utilizador](
	[idUtilizador] [smallint] IDENTITY(1,1) NOT NULL,
	[password] [varchar](100) NOT NULL,
	[nome] [varchar](50) NOT NULL,
	[email] [varchar](50) NOT NULL,
	[contacto] [int] NOT NULL,
	[nif] [int] NOT NULL,
	[tipoPermissao] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idUtilizador] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[AdminLoja] ON 

INSERT [dbo].[AdminLoja] ([idAdminLoja], [utilizadorId]) VALUES (1, 2)
SET IDENTITY_INSERT [dbo].[AdminLoja] OFF
GO
SET IDENTITY_INSERT [dbo].[CarrinhoDeCompras] ON 

INSERT [dbo].[CarrinhoDeCompras] ([idCarrinhoDeCompras], [clienteId]) VALUES (1, 1)
SET IDENTITY_INSERT [dbo].[CarrinhoDeCompras] OFF
GO
SET IDENTITY_INSERT [dbo].[Categoria] ON 

INSERT [dbo].[Categoria] ([idCategoria], [nome]) VALUES (1, N'Pastelaria')
SET IDENTITY_INSERT [dbo].[Categoria] OFF
GO
SET IDENTITY_INSERT [dbo].[CategoriaProduto] ON 

INSERT [dbo].[CategoriaProduto] ([idCategoriaProd], [nome]) VALUES (1, N'Bebidas')
SET IDENTITY_INSERT [dbo].[CategoriaProduto] OFF
GO
SET IDENTITY_INSERT [dbo].[Checkout] ON 

INSERT [dbo].[Checkout] ([idCheckout], [carrinhoId], [tipoPagamentoId], [dadosCheckoutId]) VALUES (1, 1, 1, 1)
SET IDENTITY_INSERT [dbo].[Checkout] OFF
GO
SET IDENTITY_INSERT [dbo].[Cliente] ON 

INSERT [dbo].[Cliente] ([idCliente], [dataNascimento], [pais], [localizacao], [distanciaRaio], [utilizadorId]) VALUES (1, CAST(N'1993-04-14' AS Date), N'Portugal', N'Rua 24 junho, 4800-010', 600, 1)
SET IDENTITY_INSERT [dbo].[Cliente] OFF
GO
SET IDENTITY_INSERT [dbo].[DadosCheckout] ON 

INSERT [dbo].[DadosCheckout] ([idDadosCheckout], [nome], [morada]) VALUES (1, N'Compras realizadas', N'Rua 24 junho, 4705-010')
SET IDENTITY_INSERT [dbo].[DadosCheckout] OFF
GO
SET IDENTITY_INSERT [dbo].[DocumentosEstafeta] ON 

INSERT [dbo].[DocumentosEstafeta] ([idDocEstafeta], [fotoPerfil], [fotoCartaoCidadaoFrente], [fotoCartaoCidadaoVerso], [pdfRegistoCriminal], [estafetaId]) VALUES (1, N'fotoperfil.jpeg', N'ccFrente.jpeg', N'ccVerso.jpeg', N'RegistoCriminal.pdf', 1)
SET IDENTITY_INSERT [dbo].[DocumentosEstafeta] OFF
GO
SET IDENTITY_INSERT [dbo].[DocumentosLoja] ON 

INSERT [dbo].[DocumentosLoja] ([idDocLoja], [pdfExtratoAnoAnterior], [lojaId]) VALUES (1, N'docsCerficado.pdf', 1)
SET IDENTITY_INSERT [dbo].[DocumentosLoja] OFF
GO
SET IDENTITY_INSERT [dbo].[Encomenda] ON 

INSERT [dbo].[Encomenda] ([idEncomenda], [numEncomenda], [dataEncomenda], [estado], [valorTotal], [lojaId], [clienteId], [estafetaId]) VALUES (1, 1, CAST(N'2022-03-17' AS Date), N'Em processamento', 3, 1, 1, 1)
SET IDENTITY_INSERT [dbo].[Encomenda] OFF
GO
SET IDENTITY_INSERT [dbo].[Estafeta] ON 

INSERT [dbo].[Estafeta] ([idEstafeta], [estado], [aprovacao], [utilizadorId]) VALUES (1, 0, NULL, 3)
SET IDENTITY_INSERT [dbo].[Estafeta] OFF
GO
SET IDENTITY_INSERT [dbo].[HistoricoDePagamentos] ON 

INSERT [dbo].[HistoricoDePagamentos] ([idHistoricoPagamentos], [numeroEncomendasa], [clienteId]) VALUES (1, 7, 1)
SET IDENTITY_INSERT [dbo].[HistoricoDePagamentos] OFF
GO
SET IDENTITY_INSERT [dbo].[LinhaEncomenda] ON 

INSERT [dbo].[LinhaEncomenda] ([idLinhaEncomenda], [encomendaId], [quantidade], [produtoId]) VALUES (1, 1, NULL, 1)
SET IDENTITY_INSERT [dbo].[LinhaEncomenda] OFF
GO
SET IDENTITY_INSERT [dbo].[ListaMedalhas] ON 

INSERT [dbo].[ListaMedalhas] ([idMedalha], [nomeMedalha], [descricao], [icon]) VALUES (1, N'10 encomendas atingidas', N'Possui esta medalha quando atingir 10 encomendas realizadas', N'icon10.jpeg')
INSERT [dbo].[ListaMedalhas] ([idMedalha], [nomeMedalha], [descricao], [icon]) VALUES (2, N'20 encomendas atingidas', N'Possui esta medalha quando atingir 20 encomendas realizadas', N'icon20.jpeg')
INSERT [dbo].[ListaMedalhas] ([idMedalha], [nomeMedalha], [descricao], [icon]) VALUES (3, N'30 encomendas atingidas', N'Possui esta medalha quando atingir 30 encomendas realizadas', N'icon30.jpeg')
INSERT [dbo].[ListaMedalhas] ([idMedalha], [nomeMedalha], [descricao], [icon]) VALUES (4, N'40 encomendas atingidas', N'Possui esta medalha quando atingir 40 encomendas realizadas', N'icon40.jpeg')
INSERT [dbo].[ListaMedalhas] ([idMedalha], [nomeMedalha], [descricao], [icon]) VALUES (5, N'50 encomendas atingidas', N'Possui esta medalha quando atingir 50 encomendas realizadas', N'icon50.jpeg')
SET IDENTITY_INSERT [dbo].[ListaMedalhas] OFF
GO
SET IDENTITY_INSERT [dbo].[Loja] ON 

INSERT [dbo].[Loja] ([idLoja], [morada], [nif], [adminlojaId], [aprovacao], [categoriaId]) VALUES (1, N'Rua Aleixo Ferreira 4705-022', 557390222, 1, NULL, 1)
INSERT [dbo].[Loja] ([idLoja], [morada], [nif], [adminlojaId], [aprovacao], [categoriaId]) VALUES (2, N'Rua José Pereira 4201-200', 246565422, 1, NULL, 1)
SET IDENTITY_INSERT [dbo].[Loja] OFF
GO
SET IDENTITY_INSERT [dbo].[MedalhasUtilizador] ON 

INSERT [dbo].[MedalhasUtilizador] ([idListaMedalha], [medalhaId], [dataDesbloqueio], [clienteId]) VALUES (1, 1, NULL, 1)
SET IDENTITY_INSERT [dbo].[MedalhasUtilizador] OFF
GO
SET IDENTITY_INSERT [dbo].[Produto] ON 

INSERT [dbo].[Produto] ([idProduto], [nomeProduto], [quantidade], [preco], [horaRecolhaMin], [horaRecolhaMax], [fotoProduto], [lojaId], [SubcategoriaProdId]) VALUES (1, N'Coca-Cola', 2, 0.9, CAST(N'2022-03-18' AS Date), CAST(N'2022-03-20' AS Date), N'fotoProduto.jpeg', 1, 1)
INSERT [dbo].[Produto] ([idProduto], [nomeProduto], [quantidade], [preco], [horaRecolhaMin], [horaRecolhaMax], [fotoProduto], [lojaId], [SubcategoriaProdId]) VALUES (2, N'bolos', 3, 23.99, CAST(N'2021-10-09' AS Date), CAST(N'2021-10-09' AS Date), N'/imagem/133.png', 1, 1)
INSERT [dbo].[Produto] ([idProduto], [nomeProduto], [quantidade], [preco], [horaRecolhaMin], [horaRecolhaMax], [fotoProduto], [lojaId], [SubcategoriaProdId]) VALUES (3, N'bolos', 3, 23.99, CAST(N'2021-10-09' AS Date), CAST(N'2021-10-09' AS Date), N'/imagem/133.png', 1, 1)
INSERT [dbo].[Produto] ([idProduto], [nomeProduto], [quantidade], [preco], [horaRecolhaMin], [horaRecolhaMax], [fotoProduto], [lojaId], [SubcategoriaProdId]) VALUES (8, N'bolas', 3, 23.99, CAST(N'2021-10-09' AS Date), CAST(N'2021-10-09' AS Date), N'/imagem/133.png', 1, 1)
INSERT [dbo].[Produto] ([idProduto], [nomeProduto], [quantidade], [preco], [horaRecolhaMin], [horaRecolhaMax], [fotoProduto], [lojaId], [SubcategoriaProdId]) VALUES (9, N'bolas', 3, 23.99, CAST(N'2021-10-09' AS Date), CAST(N'2021-10-09' AS Date), N'/imagem/133.png', 1, 1)
INSERT [dbo].[Produto] ([idProduto], [nomeProduto], [quantidade], [preco], [horaRecolhaMin], [horaRecolhaMax], [fotoProduto], [lojaId], [SubcategoriaProdId]) VALUES (10, N'bolos', 3, 23.99, CAST(N'2021-10-09' AS Date), CAST(N'2021-10-09' AS Date), N'/imagem/133.png', 1, 1)
INSERT [dbo].[Produto] ([idProduto], [nomeProduto], [quantidade], [preco], [horaRecolhaMin], [horaRecolhaMax], [fotoProduto], [lojaId], [SubcategoriaProdId]) VALUES (11, N'bolos', 3, 23.99, CAST(N'2021-10-09' AS Date), CAST(N'2021-10-09' AS Date), N'/imagem/133.png', 1, 1)
INSERT [dbo].[Produto] ([idProduto], [nomeProduto], [quantidade], [preco], [horaRecolhaMin], [horaRecolhaMax], [fotoProduto], [lojaId], [SubcategoriaProdId]) VALUES (12, N'bolos', 3, 23.99, CAST(N'2021-10-09' AS Date), CAST(N'2021-10-09' AS Date), N'/imagem/133.png', 1, 1)
INSERT [dbo].[Produto] ([idProduto], [nomeProduto], [quantidade], [preco], [horaRecolhaMin], [horaRecolhaMax], [fotoProduto], [lojaId], [SubcategoriaProdId]) VALUES (13, N'bolos', 3, 23.99, CAST(N'2021-10-09' AS Date), CAST(N'2021-10-09' AS Date), N'/imagem/133.png', 1, 1)
SET IDENTITY_INSERT [dbo].[Produto] OFF
GO
SET IDENTITY_INSERT [dbo].[SubCategoriaProduto] ON 

INSERT [dbo].[SubCategoriaProduto] ([idSubcategoriaProd], [nome], [categoria]) VALUES (1, N'Refrigerante', 1)
SET IDENTITY_INSERT [dbo].[SubCategoriaProduto] OFF
GO
SET IDENTITY_INSERT [dbo].[TipoPagamento] ON 

INSERT [dbo].[TipoPagamento] ([idTipoPagamento], [nome]) VALUES (1, N'Multibanco')
SET IDENTITY_INSERT [dbo].[TipoPagamento] OFF
GO
SET IDENTITY_INSERT [dbo].[Utilizador] ON 

INSERT [dbo].[Utilizador] ([idUtilizador], [password], [nome], [email], [contacto], [nif], [tipoPermissao]) VALUES (1, N'PFS2000', N'João Fernandes', N'joao.fernandes@codesolutions.pt', 253900900, 159560876, 1)
INSERT [dbo].[Utilizador] ([idUtilizador], [password], [nome], [email], [contacto], [nif], [tipoPermissao]) VALUES (2, N'pastelaria1774', N'Silva', N'silva.pastelaria@outlook.com', 253340506, 560394958, 2)
INSERT [dbo].[Utilizador] ([idUtilizador], [password], [nome], [email], [contacto], [nif], [tipoPermissao]) VALUES (3, N'aristeu_900', N'Aristeu Pereira', N'aristeu.pereira@gmail.com', 919999999, 170876465, 3)
INSERT [dbo].[Utilizador] ([idUtilizador], [password], [nome], [email], [contacto], [nif], [tipoPermissao]) VALUES (4, N'$2b$10$tueUe3aB8kL9tsH8mWLXPuHfFmh1FfucvboAJSpRhCEKD4IiCs5Ki', N'Carlos', N'carlosmartins@codesolutions.pt', 910000000, 123456789, 1)
INSERT [dbo].[Utilizador] ([idUtilizador], [password], [nome], [email], [contacto], [nif], [tipoPermissao]) VALUES (6, N'$2b$10$iL7husnK6ldTEyjl.piz7OBS8TMc8h.cly3xB.PwMKjSEQNafP3X.', N'joao XD', N'joao.ola@codesolutions.pt', 253900900, 159560876, 1)
INSERT [dbo].[Utilizador] ([idUtilizador], [password], [nome], [email], [contacto], [nif], [tipoPermissao]) VALUES (9, N'$2b$10$G7R2uS5VoCX6EbPGoW9ROOYAEfnWwWUXiX0RmsHhCH5jdtCqg8Fae', N'Simao', N'antoniooliveira@codesolutions.pt', 910000000, 123456789, 1)
SET IDENTITY_INSERT [dbo].[Utilizador] OFF
GO
ALTER TABLE [dbo].[AdminLoja]  WITH CHECK ADD  CONSTRAINT [FK_AdminLoja_Utilizador] FOREIGN KEY([utilizadorId])
REFERENCES [dbo].[Utilizador] ([idUtilizador])
GO
ALTER TABLE [dbo].[AdminLoja] CHECK CONSTRAINT [FK_AdminLoja_Utilizador]
GO
ALTER TABLE [dbo].[CarrinhoDeCompras]  WITH CHECK ADD  CONSTRAINT [FK_CarrinhoDeCompras_Cliente] FOREIGN KEY([clienteId])
REFERENCES [dbo].[Cliente] ([idCliente])
GO
ALTER TABLE [dbo].[CarrinhoDeCompras] CHECK CONSTRAINT [FK_CarrinhoDeCompras_Cliente]
GO
ALTER TABLE [dbo].[Checkout]  WITH CHECK ADD  CONSTRAINT [FK_Checkout_CarrinhoDeCompras] FOREIGN KEY([carrinhoId])
REFERENCES [dbo].[CarrinhoDeCompras] ([idCarrinhoDeCompras])
GO
ALTER TABLE [dbo].[Checkout] CHECK CONSTRAINT [FK_Checkout_CarrinhoDeCompras]
GO
ALTER TABLE [dbo].[Checkout]  WITH CHECK ADD  CONSTRAINT [FK_Checkout_DadosCheckout] FOREIGN KEY([dadosCheckoutId])
REFERENCES [dbo].[DadosCheckout] ([idDadosCheckout])
GO
ALTER TABLE [dbo].[Checkout] CHECK CONSTRAINT [FK_Checkout_DadosCheckout]
GO
ALTER TABLE [dbo].[Checkout]  WITH CHECK ADD  CONSTRAINT [FK_Checkout_TipoPagamento] FOREIGN KEY([tipoPagamentoId])
REFERENCES [dbo].[TipoPagamento] ([idTipoPagamento])
GO
ALTER TABLE [dbo].[Checkout] CHECK CONSTRAINT [FK_Checkout_TipoPagamento]
GO
ALTER TABLE [dbo].[Cliente]  WITH CHECK ADD  CONSTRAINT [FK_Cliente_Utilizador] FOREIGN KEY([utilizadorId])
REFERENCES [dbo].[Utilizador] ([idUtilizador])
GO
ALTER TABLE [dbo].[Cliente] CHECK CONSTRAINT [FK_Cliente_Utilizador]
GO
ALTER TABLE [dbo].[DocumentosEstafeta]  WITH CHECK ADD  CONSTRAINT [FK_DocumentosEstafeta_Estafeta] FOREIGN KEY([estafetaId])
REFERENCES [dbo].[Estafeta] ([idEstafeta])
GO
ALTER TABLE [dbo].[DocumentosEstafeta] CHECK CONSTRAINT [FK_DocumentosEstafeta_Estafeta]
GO
ALTER TABLE [dbo].[DocumentosLoja]  WITH CHECK ADD  CONSTRAINT [FK_DocumentosLoja_Loja] FOREIGN KEY([lojaId])
REFERENCES [dbo].[Loja] ([idLoja])
GO
ALTER TABLE [dbo].[DocumentosLoja] CHECK CONSTRAINT [FK_DocumentosLoja_Loja]
GO
ALTER TABLE [dbo].[Encomenda]  WITH CHECK ADD  CONSTRAINT [FK_Encomenda_Cliente] FOREIGN KEY([clienteId])
REFERENCES [dbo].[Cliente] ([idCliente])
GO
ALTER TABLE [dbo].[Encomenda] CHECK CONSTRAINT [FK_Encomenda_Cliente]
GO
ALTER TABLE [dbo].[Encomenda]  WITH CHECK ADD  CONSTRAINT [FK_Encomenda_Estafeta] FOREIGN KEY([estafetaId])
REFERENCES [dbo].[Estafeta] ([idEstafeta])
GO
ALTER TABLE [dbo].[Encomenda] CHECK CONSTRAINT [FK_Encomenda_Estafeta]
GO
ALTER TABLE [dbo].[Encomenda]  WITH CHECK ADD  CONSTRAINT [FK_Encomenda_Loja] FOREIGN KEY([lojaId])
REFERENCES [dbo].[Loja] ([idLoja])
GO
ALTER TABLE [dbo].[Encomenda] CHECK CONSTRAINT [FK_Encomenda_Loja]
GO
ALTER TABLE [dbo].[HistoricoDePagamentos]  WITH CHECK ADD  CONSTRAINT [FK_HistoricoDePagamentosCliente_Cliente] FOREIGN KEY([clienteId])
REFERENCES [dbo].[Cliente] ([idCliente])
GO
ALTER TABLE [dbo].[HistoricoDePagamentos] CHECK CONSTRAINT [FK_HistoricoDePagamentosCliente_Cliente]
GO
ALTER TABLE [dbo].[LinhaEncomenda]  WITH CHECK ADD  CONSTRAINT [FK_Encomenda_Produto] FOREIGN KEY([produtoId])
REFERENCES [dbo].[Produto] ([idProduto])
GO
ALTER TABLE [dbo].[LinhaEncomenda] CHECK CONSTRAINT [FK_Encomenda_Produto]
GO
ALTER TABLE [dbo].[LinhaEncomenda]  WITH CHECK ADD  CONSTRAINT [FK_LinhaEncomenda_Encomenda] FOREIGN KEY([encomendaId])
REFERENCES [dbo].[Encomenda] ([idEncomenda])
GO
ALTER TABLE [dbo].[LinhaEncomenda] CHECK CONSTRAINT [FK_LinhaEncomenda_Encomenda]
GO
ALTER TABLE [dbo].[MedalhasUtilizador]  WITH CHECK ADD  CONSTRAINT [FK_ListaMedalhas_Cliente] FOREIGN KEY([clienteId])
REFERENCES [dbo].[Cliente] ([idCliente])
GO
ALTER TABLE [dbo].[MedalhasUtilizador] CHECK CONSTRAINT [FK_ListaMedalhas_Cliente]
GO
ALTER TABLE [dbo].[MedalhasUtilizador]  WITH CHECK ADD  CONSTRAINT [FK_ListaMedalhas_Medalhas] FOREIGN KEY([medalhaId])
REFERENCES [dbo].[ListaMedalhas] ([idMedalha])
GO
ALTER TABLE [dbo].[MedalhasUtilizador] CHECK CONSTRAINT [FK_ListaMedalhas_Medalhas]
GO
ALTER TABLE [dbo].[Produto]  WITH CHECK ADD  CONSTRAINT [FK_Produto_Loja] FOREIGN KEY([lojaId])
REFERENCES [dbo].[Loja] ([idLoja])
GO
ALTER TABLE [dbo].[Produto] CHECK CONSTRAINT [FK_Produto_Loja]
GO
ALTER TABLE [dbo].[Produto]  WITH CHECK ADD  CONSTRAINT [FK_Produto_SubCategoriaProduto] FOREIGN KEY([SubcategoriaProdId])
REFERENCES [dbo].[SubCategoriaProduto] ([idSubcategoriaProd])
GO
ALTER TABLE [dbo].[Produto] CHECK CONSTRAINT [FK_Produto_SubCategoriaProduto]
GO
ALTER TABLE [dbo].[SubCategoriaProduto]  WITH CHECK ADD  CONSTRAINT [FK_SubCategoriaProduto_CategoriaProduto] FOREIGN KEY([categoria])
REFERENCES [dbo].[CategoriaProduto] ([idCategoriaProd])
GO
ALTER TABLE [dbo].[SubCategoriaProduto] CHECK CONSTRAINT [FK_SubCategoriaProduto_CategoriaProduto]
GO
USE [master]
GO
ALTER DATABASE [PFSCS] SET  READ_WRITE 
GO
