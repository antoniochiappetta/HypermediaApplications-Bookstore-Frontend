var apiurl = "https://bookstore-hypermedia-be.herokuapp.com/api"
//var apiurl = "http://localhost:8080/api"

/*
if (nonseiloggato){
    $("#checkout").remove();
}
*/

$.ajaxSetup({
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    }
});

$.updateQua = function(item){
    console.log("updating quantity");
    console.log(item.attr("data-internalid"));
    console.log({
        U_ID: parseInt(uID),
        B_ISBN: item.attr("data-internalid"),
        quantity: parseInt(item.siblings().filter("input").val()),
        version: $.translateVersion(item.parent().parent().find(".dropdown-toggle-bookversion").text())
    });
    $.ajax({
        type: "DELETE",
        contentType: "application/x-www-form-urlencoded",
        xhrFields: {withCredentials: true},
        crossDomain: true,
        async: false,
        url: apiurl+"/user/shoppingBag/"+item.attr("data-internalid"),
    });
    var responsePost = $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        xhrFields: {withCredentials: true},
        crossDomain: true,
        dataType: "json",
        url: apiurl+"/user/shoppingBag",
        data: JSON.stringify({
            U_ID: parseInt(uID),
            B_ISBN: item.attr("data-internalid"),
            quantity: parseInt(item.siblings().filter("input").val()),
            version: $.translateVersion(item.parent().parent().find(".dropdown-toggle-bookversion").text())
        }),
        success : function(data) {
            //alert("Quantity updated correctly.");
            $("#ModalTitle").html("Done");
            $("#modalContent").html("Quantity updated correctly.");
            $("#modalFooter").show();
            $( "#modal_Button" ).trigger( "click" );

            $.setup();
        }
    });
    /*var deletion = $.ajax({
        type: "PUT",
        contentType: "application/json",
        xhrFields: {withCredentials: true},
        crossDomain: true,
        url: apiurl+"/user/shoppingBag/"+item.attr("data-internalid"),
        data: {
            U_ID: parseInt(uID),
            B_ISBN: item.attr("data-internalid"),
            quantity: parseInt(item.siblings().filter("input").val()),
            version: $.translateVersion(item.parent().parent().find(".dropdown-toggle-bookversion").text())
        },
        success : function() {
            alert("quantity updated");
            $.setup();
        },
        error : function(){
        }
    });*/
};

$.updateVer = function(item){
    console.log("updating version");
    console.log(item.attr("data-internalid"));
    console.log({
        U_ID: parseInt(uID),
        B_ISBN: item.attr("data-internalid"),
        quantity: parseInt(item.parent().parent().parent().parent().find("input").val()),
        version: $.translateVersion(item.text())
        //version: $.translateVersion(item.parent().siblings().filter("button").text())
    });

    $.ajax({
        type: "DELETE",
        contentType: "application/x-www-form-urlencoded",
        xhrFields: {withCredentials: true},
        crossDomain: true,
        async: false,
        url: apiurl+"/user/shoppingBag/"+item.attr("data-internalid"),
    });
    var responsePost = $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        xhrFields: {withCredentials: true},
        crossDomain: true,
        dataType: "json",
        url: apiurl+"/user/shoppingBag",
        data: JSON.stringify({
            U_ID: parseInt(uID),
            B_ISBN: item.attr("data-internalid"),
            quantity: parseInt(item.parent().parent().parent().parent().find("input").val()),
            version: $.translateVersion(item.text())
            //version: $.translateVersion(item.parent().siblings().filter("button").text())
        }),
        success : function(data) {
            //alert("Version changed correctly.");
            $("#ModalTitle").html("Done");
            $("#modalContent").html("Version changed correctly.");
            $("#modalFooter").show();
            $( "#modal_Button" ).trigger( "click" );

            $.setup();
        }
    });
/*
    var deletion = $.ajax({
        type: "PUT",
        contentType: "application/json",
        xhrFields: {withCredentials: true},
        crossDomain: true,
        url: apiurl+"/user/shoppingBag/"+item.attr("data-internalid"),
        data: {
            U_ID: parseInt(uID),
            B_ISBN: item.attr("data-internalid"),
            quantity: parseInt(item.parent().parent().parent().parent().find("input").val()),
            version: $.translateVersion(item.parent().siblings().filter("button").text())
        },
        success : function() {
            console.log("success");
            $.setup();
        },
        error : function(){
        }
    });*/
};

$.delItem = function(item){
    console.log("deleting item");
    console.log(item.attr("data-internalid"));
    $.ajax({
        type: "DELETE",
        contentType: "application/x-www-form-urlencoded",
        xhrFields: {withCredentials: true},
        crossDomain: true,
        url: apiurl+"/user/shoppingBag/"+item.attr("data-internalid"),
        success : function() {
            $.setup();
            //alert("Book deleted from your Shopping Bag");
            $("#ModalTitle").html("Done");
            $("#modalContent").html("Book deleted from your Shopping Bag");
            $("#modalFooter").show();
            $( "#modal_Button" ).trigger( "click" );

        },
        error : function(){
            $.setup();
            //alert("Ops, something went wrong!");

            $("#ModalTitle").html("Attention");
            $("#modalContent").html("Ops, something went wrong!");
            $("#modalFooter").show();
            $( "#modal_Button" ).trigger( "click" );
        }
    });
};



$.translateVersion = function(ver){
    console.log(ver);
    if(ver == "DIGITAL") return "Digital Version";
    if(ver == "PAPER") return "Paper Version";
    if(ver == "Digital Version") return "DIGITAL";
    else return "PAPER";
}

var NothingHere = true;
var shoppingBag = undefined;
var uID;

$.showBooks = function(booksArray){
    shoppingBag = booksArray;
    for (i in booksArray){
        console.log(booksArray[i]);
        let author = [{ID: -1, name: "not", last_name: "found"}];
        let event = {ID: -1}
        let book = {title: "title", ISBN: -1, price: -1}
        let version = $.translateVersion(booksArray[i].version);

        var bookResponse = $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            async: false,
            url: apiurl+"/books/?ISBN="+booksArray[i].B_ISBN,
        });
        console.log(apiurl+"/books/?ISBN="+booksArray[i].B_ISBN);
        console.log(bookResponse);

        var booksAuthor = $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            async: false,
            url: apiurl+"/books/"+booksArray[i].B_ISBN+"/authors",
        });
        console.log(apiurl+"/books/"+booksArray[i].B_ISBN+"/authors");
        console.log(booksAuthor);

        var booksEvent = $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            async: false,
            url: apiurl+"/events/?bookISBN="+booksArray[i].B_ISBN,
        });
        console.log(apiurl+"/events/?bookISBN="+booksArray[i].B_ISBN);
        console.log(booksEvent);
        book = bookResponse.responseJSON.content[0];
        author = booksAuthor.responseJSON.content;
        event = booksEvent.responseJSON[0];
        let authorsHTML = "";
        for (j in author){
            authorsHTML = authorsHTML + `<a href="author.html?id=`+author[j].ID+`" class="textVariant1"> `+author[j].name+` `+author[j].last_name+` </a> `;
        }
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
                                    <h5 class="textVariant1"> Author: `+authorsHTML+`</h5>
                                </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <h5 class="textVariant2"> <a href="event.html?id=`+event.ID+`" class="textVariant2"> Presentation event for `+book.title+` </a> </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="row">
                                        <div class="col-8 col-md-3 mb-3">
                                            <div class="dropdown">
                                                <button class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-bookversion" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    `+version+`
                                                </button>
                                                <div class="dropdown-menu dropdown-menu-bookversion" aria-labelledby="dropdownMenuButton">
                                                    <a class="dropdown-item dropdown-item-bookversion" data-internalid="`+book.ISBN+`">Paper Version</a>
                                                    <a class="dropdown-item dropdown-item-bookversion" data-internalid="`+book.ISBN+`">Digital Version</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-9 col-md-5">
                                            <button class="btn-light rounded">Quantity:</button>
                                            <input class="rounded" type="number" value="`+booksArray[i].quantity+`" min="1" max="10" step="1"/>
                                            <button class="btn-info rounded" data-internalid="`+book.ISBN+`">Update</button>
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
        //$("button.btn-danger").click(function(){$.delItem($(this));});
        //$("button.btn-info").click(function(){$.updateQua($(this));});
        //$("a.dropdown-item-bookversion").click(function(){$.updateVer($(this));});
    }
    $("button.btn-danger").click(function(){$.delItem($(this));});
    $("button.btn-info").click(function(){$.updateQua($(this));});
    $("a.dropdown-item-bookversion").click(function(){$.updateVer($(this));});
}

$.justSearchShoppingBags = function(userID){
    //console.log ("requested books:"+JSON.stringify(data));
    let shoppingResponse = $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        xhrFields: {withCredentials: true},
        url: apiurl+"/user/shoppingBag",
        success : function() {
            console.log(shoppingResponse);
            if (shoppingResponse!=undefined){
                if (shoppingResponse.responseJSON.content!= undefined){
                    if(shoppingResponse.responseJSON.content.length > 0){
                        uID = shoppingResponse.responseJSON.content[0].U_ID;

                        //Case load book
                        $("#content").empty();
                        $("#checkout").show();
                        $("#content").append(`
                        <div class="col-12">
                            <h2>Shopping Bag</h2>
                        </div>
                            `)

                        $.showBooks(shoppingResponse.responseJSON.content);
                        NothingHere = false;

                    } else {
                        //Case shopping bag is empty

                        $("#content").empty();
                        $("#checkout").hide();
                        $("#content").append(`
                        <div class="col-12">
                            <h2>Shopping Bag</h2>
                        </div>

                        <div class="col-12 text-center mb-5 py-5">
                            <img src="../assets/img/bag.svg" href="index.html" width="80" height="80" alt="Logo" class="rounded m-3">
                            <h5 id="shoppingBagDescr">Your Shopping Bag is empty.</h5>
                        </div>
                            `)

                    }
                }
            }
        }

        /*,
        always : function(){
            if(NothingHere){
                $("#checkout").remove();

                //se è loggato di "carrello vuoto", se no "log in to be able to buy"
                $("#content").html('<div class="col"> <h2>Shopping Bag</h2></br><h3>Empty bag</h3>  </div>');

            }
        }*/
    });
}


//PREPARE-------------------------------------------------------------

$.setup = function(){
    //$("#content").html('<div class="col"> <h2>Shopping Bag</h2> </div>');
    $.justSearchShoppingBags();
}




$("#checkout").click(function(){
    //deletes all shoping bag elements from user's shopping bag
    let tot = 0;
    console.log(shoppingBag);
    for (var i in shoppingBag){
        var deletion = $.ajax({
            type: "DELETE",
            contentType: "application/json",
            url: apiurl+"/user/shoppingBag/"+shoppingBag[i].B_ISBN,
            async: false,
            xhrFields: {withCredentials: true},
            success : function(){
                tot = tot+1;
            }
        });
    }
    if(tot != shoppingBag.length){
        alert("errors were incountered while deleting the shopping Bag");
    }
    $.setup();
});


$.setup();
