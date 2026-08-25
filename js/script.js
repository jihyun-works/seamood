$(function(){
    $('.submenu').hide();
    $('.gnb li a').mouseenter(function(){
        $('.submenu').stop().slideDown()
    });
    $("#nav").mouseleave(function(){
        $('.submenu').stop().slideUp()
    });
});