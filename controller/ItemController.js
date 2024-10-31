
import ItemModel from "../models/ItemModel.js";
import {customer_array, item_array, order_array} from "../db/Database.js";
// regex
export const validName = (name) => {
    const nameRegex = /^[a-z][a-z '-.,]{0,31}$|^$/i;
    return nameRegex.test(name);
}
export const validQuantity = (qty) => {
    const quantityRegex = /^0$|^[1-9][0-9]*$/;
    return quantityRegex.test(qty);
}
export const validPrice = (price) => {
    const priceRegex = /^\d{0,5}(?!(\.|,)0{2})(\.|,)\d{1,2}$/;
    return priceRegex.test(price);
}

const loadItemTable = () => {
    $("#itemTableBody").empty();
    item_array.map((item, index) => {
        console.log(item);
        let data = `<tr><td>${item.itemName}</td><td>${item.quantity}</td><td>${item.description}</td><td>${item.price}</td></tr>`
        $("#itemTableBody").append(data);
    })
}
const clearItemForm  = () => {
    $('#itemName').val("");
    $('#qty').val("")
    $('#itemDescription').val("");
    $('#price').val("");
}

// selected item for update or delete
let selected_item_index = null;


// Add item Button
$("#item_add_btn").on("click", function() {

    let itemName = $('#itemName').val();
    let qty = $('#qty').val();
    let itemDescription = $('#itemDescription').val();
    let price = $('#price').val();

    if(!validName(itemName)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">check your item name</a>'
        });
    }
    else if(!validQuantity(qty)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">check your qty</a>'
        });
    }
    else if(itemDescription.length===0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">check your itemDescription</a>'
        });
    }
    else if(!validPrice(price)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">check your price</a>'
        });
    }
    else {
        let item = new ItemModel(
            item_array.length + 1,
            itemName,
            qty,
            itemDescription,
            price
        );


        item_array.push(item);

        // clean item form
        clearItemForm();

        loadItemTable();

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Item Added Successfully",
            showConfirmButton: false,
            timer: 1500
        });
    }
});


$('#itemTableBody').on('click', 'tr', function () {
    // get tr index
    let index = $(this).index();

    selected_item_index = $(this).index();

    // get item object by index
    let item_obj = item_array[index];

    // get item's data
    let itemName = item_obj.itemName;
    let qty = item_obj.quantity;
    let itemDescription = item_obj.description;
    let price = item_obj.price;

    // fill data into the form
    $('#itemName').val(itemName);
    $('#qty').val(qty)
    $('#itemDescription').val(itemDescription);
    $('#price').val(price);
});


// update item
$('#item_update_btn').on('click', function () {

    let index = selected_item_index;

    let itemName = $('#itemName').val();
    let qty = $('#qty').val();
    let itemDescription = $('#itemDescription').val();
    let price = $('#price').val();

    if(!validName(itemName)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">check your item name</a>'
        });
    }
    else if(!validQuantity(qty)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">check your qty</a>'
        });
    }
    else if(itemDescription.length===0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">check your itemDescription</a>'
        });
    }
    else if(!validPrice(price)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">check your price</a>'
        });
    }else {
        let item = new ItemModel(
            item_array[index].id,
            itemName,
            qty,
            itemDescription,
            price
        );
        item_array[selected_item_index] = item;

        // clean item form
        clearItemForm();

        // reload the table
        loadItemTable();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Item Updated Successfully",
            showConfirmButton: false,
            timer: 1500
        });
    }
});
