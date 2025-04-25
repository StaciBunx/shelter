import { showOverlay, hideOverlay } from "./_overlay.js";

//Dom elements
const burgerMenu = document.querySelector('#burgerMenu');
const menu = document.querySelector('.navigation__list');

// Burger-menu control
export function initBurgerMenu () {

    if (burgerMenu && menu) {
        // Open/close by click on icon
        burgerMenu.addEventListener('click', function () {
            if (burgerMenu.classList.contains('burger_opened')) {
                hideOverlay();
            } else {
                showOverlay();
            }
            burgerMenu.classList.toggle('burger_opened');
            menu.classList.toggle('navigation__list_opened');
        });

        // Close menu by click on overlay
        overlay.addEventListener('click', function () {
            burgerMenu.classList.remove('burger_opened');
            menu.classList.remove('navigation__list_opened');
            hideOverlay();
        });

        // Close menu by click on menu link
        menu.addEventListener('click', function (event) {
            if (event.target.classList.contains('navigation__link')) {
                burgerMenu.classList.remove('burger_opened');
                menu.classList.remove('navigation__list_opened');
                hideOverlay();
            }
        });
    }
}
