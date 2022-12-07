loadUserDetails=()=>{
    let userDetails =
        JSON.parse(localStorage.getItem('user'));
    $('.user-name').html(userDetails.name)
    $('#avatar').attr('src',userDetails.avatar)
}
setUi =(address)=>{
    $('.container').load(address);
}