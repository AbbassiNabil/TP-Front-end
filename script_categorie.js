const BTN = document.querySelector("#roulette");

BTN.addEventListener("click", function (event) {
  event.preventDefault();

  for (let i = 0; i < 14; i++) {
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        const P = document.createElement("article");
        const T = document.createElement("p");
        T.textContent = data.categories[i].strCategory;
        const P1 = document.querySelector("#div_flex");
        const IMG = document.createElement("img");
        IMG.src = data.categories[i].strCategoryThumb;
        P1.appendChild(P);
        P.appendChild(IMG);
        P.appendChild(T);
      });
  }
});
