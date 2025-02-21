// DOM elements
const modalWindow = document.querySelector('.modal');
const cardsContainer = document.querySelector('.cards-container');



function openModal () {
    modalWindow.classList.add('modal_opened');
}

function closeModal () {
    modalWindow.classList.remove('modal_opened');
}

export function initModalWindow () {
    const modalWindowCloseBtn = document.querySelector('.modal-close');


    if (modalWindow && modalWindowCloseBtn && cardsContainer) {
        modalWindowCloseBtn.addEventListener('click', closeModal);
        cardsContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('pets__card__button')) {
                e.preventDefault();
                openModal();
            }
        });
    }
    else {
        console.error('Один из элементов не найден в DOM:', { modalWindow, modalWindowCloseBtn, cardsContainer });
    }
}