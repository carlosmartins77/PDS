const dboperations = require('../dboperations');
const jwt = require('jsonwebtoken');

// Classes
const Product = require('../Classes/Product');
const { decode } = require('jsonwebtoken');

// Para todas as rotas produto
const produto = async(request, response, next) => {
    try {
        const token = request.body.token
            //  Retorna um objeto com os dados do utilizador
        console.log("email")
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
            else response.status(404).send("Not Found")
        })
    } catch (Error) {
        console.log("publicarProduto: ", Error)
    }
}

// Rota editarProduto
const editarProduto = (request, response) => {
    try {
        let product = new Order(request.body.id, request.body.name_product, request.body.quantity_product, request.body.image_product)
        console.log("Produto a editar", product)

        dboperations.editProduct(product).then(result => {
            if (result) {
                response.status(201).send("Editado com sucesso!")
            } else response.status(404).send("Not Found")
        })
    } catch (Error) {
        console.log("editarProduto: ", Error)
    }
}

// Rota listarProdutos
const listarProdutos = async(request, response) => {
    try {
        const token = request.body.token
            //  Retorna um objeto com os dados do utilizador
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        request.user = await dboperations.finduser(decoded)
        if (request.user[0]) {
            dboperations.listProduct().then(result => {
                response.status(200).send(result);
            })
        }
        return
    } catch (Error) {
        console.log("listarProdutos: ", Error)
    }
}

module.exports = {
    produto: produto,
    publicarProduto: publicarProduto,
    editarProduto: editarProduto,
    listarProdutos: listarProdutos
}