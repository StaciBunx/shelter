document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = this.getElementById('burgerMenu');
    const menu = this.querySelector('.navigation__list');
    // const pageBody = this.querySelector('page__body');
    burgerMenu.addEventListener('click', function () {
        burgerMenu.classList.toggle('burger_opened');
        menu.classList.toggle('navigation__list_opened');
    })
});
