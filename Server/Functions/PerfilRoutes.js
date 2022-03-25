const dboperations = require('../dboperations');

// Rota listarProdutos
const mostrarPerfil = (request, response) => {
    try {
        console.log("mostra", request.body.username)
        dboperations.mostrarPerfil(request.body.username).then(result => {
            response.json(result[0]);
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    mostrarPerfil: mostrarPerfil
}