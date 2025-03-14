const upgradeButton = document.querySelector(".upgrade-button");
const menu = document.querySelector(".menu");

let count = 0;
let clickCount = 1;
let clickPercentageIncrease = 0;
let passiveCount = 0;
let passivePercentageIncrease = 0;

let fireCountdownPaused = false;
let fireDelay = 180000;
let fireResetDelay = 1800000;

let linearUpgradeLevel = 0;
let percentageUpgradeLevel = 0;

let passiveLinearUpgradeLevel = 0;
let passivePercentageUpgradeLevel = 0;

let fireDelayUpgradeLevel = 0;
let fireResetUpgradeLevel = 0;

let randomUpgradeLevel = 0;


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

function passiveCounting() {
    setTimeout(passiveCounting, 5000);
    let bonusPassiveLinearUpgrade = passiveLinearUpgradeLevel;
    let bonusPassivePercentageUpgrade = 1 + (passivePercentageIncrease / 100);
    let totalPassiveCount = Math.floor((passiveCount + bonusPassiveLinearUpgrade) * bonusPassivePercentageUpgrade);
    count += totalPassiveCount;
    document.getElementById("count").innerHTML = count;
}

passiveCounting();

function showFireWarning() {
    const warning = document.getElementById("fire-warning");
    warning.classList.remove("hidden");
    warning.classList.add("visible");
}

function hideFireWarning() {
    const warning = document.getElementById("fire-warning");
    warning.classList.remove("visible");
    warning.classList.add("hidden");
}

function fireCountdown() {
    if (!fireCountdownPaused) {
        setTimeout(fireCountdown, fireDelay);
        count -= Math.floor(count * 0.3);
        console.log("Burned");
        document.getElementById("count").innerHTML = count;
        hideFireWarning();

        setTimeout(() => {
            showFireWarning();
        }, fireDelay - 5000);
    }
}

fireCountdown();

function fireCountdownReset() {
    if (fireResetUpgradeLevel > 0) {
        fireCountdownPaused = true;
        setTimeout(() => {
            fireCountdownPaused = false;
            fireCountdown();
            fireCountdownReset();
            console.log("Resetted");
        }, fireResetDelay);
    }
}

fireCountdownReset();

function getUpgradeCost(baseCost, level, multiplier) {
    return Math.round(baseCost * Math.pow(multiplier, level));
}

function upgrade1() {
    if (count >= getUpgradeCost(50, linearUpgradeLevel, 1.2)) {
        count -= getUpgradeCost(50, linearUpgradeLevel, 1.2);
        linearUpgradeLevel += 1;
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
        clickPercentageIncrease += 20;
        document.getElementById("count").innerHTML = count;
        document.getElementById("upgradeCost2").innerHTML = getUpgradeCost(200, percentageUpgradeLevel, 1.2);
    } else {
        alert("You don't have enough points!");
    }
}

function upgrade3() {
    if (count >= getUpgradeCost(100, passiveLinearUpgradeLevel, 1.2)) {
        count -= getUpgradeCost(100, passiveLinearUpgradeLevel, 1.2);
        passiveLinearUpgradeLevel += 1;
        document.getElementById("count").innerHTML = count;
        document.getElementById("upgradeCost3").innerHTML = getUpgradeCost(100, passiveLinearUpgradeLevel, 1.2);
    } else {
        alert("You don't have enough points!");
    }
}

function upgrade4() {
    if (count >= getUpgradeCost(500, passivePercentageUpgradeLevel, 1.2)) {
        count -= getUpgradeCost(500, passivePercentageUpgradeLevel, 1.2);
        passivePercentageUpgradeLevel += 1;
        passivePercentageIncrease += 20;
        document.getElementById("count").innerHTML = count;
        document.getElementById("upgradeCost4").innerHTML = getUpgradeCost(500, passivePercentageUpgradeLevel, 1.2);
    } else {
        alert("You don't have enough points!");
    }
}

function upgrade5() {
    if (count >= getUpgradeCost(1000, fireDelayUpgradeLevel, 1.2)) {
        count -= getUpgradeCost(1000, fireDelayUpgradeLevel, 1.2);
        fireDelayUpgradeLevel += 1;
        fireDelay += 15000;
        document.getElementById("count").innerHTML = count;		
        document.getElementById("upgradeCost5").innerHTML = getUpgradeCost(1000, fireDelayUpgradeLevel, 1.2);
    } else {
        alert("You don't have enough points!");
    }
}

function upgrade6() {
    if (count >= getUpgradeCost(2000, fireResetUpgradeLevel, 1.2)) {
        count -= getUpgradeCost(2000, fireResetUpgradeLevel, 1.2);
        fireResetUpgradeLevel += 1;
        fireResetDelay -= 10000;
        document.getElementById("count").innerHTML = count;
        document.getElementById("upgradeCost6").innerHTML = getUpgradeCost(2000, fireResetUpgradeLevel, 1.2);
    } else {
        alert("You don't have enough points!");
    }
}

function upgrade7() {
    if (count >= getUpgradeCost(5000, randomUpgradeLevel, 1.2)) {
        count -= getUpgradeCost(5000, randomUpgradeLevel, 1.2);
        randomUpgradeLevel += 1;
        document.getElementById("count").innerHTML = count;
        document.getElementById("upgradeCost7").innerHTML = getUpgradeCost(5000, randomUpgradeLevel, 1.2);
    } else {
        alert("You don't have enough points!");
    }
}

function upgrade7Function() {
    if (randomUpgradeLevel > 0) {
        let randomValue = Math.floor(Math.random() * 100) + 1;
        console.log("Random value: " + randomValue);
        setTimeout(() => {
            count += randomValue;
            document.getElementById("count").innerHTML = count;
            randomValue = Math.floor(Math.random() * 100) + 1;
            console.log("Random value: " + randomValue);
        }, randomValue*1000)
    }
}

upgrade7Function();