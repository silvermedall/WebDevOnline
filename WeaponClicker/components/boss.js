export class BossEntity {
  constructor(bossData, rarity, weakness, bossGacha) {
    this.bossGacha = bossGacha;
    this.setBossData(bossData, rarity, weakness);
  }

  setBossData(bossData, rarity, weakness) {
    this.img = bossData.img;
    this.maxHP = bossData.maxHP;
    this.currentHP = this.maxHP;
    this.coinReward = bossData.coins;
    this.rarity = rarity;
    this.weakness = weakness;
  }

  takeDamage(amount, type) {
    const multiplier = type === this.weakness ? 1.5 : 1;
    this.currentHP -= amount * multiplier;
    if (this.currentHP < 0) this.currentHP = 0;
    console.log(`${this.img} has ${this.currentHP} HP left`);
  }

  isDefeated() {
    return this.currentHP === 0;
  }

  reset() {
    const { boss, bossRarity, weakness } = this.bossGacha.roll();
    this.setBossData(boss, bossRarity, weakness);
  }
}
