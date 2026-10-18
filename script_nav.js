// barre de navigation : cachée quand on descend, visible quand on remonte
const HEADER = document.querySelector("header");
const HERO = document.querySelector(".hero");
let lastScroll = window.scrollY;

function updateNav() {
  const current = window.scrollY;

  // en haut de la page la barre est toujours visible ;
  // marge de 10 px pour ignorer les petits mouvements du pavé tactile
  if (current <= 0) {
    HEADER.classList.remove("nav-hidden");
    lastScroll = current;
  } else if (current > lastScroll + 10) {
    HEADER.classList.add("nav-hidden");
    lastScroll = current;
  } else if (current < lastScroll - 10) {
    HEADER.classList.remove("nav-hidden");
    lastScroll = current;
  }

  // page d'accueil : barre transparente tant qu'on est sur le bandeau
  if (HERO) {
    HEADER.classList.toggle(
      "nav-solid",
      current > HERO.offsetHeight - HEADER.offsetHeight,
    );
  }
}

window.addEventListener("scroll", updateNav);
updateNav();
