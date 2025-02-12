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
        PAGINATION_PREV: '.pagination__prev',
        PAGINATION_NEXT: '.pagination__next',
        PAGINATION_FIRST: '.pagination__first',
        PAGINATION_LAST: '.pagination__last',
        PAGINATION_CURRENT: '.pagination__current'
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
    const paginationPrev = document.querySelector(SELECTORS.PAGINATION_PREV);
    const paginationNext = document.querySelector(SELECTORS.PAGINATION_NEXT);
    const paginationFirst = document.querySelector(SELECTORS.PAGINATION_FIRST);
    const paginationLast = document.querySelector(SELECTORS.PAGINATION_LAST);
    const paginationCurrent = document.querySelector(SELECTORS.PAGINATION_CURRENT);


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

    // Function for shuffling array with pets data
    function shuffleArray (array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
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
        renderPetCard(carouselContainer, currentSlide);
    }

    // Function for showing previous slide in carousel
    function showPreviousSlide () {
        if (previousSlide.length === 0) return; // if there's no previous slide, do nothing
        const temp = currentSlide; // save current slide
        currentSlide = previousSlide; // use again previous slide as current
        previousSlide = temp; // save prev slide
        renderPetCard(carouselContainer, currentSlide);
    }

    // Function for calculation count of cards per slide depending on window size
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

    // Function for update Catalog on resize
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
    let currentPageNumber = 1;
    let totalPages = 0;
    let cardsPerPage = 0;


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

    //Function for calculation count of pages depending on window size
    function getTotalPages (params) {
        if (window.innerWidth <= 320) {
            return 16;
        } else if (window.innerWidth <= 768) {
            return 8;
        } else {
            return 6;
        }
    }
    // Function for updating pagination buttons state
    function updatePaginationButtons () {
        paginationFirst.disabled = currentPageNumber === 1 ? true : false;
        paginationPrev.disabled = currentPageNumber === 1 ? true : false;
        paginationNext.disabled = currentPageNumber === totalPages ? true : false;
        paginationLast.disabled = currentPageNumber === totalPages ? true : false;
    }

    //Catalog initialization
    async function initCatalog () {
        const jsondata = await fetchPetsData();
        // const cardsCountForCatalog = getCountCardsForCatalog();
        const totalPages = getTotalPages();
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