
var apiurl = "https://bookstore-hypermedia-be.herokuapp.com/api"
//var apiurl = "http://localhost:8080/api"

const MAX_BOOKS = 3;

//USEFUL FUNCTIONS

$.showBooks = function(booksArray){
    $("#books").empty();
    for (let i in booksArray){
        console.log(booksArray[i]);
        let author = [{ID: -1, name: "not", last_name: "found"}];
        let event = {ID: -1};
        var booksAuthor = $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            async: false,
            url: apiurl+"/books/"+booksArray[i].ISBN+"/authors",
        });
        if (booksAuthor!= undefined){
            if (booksAuthor.responseJSON!= undefined && booksAuthor.responseJSON.content!= undefined)
                author = booksAuthor.responseJSON.content;
        }
        console.log(author);

        var booksEvent = $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            url: apiurl+"/events/?bookISBN="+booksArray[i].ISBN,
            async: false,
        });
        event = booksEvent.responseJSON[0];

        let authorHTML = "";
        for (l in author){
            authorHTML = authorHTML + `<a href="author.html?id=`+author[l].ID+`" class="textVariant1">`+author[l].name+" "+author[l].last_name+`</a>`;
        }

        $("#books").append(`
            <div class="card myCard ">
                <div class="card-body">
                    <div class="row">
                        <div class="col col-md text-center">
                            <img src="`+booksArray[i].picture+`" height="140" width="100" alt="Book cover">
                        </div>
                        <div class="col-12 col-md-12 col-lg-9 mt-3">
                            <div class="row">
                                <div class="col-12 col-lg-8 my-auto">
                                    <a href="book.html?isbn=`+booksArray[i].ISBN+`"><h2>`+booksArray[i].title+`</h2></a>
                                </div>
                                <div class="col-12 col-lg-3 text-right my-auto mr-0">
                                    <h3 class="textVariant2">`+booksArray[i].price+`$</h3>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <h5 class="textVariant1"> Author: `+authorHTML+` </h5>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <h5 class="textVariant1"><a href="event.html?id=`+event.ID+`" class="textVariant1">Presentation Event for "`+booksArray[i].title+`"</a> </h5>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        `);
    }
}

$.justSearch = function(data){
    console.log ("requested books:"+JSON.stringify(data));
    let booksResponse = $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: apiurl+"/books/",
        data: data,
        success : function() {
            if(booksResponse!=undefined){
                if (booksResponse.responseJSON.content!=undefined){
                    console.log(booksResponse);
                    $.showBooks(booksResponse.responseJSON.content);
                    if (booksResponse.responseJSON.content.length < MAX_BOOKS){
                        $("#nextpage-button").remove();
                    }
                }
                else{
                    $("#nextpage-button").remove();
                }
            }
            else{
                $("#nextpage-button").remove();
            }
        },
        failure: function () {
            $("#nextpage-button").remove();
        }
    });
}

$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results != null){
        return results[1];
    }
    return null;
}

//READ BOOKS PARAMETERS------------------------------------------------------------------------------------------



var newURL = window.location.href;

var q = $.urlParam('q');
var page = $.urlParam('page');
console.log(q + " " + page);

//these are stored with %20s instead of spaces
var genre = $.urlParam('genre');
if (q!="genre" && genre!= null){
    console.log("genredeletion");
    newURL = newURL.split("&genre="+genre).join("").split("&genre="+genre.split("%20").join(" ")).join("");
    genre = null;
}
var theme = $.urlParam('theme');
if(q!= "theme" && theme != null){
    console.log("themedeletion");
    newUrl = newURL.split("&theme="+theme).join("").split("&theme="+theme.split("%20").join(" ")).join("");
    theme = null;
}
console.log(genre+ " " + theme);

var isbn = $.urlParam("isbn");
var id = $.urlParam('id');

var notFirstEnter = false;

if(q == null && page == null ){
    newURL = (newURL + "&page=1").split("html&").join("html?");
    page = "1";
    notFirstEnter = true;
}

//page
if ( page !=  null ) {
    page = parseInt(page);
    if (page<1){
        page = 1;
    }
}
else{
    newURL = newURL + "&page=1";
    page = 1;
}
console.log("page="+page);
//similarto

if (q!="similarto" && isbn!= null){
    newURL = newURL.split("&isbn="+isbn).join("");
    isbn = null;
}

//genre

if ( genre!= null ){
    $("#dropdownMenuButtonGenre").text(genre.split("%20").join(" ").split("%27").join("'"));
}
else{
    if (q == "genre"){
        newURL = (newURL + "&genre=All").split("html&").join("html?");
        genre = "All";
    }
}
//theme

if ( theme!= null ){
    $("#dropdownMenuButtonTheme").text(theme.split("%20").join(" "));
}
else{
    if (q == "theme"){
        newURL = (newURL + "&theme=All").split("html&").join("html?");
        theme = "All";
    }
}


if (newURL != window.location.href){
    window.location.href = newURL;
}

//SETTING OF LISTS-----------------------------------------------------------------------------------------


//themes
var responseT = $.ajax({
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    url: apiurl+"/books/themes",
    data: {},
    success : function() {

        var themes = responseT.responseJSON.content;

        //$("#themes").empty();
        $("#themes").html(`<a class="dropdown-item dropdown-item-booktheme" href="./books.html?page=1&q=theme&theme=All">All</a>`);
        /*if (q == "theme"){
            $("#themes").append(`<a class="dropdown-item dropdown-item-booktheme" href="`+window.location.href.split("page="+page).join("page=1").split("theme="+theme).join("theme=All")+`">All</a>`);
        }
        else{
            if (q!= null){
                $("#themes").append(`<a class="dropdown-item dropdown-item-booktheme" href="`+window.location.href.split("page="+page).join("page=1").split("q="+q).join("q=theme")+"&theme=All"+`">All</a>`);
            }
            else{
                $("#themes").append(`<a class="dropdown-item dropdown-item-booktheme" href="`+window.location.href.split("page="+page).join("page=1")+"&q=theme"+"&theme=All"+`">All</a>`);
            }
        }*/


        for (i in themes){
            $("#themes").append(`<a class="dropdown-item dropdown-item-booktheme" href="./books.html?page=1&q=theme&theme=`+themes[i].split(" ").join("%20")+`">`+themes[i]+`</a>`);
            /*if (q == "theme"){
                $("#themes").append(`<a class="dropdown-item dropdown-item-booktheme" href=`+window.location.href.split("page="+page).join("page=1").split("theme="+theme).join("theme="+themes[i].split(" ").join("%20"))+`>`+themes[i]+`</a>`);
            }
            else{
                if (q != null){
                    $("#themes").append(`<a class="dropdown-item dropdown-item-booktheme" href="`+window.location.href.split("page="+page).join("page=1").split("q="+q).join("q=theme")+"&theme="+themes[i].split(" ").join("%20")+`">`+themes[i]+`</a>`);
                }
                else{
                    $("#themes").append(`<a class="dropdown-item dropdown-item-booktheme" href="`+window.location.href.split("page="+page).join("page=1")+ "&q=theme"+"&theme="+themes[i].split(" ").join("%20")+`">`+themes[i]+`</a>`);
                }
            }*/
        }

    }
});

//genres
var responseG = $.ajax({
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    url: apiurl+"/books/genres",
    success : function() {
        
        var genres = responseG.responseJSON.content;

        $("#genres").html(`<a class="dropdown-item dropdown-item-bookgenre" href="./books.html?page=1&q=genre&genre=All">All</a>`);
        /*if(q=="genre"){
            $("#genres").html(`<a class="dropdown-item dropdown-item-bookgenre" href=`+window.location.href.split("page="+page).join("page=1").split("genre="+genre).join("genre=All")+`>All</a>`);
        }
        else{
            if (q!=null){
                $("#genres").append(`<a class="dropdown-item dropdown-item-bookgenre" href="`+window.location.href.split("page="+page).join("page=1").split("q="+q).join("q=genre")+"&genre=All"+`">All</a>`);
            }
            else{
                $("#genres").append(`<a class="dropdown-item dropdown-item-bookgenre" href="`+window.location.href.split("page="+page).join("page=1") + "&q=genre"+"&genre=All"+`">All</a>`);
            }
        }*/

        for (i in genres){
            $("#genres").append(`<a class="dropdown-item dropdown-item-bookgenre" href="./books.html?page=1&q=genre&genre=`+genres[i].split(" ").join("%20")+`">`+genres[i]+`</a>`);
            /*if (q=="genre"){
                $("#genres").append(`<a class="dropdown-item dropdown-item-bookgenre" href=`+window.location.href.split("page="+page).join("page=1").split("genre="+genre).join("genre="+genres[i].split(" ").join("%20"))+`>`+genres[i]+`</a>`);
            }
            else{
                if (q!= null){
                    $("#genres").append(`<a class="dropdown-item dropdown-item-bookgenre" href="`+window.location.href.split("page="+page).join("page=1").split("q="+q).join("q=genre")+"&genre="+genres[i].split(" ").join("%20")+`">`+genres[i]+`</a>`);
                }
                else{
                    $("#genres").append(`<a class="dropdown-item dropdown-item-bookgenre" href="`+window.location.href.split("page="+page).join("page=1")+"&q=genre"+"&genre="+genres[i].split(" ").join("%20")+`">`+genres[i]+`</a>`);
                }
            }*/
        }

    }
});

//PAGE BUTTONS----------------------------------------------------------------------------------------------------

if(page>1){
    $("#previouspage-button").wrap( '<a href="'+window.location.href.split("page="+page).join("page="+(page-1))+'" style="display: inline-block"></a>' );
    //$("#previouspage-button").attr("href", window.location.href.split("page="+page).join("page="+(page-1)));
}
else{
    //$("#previouspage-button").wrap( '<a style="display: inline-block"></a>' );
    $("#previouspage-button").remove();
}

$("#nextpage-button").wrap( '<a href="'+window.location.href.split("page="+page).join("page="+(page+1))+'" style="display: inline-block"></a>' );

//----------------------------------------------------------------------------------------------------------------

//EMPTY THE SAMPLE BOOKS LIST
//$("#books").empty();

//FILL UP THE BOOKS TO SEE

var data = {
    genre: undefined,
    theme: undefined,
    order_type: undefined,
    page: page,
    limit: MAX_BOOKS
};

/*
if (theme != "All" ){
    data.theme = theme;
}
if (genre != "All" ){
    data.genre = genre;
}*/

//special cases:
if (q != null){
    //favourite books
    if (q == "theme"){
        data.theme = theme.split("%20").join(" ");
        $.justSearch(data);
        $('#info').html("/ All books by theme"+$("#theme").text());
    }
    else if (q == "genre"){
        data.genre = genre.split("%20").join(" ").split("%27").join("'");
        $.justSearch(data);
    }
    else if (q == "favourite"){  
        data.order_type = "suggested";
        $.justSearch(data);
    }
    //month best sellers
    else if (q == "bestSellers"){
        data.order_type = "sold_copies";
        $.justSearch(data);
    }
    else if (q == "similarto"){
        var responseSimilarTo = $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            url: apiurl+"/books/"+isbn+"/similarTo",
            data: data,
            success : function() {
                if (responseSimilarTo!= undefined){
                    if (responseSimilarTo.responseJSON.content != undefined){
                        $.showBooks(responseSimilarTo.responseJSON.content);
                        console.log(responseSimilarTo.responseJSON.content);
                        if (responseSimilarTo.responseJSON.content.length < MAX_BOOKS){
                            $("#nextpage-button").remove();
                        }
                    }
                    else{
                        $("#nextpage-button").remove();
                    }
                }
                else{
                    $("#nextpage-button").remove();
                }
            },
            error : function(){
                $("#nextpage-button").remove();
            }
        });

    }
    else if (q == "fromauthor"){
        var responseFromAuthor = $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            url: apiurl+"/authors/"+id+"/books",
            data: data,
            success : function() {
                if (responseFromAuthor!=undefined){
                    console.log(responseFromAuthor);
                    $.showBooks(responseFromAuthor.responseJSON.content);
                    if (responseFromAuthor.responseJSON.content.length < MAX_BOOKS){
                        $("#nextpage-button").remove();
                    }
                }
                else{
                    $("#nextpage-button").remove();
                }
            },
            error : function(){
                $("#nextpage-button").remove();
            }
        });
    }
}
else {
    //only if the book page has not been just opened
    /*if (notFirstEnter){
        //normal filtering
        //$.justSearch(data);
    }
    else{*/
        $("#nextpage-button").remove();
    //}
}