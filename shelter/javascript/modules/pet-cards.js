// Fetch data from JSON
export async function fetchPetsData () {
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
export function shuffleArray (array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function for rending cards
export function renderPetCard (container, cards) {
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
