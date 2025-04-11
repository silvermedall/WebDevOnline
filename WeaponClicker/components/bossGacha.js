import { bossModifiers } from "./modifiers.js";

export class BossGacha {
  constructor(rarityRates, bossPool) {
    this.rarityRates = rarityRates;
    this.bossPool = bossPool;
  }

  getRandomRarity() {
    const boost = bossModifiers.rarityMultiplier;
    const boostedRates = this.rarityRates.map((entry) => ({ ...entry }));

    if (boost > 0) {
      boostedRates.forEach((entry) => {
        const r = entry.bossRarity;
        if (["Uncommon", "Rare", "Epic", "Legendary"].includes(r)) {
          entry.rate += boost * 2;
        }
      });

      const total = boostedRates.reduce((sum, e) => sum + e.rate, 0);
      boostedRates.forEach((e) => (e.rate = (e.rate / total) * 100));
    }

    const rand = Math.random() * 100;
    let cumulative = 0;

    for (let entry of boostedRates) {
      cumulative += entry.rate;
      if (rand < cumulative) return entry.bossRarity;
    }
    return boostedRates[0].bossRarity;
  }

  getRandomWeakness() {
    const types = ["cutting", "blunt", null];
    return types[Math.floor(Math.random() * types.length)];
  }

  roll() {
    const bossRarity = this.getRandomRarity();
    const weakness = this.getRandomWeakness();
    const bosses = this.bossPool[bossRarity];
    const boss = bosses[Math.floor(Math.random() * bosses.length)];
    return { boss, bossRarity, weakness };
  }
}
