loadUserDetails=()=>{
    try {
        let userDetails =
            JSON.parse(localStorage.getItem('user'));
        $('.user-name').html(userDetails.name)
        $('#avatar').attr('src', userDetails.avatar);

    }catch (e){
        alert("something went wrong");
        window.location.reload('../src/index.html')
    }
}
