const { response } = require("express")
const { request } = require("express")
const dboperations = require("../dboperations")

const admin = async (request, response, next) => {
    try {
        //const token = request.headers.authorization.split(" ")[1]
        //  Retorna um objeto com os dados do admin
        //const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        //request.use = await dboperations.finduser(decoded)
        
        // verificar se possui a loja onde pretende publicar o produto associado
        request.admin = await dboperations.getStoreFromAdmin(request.body.email, request.body.idloja)
        console.log("admin", request.body.email, request.body.idloja)
        if(request.admin[0]) {
            //if (request.use[0].tipoPermissao == 2) next();
            next();
            //else response.status(403).send("Nao possui autorizacao1")
        } else {
            response.status(403).send("A loja nao existe")
        }
    } catch (Error) {
        response.status(403).send("Nao possui autorizacao2")
    }
}

const deleteStore = (request, response) => {
    try {
        console.log("route-delete")
        dboperations.deleteStore(request.body.idloja).then(result => {
            if (result) response.status(201).send("Store deleted with success!")
        })
    } catch (error) {
        response.status(403).send("Nao autorizado!")
    }
}

module.exports = {
    admin: admin,
    deleteStore: deleteStore
}