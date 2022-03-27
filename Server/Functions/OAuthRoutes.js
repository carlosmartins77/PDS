const jwt = require('jsonwebtoken');
const dboperations = require('../dboperations');
const bcrypt = require('bcrypt');

const User = require('../Classes/User')

const verificartoken = async(req, res, next) => {
    let token
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
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" })
        return
    }
}

const token = (req, res) => {
    nome = req.user[0].email
    res.send(nome)
}

const login = async(req, res) => {
    try {
        let user = new User("", req.body.password, req.body.username, 0, 0, 0)
        console.log(user)
        const status = await dboperations.loginUser(user)
        console.log(status)
        if (status == true) {
            const accessToken = generateAcessToken(req.body.username)
            res.json({ token: accessToken })
        } else res.json("Nao possui registo!!")
    } catch (error) {
        res.status(401).send("erro ", error)
    }
}

function generateAcessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}


const registeruser = async(request, response) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(request.body.password, salt);
        console.log("Salt: " + salt);
        console.log("Password: " + hashedPassword);

        // Name, Password, Email, Contact, Nif, Permission
        let user = new User(request.body.name, hashedPassword, request.body.email, request.body.contact, request.body.nif, request.body.permission)
        console.log("registaruser: ", user)

        // Verificar se ja existe alguem com esse mail
        let newuser = await dboperations.finduser(request.body.email)
        console.log("novo: ", newuser)
        if (newuser.length == 0) {
            dboperations.registeruser(user)
            response.status(201).send("Registo efetuado")
        } else response.status(401).send("Ja possui um utilizador com esse email!")
    } catch (error) {
        console.log("register user", error);
    }
}

module.exports = {
    verificartoken: verificartoken,
    token: token,
    login: login,
    registeruser: registeruser
}