var apiurl = "https://bookstore-hypermedia-be.herokuapp.com/api"
//var apiurl = "http://localhost:8080/api"

$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results != null){
        return results[1];
    }
    return null;
}

var idRead = $.urlParam('id');

$("#showMore").attr("href", "./books.html?page=1&q=fromauthor&id="+idRead);

console.log(idRead);
console.log(apiurl+"/authors/?id="+idRead);

var response = $.ajax({
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    url: apiurl+"/authors/?ID="+idRead,
    success : function() {

        var author = response.responseJSON.content[0];
        console.log(author);
        $("#picture").attr("src", author.picture);
        $("#name").text(author.name + " " + author.last_name);
        str = author.short_bio.split("\n").join("<br/>");
        $("#bio").html("<h5>Short bio:</h5><p>"+str+"</p>");

        var fromThisAuthor = $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            url: apiurl+"/authors/"+idRead+"/books",
            success : function() {

                console.log(fromThisAuthor);
                
                var operas = fromThisAuthor.responseJSON.content;
                $("#content").empty();
                for (var i in operas){
                    $("#content").append(`
                        <div class="card myCard col-8 col-md-4 col-lg-3">
                        <img class="card-img-top bookCover my-3" src="`+operas[i].picture+`" alt="Book cover">
                        <div class="card-body text-center">
                        <h5><a href="book.html?isbn=`+operas[i].ISBN+`">`+operas[i].title+`</a></h5>
                        <p class="textVariant2">`+operas[i].price+`$</p>
                        </div>
                        </div>`);
    
                }

                $("#content").append(`
                    <!-- Eventually another card-->
                    <div class="col-1 col-sm-1">
                    </div>`);

    

            }
        });
    }
});
