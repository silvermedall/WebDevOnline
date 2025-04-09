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

let coins = 10;
let gachaPrice = 10;
let inventory = [];
let slotNumber = 4;
let activeSlots = [];

setSlotNumber(slotNumber);

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
function setSlotNumber(slotNumber) {
  slotNumber = slotNumber;
  const containerElement = document.getElementById("weapon-slots");
  containerElement.innerHTML = "";

  for (let i = 0; i < slotNumber; i++) {
    activeSlots[i] = null;
    const divElement = document.createElement("div");
    divElement.className = "weapon-slot";
    divElement.innerHTML = `<img src="assets/border-empty.png" />`;
    divElement.setAttribute("data-slot", i);
    divElement.onclick = () => clearSlot(i);
    containerElement.appendChild(divElement);
  }
}

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

function updateEconomyUI() {
  const priceElement = document.getElementById("gacha-price");
  const coinCounterElement = document.getElementById("coin-counter");
  priceElement.textContent = `Price: ${gachaPrice}c`;
  coinCounterElement.textContent = `Coins: ${coins}c`;
}
