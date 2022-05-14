const { response } = require("express")
const { request } = require("express")
const dboperations = require("../dboperations")
const jwt = require('jsonwebtoken');

const adminStore = async(request, response, next) => {
    try {
        const token = request.headers.authorization.split(" ")[1]
            //  Retorna um objeto com os dados do admin
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            //request.use = await dboperations.finduser(decoded)
            // verificar se possui a loja onde pretende publicar o produto associado
        request.admin = await dboperations.getStoreFromAdmin(request.body.email, request.body.idloja)
        if (request.admin[0]) {
            //if (request.use[0].tipoPermissao == 2) next();
            next();
            //else response.status(403).send("Nao possui autorizacao1")
        } else {
            response.status(403).send("A loja nao existe")
        }
    } catch (Error) {
        console.log("error: ", Error)
        response.status(403).send("Nao possui autorizacao2")
    }
}

const adminCourier = async(request, response, next) => {
    try {
        const token = request.headers.authorization.split(" ")[1]
            //  Retorna um objeto com os dados do admin
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            //request.use = await dboperations.finduser(decoded)
        if (decoded) {
            //if (request.use[0].tipoPermissao == 2) next();
            next();
            //else response.status(403).send("Nao possui autorizacao1")
        } else {
            response.status(403).send("Nao possui autorizacao")
        }
    } catch (Error) {
        console.log("error: ", Error)
        response.status(403).send("Nao possui autorizacao")
    }
}

const deleteStore = (request, response) => {
    try {
        dboperations.deleteStore(request.body.idloja).then(result => {
            if (result) response.status(200).send({ message: "Store deleted with success!" })
        })
    } catch (error) {
        response.status(403).send("Nao autorizado!")
    }
}

const deleteCourier = (request, response) => {
    try {
        dboperations.deleteCourier(request.body.idEstafeta).then(result => {
            if (result) response.status(200).send({ message: "Courier deleted with success!" })
        })
    } catch (error) {
        response.status(403).send("Nao autorizado!")
    }
}

const atribiurMedalhas = async(req, res) => {
    try {
        token = req.headers.authorization.split(" ")[1]

        //  Retorna um objeto com os dados do utilizador
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao === 1) {
            let atribuir = await dboperations.atribiurMedalhas(req.body.idCliente)

            if (atribuir == true) {
                res.status(200).send({ message: 'Medalha(s) atribuida(s) com sucesso' })
            }
        }

    } catch (error) {
        res.status(403).send("Nao autorizado!")
    }

}

const getCategoria = async(request, response) => {
    try {
        dboperations.getCategoria(request.body.idCategoria).then(result, response => {
            response.status(200).send(result);
        })
    } catch (Error) {
        response.status(403).send()
    }
}

const getCategoriaProd = async(request, response) => {
    try {
        dboperations.getCategoriaProd(request.body.idCategoriaProd).then(result, response => {
            response.status(200).send(result);
        })
    } catch (Error) {
        response.status(403).send()
    }
}

module.exports = {
    adminStore: adminStore,
    adminCourier: adminCourier,
    deleteStore: deleteStore,
    deleteCourier: deleteCourier,
    atribiurMedalhas: atribiurMedalhas,
    getCategoria: getCategoria,
    getCategoriaProd: getCategoriaProd,
}