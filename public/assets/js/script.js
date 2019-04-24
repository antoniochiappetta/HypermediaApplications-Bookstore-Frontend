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


    //Search with enter button
    $('#navbarSearchField').on('keypress',function(e){
        if(e.which == 13) {
            window.location.href = "search.html";
        }
    });

    //Search with click on the button
    $('#searchButton').click(function() {
        window.location.href = "search.html";
    });



})