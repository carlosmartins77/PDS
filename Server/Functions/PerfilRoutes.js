const dboperations = require('../dboperations');
const jwt = require('jsonwebtoken');

const Perfil = require('../Classes/Perfil');


// Rota listarProdutos
const mostrarPerfil = async (request, response) => {
    try {
        const token = request.headers.authorization.split(" ")[1]

        //  Retorna um objeto com os dados do utilizador
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        request.user = await dboperations.finduser(decoded)
        if (request.user[0]) {
                dboperations.mostrarPerfil(request.body.username).then(result => {
                    if (!!result) {
                        const newPerfil = new Perfil(result.nome, result.email, result.contacto)
                        response.status(201).json(newPerfil)
                    }
                    else response.status(404).json("Não existe este utilizador!")
                })
            } else response.status(404).json("Não existe este utilizador!")
    } catch (Error) {
       response.status(404).send()
    }
}

module.exports = {
    mostrarPerfil: mostrarPerfil
}