
var apiurl = "https://bookstore-hypermedia-be.herokuapp.com/api"
//var apiurl = "http://localhost:8080/api"

var bookTest = {
    ISBN: "1111110000002",
abstract: "",
fact_sheet: "",
genre: "Art",
interview: "no interview here",
picture: "",
price: 0,
release_date: "2018-02-01T00:00:00.000Z",
sold_copies: "0",
theme: "adventure",
title: "Libro di Antonio e Luca"
};

var eventTest = {
    ID: 17,
    B_ISBN: "1111110000002",
    startingDate: "2018-02-01T00:00:00.000Z",
    endingDate: "2018-04-03T00:00:00.000Z",
    venue: "venutaDelVenuitore",
    address: "addressico",
    city: "cittàSenzaNome",
    name: "bau",
    description: "a\nb\nc\ndindong\nuhmytralala"
};

var userTest = {
    body:{
    email: "testhash444@gmail.com",
    password: "unapassword",
    name: "antoniocopwia",
    lastName: "chiappekttacopia",
    isAdmin: "true",
    ID: "111",}
};

//TRYING TO POST
/*
var responseEV = $.ajax({
    type: "POST",
    contentType: "application/x-www-form-urlencoded",
    url: apiurl+"/user",
    email: userTest.email,
    password: userTest.password,
    name: userTest.name,
    lastName: userTest.lastName,
    isAdmin: userTest.isAdmin,
    ID: userTest.ID,
    //data: JSON.stringify(userTest),
    success : function() {

        console.log("ciao");
        console.log(responseEV);
        
    },
    error : function(){
        console.log("errore");
    }
});*/

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
    //contentType: "application/json",
    //url: apiurl+"/books/bestSellers",
    url: apiurl+"/books/?order=release_date&limit=3",
    success : function() {

        //var responseBS = {responseJSON: {content: [bookTest, bookTest, bookTest]}};

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


var response = $.ajax({
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    //contentType: "application/json",
    url: apiurl+"/events/latest?limit=3",
    success : function() {

        //var response = {responseJSON: {content: [eventTest, eventTest, eventTest]}};

        console.log(response);
        var events = response.responseJSON.content;

        $("#events").empty();
        for (var i in events){
            $("#events").append(`<li class="list-group-item"><a href="pages/event.html?id=`+events[i].ID+`">`+events[i].name+`</a> </li>`);
        }

    },
    failure: function () {
        alert("Couldn't load events");
    }
});