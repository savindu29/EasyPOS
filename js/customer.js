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
        setTableData();
    }
}
function setTableData(){
    let searchText =$('#search').val().toLowerCase();

    htmlData = '';
    customers.forEach(data=>{
        if(data.id.toLowerCase().includes(searchText)
            ||data.name.toLowerCase().includes(searchText)
            ||data.address.toLowerCase().includes(searchText)){
            htmlData +=`<tr>
<td>${data.id}</td>
<td>${data.name}</td>
<td>${data.address}</td>
<td>${data.salary}</td>
<td>
<button onclick="loadUpdateModel('${data.id}','${data.name}','${data.address}','${data.salary}')" class="btn btn-success btn-sm col-3">Update</button> | 
<button onclick="deleteCustomer('${data.id}')" class="btn btn-danger btn-sm col-3">Delete</button> 
</td>
</tr>`
        }


    });
    $('#table-body').html(htmlData);
}
function deleteCustomer(id){
    if(confirm('Are you Sure?')){
        for (let tempId=0;tempId<customers.length;tempId++){
            if(customers[tempId].id===id){
                customers.splice(tempId,1);
                localStorage.setItem('customers',JSON.stringify(customers));
                launchModel('Deleted!','Customer Deleted!')
                setTableData();
                return;
            }
        }
    }

}
function saveCustomer(){
    let customer = new Customer(
        $('#customer-id').val(),
        $('#customer-name').val(),
        $('#customer-address').val(),
        Number($('#customer-salary').val())
    );

    if(customers.find(data=>customer.id===data.id)===undefined){
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
let tempCustomerId=0;
const loadUpdateModel =(id,name,address,salary)=>{
    tempCustomerId = id;
    $('#update-customer-id').val(id);
    $('#update-customer-name').val(name);
    $('#update-customer-address').val(address);
    $('#update-customer-salary').val(salary);
    $('#update-model-btn').click();
}
function updateCustomer(){
    for (let tempId=0;tempId<customers.length;tempId++){
        if(customers[tempId].id===tempCustomerId){
           customers[tempId].name= $('#update-customer-name').val();
           customers[tempId].address= $('#update-customer-address').val();
           customers[tempId].salary= Number($('#update-customer-salary').val());
            localStorage.setItem('customers',JSON.stringify(customers));
            $('#update-close').click();
            launchModel('Updated!','Customer Updated!');
            setTableData();
            return;
        }
    }
}