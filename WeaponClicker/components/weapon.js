import { weaponUpgradeTrees } from "./weaponUpgradeTrees.js";

export class WeaponInstance {
  constructor({ name, img, attack, attackSpeed, type, rarity }) {
    this.name = name;
    this.img = img;
    this.attack = attack;
    this.attackSpeed = attackSpeed;
    this.type = type;
    this.rarity = rarity;

    const tree = weaponUpgradeTrees[this.name];
    if (tree) {
      tree.upgrades.forEach((upg) => {
        if (upg.unlocked) {
          upg.effect(this);
        }
      });
    }
    console.log(`${this.name} stats: `, this.attack, this.attackSpeed);
  }

  startAttacking(boss, onBossHit, slotIndex) {
    this.interval = setInterval(() => {
      boss.takeDamage(this.attack, this.type);
      console.log(`${this.name} dealt ${this.attack} damage`);
      this.animateAttack(slotIndex);
      onBossHit();
    }, this.attackSpeed);
  }

  animateAttack(slotIndex) {
    const slotImg = document.querySelector(
      `.weapon-slot[data-slot="${slotIndex}"] img`
    );
    if (!slotImg) return;

    slotImg.classList.add("attack");

    slotImg.addEventListener(
      "animationend",
      () => {
        slotImg.classList.remove("attack");
      },
      { once: true }
    );
  }

  stopAttacking() {
    clearInterval(this.interval);
  }
}
