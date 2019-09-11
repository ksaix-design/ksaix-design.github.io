//nav-mobile

$(".nav-mobile-header-icon").click(function(){
    $(".nav-mobile").toggleClass("active");
});

function closeMenu(){
    $(".nav-mobile").removeClass("active");
}

//scroll lincks
$("a.js-anchor").click(function () { 
    var elementClick = $(this).attr("href");
    var destination = $(elementClick).offset().top-100;
    $('html,body').animate( { scrollTop: destination }, 800 );
        closeMenu();
    return false;
});
  
//nav & scroll-up
$(window).scroll(function(){
    var scTop = $(window).scrollTop();
    
    if(scTop<1){
        $(".nav").removeClass("active");
        $(".scroll-up").css({
            "top" : "-70px",
            "transition" : "all .5s ease"
        });
    }
    if(scTop>1){
        $(".nav").addClass("active");
        $(".scroll-up").css({
            "top" : "75px",
            "transition" : "all .5s ease"
        });
    }
});

//slogan span h2
$(".slogan-h2-1").each(function () {
    var elem = $(this);
    elem.html(elem.html().replace(/^(\S+)/,"<span>$1</span>"));
});
$(".slogan-h2-2").each(function () {
    var elem = $(this);
    elem.html(elem.html().replace(/(\S+)\s(\S+)/,"<span>$1 $2</span>"));
});
$(".slogan-h2-3").each(function () {
    var elem = $(this);
    elem.html(elem.html().replace(/(\S+)\s(\S+)/,"<span>$1 $2</span>"));
});