/*
ATTENTION PLEASE: THE FOLLOWING VARIABLE WILLHAVE TO BE CHANGED FOR THE GREATER GOOD LATER
*/
var apiurl = "https://bookstore-hypermedia-be.herokuapp.com/api";
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

var eventTest = {
    name: "bau",
    description: "a\nb\nc\ndindong\nuhmytralala",
    ID: 17,
    B_ISBN: "1234123412",
    starting_date: "10-04-2096",
    ending_date: "11-04-2094",
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

var idRead = $.urlParam('id');

console.log(idRead);


var response = $.ajax({
    type: "GET",
    contentType: "application/json",
    url: apiurl+"/events/?ID="+idRead,
    success : function() {

        //var response = {responseJSON: {content: [eventTest]}};

        var event = response.responseJSON.content[0];
        console.log(event);

        //str = "<p>"+.split("\n").join("</p><p>")+"</p>";
        $("#description").html("<p>city: "+event.city+"</p><p>address: "+event.address+"</p><p>venue :"+event.venue+"</p><p>from "+event.starting_date+" to "+event.ending_date+"</p>");

        
        var eventBook = $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            url: apiurl+"/books/?isbn="+event.B_ISBN,
            success : function() {

                //var eventBook = {responseJSON: {content: [bookTest]}};

                var book = eventBook.responseJSON.content[0];
                $("#breadcrumbname").text("Presentation event for: "+book.title);
                $("#name").text("Presentation event for: "+book.title);
                console.log(book);
                $("#title").text(book.title);
                $("#title").attr("href", "book.html?isbn="+book.ISBN);


            }
        });
    }
});
