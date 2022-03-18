class Utilizador {
    constructor(Id, Password, Nome, Email, Contacto) {
        this.id = Id;
        this.password = Password;
        this.nome = Nome;
        this.email = Email;
        this.contacto = Contacto;
    }
}

module.exports = Utilizador;