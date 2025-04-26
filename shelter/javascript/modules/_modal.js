import { showOverlay, hideOverlay } from "./_overlay.js";
import { fetchPetsData } from './_api.js';


// DOM elements
const modalWindow = document.querySelector('.modal');
// const modalContainer = document.querySelector('.modal-container');
const cardsContainer = document.querySelector('.cards-container');

function openModal () {
    modalWindow.classList.add('modal_opened');
    showOverlay();
}

function closeModal () {
    modalWindow.classList.remove('modal_opened');
    hideOverlay();
}

// function renderModal (container, data) {
//     const modal = document.createElement('div');
//     modal.classList.add('modal-container');
//     modal.innerHTML = `
//                 <button class="modal-close" type="button">
//                 <span class="visually-hidden">Закрыть окно</span>
//                 <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"
//                     aria-hidden="true" focusable="false">
//                     <path fill-rule="evenodd" clip-rule="evenodd"
//                         d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z"
//                         fill="#292929" />
//                 </svg>
//             </button>
//             <img class="modal__image" src="${data.img}" alt="${data.name}, ${data.type}" width="349" height="350">
//             <div class="modal-content">
//                 <h3 class="modal__heading heading heading_M">${data.name}</h3>
//                 <p class="modal__subheading heading heading_S">${data.type} - ${data.breed}</p>
//                 <p class="modal__text">${data.description}</p>
//                 <ul class="modal__list">
//                     <li class="modal__list-item"><b>Age:</b> ${data.age}</li>
//                     <li class="modal__list-item"><b>Inoculations:</b> ${data.inoculations}</li >
//                     <li class="modal__list-item"><b>Diseases:</b> ${data.diseases}</li>
//                     <li class="modal__list-item"><b>Parasites:</b> ${data.parasites}</li>
//                 </ul >
//             </div >
//         `;
//     container.appendChild(modal);
// }



function renderModal (container) {
    const modal = document.createElement('div');
    modal.classList.add('modal-container');
    modal.innerHTML = `
                <button class="modal-close" type="button">
                <span class="visually-hidden">Закрыть окно</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true" focusable="false">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z"
                        fill="#292929" />
                </svg>
            </button>
            <img class="modal__image" src="{data.img}" alt="{data.name}, {data.type}" width="349" height="350">
            <div class="modal-content">
                <h3 class="modal__heading heading heading_M">{data.name}</h3>
                <p class="modal__subheading heading heading_S">{data.type} - {data.breed}</p>
                <p class="modal__text">{data.description}</p>
                <ul class="modal__list">
                    <li class="modal__list-item"><b>Age:</b> {data.age}</li>
                    <li class="modal__list-item"><b>Inoculations:</b> {data.inoculations}</li >
                    <li class="modal__list-item"><b>Diseases:</b> {data.diseases}</li>
                    <li class="modal__list-item"><b>Parasites:</b> {data.parasites}</li>
                </ul >
            </div >
        `;
    container.appendChild(modal);
}

export function initModalWindow () {


    if (modalWindow && cardsContainer) {
        // const jsondata = await fetchPetsData();
        renderModal(modalWindow);


        const modalWindowCloseBtn = document.querySelector('.modal-close');

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

        // //Ignore close by click on modal
        // modalContainer.addEventListener('click', (e) => {
        //     e.stopPropagation();
        // });
    }
    else {
        console.error('Один из элементов не найден в DOM:', { modalWindow, modalWindowCloseBtn, cardsContainer });
    }
}