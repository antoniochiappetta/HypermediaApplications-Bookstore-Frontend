
var apiurl = "http://bookstore-hypermedia-be.herokuapp.com/api";
//var apiurl = "http://localhost:8081/api"

$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results != null){
        return results[1];
    }
    return null;
}

var isbnRead = $.urlParam('isbn');

$("#showMoreReviews").remove();
$("#showMoreBooks").attr("href", "./books.html?q=similarto&isbn="+isbnRead);

console.log(isbnRead);
var book;

var response = $.ajax({
    type: "GET",
    //contentType: "application/json",
    contentType: "application/x-www-form-urlencoded",
    url: apiurl+"/books/?ISBN="+isbnRead,
    success : function() {
        book = response.responseJSON.content[0];

        //var book = bookTest;

        //console.log(response);
        $("#picture").attr("href", book.picture);
        $("#picture").attr("src", book.picture);
        $("#title").text(book.title);
        $("#event").text('Presentation for "'+book.title+'"');
        $("#breadcrumbtitle").text(book.title);
        $("#price").text(book.price+"$");
        str = book.abstract.split("\n").join("<br/>");
        $("#abstract").html("<h2>Abstract</h2><p>"+str+"</p>");
        console.log(book);
        str = book.fact_sheet.split("\n").join("<br/>");
        $("#factSheet").html("<p>"+str+"</p>");
        str = book.interview.split("\n").join("<br/>");
        $("#interview").html("<h2>Interview with the author</h2><p>"+str+"</p>")

        var responseEvent = $.ajax({
            type: "GET",
            //contentType: "application/json",
            contentType: "application/x-www-form-urlencoded",
            crossDomain: true,
            dataType: "json",
            url: apiurl+"/events?bookISBN="+isbnRead,
            success : function() {
                var event = responseEvent.responseJSON[0];
                $("#event").attr("href", "event.html?id="+event.ID);

            },
        });

        var responseAuthor = $.ajax({
            type: "GET",
            //contentType: "application/json",
            contentType: "application/x-www-form-urlencoded",
            crossDomain: true,
            dataType: "json",
            url: apiurl+"/books/"+isbnRead+"/authors",
            success : function() {
                console.log(responseAuthor);


                //responseAuthor = {responseJSON: [authorTest]};

                if (responseAuthor!= undefined){

                    $("#authors").html ("Author:");

                    var author = responseAuthor.responseJSON.content;
                    console.log(author);
                    if (author.length > 1){
                        $("#authors").html ("Authors:");
                    }
                    for (let j in author){
                        console.log(j);
                        $("#authors").append(`<a href="author.html?id=`+author[j].ID+`" class="textVariant1" >`+author[j].name+` `+author[j].last_name+`. </a>`);
                    }
                    console.log(author[0].name);
                    
                } else {
                    //alert("Couldn't load author");
                }

            },
            failure: function () {
                //alert("Couldn't load author");
            }
        });

        var similars;
        var responseSimilarTo = $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            url: apiurl+"/books/"+isbnRead+"/similarTo/",
            async: false,
            success : function() {

                console.log(responseSimilarTo);
                similars = responseSimilarTo.responseJSON.content;
                console.log("similars");
                console.log(similars);
                
            }
        });
        similars = responseSimilarTo.responseJSON.content;

        $("#content").empty();

        var authorSim;
        for (sim in similars){

            console.log(apiurl+"/books/"+similars[sim].ISBN+"/authors");

            var responseAuthorSimilar = $.ajax({
                type: "GET",
                //contentType: "application/json",
                contentType: "application/x-www-form-urlencoded",
                url: apiurl+"/books/"+similars[sim].ISBN+"/authors",
                async: false,
                success : function() {

                    console.log("authorssimilar");

                    console.log(responseAuthorSimilar);
                    
                    
                },
                failure: function () {
                    alert("Couldn't load AN author (of the similars)");
                }
            });

            //let authorSim; 
            if (responseAuthorSimilar!= undefined && responseAuthorSimilar.responseJSON != undefined){
                authorSim = responseAuthorSimilar.responseJSON.content;
            }
            else{
                authorSim = [{ID: -1, name: "not", last_name: "found"}];
            }
            let authorHTML = "";
            for (k in authorSim){
                authorHTML = authorHTML + `<a href="author.html?id=`+authorSim[k].ID+`">`+authorSim[k].name+" "+authorSim[k].last_name+`. </a>`
            }
            $("#content").append(`
                <div class="card myCard col-8 col-md-4 col-lg-3">
                <img class="card-img-top bookCover my-3" src="`+similars[sim].picture+`" alt="Book cover">
                <div class="card-body text-center">
                <h5><a href="./book.html?isbn=`+similars[sim].ISBN+`">`+similars[sim].title+`</a></h5>
                <p>`+authorHTML+`</p>
                <p class="textVariant2">`+similars[sim].price+`$</p>
                </div>
                </div>`);

            console.log(responseAuthorSimilar.responseJSON.content);


        }
        $("#content").append(`<!-- Eventually another card-->
            <div class="col-1 col-sm-1">
            </div>`);


        var responseReviews = $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            url: apiurl+"/books/"+isbnRead+"/reviews/",//?limit=5",
            success : function() {

                console.log(responseReviews);
                var reviews = responseReviews.responseJSON.content;
                $("#content2").empty();
                for (var i in reviews){

                    str = reviews[i].description.split("\n").join("<br/>");

                    $("#content2").append(`
                        <div class="card myCard col-8 col-md-4 col-lg-3">
                        <div class="card-body text-left">
                        <h5>Rating: `+reviews[i].rating+`/5</h5>
                        <p>`+str+`</p>
                        <p class="textVariant2">`+reviews[i].date+`</p>
                        </div>
                        </div>`);

                }

            }
        });

    },
    failure: function () {
        alert("Couldn't load book");
    }
});

$("#buy").click(function(){
    let ver = $("#dropdownMenuButton").text();
    if (ver == "Digital Version"){
        ver = "DIGITAL";
    }
    else{
        ver = "PAPER";
    }
    let qua = parseInt($("#quantity").val());
    
    
    //OBTAIN USER ID, or save it somehow
    var userID = 13;

    var responseUser = $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        xhrFields: {withCredentials: true},
        crossDomain: true,
        url: apiurl+"/user",
        async: false
    });

    if (responseUser == undefined || responseUser.responseJSON.content.length == 0){
        alert("item not added: log in first");
    }

    userID = responseUser.responseJSON.content[0].id

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
            U_ID: userID,
            B_ISBN: isbnRead,
            quantity: qua,
            version: ver
        }),
        success : function(data) {
            alert("Item added correctly");
        }
    });
    console.log("QVI");
    console.log(responsePost);
});
