import {
  bossRarityRates,
  bossPool,
  itemRarityRates,
  itemPool,
} from "./components/pool.js";
import { BossGacha } from "./components/bossGacha.js";
import { BossEntity } from "./components/boss.js";
import { WeaponGacha } from "./components/weaponGacha.js";
import { WeaponInstance } from "./components/weapon.js";
import { upgrades } from "./components/upgrades.js";
import {
  slotNumber,
  registerSlotUpdater,
  weaponGachaModifiers,
} from "./components/modifiers.js";

let coins = 10;
let basePrice = 10;
let gachaPrice = basePrice;

let inventory = [];
let activeSlots = [];

renderSlots();

/* Gacha Logic */
const weaponGachaInstance = new WeaponGacha(itemRarityRates, itemPool);
document.getElementById("gacha-slot").addEventListener("click", () => {
  if (coins < gachaPrice) return;
  coins -= gachaPrice;

  const { item, itemRarity } = weaponGachaInstance.roll();

  console.log(item.img, item.name, itemRarity);
  updateEconomyUI();
  updateGachaUI(item, itemRarity);

  const weapon = new WeaponInstance(item);
  weapon.rarity = itemRarity;
  inventory.push(weapon);
  updateLibraryUI();
});

function updateGachaUI(item, itemRarity) {
  document.getElementById("prize-img").src = item.img;
  document.getElementById("prize-name").innerHTML = item.name;
  document.getElementById("prize-rarity").innerHTML = itemRarity;
}

/* Library Logic */
function updateLibraryUI() {
  const rarityOrder = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];

  inventory.sort((a, b) => {
    const rarityDifference =
      rarityOrder.indexOf(b.rarity) - rarityOrder.indexOf(a.rarity);
    if (rarityDifference !== 0) return rarityDifference;
    return a.name.localeCompare(b.name);
  });

  const containerElement = document.getElementById("library-container");
  containerElement.innerHTML = "";
  console.log(inventory);

  inventory.forEach((weapon) => {
    const divElement = document.createElement("div");
    divElement.className = "weapon-card";
    divElement.innerHTML = `<img src="${weapon.img}" />`;
    divElement.onclick = () => sendToSlot(weapon);
    containerElement.appendChild(divElement);
  });
}

/* Slot + Weapon Attacking Logic */
function renderSlots() {
  const containerElement = document.getElementById("weapon-slots");
  const oldSlots = [...activeSlots];
  activeSlots = new Array(slotNumber).fill(null);
  containerElement.innerHTML = "";

  for (let i = 0; i < slotNumber; i++) {
    activeSlots[i] = null;
    const divElement = document.createElement("div");
    divElement.className = "weapon-slot";
    divElement.setAttribute("data-slot", i);
    divElement.innerHTML = `<img src="assets/border-empty.png" />`;
    divElement.onclick = () => clearSlot(i);
    const oldWeapon = oldSlots[i];
    if (oldWeapon) {
      activeSlots[i] = oldWeapon;
      divElement.querySelector("img").src = oldWeapon.img;
      oldWeapon.startAttacking(bossInstance, updateBossUI, i);
    }
    containerElement.appendChild(divElement);
  }
}
registerSlotUpdater(renderSlots);

function fillSlot(slotIndex, weapon) {
  const slotElement = document.querySelector(
    `.weapon-slot[data-slot="${slotIndex}"] img`
  );
  slotElement.src = weapon.img;
}

function clearSlot(slotIndex) {
  const weapon = activeSlots[slotIndex];
  if (weapon) {
    weapon.stopAttacking();
    inventory.push(weapon);
    activeSlots[slotIndex] = null;

    const slotElement = document.querySelector(
      `.weapon-slot[data-slot="${slotIndex}"] img`
    );
    slotElement.src = "assets/border-empty.png";

    updateLibraryUI();
  }
}

function sendToSlot(weapon) {
  const emptySlotIndex = activeSlots.findIndex((w) => w === null);
  if (emptySlotIndex === -1) return;

  activeSlots[emptySlotIndex] = weapon;
  inventory = inventory.filter((w) => w !== weapon);
  fillSlot(emptySlotIndex, weapon);
  weapon.startAttacking(bossInstance, updateBossUI, emptySlotIndex);
  updateLibraryUI();
}

/* Boss Logic */
const bossGachaInstance = new BossGacha(bossRarityRates, bossPool);
const { boss, bossRarity, weakness } = bossGachaInstance.roll();
const bossInstance = new BossEntity(
  boss,
  bossRarity,
  weakness,
  bossGachaInstance
);

function updateBossUI() {
  const bossImg = document.getElementById("boss");
  bossImg.src = bossInstance.img;

  const hpPercentage = (bossInstance.currentHP / bossInstance.maxHP) * 100;
  const healthBarElement = document.getElementById("healthbar-fill");
  healthBarElement.style.width = `${hpPercentage}%`;

  if (bossInstance.isDefeated()) {
    coins += bossInstance.coinReward;
    console.log(`Gained ${bossInstance.coinReward} coins`);
    bossInstance.reset();
    console.log(bossInstance);
    updateEconomyUI();
    updateBossUI();
  }
}

/* Economy Logic */
function updateEconomyUI() {
  const priceElement = document.getElementById("gacha-price");
  const coinCounterElement = document.getElementById("coin-counter");
  priceElement.textContent = `Price: ${gachaPrice}c`;
  coinCounterElement.textContent = `Coins: ${coins}c`;
  updateUpgradeUI();
}

window.updateGachaPrice = function () {
  gachaPrice = Math.floor(basePrice * weaponGachaModifiers.priceMultiplier);
  updateEconomyUI();
};
updateGachaPrice();

/* Upgrades Logic */
function purchaseUpgrade(upg) {
  if (upg.level >= upg.maxLevel) return;

  const cost = upg.getCost(upg.level);
  if (coins < cost) return;

  coins -= cost;
  upg.level++;
  upg.effect(upg.level);
  updateBossUI();
  updateEconomyUI();
  updateUpgradeUI();
}

function updateUpgradeUI() {
  const containerElement = document.getElementById("upgrade-container");
  containerElement.innerHTML = "";
  upgrades.forEach((upg) => {
    if (upg.level >= upg.maxLevel) return;
    const nextCost = upg.getCost(upg.level);

    const divElement = document.createElement("div");
    divElement.className = "upgrade-card";
    divElement.innerHTML = `
      <p>${upg.name}</p>
      <p class="upgrade-description">${upg.description}</p>
      <p>${upg.level}/${upg.maxLevel}</p>
      <p>${nextCost}c</p>
      <button ${coins < nextCost ? "disabled" : ""}>Upgrade</button>
    `;

    divElement.querySelector("button").onclick = () => purchaseUpgrade(upg);
    containerElement.appendChild(divElement);
  });
}
updateUpgradeUI();

/* Media Queries */
const leftPanel = document.querySelector(".left-container");
const rightPanel = document.querySelector(".right-container");

document.querySelector(".toggle-left").addEventListener("click", () => {
  if (rightPanel.classList.contains("show")) {
    rightPanel.classList.remove("show");
  }
  leftPanel.classList.toggle("show");
});

document.querySelector(".toggle-right").addEventListener("click", () => {
  if (leftPanel.classList.contains("show")) {
    leftPanel.classList.remove("show");
  }
  rightPanel.classList.toggle("show");
});
