const alphabetItems = document.querySelectorAll('#alph li');
const mainContainer = document.querySelector('main');

//conteneur de résultats
const resultContainer = document.createElement('div');
resultContainer.style.display ="flex";
resultContainer.style.flexWrap ="wrap";
resultContainer.style.justifyContent = "center";
resultContainer.style.gap = "100px";
resultContainer.id = 'meals-result';
mainContainer.appendChild(resultContainer);

//boucle sur chaque lettre
alphabetItems.forEach(item => {
    item.style.cursor = 'pointer';

    item.addEventListener('click', () => {
        const letter = item.textContent.trim();
        
        // vider le conteneur
        resultContainer.textContent = "";

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
            .then((response) => {
            return response.json();
        })
            .then(data => {
                // boucle sur les résultats
                data.meals.forEach(meal => {
                    const card = document.createElement('article');
                    card.className = 'meal-card';
                    

                    const img = document.createElement('img');
                    img.src = meal.strMealThumb;
                    img.alt = meal.strMeal;
                    img.style.width = "300px";
                    img.style.borderRadius ="10px";

                    const title = document.createElement('p');
                    title.textContent = meal.strMeal;

                    card.appendChild(img);
                    card.appendChild(title);
                    resultContainer.appendChild(card);
                });
            });
    });
});
