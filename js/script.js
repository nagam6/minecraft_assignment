const startBtn = document.querySelector("#start-btn");
const landingPage = document.querySelector("#landing-page");
const gamePage = document.querySelector("#game-page");

const howToPlayBtn = document.querySelector("#how-to-play-btn");
const howToPlayModal = document.querySelector("#how-to-play-modal");
const closeModalBtn = document.querySelector("#close-modal-btn");

const clickSound = new Audio("sounds/click.mp3");

function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play().catch(function (error) {
    console.log("Sound error:", error);
  });
}

startBtn.addEventListener("click", function () {
  playClickSound();

  setTimeout(function () {
    landingPage.classList.add("hidden");
    gamePage.classList.remove("hidden");
  }, 300);
});

howToPlayBtn.addEventListener("click", function () {
  playClickSound();
  howToPlayModal.classList.add("active");
});

closeModalBtn.addEventListener("click", function () {
  playClickSound();
  howToPlayModal.classList.remove("active");
});

const worldMatrix = [
  ["sky","sky","sky","sky","sky","sky","sky","sky","sky","sky"],
  ["sky","sky","sky","sky","leaf","leaf","sky","sky","sky","sky"],
  ["sky","sky","sky","sky","wood","wood","sky","sky","sky","sky"],
  ["sky","sky","sky","sky","wood","wood","sky","sky","sky","sky"],
  ["grass","grass","grass","grass","grass","grass","grass","grass","grass","grass"],
  ["dirt","dirt","dirt","stone","stone","dirt","dirt","dirt","stone","stone"],
  ["dirt","dirt","stone","stone","stone","dirt","dirt","stone","stone","stone"]
];

function renderWorld() {
  const world = document.querySelector("#world");

  world.innerHTML = "";

  worldMatrix.forEach((row, rowIndex) => {
    row.forEach((tileType, colIndex) => {

      const tile = document.createElement("div");

      tile.classList.add("tile");
      tile.classList.add(tileType);

      tile.dataset.row = rowIndex;
      tile.dataset.col = colIndex;

      world.appendChild(tile);
    });
  });
}

renderWorld();