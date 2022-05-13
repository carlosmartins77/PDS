const dboperations = require('../dboperations');
const jwt = require('jsonwebtoken');

// Classes
const Product = require('../Classes/Product');
const Category = require('../Classes/Category');
const SubCategory = require('../Classes/SubCategory');

const { reset, restart } = require('nodemon');


// Para todas as rotas produto
const produto = async(request, response, next) => {
    try {
        const token = request.headers.authorization.split(" ")[1]
            //  Retorna um objeto com os dados do utilizador
        console.log("Produto: ", token)
            //  Retorna um objeto com os dados do utilizador
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
        let product = new Product(0, request.body.name, request.body.quantity, request.body.price, request.body.hourRecoMin, request.body.hourRecoMax,
            request.body.image, request.body.lojaId, request.body.description, request.body.subCatProdId)

        dboperations.newProduct(product).then(result => {
            if (result) {
                response.status(201).send({ message: "Produto publicado" })
            } else {
                response.status(403).send({ message: "Produto nao publicado" })
            }
        })
    } catch (Error) {
        console.log("publicarProduto: ", Error)
    }
}

// Rota editarProduto
const editarProduto = (request, response) => {
    try {
        // Name, Quantity, Price, hourRecoMin, HourRecoMax, Image, lojaId, subCatProdId
        let product = new Product(request.body.id, request.body.name, request.body.quantity, request.body.price, request.body.hourRecoMin, request.body.hourRecoMax,
            request.body.image, request.body.lojaId, request.body.subCatProdId)
        console.log("Produto a editar", product)

        dboperations.editProduct(product, request.body.id).then(result => {
            if (result) {
                response.status(201).send(product)
            }
        })
    } catch (Error) {
        response.send(404).send("Not Found")
    }
}

// Rota listarProdutos
const listarProdutos = async(request, response) => {
    try {
        dboperations.listProduct().then(result => {
            response.status(200).send(result);
        })
    } catch (Error) {
        response.status(403).send()
    }
}

const novaCategoriaProduto = async(req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao == 1) {
            const cat = new Category(req.body.categoria)

            dboperations.novaCategoriaProduto(cat).then(result => {
                if (result == true) {

                    res.status(200).send({
                        idCategoria: 0,
                        categoria: cat.categoria
                    })
                } else {
                    res.status(401).send({
                        message: "Erro ao inserir categoria"
                    })
                }

            })
        }
    } catch (error) {
        res.status(403).send("Nao autorizado!")
    }
}

const novaSubCategoriaProduto = async(req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao == 1) {

            const cat = new SubCategory(req.body.subcategoria, req.body.categoria)
                //console.log(cat)

            dboperations.novaSubCategoriaProduto(cat).then(result => {
                if (result == true) {

                    res.status(200).send({
                        subcategoria: cat.subcategoria,
                        categoria: cat.categoria
                    })
                } else {
                    res.status(401).send({
                        message: "Erro ao inserir subcategoria"
                    })
                }
            })
        }
    } catch (error) {
        res.status(403).send("Nao autorizado!")
    }
}

const removerCategoriaProduto = async(req, res) => {
    try {
        //console.log(req.body.nome)
        dboperations.removerCategoriaProduto(req.body.nome).then(result => {
            //console.log("result: " + result)
            if (result == true) {
                res.status(200).send()
            } else {
                res.status(405).send(String(result))
            }
        })
    } catch (error) {
        response.status(403).send()
    }
}

module.exports = {
    produto: produto,
    publicarProduto: publicarProduto,
    editarProduto: editarProduto,
    listarProdutos: listarProdutos,
    removerCategoriaProduto: removerCategoriaProduto,
    novaCategoriaProduto: novaCategoriaProduto,
    novaSubCategoriaProduto: novaSubCategoriaProduto
}