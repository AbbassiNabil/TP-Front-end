# Mangiarbene

Site web de recettes réalisé en HTML, CSS et JavaScript (sans framework).
Les données proviennent de l'API publique [TheMealDB](https://www.themealdb.com/api.php).
Le site s'adapte aux petits écrans (téléphone, tablette).
Police : Poppins, hébergée dans le dossier `fonts/` (licence SIL Open Font License), sans dépendre de Google Fonts.
Les textes du site sont en anglais, comme les recettes fournies par l'API (TheMealDB n'existe qu'en anglais).

## Pages

| Page | Description |
|---|---|
| `index.html` | Page d'accueil. |
| `categorie.html` | « Our recipes » : affiche la liste des catégories de plats au clic sur le bouton. Un clic sur une catégorie ouvre ses recettes. |
| `random.html` | « Food roulette » : propose un plat au hasard (nom, origine, instructions, ingrédients, photo). |
| `first-letter.html` | « A - Z » : affiche les plats qui commencent par la lettre choisie. |
| `search.html` | « Search » : recherche un plat par son nom (bouton loupe ou touche Entrée) et/ou par pays (liste déroulante des 63 pays qui ont des plats dans l'API). |
| `category-meals.html` | Recettes d'une catégorie (`category-meals.html?c=Beef`), avec un lien de retour vers les catégories. |
| `meal.html` | Recette complète d'un plat, ouverte au clic sur un plat des pages « A - Z » et « Search » (`meal.html?id=...`). |

Si l'API ne répond pas, un message s'affiche sur la page.

## Structure

`style_common.css` contient les styles partagés par toutes les pages (navigation, pied de page, conteneur, boutons, cartes de plats).
Chaque page possède ensuite sa propre feuille de style (`style_*.css`) et, si besoin, son propre script :

- `script_categorie.js` : `categorie.html`
- `script_random.js` : `random.html`
- `script_first-letter.js` : `first-letter.html`
- `search_script.js` : `search.html`
- `script_meal.js` : `meal.html` (qui réutilise `style_random.css`)
- `script_category-meals.js` : `category-meals.html` (qui réutilise `style_categorie.css`)

Images : `logo.svg` (logo de la barre de navigation) et `BGI.jpg` (fond de la page d'accueil).

## Lancer le projet

Aucune installation n'est nécessaire : il suffit d'ouvrir `index.html` dans un navigateur.
Une connexion Internet est requise pour interroger l'API.

## Auteur

Abbassi Nabil
