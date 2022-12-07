loadUserDetails=()=>{
    let userDetails =
        JSON.parse(localStorage.getItem('user'));
    $('.user-name').html(userDetails.name)
    $('#avatar').attr('src',userDetails.avatar)
}
setUi =(address)=>{
    if(address=='customer.html'){
        initializeCustomer();
    }
    $('#container').load(address);
}