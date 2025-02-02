document.addEventListener('DOMContentLoaded', function () {

    // Selectors constants
    const SELECTORS = {
        BURGER_MENU: '#burgerMenu',
        MENU: '.navigation__list',
        OVERLAY: '#overlay',
        BODY: '.page__body',
        CAROUSEL_CONTAINER: '.carousel__cards',
        PREV_BUTTON: '.carousel__control_left',
        NEXT_BUTTON: '.carousel__control_right',
    };

    // DOM elements
    const burgerMenu = document.querySelector(SELECTORS.BURGER_MENU);
    const menu = document.querySelector(SELECTORS.MENU);
    const overlay = document.querySelector(SELECTORS.OVERLAY);
    const body = document.querySelector(SELECTORS.BODY);
    const carouselContainer = document.querySelector(SELECTORS.CAROUSEL_CONTAINER);
    const prevButton = document.querySelector(SELECTORS.PREV_BUTTON);
    const nextButton = document.querySelector(SELECTORS.NEXT_BUTTON);

    // Carousel states
    let allPetsData = [];
    let currentSlide = [];
    let previousSlide = [];

    // Function for shuffling array with pets data
    function shuffleArray (array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function for choosing unique cards for slides
    function getUniqueCardsForSlide (data, previousCards, count) {
        const availableCards = data.filter(card => !previousCards.includes(card)); // Exclude cards from previouse slide
        return shuffleArray(availableCards).slice(0, count); // Get random cards
    }

    // Function for rending cards
    function renderPetCard (cards) {
        const fragment = document.createDocumentFragment();

        cards.forEach(({ img, name, type }) => {
            const card = document.createElement('article');
            card.classList.add('pets__card');
            card.innerHTML = `
                <img class="pets__image" src="${img}" alt="${name}, ${type}" width="270" height="270">
                <h4 class="heading heading_S">${name}</h4>
                <a class="button button_light pets__card__button" href="#">Learn more</a>
            `;
            fragment.appendChild(card);
        });

        carouselContainer.innerHTML = '';
        carouselContainer.appendChild(fragment);
    }

    // Function for showing next slide in carousel
    function showNextSlide () {
        const newSlide = getUniqueCardsForSlide(allPetsData, currentSlide, 3); // Get new slide with new unique cards
        previousSlide = currentSlide; // Save current slide as previos
        currentSlide = newSlide; // Setting current slide with new cards
        renderPetCard(currentSlide);
    }

    // Function for showing next slide in carousel
    function showPreviousSlide () {
        if (previousSlide.length === 0) return; // if there's no previous slide, do nothing
        const temp = currentSlide; // save current slide
        currentSlide = previousSlide; // use again prev slide as current
        previousSlide = temp; // save prev slide
        renderPetCard(currentSlide);
    }

    // Fetch data from JSON
    async function fetchPetsData () {
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

    // Carousel initialization
    async function initCarousel () {
        const jsondata = await fetchPetsData();
        allPetsData = shuffleArray(jsondata);
        currentSlide = getUniqueCardsForSlide(allPetsData, [], 3);
        renderPetCard(currentSlide);
        prevButton.addEventListener('click', showPreviousSlide);
        nextButton.addEventListener('click', showNextSlide);
    }

    // Burger-menu control
    function initBurgerMenu () {
        // Open/close by click on icon
        burgerMenu.addEventListener('click', function () {
            burgerMenu.classList.toggle('burger_opened');
            menu.classList.toggle('navigation__list_opened');
            overlay.classList.toggle('overlay_active');
            body.classList.toggle('no-scroll');
        });

        // Close menu by click on overlay
        overlay.addEventListener('click', function () {
            burgerMenu.classList.remove('burger_opened');
            menu.classList.remove('navigation__list_opened');
            overlay.classList.remove('overlay_active');
            body.classList.remove('no-scroll');
        });

        // Close menu by click on menu link
        menu.addEventListener('click', function (event) {
            if (event.target.classList.contains('navigation__link')) {
                burgerMenu.classList.remove('burger_opened');
                menu.classList.remove('navigation__list_opened');
                overlay.classList.remove('overlay_active');
                body.classList.remove('no-scroll');
            }
        });
    }

    // Initialization
    initBurgerMenu();
    initCarousel();
});