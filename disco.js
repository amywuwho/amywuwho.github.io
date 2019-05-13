$(window).scroll(function() {   
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
        $(window).scrollTop(0);
    }
 });