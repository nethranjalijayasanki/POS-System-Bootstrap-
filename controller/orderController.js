import {customer_array,itemArray,order_array,orderDetail_array} from "../db/database";
import CustomerModel from "../model/customerModel.js";
import ItemModel from "../model/itemModel.js";
import {OrderHistoryModel} from "../model/orderHistoryModel.js";
import OrderModel from "../model/orderModel.js";



export function loadItems(){

    $("#O_itemName").empty();
    itemArray.map((item,number) =>{

        let data = `<option>${item.itemName}</option>`

        console.log(data);
        $("#O_itemName").append(data);

    })
}
    $("#O_itemName").on('input', function (){

    let name = $(this).val();
    let itemCode = itemArray.findIndex(item => item.itemName === name);

    if(itemCode !== -1 ){
        console.log(itemCode);
        $("#O_unitPrice").val(itemArray[itemCode].UnitPrice);
        $("#availableQuantity").val(itemArray[itemCode].Quantity);

    }else{
        $("#O_unitPrice").val("");
        $("#availableQuantity").val("");
    }
});

export function loadCustomers() {

    $("#customerNIC").empty();
    customer_array.map((item, number) => {

        let data = ` <option>${item.nic}</option>`

        console.log(data);
        $("#customerNIC").append(data);

    })
}
    $("#customerNIC").on('input', function (){

    let cus_nic = $(this).val();
    let customerCode = customer_array.findIndex(item => item.nic === cus_nic);

    if(customerCode !== -1 ){
        console.log(customerCode);
        $("#customerName").val(customer_array[customerCode].name);

    }else{
        $("#customerName").val("");
    }

});

$("#addItemButton").on('click', function() {
    let orderId = generateOrderId();
    let orderItemName = $('#O_itemName').val();
    let orderItemPrice = parseFloat($("#O_unitPrice").val()) ;
    let availableQty =  parseInt($('#availableQuantity').val());
    let orderQty = parseFloat($("#O_quantity").val()) ;
    let total = orderItemPrice * orderQty;
    document.querySelector("#netBalance").innerText = total.toFixed(2);


    if(orderQty > availableQty){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Not enough quantity!",
        });
    }else if(orderId.length===0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Order Id!",
        });
    }else if(orderItemName.length===0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Item Name!",
        });
    }else if(isNaN(orderItemPrice) || orderItemPrice <= 0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Item Price!",
        });
    }else if(isNaN(availableQty) || availableQty <= 0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid  Available Qty!",
        });
    }else if(isNaN(orderQty) || orderQty <= 0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Order Qty!",
        });
    }else if(isNaN(total) || total <= 0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Total!",
        });
    }else {
        let orderItem = new orderItemModel(
            orderId,
            orderItemName,
            orderItemPrice,
            availableQty,
            orderQty,
            total
        );
        orderDetail_array.push(orderItem);
        console.log(orderDetail_array);
        loadOrderItemTable(orderId);
        updateItemArray();
        calculateOverallTotal(orderId);
    }
});
const clearOrderItemTable = () => {
    $("#cartTableBody").empty();
};
const loadOrderItemTable = (orderId) => {
    $("#cartTableBody").empty();
    let filteredItems = orderDetail_array.filter(item => item.orderId === orderId);

    filteredItems.forEach(orderItem_object => {
        let data = `<tr>
            <td>${orderItem_object.itemName}</td>
            <td>${orderItem_object.unitPrice}</td>
            <td>${orderItem_object.quantity}</td>
            <td>${(orderItem_object.unitPrice * orderItem_object.quantity).toFixed(2)}</td> 
        </tr>`
        $("#cartTableBody").append(data);
    });
};
function calculateOverallTotal(orderId) {
    // Ensure orderId is a string for matching consistency
    orderId = String(orderId);

    // Filter items with the specified orderId and sum their _total values
    let orderTotal = orderDetail_array
        .filter(item => item.orderId === orderId)
        .reduce((accumulator, item) => {
            return accumulator + (item._total || 0); // Make sure _total has a numeric value or default to 0
        }, 0);

    document.querySelector("#netBalance").innerText = orderTotal.toFixed(2); // Display result with two decimal points
}

$(document).ready(function (){
    $("#orderId").val(generateOrderId());
})
let generateOrderId = function generateOrderId(){

    let id = order_array.length + 1;
    return "O00" + id;
}

let setOrderId = () => {
    $("#orderId").val(generateOrderId());
}

$('#placeOrderButton').on('click',function (){
    let orderId = generateOrderId();
    let data = $("#orderDate").val();
    let orderCustomerId = $("#customerNIC").val();
    let orderItemId = $("#O_itemName").val();
    let orderQty = parseFloat($("#O_quantity").val()) ;
    let total = parseFloat(document.querySelector("#netBalance").innerText) ;

    if (!orderId) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Order Id!",
        });
    } else if (!data) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Date!",
        });
    } else if (!orderCustomerId) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Customer Id!",
        });
    } else if (!orderItemId) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Item Id!",
        });
    } else if (isNaN(orderQty) || orderQty <= 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Order Quantity!",
        });
    } else if (isNaN(total) || total <= 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Total Amount!",
        });
    }else {
        let order = new OrderModel(
            orderId,
            data,
            orderCustomerId,
            orderItemId,
            orderQty,
            total
        )
        order_array.push(order);
        clearOrderForm();
        setOrderId();
        clearOrderItemTable();
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Place Order Successful",
            showConfirmButton: false,
            timer: 1500
        });
    }
})
function updateItemArray() {
    let item_code = $("#O_itemName").val();
    let qtyOnHand = parseInt($("#availableQuantity").val());
    let qty = parseInt($("#O_quantity").val());

    // Log the values for debugging
    console.log("Item Code:", item_code);
    console.log("Quantity on Hand:", qtyOnHand);
    console.log("Quantity Ordered:", qty);

    // Find the item in the array
    let item = itemArray.find(item => item._itemId === item_code);

    // Check if item exists
    if (item) {
        item._Quantity = qtyOnHand - qty;
        console.log("Updated Item:", item);
    } else {
        console.error(`Item not found in itemArray for code: ${item_code}`);
    }
}