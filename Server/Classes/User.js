class User{
    constructor(Name, Password, Email, Contact, Nif, Permission){
        this.name = Name; 
        this.password = Password;
        this.email = Email;
        this.contact = Contact;
        this.nif = Nif;
        this.permission = Permission;
    }
}

module.exports = User;