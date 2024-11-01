
import OrderModel from "../models/OrderModel.js";
import {customer_array, item_array, order_array} from "../db/Database.js";
import CustomerModel from "../models/CustomerModel";
import {validAddress, validName} from "./CustomerController";



const loadOrderTable = () => {
    $("#orderTableBody").empty();
    order_array.map((item, index) => {
        console.log(item);
        let data = `<tr><td>${item.orderId}</td><td>${item.cusId}</td><td>${item.itemNameSelect}</td><td>${item.itemPrice}</td><td>${item.quantity}</td><td>${item.total}</td></tr>`
        $("#orderTableBody").append(data);
    })
}

const clearOrderForm  = () => {
    $('#orderId').val("");
    $('#cusId').val("")
    $('#itemNameSelect').val("");
    $('#itemPrice').val("");
    $('#quantity').val("");
}

let selected_order_index = null;

// Add Order Button
$("#order_add_btn").on("click", function() {
    let orderId = $('#orderId').val(); // empty
    let cusId = $('#cusId').val(); // empty
    let itemNameSelect = $('#itemNameSelect').val(); // empty, format
    let itemPrice = $('#itemPrice').val(); // empty, format
    let quantity = $('#quantity').val(); // empty

        let order = new OrderModel(
            order_array.length + 1,
            orderId,
            cusId,
            itemNameSelect,
            itemPrice,
            quantity
        );
        order_array.push(order);

        // clean order form
        clearOrderForm();

        loadOrderTable();

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Order Added Successfully",
            showConfirmButton: false,
            timer: 1500
        });
});


$('#orderTableBody').on('click', 'tr', function () {
    // get tr index
    let index = $(this).index();

    selected_order_index = $(this).index();

    // get order object by index
    let order_obj = order_array[index];

    // get order's data
    let orderId = order_obj.orderId;
    let cusId = order_obj.cusId;
    let itemNameSelect = order_obj.itemNameSelect;
    let itemPrice = order_obj.itemPrice;
    let quantity = order_obj.quantity;

    // fill data into the form
    $('#orderId').val(orderId);
    $('#cusId').val(cusId)
    $('#itemNameSelect').val(itemNameSelect);
    $('#itemPrice').val(itemPrice);
    $('#quantity').val(quantity);
});



$('#order_update_btn').on('click', function () {

    let index = selected_order_index;

    let orderId = $('#orderId').val();
    let cusId = $('#cusId').val();
    let itemNameSelect = $('#itemNameSelect').val();
    let itemPrice = $('#itemPrice').val();
    let quantity = $('#quantity').val();

        let order = new OrderModel(
            order_array[index].id,
            orderId,
            cusId,
            itemNameSelect,
            itemPrice,
            quantity
        );
        // update order
        order_array[selected_order_index] = order;

        // clean order form
        clearOrderForm();

        // reload the table
        loadOrderTable();

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "order Updated Successfully",
            showConfirmButton: false,
            timer: 1500
        });
});



$("#order_delete_btn").on('click', function () {


    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {

            // ==========================================================
            order_array.splice(selected_order_index, 1);

            // clean order form
            clearOrderForm();

            // reload the table
            loadOrderTable();
            // ==========================================================

            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your order has been deleted.",
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });

});
