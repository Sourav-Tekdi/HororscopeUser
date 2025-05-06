$(document).ready(function () {
    "use strict";

    $.sidebarMenu = function (menu) {
        var animationSpeed = 300;
        var subMenuSelector = '.sidebar-submenu';

        // Handle click events on the sidebar menu items
        $(document).on('click', 'li a', function (e) {
            e.preventDefault();
            var currentUrl = window.location.href;
            var $this = $(this);
            var checkElement = $this.next();

            // Get the parent menu
            var parent = $this.parents('ul').first();

            // Close all open submenus within the parent menu
            var openSubmenus = parent.find('ul:visible');
            openSubmenus.not(checkElement).slideUp(animationSpeed, function () {
                $(this).removeClass('menu-open');
            });

            // Remove active class from all menu items
            parent.find('li.active').removeClass('active');

            // If the submenu is visible, hide it
            if (checkElement.is(subMenuSelector) && checkElement.is(':visible')) {
                checkElement.slideUp(animationSpeed, function () {
                    checkElement.removeClass('menu-open');
                });
            } 
            // If the submenu is not visible, show it
            else if (checkElement.is(subMenuSelector) && !checkElement.is(':visible')) {
                // Show the target submenu and add the menu-open class
                checkElement.slideDown(animationSpeed, function () {
                    checkElement.addClass('menu-open');
                });
                $this.parent("li").addClass('active');
            } 
            // If it's a link without submenu, just add active class
            else {
                $this.parent("li").addClass('active');
            }
        });
    };
});
