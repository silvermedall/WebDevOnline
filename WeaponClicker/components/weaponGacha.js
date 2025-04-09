import { weaponGachaModifiers } from "./modifiers.js";

export class WeaponGacha {
  constructor(rarityRates, itemPool) {
    this.rarityRates = rarityRates;
    this.itemPool = itemPool;
  }

  getRandomRarity() {
    const boost = weaponGachaModifiers.rarityMultiplier;
    const boostedRates = this.rarityRates.map((entry) => ({ ...entry }));

    if (boost > 0) {
      boostedRates.forEach((entry) => {
        const r = entry.itemRarity;
        if (["Uncommon", "Rare", "Epic", "Legendary"].includes(r)) {
          entry.rate += boost * 2;
        }
      });

      const total = boostedRates.reduce((sum, e) => sum + e.rate, 0);
      boostedRates.forEach((e) => (e.rate = (e.rate / total) * 100));
    }

    console.log("Item Rarity Rates: ", boostedRates);

    const rand = Math.random() * 100;
    let cumulative = 0;

    for (let entry of boostedRates) {
      cumulative += entry.rate;
      if (rand < cumulative) return entry.itemRarity;
    }
    return boostedRates[0].itemRarity;
  }

  roll() {
    const itemRarity = this.getRandomRarity();
    const items = this.itemPool[itemRarity];

    const item = items[Math.floor(Math.random() * items.length)];
    return { itemRarity, item };
  }
}
