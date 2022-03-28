const dboperations = require('../dboperations');
const jwt = require('jsonwebtoken');

const Perfil = require('../Classes/Perfil');


// Rota listarProdutos
const mostrarPerfil = (request, response) => {
    try {
        const token = request.body.token

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        // Comparar o token com o username
        if (decoded === request.body.username) {
            dboperations.mostrarPerfil(request.body.username).then(result => {
                if (!!result) {
                    const newPerfil = new Perfil(result.nome, result.email, result.contacto)
                    response.status(201).json(newPerfil)}
                else response.status(404).json("Não existe este utilizador!")
            })
        }else  response.status(404).json("Não existe este utilizador!")
    } catch (Error) {
        console.log("mostrarPerfil: ", Error)
    }
}

module.exports = {
    mostrarPerfil: mostrarPerfil
}