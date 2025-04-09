export const itemRarityRates = [
  { itemRarity: "Common", rate: 75 },
  { itemRarity: "Uncommon", rate: 15 },
  { itemRarity: "Rare", rate: 6 },
  { itemRarity: "Epic", rate: 3 },
  { itemRarity: "Legendary", rate: 1 },
];

export const bossRarityRates = [
  { bossRarity: "Common", rate: 75 },
  { bossRarity: "Uncommon", rate: 15 },
  { bossRarity: "Rare", rate: 6 },
  { bossRarity: "Epic", rate: 3 },
  { bossRarity: "Legendary", rate: 1 },
];

export const itemPool = {
  Common: [
    {
      name: "Sword",
      img: "assets/swordN.png",
      attack: 5,
      attackSpeed: 8000,
      type: "cutting",
    },
    {
      name: "Shield",
      img: "assets/shieldN.png",
      attack: 5,
      attackSpeed: 8000,
      type: "blunt",
    },
    {
      name: "Hammer",
      img: "assets/hammerN.png",
      attack: 10,
      attackSpeed: 10000,
      type: "blunt",
    },
    {
      name: "Axe",
      img: "assets/axeN.png",
      attack: 10,
      attackSpeed: 10000,
      type: "cutting",
    },
  ],
  Uncommon: [
    {
      name: "Sword",
      img: "assets/swordU.png",
      attack: 8,
      attackSpeed: 6000,
      type: "cutting",
    },
    {
      name: "Shield",
      img: "assets/shieldU.png",
      attack: 8,
      attackSpeed: 6000,
      type: "blunt",
    },
    {
      name: "Hammer",
      img: "assets/hammerU.png",
      attack: 13,
      attackSpeed: 9000,
      type: "blunt",
    },
    {
      name: "Axe",
      img: "assets/axeU.png",
      attack: 13,
      attackSpeed: 9000,
      type: "cutting",
    },
  ],
  Rare: [
    {
      name: "Sword",
      img: "assets/swordR.png",
      attack: 10,
      attackSpeed: 5000,
      type: "cutting",
    },
    {
      name: "Shield",
      img: "assets/shieldR.png",
      attack: 10,
      attackSpeed: 5000,
      type: "blunt",
    },
    {
      name: "Hammer",
      img: "assets/HammerR.png",
      attack: 15,
      attackSpeed: 8000,
      type: "blunt",
    },
    {
      name: "Axe",
      img: "assets/AxeR.png",
      attack: 15,
      attackSpeed: 8000,
      type: "cutting",
    },
  ],
  Epic: [
    {
      name: "Sword",
      img: "assets/swordE.png",
      attack: 13,
      attackSpeed: 4000,
      type: "cutting",
    },
    {
      name: "Shield",
      img: "assets/shieldE.png",
      attack: 13,
      attackSpeed: 4000,
      type: "blunt",
    },
    {
      name: "Hammer",
      img: "assets/HammerE.png",
      attack: 18,
      attackSpeed: 7000,
      type: "blunt",
    },
    {
      name: "Axe",
      img: "assets/AxeE.png",
      attack: 18,
      attackSpeed: 7000,
      type: "cutting",
    },
  ],
  Legendary: [
    {
      name: "Sword",
      img: "assets/swordL.png",
      attack: 15,
      attackSpeed: 3000,
      type: "cutting",
    },
    {
      name: "Shield",
      img: "assets/shieldL.png",
      attack: 15,
      attackSpeed: 3000,
      type: "blunt",
    },
    {
      name: "Hammer",
      img: "assets/HammerL.png",
      attack: 20,
      attackSpeed: 6000,
      type: "blunt",
    },
    {
      name: "Axe",
      img: "assets/AxeL.png",
      attack: 20,
      attackSpeed: 6000,
      type: "cutting",
    },
  ],
};

export const bossPool = {
  Common: [{ maxHP: 50, img: "assets/bossN.png", coins: 10 }],
  Uncommon: [{ maxHP: 100, img: "assets/bossU.png", coins: 20 }],
  Rare: [{ maxHP: 150, img: "assets/bossR.png", coins: 35 }],
  Epic: [{ maxHP: 200, img: "assets/bossE.png", coins: 60 }],
  Legendary: [{ maxHP: 250, img: "assets/bossL.png", coins: 100 }],
};
