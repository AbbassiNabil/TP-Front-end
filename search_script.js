const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results-container');

async function searchMeals() {
    const query = searchInput.value.trim();
    
    
    while (resultsContainer.firstChild) {
        resultsContainer.removeChild(resultsContainer.firstChild);
    }

    if (query === "") return;

    // message d'attente pendant la réponse de l'API
    resultsContainer.innerHTML = '<p class="message">Loading...</p>';

    
    let data;
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
        data = await response.json();
    } catch {
        resultsContainer.textContent = "";
        // l'API ne répond pas
        const errorMsg = document.createElement('p');
        errorMsg.textContent = "Unable to reach the server. Please try again later.";
        errorMsg.className = 'message';
        resultsContainer.appendChild(errorMsg);
        return;
    }

    resultsContainer.textContent = "";

    
    if (data.meals === null) {
        const errorMsg = document.createElement('p');
        errorMsg.textContent = "No dish found for this search.";
        errorMsg.className = 'message';
        resultsContainer.appendChild(errorMsg);
        return;
    }

    
    data.meals.forEach(meal => {
        const mealCard = document.createElement('div');
        mealCard.className = 'meal-card';

        const img = document.createElement('img');
        // image réduite (/medium) chargée seulement quand elle devient visible
        img.src = `${meal.strMealThumb}/medium`;
        img.loading = 'lazy';
        img.alt = meal.strMeal;

        const title = document.createElement('h3');
        title.textContent = meal.strMeal;

        const category = document.createElement('p');
        category.textContent = meal.strCategory;

        
        // lien vers la recette complète
        const link = document.createElement('a');
        link.href = `meal.html?id=${meal.idMeal}`;

        link.appendChild(img);
        link.appendChild(title);
        mealCard.appendChild(link);
        mealCard.appendChild(category);
        
        resultsContainer.appendChild(mealCard);
    });
}

searchButton.addEventListener('click', searchMeals);

// lancer la recherche aussi avec la touche Entrée
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchMeals();
    }
});