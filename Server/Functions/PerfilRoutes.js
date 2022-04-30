const dboperations = require('../dboperations');
const jwt = require('jsonwebtoken');

const Perfil = require('../Classes/Perfil');


// Rota listarProdutos
const mostrarPerfil = async(request, response) => {
    try {
        const token = request.headers.authorization.split(" ")[1]

        //  Retorna um objeto com os dados do utilizador
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        request.user = await dboperations.finduser(decoded)
        console.log(request.user)
        if (request.user[0]) {
            const newPerfil = new Perfil(request.user[0].nome, request.user[0].email, request.user[0].contacto)
            response.status(201).json(newPerfil)
        } else response.status(404).json("Não existe este utilizador!")
    } catch (Error) {
        response.status(404).send({ message: "Nao autorizado" })
    }
}



module.exports = {
    mostrarPerfil: mostrarPerfil,

}