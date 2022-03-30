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
        req.user = await dboperations.finduser(decoded)
        if (req.user[0]) {
            let filename = '';
            let storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, './Images')
                },
                filename: function (req, file, cb) {
                    filename = file.originalname
                    // Id, Name, Address, Nif, Category, Approval, Doc
                    const cand = new Candidacy(req.headers.idadmin, "", req.headers.morada, req.headers.nif, req.headers.categoria, "", (Date.now() + '--' + filename).toString())
                    dboperations.newCandidacy(cand)
                    cb(null, Date.now() + '--' + filename)
                }
            })

            const upload = multer({ storage: storage }).single('file')

            upload(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).json(err)
                } else if (err) {
                    return res.status(500).json(err)
                }
                return res.status(200).send({ filename: filename })
            });
        }

    } catch (error) {
        res.status(403).send("Nao autorizado!")
    }
}

module.exports = {
    uploadimages: uploadimages
}