const express = require('express')
const app = express()
const dotenv = require('dotenv').config();
const router = express.Router();
const {produto, publicarProduto, editarProduto, listarProdutos} = require('./Functions/ProductRoutes')
const {verificartoken, login, registeruser, token} = require('./Functions/OAuthRoutes')
const {mostrarPerfil} = require('./Functions/PerfilRoutes')

app.use('/', router);
app.use(express.json());

// Login 
router.use('/verificartoken', verificartoken) // a dar
router.route('/login').post(login) // a dar
router.route('/registeruser').post(registeruser) // a dar
router.route('/verificartoken/token').get(token)

// Produto
router.use("/produto", produto)
router.route('/produto/publicarProduto').post(publicarProduto) // a dar
router.route('/produto/editarProduto').post(editarProduto)
router.route('/produto/listarProdutos/:id').get(listarProdutos)

router.route('/mostarperfil').post(mostrarPerfil)


/*
//#region Candidaturas Loja
  // Rota candidaturas
  router.use("/candidaturas", (request, response, next) => {
    console.log('midlleware das candidaturas das lojas');
    next();
  })

// Rota submeterCandidaturas
router.route('/candidaturas/submeterCandidaturas').post((request, response) => {
  let candidacy = new Candidacy(request.body.id, request.body.name_candidacy, request.body.address, request.body.nif, request.body.category, request.body.approval, request.body.doc)
  console.log("Inicio", candidacy)

  dboperations.addOrder(candidacy).then(result => {
    response.status(201).json(result);
  })
})
//#endregion 

//#region Perfil
// Rota perfil
router.use("/perfil", (request, response, next) => {
  console.log('midlleware do pefil');
  next();
})

// Rota mostrarPerfil
router.route('/perfil/mostrarPerfil').get((request, response) => {
})

//#endregion 
*/

module.exports = router