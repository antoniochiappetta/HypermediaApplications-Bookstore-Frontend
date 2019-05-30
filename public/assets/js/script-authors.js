var apiurl = "https://bookstore-hypermedia-be.herokuapp.com/api"
//var apiurl = "http://localhost:8080/api"

const MAX_AUTHORS = 6;

//USEFUL FUNCTIONS

$.showAutors = function(authorsArray){
    $("#authors").empty();
    for (let i in authorsArray){

        $("#authors").append(`
            <div class="card myCard ">
                <div class="card-body">
                    <div class="row">
                        <div class="col col-md text-center">
                            <img src="`+authorsArray[i].picture+`" height="100" width="100" alt="Author picture">
                        </div>
                        <div class="col-12 col-md-12 col-lg-9 mt-3">
                            <div class="row">
                                <div class="col-12 col-lg-8 my-auto">
                                    <a href="./author.html?id=`+authorsArray[i].ID+`"><h2>`+authorsArray[i].name+` `+authorsArray[i].last_name+`</h2></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `);
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

var newURL = window.location.href;

if(q == null && page == null){
    newURL = newURL + "?page=1&q=all";
    page = "1";
    q="all";
}

//page
if ( page !=  null ) {
    page = parseInt(page);
    if (page<1){
        newURL = newURL.split("page="+page).join("page=1");
        page = 1;
    }
}
else{
    newURL = newURL + "&page=1";
    page = 1;
}
console.log("page="+page);

if (window.location.href != newURL){
    window.location.href = newURL;
}

//PAGE BUTTONS----------------------------------------------------------------------------------------------------

if(page>1){
    $("#previouspage-button").wrap( '<a href="'+window.location.href.split("page="+page).join("page="+(page-1))+'" style="display: inline-block"></a>' );
}
else{
    $("#previouspage-button").remove();
}

$("#nextpage-button").wrap( '<a href="'+window.location.href.split("page="+page).join("page="+(page+1))+'" style="display: inline-block"></a>' );

//----------------------------------------------------------------------------------------------------------------


//FILL UP THE authors TO SEE

var data = {
    page: page,
    limit: MAX_authors
};

//research cases:
if (q != null){
    //all authors
    if (q == "all"){
        console.log("q=all");
        let authorsResponse = $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            url: apiurl+"/authors/",
            data: data,
            success : function() {
                console.log(authorsResponse);
                if (authorsResponse!=undefined){
                    if (authorsResponse.responseJSON!= undefined){
                        if (authorsResponse.responseJSON.content != undefined){
                            console.log(authorsResponse.responseJSON.content);
                            $.showAutors(authorsResponse.responseJSON.content);
                            if (authorsResponse.responseJSON.content.length<MAX_AUTHORS){
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
                }
                else{
                    $("#nextpage-button").remove();
                }

                $('#info').html("/ All authors");
            },
            failure: function () {
                $("#nextpage-button").remove();
                return [];
            }
        });
    }
}
else{
    $( "#allAuthors" ).trigger( "click" );

    //$("#nextpage-button").remove();
}