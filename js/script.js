const startBtn = document.querySelector("#start-btn");
const landingPage = document.querySelector("#landing-page");
const gamePage = document.querySelector("#game-page");

const howToPlayBtn = document.querySelector("#how-to-play-btn");
const howToPlayModal = document.querySelector("#how-to-play-modal");
const closeModalBtn = document.querySelector("#close-modal-btn");

const clickSound = new Audio("sounds/click.mp3");
const homeBtn = document.querySelector("#home-btn");
const resetBtn = document.querySelector("#reset-btn");


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
  ["sky","sky","sky","sky","sky","sky","sky","sky","sky","sky","sky","sky","sky","sky","sky","sky","sky","sky","sky","cloud","cloud","sky"],
  ["sky","sky","sky","sky","cloud","cloud","sky","sky","sky","sky","sky","cloud","cloud","sky","sky","sky","sky","sky","cloud","cloud","cloud","cloud"],
  ["sky","sky","sky","sky","sky","sky","cloud","cloud","sky","sky","cloud","cloud","cloud","cloud","sky","sky","sky","sky","sky","sky","sky","sky"],
  ["cloud","cloud","sky","sky","sky","sky","sky","sky","sky","sky","sky","sky","sky","sky","sky","leaf","leaf","leaf","sky","sky","sky","sky"],
  ["sky","sky","cloud","sky","sky","sky","sky","sky","sky","sky","sky","sky","sky","sky","leaf","leaf","leaf","leaf","leaf","sky","sky","sky"],
  ["sky","sky","sky","sky","sky","sky","sky","sky","sky","sky","sky","sky","sky","sky","sky","sky","wood","sky","sky","sky","sky","sky"],
  ["sky","sky","sky","sky","sky","sky","sky","stone","sky","sky","sky","sky","sky","sky","sky","sky","wood","sky","sky","sky","sky","stone"],
  ["sky","sky","sky","sky","sky","sky","stone","stone","stone","sky","sky","sky","sky","sky","sky","sky","wood","sky","sky","sky","stone","stone"],
  ["grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass"],
  ["dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt"],
  ["green_diamond","green_diamond","stone","green_diamond","green_diamond","stone","green_diamond","green_diamond","stone","green_diamond","green_diamond","green_diamond","green_diamond","stone","green_diamond","green_diamond","green_diamond","green_diamond","green_diamond","stone","green_diamond","stone"], 
  ["red_diamond","stone","red_diamond","red_diamond","stone","red_diamond","red_diamond","red_diamond","red_diamond","red_diamond","red_diamond","stone","red_diamond","red_diamond","red_diamond","red_diamond","red_diamond","stone","red_diamond","red_diamond","stone","red_diamond"],
  ["diamond","diamond","diamond","stone","diamond","diamond","diamond","stone","diamond","diamond","diamond","diamond","diamond","stone","diamond","diamond","diamond","diamond","diamond","stone","diamond","stone"],
  ["yellow_diamond","stone","yellow_diamond","yellow_diamond","stone","yellow_diamond","yellow_diamond","yellow_diamond","stone","yellow_diamond","yellow_diamond","yellow_diamond","stone","yellow_diamond","yellow_diamond","yellow_diamond","yellow_diamond","yellow_diamond","stone","yellow_diamond","yellow_diamond","stone"],
];
const originalWorld = JSON.parse(JSON.stringify(worldMatrix));

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

      tile.addEventListener("click", function () {
      handleTileClick(rowIndex, colIndex);
    });

      world.appendChild(tile);
    });
  });
}
function canRemoveTile(tool, tileType) {
  if (tool === "axe") {
    return tileType === "wood" || tileType === "leaf";
  }

  if (tool === "pickaxe") {
    return tileType === "stone";
  }

  if (tool === "shovel") {
    return tileType === "dirt" || tileType ==="grass";
  }

  if (tool === "sword") {
    return (
      tileType === "diamond" ||
      tileType === "green_diamond" ||
      tileType === "red_diamond" ||
      tileType === "yellow_diamond"
    );
  }

  return false;
}
function handleTileClick(rowIndex, colIndex) {
  const tileType = worldMatrix[rowIndex][colIndex];
  if (selectedTool === "inventory" && selectedInventoryItem && tileType === "sky") {
  worldMatrix[rowIndex][colIndex] = selectedInventoryItem;
  inventory[selectedInventoryItem]--;

  if (inventory[selectedInventoryItem] === 0) {
    selectedInventoryItem = null;
  }

  renderWorld();
  renderInventory();
  return;
}

  if (!selectedTool) {
    console.log("Choose a tool first");
    return;
  }

  if (canRemoveTile(selectedTool, tileType)) {
   addToInventory(tileType);
worldMatrix[rowIndex][colIndex] = "sky";
renderWorld();
  } else {
    console.log("Wrong tool for this tile");
  }
}

renderWorld();

let selectedTool = null;
let inventory = {};
let selectedInventoryItem = null;

function addToInventory(tileType) {
  if (!inventory[tileType]) {
    inventory[tileType] = 0;
  }

  inventory[tileType]++;
  renderInventory();
}

function renderInventory() {
  const inventoryList = document.querySelector("#inventory-list");

  inventoryList.innerHTML = "";

  Object.keys(inventory).forEach(function (tileType) {
    if (inventory[tileType] > 0) {
      const item = document.createElement("button");

      item.classList.add("inventory-item");
      item.dataset.tile = tileType;

  item.innerHTML = `
  <img src="images/${tileType}.jpg" class="inventory-icon" alt="${tileType}">
  <strong>x${inventory[tileType]}</strong>
`;

      item.addEventListener("click", function () {
        selectedInventoryItem = tileType;
        selectedTool = "inventory";
      });

      inventoryList.appendChild(item);
    }
  });
}
const inventoryBtn = document.querySelector('[data-tool="inventory"]');
const inventoryPanel = document.querySelector("#inventory-panel");

inventoryBtn.addEventListener("click", function () {
  playClickSound();
  inventoryPanel.classList.toggle("hidden");
});

const tools = document.querySelectorAll(".tool");

tools.forEach(tool => {
  tool.addEventListener("click", () => {

    tools.forEach(t => {
      t.classList.remove("selected");
    });

    tool.classList.add("selected");

    selectedTool = tool.dataset.tool;

    console.log("Selected tool:", selectedTool);
  });
});

const closeInventoryBtn = document.querySelector("#close-inventory-btn");

closeInventoryBtn.addEventListener("click", function () {
  playClickSound();
  inventoryPanel.classList.add("hidden");
});

homeBtn.addEventListener("click", () => {
  playClickSound();

  setTimeout(() => {
    gamePage.classList.add("hidden");
    landingPage.classList.remove("hidden");
  }, 300);
});

resetBtn.addEventListener("click", () => {
  playClickSound();

  // Restore the world
  for (let row = 0; row < worldMatrix.length; row++) {
    for (let col = 0; col < worldMatrix[row].length; col++) {
      worldMatrix[row][col] = originalWorld[row][col];
    }
  }

  // Clear inventory
  inventory = {};
  selectedInventoryItem = null;

  // Update the UI
  renderWorld();
  renderInventory();
  inventoryPanel.classList.add("hidden");
});