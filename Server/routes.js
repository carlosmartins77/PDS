const express = require('express')
const app = express()
const dotenv = require('dotenv').config();
const router = express.Router();
const { produto, publicarProduto, editarProduto, listarProdutos, novaCategoriaProduto, novaSubCategoriaProduto, getCategoriaProd, removerCategoriaProduto, listProductsFromStore, listarProdutoPorId} = require('./Functions/ProductRoutes')
const { verificartoken, login, registeruser, token } = require('./Functions/OAuthRoutes')
const { mostrarPerfil } = require('./Functions/PerfilRoutes')
const { uploadimages, novaLoja, approvestore, approvecourier, dowloadfiles, getAproveStores, getReprovedStores, novaCategoriaLoja, removerCategoria, consultarHistoricoLojas, alterarEstadoLoja, getstores, getcategorias } = require('./Functions/CandidacyRoutes')
const { adminStore, adminCourier, deleteStore, deleteCourier, atribiurMedalhas } = require('./Functions/AdminRoutes')
const { courier, changeState, verEncomenda, changeStatus, getState } = require('./Functions/CourierRoutes')
const { listarProdutosClientes, adicionarCarrinho, removerCarrinho, listarCarrinho, verEncomendas, publicarEncomenda, getMedalhas, cancelEncomenda, acompanharEncomenda, filtrarLojasCategoria, filtrarProdutosCategoria, editarPerfilLoja, editarPerfilCliente } = require('./Functions/ClientesRoutes')

app.use('/', router);
app.use(express.json());

// Clientes
router.route('/cliente/listarProdutos').get(listarProdutosClientes) //ta
router.route('/cliente/adicionarCarrinho').post(adicionarCarrinho)
router.route('/cliente/removerCarrinho').post(removerCarrinho)
router.route('/cliente/listarCarrinho').post(listarCarrinho)
router.route('/cliente/listarMedalhas').post(getMedalhas)
router.route('/cliente/cancelarEncomenda').post(cancelEncomenda)
router.route('/cliente/acompanharEncomenda').post(acompanharEncomenda)
router.route('/cliente/filtrarLojasCategoria').post(filtrarLojasCategoria)
router.route('/cliente/filtrarProdutosCategoria').post(filtrarProdutosCategoria)


// Login 
router.use('/verificartoken', verificartoken)
router.route('/login').post(login) // a dar
router.route('/registeruser').post(registeruser) // a dar
    //router.route('/verificartoken/token').get(token)

// Produto
router.use("/produto", produto) // a dar
router.route('/produto/publicarProduto').post(publicarProduto) // a dar
router.route('/produto/editarProduto').post(editarProduto) // a dar
router.route('/produto/listarProdutos').get(listarProdutos) // a dar
router.route('/listarProdutosPorLoja').post(listProductsFromStore) // a dar
router.route('/removerCategoriaProduto').post(removerCategoriaProduto)
router.route('/criarCategoriaProduto').post(novaCategoriaProduto)
router.route('/criarSubCategoriaProduto').post(novaSubCategoriaProduto)
router.route('produto/getCategoriaProd').get(getCategoriaProd)


//Categorias
router.route('/loja/criarCategoriaLoja').post(novaCategoriaLoja)

// Mostrar Perfil
router.route('/mostarPerfil').post(mostrarPerfil) // a dar

// Candidaturas Lojas
// Para dados
router.route('/candidaturaLoja').post(novaLoja) // a dar
router.route('/candidaturaLojaFicheiro/:id').post(uploadimages) // a dar

// Admin
router.use("/admin/store", adminStore)
router.use("/admin/courier", adminCourier)
router.route('/admin/store/delete').delete(deleteStore)
router.route('/admin/courier/delete').delete(deleteCourier)
router.route('/atribuirMedalhas').post(atribiurMedalhas)


router.route('/listacategoria').get(getcategorias)
router.route('/listalojas').get(getstores)
router.route('/lojasAprovadas').get(getAproveStores)
router.route('/lojasReprovadas').get(getReprovedStores)



router.route('/aprovacaoLoja').post(approvestore) // a dar
router.route('/aprovacaoLojaFicheiro').post(dowloadfiles) // a dar
router.route('/aprovacao/estafeta').post(approvecourier)

router.route('/removerCategoriaLoja').post(removerCategoria) // a dar

// Estafeta
router.use("/estafeta", courier);
router.route('/estafeta/mudaEstado/').post(changeState);
router.route('/estafeta/encomenda/alterarEstado').post(changeStatus);
router.route('/estafeta/verEncomenda').post(verEncomenda)

// Cliente
router.route('/verEncomendas').post(verEncomendas)
router.route('/publicarEncomenda').post(publicarEncomenda)

router.route('/listarProdutoPorId/:id').get(listarProdutoPorId)


// Lojas
router.route('/consultarHistoricoLojas').post(consultarHistoricoLojas)

// Perfil's
router.route('/editarPerfil/Loja').post(editarPerfilLoja)
router.route('/editarPerfil/Cliente').post(editarPerfilCliente)

// Aleterar Estado da Loja
router.route('/alterarEstadoLoja').post(alterarEstadoLoja)

// Estafeta
router.route('/estafeta/verificarEstado').post(getState);

module.exports = router