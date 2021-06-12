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

let m;
let c;
let ctx;

c = document.getElementById("canvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
ctx = c.getContext("2d");
ctx.beginPath();
ctx.strokeStyle = "black";
ctx.lineWidth = 1;

let counter = 0;

const generateLine = () => {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  counter += 1;
  if (counter >= 10) {
    ctx.beginPath();
    counter = 0;
  }

  let ar = [];
  let arm = [];
  let nrPoints = 10;

  for (let ii = 0; ii < nrPoints; ii++) {
    let p = {};
    p.x = Math.random() * window.innerWidth;
    p.y = Math.random() * window.innerHeight;
    ar.push(p);
  }
  let i;
  for (i = 0; i < ar.length - 1; i++) {
    m = {};
    m.x = (ar[i].x + ar[i + 1].x) / 2;
    m.y = (ar[i].y + ar[i + 1].y) / 2;
    arm.push(m);
  }
  m.x = (ar[i].x + ar[0].x) / 2;
  m.y = (ar[i].y + ar[0].y) / 2;
  arm.push(m);

  ctx.moveTo(arm[0].x, arm[0].y);
  for (let i = 1; i < ar.length; i++) {
    ctx.quadraticCurveTo(ar[i].x, ar[i].y, arm[i].x, arm[i].y);
    ctx.stroke();
  }
  ctx.quadraticCurveTo(ar[0].x, ar[0].y, arm[0].x, arm[0].y);
  ctx.stroke();

  // setTimeout(() => {
  //   requestAnimationFrame(generateLine);
  // }, 20);
};

// requestAnimationFrame(generateLine);

if (!isTouchDevice) {
  window.addEventListener("mousemove", (e) => {
    const scrollFraction = e.clientX / window.innerWidth;

    requestAnimationFrame(generateLine);

    if (scrollFraction < 0.5) {
      return (cosmo.style.transform = `translate(${
        (0.5 - scrollFraction) * 100
      }px,0)`);
    }
    cosmo.style.transform = `translate(-${(scrollFraction - 0.5) * 100}px,0)`;
  });

  const clearRect = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  let x;
  document.addEventListener(
    "mousemove",
    () => {
      if (x) clearTimeout(x);
      x = setTimeout(clearRect, 50);
    },
    false
  );
}

else window.addEventListener("deviceorientation", (e) => console.log(e), true);
