const users=[{user:'savindu',password:"abcd", avatar: 'https://img.freepik.com/free-photo/bohemian-man-with-his-arms-crossed_1368-3542.jpg?w=740&t=st=1669642808~exp=1669643408~hmac=5ab465e8cdb75ff9f9d771792cbcf8346af0d45959cdbbaf26c5dca07e168315'},
    {user:'kamal',password: "1234",avatar:'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=996&t=st=1669642865~exp=1669643465~hmac=75dca52c3e62dc377588789e5b0f63a71ac84b0d301af921f01a78e11332af7e' }
]

const login=()=>{
    let userName =$('#userName').val();
    let password = $('#password').val();
    if(userName.trim().length!==0 ||password.trim().length!==0){
        for(tempUser of users){
            if(tempUser.user===userName){
                //checkPassword
                if(tempUser.password===password){
                    //login
                    localStorage.setItem("user",JSON.stringify({name:userName,avatar:tempUser.avatar}));
                    window.location.href="pages/dashboard.html"
                    return;
                }else{
                    alert("Password is wrong")
                    return;
                }
            }
        }
        alert("User name is incorrect")
        return;
    }else{
        alert("User Name and Password is required")
        return;
    }
}