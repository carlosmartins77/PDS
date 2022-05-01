const { response } = require("express")
const { request } = require("express")
const dboperations = require("../dboperations")
const jwt = require('jsonwebtoken');

const courier = async (request, response, next) => {
    try {
        console.log("TOU AQUIII")
        const token = request.headers.authorization.split(" ")[1];
        //  Retorna um objeto com os dados do admin
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        //request.use = await dboperations.finduser(decoded)
        // verificar se possui a loja onde pretende publicar o produto associado
        //request.admin = await dboperations.getStoreFromAdmin(request.body.email, request.body.idloja);
        //console.log("courier", request.body.email, request.body.idloja);
        //if(request.admin[0]) {
            //if (request.use[0].tipoPermissao == 2) next();
            next();
            //else response.status(403).send("Nao possui autorizacao1")
        /*} else {
            response.status(403).send("O estafeta nao existe");
        }*/
    } catch (Error) {
        response.status(403).send("Nao possui autorizacao");
    }
}

const changeState = async(request, response) => {
    try {
        let resp = await dboperations.getCourierState(request.body.idEstafeta);
        console.log("resposta estafeta ", resp);

        if (resp >= 0) {
            // chamar funcao enviando o novo estado -> updateCourierState(id, state)
            // altera o estado 1 - ativo, 0 - inativo
            resp = resp == 1 ? 0 : 1;
            console.log("resp->", request.body.idEstafeta, "|", resp)
            dboperations.updateCourierState(request.body.idEstafeta, resp)
            response.status(203).send("Estado alterado com sucesso!");
        } else
            response.status(404).send("Estafeta não encontrado");
    } catch (Error) {
        response.status(403).send("Não autorizado!");
    }
}

module.exports = {
    courier: courier,
    changeState: changeState
}