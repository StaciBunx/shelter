import { showOverlay, hideOverlay } from "./_overlay";

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

    if (modalWindow && modalWindowCloseBtn && modalContainer && cardsContainer && overlay) {
        cardsContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('pets__card__button')) {
                e.preventDefault();
                openModal();
            }
        });

        modalWindowCloseBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);

        modalContainer.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    else {
        console.error('Один из элементов не найден в DOM:', { modalWindow, modalWindowCloseBtn, cardsContainer, modalContainer });
    }
}