import { initBurgerMenu } from './modules/_burger.js';
import { initCarousel } from './modules/_index.js';
import { initCatalog } from './modules/_catalog.js';
import { initModalWindow } from './modules/_modal.js';

document.addEventListener('DOMContentLoaded', function () {
    initBurgerMenu();

    if (document.querySelector('.home-page')) {
        initCarousel().then(() => {
            initModalWindow();
        });
    }

    if (document.querySelector('.catalog-page')) {
        initCatalog().then(() => {
            initModalWindow();
        });
    }

});