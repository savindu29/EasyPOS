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

}

launchModel=(type,message)=>{
    $('#exampleModalLabel').html(type);
    $('.modal-body').html(message)
    $('#success-model').click();
}
const clearFields=()=>{
    $('#customer-id').val('');
    $('#customer-name').val('');
    $('#customer-address').val('');
    $('#customer-salary').val('');
}