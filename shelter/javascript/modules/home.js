import { fetchPetsData, shuffleArray, renderPetCard } from './pet-cards.js';

// DOM elements
const carouselContainer = document.querySelector('.carousel__cards');
const prevButton = document.querySelector('.carousel__control_left');
const nextButton = document.querySelector('.carousel__control_right');

// Carousel states
let allPetsData = [];
let currentSlide = [];
let previousSlide = [];


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

    renderPetCard(carouselContainer, currentSlide);
}

export async function initCarousel () {
    if (carouselContainer && prevButton && nextButton) {
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

}