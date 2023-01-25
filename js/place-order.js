let items=[];
let customers=[];
let cartData =[];
const loadData =()=>{
    //set Order Id
    let id = generateOrderId();


    //set date
    let date = new Date().toISOString().split('T')[0];
    $('#date').html(date)

    // load items codes
    let tempItemData = JSON.parse(localStorage.getItem('items'));
    if(tempItemData!==null){
        items=tempItemData;
        let itemOption='';
        items.forEach(response=>{
            itemOption+=` <option  value="${response.code}">${response.code}</option>`
        });
        $('#item-code').append(itemOption);
    }
    // load customer ids
    let tempCustomerData = JSON.parse(localStorage.getItem('customers'));
    if(tempCustomerData!==null){
        customers=tempCustomerData;
        let customerOption='';
        customers.forEach(response=>{
            customerOption+=` <option  value="${response.id}">${response.id}</option>`
        });
        $('#customer-id').append(customerOption);
    }
}

$('#customer-id').change(()=>{
    setCustomerData();

});

$('#item-code').change(()=>{
    setItemData();

});

function setCustomerData(){
    let tempCustomerId = $('#customer-id').val();
    let tempCustomer = customers.find(response=>response.id==tempCustomerId);
    $('#name').val(tempCustomer.name);
    $('#address').val(tempCustomer.address);
    $('#salary').val(tempCustomer.salary);
}

function setItemData(){
    let tempItemCode = $('#item-code').val();
    let tempItem = items.find(response=>response.code==tempItemCode);
    $('#description').val(tempItem.description);
    $('#unit-price').val(tempItem.price);
    $('#qty-on-hand').val(tempItem.qty);
}

function cart(code,description,unitPrice,qty,total){
    this.code = code;
    this.description = description;
    this.unitPrice = unitPrice;
    this.qty = qty;
    this.total = total;
}

function addToCart(){
     let qty = Number($('#qty').val());
     let unitPrice = Number($('#unit-price').val());
     let total = qty*unitPrice;
     let rowNumber = isExists($('#item-code').val());

     if($('#qty-on-hand').val()<qty){
        launchMessage("error","Please Enter a valid Quantity");
        return;
     }

     if (rowNumber != -1) {
         let existsTotal = cartData[rowNumber].qty + qty;
        if(existsTotal>$('#qty-on-hand').val()){
            launchMessage("error","Please Enter a valid Quantity");
            return;
        }
         cartData[rowNumber].qty = existsTotal;
         cartData[rowNumber].total = cartData[rowNumber].total + total;
     } else {
         tempCartObject = new cart(
             $('#item-code').val(),
             $('#description').val(),
             unitPrice,
             qty,
             total
         );
         cartData.push(tempCartObject);
     }
     launchMessage("success","Added Successfully");
     setCartData();




}
function setCartData(){
    let rows =``;
    cartData.forEach(response=>{
        rows+=`<tr>
<td>${response.code}</td>
<td>${response.description}</td>
<td>${response.unitPrice}</td>
<td>${response.qty}</td>
<td>${response.total}</td>
<td><button class="btn btn-danger btn-sm" onclick="#">Remove</button></td>
</tr>`
    });
    $('#table').html(rows);
    calculateTotal();
}
const calculateTotal =()=>{
    let netTotal = 0;
    cartData.forEach(response=>{
        netTotal+=response.total;
    });
    $('#total').html(netTotal);
}
const isExists=(code)=>{
    for (let i = 0; i < cartData.length; i++) {
        if(cartData[i].code==code){
            return i;
        }

    }
    return -1;
}
launchMessage=(type,message)=>{
    if(type=="error") {
        $('#warning-alert').html(message)
        $('#warning-model').click();
    }else if(type=="success"){
        $('#success-alert').html(message)
        $('#success-model').click();
    }
}
const generateOrderId=()=>{
    let tempOrderData   = JSON.parse(localStorage.getItem('orders'));
    if(tempOrderData!==null) {
        let lastOrderId = tempOrderData[tempOrderData.length - 1].orderId;
        let splitValue = lastOrderId.toString().split('-')[1];

        $('#order-id').html('D-'+(Number(splitValue) + 1));
    }else{
        $('#order-id').html('D-'+1);

    }
}
function  Order(orderId,date,total,customer,OrderItems){
    this.orderId = orderId;
    this.date = date;
    this.total = total;
    this.customer = customer;
    this.OrderItems = OrderItems;

}
function OrderItem(code,qty,total){
    this.code= code;
    this.qty= qty;
    this.total= total;
}
function placeOrder(){
    if($('#name').val()==""){
        launchMessage("error","Please Select Customer");
        return;
    }
    tempOrderArr=[];
    let tempOrdersData = JSON.parse(localStorage.getItem('orders'));
    if(tempOrdersData!==null){
        tempOrderArr = tempOrdersData;
    }
    let orderItems=[];
    cartData.forEach(response=>{
        let item = new OrderItem(response.code,response.qty,response.total)
        orderItems.push(item)
    });

    let order = new Order(
        $('#order-id').html(),
        $('#date').html(),
        $('#total').html(),
        $('#customer-id').html(),
        orderItems);
    tempOrderArr.push(order)
    localStorage.setItem('orders',JSON.stringify(tempOrderArr));

    clearFields();
    clearTable();
    launchMessage("success","Order Placed Successfully!!!");
}
const  clearFields=()=>{
    generateOrderId();
    $('#customer-id').val('');
    $('#name').val('');
    $('#address').val('');
    $('#salary').val('');
    $('#item-code').val('');
    $('#description').val('');
    $('#unit-price').val('');
    $('#qty-on-hand').val('');
    $('#qty').val('');


}
const  clearTable=()=>{
    $('#table').html('');
}