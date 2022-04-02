const dboperations = require('../dboperations');
const jwt = require('jsonwebtoken');

// Classes
const Product = require('../Classes/Product');
const { reset } = require('nodemon');

// Para todas as rotas produto
const produto = async (request, response, next) => {
    try {
        const token = request.headers.authorization.split(" ")[1]
        //  Retorna um objeto com os dados do utilizador
        console.log("Produto: ", token)
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        request.use = await dboperations.finduser(decoded)
        // verificar se possui a loja onde pretende publicar o produto associado
        request.user = await dboperations.compareuser(request.use[0].email)
        if (request.user[0]) {
            if (request.use[0].tipoPermissao == 2) next();
            else response.status(403).send("Nao possui autorizacao")
        } else {
            response.status(403).send("Nao possui autorizacao")
        }
    } catch (Error) {
        response.status(403).send("Nao possui autorizacao")
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
            if (result) response.status(201).send("Publicado com sucesso!")
        })
    } catch (Error) {
        console.log("publicarProduto: ", Error)
    }
}

// Rota editarProduto
const editarProduto = (request, response) => {
    try {
        // Name, Quantity, Price, hourRecoMin, HourRecoMax, Image, lojaId, subCatProdId
        let product = new Product(request.body.name, request.body.quantity, request.body.price, request.body.hourRecoMin, request.body.hourRecoMax,
            request.body.image, request.body.lojaId, request.body.subCatProdId)
        console.log("Produto a editar", product)

        dboperations.editProduct(product, request.body.id).then(result => {
            if (result) {
                response.status(201).send("Editado com sucesso!")
            }
        })
    } catch (Error) {
        response.send(404).send("Not Found")
    }
}

// Rota listarProdutos
const listarProdutos = async (request, response) => {
    try {
        dboperations.listProduct().then(result => {
            response.status(200).send(result);
        })
    } catch (Error) {
       response.status(403).send()
    }
}

module.exports = {
    produto: produto,
    publicarProduto: publicarProduto,
    editarProduto: editarProduto,
    listarProdutos: listarProdutos
}