class Candidacy {
    constructor(Id, Name, Address, Nif, Category, Approval, Doc) {
        this.id = Id;
        this.name = Name;
        this.adress = Address;
        this.nif = Nif;
        this.category = Category;
        this.approval = Approval;
        this.doc = Doc;
    }
}

module.exports = Candidacy;
