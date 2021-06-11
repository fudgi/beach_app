const cosmoPic = document.querySelector(".cosmo__pic");
const cosmoIcons = document.querySelector(".cosmo__icons");

window.addEventListener("click", scrollFunction);

function scrollFunction() {
  cosmoPic.classList.add("cosmo__pic_small");
  cosmoIcons.classList.add("cosmo__icons_active");
}
