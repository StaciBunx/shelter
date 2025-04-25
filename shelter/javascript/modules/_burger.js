import { showOverlay, hideOverlay } from "./_overlay";

// Burger-menu control
export function initBurgerMenu () {
    const burgerMenu = document.querySelector('#burgerMenu');
    const menu = document.querySelector('.navigation__list');
    const body = document.querySelector('.page__body');

    if (burgerMenu && menu && body) {
        // Open/close by click on icon
        burgerMenu.addEventListener('click', function () {
            burgerMenu.classList.toggle('burger_opened');
            menu.classList.toggle('navigation__list_opened');
            showOverlay();
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
