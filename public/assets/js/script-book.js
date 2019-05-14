
var apiurl = "https://bookstore-hypermedia-be.herokuapp.com/api";
//var apiurl = "http://localhost:8080/api"

var bookTest = {
    isbn: "1234123412",
    title:"BookTest", 
    picture:"https://www.engineyard.com/hs-fs/hubfs/Blog%20Images/Jquery.jpg?width=450&name=Jquery.jpg", 
    abstract:"1\n2\n3\n4 parole", 
    fact_sheet:"unacosa\nunaltracosa\nunaterzacosa",
    genre:"sci-fi",
    release_date:"1913-01-02",
    sold_copies:4,
    theme: "intergalactic war",
    price: 299.97,
    interview: "giantrallal\nlallerol\nlà"
}

var authorTest = {
    ID: 17,
    name: "porziuncolo",
    last_name: "dellePareti",
    short_bio: "un\nbel\ngiorno\ndi\ngianluigi",
    picture: "https://upload.wikimedia.org/wikipedia/commons/6/64/Douglas_adams_portrait.jpg",
}

var reviewTest = {
    ID: 9,
    B_ISBN: "1234123412",
    rating: "4.25",
    description: "tutto\nmolto\nbeoutifoulewr",
    date: "11-24-2024",
    U_ID: 33

}

var userTest =  {
    ID: 197,
    email: "alfio@degiorgi.conigliamento",
    password: "passwordonamegasicurissimadellesistenzaintergalattica",
    name: "giorgio",
    last_name: "vannuccio",
    is_admin: false
}

var eventTest = {
    ID: 17,
    B_ISBN: "1234123412",
    startingDate: "10-04-2096",
    endingDate: "11-04-2094",
    venue: "venutaDelVenuitore",
    address: "addressico",
    city: "cittàSenzaNome"
}


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
            url: apiurl+"/events/?bookISBN="+isbnRead,
            success : function() {
                console.log(responseEvent);
                var event = responseEvent.respondeJSON[0];

                //var event = eventTest;
                $("#event").attr("href", "event.html?id="+event.ID);

            },
            failure: function () {
                //alert("Couldn't load event");
            }
        });

        var responseAuthor = $.ajax({
            type: "GET",
            //contentType: "application/json",
            contentType: "application/x-www-form-urlencoded",
            crossDomain: true,
            dataType: "json",
            url: apiurl+"/authors/?bookISBN="+isbnRead,
            success : function() {
                console.log(responseAuthor);


                //responseAuthor = {responseJSON: [authorTest]};

                if (responseAuthor.responseText != "{}"){

                    var author = responseAuthor.responseJSON[0];
                    console.log(author.name);
                    $("#author").attr("href", "author.html?id="+author.ID);
                    $("#author").text(author.name+" "+author.last_name);
                    str = author.short_bio.split("\n").join("<br />");
                    $("#descriptionauthor").html("<h2>About the Author</h2><p>"+str+"</p>");
                    
                } else {
                    alert("Couldn't load author");
                }

            },
            failure: function () {
                alert("Couldn't load author");
            }
        });

        var responseSimilarTo = $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            url: apiurl+"/books/?ISBN="+isbnRead+"/similarTo/?limit=5",
            success : function() {

                //responseSimilarTo = {responseJSON: [bookTest, bookTest, bookTest, bookTest]}
                //console.log(responseSimilarTo);
                var similars = responseSimilarTo.responseJSON;
                $("#content").empty();
                for (var sim in similars){
                    //RESEARCH FOR AUTHOR AS WELL!!

                    var responseAuthorSimilar = $.ajax({
                        type: "GET",
                        //contentType: "application/json",
                        contentType: "application/x-www-form-urlencoded",
                        crossDomain: true,
                        dataType: "json",
                        url: apiurl+"/authors/?bookISBN="+isbnRead,
                        success : function() {

                            console.log(responseAuthorSimilar);
                            let authorSim = responseAuthorSimilar.responseJSON[0];

                            //let authorSim = authorTest;
                            $("#content").append(`
                                <div class="card myCard col-8 col-md-4 col-lg-3">
                                <img class="card-img-top bookCover my-3" src="`+similars[sim].picture+`" alt="Book cover">
                                <div class="card-body text-center">
                                <h5>`+similars[sim].title+`</h5>
                                <p><a href="author.html?id=`+authorSim.ID+`">Name `+authorSim.name+" "+authorSim.last_name+`Surname</a></p>
                                <p class="textVariant2">`+similars[sim].price+`$</p>
                                </div>
                                </div>`);

                        },
                        failure: function () {
                            alert("Couldn't load AN author (of the similars)");
                        }
                    });

    
                }
                $("#content").append(`<!-- Eventually another card-->
                    <div class="col-1 col-sm-1">
                    </div>`);

            }
        });

        var responseReviews = $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            url: apiurl+"/books/?ISBN="+isbnRead+"/reviews/",//?limit=5",
            success : function() {

                //responseReviews = {responseJSON: [reviewTest, reviewTest, reviewTest, reviewTest, reviewTest, reviewTest, reviewTest]}
                //console.log(responseSimilarTo);
                var reviews = responseReviews.responseJSON;
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
    //alert(ver + " " + qua);
    var userID; //MAGICAMENTE OTTIENI DAL REGNO DELLE FATE L'ID DELL'UTENTE
    var responsePost = $.ajax({
        type: "POST",
        contentType: "application/json",
        url: apiurl+"/user/"+8+"/shoppingBag/",
        data: {
            U_ID: userID,
            B_ISBN: isbnRead,
            quantity: qua,
            version: ver
        },
        success : function() {
            alert("item succesfully added");
        }
    });
});
