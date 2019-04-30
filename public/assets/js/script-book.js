/*
ATTENTION PLEASE: THE FOLLOWING VARIABLE WILLHAVE TO BE CHANGED FOR THE GREATER GOOD LATER
*/
var apiurl = "https://bookstore-hypermedia-be.herokuapp.com/api"
//var apiurl = "http://localhost:8080/api"
/*
THANK YOU FOR YOUR ATTENTION
*/


$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return results[1] || 0;
}

var isbnRead = $.urlParam('isbn');

console.log(isbnRead);

var response = $.ajax({
    type: "GET",
    /*xhrFields: {
        withCredentials: true
    },*/
    contentTpe: "application/json",
    //contentType: "application/x-www-form-urlencoded",
    url: apiurl+"/books/?ISBN="+isbnRead,
    //data = {isbn = isbnRead},
    success : function() {
        //alert (this);
        var book = response.responseJSON.content[0];
        console.log(response);
        $("#picture").attr("href", book.picture);
        $("#picture").attr("src", book.picture);
        $("#title").text(book.title);
        $("#breadcrumbtitle").text(book.title);
        str = book.abstract.split("\n").join("<br/>");
        $("#abstract").html("<h2>Abstract</h2><p>"+str+"</p>");
        //console.log(book);
        str = book.fact_sheet.split("\n").join("<br/>");
        $("#factSheet").html("<p>"+str+"</p>");

        var responseAuthor = $.ajax({
            type: "GET",
            //contentType: "application/json",
            contentType: "application/x-www-form-urlencoded",
            crossDomain: true,
            dataType: "json",
            url: apiurl+"/authors/?bookISBN="+isbnRead,
            success : function() {

                console.log(responseAuthor);

                if (responseAuthor.responseText != "{}"){

                    var author = responseAuthor.responseJSON[0];
                    console.log(author.name);
                    $("#author").attr("href", "author.html?id="+author.ID)
                    $("#author").text(author.name+" "+author.last_name)
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

                console.log(responseSimilarTo);

            }
        });

    },
    failure: function () {
        alert("Couldn't load book");
    }
});

//console.log('${book.title}');
//console.log(responseBook.factSheet);
/*
fetch(`/books/${isbn}`)
    .then(function(response) {
        return response.json();
    });
    .then(function(data) {

        var book = data[0];
        console.log(book.isbn);



        fetch(`/authors/${book.isbn}`)
        .then(function(response){
            return response.json();
        });
        .then(function(data) {

            var author = data[0];
            //$("#price").text(book.price);
            //parte per ottenere l'evento
            //$("#event").attr("href", "event.html?id="+event.id)

            //get similar books
            //empty #content from all "card" divs
            //create the list with this
            /*
            <div class="card myCard col-8 col-md-4 col-lg-3">
                <img class="card-img-top bookCover my-3" src="../assets/img/bookfront.jpg" alt="Book cover">
                <div class="card-body text-center">
                    <h5>Book title</h5>
                    <p><a href="author.html">Name Surname</a></p>
                    <p class="textVariant2">10,99$</p>
                </div>
            </div>
            /


            //TODO:reviews

        });

    });*/


$(function () {


    /*
    var data = {};
    data.title = "title";
    data.message = "message";

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://localhost:3000/endpoint',
        success: function(data) {
            console.log('success');
            console.log(JSON.stringify(data));
        }

    $('#address').keyup(function () {
        var url = "http://example.com/?page_id=156"; // url to thank you page
        url += '&property=' + this.value //append the value
        $('#thank_you_page_field').val(encodeURIComponent(url)) // update the value
        });


    $("#content").load(pageurl)
    */

})
