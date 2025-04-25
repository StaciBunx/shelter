import { showOverlay, hideOverlay } from "./_overlay.js";

// DOM elements
const modalWindow = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal-container');
const modalWindowCloseBtn = document.querySelector('.modal-close');
const cardsContainer = document.querySelector('.cards-container');

function openModal () {
    modalWindow.classList.add('modal_opened');
    showOverlay();
}

function closeModal () {
    modalWindow.classList.remove('modal_opened');
    hideOverlay();
}

export function initModalWindow () {
    if (modalWindow && modalWindowCloseBtn && modalContainer && cardsContainer) {

        //Open modal by click on cards' button
        cardsContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('pets__card__button')) {
                e.preventDefault();
                openModal();
            }
            openModal();
        });

        //Clode modal by click on X-button
        modalWindowCloseBtn.addEventListener('click', closeModal);
        //Close modal by click on overlay
        overlay.addEventListener('click', closeModal);

        //Ignore close by click on modal
        modalContainer.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    else {
        console.error('Один из элементов не найден в DOM:', { modalWindow, modalWindowCloseBtn, cardsContainer, modalContainer });
    }
}