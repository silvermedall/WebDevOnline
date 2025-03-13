const emojiContainer = document.querySelector(".emoji-fall");
const emojis = ["😀", "😂", "😍", "🤔", "😎", "😭", "😡", "🥳", "🤯", "🤖"];

let count = 0;
let passiveCount = 0;
let countNumber = 1;

let upgrade1Cost = 10;
let upgrade2Cost = 30;

function buttonPress() {
    addCount();
    randomizeEmoji();
}

function addCount() {
    count += countNumber;
    document.getElementById("count").innerHTML = count;
}

function randomizeEmoji() {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    document.getElementById("emoji").innerHTML = emojis[randomIndex];
}

function passiveCounter() {
    setTimeout(passiveCounter, 5000);
    count += passiveCount;
    document.getElementById("count").innerHTML = count;
}

passiveCounter();

function upgrade1() {
    cost1 = countNumber * 10
    if (count >= cost1) {
        count = count - cost1
        countNumber += 1;
        document.getElementById("count").innerHTML = count;
        cost1 = countNumber * 10
        document.getElementById("upgrade1Cost").innerHTML = cost1;
    }
    else {
        alert("You don't have enough points!");
    }
}

function upgrade2() {
    cost2 = (passiveCount + 1) * 30
    if (count >= cost2) {
        count = count - cost2
        passiveCount += 1;
        document.getElementById("count").innerHTML = count;
        cost2 = (passiveCount + 1) * 30
        document.getElementById("upgrade2Cost").innerHTML = cost2;
    }
    else {
        alert("You don't have enough points!");
    }
}

function createFallingEmoji() {
    const emoji = document.createElement("div");
    emoji.classList.add("emoji");
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const startX = Math.random() * window.innerWidth;
    const delay = Math.random() * 2 + 's';
    const duration = Math.random() * 5 + 5 + 's';

    emoji.style.left = startX + 'px';
    emoji.style.animationDelay = delay;
    emoji.style.animationDuration = duration;

    emojiContainer.appendChild(emoji);

    setTimeout(() => {
        emoji.remove();
    }, parseFloat(duration) * 1500);
}

setInterval(createFallingEmoji, 100);