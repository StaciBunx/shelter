document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = this.getElementById('burgerMenu');
    const menu = this.querySelector('.navigation__list');
    const overlay = this.getElementById('overlay');
    burgerMenu.addEventListener('click', function () {
        burgerMenu.classList.toggle('burger_opened');
        menu.classList.toggle('navigation__list_opened');
        overlay.classList.toggle('overlay_active');
    })

    overlay.addEventListener('click', function () {
        burgerMenu.classList.remove('burger_opened');
        menu.classList.remove('navigation__list_opened');
        overlay.classList.remove('overlay_active');
    });

});
