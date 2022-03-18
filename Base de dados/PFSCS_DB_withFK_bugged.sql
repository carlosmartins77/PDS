USE [master]
GO

CREATE DATABASE [PFSCS]
GO
USE [PFSCS]
GO
/*******************************Table [dbo].[Entidade] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Entidade](
	[EntidadeID] [smallint] NOT NULL,
	[Password] [varchar](50) NOT NULL,
	[Nome] [varchar](50) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[Contacto] [int] NOT NULL,
 CONSTRAINT [PK_Entidade] PRIMARY KEY CLUSTERED 
(
	[EntidadeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/******************************* Table [dbo].[Cliente] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cliente](
	[ClienteID] [smallint] NOT NULL,
	[DataNascimento] [DATE] NOT NULL,
	[Pais] [varchar](25) NOT NULL,
	[Localizacao] [varchar](50) NOT NULL,
	[EntidadeID] [smallint] NOT NULL,
 CONSTRAINT [PK_Cliente] PRIMARY KEY CLUSTERED 
(
	[ClienteID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/******************************* Table [dbo].[HistoricoDePagamentosCliente] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HistoricoDePagamentosCliente](
	[HistoricoID] [smallint] NOT NULL,
	[NumEncomendasCliente] [int] NOT NULL,
	[ClienteID] [smallint] NOT NULL,
 CONSTRAINT [PK_HistoricoDePagamentosCliente] PRIMARY KEY CLUSTERED 
(
	[HistoricoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/******************************* Table [dbo].[Medalhas] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Medalhas](
	[MedalhaID] [smallint] NOT NULL,
	[NomeMedalha] [varchar](50) NOT NULL,
	[Descricao] [nvarchar] (255) NOT NULL,
	[DataDesbloqueio] [DATE] NOT NULL,
	[Icon] [nvarchar] (255) NOT NULL,
 CONSTRAINT [PK_Medalhas] PRIMARY KEY CLUSTERED 
(
	[MedalhaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/******************************* Table [dbo].[ListaMedalhas] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ListaMedalhas](
	[ListaMedalhaID] [smallint] NOT NULL,
	[MedalhaID] [smallint] NOT NULL,
	[ClienteID] [smallint] NOT NULL,	
 CONSTRAINT [PK_ListaMedalhas] PRIMARY KEY CLUSTERED 
(
	[ListaMedalhaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/******************************* Table [dbo].[AdminLoja] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AdminLoja](
	[AdminLojaID] [smallint] NOT NULL,
	[EntidadeID] [smallint] NOT NULL,
 CONSTRAINT [PK_AdminLoja] PRIMARY KEY CLUSTERED 
(
	[AdminLojaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/******************************* Table [dbo].[Categoria] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categoria](
	[CategoriaID] [smallint] NOT NULL,
	[NomeCategoria] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Categoria] PRIMARY KEY CLUSTERED 
(
	[CategoriaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/******************************* Table [dbo].[Loja] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Loja](
	[LojaID] [smallint] NOT NULL,
	[Morada] [varchar](50) NOT NULL,
	[NIF] [int] NOT NULL,
	[AdminLojaID] [smallint] NOT NULL,
	[CategoriaID] [smallint] NOT NULL,
 CONSTRAINT [PK_Loja] PRIMARY KEY CLUSTERED 
(
	[LojaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/******************************* Table [dbo].[DocumentosLoja] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DocumentosLoja](
	[DocLojaID] [smallint] NOT NULL,
	[PDFExtratoAnoAnterior] [nvarchar](255) NOT NULL,
	[LojaID] [smallint] NOT NULL,
 CONSTRAINT [PK_DocumentosLoja] PRIMARY KEY CLUSTERED 
(
	[DocLojaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/******************************* Table [dbo].[CategoriaProduto] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CategoriaProduto](
	[CategoriaProdID] [smallint] NOT NULL,
	[NomeCatProd] [varchar](255) NOT NULL,
 CONSTRAINT [PK_CategoriaProduto] PRIMARY KEY CLUSTERED 
(
	[CategoriaProdID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/******************************* Table [dbo].[SubCategoriaProduto] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubCategoriaProduto](
	[SubCatProdID] [smallint] NOT NULL,
	[NomeSubProd] [varchar](255) NOT NULL,
	[CategoriaProdID] [smallint] NOT NULL,
 CONSTRAINT [PK_SubCategoriaProduto] PRIMARY KEY CLUSTERED 
(
	[SubCatProdID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/******************************* Table [dbo].[Produto] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Produto](
	[ProdutoID] [smallint] NOT NULL,
	[NomeProduto] [varchar](255) NOT NULL,
	[Quantidade] [int] NOT NULL,
	[Preco] [float] NOT NULL,
	[FotoProduto] [nvarchar] (255) NOT NULL,
	[LojaID] [smallint] NOT NULL,
	[SubCatProdID] [smallint] NOT NULL, 
 CONSTRAINT [PK_Produto] PRIMARY KEY CLUSTERED 
(
	[ProdutoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/******************************* Table [dbo].[Estafeta] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Estafeta](
	[EstafetaID] [smallint] NOT NULL,
	[Estado] [varchar](50) NOT NULL,
	[EntidadeID] [smallint] NOT NULL,
 CONSTRAINT [PK_Estafeta] PRIMARY KEY CLUSTERED 
(
	[EstafetaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/******************************* Table [dbo].[DocumentosEstafeta] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DocumentosEstafeta](
	[DocEstafetaID] [smallint] NOT NULL,
	[Fotoperfil] [nvarchar](255) NOT NULL,
	[FotoCartaoCidadaoFrente] [nvarchar](255) NOT NULL,
	[FotoCartaoCidadaoVerso] [nvarchar](255) NOT NULL,
	[PDFRegistoCriminal] [nvarchar](255) NOT NULL,
	[EstafetaID] [smallint] NOT NULL,
 CONSTRAINT [PK_DocumentoEstafeta ] PRIMARY KEY CLUSTERED 
(
	[DocEstafetaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/******************************* Table [dbo].[Encomenda] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Encomenda](
	[EncomendaID] [smallint] NOT NULL,
	[NumEncomenda] [int] NOT NULL,
	[DataEncomenda] [DATE] NOT NULL,
	[Estado] [varchar] (50) NOT NULL,
	[ValorTotal] [int] NOT NULL,
	[LojaID] [smallint] NOT NULL,
	[ClienteID] [smallint] NOT NULL,
	[EstafetaID] [smallint] NOT NULL,
 CONSTRAINT [PK_Encomenda] PRIMARY KEY CLUSTERED 
(
	[EncomendaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/******************************* Table [dbo].[LinhaEncomenda] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LinhaEncomenda](
	[LinhaEncomendaID] [smallint] NOT NULL,
	[EncomendaID] [smallint] NOT NULL,
	[ProdutoID] [smallint] NOT NULL,
 CONSTRAINT [PK_LinhaEncomenda] PRIMARY KEY CLUSTERED 
(
	[LinhaEncomendaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/******************************* Table [dbo].[CarrinhoDeCompras] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarrinhoDeCompras](
	[CarrinhoID] [smallint] NOT NULL,
	[ClienteID] [smallint] NOT NULL,
 CONSTRAINT [PK_CarrinhoDeCompras] PRIMARY KEY CLUSTERED 
(
	[CarrinhoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/******************************* Table [dbo].[DadosCheckout] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DadosCheckout](
	[DadosID] [smallint] NOT NULL,
	[NomeDados] [varchar](255) NOT NULL,
	[Morada] [varchar](255) NOT NULL,
 CONSTRAINT [PK_DadosCheckout] PRIMARY KEY CLUSTERED 
(
	[DadosID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/******************************* Table [dbo].[TipoPagamento] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoPagamento](
	[PagamentoID] [smallint] NOT NULL,
	[NomePagamento] [varchar](255) NOT NULL,
 CONSTRAINT [PK_TipoPagamento] PRIMARY KEY CLUSTERED 
(
	[PagamentoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/******************************* Table [dbo].[Checkout] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Checkout](
	[CheckoutID] [smallint] NOT NULL,
	[CarrinhoID] [smallint] NOT NULL,
	[PagamentoID] [smallint] NOT NULL,
	[DadosID] [smallint] NOT NULL,
 CONSTRAINT [PK_Checkout] PRIMARY KEY CLUSTERED 
(
	[CheckoutID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

/******************************* Inserts [dbo].[Entidade] *******************************/
GO
INSERT [dbo].[Entidade] ([EntidadeID], [Password], [Nome], [Email], [Contacto]) VALUES (1, N'PFS2000', N'João Fernandes', N'joao.fernandes@codesolutions.pt', N'253900900')
INSERT [dbo].[Entidade] ([EntidadeID], [Password], [Nome], [Email], [Contacto]) VALUES (2, N'pastelaria1774', N'Silva', N'silva.pastelaria@outlook.com', N'253340506')
INSERT [dbo].[Entidade] ([EntidadeID], [Password], [Nome], [Email], [Contacto]) VALUES (3, N'aristeu_900', N'Aristeu Pereira', N'aristeu.pereira@gmail.com', N'919999999')


/******************************* Inserts [dbo].[Cliente] *******************************/
GO
INSERT [dbo].[Cliente] ([ClienteID], [DataNascimento], [Pais], [Localizacao], [EntidadeID]) VALUES (1, CAST(N'1993-04-14' AS DATE), N'Portugal', N'Rua 24 junho, 4800-010', 1)


/******************************* Inserts [dbo].[HistoricoDePagamentosCliente] *******************************/
GO
INSERT [dbo].[HistoricoDePagamentosCliente] ([HistoricoID], [NumEncomendasCliente], [ClienteID]) VALUES (1, N'7', 1)


/******************************* Inserts [dbo].[Medalhas] *******************************/
GO
INSERT [dbo].[Medalhas] ([MedalhaID], [NomeMedalha], [Descricao], [DataDesbloqueio], [Icon]) VALUES (1, N'10 encomendas atingidas', N'Possui esta medalhas quando atingir 10 encomendas realizadas', CAST(N'2022-03-15' AS DATE), N'icon10.jpeg')


/******************************* Inserts [dbo].[ListaMedalhas] *******************************/
GO
INSERT [dbo].[ListaMedalhas] ([ListaMedalhaID], [MedalhaID], [ClienteID]) VALUES (1, 1, 1)


/******************************* Inserts [dbo].[AdminLoja] *******************************/
GO
INSERT [dbo].[AdminLoja] ([AdminLojaID], [EntidadeID]) VALUES (1, 2)


/******************************* Inserts [dbo].[Categoria] *******************************/
GO
INSERT [dbo].[Categoria] ([CategoriaID], [NomeCategoria]) VALUES (1, N'Pastelaria')


/******************************* Inserts [dbo].[Loja] *******************************/
GO
INSERT [dbo].[Loja] ([LojaID], [Morada], [NIF], [AdminLojaID], [CategoriaID]) VALUES (1, N'Rua Aleixo Ferreira 4705-022', 557390222, 1, 1)


/******************************* Inserts [dbo].[DocumentosLoja] *******************************/
GO
INSERT [dbo].[DocumentosLoja] ([DocLojaID], [PDFExtratoAnoAnterior], [LojaID]) VALUES (1, N'docsCerficado.pdf', 1)


/******************************* Inserts [dbo].[CategoriaProduto] *******************************/
GO
INSERT [dbo].[CategoriaProduto] ([CategoriaProdID], [NomeCatProd]) VALUES (1, N'Bebidas')


/******************************* Inserts [dbo].[SubCategoriaProduto] *******************************/
GO
INSERT [dbo].[SubCategoriaProduto] ([SubCatProdID], [NomeSubProd], [CategoriaProdID]) VALUES (1, N'Refrigerante', 1)


/******************************* Inserts [dbo].[Produto] *******************************/
GO
INSERT [dbo].[Produto] ([ProdutoID], [NomeProduto], [Quantidade], [Preco], [FotoProduto], [LojaID], [SubCatProdID]) VALUES (1, N'Coca-Cola', 2, CAST(0.90 AS DECIMAL(3, 2)), N'FotoProduto.jpeg', 1, 1)


/******************************* Inserts [dbo].[Estafeta] *******************************/
GO
INSERT [dbo].[Estafeta] ([EstafetaID], [Estado], [EntidadeID]) VALUES (1, N'Disponível', 3)


/******************************* Inserts [dbo].[DocumentosEstafeta] *******************************/
GO
INSERT [dbo].[DocumentosEstafeta] ([DocEstafetaID], [Fotoperfil], [FotoCartaoCidadaoFrente], [FotoCartaoCidadaoVerso], [PDFRegistoCriminal], [EstafetaID]) VALUES (1, N'fotoperfil.jpeg', N'ccFrente.jpeg', N'ccVerso.jpeg', N'RegistoCriminal.pdf', 1)


/******************************* Inserts [dbo].[Encomenda] *******************************/
GO
INSERT [dbo].[Encomenda] ([EncomendaID], [NumEncomenda], [DataEncomenda], [Estado], [ValorTotal], [LojaID], [ClienteID], [EstafetaID]) VALUES (1, 1, CAST(N'2022-03-17' AS DATE), N'Em processamento', CAST(3.50 AS DECIMAL(3, 2)), 1, 1, 1)


/******************************* Inserts [dbo].[LinhaEncomenda] *******************************/
GO
INSERT [dbo].[LinhaEncomenda] ([LinhaEncomendaID], [EncomendaID], [ProdutoID]) VALUES (1, 1, 1)


/******************************* Inserts [dbo].[CarrinhoDeCompras] *******************************/
GO
INSERT [dbo].[CarrinhoDeCompras] ([CarrinhoID], [ClienteID]) VALUES (1, 1)


/******************************* Inserts [dbo].[DadosCheckout] *******************************/
GO
INSERT [dbo].[DadosCheckout] ([DadosID], [NomeDados], [Morada]) VALUES (1, N'Compras realizadas', N'Rua 24 junho, 4705-010')


/******************************* Inserts [dbo].[TipoPagamento] *******************************/
GO
INSERT [dbo].[TipoPagamento] ([PagamentoID], [NomePagamento]) VALUES (1, N'Multibanco')


/******************************* Inserts [dbo].[Checkout] *******************************/
GO
INSERT [dbo].[Checkout] ([CheckoutID], [CarrinhoID], [PagamentoID], [DadosID]) VALUES (1, 1, 1, 1)


GO
ALTER TABLE [dbo].[Cliente]  WITH CHECK ADD  CONSTRAINT [FK_Cliente_Entidade] FOREIGN KEY([EntidadeID])
REFERENCES [dbo].[Entidade] ([EntidadeID])
GO
ALTER TABLE [dbo].[Cliente] CHECK CONSTRAINT [FK_Cliente_Entidade]
GO
ALTER TABLE [dbo].[HistoricoDePagamentosCliente] WITH CHECK ADD CONSTRAINT [FK_HistoricoDePagamentosCliente_Cliente] FOREIGN KEY([ClienteID])
REFERENCES [dbo].[Cliente] ([ClienteID])
GO
ALTER TABLE [dbo].[HistoricoDePagamentosCliente] CHECK CONSTRAINT [FK_HistoricoDePagamentosCliente_Cliente]
GO
ALTER TABLE [dbo].[ListaMedalhas] WITH CHECK ADD CONSTRAINT [FK_ListaMedalhas_Medalhas] FOREIGN KEY([MedalhaID])
REFERENCES [dbo].[Medalhas] ([MedalhaID])
GO
ALTER TABLE [dbo].[ListaMedalhas] CHECK CONSTRAINT [FK_ListaMedalhas_Medalhas]
GO
ALTER TABLE [dbo].[ListaMedalhas] WITH CHECK ADD CONSTRAINT [FK_ListaMedalhas_Cliente] FOREIGN KEY ([ClienteID])
REFERENCES [dbo].[Cliente]([ClienteID])
GO
ALTER TABLE [dbo].[ListaMedalhas] CHECK CONSTRAINT [FK_ListaMedalhas_Cliente]
GO
ALTER TABLE [dbo].[Loja] WITH CHECK ADD CONSTRAINT [FK_Loja_AdminLoja] FOREIGN KEY ([AdminLojaID])
REFERENCES [dbo].[AdminLoja] ([AdminLojaID])
GO
ALTER TABLE [dbo].[Loja] CHECK CONSTRAINT [FK_Loja_AdminLoja]
GO
ALTER TABLE [dbo].[Loja] WITH CHECK ADD CONSTRAINT [FK_Loja_Categoria] FOREIGN KEY ([CategoriaID])
REFERENCES [dbo].[Categoria] ([CategoriaID])
GO
ALTER TABLE [dbo].[Loja] CHECK CONSTRAINT [FK_Loja_Categoria]
GO
ALTER TABLE [dbo].[DocumentosLoja] WITH CHECK ADD CONSTRAINT [FK_DocumentosLoja_Loja] FOREIGN KEY ([LojaID])
REFERENCES [dbo].[Loja] ([LojaID])
GO
ALTER TABLE [dbo].[DocumentosLoja] CHECK CONSTRAINT [FK_DocumentosLoja_Loja]
GO
ALTER TABLE [dbo].[SubCategoriaProduto] WITH CHECK ADD CONSTRAINT [FK_SubCategoriaProduto_CategoriaProduto] FOREIGN KEY ([CategoriaProdID])
REFERENCES [dbo].[CategoriaProduto] ([CategoriaProdID])
GO
ALTER TABLE [dbo].[SubCategoriaProduto] CHECK CONSTRAINT [FK_SubCategoriaProduto_CategoriaProduto]
GO
ALTER TABLE [dbo].[Produto] WITH CHECK ADD CONSTRAINT [FK_Produto_SubCategoriaProduto] FOREIGN KEY ([SubCatProdID])
REFERENCES [dbo].[SubCategoriaProduto] ([SubCatProdID])
GO
ALTER TABLE [dbo].[Produto] CHECK CONSTRAINT [FK_Produto_SubCategoriaProduto]
GO
ALTER TABLE [dbo].[Estafeta] WITH CHECK ADD CONSTRAINT [FK_Estafeta_Entidade] FOREIGN KEY ([EntidadeID])
REFERENCES [dbo].[Entidade] ([EntidadeID])
GO
ALTER TABLE [dbo].[Estafeta] CHECK CONSTRAINT [FK_Estafeta_Entidade]
GO
ALTER TABLE [dbo].[DocumentosEstafeta] WITH CHECK ADD CONSTRAINT [FK_DocumentosEstafeta_Estafeta] FOREIGN KEY ([EstafetaID])
REFERENCES [dbo].[Estafeta] ([EstafetaID])
GO
ALTER TABLE [dbo].[DocumentosEstafeta] CHECK CONSTRAINT [FK_DocumentosEstafeta_Estafeta]
GO
ALTER TABLE [dbo].[Encomenda] WITH CHECK ADD CONSTRAINT [FK_Encomenda_Loja] FOREIGN KEY ([LojaID])
REFERENCES [dbo].[Loja] ([LojaID])
GO
ALTER TABLE [dbo].[Encomenda] CHECK CONSTRAINT [FK_Encomenda_Loja]
GO
ALTER TABLE [dbo].[Encomenda] WITH CHECK ADD CONSTRAINT [FK_Encomenda_Cliente] FOREIGN KEY ([ClienteID])
REFERENCES [dbo].[Cliente] ([ClienteID])
GO
ALTER TABLE [dbo].[Encomenda] CHECK CONSTRAINT [FK_Encomenda_Cliente]
GO
ALTER TABLE [dbo].[Encomenda] WITH CHECK ADD CONSTRAINT [FK_Encomenda_Estafeta] FOREIGN KEY ([EstafetaID])
REFERENCES [dbo].[Estafeta] ([EstafetaID])
GO
ALTER TABLE [dbo].[Encomenda] CHECK CONSTRAINT [FK_Encomenda_Estafeta]
GO
ALTER TABLE [dbo].[LinhaEncomenda] WITH CHECK ADD CONSTRAINT [FK_LinhaEncomenda_Encomenda] FOREIGN KEY ([EncomendaID])
REFERENCES [dbo].[Encomenda] ([EncomendaID])
GO
ALTER TABLE [dbo].[LinhaEncomenda] CHECK CONSTRAINT [FK_LinhaEncomenda_Encomenda]
GO
ALTER TABLE [dbo].[LinhaEncomenda] WITH CHECK ADD CONSTRAINT [FK_Encomenda_Produto] FOREIGN KEY ([ProdutoID])
REFERENCES [dbo].[Produto] ([ProdutoID])
GO
ALTER TABLE [dbo].[LinhaEncomenda] CHECK CONSTRAINT [FK_LinhaEncomenda_Produto]
GO
ALTER TABLE [dbo].[CarrinhoDeCompras] WITH CHECK ADD CONSTRAINT [FK_CarrinhoDeCompras_Cliente] FOREIGN KEY ([ClienteID])
REFERENCES [dbo].[Cliente] ([ClienteID])
GO
ALTER TABLE [dbo].[CarrinhoDeCompras] CHECK CONSTRAINT [FK_CarrinhoDeCompras_Cliente]
GO
ALTER TABLE [dbo].[Checkout] WITH CHECK ADD CONSTRAINT [FK_Checkout_CarrinhoDeCompras] FOREIGN KEY ([CarrinhoID])
REFERENCES [dbo].[CarrinhoDeCompras] ([CarrinhoID])
GO
ALTER TABLE [dbo].[CarrinhoDeCompras] CHECK CONSTRAINT [FK_Checkout_CarrinhoDeCompras]
GO
ALTER TABLE [dbo].[Checkout] WITH CHECK ADD CONSTRAINT [FK_Checkout_TipoPagamento] FOREIGN KEY ([PagamentoID])
REFERENCES [dbo].[TipoPagamento] ([PagamentoID])
GO
ALTER TABLE [dbo].[TipoPagamento] CHECK CONSTRAINT [FK_Checkout_TipoPagamento]
GO
ALTER TABLE [dbo].[Checkout] WITH CHECK ADD CONSTRAINT [FK_Checkout_DadosCheckout] FOREIGN KEY ([DadosID])
REFERENCES [dbo].[DadosCheckout] ([DadosID])
GO
ALTER TABLE [dbo].[DadosCheckout] CHECK CONSTRAINT [FK_Checkout_DadosCheckout]
GO