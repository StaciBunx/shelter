// DOM elements
const modalWindow = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal-container');
const modalWindowCloseBtn = document.querySelector('.modal-close');
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
    overlay.classList.add('overlay_active');
    body.classList.add('no-scroll');
}

function closeModal () {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';

    modalWindow.classList.remove('modal_opened');
    overlay.classList.remove('overlay_active');
    body.classList.remove('no-scroll');
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
        console.error('Один из элементов не найден в DOM:', { modalWindow, modalWindowCloseBtn, cardsContainer, overlay, modalContainer });
    }
}