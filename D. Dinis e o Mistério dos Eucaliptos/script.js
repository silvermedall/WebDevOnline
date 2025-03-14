const upgradeButton = document.querySelector(".upgrade-button");
const menu = document.querySelector(".menu");

let count = 0;
let clickCount = 1;
let clickPercentageIncrease = 0;
let linearUpgradeLevel = 0;
let percentageUpgradeLevel = 0;

upgradeButton.addEventListener("click", () => {
    menu.classList.toggle("open");
});

document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !upgradeButton.contains(event.target)) {
        menu.classList.remove("open");
    }
});

function addCount() {
    let bonusFromLinearUpgrade = linearUpgradeLevel;
    let bonusFromPercentageUpgrade = 1 + (clickPercentageIncrease / 100);
    let totalClicks = Math.floor((clickCount + bonusFromLinearUpgrade) * bonusFromPercentageUpgrade);
    count += totalClicks;
    document.getElementById("count").innerHTML = count;
}

function getUpgradeCost(baseCost, level, multiplier) {
    return Math.round(baseCost * Math.pow(multiplier, level));
}

function upgrade1() {
    if (count >= getUpgradeCost(50, linearUpgradeLevel, 1.2)) {
        count -= getUpgradeCost(50, linearUpgradeLevel, 1.2);
        linearUpgradeLevel += 1;
        clickCount += 1;
        document.getElementById("count").innerHTML = count;
        document.getElementById("upgradeCost1").innerHTML = getUpgradeCost(50, linearUpgradeLevel, 1.2);
    } else {
        alert("You don't have enough points!");
    }
}

function upgrade2() {
    if (count >= getUpgradeCost(200, percentageUpgradeLevel, 1.2)) {
        count -= getUpgradeCost(200, percentageUpgradeLevel, 1.2);
        percentageUpgradeLevel += 1;
        clickPercentageIncrease += 5;
        document.getElementById("count").innerHTML = count;
        document.getElementById("upgradeCost2").innerHTML = getUpgradeCost(200, percentageUpgradeLevel, 1.2);
    } else {
        alert("You don't have enough points!");
    }
}