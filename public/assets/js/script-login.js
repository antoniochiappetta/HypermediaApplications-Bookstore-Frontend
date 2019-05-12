var apiurl = "https://bookstore-hypermedia-be.herokuapp.com/api"
//var apiurl = "http://localhost:8080/api"

$("#log-in").click(function(){
    
    /*//check mail
    var email = $("#inputEmailLogin").text();
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (testEmail.test(email)){
    }
    else{
        $("#loginerror").remove();
        $("loginform").append('<a id="loginerror" style="color: red">email not valid</a>');
    }*/
    var email = $("#inputEmailLogin").val();
    var password = $("#inputPasswordLogin").val();
    console.log(email + " " + password);

    var responseUS = $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        url: apiurl+"/user/login",
        data: {email: email, password: password},
        async: false,
        success : function() {
    
            console.log(document.cookie);

            alert("login successful");
            console.log("ciao");
            //alert( $.cookie("example") );
            //$("#user").text();
            
        },
    });
    //alert("fuckyou" + email + " " + password);
});

/*$("#sign-up").click(function(){
    console.log(document.cookie);
});*/