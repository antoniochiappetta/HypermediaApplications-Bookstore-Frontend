var apiurl = "https://bookstore-hypermedia-be.herokuapp.com/api"


//BOOK__________________________________________________________________________________________________________________

$("#Bookpost").click(function(){
    let book ={
        title: $("#title").val(),
        ISBN: $("#ISBN").val(),
        releaseDate: $("#releasedate").val(),
        picture: $("#picture").val(),
        factSheet: $("#factSheet").val(),
        abstract: $("#abstract").val(),
        genre: $("#genre").val(),
        theme: $("#theme").val(),
        price: $("#price").val(),
        soldCopies: $("#soldcopies").val(),
        interview: $("#interview").val()
    }

    console.log(book);

    let B = $.ajax({
        type: "post",
        contentType: "application/json",
        url: apiurl+"/books/",
        Book: book,
        async: false,
        success : function() {
            console.log("done");
        },
        error : function(){
            console.log("no");
        },
        always: function(){
            console.log(B);
        }
    });

    alert("something");
});

$("#Bookdelete").click(function(){
    let isbn = $("#ISBN").val();
    let B = $.ajax({
        type: "DELETE",
        contentType: "application/json",
        url: apiurl+"/books/ISBN="+isbn,
        async: false,
        //Book: book,
        success : function() {
            console.log(B);
            console.log("done");
        }
    });

    alert("something");
});

//USER_________________________________________________________________________________________________________________-

$("#Userpost").click(function(){
    //alert(1);
    var user = {
        name: $("#Uname").val(),
        lastName: $("#Ulastname").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        ID: $("#uID").val(),
        isAdmin: $("#isAdmin").val()
    }

    let B = $.ajax({
        type: "POST",
        contentType: "application/json",
        url: apiurl+"/user/",
        data: user,
        success : function() {
            console.log("done");
        },
        error : function(){
            console.log("no");
        },
        always: function(){
            console.log(B);
        }
    });

    alert("somethingUser");
});

$("#Userdelete").click(function(){
    let isbn = $("#ISBN").val();
    let B = $.ajax({
        type: "DELETE",
        contentType: "application/json",
        url: apiurl+"/user/"+$("#uID").val(),
        async: false,
        //Book: book,
        success : function() {
            console.log(B);
            console.log("done");
        }
    });

    alert("somethingUser");
});