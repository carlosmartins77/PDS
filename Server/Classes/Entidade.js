class Entidade {
    constructor(Id, Password, Nome, Email, Contacto) {
        this.id = Id;
        this.password = Password;
        this.nome = Nome;
        this.email = Email;
        this.contacto = Contacto;
    }
}

class Cliente extends Entidade {
    constructor(DataNascimento, Pais, Localizacao, DistanciaRaio) {
        super(Id, Password, Nome, Email, Contacto);
        this.dataNascimento = DataNascimento;
        this.pais = Pais;
        this.localizacao = Localizacao;
        this.distanciaRaio = DistanciaRaio;
    }
}

class Loja extends Entidade {
    constructor(Morada, NIF) {
        super(Id, Password, Nome, Email, Contacto)
        this.morada = Morada;
        this.nif = NIF;
    }
}

class Estafeta extends Entidade {
    constructor(Estado) {
        super(Id, Password, Nome, Email, Contacto)
        this.estado = Estado;
    }
}


module.exports = Entidade;
module.exports = Cliente;
module.exports = Loja;
module.exports = Estafeta;