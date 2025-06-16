import { showOverlay, hideOverlay } from "./_overlay.js";
import { fetchPetsData } from './_api.js';


// DOM elements
const modalWindow = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal-container');
const cardsContainer = document.querySelector('.cards-container');

function openModal () {
    modalWindow.classList.add('modal_opened');
    showOverlay();
}

function closeModal () {
    modalWindow.classList.remove('modal_opened');
    hideOverlay();
}

function renderModal (container, pet) {
    modalContainer.innerHTML = '';

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
            <img class="modal__image" src="${pet.img}" alt="${pet.name}, ${pet.type}" width="349" height="350">
            <div class="modal-content">
                <h3 class="modal__heading heading heading_M">${pet.name}</h3>
                <p class="modal__subheading heading heading_S">${pet.type} - ${pet.breed}</p>
                <p class="modal__text">${pet.description}</p>
                <ul class="modal__list">
                    <li class="modal__list-item"><b>Age:</b>${pet.age}</li>
                    <li class="modal__list-item"><b>Inoculations:</b> ${pet.inoculations.join(', ')}</li >
                    <li class="modal__list-item"><b>Diseases:</b> ${pet.diseases.join(', ')}</li>
                    <li class="modal__list-item"><b>Parasites:</b> ${pet.parasites.join(', ')}</li>
                </ul >
            </div >
        `;
    container.appendChild(modal);
}

export async function initModalWindow () {

    if (modalWindow && cardsContainer) {
        const modalWindowCloseBtn = document.querySelector('.modal-close');

        //Open modal by click on cards' button
        cardsContainer.addEventListener('click', async (e) => {
            if (e.target.classList.contains('pets__card__button')) {
                e.preventDefault();
                const card = e.target.closest('.pets__card');

                const petName = card.querySelector('.pets__name').textContent;
                const petsData = await fetchPetsData();

                const pet = petsData.find(p => p.name === petName);
                if (!pet) {
                    console.error(`Питомец с именем "${petName}" не найден`);
                    return;
                }

                renderModal(modalWindow, pet);
                openModal();
            }
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
        console.error('Один из элементов не найден в DOM:', { modalWindow, modalWindowCloseBtn, cardsContainer });
    }
}