USE [master]
GO

CREATE DATABASE [PFSCS]
GO
USE [PFSCS]
GO
/*******************************Table [dbo].[Utilizador] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Utilizador](
	[utilizadorId] [smallint] IDENTITY(1,1) PRIMARY KEY,
	[password] [varchar](100) NOT NULL,
	[nome] [varchar](50) NOT NULL,
	[email] [varchar](50) NOT NULL,
	[contacto] [int] NOT NULL,
	[nif] [int] NOT NULL,
	[tipoPermissao] [int] NOT NULL,
)

GO
/******************************* Table [dbo].[Cliente] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cliente](
	[clienteId] [smallint] IDENTITY(1,1) PRIMARY KEY,
	[dataNascimento] [DATE] NOT NULL,
	[pais] [varchar](25) NOT NULL,
	[localizacao] [varchar](50) NOT NULL,
	[distanciaRaio] [int] NOT NULL,
	[utilizadorId] [smallint] NOT NULL,
)

GO
/******************************* Table [dbo].[HistoricoDePagamentosCliente] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HistoricoDePagamentosCliente](
	[historicoId] [smallint] IDENTITY(1,1) PRIMARY KEY,
	[numEncomendasCliente] [int] NOT NULL,
	[clienteId] [smallint] NOT NULL,
) 

GO
/******************************* Table [dbo].[Medalhas] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Medalhas](
	[medalhaId] [smallint] IDENTITY(1,1) PRIMARY KEY,
	[nomeMedalha] [varchar](50) NOT NULL,
	[descricao] [nvarchar] (255) NOT NULL,
	[dataDesbloqueio] [DATE] NOT NULL,
	[icon] [nvarchar] (255) NOT NULL,
) 

GO
/******************************* Table [dbo].[ListaMedalhas] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ListaMedalhas](
	[listamedalhaId] [smallint] IDENTITY(1,1) PRIMARY KEY,
	[medalhaId] [smallint] NOT NULL,
	[clienteId] [smallint] NOT NULL,	
)

GO
/******************************* Table [dbo].[AdminLoja] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AdminLoja](
	[adminlojaId] [smallint] IDENTITY(1,1) PRIMARY KEY,
	[utilizadorId] [smallint] NOT NULL,
) 

GO
/******************************* Table [dbo].[Categoria] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categoria](
	[categoriaId] [smallint] IDENTITY(1,1) PRIMARY KEY,
	[nomeCategoria] [varchar](50) NOT NULL,
) 

GO
/******************************* Table [dbo].[Loja] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Loja](
	[lojaId] [smallint] IDENTITY(1,1) PRIMARY KEY,
	[morada] [varchar](50) NOT NULL,
	[nif] [int] NOT NULL,
	[adminlojaId] [smallint] NOT NULL,
	[categoriaId] [smallint] NOT NULL,
)

GO
/******************************* Table [dbo].[DocumentosLoja] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DocumentosLoja](
	[doclojaId] [smallint] IDENTITY(1,1) PRIMARY KEY,
	[pdfExtratoAnoAnterior] [nvarchar](255) NOT NULL,
	[lojaId] [smallint] NOT NULL,
)

GO
/******************************* Table [dbo].[CategoriaProduto] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CategoriaProduto](
	[categoriaProdId] [smallint] IDENTITY(1,1) PRIMARY KEY,
	[nomeCatProd] [varchar](255) NOT NULL,
)

GO
/******************************* Table [dbo].[SubCategoriaProduto] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubCategoriaProduto](
	[subCatProdId] [smallint] IDENTITY(1,1) PRIMARY KEY,
	[nomeSubProd] [varchar](255) NOT NULL,
	[categoriaProdId] [smallint] NOT NULL,
)

GO
/******************************* Table [dbo].[Produto] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Produto](
	[produtoId] [smallint] IDENTITY(1,1) PRIMARY KEY,
	[nomeProduto] [varchar](255) NOT NULL,
	[quantidade] [int] NOT NULL,
	[preco] [float] NOT NULL,
	[horaRecolhaMin] [DATE] NOT NULL,
	[horaRecolhaMax] [DATE] NOT NULL,
	[fotoProduto] [nvarchar] (255) NOT NULL,
	[lojaId] [smallint] NOT NULL,
	[subCatProdId] [smallint] NOT NULL,
)

GO
/******************************* Table [dbo].[Estafeta] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Estafeta](
	[estafetaId] [smallint] IDENTITY(1,1) PRIMARY KEY,
	[estado] [varchar](50) NOT NULL,
	[utilizadorId] [smallint] NOT NULL,
)

GO
/******************************* Table [dbo].[DocumentosEstafeta] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DocumentosEstafeta](
	[docestafetaId] [smallint] IDENTITY(1,1) PRIMARY KEY,
	[fotoperfil] [nvarchar](255) NOT NULL,
	[fotoCartaoCidadaoFrente] [nvarchar](255) NOT NULL,
	[fotoCartaoCidadaoVerso] [nvarchar](255) NOT NULL,
	[pdfRegistoCriminal] [nvarchar](255) NOT NULL,
	[estafetaId] [smallint] NOT NULL,
)

GO
/******************************* Table [dbo].[Encomenda] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Encomenda](
	[encomendaId] [smallint] IDENTITY(1,1) PRIMARY KEY,
	[numEncomenda] [int] NOT NULL,
	[dataEncomenda] [DATE] NOT NULL,
	[estado] [varchar] (50) NOT NULL,
	[valorTotal] [int] NOT NULL,
	[lojaId] [smallint] NOT NULL,
	[clienteId] [smallint] NOT NULL,
	[estafetaId] [smallint] NOT NULL,
)

GO
/******************************* Table [dbo].[LinhaEncomenda] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LinhaEncomenda](
	[linhaencomendaId] [smallint] IDENTITY(1,1) PRIMARY KEY,
	[encomendaId] [smallint] NOT NULL,
	[produtoId] [smallint] NOT NULL,
)

GO
/******************************* Table [dbo].[CarrinhoDeCompras] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarrinhoDeCompras](
	[carrinhoId] [smallint] IDENTITY(1,1) PRIMARY KEY,
	[clienteId] [smallint] NOT NULL,
)

GO
/******************************* Table [dbo].[DadosCheckout] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DadosCheckout](
	[dadosId] [smallint] IDENTITY(1,1) PRIMARY KEY,
	[nomeDados] [varchar](255) NOT NULL,
	[morada] [varchar](255) NOT NULL,
)

GO
/******************************* Table [dbo].[TipoPagamento] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoPagamento](
	[pagamentoId] [smallint] IDENTITY(1,1) PRIMARY KEY,
	[nomePagamento] [varchar](255) NOT NULL,
)

GO
/******************************* Table [dbo].[Checkout] *******************************/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Checkout](
	[checkoutId] [smallint] IDENTITY(1,1) PRIMARY KEY,
	[carrinhoId] [smallint] NOT NULL,
	[pagamentoId] [smallint] NOT NULL,
	[dadosId] [smallint] NOT NULL,
)

/******************************* Inserts [dbo].[Utilizador] *******************************/
GO
INSERT INTO [dbo].[Utilizador] ([password], [nome], [email], [contacto], [nif], [tipoPermissao]) VALUES (N'PFS2000', N'João Fernandes', N'joao.fernandes@codesolutions.pt', N'253900900', 159560876,1)
INSERT INTO [dbo].[Utilizador] ([password], [nome], [email], [contacto], [nif], [tipoPermissao]) VALUES (N'pastelaria1774', N'Silva', N'silva.pastelaria@outlook.com', N'253340506', 560394958, 2)
INSERT INTO [dbo].[Utilizador] ([password], [nome], [email], [contacto], [nif], [tipoPermissao]) VALUES (N'aristeu_900', N'Aristeu Pereira', N'aristeu.pereira@gmail.com', N'919999999', 170876465, 3)


/******************************* Inserts [dbo].[Cliente] *******************************/
GO
INSERT INTO [dbo].[Cliente] ([dataNascimento], [pais], [localizacao], [distanciaRaio], [utilizadorId]) VALUES (CAST(N'1993-04-14' AS DATE), N'Portugal', N'Rua 24 junho, 4800-010', 600, 1)


/******************************* Inserts [dbo].[HistoricoDePagamentosCliente] *******************************/
GO
INSERT INTO [dbo].[HistoricoDePagamentosCliente] ([numEncomendasCliente], [clienteId]) VALUES (N'7', 1)


/******************************* Inserts [dbo].[Medalhas] *******************************/
GO
INSERT INTO [dbo].[Medalhas] ([nomeMedalha], [descricao], [dataDesbloqueio], [icon]) VALUES (N'10 encomendas atingidas', N'Possui esta medalha quando atingir 10 encomendas realizadas', CAST(N'2022-01-28' AS DATE), N'icon10.jpeg')
INSERT INTO [dbo].[Medalhas] ([nomeMedalha], [descricao], [dataDesbloqueio], [icon]) VALUES (N'20 encomendas atingidas', N'Possui esta medalha quando atingir 20 encomendas realizadas', CAST(N'2022-02-04' AS DATE), N'icon20.jpeg')
INSERT INTO [dbo].[Medalhas] ([nomeMedalha], [descricao], [dataDesbloqueio], [icon]) VALUES (N'30 encomendas atingidas', N'Possui esta medalha quando atingir 30 encomendas realizadas', CAST(N'2022-02-14' AS DATE), N'icon30.jpeg')
INSERT INTO [dbo].[Medalhas] ([nomeMedalha], [descricao], [dataDesbloqueio], [icon]) VALUES (N'40 encomendas atingidas', N'Possui esta medalha quando atingir 40 encomendas realizadas', CAST(N'2022-03-20' AS DATE), N'icon40.jpeg')
INSERT INTO [dbo].[Medalhas] ([nomeMedalha], [descricao], [dataDesbloqueio], [icon]) VALUES (N'50 encomendas atingidas', N'Possui esta medalha quando atingir 50 encomendas realizadas', CAST(N'2022-03-28' AS DATE), N'icon50.jpeg')


/******************************* Inserts [dbo].[ListaMedalhas] *******************************/
GO
INSERT INTO [dbo].[ListaMedalhas] ([medalhaId], [clienteId]) VALUES ( 1, 1)


/******************************* Inserts [dbo].[AdminLoja] *******************************/
GO
INSERT INTO [dbo].[AdminLoja] ([utilizadorId]) VALUES (2)


/******************************* Inserts [dbo].[Categoria] *******************************/
GO
INSERT INTO [dbo].[Categoria] ([nomeCategoria]) VALUES (N'Pastelaria')


/******************************* Inserts [dbo].[Loja] *******************************/
GO
INSERT INTO [dbo].[Loja] ([morada], [nif], [adminlojaId], [categoriaId]) VALUES (N'Rua Aleixo Ferreira 4705-022', 557390222, 1, 1)


/******************************* Inserts [dbo].[DocumentosLoja] *******************************/
INSERT INTO [dbo].[DocumentosLoja] ([pDFExtratoAnoAnterior], [lojaId]) VALUES (N'docsCerficado.pdf', 1)


/******************************* Inserts [dbo].[CategoriaProduto] *******************************/
GO
INSERT INTO [dbo].[CategoriaProduto] ([nomeCatProd]) VALUES (N'Bebidas')


/******************************* Inserts [dbo].[SubCategoriaProduto] *******************************/
GO
INSERT INTO [dbo].[SubCategoriaProduto] ([nomeSubProd], [categoriaProdId]) VALUES (N'Refrigerante', 1)


/******************************* Inserts [dbo].[Produto] *******************************/
GO
INSERT INTO [dbo].[Produto] ([nomeProduto], [quantidade], [preco], [horaRecolhaMin], [horaRecolhaMax], [fotoProduto], [lojaId], [subCatProdId]) VALUES (N'Coca-Cola', 2, CAST(0.90 AS DECIMAL(3, 2)), CAST(N'2022-03-18' AS DATE), CAST(N'2022-03-20' AS DATE), N'fotoProduto.jpeg', 1, 1)


/******************************* Inserts [dbo].[Estafeta] *******************************/
GO
INSERT INTO [dbo].[Estafeta] ([estado], [utilizadorId]) VALUES (N'Disponível', 3)


/******************************* Inserts [dbo].[DocumentosEstafeta] *******************************/
GO
INSERT INTO [dbo].[DocumentosEstafeta] ([fotoperfil], [fotoCartaoCidadaoFrente], [fotoCartaoCidadaoVerso], [pdfRegistoCriminal], [estafetaId]) VALUES (N'fotoperfil.jpeg', N'ccFrente.jpeg', N'ccVerso.jpeg', N'RegistoCriminal.pdf', 1)


/******************************* Inserts [dbo].[Encomenda] *******************************/
GO
INSERT INTO [dbo].[Encomenda] ([numEncomenda], [dataEncomenda], [estado], [valorTotal], [lojaId], [clienteId], [estafetaId]) VALUES (1, CAST(N'2022-03-17' AS DATE), N'Em processamento', CAST(3.50 AS DECIMAL(3, 2)), 1, 1, 1)


/******************************* Inserts [dbo].[LinhaEncomenda] *******************************/
GO
INSERT INTO [dbo].[LinhaEncomenda] ([encomendaId], [produtoId]) VALUES (1, 1)


/******************************* Inserts [dbo].[CarrinhoDeCompras] *******************************/
GO
INSERT INTO [dbo].[CarrinhoDeCompras] ([clienteId]) VALUES (1)


/******************************* Inserts [dbo].[DadosCheckout] *******************************/
GO
INSERT INTO [dbo].[DadosCheckout] ([nomeDados], [morada]) VALUES (N'Compras realizadas', N'Rua 24 junho, 4705-010')


/******************************* Inserts [dbo].[TipoPagamento] *******************************/
GO
INSERT INTO [dbo].[TipoPagamento] ([nomePagamento]) VALUES (N'Multibanco')


/******************************* Inserts [dbo].[Checkout] *******************************/
GO
INSERT INTO [dbo].[Checkout] ([carrinhoId], [pagamentoId], [dadosId]) VALUES (1, 1, 1)


GO
ALTER TABLE [dbo].[Cliente]  WITH CHECK ADD  CONSTRAINT [FK_Cliente_Utilizador] FOREIGN KEY([utilizadorId])
REFERENCES [dbo].[Utilizador] ([utilizadorId])
GO
ALTER TABLE [dbo].[Cliente] CHECK CONSTRAINT [FK_Cliente_Utilizador]
GO
ALTER TABLE [dbo].[HistoricoDePagamentosCliente] WITH CHECK ADD CONSTRAINT [FK_HistoricoDePagamentosCliente_Cliente] FOREIGN KEY([clienteId])
REFERENCES [dbo].[Cliente] ([clienteId])
GO
ALTER TABLE [dbo].[HistoricoDePagamentosCliente] CHECK CONSTRAINT [FK_HistoricoDePagamentosCliente_Cliente]
GO
ALTER TABLE [dbo].[ListaMedalhas] WITH CHECK ADD CONSTRAINT [FK_ListaMedalhas_Medalhas] FOREIGN KEY([medalhaId])
REFERENCES [dbo].[Medalhas] ([medalhaId])
GO
ALTER TABLE [dbo].[ListaMedalhas] CHECK CONSTRAINT [FK_ListaMedalhas_Medalhas]
GO
ALTER TABLE [dbo].[ListaMedalhas] WITH CHECK ADD CONSTRAINT [FK_ListaMedalhas_Cliente] FOREIGN KEY ([clienteId])
REFERENCES [dbo].[Cliente]([clienteId])
GO
ALTER TABLE [dbo].[ListaMedalhas] CHECK CONSTRAINT [FK_ListaMedalhas_Cliente]
GO
ALTER TABLE [dbo].[AdminLoja]  WITH CHECK ADD  CONSTRAINT [FK_AdminLoja_Utilizador] FOREIGN KEY([utilizadorId])
REFERENCES [dbo].[Utilizador] ([utilizadorId])
GO
ALTER TABLE [dbo].[AdminLoja] CHECK CONSTRAINT [FK_AdminLoja_Utilizador]
GO
ALTER TABLE [dbo].[Loja] WITH CHECK ADD CONSTRAINT [FK_Loja_AdminLoja] FOREIGN KEY ([adminlojaId])
REFERENCES [dbo].[AdminLoja] ([adminlojaId])
GO
ALTER TABLE [dbo].[Loja] CHECK CONSTRAINT [FK_Loja_AdminLoja]
GO
ALTER TABLE [dbo].[Loja] WITH CHECK ADD CONSTRAINT [FK_Loja_Categoria] FOREIGN KEY ([categoriaId])
REFERENCES [dbo].[Categoria] ([categoriaId])
GO
ALTER TABLE [dbo].[Loja] CHECK CONSTRAINT [FK_Loja_Categoria]
GO
ALTER TABLE [dbo].[DocumentosLoja] WITH CHECK ADD CONSTRAINT [FK_DocumentosLoja_Loja] FOREIGN KEY ([lojaId])
REFERENCES [dbo].[Loja] ([lojaId])
GO
ALTER TABLE [dbo].[DocumentosLoja] CHECK CONSTRAINT [FK_DocumentosLoja_Loja]
GO
ALTER TABLE [dbo].[SubCategoriaProduto] WITH CHECK ADD CONSTRAINT [FK_SubCategoriaProduto_CategoriaProduto] FOREIGN KEY ([categoriaProdId])
REFERENCES [dbo].[CategoriaProduto] ([categoriaProdId])
GO
ALTER TABLE [dbo].[SubCategoriaProduto] CHECK CONSTRAINT [FK_SubCategoriaProduto_CategoriaProduto]
GO
ALTER TABLE [dbo].[Produto] WITH CHECK ADD CONSTRAINT [FK_Produto_SubCategoriaProduto] FOREIGN KEY ([subCatProdId])
REFERENCES [dbo].[SubCategoriaProduto] ([subCatProdId])
GO
ALTER TABLE [dbo].[Produto] CHECK CONSTRAINT [FK_Produto_SubCategoriaProduto]
GO
ALTER TABLE [dbo].[Estafeta] WITH CHECK ADD CONSTRAINT [FK_Estafeta_Utilizador] FOREIGN KEY ([utilizadorId])
REFERENCES [dbo].[Utilizador] ([utilizadorId])
GO
ALTER TABLE [dbo].[Estafeta] CHECK CONSTRAINT [FK_Estafeta_Utilizador]
GO
ALTER TABLE [dbo].[DocumentosEstafeta] WITH CHECK ADD CONSTRAINT [FK_DocumentosEstafeta_Estafeta] FOREIGN KEY ([estafetaId])
REFERENCES [dbo].[Estafeta] ([estafetaId])
GO
ALTER TABLE [dbo].[DocumentosEstafeta] CHECK CONSTRAINT [FK_DocumentosEstafeta_Estafeta]
GO
ALTER TABLE [dbo].[Encomenda] WITH CHECK ADD CONSTRAINT [FK_Encomenda_Loja] FOREIGN KEY ([lojaId])
REFERENCES [dbo].[Loja] ([lojaId])
GO
ALTER TABLE [dbo].[Encomenda] CHECK CONSTRAINT [FK_Encomenda_Loja]
GO
ALTER TABLE [dbo].[Encomenda] WITH CHECK ADD CONSTRAINT [FK_Encomenda_Cliente] FOREIGN KEY ([clienteId])
REFERENCES [dbo].[Cliente] ([clienteId])
GO
ALTER TABLE [dbo].[Encomenda] CHECK CONSTRAINT [FK_Encomenda_Cliente]
GO
ALTER TABLE [dbo].[Encomenda] WITH CHECK ADD CONSTRAINT [FK_Encomenda_Estafeta] FOREIGN KEY ([estafetaId])
REFERENCES [dbo].[Estafeta] ([estafetaId])
GO
ALTER TABLE [dbo].[Encomenda] CHECK CONSTRAINT [FK_Encomenda_Estafeta]
GO
ALTER TABLE [dbo].[LinhaEncomenda] WITH CHECK ADD CONSTRAINT [FK_LinhaEncomenda_Encomenda] FOREIGN KEY ([encomendaId])
REFERENCES [dbo].[Encomenda] ([encomendaId])
GO
ALTER TABLE [dbo].[LinhaEncomenda] CHECK CONSTRAINT [FK_LinhaEncomenda_Encomenda]
GO
ALTER TABLE [dbo].[LinhaEncomenda] WITH CHECK ADD CONSTRAINT [FK_Encomenda_Produto] FOREIGN KEY ([produtoId])
REFERENCES [dbo].[Produto] ([produtoId])
/*GO
ALTER TABLE [dbo].[LinhaEncomenda] CHECK CONSTRAINT [FK_LinhaEncomenda_Produto]*/
GO
ALTER TABLE [dbo].[CarrinhoDeCompras] WITH CHECK ADD CONSTRAINT [FK_CarrinhoDeCompras_Cliente] FOREIGN KEY ([clienteId])
REFERENCES [dbo].[Cliente] ([clienteId])
GO
ALTER TABLE [dbo].[CarrinhoDeCompras] CHECK CONSTRAINT [FK_CarrinhoDeCompras_Cliente]
GO
ALTER TABLE [dbo].[Checkout] WITH CHECK ADD CONSTRAINT [FK_Checkout_CarrinhoDeCompras] FOREIGN KEY ([carrinhoId])
REFERENCES [dbo].[CarrinhoDeCompras] ([carrinhoId])
/*GO
ALTER TABLE [dbo].[CarrinhoDeCompras] CHECK CONSTRAINT [FK_Checkout_CarrinhoDeCompras]*/
GO
ALTER TABLE [dbo].[Checkout] WITH CHECK ADD CONSTRAINT [FK_Checkout_TipoPagamento] FOREIGN KEY ([pagamentoId])
REFERENCES [dbo].[TipoPagamento] ([pagamentoId])
/*GO
ALTER TABLE [dbo].[TipoPagamento] CHECK CONSTRAINT [FK_Checkout_TipoPagamento]*/
GO
ALTER TABLE [dbo].[Checkout] WITH CHECK ADD CONSTRAINT [FK_Checkout_DadosCheckout] FOREIGN KEY ([dadosId])
REFERENCES [dbo].[DadosCheckout] ([dadosId])
/*GO
--ALTER TABLE [dbo].[DadosCheckout] CHECK CONSTRAINT [FK_Checkout_DadosCheckout]*/
GO