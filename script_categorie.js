const BTN = document.querySelector("#roulette");

BTN.addEventListener("click", function (event) {
    event.preventDefault();

    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        .then((response) => {
            return response.json();
        })

        .then((data) => {
            const P1 = document.querySelector("#div_flex");
            // vider le conteneur pour ne pas afficher les catégories en double
            P1.textContent = "";

            data.categories.forEach((categorie) => {
                const P = document.createElement("article");
                const T = document.createElement("p");
                T.textContent = categorie.strCategory;
                const IMG = document.createElement("img");
                IMG.src = categorie.strCategoryThumb;
                IMG.alt = categorie.strCategory;
                P1.appendChild(P);
                P.appendChild(IMG);
                P.appendChild(T);
            });
        })

        // l'API ne répond pas
        .catch(() => {
            document.querySelector("#div_flex").textContent =
                "Impossible de contacter le serveur. Réessayez plus tard.";
        });
});
