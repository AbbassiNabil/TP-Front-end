const BTN = document.querySelector("#roulette");

BTN.addEventListener("button", function (event) {
  event.preventDefault();

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      const P = document.querySelector("#ip");
      P.textContent = `${data.meals.strMeal}`;
    });
});
