$(function(){
    $('.submenu').hide();
    $('.gnb li a').mouseenter(function(){
        $('.submenu').stop().slideDown()
    });
    $("#nav").mouseleave(function(){
        $('.submenu').stop().slideUp()
    });

    const $topButton = $('<button>', {
        class: 'top-button',
        type: 'button',
        'aria-label': '페이지 최상단으로 이동',
        html: '<span aria-hidden="true">↑</span><b>TOP</b>'
    }).appendTo('body');

    const toggleTopButton = () => {
        $topButton.toggleClass('visible', window.scrollY > 300);
    };

    $(window).on('scroll', toggleTopButton);
    toggleTopButton();

    $topButton.on('click', function(){
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
