var apiurl = "https://bookstore-hypermedia-be.herokuapp.com/api"
//var apiurl = "http://localhost:8080/api"

/*
if (nonseiloggato){
    $("#checkout").remove();
}
*/

$.translateVersion = function(ver){
    if(ver == "DIGITAL") return "Digital Version";
    if(ver == "PAPER") return "Paper Version";
    if(ver == "Digital Version") return "DIGITAL";
    else return "PAPER";
}

var NothingHere = true;
var shoppingBag = undefined;

$.showBooks = function(booksArray){
    shoppingBag = booksArray;
    for (i in booksArray){
        console.log(booksArray[i]);
        let author = {ID: -1, name: "not", last_name: "found"};
        let event = {ID: -1}
        let book = {title: "title", ISBN: -1, price: -1}
        let version = $.translateVersion(booksArray[i].version);

        var bookResponse = $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            async: false,
            url: apiurl+"/book/?ISBN="+booksArray[i].B_ISBN,
            success : function() {
                if (bookResponse!=undefined){
                    if (bookResponse.responseJSON.content!=undefined)
                        book = bookResponse.responseJSON.content[0];
                }
            }
        });
        var booksAuthor = $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            async: false,
            url: apiurl+"/authors/?bookISBN="+booksArray[i].B_ISBN,
            success : function() {
                if (booksAuthor!=undefined){
                    if (booksAuthor.responseJSON.content!=undefined)
                        author = booksAuthor.responseJSON.content[0];
                }
            }
        });
        var booksEvent = $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            async: false,
            url: apiurl+"/events/?bookISBN="+booksArray[i].B_ISBN,
            success : function() {
                if (booksEvent!=undefined){
                    if (booksEvent.responseJSON.content!= undefined){
                        event = booksEvent.responseJSON.content[0];
                    }
                }
            }
        });
        $("#content").append(`
            <div class="card myCard shoppingCard">
                <div class="card-body">
                    <div class="row">
                        <div class="col-2 col-md-2">
                            <img src="`+book.picture+`" height="200" width="140" alt="Book cover">
                        </div>
                        <div class="col-12 col-md-12 col-lg-10 mt-3">
                            <div class="row">
                                <div class="col">
                                    <div class="row">
                                        <div class="col-8 col-sm-6 my-auto">
                                            <a href="book.html?isbn=`+book.ISBN+`"><h2>`+book.title+`</h2></a>
                                        </div>
                                        <div class="col col-sm-6 text-right my-auto mr-0">
                                            <h3 class="textVariant2">`+book.price+`$</h3>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <h5 class="textVariant1"> Author: <a href="author.html?id=`+author.ID+`" class="textVariant1"> `+author.name+` `+author.last_name+` </a> </h5>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <h5 class="textVariant1"> Presentation event: <a href="event.html?id=`+event.ID+`" class="textVariant1"> Presentation event for `+book.title+` </a> </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="row">
                                        <div class="col-6 col-md-3 my-auto">
                                            <div class="dropdown">
                                                <button class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-bookversion" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    `+version+`
                                                </button>
                                                <div class="dropdown-menu dropdown-menu-bookversion" aria-labelledby="dropdownMenuButton">
                                                    <a class="dropdown-item dropdown-item-bookversion" data-internalid="`+book.ISBN+`>Paper Version</a>
                                                    <a class="dropdown-item dropdown-item-bookversion" data-internalid="`+book.ISBN+`>Digital Version</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6 col-md-3 my-auto">
                                            <button class="btn-light" data-internalid="`+book.ISBN+`>Quantity:</button><input class="rounded" type="number" value="`+booksArray[i].quantity+`" min="1" max="10" step="1"/>
                                        </div>
                                        <div class="col-9 col-md-6 text-right ml-auto">
                                            <button type="button" class="btn btn-danger myButton mr-0" data-internalid="`+book.ISBN+`">Delete from shopping bag</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }
}

$.justSearchShoppingBags = function(userID){
    //console.log ("requested books:"+JSON.stringify(data));
    let shoppingResponse = $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: apiurl+"/user/"+uID+"/shoppingBag",
        success : function() {
            if (shoppingResponse!=undefined){
                if (shoppingResponse.responseJSON.content!= undefined){
                    if(shoppingResponse.responseJSON.content.length > 0){
                        console.log(shoppingResponse.responseJSON.content);
                        $.showBooks(shoppingResponse.responseJSON.content);
                        NothingHere = false;
                    }
                }
            }
        },
        always : function(){
            if(NothingHere){
                $("#checkout").remove();

                //se è loggato di "carrello vuoto", se no "log in to be able to buy"
                $("#content").html('<div class="col"> <h2>Shopping Bag</h2></br><h3>Empty bag</h3>  </div>');

            }
        }
    });
}


//PREPARE-------------------------------------------------------------
//FIND A WAY TO OBTAIN THE USER ID...?
var uID = 8;

$.setup = function(){
    $("#content").html('<div class="col"> <h2>Shopping Bag</h2> </div>');
    $.justSearchShoppingBags(uID);
}


$(".btn-light").click(function(){
    let deletion = $.ajax({
        type: "DELETE",
        contentType: "application/x-www-form-urlencoded",
        url: apiurl+"/user/"+uID+"/shoppingBag/"+$(this).attr(data-internalid),
        success : function() {
            let fixing = $.ajax({
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                url: apiurl+"/user/"+uID+"/shoppingBag/",
                data: {
                    U_ID: uID,
                    B_ISBN: $(this).attr(data-internalid),
                    quantity: $(this).siblings().filter("input").val(),
                    version: $.translateVersion($(this).parent().parent().find(".dropdown-toggle-bookversion").text())
                },
                success : function() {
                    alert("quantity updated");
                }
            });
        },
        error : function(){
        }
    });
});

$(".dropdown-item-bookversion").click(function(){
    let deletion = $.ajax({
        type: "DELETE",
        contentType: "application/x-www-form-urlencoded",
        url: apiurl+"/user/"+uID+"/shoppingBag/"+$(this).attr(data-internalid),
        success : function() {
            let fixing = $.ajax({
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                url: apiurl+"/user/"+uID+"/shoppingBag/",
                data: {
                    U_ID: uID,
                    B_ISBN: $(this).attr(data-internalid),
                    quantity: $(this).parent().parent().parent().parent().find("input").val(),
                    version: $.translateVersion($(this).parent().sibling().filter("button").text())
                },
                success : function() {
                    alert("version updated");
                }
            });
        },
        error : function(){
        }
    });
});

$(".btn-danger").click(function(){
    let deletion = $.ajax({
        type: "DELETE",
        contentType: "application/x-www-form-urlencoded",
        url: apiurl+"/user/"+uID+"/shoppingBag/"+$(this).attr(data-internalid),
        success : function() {
            alert("book deleted");
            $.setup();
        },
        error : function(){
            alert("deletion failed");
        }
    });
});

$("#checkout").click(function(){
    //deletes all shoping bag elements from user's shopping bag
    let tot = 0;
    for (i in shoppingBag){
        let deletion = $.ajax({
            type: "DELETE",
            contentType: "application/x-www-form-urlencoded",
            url: apiurl+"/user/"+uID+"/shoppingBag/"+shoppingBag[i].B_ISBN,
            success : function(){
                tot = tot+1;
            }
        });
        if(tot != shoppingBag.length){
            alert("errors were incountered while deleting the shopping Bag");
        }
        $.setup();
    }
});


$.setup();
/*
var booksEvent = $.ajax({
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    async: false,
    url: apiurl+"/events/?bookISBN="+booksArray[i].ISBN,
    success : function() {
        event = booksEvent.responseJSON.content[0];
    }
});*/
