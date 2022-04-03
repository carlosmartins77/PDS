class Produtc{
        constructor(Id,Name, Quantity, Price, HourRecoMin, HourRecoMax, Image, lojaId, subCatProdId){
        this.id = Id; 
        this.name = Name; 
        this.quantity = Quantity;
        this.price = Price;
        this.hourRecoMin = HourRecoMin;
        this.hourRecoMax = HourRecoMax;
        this.image = Image;
        this.lojaId = lojaId;
        this.subCatProdId = subCatProdId;
    }
}

module.exports = Produtc;
