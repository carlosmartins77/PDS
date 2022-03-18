const Utilizador = require("./Utilizador.js");

class Loja extends Utilizador {
    constructor(Morada, NIF) {
        super(Id, Password, Nome, Email, Contacto)
        this.morada = Morada;
        this.nif = NIF;
    }
}

module.exports = Loja;