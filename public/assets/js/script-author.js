/*
ATTENTION PLEASE: THE FOLLOWING VARIABLE WILLHAVE TO BE CHANGED FOR THE GREATER GOOD LATER
*/
var apiurl = "https://bookstore-hypermedia-be.herokuapp.com/api"
//var apiurl = "http://localhost:8080/api"
/*
THANK YOU FOR YOUR ATTENTION
*/

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


$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results != null){
        return results[1];
    }
    return null;
}

var idRead = $.urlParam('id');

console.log(idRead);

/*
var response = $.ajax({
    type: "GET",
    contentType: "application/json",
    url: apiurl+"/authors/?id="+idRead+"&limit=4",
    success : function() {
*/
        var response = {responseJSON: {content: [authorTest]}};

        var author = response.responseJSON.content[0];
        console.log(author);
        $("#picture").attr("src", author.picture);
        $("#name").text(author.name + " " + author.last_name);
        str = author.short_bio.split("\n").join("<br/>");
        $("#bio").html("<h5>bio:</h5><p>"+str+"</p>");

/*
        var fromThisAuthor = $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            //url: apiurl+"/books/?author="+idRead,
            url: apiurl+"/books/?author="+idRead,
            success : function() {
*/
                var fromThisAuthor = {responseJSON: {content: [bookTest, bookTest, bookTest, bookTest, bookTest]}};

                console.log(fromThisAuthor);
                
                var operas = fromThisAuthor.responseJSON.content;
                $("#content").empty();
                for (var i in operas){
                    $("#content").append(`
                        <div class="card myCard col-8 col-md-4 col-lg-3">
                        <img class="card-img-top bookCover my-3" src="`+operas[i].picture+`" alt="Book cover">
                        <div class="card-body text-center">
                        <h5><a href="book.html?isbn=`+operas[i].isbn+`">`+operas[i].title+`</a></h5>
                        <p class="textVariant2">`+operas[i].price+`$</p>
                        </div>
                        </div>`);
    
                }

                $("#content").append(`
                    <!-- Eventually another card-->
                    <div class="col-1 col-sm-1">
                    </div>`);

    
/*
            }
        });
    }
});
*/