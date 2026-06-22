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