const BTN = document.querySelector("#roulette");

BTN.addEventListener("click", function (event) {
  event.preventDefault();

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      const P = document.querySelector("#nom");
      P.textContent = data.meals[0].strMeal;

      const P1 = document.querySelector("#area");
      P1.textContent = data.meals[0].strArea;

      const P2 = document.querySelector("#description");
      P2.textContent = data.meals[0].strInstructions;

      const IMG = document.createElement("img");
      IMG.src = data.meals[0].strMealThumb;
      IMG.alt = data.meals[0].strMeal;
      const FIGURE = document.querySelector("figure");
      FIGURE.replaceChildren(IMG);

      // l'API fournit 20 champs d'ingrédients : on ignore ceux qui sont vides
      const P3 = document.querySelector("#ingr");
      P3.textContent = "";
      for (let i = 1; i <= 20; i++) {
        const ingredient = data.meals[0][`strIngredient${i}`];
        if (ingredient && ingredient.trim() !== "") {
          const LI = document.createElement("li");
          LI.textContent = ingredient;
          P3.appendChild(LI);
        }
      }

      document.querySelector("#ingr-title").hidden = false;
    })

    // l'API ne répond pas
    .catch(() => {
      document.querySelector("#nom").textContent =
        "Unable to reach the server. Please try again later.";
    });
});
