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
      {
        id: "dmg2",
        name: "+30% Damage",
        unlocked: false,
        cost: {
          Uncommon: 2,
          Rare: 1,
        },
        effect: (weapon) => {
          weapon.attack *= 1.3;
        },
      },
      {
        id: "dmg3",
        name: "+40% Damage",
        unlocked: false,
        cost: {
          Rare: 2,
          Epic: 1,
        },
        effect: (weapon) => {
          weapon.attack *= 1.4;
        },
      },
      {
        id: "dmg4",
        name: "+60% Damage",
        unlocked: false,
        cost: {
          Epic: 2,
          Legendary: 1,
        },
        effect: (weapon) => {
          weapon.attack *= 1.6;
        },
      },
      {
        id: "attackSpeed1",
        name: "+15% Attack Speed",
        unlocked: false,
        cost: {
          Common: 5,
          Uncommon: 2,
        },
        effect: (weapon) => {
          weapon.attackSpeed *= 0.85;
        },
      },
      {
        id: "attackSpeed2",
        name: "+25% Attack Speed",
        unlocked: false,
        cost: {
          Uncommon: 5,
          Rare: 2,
        },
        effect: (weapon) => {
          weapon.attackSpeed *= 0.75;
        },
      },
      {
        id: "attackSpeed3",
        name: "+35% Attack Speed",
        unlocked: false,
        cost: {
          Rare: 5,
          Epic: 2,
        },
        effect: (weapon) => {
          weapon.attackSpeed *= 0.65;
        },
      },
      {
        id: "attackSpeed4",
        name: "+50% Attack Speed",
        unlocked: false,
        cost: {
          Epic: 5,
          Legendary: 2,
        },
        effect: (weapon) => {
          weapon.attackSpeed *= 0.5;
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
      {
        id: "dmg2",
        name: "+30% Damage",
        unlocked: false,
        cost: {
          Uncommon: 2,
          Rare: 1,
        },
        effect: (weapon) => {
          weapon.attack *= 1.3;
        },
      },
      {
        id: "dmg3",
        name: "+40% Damage",
        unlocked: false,
        cost: {
          Rare: 2,
          Epic: 1,
        },
        effect: (weapon) => {
          weapon.attack *= 1.4;
        },
      },
      {
        id: "dmg4",
        name: "+60% Damage",
        unlocked: false,
        cost: {
          Epic: 2,
          Legendary: 1,
        },
        effect: (weapon) => {
          weapon.attack *= 1.6;
        },
      },
      {
        id: "attackSpeed1",
        name: "+15% Attack Speed",
        unlocked: false,
        cost: {
          Common: 5,
          Uncommon: 2,
        },
        effect: (weapon) => {
          weapon.attackSpeed *= 0.85;
        },
      },
      {
        id: "attackSpeed2",
        name: "+25% Attack Speed",
        unlocked: false,
        cost: {
          Uncommon: 5,
          Rare: 2,
        },
        effect: (weapon) => {
          weapon.attackSpeed *= 0.75;
        },
      },
      {
        id: "attackSpeed3",
        name: "+35% Attack Speed",
        unlocked: false,
        cost: {
          Rare: 5,
          Epic: 2,
        },
        effect: (weapon) => {
          weapon.attackSpeed *= 0.65;
        },
      },
      {
        id: "attackSpeed4",
        name: "+50% Attack Speed",
        unlocked: false,
        cost: {
          Epic: 5,
          Legendary: 2,
        },
        effect: (weapon) => {
          weapon.attackSpeed *= 0.5;
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
      {
        id: "dmg2",
        name: "+30% Damage",
        unlocked: false,
        cost: {
          Uncommon: 2,
          Rare: 1,
        },
        effect: (weapon) => {
          weapon.attack *= 1.3;
        },
      },
      {
        id: "dmg3",
        name: "+40% Damage",
        unlocked: false,
        cost: {
          Rare: 2,
          Epic: 1,
        },
        effect: (weapon) => {
          weapon.attack *= 1.4;
        },
      },
      {
        id: "dmg4",
        name: "+60% Damage",
        unlocked: false,
        cost: {
          Epic: 2,
          Legendary: 1,
        },
        effect: (weapon) => {
          weapon.attack *= 1.6;
        },
      },
      {
        id: "attackSpeed1",
        name: "+15% Attack Speed",
        unlocked: false,
        cost: {
          Common: 5,
          Uncommon: 2,
        },
        effect: (weapon) => {
          weapon.attackSpeed *= 0.85;
        },
      },
      {
        id: "attackSpeed2",
        name: "+25% Attack Speed",
        unlocked: false,
        cost: {
          Uncommon: 5,
          Rare: 2,
        },
        effect: (weapon) => {
          weapon.attackSpeed *= 0.75;
        },
      },
      {
        id: "attackSpeed3",
        name: "+35% Attack Speed",
        unlocked: false,
        cost: {
          Rare: 5,
          Epic: 2,
        },
        effect: (weapon) => {
          weapon.attackSpeed *= 0.65;
        },
      },
      {
        id: "attackSpeed4",
        name: "+50% Attack Speed",
        unlocked: false,
        cost: {
          Epic: 5,
          Legendary: 2,
        },
        effect: (weapon) => {
          weapon.attackSpeed *= 0.5;
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
      {
        id: "dmg2",
        name: "+30% Damage",
        unlocked: false,
        cost: {
          Uncommon: 2,
          Rare: 1,
        },
        effect: (weapon) => {
          weapon.attack *= 1.3;
        },
      },
      {
        id: "dmg3",
        name: "+40% Damage",
        unlocked: false,
        cost: {
          Rare: 2,
          Epic: 1,
        },
        effect: (weapon) => {
          weapon.attack *= 1.4;
        },
      },
      {
        id: "dmg4",
        name: "+60% Damage",
        unlocked: false,
        cost: {
          Epic: 2,
          Legendary: 1,
        },
        effect: (weapon) => {
          weapon.attack *= 1.6;
        },
      },
      {
        id: "attackSpeed1",
        name: "+15% Attack Speed",
        unlocked: false,
        cost: {
          Common: 5,
          Uncommon: 2,
        },
        effect: (weapon) => {
          weapon.attackSpeed *= 0.85;
        },
      },
      {
        id: "attackSpeed2",
        name: "+25% Attack Speed",
        unlocked: false,
        cost: {
          Uncommon: 5,
          Rare: 2,
        },
        effect: (weapon) => {
          weapon.attackSpeed *= 0.75;
        },
      },
      {
        id: "attackSpeed3",
        name: "+35% Attack Speed",
        unlocked: false,
        cost: {
          Rare: 5,
          Epic: 2,
        },
        effect: (weapon) => {
          weapon.attackSpeed *= 0.65;
        },
      },
      {
        id: "attackSpeed4",
        name: "+50% Attack Speed",
        unlocked: false,
        cost: {
          Epic: 5,
          Legendary: 2,
        },
        effect: (weapon) => {
          weapon.attackSpeed *= 0.5;
        },
      },
    ],
  },
};
