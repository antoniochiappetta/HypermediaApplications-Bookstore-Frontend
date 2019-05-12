var apiurl = "https://bookstore-hypermedia-be.herokuapp.com/api"
//var apiurl = "http://localhost:8080/api"

/*
if (nonseiloggato){
    $("#checkout").remove();
}
*/

$("#checkout").click(function(){
    //deletes all shoping bag elements from user's shopping bag
    let emptyBag = $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        async: false,
        url: apiurl+"/authors/?bookISBN="+booksArray[i].ISBN,
        success : function() {
            author = booksAuthor.responseJSON.content[0];
        }
    });
});


$.showBooks = function(booksArray){
    for (i in booksArray){
        if (doesNotContainBook(booksArray[i], shownBooks)){
            shownBooks.push(booksArray[i]);
            console.log(booksArray[i]);
            let author = {ID: -1, name: "not", last_name: "found"};
            let event = {ID: -1};
            var booksAuthor = $.ajax({
                type: "GET",
                contentType: "application/x-www-form-urlencoded",
                async: false,
                url: apiurl+"/authors/?bookISBN="+booksArray[i].ISBN,
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
                url: apiurl+"/events/?bookISBN="+booksArray[i].ISBN,
                success : function() {
                    if (booksEvent!=undefined){
                        event = booksEvent.responseJSON.content[0];
                    }
                }
            });
            $("#searchContent").append(`
            <div class="card myCard shoppingCard">
                <div class="card-body">
                    <div class="row">
                        <div class="col-2 col-md-2">
                            <img src="../assets/img/bookfront.jpg" height="200" width="140" alt="Book cover">
                        </div>
                        <div class="col-12 col-md-12 col-lg-10 mt-3">
                            <div class="row">
                                <div class="col">
                                    <div class="row">
                                        <div class="col-8 col-sm-6 my-auto">
                                            <a href="book.html"><h2>Book Title</h2></a>
                                        </div>
                                        <div class="col col-sm-6 text-right my-auto mr-0">
                                            <h3 class="textVariant2">29,99$</h3>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <h5 class="textVariant1"> Author: <a href="author.html" class="textVariant1"> Name LastName </a> </h5>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <h5 class="textVariant1"> Presentation event: <a href="event.html" class="textVariant1"> Event </a> </h5>
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
                                                    Paper Version
                                                </button>
                                                <div class="dropdown-menu dropdown-menu-bookversion" aria-labelledby="dropdownMenuButton">
                                                    <a class="dropdown-item dropdown-item-bookversion">Paper Version</a>
                                                    <a class="dropdown-item dropdown-item-bookversion">Digital Version</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6 col-md-3 my-auto">
                                            <button class="btn-light">Quantity:</button><input class="rounded" type="number" value="1" min="1" max="10" step="1"/>
                                        </div>
                                        <div class="col-9 col-md-6 text-right ml-auto">
                                            <button type="button" class="btn btn-danger myButton mr-0">Delete from shopping bag</button>
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
}

$.justSearchBooks = function(data){
    //console.log ("requested books:"+JSON.stringify(data));
    let booksResponse = $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: apiurl+"/books/",
        data: data,
        success : function() {
            //console.log(booksResponse);
            if (booksResponse!=undefined){
                if (booksResponse.responseJSON.content!= undefined){
                    console.log("BOOKS "+JSON.stringify(data) + "     ");
                    console.log(booksResponse.responseJSON.content);
                    $.showBooks(booksResponse.responseJSON.content);
                }
            }
        },
    });
}


//PREPARE

$("#content").html('<div class="col"> <h2>Shopping Bag</h2> </div>');

var booksEvent = $.ajax({
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    async: false,
    url: apiurl+"/events/?bookISBN="+booksArray[i].ISBN,
    success : function() {
        event = booksEvent.responseJSON.content[0];
    }
});
