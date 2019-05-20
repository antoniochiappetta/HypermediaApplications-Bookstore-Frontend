
var apiurl = "https://bookstore-hypermedia-be.herokuapp.com/api";
//var apiurl = "http://localhost:8080/api"

const MAX_BOOKS = 3;
const MAX_AUTHORS = 3;
const MAX_EVENTS = 3; 



$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results != null){
        return results[1];
    }
    return null;
}

var searchTerm = $.urlParam('search');
var page = $.urlParam("page");
var order = $.urlParam("order");
var type = $.urlParam("type");

var newURL = window.location.href;

if(searchTerm == null && page == null && order == null){
    newURL = newURL + "?page=1";
    page = "1";
    notFirstEnter = false;
}

//page
if ( page !=  null ) {
    page = parseInt(page);
    if (page<1){
        page = 1;
    }
}
else{
    newURL = (newURL + "&page=1").split("html&").join("html?");
    page = 1;
}

if (searchTerm!= null){
    $("#resultText").text('Results for: "'+searchTerm.split("%20").join(" ")+'"');
}

if (order != null){
    $("#dropdownMenuButton").text(order.split("%20").join(" "));
}
else{
    newURL = (newURL + "&order=Alphabetical%20Order").split("html&").join("html?");
    order = "Alphabetical%20Order";
}

if (newURL != window.location.href){
    window.location.href = newURL;
}

//setting for filter searches
$("#alpha").attr("href",window.location.href.split("order="+order).join("order=Alphabetical%20Order"));
$("#LotHi").attr("href",window.location.href.split("order="+order).join("order=Price:%20Low%20to%20High"));
$("#HitLo").attr("href",window.location.href.split("order="+order).join("order=Price:%20High%20to%20Low"));

//creation of actual query parameter for the order
var orderType = undefined;
if(order != "Alphabetical%20Order") {
    if(order == "Price:%20Low%20to%20High"){
        orderType = "release_date";
    }
    else {
        orderType = "sold_copies";
    }
}

//page number management
if(page>1){
    $("#previouspage-button").wrap( '<a href="'+window.location.href.split("page="+page).join("page="+(page-1))+'" style="display: inline-block"></a>' );
    //$("#previouspage-button").attr("href", window.location.href.split("page="+page).join("page="+(page-1)));
}
else{
    //$("#previouspage-button").wrap( '<a style="display: inline-block"></a>' );
    $("#previouspage-button").remove();
}

$("#nextpage-button").wrap( '<a href="'+window.location.href.split("page="+page).join("page="+(page+1))+'" style="display: inline-block"></a>' );



//READY CONTENT

$("#searchContent").empty();
/*if (searchTerm == ""){
    searchTerm = undefined;
}
else{
    
}*/

//prepare queries:
searchTerm = searchTerm.split("%20").join(" ");
//possible book search (except with author: user will open author's profile for those) //those books will be added after every found author)
var bookTitle= {title: searchTerm, order_type: orderType, page: page, limit: MAX_BOOKS};
var bookISBN=  {ISBN: searchTerm, order_type: orderType, page: page, limit: MAX_BOOKS};
var bookGenre= {genre: searchTerm, order_type: orderType, page: page, limit: MAX_BOOKS};
var bookTheme= {theme: searchTerm, order_type: orderType, page: page, limit: MAX_BOOKS};
var bookReleaseDate= {release_date: searchTerm, order_type: orderType, page: page, limit: MAX_BOOKS};

var booksSearches= [bookTitle, bookGenre, bookTheme, bookReleaseDate];
console.log(booksSearches);

//possible author searches
var authorID = {ID: parseInt(searchTerm), limit: MAX_AUTHORS, page: page};
var authorName = {name: searchTerm, limit: MAX_AUTHORS, page: page};
var authorLastName = {last_name: searchTerm, limit: MAX_AUTHORS, page: page};

var authorsSearches = [authorName, authorLastName];

//possible event searches

var eventID = {ID: parseInt(searchTerm), page: page, limit: MAX_EVENTS};
var eventVenue = {venue: searchTerm, page: page, limit: MAX_EVENTS};
var eventAddress = {address: searchTerm, page: page, limit: MAX_EVENTS};
var eventCity = {city: searchTerm, page: page, limit: MAX_EVENTS}

var eventsSearches = [eventVenue, eventAddress, eventCity];

if (page == 1){
    booksSearches.push(bookISBN);
    authorsSearches.push(authorID);
    eventsSearches.push(eventID);
}

var wastherecontent = 1;
var countqueries = [0, 0, 0];

var typ;
if (type == "Books"){
    countqueries[1] = authorsSearches.length;
    countqueries[2] = eventsSearches.length;
    typ = 0;
}
else if (type == "Authors"){
    countqueries[0] = booksSearches.length;
    countqueries[2] = eventsSearches.length;
    typ = 1;
}
else if (type == "Events"){
    countqueries[0] = booksSearches.length;
    countqueries[1] = authorsSearches.length;
    typ = 2;
}

//check if this is the last page
$.checkIfContent = function(num, producedContent){
    if (type == "all") typ = num;
    
    console.log("p: "+producedContent);
    wastherecontent = wastherecontent*producedContent;
    console.log(wastherecontent);
    if (wastherecontent == 1){
        countqueries[typ] = countqueries[typ] + 1;
        console.log(countqueries);
        if(countqueries[0]==booksSearches.length && countqueries[1]==authorsSearches.length && countqueries[2]==eventsSearches.length){
            $("#nextpage-button").remove();
            /*if ($("searchContent").text() == ""){
                $("#searchContent").append('<h3 class="textVariant1">No Results :(</h3>');
            }*/
        }
    }
}

//BOOKS RESEARCHES----------------------------------------------------------------------------------------------------------------

var shownBooks = []

function doesNotContainBook(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].ISBN === obj.ISBN) {
            return false;
        }
    }

    return true;
}

$.showBooks = function(booksArray){
    for (i in booksArray){
        if (doesNotContainBook(booksArray[i], shownBooks)){
            shownBooks.push(booksArray[i]);
            console.log(booksArray[i]);
            let author = [{ID: -1, name: "not", last_name: "found"}];
            let event = {ID: -1};
            var booksAuthor = $.ajax({
                type: "GET",
                contentType: "application/x-www-form-urlencoded",
                async: false,
                url: apiurl+"/authors/?bookISBN="+booksArray[i].ISBN,
                success : function() {
                    
                }
            });
            if (booksAuthor!=undefined){
                if (booksAuthor.responseJSON.content!=undefined)
                    author = booksAuthor.responseJSON.content[0];
            }
            var booksEvent = $.ajax({
                type: "GET",
                contentType: "application/x-www-form-urlencoded",
                async: false,
                url: apiurl+"/events/?bookISBN="+booksArray[i].ISBN,
            });
            event = booksEvent.responseJSON[0];
            let authorsHTML = "";
            for (j in author){
                authorsHTML = authorsHTML + `<a href="author.html?id=`+author[j].ID+`" class="textVariant1"> `+author[j].name+" "+author[j].last_name+` </a> </h5>`;
            }
            $("#searchContent").append(`
                <div class="card myCard shoppingCard">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-2 col-md-2">
                                <img src="`+booksArray[i].picture+`" height="200" width="140" alt="Book cover">
                            </div>
                            <div class="col-12 col-md-12 col-lg-10 mt-3">
                                <div class="row">
                                    <div class="col">
                                        <div class="row">
                                            <div class="col-8 col-sm-6 my-auto">
                                                <a href="book.html?isbn=`+booksArray[i].ISBN+`"><h2>`+booksArray[i].title+`</h2></a>
                                            </div>
                                            <div class="col col-sm-6 text-right my-auto mr-0">
                                                <h3 class="textVariant2">`+booksArray[i].price+`$</h3>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col">`+authorsHTML+
                                            `</div>
                                        </div>
                                        <div class="row">
                                            <div class="col">
                                                <h5 class="textVariant1"> Presentation event: <a href="event.html?id=`+event.ID+`" class="textVariant1"> Presentation event for "`+booksArray[i].title+`" </a> </h5>
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

$.justSearchBooks = function(dataB){
    console.log ("requested books:"+JSON.stringify(dataB));
    let booksResponse = $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: apiurl+"/books/",
        async: false,
        data: dataB,
        success : function() {
            //console.log(booksResponse);
            
        },
        error : function(){
            $.checkIfContent(0,1);
        }
    });
    if (booksResponse!=undefined ){
        if (booksResponse.responseJSON!= undefined){
            if (booksResponse.responseJSON.content!= undefined){
                console.log("BOOKS ");
                console.log(booksResponse);
                console.log(booksResponse.responseJSON.content);
                $.showBooks(booksResponse.responseJSON.content);
                if (booksResponse.responseJSON.content.length < MAX_BOOKS){
                    $.checkIfContent(0, 1);
                }
                else{
                    $.checkIfContent(0, 2);
                }
            }
            else{
                $.checkIfContent(0, 1);
            }
        }
        else{
            $.checkIfContent(0, 1);
        }
    }
    else{
        $.checkIfContent(0, 1);
    }
}

if (type == "Books" || type == "all"){
    for (i in booksSearches){
        $.justSearchBooks(booksSearches[i]);
    }
}

//AUTHORS SEARCHES----------------------------------------------------------------------------------------------------------------

var shownAuthors = []

function doesNotContainID(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].ID === obj.ID) {
            return false;
        }
    }

    return true;
}

$.showAuthors = function(authorsArray){
    for (i in authorsArray){
        if (doesNotContainID(authorsArray[i], shownAuthors)){
            shownAuthors.push(authorsArray[i]);
            $("#searchContent").append(`
                <div class="card myCard shoppingCard">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-2 col-md-2">
                                <img src="`+authorsArray[i].picture+`" height="140" width="140" alt="Author pic">
                            </div>
                            <div class="col-12 col-md-12 col-lg-10 mt-3">
                                <div class="row">
                                    <div class="col my-auto">
                                        <a href="author.html?id=`+authorsArray[i].ID+`"><h2>`+authorsArray[i].name+` `+authorsArray[i].last_name+`</h2></a>
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

$.justSearchAuthors = function(dataA){
    console.log ("requested authors:"+JSON.stringify(dataA));
    let authorsResponse = $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: apiurl+"/authors/",
        data: dataA,
        async: false,
        success : function() {
            
        },
        error : function(){
            $.checkIfContent(1,1);
        }
    });
    if (authorsResponse!=undefined ){
        if (authorsResponse!=undefined){
            if (authorsResponse.responseJSON.content!=undefined){
                console.log("AUTHORS ");
                console.log(authorsResponse);
                console.log(authorsResponse.responseJSON.content);
                $.showAuthors(authorsResponse.responseJSON.content);
                if (authorsResponse.responseJSON.content.length < MAX_AUTHORS){
                    $.checkIfContent(1, 1);
                }
                else{
                    $.checkIfContent(1, 2);
                }
            }
            else{
                $.checkIfContent(1, 2);
            }
        }
        else{
            $.checkIfContent(1, 1);
        }
    }
    else{
        $.checkIfContent(1, 1);
    }
}

if (type == "Authors" || type == "all"){
    for (i in authorsSearches){
        $.justSearchAuthors(authorsSearches[i]);
    }
}
//EVENTS SEARCH-------------------------------------------------------------------------------------------------------------------

var shownEvents= [];

$.showEvents = function(eventsArray){
    for (i in eventsArray){
        if (doesNotContainID(eventsArray[i], shownEvents)){
            shownEvents.push(eventsArray[i]);
            let authorE = {ID: -1, name: "not", last_name: "found"};
            let bookE = {title: "book-title"};
            var eventsAuthor = $.ajax({
                type: "GET",
                contentType: "application/x-www-form-urlencoded",
                async: false,
                url: apiurl+"/authors/?bookISBN="+eventsArray[i].B_ISBN,
                success : function() {
                    if (eventsAuthor!= undefined){
                        authorE = eventsAuthor.responseJSON.content[0];
                    }
                }
            });
            var eventsBook = $.ajax({
                type: "GET",
                contentType: "application/x-www-form-urlencoded",
                async: false,
                url: apiurl+"/books/?ISBN="+eventsArray[i].B_ISBN,
                success : function() {
                    if (eventsBook!=undefined){
                        bookE = eventsBook.responseJSON.content[0];
                    }
                }
            });
            $("#searchContent").append(`
                <div class="card myCard shoppingCard">
                    <div class="card-body">
                        <div class="col my-auto">
                            <a href="event.html?id=`+eventsArray[i].id+`"><h2>Presentation event for `+bookE.title+`</h2></a>
                            <a href="book.html?isbn=`+eventsArray[i].B_ISBN+`"><h3 class="textVariant1">`+bookE.title+`</h3></a>
                            <a href="author.html?id=`+authorE.ID+`"><h5 class="textVariant2">`+authorE.name+` `+authorE.last_name+`</h5></a>
                        </div>
                    </div>
                </div>
            `);
        }
    }
}

$.justSearchEvents = function(dataE){
    console.log ("requested events:"+JSON.stringify(dataE));
    let eventsResponse = $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: apiurl+"/events/",
        data: dataE,
        async: false,
        success : function() {
            //console.log(eventsResponse);
            
        },
        error : function(){
            $.checkIfContent(2,1);
        }
    });
    if (eventsResponse != undefined){
        if (eventsResponse.responseJSON != undefined){
            console.log("EVENTS ");
            console.log(eventsResponse);
            console.log(eventsResponse.responseJSON);
            $.showEvents(eventsResponse.responseJSON);
            if (eventsResponse.responseJSON.length < MAX_EVENTS){
                $.checkIfContent(2, 1);
            }
            else{
                $.checkIfContent(2, 2);
            }
        }
        else{
            $.checkIfContent(2, 1);
        }
    }
    else{
        $.checkIfContent(2, 1);
    }
}

if (type == "Events" || type == "all"){
    for (i in eventsSearches){
        $.justSearchEvents(eventsSearches[i]);
    }
}
