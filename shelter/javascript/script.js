document.addEventListener('DOMContentLoaded', function () {
    // Burger menu vars
    const burgerMenu = this.getElementById('burgerMenu');
    const menu = this.querySelector('.navigation__list');
    const overlay = this.getElementById('overlay');
    const links = this.querySelectorAll('.navigation__link');
    const body = this.body;

    // Carousel vars

    // Open/close menu by click on burger
    burgerMenu.addEventListener('click', function () {
        burgerMenu.classList.toggle('burger_opened');
        menu.classList.toggle('navigation__list_opened');
        overlay.classList.toggle('overlay_active');
        body.classList.toggle('no-scroll');
    });

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


async function loadPetsData () {
    try {
        const response = await fetch('./data/pets.json');
        if (!response.ok) {
            throw new Error('Ошибка загрузки данных c pets JSON');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка: ', error);
    }
}

function renderPetCard (data) {
    const cardsContainer = document.querySelector('.carousel__cards');
    data.forEach(({ img, name, type }) => {
        const card = `
    <article class="pets__card">
    <img class="pets__image" src="${img}" alt="${name}, ${type}" width="270" height="270">
    <h4 class="heading heading_S">${name}</h4>
    <a class="button button_light pets__card__button" href="#">Learn more</a>
    </article>
    `
        cardsContainer.insertAdjacentHTML("beforeend", card);
    });
}

loadPetsData()
    .then((jsondata) => renderPetCard(jsondata))
    .catch((error) => console.log(error.message));