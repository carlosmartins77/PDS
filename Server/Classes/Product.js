class Produtc{
        constructor(Name, Quantity, Price, HourRecoMin, HourRecoMax, Image, lojaId, subCatProdId){
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
