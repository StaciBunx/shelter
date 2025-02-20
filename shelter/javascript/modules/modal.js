export function initModalWindow () {
    const modalWindow = document.querySelector('.modal');
    const modalWindowCloseBtn = document.querySelector('.modal-close');



    if (modalWindow && modalWindowCloseBtn) {
        modalWindowCloseBtn.addEventListener('click', function () {
            modalWindow.classList.remove('modal_opened');
        });

    }
}