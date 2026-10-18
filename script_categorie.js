const BTN = document.querySelector("#roulette");

BTN.addEventListener("click", function (event) {
    event.preventDefault();

    // message d'attente pendant la réponse de l'API
    const MSG = document.createElement("p");
    MSG.className = "message";
    MSG.textContent = "Loading...";
    document.querySelector("#div_flex").replaceChildren(MSG);

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
                IMG.loading = "lazy";
                IMG.alt = categorie.strCategory;
                // lien vers les recettes de cette catégorie
                const LINK = document.createElement("a");
                LINK.href = `category-meals.html?c=${encodeURIComponent(categorie.strCategory)}`;
                LINK.appendChild(P);
                P1.appendChild(LINK);
                P.appendChild(IMG);
                P.appendChild(T);
            });
        })

        // l'API ne répond pas
        .catch(() => {
            const MSG = document.createElement("p");
            MSG.className = "message";
            MSG.textContent = "Unable to reach the server. Please try again later.";
            document.querySelector("#div_flex").replaceChildren(MSG);
        });
});
