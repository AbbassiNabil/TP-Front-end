const searchInput = document.getElementById("search-input");
const countrySelect = document.getElementById("country-select");
const searchButton = document.getElementById("search-button");
const resultsContainer = document.getElementById("results-container");

// pays qui ont au moins un plat dans TheMealDB (63 sur les 195 de list.php?a=list)
// à mettre à jour à la main si l'API ajoute des plats d'un nouveau pays
const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bangladesh",
  "Barbados",
  "Belgium",
  "Botswana",
  "Brazil",
  "Bulgaria",
  "Cambodia",
  "Canada",
  "Cayman Islands",
  "Chile",
  "China",
  "Colombia",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Denmark",
  "Dominica",
  "Egypt",
  "Estonia",
  "France",
  "Greece",
  "India",
  "Ireland",
  "Italy",
  "Jamaica",
  "Japan",
  "Kenya",
  "Laos",
  "Malaysia",
  "Mexico",
  "Morocco",
  "Netherlands",
  "Norway",
  "Philippines",
  "Poland",
  "Portugal",
  "Russia",
  "Saudi Arabia",
  "Slovakia",
  "Spain",
  "Syria",
  "Thailand",
  "Tunisia",
  "Turkey",
  "Ukraine",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Venezuela",
  "Vietnam",
];

// remplir la liste déroulante des pays
COUNTRIES.forEach((country) => {
  const option = document.createElement("option");
  option.value = country;
  option.textContent = country;
  countrySelect.appendChild(option);
});

async function searchMeals() {
  const query = searchInput.value.trim();
  const country = countrySelect.value;

  while (resultsContainer.firstChild) {
    resultsContainer.removeChild(resultsContainer.firstChild);
  }

  if (query === "" && country === "") return;

  // message d'attente pendant la réponse de l'API
  const msg = document.createElement("p");
  msg.className = "message";
  msg.textContent = "Loading...";
  resultsContainer.replaceChildren(msg);

  // avec un nom : recherche par nom, sinon tous les plats du pays choisi
  const url =
    query !== ""
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
      : `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(country)}`;

  let data;
  try {
    const response = await fetch(url);
    data = await response.json();
  } catch {
    resultsContainer.textContent = "";
    // l'API ne répond pas
    const errorMsg = document.createElement("p");
    errorMsg.textContent =
      "Unable to reach the server. Please try again later.";
    errorMsg.className = "message";
    resultsContainer.appendChild(errorMsg);
    return;
  }

  resultsContainer.textContent = "";

  let meals = data.meals || [];

  // nom et pays : on garde seulement les plats de ce pays
  if (query !== "" && country !== "") {
    meals = meals.filter((meal) => meal.strCountry === country);
  }

  if (meals.length === 0) {
    const errorMsg = document.createElement("p");
    errorMsg.textContent = "No dish found for this search.";
    errorMsg.className = "message";
    resultsContainer.appendChild(errorMsg);
    return;
  }

  meals.forEach((meal) => {
    const mealCard = document.createElement("div");
    mealCard.className = "meal-card";

    const img = document.createElement("img");
    // image réduite (/medium) chargée seulement quand elle devient visible
    img.src = `${meal.strMealThumb}/medium`;
    img.loading = "lazy";
    img.alt = meal.strMeal;

    const title = document.createElement("h3");
    title.textContent = meal.strMeal;

    // catégorie et pays (la recherche par pays ne renvoie pas la catégorie)
    const category = document.createElement("p");
    category.textContent = [meal.strCategory, meal.strCountry]
      .filter(Boolean)
      .join(" · ");

    // lien vers la recette complète
    const link = document.createElement("a");
    link.href = `meal.html?id=${meal.idMeal}`;

    link.appendChild(img);
    link.appendChild(title);
    mealCard.appendChild(link);
    mealCard.appendChild(category);

    resultsContainer.appendChild(mealCard);
  });
}

searchButton.addEventListener("click", searchMeals);

// lancer la recherche dès qu'un pays est choisi
countrySelect.addEventListener("change", searchMeals);

// lancer la recherche aussi avec la touche Entrée
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchMeals();
  }
});
