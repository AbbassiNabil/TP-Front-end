const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results-container');

async function searchMeals() {
    const query = searchInput.value.trim();
    
    
    while (resultsContainer.firstChild) {
        resultsContainer.removeChild(resultsContainer.firstChild);
    }

    if (query === "") return;

    
    let data;
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
        data = await response.json();
    } catch {
        // l'API ne répond pas
        const errorMsg = document.createElement('p');
        errorMsg.textContent = "Impossible de contacter le serveur. Réessayez plus tard.";
        errorMsg.style.color = "red";
        resultsContainer.appendChild(errorMsg);
        return;
    }

    
    if (data.meals === null) {
        const errorMsg = document.createElement('p');
        errorMsg.textContent = "Aucun plat trouvé pour cette recherche.";
        errorMsg.style.color = "red"; 
        resultsContainer.appendChild(errorMsg);
        return;
    }

    
    data.meals.forEach(meal => {
        const mealCard = document.createElement('div');
        mealCard.className = 'meal-card';

        const img = document.createElement('img');
        img.src = meal.strMealThumb;
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