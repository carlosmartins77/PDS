const dboperations = require('../dboperations');
const jwt = require('jsonwebtoken');

// Classes
const Product = require('../Classes/Product')

// Para todas as rotas produto
const produto = async (request, response, next) => {
  try {
    const token = request.body.token
    console.log(request.body)
    //  Retorna um objeto com os dados do utilizador
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    request.user = await dboperations.finduser(decoded)
    if (request.user[0].tipoPermissao == 1) next();
    else response.send("Nao possui autorizacao")
  } catch (error) {
    response.send(error)
  }
}

// Rota publicarProduto
const publicarProduto = (request, response) => {
  try {
    // Name, Quantity, Price, hourRecoMin, HourRecoMax, Image, lojaId, subCatProdId
    let product = new Product(request.body.name, request.body.quantity, request.body.price, request.body.hourRecoMin, request.body.hourRecoMax,
      request.body.image, request.body.lojaId, request.body.subCatProdId)
    console.log("Produto a publicar", product)

    dboperations.newProduct(product).then(result => {
      if (result) response.status(201).send("Editado com sucesso!")
      response.status(404).send("Not Found")
    })
  } catch (error) {

  }
}

// Rota editarProduto
const editarProduto = (request, response) => {
  try {
    let product = new Order(request.body.id, request.body.name_product, request.body.quantity_product, request.body.image_product)
    console.log("Produto a editar", product)

    dboperations.editProduct(product).then(result => {
      if (result) response.status(201).send("Editado com sucesso!")
      response.status(404).send("Not Found")
    })
  } catch (error) {

  }
}

// Rota listarProdutos
const listarProdutos = (request, response) => {
  try {
    dboperations.listProduct(request.params.id).then(result => {
      response.json(result[0]);
    })
  } catch (error) {

  }
}

module.exports = {
  produto: produto,
  publicarProduto: publicarProduto,
  editarProduto: editarProduto,
  listarProdutos: listarProdutos
}