const multer = require('multer')
const jwt = require('jsonwebtoken');
const dboperations = require('../dboperations');

const Candidacy = require('../Classes/Candidacy');
const { Parser } = require('tedious/lib/token/token-stream-parser');

const uploadimages = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        //  Retorna um objeto com os dados do utilizador
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        let idstore = req.params.id
        req.user = await dboperations.finduser(decoded)
        if (req.user[0].tipoPermissao == 2) {
            let filename = '';
            let storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, './Documents/Documents_store')
                },
                filename: function (req, file, cb) {
                    filename = file.originalname
                    cb(null, token + '--' + idstore + '--' + filename)
                }
            })
            const upload = multer({ storage: storage }).single('file')

            upload(req, res, function (err) {
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

const novaLoja = async (req, res) => {
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
                    categoria: cand.category})
            })
        }
    } catch (error) {
        res.status(403).send("Nao autorizado!")
    }
}

module.exports = {
    uploadimages: uploadimages,
    novaLoja: novaLoja
}