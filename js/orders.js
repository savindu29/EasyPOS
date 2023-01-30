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
    $('tbody').html(rowData);
}
const showDetails=(id)=>{

}