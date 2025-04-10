// DOM elements
const modalWindow = document.querySelector('.modal');
const cardsContainer = document.querySelector('.cards-container');
const overlay = document.querySelector('#overlay');
const body = document.querySelector('.page__body');


function getScrollbarWidth () {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.parentNode.removeChild(outer);
    return scrollbarWidth;
}

function openModal () {
    const scrollbarWidth = getScrollbarWidth();
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    modalWindow.classList.add('modal_opened');
    overlay.classList.toggle('overlay_active');
    body.classList.toggle('no-scroll');
}

function closeModal () {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';

    modalWindow.classList.remove('modal_opened');
    overlay.classList.remove('overlay_active');
    body.classList.remove('no-scroll');
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