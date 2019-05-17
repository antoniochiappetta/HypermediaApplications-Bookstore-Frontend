var apiurl = "https://bookstore-hypermedia-be.herokuapp.com/api";
//var apiurl = "http://localhost:8080/api"

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

        var event = response.responseJSON[0];
        console.log(event);

        //str = "<p>"+.split("\n").join("</p><p>")+"</p>";
        $("#description").html("<p>city: "+event.city+"</p><p>address: "+event.address+"</p><p>venue :"+event.venue+"</p><p>from "+event.starting_date+" to "+event.ending_date+"</p>");

        
        var eventBook = $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            url: apiurl+"/books/?ISBN="+event.B_ISBN,
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
