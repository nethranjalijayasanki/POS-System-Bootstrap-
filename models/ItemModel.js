

export default class ItemModel{
    constructor(id, itemName,quantity, description, price) {
        this._id=id;
        this._itemName=itemName;
        this._quantity=quantity;
        this._description=description;
        this._price=price;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
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

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }
}