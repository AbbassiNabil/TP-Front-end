# Mangiarbene

Site web de recettes réalisé en HTML, CSS et JavaScript (sans framework).
Les données proviennent de l'API publique [TheMealDB](https://www.themealdb.com/api.php).

## Pages

| Page | Description |
|---|---|
| `index.html` | Page d'accueil. |
| `categorie.html` | « Nos recettes » : affiche la liste des catégories de plats au clic sur le bouton. |
| `random.html` | « La roulette de la bouffe » : propose un plat au hasard (nom, origine, instructions, ingrédients, photo). |
| `first-letter.html` | « A - Z » : affiche les plats qui commencent par la lettre choisie. |
| `search.html` | « Search » : recherche un plat par son nom (bouton ou touche Entrée). |

## Structure

Chaque page possède sa propre feuille de style (`style_*.css`) et, si besoin, son propre script :

- `script_categorie.js` → `categorie.html`
- `script_random.js` → `random.html`
- `script_first-letter.js` → `first-letter.html`
- `search_script.js` → `search.html`

Images : `logo.svg` (logo de la barre de navigation) et `BGI.jpg` (fond de la page d'accueil).

## Lancer le projet

Aucune installation n'est nécessaire : il suffit d'ouvrir `index.html` dans un navigateur.
Une connexion Internet est requise pour interroger l'API.

## Auteur

Abbassi Nabil
