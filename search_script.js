const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results-container');

searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    
    
    while (resultsContainer.firstChild) {
        resultsContainer.removeChild(resultsContainer.firstChild);
    }

    if (query === "") return;

    
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();

    
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
        img.style.width = "200px";

        const title = document.createElement('h3');
        title.textContent = meal.strMeal;

        const category = document.createElement('p');
        category.textContent = meal.strCategory;

        
        mealCard.appendChild(img);
        mealCard.appendChild(title);
        mealCard.appendChild(category);
        
        resultsContainer.appendChild(mealCard);
    });
});