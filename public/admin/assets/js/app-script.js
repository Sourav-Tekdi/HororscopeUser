
$(function () {
    "use strict";


    //sidebar menu js
    // $.sidebarMenu('.sidebar-menu');

    // === toggle-menu js
    $(document).on("click", ".toggle-menu", function (e) {
        e.preventDefault();
        $(document).find("#wrapper").toggleClass("toggled");
    });

    // === sidebar menu activation js

    // $(document).ready(function () {
    //     // Get the current URL
    //     var currentUrl = window.location.href;

    //     // Find and mark the active menu item
    //     var $activeMenuItem = $(".sidebar-menu a").filter(function () {
    //         return this.href === currentUrl;
    //     }).addClass("active").parent().addClass("active");

    //     // Traverse up the DOM to mark parent elements as active
    //     while ($activeMenuItem.length && $activeMenuItem.is("li")) {
    //         $activeMenuItem = $activeMenuItem.parent().addClass("in").parent().addClass("active");
    //     }
    // });


    /* Back To Top */

    $(document).ready(function () {
        $(window).on("scroll", function () {
            if ($(this).scrollTop() > 300) {
                $(document).find('.back-to-top').fadeIn();
            } else {
                $(document).find('.back-to-top').fadeOut();
            }
        });
    });

    $(function () {
        $(document).find('[data-toggle="popover"]').popover()
    })


    $(function () {
        $(document).find('[data-toggle="tooltip"]').tooltip()
    })



});