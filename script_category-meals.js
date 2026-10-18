// nom de la catégorie passé dans l'URL : category-meals.html?c=Beef
const CATEGORY = new URLSearchParams(window.location.search).get("c") || "";
const RESULT = document.querySelector("#meals-result");

document.querySelector("#category-title").textContent = `${CATEGORY} recipes`;
document.title = `${CATEGORY} recipes`;

// message d'attente pendant la réponse de l'API
RESULT.innerHTML = '<p class="message">Loading...</p>';

fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(CATEGORY)}`)
    .then((response) => {
        return response.json();
    })

    .then((data) => {
        RESULT.textContent = "";

        // catégorie absente ou inconnue : l'API renvoie meals = null
        if (data.meals === null) {
            RESULT.innerHTML = '<p class="message">No dish found for this category.</p>';
            return;
        }

        data.meals.forEach((meal) => {
            const CARD = document.createElement("div");
            CARD.className = "meal-card";

            // image réduite (/medium) chargée seulement quand elle devient visible
            const IMG = document.createElement("img");
            IMG.src = `${meal.strMealThumb}/medium`;
            IMG.loading = "lazy";
            IMG.alt = meal.strMeal;

            const TITLE = document.createElement("h3");
            TITLE.textContent = meal.strMeal;

            // origine du plat
            const AREA = document.createElement("p");
            AREA.textContent = meal.strArea;

            // lien vers la recette complète
            const LINK = document.createElement("a");
            LINK.href = `meal.html?id=${meal.idMeal}`;

            LINK.appendChild(IMG);
            LINK.appendChild(TITLE);
            CARD.appendChild(LINK);
            CARD.appendChild(AREA);
            RESULT.appendChild(CARD);
        });
    })

    // l'API ne répond pas
    .catch(() => {
        RESULT.innerHTML = '<p class="message">Unable to reach the server. Please try again later.</p>';
    });
