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
import { weaponUpgradeTrees } from "./components/weaponUpgradeTrees.js";

let coins = 10;
let basePrice = 10;
let gachaPrice = basePrice;

let inventory = [];
let activeSlots = [];
let currentUpgradeTreeType = null;

renderSlots();
updateRarityDisplay();

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
  if (currentUpgradeTreeType === item.name) {
    renderWeaponUpgradeTree(currentUpgradeTreeType);
  }
});

function updateGachaUI(item, itemRarity) {
  document.getElementById("prize-img").src = item.img;
  document.getElementById("prize-name").innerHTML = item.name;
  document.getElementById("prize-rarity").innerHTML = itemRarity;
}

/* Library Logic */
function updateRarityDisplay() {
  const containerElement = document.getElementById("rarity-display");
  const baseRates = [...itemRarityRates.map((r) => ({ ...r }))];
  const boostLevel = weaponGachaModifiers.rarityMultiplier || 0;

  if (boostLevel > 0) {
    baseRates.forEach((entry) => {
      const r = entry.itemRarity;
      if (["Uncommon", "Rare", "Epic", "Legendary"].includes(r)) {
        entry.rate += boostLevel * 2;
      }
    });
  }

  const total = baseRates.reduce((sum, r) => sum + r.rate, 0);
  baseRates.forEach((r) => (r.rate = ((r.rate / total) * 100).toFixed(1)));

  const LabelMap = {
    Common: "N",
    Uncommon: "U",
    Rare: "R",
    Epic: "E",
    Legendary: "L",
  };

  const html = baseRates
    .map(
      (r) =>
        `<span class="rarity-${LabelMap[r.itemRarity]}">${
          LabelMap[r.itemRarity]
        }: ${r.rate}%</span>`
    )
    .join("");
  containerElement.innerHTML = html;
}

function updateLibraryUI() {
  const rarityOrder = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];

  const grouped = {};
  inventory.forEach((weapon) => {
    const key = `${weapon.name}|${weapon.rarity}`;
    if (!grouped[key]) {
      grouped[key] = { weapon, count: 0 };
    }
    grouped[key].count++;
  });

  const groupedArray = Object.values(grouped);
  groupedArray.sort((a, b) => {
    const rarityDiff =
      rarityOrder.indexOf(b.weapon.rarity) -
      rarityOrder.indexOf(a.weapon.rarity);
    if (rarityDiff !== 0) return rarityDiff;
    return a.weapon.name.localeCompare(b.weapon.name);
  });

  const containerElement = document.getElementById("library-container");
  containerElement.innerHTML = "";
  groupedArray.forEach(({ weapon, count }) => {
    const divElement = document.createElement("div");
    divElement.className = "weapon-card";
    divElement.innerHTML = `
      <img src="${weapon.img}" />
      <span class="weapon-count">x${count}</span>
    `;

    divElement.onclick = () => {
      sendToSlot(weapon);
      updateLibraryUI();
    };

    containerElement.appendChild(divElement);
  });
}

/* Slot + Weapon Attacking Logic */
function renderSlots() {
  const containerElement = document.getElementById("weapon-slots");
  activeSlots.forEach((weapon, i) => {
    if (weapon && typeof weapon.stopAttacking === "function") {
      weapon.stopAttacking();
    }
  });

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
    if (currentUpgradeTreeType === weapon.name) {
      renderWeaponUpgradeTree(currentUpgradeTreeType);
    }
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
  if (currentUpgradeTreeType === weapon.name) {
    renderWeaponUpgradeTree(currentUpgradeTreeType);
  }
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
    updateRarityDisplay();
  });
}
updateUpgradeUI();

/* Weapon Tree Logic */
function unlockWeaponUpgrade(type, upgradeId) {
  const tree = weaponUpgradeTrees[type];
  const upgrade = tree.upgrades.find((u) => u.id === upgradeId);
  if (!upgrade || upgrade.unlocked) return;

  const needed = { ...upgrade.cost };
  const matching = inventory.filter((w) => w.name === type);

  const counts = {};
  matching.forEach((w) => {
    counts[w.rarity] = (counts[w.rarity] || 0) + 1;
  });

  for (const rarity in needed) {
    if (counts[rarity] < needed[rarity])
      return console.log("Not enough weapons");
  }

  for (const rarity in needed) {
    let toRemove = needed[rarity];
    for (let i = 0; i < inventory.length && toRemove > 0; i++) {
      const w = inventory[i];
      if (w.name === type && w.rarity === rarity) {
        inventory.splice(i, 1);
        i--;
        toRemove--;
      }
    }
  }

  upgrade.unlocked = true;
  console.log(`${type} upgrade unlocked: ${upgrade.name}`);
  updateLibraryUI();
  applyWeaponUpgrade(type);
}

function applyWeaponUpgrade(type) {
  const tree = weaponUpgradeTrees[type];
  if (!tree) return;

  const applyTo = (weapon) => {
    tree.upgrades.forEach((upg) => {
      if (upg.unlocked) upg.effect(weapon);
    });
  };

  inventory.filter((w) => w.name === type).forEach(applyTo);

  activeSlots.filter((w) => w && w.name === type).forEach(applyTo);
}

function formatUpgradeCost(costObj) {
  return Object.entries(costObj)
    .map(([rarity, amount]) => `${amount}x ${rarity}`)
    .join(", ");
}

function hasUpgradeMaterials(type, upgrade) {
  const needed = { ...upgrade.cost };
  const matching = inventory.filter((w) => w.name === type);

  const counts = {};
  matching.forEach((w) => {
    counts[w.rarity] = (counts[w.rarity] || 0) + 1;
  });

  return Object.entries(needed).every(
    ([rarity, amount]) => counts[rarity] >= amount
  );
}

function renderWeaponUpgradeTree(type) {
  currentUpgradeTreeType = type;
  const container = document.getElementById("bottom-area");
  container.innerHTML = "";

  const tree = weaponUpgradeTrees[type];
  if (!tree) {
    container.innerHTML = `<p>Upgrade tree not found for ${type}</p>`;
    return;
  }

  const title = document.createElement("p");
  title.textContent = `${type} Upgrade Tree`;
  container.appendChild(title);

  const upgradeTree = document.createElement("div");
  upgradeTree.className = "upgrade-tree";
  container.appendChild(upgradeTree);

  tree.upgrades.forEach((upgrade) => {
    const card = document.createElement("div");
    card.className = "upgrade-node";

    const canAfford = hasUpgradeMaterials(type, upgrade);

    card.innerHTML = `
      <p>${upgrade.name}</p>
      <p>Cost: ${formatUpgradeCost(upgrade.cost)}</p>
      <button ${upgrade.unlocked ? "disabled" : ""} ${
      !canAfford ? "disabled" : ""
    }>${upgrade.unlocked ? "Unlocked" : "Unlock"}</button>
    `;

    card.querySelector("button").onclick = () => {
      unlockWeaponUpgrade(type, upgrade.id);
      renderWeaponUpgradeTree(type);
    };

    upgradeTree.appendChild(card);
  });
}

document.getElementById("sword-upgrades").onclick = () => {
  renderWeaponUpgradeTree("Sword");
};
document.getElementById("shield-upgrades").onclick = () => {
  renderWeaponUpgradeTree("Shield");
};
document.getElementById("hammer-upgrades").onclick = () => {
  renderWeaponUpgradeTree("Hammer");
};
document.getElementById("axe-upgrades").onclick = () => {
  renderWeaponUpgradeTree("Axe");
};

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
