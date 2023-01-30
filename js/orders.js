let orders=[];
const initOrder=()=>{
    let tempData = JSON.parse(localStorage.getItem('orders'));
    if(tempData!==null){
        orders=tempData;
        setTableData();
    }
}
function setTableData(){
    let rowData ='';
    orders.forEach(response=>{
        rowData+=`<tr>
        <td>${response.orderId}</td>
        <td>${response.date}</td>
        <td>${response.total}</td>
        <td><button class="btn btn-sm btn-primary" onclick="showDetails('${response.orderId}')">Show Details</button></td>
        </tr>`;
    });
    $('#table').html(rowData);
}
const showDetails=(id)=>{
    const customers = JSON.parse(localStorage.getItem('customers'));
    const order = orders.find((e)=>id==e.orderId);
    const customer = customers.find((e)=>order.customer===e.id);
    if(order!==undefined){
        //load model

        //load table one data
        $('#order-id').html(order.orderId);
        $('#total-cost').html(order.total);
        $('#date').html(order.date);
        $('#customer-id').html(order.customer);
        $('#customer-name').html(customer.name);
        console.log(order);

        let rowData='';
        order.OrderItems.forEach(response=>{

            rowData+=`<tr>
            <td>${response.code}</td>
            <td>${getItemDescription(response.code)}</td>
            <td>${response.unitprice}</td>
            <td>${response.qty}</td>
            <td>${response.total}</td>
        </tr>`
        });
        $('#model-table-body').html(rowData)





        $('#model-button').click();
    }
}
function getItemDescription(code){
    const items = JSON.parse(localStorage.getItem('items'));
    const itemCode = items.find((e)=>code==e.code);
    return itemCode.description;
}