import {customer_array} from "../db/Database.js";

export default class OrderModel{
    constructor(orderId, cusId, itemNameSelect, itemPrice, quantity  ) {
        this._orderId = orderId;
        this._cusId = cusId;
        this._itemNameSelect = itemNameSelect;
        this._itemPrice = itemPrice;
        this._quantity = quantity;
    }

}