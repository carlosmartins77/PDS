const multer = require('multer')
const jwt = require('jsonwebtoken');
const dboperations = require('../dboperations');
const path = require('path')

const Candidacy = require('../Classes/Candidacy');
const Category = require('../Classes/Category');
const { Parser } = require('tedious/lib/token/token-stream-parser');
const { criarCategoriaLoja, newCandidacy, newCandidacyCourier } = require('../dboperations');


const uploadimages = async(req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
            //  Retorna um objeto com os dados do utilizador
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        let idstore = req.params.id
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao == 2) {
            let filename = '';
            let storage = multer.diskStorage({
                destination: function(req, file, cb) {
                    cb(null, './Documents/Documents_store')
                },
                filename: function(req, file, cb) {
                    filename = file.originalname
                    cb(null, token + '--' + idstore + '--' + filename)
                }
            })
            const upload = multer({ storage: storage }).single('file')

            upload(req, res, function(err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).json(err)
                } else if (err) {
                    return res.status(500).json(err)
                }
                res.status(200).send({ documento: filename, lojaid: idstore })
            });
        }
    } catch (error) {
        res.status(403).send("Nao autorizado!")
    }
}

const novaLoja = async(req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
            //  Retorna um objeto com os dados do utilizador
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao == 2) {
            // Id, Name, Address, Nif, Category, Approval, Doc
            const cand = new Candidacy(req.body.adminloja, "", req.body.morada, req.body.nif, req.body.categoria, "", req.body.filename)
            dboperations.newCandidacy(cand, token).then(result => {
                console.log(result)
                res.status(200).send({
                    idLoja: 0,
                    morada: cand.adress,
                    nif: cand.nif,
                    adminloja: cand.id,
                    categoria: cand.category
                })
            })
        }
    } catch (error) {
        res.status(403).send("Nao autorizado!")
    }
}

const novoEstafeta = async(req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
            //  Retorna um objeto com os dados do utilizador
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao == 3) {
            // Id, Doc
            const cand = new Candidacy(req.body.utilizadorId, "", req.body.filename)
            dboperations.newCandidacy(cand, token).then(result => {
                console.log(result)
                res.status(200).send({
                    idEstafeta: 0,
                    utilizadorId: cand.id,
                })
            })
        }
    } catch (error) {
        res.status(403).send("Nao autorizado!")
    }
}

const approvestore = async(req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
            //  Retorna um objeto com os dados do utilizador
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao == 1) {
            // Id da loja se aprova ou nao
            console.log(req.body.idLoja, req.body.aprovacao)
            dboperations.approvestore(req.body.idLoja, req.body.aprovacao).then(result => {
                console.log(result)
                    // 1 PARA APROVADO
                    // 2 PARA NAO APROVADO
                let approve = "aprovado"
                if (result == 2) approve = "nao foi  aprovado"
                res.status(200).send(result);
            })
        }
    } catch (error) {
        res.status(403).send("Nao autorizado!")
    }
}

const approvecourier = async(req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
            //  Retorna um objeto com os dados do utilizador
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao == 1) {
            // Id do Estafeta se aprova ou nao
            console.log(req.body.idEstafeta, req.body.aprovacao)
            dboperations.approvestore(req.body.idEstafeta, req.body.aprovacao).then(result => {
                console.log(result)
                    // 1 PARA APROVADO
                    // 2 PARA NAO APROVADO
                let approve = "aprovado"
                if (result == 2) approve = "nao foi aprovado"
                res.status(200).send(result);
            })
        }
    } catch (error) {
        res.status(403).send("Nao autorizado!")
    }
}


const dowloadfiles = async(req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
            //  Retorna um objeto com os dados do utilizador
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao == 1) {
            // id loja
            dboperations.dowloadfiles(req.body.idLoja).then(result => {
                try {
                    let filePath = path.join(__dirname, "../Documents/Documents_store/" + result);
                    res.download(filePath);
                } catch (error) {
                    res.status(403).send("Nao autorizado!")
                }
            })
        }
    } catch (error) {
        res.status(403).send("Nao autorizado!")
    }
}

const removerCategoria = async(req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
            //  Retorna um objeto com os dados do utilizador
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao == 1) {
            dboperations.removerCategoria(req.body.nome).then(result => {
                if (result == true) {
                    res.status(200).send()
                } else {
                    res.status(404).send()
                }
            });
        }
    } catch (error) {
        res.status(403).send("Nao autorizado!")
    }
}


const novaCategoriaLoja = async(req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao == 1) {
            const cat = new Category(req.body.categoria)
            dboperations.novaCategoriaLoja(cat).then(result => {
                res.status(200).send({
                    idCategoria: 0,
                    categoria: cat.categoria
                })
            })
        }
    } catch (error) {
        res.status(403).send("Nao autorizado!")
    }
}

const alterarEstadoLoja = async(req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao == 2) {
            let estado = req.body.estado
            let id = req.body.idLoja
            dboperations.alterarEstadoLoja(id, estado).then(result => {
                res.status(200).send(result)
            })
        }
    } catch (error) {
        res.status(403).send("Nao autorizado!")
    }
}
const consultarHistoricoLojas = async(req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao == 2) {
            dboperations.consultarHistoricoLojas(req.body.idLoja).then(result => {
                res.status(200).send(result)
            })
        }
    } catch (error) {
        res.status(403).send("Nao autorizado!")
    }
}

module.exports = {
    uploadimages: uploadimages,
    novaLoja: novaLoja,
    novoEstafeta: novoEstafeta,
    dowloadfiles: dowloadfiles,
    approvestore: approvestore,
    approvecourier: approvecourier,
    removerCategoria: removerCategoria,
    novaCategoriaLoja: novaCategoriaLoja,
    approvecourier: approvecourier,
    alterarEstadoLoja: alterarEstadoLoja,
    consultarHistoricoLojas: consultarHistoricoLojas
}