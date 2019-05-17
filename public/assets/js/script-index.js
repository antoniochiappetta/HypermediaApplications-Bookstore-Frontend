
var apiurl = "https://bookstore-hypermedia-be.herokuapp.com/api"
//var apiurl = "http://localhost:8080/api"

//FAVOURITE READINGS


var responseFR = $.ajax({
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    url: apiurl+"/books/?limit=3",
    success : function() {

        console.log(responseFR);
        var books1 = responseFR.responseJSON.content;

        $("#booksFR").empty();
        for (var i in books1){
            $("#booksFR").append(`<li class="list-group-item"> <a href="pages/book.html?isbn=`+books1[i].ISBN+`">`+books1[i].title+`</a> </li>`);
        }

    },
    failure: function () {
        alert("Couldn't load books1");
    }
});



//BEST_SELLERS THIS MONTH


var responseBS = $.ajax({
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    url: apiurl+"/books/?order=release_date&limit=3",
    success : function() {

        console.log(responseBS);
        var books2 = responseBS.responseJSON.content;

        $("#booksBS").empty();
        for (var i in books2){
            $("#booksBS").append(`<li class="list-group-item"> <a href="pages/book.html?isbn=`+books2[i].ISBN+`">`+books2[i].title+`</a> </li>`);
        }

    },
    failure: function () {
        alert("Couldn't load books2");
    }
});


//EVENTS THIS MONTH


var responseEV = $.ajax({
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    url: apiurl+"/events/latest?limit=3",
    success : function() {

        console.log(responseEV);
        $("#events").empty();
        let events = responseEV.responseJSON;
        console.log(events);
        for (let i in events){

            let bookEv = {title: "not found"};

            let bookEvent = $.ajax({
                type: "GET",
                contentType: "application/x-www-form-urlencoded",
                url: apiurl+"/books?ISBN="+events[i].B_ISBN,
                success: function(){
                    bookEv = bookEvent.responseJSON.content[0];
                    $("#events").append(`<li class="list-group-item"><a href="pages/event.html?id=`+events[i].ID+`">Presentation event for "`+bookEv.title+`"</a> </li>`);
                }
            });

            console.log(bookEv);

            
        }

    },
    failure: function () {
        alert("Couldn't load events");
    }
});

$("#cookiereader").click(function(){

    //console.log(responseUS);
    console.log(document.cookie);
    var responseshoppingbag = $.ajax({
        type: "GET",
        url: apiurl+"/user/shoppingBag",
        success: function(){
            console.log(responseshoppingbag);
        }
    });
    console.log("------------");
    var responseshopping = $.ajax({
        type: "GET",
        url: apiurl+"/user",
        success: function(){
            console.log(responseshopping);
        }
    });

});