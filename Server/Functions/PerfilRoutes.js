const dboperations = require('../dboperations');

// Rota listarProdutos
const mostrarPerfil = (request, response) => {
    try {
        console.log("mostra", request.body.username)
        dboperations.mostrarPerfil(request.body.username).then(result => {
            if (!!result) response.status(200).json(result)
            else response.status(404).json("Não existe este utilizador!")
        })
    } catch (Error) {
        console.log("mostrarPerfil: ", Error)
    }
}

module.exports = {
    mostrarPerfil: mostrarPerfil
}