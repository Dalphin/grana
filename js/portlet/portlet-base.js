/**
 * Created by mmillet on 06/06/2016.
 */


$(document).ready(function(){
    $('.header_language_block').hover(
        function () {
            $(".header_language_menu").stop().slideDown();
        },
        function () {
            $(".header_language_menu").stop().slideUp();
        });
});
