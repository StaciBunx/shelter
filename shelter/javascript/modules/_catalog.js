import { fetchPetsData, shuffleArray, renderPetCard } from './_pet-cards.js';

// DOM elements
const catalogContainer = document.querySelector('.pets__cards');
const paginationPrev = document.querySelector('.pagination__prev');
const paginationNext = document.querySelector('.pagination__next');
const paginationFirst = document.querySelector('.pagination__first');
const paginationLast = document.querySelector('.pagination__last');
const paginationCurrent = document.querySelector('.pagination__current');

//Catalog states
let allPetsDataCatalog = [];
let currentPage = [];
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
function getTotalPages () {
    if (window.innerWidth <= 320) {
        return 16;
    } else if (window.innerWidth <= 768) {
        return 8;
    } else {
        return 6;
    }
}

// Function for updating disabled state for pagination buttons
function updatePaginationButtonsState () {
    const isFirstPage = currentPageNumber === 1;
    const isLastPage = currentPageNumber === totalPages;
    paginationFirst.classList.toggle('button_small_disabled', isFirstPage);
    paginationPrev.classList.toggle('button_small_disabled', isFirstPage);
    paginationLast.classList.toggle('button_small_disabled', isLastPage);
    paginationNext.classList.toggle('button_small_disabled', isLastPage);
}

function renderCurrentPage () {
    const startIndex = (currentPageNumber - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const pageData = allPetsDataCatalog.slice(startIndex, endIndex);
    renderPetCard(catalogContainer, pageData);
    paginationCurrent.textContent = currentPageNumber;
    updatePaginationButtonsState();
}


// Function for going to the first page
function goToFirstPage () {
    currentPageNumber = 1;
    renderCurrentPage();
}

// Function for going to the previous page
function goToPreviousPage () {
    if (currentPageNumber > 1) {
        currentPageNumber--;
        renderCurrentPage();
    }
}

// Function for going to the next page
function goToNextPage () {
    if (currentPageNumber < totalPages) {
        currentPageNumber++;
        renderCurrentPage();
    }
}

// Function for going to the last page
function goToLastPage () {
    currentPageNumber = totalPages;
    renderCurrentPage();
}

//Function for update Catalog on resize
function updateCatalogOnResize () {
    cardsPerPage = getCountCardsForCatalog();
    totalPages = getTotalPages();
    renderCurrentPage();
}

//Catalog initialization
export async function initCatalog () {
    if (catalogContainer && paginationPrev && paginationNext && paginationFirst && paginationLast && paginationCurrent) {
        const jsondata = await fetchPetsData();
        cardsPerPage = getCountCardsForCatalog(); // get amount of cards on page, depending on window size
        totalPages = getTotalPages(); //get amount of pages, depending on window size
        allPetsDataCatalog = [...Array(6)].flatMap(() => shuffleArray(jsondata));
        currentPage = renderCurrentPage();

        //Buttons listeners
        paginationFirst.addEventListener('click', goToFirstPage);
        paginationPrev.addEventListener('click', goToPreviousPage);
        paginationNext.addEventListener('click', goToNextPage);
        paginationLast.addEventListener('click', goToLastPage);

        window.addEventListener('resize', updateCatalogOnResize);
    }
}