//Pages Animations

$(document).ready(function() {

    //Slider Scroll1 in the page
    $('#right-button').click(function() {
        event.preventDefault();
        $('#content').animate({
            scrollLeft: "+=200px"
        }, "slow");
    });

    $('#left-button').click(function() {
        event.preventDefault();
        $('#content').animate({
            scrollLeft: "-=200px"
        }, "slow");
    });

    //Slider Scroll2 in the page
    $('#right-button2').click(function() {
        event.preventDefault();
        $('#content2').animate({
            scrollLeft: "+=200px"
        }, "slow");
    });

    $('#left-button2').click(function() {
        event.preventDefault();
        $('#content2').animate({
            scrollLeft: "-=200px"
        }, "slow");
    });

    //Back button
    $('#back-button').click(function() {
        window.history.back();
    });

    //Dynamic content when reducing the size of the screen in the search bar
    $(window).resize(function() {
        // This will fire each time the window is resized:
        if($(window).width() <= 768) {
            $('#navbarSearchField, #navbarSearchFieldHome').attr("placeholder","");
        } else {
            $('#navbarSearchField, #navbarSearchFieldHome').attr("placeholder","What are you searching for?");
        }
    }).resize();

    //Search with enter button in home page
    $('#navbarSearchFieldHome').on('keypress',function(e){
        if(e.which == 13) {
            window.location.href = "pages/search.html";
        }
    });

    //Search with click on the button home page
    $('#searchButtonHome').click(function() {
        window.location.href = "pages/search.html";
    });

    $.search = function(){
        if ($.trim($("#navbarSearchField").val()).length > 0){
            window.location.href = "search.html?search="+$("#navbarSearchField").val().split(" ").join("%20")+"&type="+$(".dropdown-toggle-search").text();
        }
    }


    //Search with enter button
    $('#navbarSearchField').on('keypress',function(e){
        if(e.which == 13) {
            $.search();
        }
    });

    //Search with click on the button
    $('#searchButton').click(function() {
        $.search();
    });

    //Dropdown value update onClick
    $(".dropdown-item").on('click', function(event){
        event.stopPropagation();
        event.stopImmediatePropagation();
        //(... rest of your JS code)

        //Case: Search Bar
        if($(this).hasClass("dropdown-item-search")){
            $(".dropdown-toggle-search").text($(this).text());
            $(".dropdown-menu-search").removeClass("show");
        }

        //Case: Book Version
        if($(this).hasClass("dropdown-item-bookversion")) {

            //Different behaviour since different elements with book version can be in the same page
            $(this).parent().parent().children('button').text($(this).text());
            $(".dropdown-menu-bookversion").removeClass("show");
        }

        //Case: Book Theme
        if($(this).hasClass("dropdown-item-booktheme")) {
            $(".dropdown-toggle-booktheme").text($(this).text());
            $(".dropdown-menu-booktheme").removeClass("show");
        }

        //Case: Book Genre
        if($(this).hasClass("dropdown-item-bookgenre")) {
            $(".dropdown-toggle-bookgenre").text($(this).text());
            $(".dropdown-menu-bookgenre").removeClass("show");
        }

        //Case: Show Order (in Search page)
        if($(this).hasClass("dropdown-item-showorder")) {
            $(".dropdown-toggle-showorder").text($(this).text());
            $(".dropdown-menu-showorder").removeClass("show");
        }

    });

    //Dynamic hide of buttons for swipe left and right for touchscreens sizes
    $(window).resize(function() {
        // This will fire each time the window is resized:
        if($(window).width() <= 768) {
            $('#left-button').hide();
            $('#left-button2').hide();
            $('#right-button').hide();
            $('#right-button2').hide();
        }
    }).resize();

    //Dynamic show of buttons for swipe left and right for non-touchscreens sizes
    $(window).resize(function() {
        // This will fire each time the window is resized:
        if($(window).width() > 768) {
            $('#left-button').show();
            $('#left-button2').show();
            $('#right-button').show();
            $('#right-button2').show();
        }
    }).resize();

    //USER-LOGGED PART
/*
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    var apiurl = "https://bookstore-hypermedia-be.herokuapp.com/api";
    //FIX FINDING USER ID
    var responseLogin = $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        url: apiurl+"/user/login",
        data: {email: "antonioc@gmail.com", password: "unapassword" },
        async: false,
        success : function() {
            console.log(readCookie("session"));
            console.log(readCookie("session.sig"));
            console.log("cookies: "+document.cookie);
        },
    })

    var responseUSER = $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: apiurl+"/user/8",
        async: false,
        success : function() {
    
            console.log(responseUSER);
            console.log("cookies: "+document.cookie);
            //$("#user").text();
            
        },
    });*/
});