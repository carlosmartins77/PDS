const express = require('express')
const app = express()
const dotenv = require('dotenv').config();
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const dboperations = require('./dboperations');
const jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);
app.use(express.json());

router.use('/verificartoken', async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]

            //  Retorna um objeto com os dados do utilizador
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

            req.user = await dboperations.finduser(decoded)
            next()
        } catch (error) {
            console.log(error)
            res.status(401).json({ message: "User not authorized" })
            return
        }
    }
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" })
        return
    }
})

router.route('/verificartoken/token').get((req, res) => {
    nome = req.user[0].email
    res.send(nome)
})

router.route('/login').post(async (req, res) => {
    const email = req.body.email
    const status = await dboperations.loginUser(email)
    console.log(status)
    if (status == true) {
        const accessToken = generateAcessToken(email)
        res.json({ token: accessToken })
    } else res.json("Nao possui registo!! ")
})

function generateAcessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}

app.listen(4000, function (err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", 4000);
})