const express = require('express')
const app = express()
const dotenv = require('dotenv').config();
const router = express.Router();
const { produto, publicarProduto, editarProduto, listarProdutos, novaCategoriaProduto, novaSubCategoriaProduto, removerCategoriaProduto} = require('./Functions/ProductRoutes')
const { verificartoken, login, registeruser, token } = require('./Functions/OAuthRoutes')
const { mostrarPerfil } = require('./Functions/PerfilRoutes')
const { uploadimages, novaLoja, approvestore, dowloadfiles, novaCategoriaLoja, removerCategoria} = require('./Functions/CandidacyRoutes')
const {listarProdutosClientes, adicionarCarrinho, removerCarrinho} = require('./Functions/ClientesRoutes')

app.use('/', router);
app.use(express.json());

// Clientes
router.route('/cliente/listarProdutos').get(listarProdutosClientes) 
router.route('/cliente/adicionarCarrinho').post(adicionarCarrinho) 
router.route('/cliente/removerCarrinho').post(removerCarrinho) 

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

router.route('/aprovacaoLoja').post(approvestore) // a dar
router.route('/aprovacaoLojaFicheiro').post(dowloadfiles) // a dar

router.route('/removercategoria').post(removerCategoria) // a dar

module.exports = router