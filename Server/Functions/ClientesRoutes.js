const jwt = require('jsonwebtoken');
const dboperations = require('../dboperations');
const path = require('path');
const { request } = require('http');

const cliente = async(req, res, next) => {
    let token
    try {
        token = req.headers.authorization.split(" ")[1]

        //  Retorna um objeto com os dados do utilizador
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao === 3) {
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

const listarProdutosClientes = async(req, res) => {
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

const adicionarCarrinho = async(req, res) => {
    try {
        token = req.headers.authorization.split(" ")[1]

        //  Retorna um objeto com os dados do utilizador
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao === 3) {
            dboperations.adicionarCarrinho(req.body.clienteId).then(result => {
                console.log(result)
                if (result == true) {
                    res.status(201).send({ message: "Inserido com sucesso!" })
                } else res.status(403).send({ message: "ERRO!" })
            })
        }
    } catch (error) {
        res.status(403).send("Nao autorizado!")
    }
}

const removerCarrinho = async(req, res) => {
    try {
        token = req.headers.authorization.split(" ")[1]

        //  Retorna um objeto com os dados do utilizador
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao === 3) {
            dboperations.removerCarrinho(req.body.idCarrinhoDeCompras).then(result => {
                console.log(result)
                if (result == true) {
                    res.status(201).send({ message: "Removido com sucesso!" })
                } else res.status(403).send({ message: "ERRO!" })
            })
        }
    } catch (error) {
        res.status(403).send("Nao autorizado!")
    }
}

const listarCarrinho = async(req, res) => {
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
        } else {
            res.status(403).send("Nao autorizado!")
        }
    } catch (error) {
        res.status(403).send("Nao autorizado!")
    }
}

const getMedalhas = async(req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao === 3 || req.user[0].tipoPermissao === 1) {
            dboperations.getMedalhas(req.body.clienteId).then(result => {
                res.status(200).send(result)
            })
        } else {
            res.status(403).send("Nao autorizado!")
        }
    } catch (error) {
        res.status(403).send("Não autorizado!")
    }
}

const verEncomendas = async(req, res) => {
    try {
        token = req.headers.authorization.split(" ")[1]

        //  Retorna um objeto com os dados do utilizador
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao === 3) {
            dboperations.verEncomendas(req.user[0].idUtilizador).then(result => {
                console.log(result)
                res.status(200).send(result)
            })
        } else {
            res.status(403).send("Nao autorizado!")
        }
    } catch (error) {
        res.status(403).send("Nao autorizado!")
    }
}

const publicarEncomenda = async(req, res) => {
    try {
        token = req.headers.authorization.split(" ")[1]
        //  Retorna um objeto com os dados do utilizador
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao === 3) {
            //let id_Cliente = await dboperations.retornaCliente(req.user[0].idUtilizador)
//
            //console.log(id_Cliente)

            dboperations.publicarEncomenda(req.body.numEncomenda, req.body.dataEncomenda, req.body.estado, req.body.valorTotal, req.body.lojaId, req.body.id_Cliente, req.body.estafetaId).then(result => {
                console.log(result)
                res.status(200).send({ message: 'Inserido com sucesso' })
            })
        } else {
            res.status(403).send("Nao autorizado!")
        }
    } catch (error) {
        res.status(403).send("Nao autorizado!")
    }
}

const cancelEncomenda = async(req, res) => {
    try {
        token = req.headers.authorization.split(" ")[1]

        //  Retorna um objeto com os dados do utilizador
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao === 3) {
            let cancel = await dboperations.cancelEncomenda(req.body.idEncomenda)

            if (cancel == true) {
                res.status(200).send({ message: 'Encomenda cancelada com sucesso' })
            } else {
                res.status(403).send({
                    message: "Nao autorizado!"
                })
            }
        }

    } catch (error) {
        res.status(403).send({
            message: "Nao autorizado!"
        })
    }

}

const acompanharEncomenda = async(req, res) => {
    try {
        token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao === 3) {
            dboperations.acompanharEncomenda(req.body.idEncomenda).then(result => {
                res.status(200).send({ message: 'Estado:' + result })
            })
        } else {
            res.status(403).send("Nao autorizado!")
        }
    } catch (error) {
        res.status(403).send("Não autorizado!")
    }
}

const filtrarLojasCategoria = async(req, res) => {
    try {
        token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao === 3) {
            dboperations.filtrarLojasCategoria(req.body.nomeCategoria).then(result => {
                res.status(200).send(result)
            })
        } else {
            res.status(403).send("Nao autorizado!")
        }
    } catch (error) {
        res.status(403).send("Não autorizado!")
    }
}

const filtrarProdutosCategoria = async(req, res) => {
    try {
        token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao === 3) {
            if ((req.body.nomeCategoria).length > 0 && (req.body.nomeSubCategoria).length > 0) {
                dboperations.filtrarProdutosCategoria(3, req.body.nomeCategoria, req.body.nomeSubCategoria).then(result => {
                    res.status(200).send(result)
                })
            } else if ((req.body.nomeCategoria).length > 0 && (req.body.nomeSubCategoria).length == 0) {
                dboperations.filtrarProdutosCategoria(2, req.body.nomeCategoria, req.body.nomeSubCategoria).then(result => {
                    res.status(200).send(result)
                })
            } else if ((req.body.nomeCategoria).length == 0 && (req.body.nomeSubCategoria).length > 0) {
                dboperations.filtrarProdutosCategoria(1, req.body.nomeCategoria, req.body.nomeSubCategoria).then(result => {
                    res.status(200).send(result)
                })
            }

        } else {
            res.status(403).send("Nao autorizado!")
        }
    } catch (error) {
        res.status(403).send("Não autorizado!")
    }
}

const editarPerfilLoja = async(req, res) => {
    try {
        // Utilizador
        let password = req.body.password
        let nome = req.body.nome
        let email = req.body.email
        let contacto = req.body.contacto
        let nif = req.body.nif

        // Loja
        let morada = req.body.morada
        let nifLoja = req.body.nifLoja
        let idLoja = req.body.idLoja

        token = req.headers.authorization.split(" ")[1]

        //  Retorna um objeto com os dados do utilizador
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao === 2) {
            dboperations.editarPerfilLoja(req.user[0].idUtilizador, idLoja, password, nome, email, contacto, nif, morada, nifLoja).then(result => {
                res.status(200).send({ message: 'Alterado com sucesso' })
            })
        } else {
            res.status(403).send("Nao autorizado!")
        }
    } catch (error) {
        res.status(403).send("Nao autorizado!")
    }
}
const editarPerfilCliente = async(req, res) => {
    try {
        // Cliente
        let dataNascimento = req.body.dataNascimento
        let pais = req.body.pais
        let localizacao = req.body.localizacao
        let idCliente = req.body.idCliente

        // Utilizador
        let password = req.body.password
        let nome = req.body.nome
        let email = req.body.email
        let contacto = req.body.contacto
        let nif = req.body.nif

        token = req.headers.authorization.split(" ")[1]

        //  Retorna um objeto com os dados do utilizador
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao === 3) {
            dboperations.editarPerfilCliente(req.user[0].idUtilizador, idCliente, password, nome, email, contacto, nif, dataNascimento, pais, localizacao).then(result => {
                res.status(200).send({ message: 'Alterado com sucesso' })
            })
        } else {
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
    listarCarrinho: listarCarrinho,
    getMedalhas: getMedalhas,
    verEncomendas: verEncomendas,
    publicarEncomenda: publicarEncomenda,
    cancelEncomenda: cancelEncomenda,
    acompanharEncomenda: acompanharEncomenda,
    filtrarLojasCategoria: filtrarLojasCategoria,
    filtrarProdutosCategoria: filtrarProdutosCategoria,
    editarPerfilLoja: editarPerfilLoja,
    editarPerfilCliente: editarPerfilCliente
}