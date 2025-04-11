export const weaponUpgradeTrees = {
  Sword: {
    upgrades: [
      {
        id: "dmg1",
        name: "+20% Damage",
        unlocked: false,
        cost: {
          Common: 2,
          Uncommon: 1,
        },
        effect: (weapon) => {
          weapon.attack *= 1.2;
        },
      },
    ],
  },
  Shield: {
    upgrades: [
      {
        id: "dmg1",
        name: "+20% Damage",
        unlocked: false,
        cost: {
          Common: 2,
          Uncommon: 1,
        },
        effect: (weapon) => {
          weapon.attack *= 1.2;
        },
      },
    ],
  },
  Hammer: {
    upgrades: [
      {
        id: "dmg1",
        name: "+20% Damage",
        unlocked: false,
        cost: {
          Common: 2,
          Uncommon: 1,
        },
        effect: (weapon) => {
          weapon.attack *= 1.2;
        },
      },
    ],
  },
  Axe: {
    upgrades: [
      {
        id: "dmg1",
        name: "+20% Damage",
        unlocked: false,
        cost: {
          Common: 2,
          Uncommon: 1,
        },
        effect: (weapon) => {
          weapon.attack *= 1.2;
        },
      },
    ],
  },
};
