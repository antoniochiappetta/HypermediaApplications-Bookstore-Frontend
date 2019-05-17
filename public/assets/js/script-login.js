var apiurl = "https://bookstore-hypermedia-be.herokuapp.com/api"
//var apiurl = "http://localhost:8080/api"



var responseUS;

$("#log-in").click(function(){

    var email = $("#inputEmailLogin").val();
    var password = $("#inputPasswordLogin").val();

    //responsefirst = $.ajax({type:"POST", contentType: "application/x-www-form-urlencoded", url: apiurl+"/user/login", async: false});

    var done = false;
    responseUS = $.ajax({
        type: "POST",
        headers:{
        contentType: "application/x-www-form-urlencoded"
        },
        //credentials: 'same-origin',
        url: apiurl+"/user/login",
        xhrFields: {withCredentials: true},
        crossDomain: true,
        data: {email: email, password: password},
        //body: {email: email, password: password},
        async: false,
        /*success : function() {
            console.log("DONE");
        },
        error : function(){
            alert("login unsuccessful - ERROR");
        }*/
    });
    if (responseUS!= undefined){
        if (responseUS.status == 200){
            console.log(responseUS);
            //console.log(responseUS.getResponseHeader());
            $("#inputEmailLogin").val("")
            $("#inputPasswordLogin").val("");
            done=true;
        }
    }
    if (!done){
        alert("login unsuccessful");
    }
    

    /*fetch(apiurl+"/user/login?email="+email+"&password="+password, {
        method: "post",
        //mode: 'cors',
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        }
    })
    .then(function(){console.log(response.json());})
    .catch(function(){
        alert("login unsuccessful - ERROR");
    });
*/
    console.log(responseUS);
    //console.log(responseUS.getResponseHeader('Set-Cookie'));
});

$("#cookiereader").click(function(){

    console.log(responseUS);
    console.log(document.cookie);
    var responseshoppingbag = $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: apiurl+"/user/shoppingBag",
        success: function(){
            console.log(responseshoppingbag);
        }
    });
    console.log("------------");
    var responseshopping = $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: apiurl+"/user",
        success: function(){
            console.log(responseshopping);
        }
    });

});