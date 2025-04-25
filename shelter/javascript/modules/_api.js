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
