export class BossGacha {
  constructor(rarityRates, bossPool) {
    this.rarityRates = rarityRates;
    this.bossPool = bossPool;
  }

  getRandomRarity() {
    const rand = Math.random() * 100;
    let cumulative = 0;

    for (let bossRarity of this.rarityRates) {
      cumulative += bossRarity.rate;
      if (rand < cumulative) return bossRarity.bossRarity;
    }
    return this.rarityRates[this.rarityRates.length - 1].bossRarity;
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
