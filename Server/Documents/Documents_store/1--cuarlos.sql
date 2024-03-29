USE [PFSCS]
GO
SET IDENTITY_INSERT [dbo].[Utilizador] ON 

INSERT [dbo].[Utilizador] ([idUtilizador], [password], [nome], [email], [contacto], [nif], [tipoPermissao]) VALUES (1, N'PFS2000', N'João Fernandes', N'joao.fernandes@codesolutions.pt', 253900900, 159560876, 1)
INSERT [dbo].[Utilizador] ([idUtilizador], [password], [nome], [email], [contacto], [nif], [tipoPermissao]) VALUES (2, N'pastelaria1774', N'Pastelaria Pereira', N'silva.pastelaria@outlook.com', 0, 0, 2)
INSERT [dbo].[Utilizador] ([idUtilizador], [password], [nome], [email], [contacto], [nif], [tipoPermissao]) VALUES (3, N'aristeu_900', N'Aristeu Pereira', N'aristeu.pereira@gmail.com', 12, 12, 3)
INSERT [dbo].[Utilizador] ([idUtilizador], [password], [nome], [email], [contacto], [nif], [tipoPermissao]) VALUES (4, N'$2b$10$tueUe3aB8kL9tsH8mWLXPuHfFmh1FfucvboAJSpRhCEKD4IiCs5Ki', N'Carlos', N'carlosmartins@codesolutions.pt', 910000000, 123456789, 1)
INSERT [dbo].[Utilizador] ([idUtilizador], [password], [nome], [email], [contacto], [nif], [tipoPermissao]) VALUES (6, N'$2b$10$iL7husnK6ldTEyjl.piz7OBS8TMc8h.cly3xB.PwMKjSEQNafP3X.', N'joao XD', N'joao.ola@codesolutions.pt', 253900900, 159560876, 1)
INSERT [dbo].[Utilizador] ([idUtilizador], [password], [nome], [email], [contacto], [nif], [tipoPermissao]) VALUES (9, N'$2b$10$G7R2uS5VoCX6EbPGoW9ROOYAEfnWwWUXiX0RmsHhCH5jdtCqg8Fae', N'Simao', N'antoniooliveira@codesolutions.pt', 910000000, 123456789, 1)
SET IDENTITY_INSERT [dbo].[Utilizador] OFF
GO
SET IDENTITY_INSERT [dbo].[Cliente] ON 

INSERT [dbo].[Cliente] ([idCliente], [dataNascimento], [pais], [localizacao], [distanciaRaio], [utilizadorId]) VALUES (1, CAST(N'2001-01-01' AS Date), N'pt', N'braga', 600, 3)
INSERT [dbo].[Cliente] ([idCliente], [dataNascimento], [pais], [localizacao], [distanciaRaio], [utilizadorId]) VALUES (2, CAST(N'1999-01-02' AS Date), N'Portugal', N'rua', 1000, 2)
SET IDENTITY_INSERT [dbo].[Cliente] OFF
GO
SET IDENTITY_INSERT [dbo].[Estafeta] ON 

INSERT [dbo].[Estafeta] ([idEstafeta], [estado], [aprovacao], [utilizadorId]) VALUES (1, N'1', NULL, 3)
SET IDENTITY_INSERT [dbo].[Estafeta] OFF
GO
SET IDENTITY_INSERT [dbo].[Loja] ON 

INSERT [dbo].[Loja] ([idLoja], [morada], [nif], [adminlojaId], [aprovacao], [categoriaId], [nomeloja]) VALUES (1, N'Rua das Docas 45', 22, 1, 2, 4, N'Continente')
INSERT [dbo].[Loja] ([idLoja], [morada], [nif], [adminlojaId], [aprovacao], [categoriaId], [nomeloja]) VALUES (2, N'Rua das Tulipas', 123456781, 1, 1, 4, N'Jumbo')
INSERT [dbo].[Loja] ([idLoja], [morada], [nif], [adminlojaId], [aprovacao], [categoriaId], [nomeloja]) VALUES (5, N'Avenida de França', 123456784, 1, 0, 1, N'Arroz Doce')
INSERT [dbo].[Loja] ([idLoja], [morada], [nif], [adminlojaId], [aprovacao], [categoriaId], [nomeloja]) VALUES (6, N'Rua dos Clericos', 123456785, 1, 0, 3, N'Bezerra')
INSERT [dbo].[Loja] ([idLoja], [morada], [nif], [adminlojaId], [aprovacao], [categoriaId], [nomeloja]) VALUES (14, N'Rua Numero 33', 123456788, 1, 0, 4, N'Pingo Doce')
INSERT [dbo].[Loja] ([idLoja], [morada], [nif], [adminlojaId], [aprovacao], [categoriaId], [nomeloja]) VALUES (15, N'Rua dos Numeros', 123456666, 1, 1, 4, N'Aldi')
INSERT [dbo].[Loja] ([idLoja], [morada], [nif], [adminlojaId], [aprovacao], [categoriaId], [nomeloja]) VALUES (17, N'Rua dos elevadores', 123455547, 1, 0, 3, N'Madrugada')
SET IDENTITY_INSERT [dbo].[Loja] OFF
GO
SET IDENTITY_INSERT [dbo].[Encomenda] ON 

INSERT [dbo].[Encomenda] ([idEncomenda], [numEncomenda], [dataEncomenda], [estado], [valorTotal], [lojaId], [clienteId], [estafetaId]) VALUES (1, 1, CAST(N'2022-03-17' AS Date), N'Entregue', 3, 1, 1, 1)
INSERT [dbo].[Encomenda] ([idEncomenda], [numEncomenda], [dataEncomenda], [estado], [valorTotal], [lojaId], [clienteId], [estafetaId]) VALUES (5, 1, CAST(N'2022-03-24' AS Date), N'Cancelada', 3, 1, 2, 1)
INSERT [dbo].[Encomenda] ([idEncomenda], [numEncomenda], [dataEncomenda], [estado], [valorTotal], [lojaId], [clienteId], [estafetaId]) VALUES (6, 1, CAST(N'2021-04-23' AS Date), N'a processar', 10, 1, 1, 1)
INSERT [dbo].[Encomenda] ([idEncomenda], [numEncomenda], [dataEncomenda], [estado], [valorTotal], [lojaId], [clienteId], [estafetaId]) VALUES (7, 1, CAST(N'2021-04-23' AS Date), N'a processar', 10, 1, 1, 1)
INSERT [dbo].[Encomenda] ([idEncomenda], [numEncomenda], [dataEncomenda], [estado], [valorTotal], [lojaId], [clienteId], [estafetaId]) VALUES (13, 1, CAST(N'2021-04-23' AS Date), N'a processar hoje', 10, 1, 1, 1)
INSERT [dbo].[Encomenda] ([idEncomenda], [numEncomenda], [dataEncomenda], [estado], [valorTotal], [lojaId], [clienteId], [estafetaId]) VALUES (14, 1, CAST(N'2021-04-23' AS Date), N'a processar hoje agora', 0, 1, 1, 1)
INSERT [dbo].[Encomenda] ([idEncomenda], [numEncomenda], [dataEncomenda], [estado], [valorTotal], [lojaId], [clienteId], [estafetaId]) VALUES (15, 1, CAST(N'2021-04-23' AS Date), N'a processar 04/05/2022', 0, 1, 1, 1)
INSERT [dbo].[Encomenda] ([idEncomenda], [numEncomenda], [dataEncomenda], [estado], [valorTotal], [lojaId], [clienteId], [estafetaId]) VALUES (16, 1, CAST(N'2022-06-04' AS Date), N'Atualizadoagora', 10, 1, 1, 1)
INSERT [dbo].[Encomenda] ([idEncomenda], [numEncomenda], [dataEncomenda], [estado], [valorTotal], [lojaId], [clienteId], [estafetaId]) VALUES (17, 1, CAST(N'2022-06-04' AS Date), N'Atualizadoagora', 10, 1, 1, 1)
INSERT [dbo].[Encomenda] ([idEncomenda], [numEncomenda], [dataEncomenda], [estado], [valorTotal], [lojaId], [clienteId], [estafetaId]) VALUES (18, 1, CAST(N'2022-08-07' AS Date), N'Entregue', 10, 1, 1, 1)
INSERT [dbo].[Encomenda] ([idEncomenda], [numEncomenda], [dataEncomenda], [estado], [valorTotal], [lojaId], [clienteId], [estafetaId]) VALUES (19, 1, CAST(N'2022-08-07' AS Date), N'Entregue', 10, 1, 1, 1)
INSERT [dbo].[Encomenda] ([idEncomenda], [numEncomenda], [dataEncomenda], [estado], [valorTotal], [lojaId], [clienteId], [estafetaId]) VALUES (20, 1, CAST(N'2022-08-07' AS Date), N'Entregue', 10, 1, 1, 1)
INSERT [dbo].[Encomenda] ([idEncomenda], [numEncomenda], [dataEncomenda], [estado], [valorTotal], [lojaId], [clienteId], [estafetaId]) VALUES (21, 1, CAST(N'2022-08-07' AS Date), N'Entregue', 10, 1, 1, 1)
INSERT [dbo].[Encomenda] ([idEncomenda], [numEncomenda], [dataEncomenda], [estado], [valorTotal], [lojaId], [clienteId], [estafetaId]) VALUES (22, 1, CAST(N'2022-08-07' AS Date), N'Entregue', 10, 1, 1, 1)
INSERT [dbo].[Encomenda] ([idEncomenda], [numEncomenda], [dataEncomenda], [estado], [valorTotal], [lojaId], [clienteId], [estafetaId]) VALUES (23, 1, CAST(N'2022-08-07' AS Date), N'Entregue', 10, 1, 1, 1)
INSERT [dbo].[Encomenda] ([idEncomenda], [numEncomenda], [dataEncomenda], [estado], [valorTotal], [lojaId], [clienteId], [estafetaId]) VALUES (24, 1, CAST(N'2022-08-07' AS Date), N'Entregue', 10, 1, 1, 1)
INSERT [dbo].[Encomenda] ([idEncomenda], [numEncomenda], [dataEncomenda], [estado], [valorTotal], [lojaId], [clienteId], [estafetaId]) VALUES (25, 1, CAST(N'2022-08-07' AS Date), N'Entregue', 10, 1, 1, 1)
INSERT [dbo].[Encomenda] ([idEncomenda], [numEncomenda], [dataEncomenda], [estado], [valorTotal], [lojaId], [clienteId], [estafetaId]) VALUES (26, 1, CAST(N'2022-08-07' AS Date), N'Entregue', 10, 1, 1, 1)
INSERT [dbo].[Encomenda] ([idEncomenda], [numEncomenda], [dataEncomenda], [estado], [valorTotal], [lojaId], [clienteId], [estafetaId]) VALUES (27, 1, CAST(N'2022-08-07' AS Date), N'Entregue', 10, 1, 1, 1)
INSERT [dbo].[Encomenda] ([idEncomenda], [numEncomenda], [dataEncomenda], [estado], [valorTotal], [lojaId], [clienteId], [estafetaId]) VALUES (28, 1, CAST(N'2022-06-04' AS Date), N'Atualizadoagora', 10, 1, 1, 1)
SET IDENTITY_INSERT [dbo].[Encomenda] OFF
GO
