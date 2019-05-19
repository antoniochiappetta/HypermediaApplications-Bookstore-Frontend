var apiurl = "https://bookstore-hypermedia-be.herokuapp.com/api"
//var apiurl = "http://localhost:8080/api"

$("#sign-up").click(function(){

    let email = $("#inputEmailSignUp").val();
    let password1 = $("#inputPasswordSignUp").val();
    let password2 = $("#inputPasswordSignUpAgain").val();
    let name = $("#inputNameSignUp").val();
    let lastName = $("#inputLastNameSignUp").val();

    //NEEDS NAME & LAST NAME!

    if (password1 == password2){

        let user = {
            email: email,
            password: password1,
            name: name,
            lastName: lastName
        }
        console.log(user);

        var responseEV = $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            url: apiurl+"/user",
            async: false,
            data: user,
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            error: function(){
                alert("Something went wrong, please try again to Sign up");
            },
            success: function () {
                alert("Welcome on board!")
                //After sign up in general you're already logged in, so:

                var responseUS = $.ajax({
                    type: "POST",
                    contentType: "application/x-www-form-urlencoded",
                    url: apiurl+"/user/login",
                    data: {email: email, password: password1},
                    crossDomain: true,
                    xhrFields: {
                        withCredentials: true
                    },
                    async: false,
                    error: function(){
                        console.log("Ops, something went wrong after your registration.");
                    }
                });

                //Redirect home
                window.location.href = "../index.html";
            }
        });

        /*        $("#inputEmailSignUp").val("");
                $("#inputPasswordSignUp").val("");
                $("#inputPasswordSignUpAgain").val("");
                $("#inputNameSignUp").val("");
                $("#inputLastNameSignUp").val("");
        
                console.log(document.cookie);
    
                //alert("User Registered Successfully");
                //console.log("User-Logged");*/
    }
    
});