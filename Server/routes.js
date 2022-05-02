const express = require('express')
const app = express()
const dotenv = require('dotenv').config();
const router = express.Router();
const { produto, publicarProduto, editarProduto, listarProdutos, novaCategoriaProduto, novaSubCategoriaProduto, removerCategoriaProduto } = require('./Functions/ProductRoutes')
const { verificartoken, login, registeruser, token } = require('./Functions/OAuthRoutes')
const { mostrarPerfil } = require('./Functions/PerfilRoutes')
const { uploadimages, novaLoja, approvestore, approvecourier, dowloadfiles, novaCategoriaLoja, removerCategoria } = require('./Functions/CandidacyRoutes')
const { listarProdutosClientes, adicionarCarrinho, removerCarrinho, listarCarrinho, getMedalhas } = require('./Functions/ClientesRoutes')
const { adminStore, adminCourier, deleteStore, deleteCourier, atribiurMedalhas } = require('./Functions/AdminRoutes')
const { courier, changeState } = require('./Functions/CourierRoutes')

app.use('/', router);
app.use(express.json());

// Clientes
router.route('/cliente/listarProdutos').get(listarProdutosClientes)
router.route('/cliente/adicionarCarrinho').post(adicionarCarrinho)
router.route('/cliente/removerCarrinho').post(removerCarrinho)
router.route('/cliente/listarCarrinho').get(listarCarrinho)
router.route('/cliente/listarMedalhas').post(getMedalhas)

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
router.route('/removerCategoriaProduto').post(removerCategoriaProduto)
router.route('/criarCategoriaProduto').post(novaCategoriaProduto) // a dar
router.route('/criarSubCategoriaProduto').post(novaSubCategoriaProduto) // a dar


//Categorias
router.route('/loja/criarCategoriaLoja').post(novaCategoriaLoja) // a dar

// Mostrar Perfil
router.route('/mostarPerfil').post(mostrarPerfil) // a dar

// Candidaturas Lojas
// Para dados
router.route('/candidaturaLoja').post(novaLoja) // a dar
router.route('/candidaturaLojaFicheiro/:id').post(uploadimages) // a dar

// Admin
router.use("/admin/store", adminStore)
router.use("/admin/courier", adminCourier)
router.route('/admin/store/delete').post(deleteStore)
router.route('/admin/courier/delete').post(deleteCourier)
router.route('/atribuirMedalhas').get(atribiurMedalhas)


router.route('/aprovacaoLoja').post(approvestore) // a dar
router.route('/aprovacaoLojaFicheiro').post(dowloadfiles) // a dar
router.route('/aprovacao/estafeta').post(approvecourier)

router.route('/removercategoria').post(removerCategoria) // a dar

// Estafeta
router.use("/estafeta", courier);
router.route('/estafeta/mudaEstado/').post(changeState);

module.exports = router