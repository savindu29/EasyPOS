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
    const order = orders.find((e)=>id==e.orderId);
    if(order!==undefined){
        //load model
        $('#model-button').click()
    }
}