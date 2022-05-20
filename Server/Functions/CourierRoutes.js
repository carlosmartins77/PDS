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
            response.status(200).send({ message: "Estado alterado com sucesso!", status: resp});
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
            status = "Em transporte";
            dboperations.changeOrderStatus(request.body.idEncomenda, status);
            response.status(200).send({ message: "Estado alterado com sucesso!", idEncomenda: request.body.idEncomenda, status: status});
            
        } else if(status == "Em transporte") {
            status = "Entregue";
            dboperations.changeOrderStatus(request.body.idEncomenda, status);
            response.status(200).send({ message: "Estado alterado com sucesso!", idEncomenda: request.body.idEncomenda, status: status});

        } else
            response.status("403").send("Não é possível alterar o estado da encomenda!");

    } catch (Error) {
        response.status(403).send("Não autorizado!");
    }
}

const verEncomenda = async(req, res) => {
    try {
        token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao === 3) {
            dboperations.verEncomenda(req.body.idEncomenda).then(result => {
                res.status(200).send(result)
            })
        } else {
            res.status(403).send("Nao autorizado!")
        }
    } catch (error) {
        res.status(403).send("Não autorizado!")
    }
}

const getState = async(req, res) => {
    try {
        token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao === 3) {
            dboperations.getState(req.body.utilizadorId).then(result => {
                res.status(200).send(result)
                console.log(result)
            })
        } else {
            res.status(403).send("Nao autorizado!")
        }
    } catch (error) {
        res.status(403).send("Não autorizado!")
    }
}

module.exports = {
    courier: courier,
    changeState: changeState,
    changeStatus: changeStatus,
    verEncomenda: verEncomenda,
    getState: getState
}