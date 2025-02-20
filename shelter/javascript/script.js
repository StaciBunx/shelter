import { initBurgerMenu } from './modules/common.js';
import { initCarousel } from './modules/home.js';
import { initCatalog } from './modules/catalog.js';

document.addEventListener('DOMContentLoaded', function () {
    initBurgerMenu();

    if (document.querySelector('.home-page')) {
        initCarousel();
    }

    if (document.querySelector('.catalog-page')) {
        initCatalog();
    }
});