const Entidade = require("./Entidade.js");

class Cliente extends Entidade {
    constructor(DataNascimento, Pais, Localizacao, DistanciaRaio) {
        super(Id, Password, Nome, Email, Contacto);
        this.dataNascimento = DataNascimento;
        this.pais = Pais;
        this.localizacao = Localizacao;
        this.distanciaRaio = DistanciaRaio;
    }
}

module.exports = Cliente;