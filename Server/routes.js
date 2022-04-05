const express = require('express')
const app = express()
const dotenv = require('dotenv').config();
const router = express.Router();
const {produto, publicarProduto, editarProduto, listarProdutos} = require('./Functions/ProductRoutes')
const {verificartoken, login, registeruser, token} = require('./Functions/OAuthRoutes')
const {mostrarPerfil} = require('./Functions/PerfilRoutes')
const {uploadimages, novaLoja, approvestore, dowloadfiles} = require('./Functions/CandidacyRoutes')

app.use('/', router);
app.use(express.json());

// Login 
router.use('/verificartoken', verificartoken) 
router.route('/login').post(login) // a dar
router.route('/registeruser').post(registeruser) // a dar
//router.route('/verificartoken/token').get(token)

// Produto
router.use("/produto", produto)
router.route('/produto/publicarProduto').post(publicarProduto) 
router.route('/produto/editarProduto').post(editarProduto)
router.route('/produto/listarProdutos').get(listarProdutos)

// Mostrar Perfil
router.route('/mostarPerfil').post(mostrarPerfil) // a dar

// Candidaturas Lojas
// Para dados
router.route('/candidaturaLoja').post(novaLoja)
router.route('/candidaturaLojaFicheiro/:id').post(uploadimages)

router.route('/aprovacaoLoja').post(approvestore)
router.route('/aprovacaoLojaFicheiro').post(dowloadfiles)

module.exports = router