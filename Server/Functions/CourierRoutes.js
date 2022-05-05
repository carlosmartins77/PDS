const { response } = require("express")
const { request } = require("express")
const dboperations = require("../dboperations")
const jwt = require('jsonwebtoken');

const courier = async (request, response, next) => {
    try {
        const token = request.headers.authorization.split(" ")[1];
        //  Retorna um objeto com os dados do admin
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // verifica se o estafeta existe
        request.courier = await dboperations.getCourierState(decoded);
        //console.log("courier", request.body.email, request.body.idloja);
        if(request.courier) {
            next();
        } else {
            response.status(403).send("O estafeta nao existe");
        }
    } catch (Error) {
        response.status(403).send("Nao possui autorizacao");
    }
}

const changeState = async(request, response) => {
    try {
        let resp = request.courier;

        if (resp) {
            resp = request.courier["estado"];
            // altera o estado 1 - ativo, 0 - inativo
            resp = resp == 1 ? 0 : 1;
            dboperations.updateCourierState(request.courier["idEstafeta"], resp)
            response.status(203).send("Estado alterado com sucesso!");
        } else
            response.status(404).send("Estafeta não encontrado");
    } catch (Error) {
        response.status(403).send("Não autorizado!");
    }
}

/* 
    Estados da encomenda
    - Em processamento (só altera se já estiver em processamento)
    - Em transporte
    - Entregue
*/
// altera o estado da encomenda no seguinte fluxo:
// Em processamento(estado inicial) -> Em transporte -> Entregue(último estado)
const changeStatus = async(request, response) => {
    try {
        let status = await dboperations.acompanharEncomenda(request.body.idEncomenda);

        if(status == "Em processamento") {
            dboperations.changeOrderStatus(request.body.idEncomenda, "Em transporte");
            response.status(203).send("Estado alterado com sucesso!");
            
        } else if(status == "Em transporte") {
            dboperations.changeOrderStatus(request.body.idEncomenda, "Entregue");
            response.status(203).send("Estado alterado com sucesso!");

        } else
            response.status("403").send("Não é possível alterar o estado da encomenda!");

    } catch (Error) {
        response.status(403).send("Não autorizado!");
    }
}

module.exports = {
    courier: courier,
    changeState: changeState,
    changeStatus: changeStatus
}