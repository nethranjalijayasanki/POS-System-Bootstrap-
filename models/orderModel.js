export default class OrderModel{
   constructor(itemName,quantity,unitPrice,total) {
       this._itemName = itemName;
       this._quantity = quantity;
       this._unitPrice = unitPrice;
       this._total = total;
   }

    get itemName() {
        return this._itemName;
    }

    set itemName(value) {
        this._itemName = value;
    }

    get quantity() {
        return this._quantity;
    }

    set quantity(value) {
        this._quantity = value;
    }

    get unitPrice() {
        return this._unitPrice;
    }

    set unitPrice(value) {
        this._unitPrice = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }
}