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

var idRead = $.urlParam('id');

console.log(idRead);

var response = $.ajax({
    type: "GET",
    contentTpe: "application/json",
    url: apiurl+"/authors/?id="+idRead,
    success : function() {
        var author = response.responseJSON.content[0];
        console.log(author);
        $("#picture").attr("src", author.picture);
        $("#name").text(author.name + " " + author.last_name);
        str = author.short_bio.split("\n").join("<br/>");
        $("#bio").html("<h5>bio:</h5><p>"+str+"</p>");

        var fromThisAuthor = $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            //url: apiurl+"/books/?author="+idRead,
            url: apiurl+"/books/?author="+idRead,
            success : function() {
    
                console.log(fromThisAuthor);
    
            }
        });
    }
});