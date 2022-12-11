let customers =[];
function Customer(id,name,address,salary){
    this.id=id;
    this.name =name;
    this.address = address;
    this.salary = salary;
}
initializeCustomer=()=>{
    let tempData = JSON.parse(localStorage.getItem('customers'));
    if(tempData!==null){
        customers=tempData;
        console.log(tempData)
    }
}
function setTableData(){
    htmlData = '';
    customers.forEach(data=>{
        htmlData +=`<tr>
<td>${data.id}</td>
<td>${data.name}</td>
<td>${data.address}</td>
<td>${data.salary}</td>
<td>
<button onclick="loadUpdateModel('${data.id}','${data.name}','${data.address}','${data.salary}')" class="btn btn-success btn-sm">Update</button> | 
<button class="btn btn-danger btn-sm">Delete</button> 
</td>
</tr>`

    });
    $('#table-body').html(htmlData);
}
function saveCustomer(){
    let customer = new Customer(
        $('#customer-id').val(),
        $('#customer-name').val(),
        $('#customer-address').val(),
        Number($('#customer-salary').val())
    );

    if(customers.find(data=>customer.id==data.id)==undefined){
        customers.push(customer);
        localStorage.setItem('customers',JSON.stringify(customers));
        clearFields();
        launchModel('success','Customer Saved');
    }else{
        launchModel('warning','Already Exists')
    }
    setTableData();

}

launchModel=(type,message)=>{
    $('#exampleModalLabel').html(type);
    $('#save-data-body').html(message)
    $('#success-model').click();
}
const clearFields=()=>{
    $('#customer-id').val('');
    $('#customer-name').val('');
    $('#customer-address').val('');
    $('#customer-salary').val('');
}
const loadUpdateModel =(id,name,address,salary)=>{
    $('#update-customer-id').val(id);
    $('#update-customer-name').val(name);
    $('#update-customer-address').val(address);
    $('#update-customer-salary').val(salary);
    $('#update-model-btn').click();
}