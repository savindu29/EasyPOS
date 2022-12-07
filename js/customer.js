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

    customers.push(customer);
    localStorage.setItem('customer',JSON.stringify(customers));
}