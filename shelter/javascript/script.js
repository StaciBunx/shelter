import { initBurgerMenu } from './modules/burger.js';
import { initCarousel } from './modules/home.js';
import { initCatalog } from './modules/catalog.js';
import { initModalWindow } from './modules/modal.js';
document.addEventListener('DOMContentLoaded', function () {
    initBurgerMenu();
    initModalWindow();

    if (document.querySelector('.home-page')) {
        initCarousel();
    }

    if (document.querySelector('.catalog-page')) {
        initCatalog();
    }
});