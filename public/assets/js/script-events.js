var apiurl = "https://bookstore-hypermedia-be.herokuapp.com/api"
//var apiurl = "http://localhost:8080/api"

const MAX_EVENTS = 3;

//USEFUL FUNCTIONS

$.showEvents = function(eventsArray){
    $("#events").empty();
    for (i in eventsArray){
        console.log(eventsArray[i]);
        let eventsAuthor = $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            async: false,
            url: apiurl+"/authors/?bookISBN="+eventsArray[i].B_ISBN,
            success : function() {
                let eventsBook = $.ajax({
                    type: "GET",
                    contentType: "application/x-www-form-urlencoded",
                    async: false,
                    url: apiurl+"/books/?isbn="+eventsArray[i].B_ISBN,
                    success : function() {
                        $("#events").append(`
                        <div class="card myCard ">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col my-auto">
                                        <a href="event.html?id=`+eventsArray[i].ID+`"><h2>Presentation event for: `+eventsBook.responseJSON.content[0].title+`</h2></a>
                                        <a href="book.html?isbn=`+eventsBook.responseJSON.content[0].ISBN+`"><h3 class="textVariant1">`+eventsBook.responseJSON.content[0].title+`</h3></a>
                                        <a href="author.html?id=`+eventsAuthor.responseJSON.content[0].ID+`"><h5 class="textVariant2">`+eventsAuthor.responseJSON.content[0].name+" "+eventsAuthor.responseJSON.content[0].last_name+`</h5></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `);
                    }
                });
            }
        });
    }
}

$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results != null){
        return results[1];
    }
    return null;
}

//READ PARAMETERS------------------------------------------------------------------------------------------

var q = $.urlParam('q');
var page = $.urlParam('page');

if(q == null && page == null){
    window.location.href = window.location.href + "?page=1";
    page = "1";
}

//page
if ( page !=  null ) {
    page = parseInt(page);
    if (page<1){
        window.location.href = window.location.href.split("page="+page).join("page=1");
        page = 1;
    }
}
else{
    window.location.href = window.location.href + "&page=1";
    page = 1;
}
console.log("page="+page);

//PAGE BUTTONS----------------------------------------------------------------------------------------------------

if(page>1){
    $("#previouspage-button").wrap( '<a href="'+window.location.href.split("page="+page).join("page="+(page-1))+'" style="display: inline-block"></a>' );
}
else{
    //$("#previouspage-button").wrap( '<a style="display: inline-block"></a>' );
    $("#previouspage-button").remove();
}

$("#nextpage-button").wrap( '<a href="'+window.location.href.split("page="+page).join("page="+(page+1))+'" style="display: inline-block"></a>' );

//----------------------------------------------------------------------------------------------------------------

//EMPTY THE SAMPLE BOOKS LIST
$("#events").empty();

//FILL UP THE events TO SEE

var data = {
    page: page,
    limit: MAX_EVENTS
};

//research cases:
if (q != null){
    //favourite books
    if (q == "all"){
        let eventsResponse = $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            url: apiurl+"/events/",
            data: data,
            success : function() {
                if (eventsResponse!=undefined){
                    if (eventsResponse.responseJSON.content!= undefined){
                        console.log(eventsResponse);
                        $.showEvents(eventsResponse.responseJSON.content);
                        if (eventsResponse.responseJSON.content.length<MAX_EVENTS){
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
                return [];
            }
        });
    }
    //month best sellers
    else if (q == "current"){
        let eventsResponse = $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            url: apiurl+"/events/latest",
            data: data,
            success : function() {
                if (eventsResponse!=undefined){
                    if (eventsResponse.responseJSON.content!= undefined){
                        console.log(eventsResponse);
                        $.showEvents(eventsResponse.responseJSON.content);
                        if (eventsResponse.responseJSON.content.length<MAX_EVENTS){
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
                return [];
            }
        });
    }
}