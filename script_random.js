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
      const FIGURE = document.querySelector("figure");
      FIGURE.replaceChildren(IMG);

      const P3 = document.querySelector("#ingr");
      P3.textContent = `\n${data.meals[0].strIngredient1}\n${data.meals[0].strIngredient2}\n${data.meals[0].strIngredient3}\n${data.meals[0].strIngredient4}\n${data.meals[0].strIngredient5}\n${data.meals[0].strIngredient6}\n${data.meals[0].strIngredient7}\n${data.meals[0].strIngredient8}\n${data.meals[0].strIngredient9}\n${data.meals[0].strIngredient10}\n${data.meals[0].strIngredient11}\n${data.meals[0].strIngredient12}\n${data.meals[0].strIngredient13}\n${data.meals[0].strIngredient14}\n${data.meals[0].strIngredient15}\n${data.meals[0].strIngredient16}\n${data.meals[0].strIngredient17}\n${data.meals[0].strIngredient18}\n${data.meals[0].strIngredient19}\n${data.meals[0].strIngredient20}\n`;
    });
});
