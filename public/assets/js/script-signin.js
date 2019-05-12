var apiurl = "https://bookstore-hypermedia-be.herokuapp.com/api"
//var apiurl = "http://localhost:8080/api"

$("#sign-up").click(function(){

    var email = $("#inputEmailSignUp").val();
    var password1 = $("#inputPasswordSignUp").val();
    var password2 = $("#inputPasswordSignUpAgain").val();

    //NEEDS NAME & LAST NAME!

    if (password1 == password2){
        var responseEV = $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            url: apiurl+"/user",
            async: false,
            data: JSON.stringify({email: email, password: password1}),
            success : function() {
        
                console.log("ciao");

                var responseUS = $.ajax({
                    type: "POST",
                    contentType: "application/x-www-form-urlencoded",
                    url: apiurl+"/user/login",
                    data: {email: email, password: password1},
                    async: false,
                    success : function() {
                
                        console.log(document.cookie);
            
                        alert("login successful");
                        console.log("ciaoLOGGED");
                        
                    },
                    error: function(){
                        alert("nologin");
                    }
                });
                //alert( $.cookie("example") );
                
            },
            error: function(){
                alert("noregistration");
            }
        });
    }
    
});