const express = require('express')
const app = express()
const dotenv = require('dotenv/config');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const dboperations = require('./dboperations');
const req = require('express/lib/request');

// Classes
const Product = require('./Classes/Product')
const Candidacy = require('./Classes/Candidacy')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

//#region Exemplo
/*
router.route('/orders').get((request, response) => {
  dboperations.getOrders().then(result => {
    response.json(result[0]);
  })
})

router.route('/orders/:id').get((request, response) => {
  dboperations.getOrder(request.params.id).then(result => {
    response.json(result[0]);
  })
})

router.route('/orders').post((request, response) => {

  let order = new Order(request.body.id, request.body.name_product, request.body.quantity_product, request.body.image_product)
  //let order = {...request.body}
  console.log("Inicio", order)

  dboperations.addOrder(order).then(result => {
    response.status(201).json(result);
  })

})
*/
//#endregion

//#region Produto
// Para todas as rotas produto
router.use("/produto", (request, response, next) => {
  console.log('midlleware do produto');
  next();
})

// Rota publicarProduto
router.route('/produto/publicarProduto').post((request, response) => {
  let product = new Product(request.body.id, request.body.name_product, request.body.quantity_product, request.body.image_product)
  console.log("Produto a publicar", product)

  dboperations.newProduct(product).then(result => {
    if (result) response.status(201).send("Editado com sucesso!")
    response.status(404).send("Not Found")
  })
})

// Rota editarProduto
router.route('/produto/editarProduto').post((request, response) => {
  let product = new Order(request.body.id, request.body.name_product, request.body.quantity_product, request.body.image_product)
  console.log("Produto a editar", product)

  dboperations.editProduct(product).then(result => {
    if (result) response.status(201).send("Editado com sucesso!")
    response.status(404).send("Not Found")
  })
})

// Rota listarProdutos
router.route('/produto/listarProdutos/:id').get((request, response) => {
  dboperations.listProduct(request.params.id).then(result => {
    response.json(result[0]);
  })
})
  //#endregion 

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

app.listen(process.env.PORT, function (err) {
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port", process.env.PORT);
})