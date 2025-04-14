export const bossModifiers = {
  hpMultiplier: 1,
  coinMultiplier: 1,
  rarityMultiplier: 0,
};

export const weaponGachaModifiers = {
  rarityMultiplier: 0,
  priceMultiplier: 1,
};

export let slotNumber = 3;
export function applySlotUpgrade(level) {
  slotNumber = 3 + level;
  updateSlotUI();
}

let updateSlotUI = () => {};

export function registerSlotUpdater(fn) {
  updateSlotUI = fn;
}
