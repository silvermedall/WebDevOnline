const upgradeButton = document.querySelector(".upgrade-button");
const menu = document.querySelector(".menu");

function loadGameStateIfAny() {
  try {
    const storedGameState = window.localStorage.getItem("gameState");
    if (storedGameState) {
      let gameState = JSON.parse(storedGameState);
      gameState.fireStart = false;
      return gameState;
    }
  } catch (error) {
    console.error("Could not load Game State from local storage", error);
  }
  const gameState = {
    count: 0,
    clickCount: 1,
    clickPercentageIncrease: 0,
    passiveCount: 0,
    passivePercentageIncrease: 0,
    fireDelay: 180000,
    fireResetDelay: 1800000,
    fireStart: false,
    linearUpgradeLevel: 0,
    percentageUpgradeLevel: 0,
    passiveLinearUpgradeLevel: 0,
    passivePercentageUpgradeLevel: 0,
    fireDelayUpgradeLevel: 0,
    fireResetUpgradeLevel: 0,
    randomUpgradeLevel: 0,
  };
  window.localStorage.setItem("gameState", JSON.stringify(gameState));
  return gameState;
}

const gameState = loadGameStateIfAny();
updateUIcost();

function updateUIcost() {
  document.getElementById("upgradeCost1").innerHTML = getUpgradeCost(
    50,
    gameState.linearUpgradeLevel,
    1.2
  );
  document.getElementById("upgradeCost2").innerHTML = getUpgradeCost(
    200,
    gameState.percentageUpgradeLevel,
    1.2
  );
  document.getElementById("upgradeCost3").innerHTML = getUpgradeCost(
    100,
    gameState.passiveLinearUpgradeLevel,
    1.2
  );
  document.getElementById("upgradeCost4").innerHTML = getUpgradeCost(
    500,
    gameState.passivePercentageUpgradeLevel,
    1.2
  );
  document.getElementById("upgradeCost5").innerHTML = getUpgradeCost(
    1000,
    gameState.fireDelayUpgradeLevel,
    1.2
  );
  document.getElementById("upgradeCost6").innerHTML = getUpgradeCost(
    2000,
    gameState.fireResetUpgradeLevel,
    1.2
  );
  document.getElementById("upgradeCost7").innerHTML = getUpgradeCost(
    5000,
    gameState.randomUpgradeLevel,
    1.2
  );
}

function storeGameState() {
  setTimeout(storeGameState, 2000);
  window.localStorage.setItem("gameState", JSON.stringify(gameState));
  console.log("Game State saved");
}

storeGameState();

upgradeButton.addEventListener("click", () => {
  menu.classList.toggle("open");
});

document.addEventListener("click", (event) => {
  if (!menu.contains(event.target) && !upgradeButton.contains(event.target)) {
    menu.classList.remove("open");
  }
});

function addCount() {
  let bonusFromLinearUpgrade = gameState.linearUpgradeLevel;
  let bonusFromPercentageUpgrade = 1 + gameState.clickPercentageIncrease / 100;
  let totalClicks = Math.floor(
    (gameState.clickCount + bonusFromLinearUpgrade) * bonusFromPercentageUpgrade
  );
  gameState.count += totalClicks;
  document.getElementById("count").innerHTML = gameState.count;
}

function passiveCounting() {
  setTimeout(passiveCounting, 3000);
  let bonusPassiveLinearUpgrade = gameState.passiveLinearUpgradeLevel;
  let bonusPassivePercentageUpgrade =
    1 + gameState.passivePercentageIncrease / 100;
  let totalPassiveCount = Math.floor(
    (gameState.passiveCount + bonusPassiveLinearUpgrade) *
      bonusPassivePercentageUpgrade
  );
  gameState.count += totalPassiveCount;
  document.getElementById("count").innerHTML = gameState.count;
}

passiveCounting();

function showFireWarning() {
  if (gameState.fireStart) {
    const warning = document.getElementById("fire-warning");
    warning.classList.remove("hidden");
    warning.classList.add("visible");

    document.body.classList.add("fire");
    document.querySelectorAll(".tree").forEach((tree) => {
      tree.classList.add("burning");
    });
  }
}

function hideFireWarning() {
  const warning = document.getElementById("fire-warning");
  warning.classList.remove("visible");
  warning.classList.add("hidden");

  document.body.classList.remove("fire");
  document.querySelectorAll(".tree").forEach((tree) => {
    tree.classList.remove("burning");
  });
}

function fireCountdown() {
  if (!gameState.fireStart) {
    gameState.fireStart = true;
    console.log("Skipped");
  } else {
    gameState.count -= Math.floor(gameState.count * 0.3);
    console.log("Burned");
    document.getElementById("count").innerHTML = gameState.count;
    hideFireWarning();
  }

  setTimeout(() => {
    showFireWarning();
  }, gameState.fireDelay - 5000);

  setTimeout(fireCountdown, gameState.fireDelay);
}

fireCountdown();

function summonSebastiao() {
  const fogLeft = document.getElementById("fog-left");
  const fogRight = document.getElementById("fog-right");

  fogLeft.classList.add("fog-active-left");
  fogRight.classList.add("fog-active-right");

  setTimeout(() => {
    fogLeft.classList.remove("fog-active-left");
    fogRight.classList.remove("fog-active-right");
  }, 5000);
}

function fireCountdownReset() {
  if (gameState.fireResetUpgradeLevel > 0) {
    setTimeout(() => {
      gameState.fireStart = false;
      fireCountdownReset();
      summonSebastiao();
      console.log("Resetted");
    }, gameState.fireResetDelay);
  }
}

fireCountdownReset();

function getUpgradeCost(baseCost, level, multiplier) {
  return Math.round(baseCost * Math.pow(multiplier, level));
}

function upgrade1() {
  if (
    gameState.count >= getUpgradeCost(50, gameState.linearUpgradeLevel, 1.2)
  ) {
    gameState.count -= getUpgradeCost(50, gameState.linearUpgradeLevel, 1.2);
    gameState.linearUpgradeLevel += 1;
    document.getElementById("count").innerHTML = gameState.count;
    document.getElementById("upgradeCost1").innerHTML = getUpgradeCost(
      50,
      gameState.linearUpgradeLevel,
      1.2
    );
  } else {
    alert("You don't have enough points!");
  }
}

function upgrade2() {
  if (
    gameState.count >=
    getUpgradeCost(200, gameState.percentageUpgradeLevel, 1.2)
  ) {
    gameState.count -= getUpgradeCost(
      200,
      gameState.percentageUpgradeLevel,
      1.2
    );
    gameState.percentageUpgradeLevel += 1;
    gameState.clickPercentageIncrease += 20;
    document.getElementById("count").innerHTML = gameState.count;
    document.getElementById("upgradeCost2").innerHTML = getUpgradeCost(
      200,
      gameState.percentageUpgradeLevel,
      1.2
    );
  } else {
    alert("You don't have enough points!");
  }
}

function upgrade3() {
  if (
    gameState.count >=
    getUpgradeCost(100, gameState.passiveLinearUpgradeLevel, 1.2)
  ) {
    gameState.count -= getUpgradeCost(
      100,
      gameState.passiveLinearUpgradeLevel,
      1.2
    );
    gameState.passiveLinearUpgradeLevel += 1;
    document.getElementById("count").innerHTML = gameState.count;
    document.getElementById("upgradeCost3").innerHTML = getUpgradeCost(
      100,
      gameState.passiveLinearUpgradeLevel,
      1.2
    );
  } else {
    alert("You don't have enough points!");
  }
}

function upgrade4() {
  if (
    gameState.count >=
    getUpgradeCost(500, gameState.passivePercentageUpgradeLevel, 1.2)
  ) {
    gameState.count -= getUpgradeCost(
      500,
      gameState.passivePercentageUpgradeLevel,
      1.2
    );
    gameState.passivePercentageUpgradeLevel += 1;
    gameState.passivePercentageIncrease += 20;
    document.getElementById("count").innerHTML = gameState.count;
    document.getElementById("upgradeCost4").innerHTML = getUpgradeCost(
      500,
      gameState.passivePercentageUpgradeLevel,
      1.2
    );
  } else {
    alert("You don't have enough points!");
  }
}

function upgrade5() {
  if (
    gameState.count >=
    getUpgradeCost(1000, gameState.fireDelayUpgradeLevel, 1.2)
  ) {
    gameState.count -= getUpgradeCost(
      1000,
      gameState.fireDelayUpgradeLevel,
      1.2
    );
    gameState.fireDelayUpgradeLevel += 1;
    gameState.fireDelay += 15000;
    document.getElementById("count").innerHTML = gameState.count;
    document.getElementById("upgradeCost5").innerHTML = getUpgradeCost(
      1000,
      gameState.fireDelayUpgradeLevel,
      1.2
    );
  } else {
    alert("You don't have enough points!");
  }
}

function upgrade6() {
  if (
    gameState.count >=
    getUpgradeCost(2000, gameState.fireResetUpgradeLevel, 1.2)
  ) {
    gameState.count -= getUpgradeCost(
      2000,
      gameState.fireResetUpgradeLevel,
      1.2
    );
    gameState.fireResetUpgradeLevel += 1;
    gameState.fireResetDelay -= 10000;
    document.getElementById("count").innerHTML = gameState.count;
    document.getElementById("upgradeCost6").innerHTML = getUpgradeCost(
      2000,
      gameState.fireResetUpgradeLevel,
      1.2
    );
  } else {
    alert("You don't have enough points!");
  }
}

function upgrade7() {
  if (
    gameState.count >= getUpgradeCost(5000, gameState.randomUpgradeLevel, 1.2)
  ) {
    gameState.count -= getUpgradeCost(5000, gameState.randomUpgradeLevel, 1.2);
    gameState.randomUpgradeLevel += 1;
    document.getElementById("count").innerHTML = gameState.count;
    document.getElementById("upgradeCost7").innerHTML = getUpgradeCost(
      5000,
      gameState.randomUpgradeLevel,
      1.2
    );
  } else {
    alert("You don't have enough points!");
  }
}

function upgrade7Function() {
  if (gameState.randomUpgradeLevel > 0) {
    let randomValue = Math.floor(Math.random() * 100) + 1;
    console.log("Random value: " + randomValue);
    setTimeout(() => {
      gameState.count += randomValue;
      document.getElementById("count").innerHTML = gameState.count;
      randomValue = Math.floor(Math.random() * 100) + 1;
      console.log("Random value: " + randomValue);
    }, randomValue * 1000 - gameState.randomUpgradeLevel * 1000);
  }
}

upgrade7Function();
