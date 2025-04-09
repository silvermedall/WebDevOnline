export class WeaponGacha {
  constructor(rarityRates, itemPool) {
    this.rarityRates = rarityRates;
    this.itemPool = itemPool;
  }

  getRandomRarity() {
    const rand = Math.random() * 100;
    let cumulative = 0;

    for (let itemRarity of this.rarityRates) {
      cumulative += itemRarity.rate;
      if (rand < cumulative) return itemRarity.itemRarity;
    }
    return rarityRates[this.rarityRates.length - 1].itemRarity;
  }

  roll() {
    const itemRarity = this.getRandomRarity();
    const items = this.itemPool[itemRarity];

    const item = items[Math.floor(Math.random() * items.length)];
    return { itemRarity, item };
  }
}
