const alphabetItems = document.querySelectorAll('#alph li');
const mainContainer = document.querySelector('main');

//conteneur de résultats
const resultContainer = document.createElement('div');
resultContainer.className = 'grid-container';
resultContainer.id = 'meals-result';
mainContainer.appendChild(resultContainer);

//boucle sur chaque lettre
alphabetItems.forEach(item => {
    item.addEventListener('click', () => {
        const letter = item.textContent.trim();
        
        // vider le conteneur
        resultContainer.textContent = "";

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
            .then((response) => {
            return response.json();
        })
            .then(data => {
                // aucun plat pour cette lettre : l'API renvoie meals = null
                if (data.meals === null) {
                    const errorMsg = document.createElement('p');
                    errorMsg.textContent = "No dish found for this letter.";
                    resultContainer.appendChild(errorMsg);
                    return;
                }

                // boucle sur les résultats
                data.meals.forEach(meal => {
                    const card = document.createElement('article');
                    card.className = 'meal-card';
                    

                    const img = document.createElement('img');
                    img.src = meal.strMealThumb;
                    img.alt = meal.strMeal;

                    const title = document.createElement('p');
                    title.textContent = meal.strMeal;

                    // lien vers la recette complète
                    const link = document.createElement('a');
                    link.href = `meal.html?id=${meal.idMeal}`;

                    link.appendChild(img);
                    link.appendChild(title);
                    card.appendChild(link);
                    resultContainer.appendChild(card);
                });
            })
            // l'API ne répond pas
            .catch(() => {
                resultContainer.textContent = "Unable to reach the server. Please try again later.";
            });
    });
});
