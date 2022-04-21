const jwt = require('jsonwebtoken');
const dboperations = require('../dboperations');
const path = require('path')

const cliente = async (req, res, next) => {
    let token
    try {
        token = req.headers.authorization.split(" ")[1]

        //  Retorna um objeto com os dados do utilizador
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        req.user = await dboperations.finduser(decoded)
        console.log("Calho:", req.user)
        console.log("Calho:", req.user[0].tipoPermissao)
        if (req.user[0].tipoPermissao === 3) {
            console.log("what??")
            next()
        } else response.status(403).send("Nao possui autorizacao")
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "User not authorized" })
        return
    }
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" })
        return
    }
}

const listarProdutosClientes = async (req, res) => {
    try {
        token = req.headers.authorization.split(" ")[1]

        //  Retorna um objeto com os dados do utilizador
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao === 3) {
            dboperations.listarProdutosClientes().then(result => {
                console.log(result)
                res.status(200).send(result)
            })
        }
    } catch (error) {
        res.status(403).send("Nao autorizado!")
    }
}

const adicionarCarrinho = async (req, res) => {
    try {
        token = req.headers.authorization.split(" ")[1]

        //  Retorna um objeto com os dados do utilizador
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao === 3) {
            dboperations.adicionarCarrinho(req.body.clienteId).then(result => {
                console.log(result)
                if (result == true) {
                    res.status(201).send({message: "Inserido com sucesso!"})
                }else res.status(403).send({message: "ERRO!"})
            })
        }
    } catch (error) {
        res.status(403).send("Nao autorizado!")
    }
}

const removerCarrinho = async (req, res) => {
    try {
        token = req.headers.authorization.split(" ")[1]

        //  Retorna um objeto com os dados do utilizador
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao === 3) {
            dboperations.removerCarrinho(req.body.idCarrinhoDeCompras).then(result => {
                console.log(result)
                if (result == true) {
                    res.status(201).send({message: "Removido com sucesso!"})
                }else res.status(403).send({message: "ERRO!"})
            })
        }
    } catch (error) {
        res.status(403).send("Nao autorizado!")
    }
}

const listarCarrinho = async (req, res) => {
    try {
        console.log('listarCarrinho')
        token = req.headers.authorization.split(" ")[1]

        //  Retorna um objeto com os dados do utilizador
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao === 3) {
            dboperations.listarCarrinho(req.body.idCarrinhoDeCompras).then(result => {
                console.log(result)
                res.status(200).send(result)
            })
        }
        else 
        {
            res.status(403).send("Nao autorizado!")
        }
    } catch (error) {
        res.status(403).send("Nao autorizado!")
    }
}

module.exports = {
    listarProdutosClientes: listarProdutosClientes,
    adicionarCarrinho: adicionarCarrinho,
    removerCarrinho: removerCarrinho,
    listarCarrinho: listarCarrinho
}