import {
  bossModifiers,
  weaponGachaModifiers,
  applySlotUpgrade,
} from "./modifiers.js";

export const upgrades = [
  {
    id: "upgrade_treasure",
    name: "Treasure Sense",
    description: "Increases price and rarity of treasure drops.",
    baseCost: 100,
    level: 0,
    maxLevel: 10,
    getCost(level) {
      return Math.floor(this.baseCost * Math.pow(1.8, level));
    },
    effect(level) {
      weaponGachaModifiers.rarityMultiplier = level;
      weaponGachaModifiers.priceMultiplier = 1 + level * 0.5;
      window.updateGachaPrice?.();
    },
  },
  {
    id: "upgrade_boss_hp",
    name: "Tougher Bosses",
    description: "Bosses have more HP but reward more coins.",
    baseCost: 150,
    level: 0,
    maxLevel: 10,
    getCost(level) {
      return Math.floor(this.baseCost * Math.pow(2, level));
    },
    effect(level) {
      bossModifiers.hpMultiplier = 1 + 0.5 * level;
      bossModifiers.coinMultiplier = 1 + 0.5 * level;
    },
  },
  {
    id: "upgrade_boss_rarity",
    name: "Rarer Bosses",
    description: "Increases boss rarity.",
    baseCost: 200,
    level: 0,
    maxLevel: 10,
    getCost(level) {
      return Math.floor(this.baseCost * Math.pow(2.5, level));
    },
    effect(level) {
      bossModifiers.rarityMultiplier = level;
    },
  },
  {
    id: "upgrade_slots",
    name: "Bigger Party",
    description: "Increases the number of party members.",
    baseCost: 250,
    level: 0,
    maxLevel: 10,
    getCost(level) {
      return Math.floor(this.baseCost * Math.pow(3, level));
    },
    effect(level) {
      applySlotUpgrade(level);
    },
  },
];
