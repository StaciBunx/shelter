document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = this.getElementById('burgerMenu');
    const menu = this.querySelector('.navigation__list');
    const overlay = this.getElementById('overlay');
    const links = this.querySelectorAll('.navigation__link');
    const body = this.body;

    // Open/close menu by click on burger
    burgerMenu.addEventListener('click', function () {
        burgerMenu.classList.toggle('burger_opened');
        menu.classList.toggle('navigation__list_opened');
        overlay.classList.toggle('overlay_active');
        body.classList.toggle('no-scroll');
    })

    // Open/close menu and overlay by click on overlay
    overlay.addEventListener('click', function () {
        burgerMenu.classList.remove('burger_opened');
        menu.classList.remove('navigation__list_opened');
        overlay.classList.remove('overlay_active');
        body.classList.remove('no-scroll');

    });

    // Open/close menu and overlay by click on link in the menu
    links.forEach(link => {
        link.addEventListener('click', function () {
            burgerMenu.classList.remove('burger_opened');
            menu.classList.remove('navigation__list_opened');
            overlay.classList.remove('overlay_active');
            body.classList.remove('no-scroll');
        });

    });

});
