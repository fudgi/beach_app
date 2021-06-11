const cosmo = document.querySelector(".cosmo");
const cosmoPic = document.querySelector(".cosmo__pic");
const cosmoIcons = document.querySelector(".cosmo__icons");
const cosmoMan = document.querySelector(".cosmo__man");

const isTouchDevice =
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0;

const scrollFunction = (e) => {
  if (e.target === cosmo) {
    cosmoPic.classList.remove("cosmo__pic_small");
    cosmoIcons.classList.remove("cosmo__icons_active");
    return;
  }
  cosmoPic.classList.add("cosmo__pic_small");
  cosmoIcons.classList.add("cosmo__icons_active");
};

window.addEventListener("click", scrollFunction);

const formatImgLink = (index) => {
  const number = ("0" + index).slice(-2);
  return `./img/man/img-${number}.jpg`;
};

const frameCount = 10;
let canvas;
let context;
const preloadArr = [];

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = formatImgLink(i);
    preloadArr.push(img);
  }
};
preloadImages();

const canvaseElem = document.createElement("canvas");
cosmoMan.appendChild(canvaseElem);
canvas = canvaseElem;
context = canvas.getContext("2d");
canvas.width = cosmoMan.offsetWidth;
canvas.height = cosmoMan.offsetHeight;

const img = new Image();
img.src = formatImgLink(0);

let index = 0;

const step = () => {
  index += 1;
  if (index >= 9) index = 0;
  const curImg = preloadArr[index];
  context.drawImage(curImg, 0, 0, cosmoMan.offsetWidth, cosmoMan.offsetHeight);
  setTimeout(() => {
    requestAnimationFrame(step);
  }, 100);
};

requestAnimationFrame(step);

if (!isTouchDevice) {
  window.addEventListener("mousemove", (e) => {
    const scrollFraction = e.clientX / window.innerWidth;

    if (scrollFraction < 0.5) {
      return (cosmo.style.transform = `translate(${
        (0.5 - scrollFraction) * 100
      }px,0)`);
    }
    cosmo.style.transform = `translate(-${(scrollFraction - 0.5) * 100}px,0)`;
  });
}
