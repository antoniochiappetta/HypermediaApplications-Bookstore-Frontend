var apiurl = "https://bookstore-hypermedia-be.herokuapp.com/api"
//var apiurl = "http://localhost:8080/api"



var responseUS;

$("#log-in").click(function(){

    var email = $("#inputEmailLogin").val();
    var password = $("#inputPasswordLogin").val();

    var done = false;
    responseUS = $.ajax({
        type: "POST",
        headers:{
        contentType: "application/x-www-form-urlencoded"
        },
        url: apiurl+"/user/login",
        xhrFields: {withCredentials: true},
        crossDomain: true,
        data: {email: email, password: password},
        async: false,
    });

    if (responseUS!= undefined){
        if (responseUS.status == 200){
            $("#inputEmailLogin").val("")
            $("#inputPasswordLogin").val("");
            done=true;
        }
    }

    if (!done){
        //alert("Email or Password not correct, please try again.");
        $("#log-in").attr("data-toggle","modal");
        $("#log-in").attr("data-target","#exampleModal");
        $("#ModalTitle").html("Attention");
        $("#modalContent").html("Email or Password not correct, please try again.");
    }else {
        //Redirect home
        window.location.href = "../index.html";
    }

    console.log(responseUS);
});