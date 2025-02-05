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

        PETS_CATALOG_CONTAINER: '.pets__cards',
    };

    // DOM elements
    const burgerMenu = document.querySelector(SELECTORS.BURGER_MENU);
    const menu = document.querySelector(SELECTORS.MENU);
    const overlay = document.querySelector(SELECTORS.OVERLAY);
    const body = document.querySelector(SELECTORS.BODY);

    const carouselContainer = document.querySelector(SELECTORS.CAROUSEL_CONTAINER);
    const prevButton = document.querySelector(SELECTORS.PREV_BUTTON);
    const nextButton = document.querySelector(SELECTORS.NEXT_BUTTON);

    const catalogContainer = document.querySelector(SELECTORS.PETS_CATALOG_CONTAINER);


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

    // Function for calculation count of cards per slide
    function getCountCardsPerSlide () {
        if (window.innerWidth <= 640) {
            return 1;
        } else if (window.innerWidth <= 960) {
            return 2;
        } else {
            return 3;
        }
    }

    // Function for choosing unique cards for slides
    function getUniqueCardsForSlide (data, previousCards, count) {
        const availableCards = data.filter(card => !previousCards.includes(card)); // Exclude cards from previouse slide
        return shuffleArray(availableCards).slice(0, count); // Get random cards
    }

    // Function for rending cards
    function renderPetCard (container, cards) {
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

        container.innerHTML = '';
        container.appendChild(fragment);
    }

    // Function for showing next slide in carousel
    function showNextSlide () {
        const countCardsPerSlide = getCountCardsPerSlide();
        const newSlide = getUniqueCardsForSlide(allPetsData, currentSlide, countCardsPerSlide); // Get new slide with new unique cards
        previousSlide = currentSlide; // Save current slide as previos
        currentSlide = newSlide; // Setting current slide with new cards
        renderPetCard(currentSlide);
    }

    // Function for showing previous slide in carousel
    function showPreviousSlide () {
        if (previousSlide.length === 0) return; // if there's no previous slide, do nothing
        const temp = currentSlide; // save current slide
        currentSlide = previousSlide; // use again previous slide as current
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

    function updateCarouselOnResize () {
        const newCountCardsPerSlide = getCountCardsPerSlide(); // Get new cards count

        if (currentSlide.length > newCountCardsPerSlide) {
            currentSlide = currentSlide.slice(0, newCountCardsPerSlide);
        }
        else if (currentSlide.length < newCountCardsPerSlide) {
            const additionalCards = getUniqueCardsForSlide(allPetsData, currentSlide, newCountCardsPerSlide - currentSlide.length);
            currentSlide = [...currentSlide, ...additionalCards];
        }

        renderPetCard(currentSlide);
    }

    // Carousel initialization
    async function initCarousel () {
        const jsondata = await fetchPetsData();
        const cardsCountPerSlide = getCountCardsPerSlide(); // Get initial cards count
        allPetsData = shuffleArray(jsondata);
        currentSlide = getUniqueCardsForSlide(allPetsData, [], cardsCountPerSlide);
        renderPetCard(carouselContainer, currentSlide);

        // Listeners for buttons
        prevButton.addEventListener('click', showPreviousSlide);
        nextButton.addEventListener('click', showNextSlide);

        // Listener on window resize for carousel update
        window.addEventListener('resize', updateCarouselOnResize);
    }

    //Catalog states
    let allPetsDataCatalog = [];
    let currentPage = [];


    // Function for calculation count of cards per page size
    function getCountCardsForCatalog () {
        if (window.innerWidth <= 320) {
            return 3;
        } else if (window.innerWidth <= 768) {
            return 6;
        } else {
            return 8;
        }
    }
    //Catalog initialization
    async function initCatalog () {
        const jsondata = await fetchPetsData();
        const cardsCountForCatalog = getCountCardsForCatalog();
        allPetsDataCatalog = [...Array(6)].flatMap(() => shuffleArray(jsondata));
        currentPage = allPetsDataCatalog.slice(0, cardsCountForCatalog);
        renderPetCard(catalogContainer, currentPage);
        //Listeners for pagination

    }

    // Initialization
    initBurgerMenu();
    initCarousel();
    initCatalog();
});