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


let allPetsData = []; // Исходные данные
let currentSlide = []; // Текущий слайд
let previousSlide = []; // Предыдущий слайд

// Функция для перемешивания массива (алгоритм Фишера-Йетса)
function shuffleArray (array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Функция для выбора уникальных карточек для слайда
function getUniqueCardsForSlide (data, previousCards, count) {
    const availableCards = data.filter(card => !previousCards.includes(card)); // Исключаем карточки из предыдущего слайда
    return shuffleArray(availableCards).slice(0, count); // Выбираем случайные карточки
}

// Функция для рендеринга карточек

function renderPetCard (cards) {
    const cardsContainer = document.querySelector('.carousel__cards');
    cardsContainer.innerHTML = ''; // Очищаем контейнер

    cards.forEach(({ img, name, type }) => {
        const card = `
    <article class="pets__card">
    <img class="pets__image" src="${img}" alt="${name}, ${type}" width="270" height="270">
    <h4 class="heading heading_S">${name}</h4>
    <a class="button button_light pets__card__button" href="#">Learn more</a>
    </article>
    `;
        cardsContainer.insertAdjacentHTML("beforeend", card);
    });
}

// Функция для перехода к следующему слайду
function showNextSlide () {
    const nextSlide = getUniqueCardsForSlide(allPetsData, currentSlide, 3); // Получаем новый слайд
    previousSlide = currentSlide; // Сохраняем текущий слайд как предыдущий
    currentSlide = nextSlide; // Обновляем текущий слайд
    renderPetCard(currentSlide); // Рендерим новый слайд
}

// Функция для перехода к предыдущему слайду
function showPreviousSlide () {
    if (previousSlide.length === 0) return; // Если предыдущего слайда нет, ничего не делаем
    const temp = currentSlide; // Сохраняем текущий слайд
    currentSlide = previousSlide; // Возвращаем предыдущий слайд
    previousSlide = temp; // Обновляем предыдущий слайд
    renderPetCard(currentSlide); // Рендерим предыдущий слайд
}

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


loadPetsData()
    .then((jsondata) => {
        allPetsData = shuffleArray(jsondata);
        currentSlide = getUniqueCardsForSlide(allPetsData, [], 3);
        renderPetCard(currentSlide);

        const prevButton = document.querySelector('.carousel__control_left');
        const nextButton = document.querySelector('.carousel__control_right');

        prevButton.addEventListener('click', showPreviousSlide);
        nextButton.addEventListener('click', showNextSlide);

    })
    .catch((error) => console.log(error.message));