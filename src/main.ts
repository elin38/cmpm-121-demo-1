import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Ethan's Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// intitialize
let increment: number = 0;
let counter: number = 0;
let upgradePurchased: number = 0;
let upgrade2Purchased: number = 0;
let upgrade3Purchased: number = 0;

// step 1
const button = document.createElement("button");
button.innerHTML = "🎼";
app.append(button);
// step 2
const displayCounter = document.createElement("div");
displayCounter.innerHTML = `${counter} notes`;
app.append(displayCounter);

button.addEventListener("click", () => {
    counter += 1;
    displayCounter.innerHTML = `${counter} notes`;
});
// step 3

function increaseCounter(amount: number) {
    counter += amount;
    displayCounter.innerHTML = `${counter.toFixed(2)} notes`;
    displayIncrement.innerHTML = `${increment.toFixed(1)} notes/s`;
    upgrade.innerHTML = `Purchase 0.1 🎵/s (${upgradePurchased})`;
    upgrade2.innerHTML = `Purchase 2 🎵/s (${upgrade2Purchased})`;
    upgrade3.innerHTML = `Purchase 50 🎵/s (${upgrade3Purchased})`;
}
// step 4
let startTime = 0;
function autoClick(endTime: number) {
    if (startTime !== 0) {
        const elapsedTime = (endTime - startTime) / 1000;
        const amount = elapsedTime * increment;
        increaseCounter(amount);
    }
    startTime = endTime;
    requestAnimationFrame(autoClick);
}
requestAnimationFrame(autoClick);
// step 5
const upgrade = document.createElement("button");
upgrade.innerHTML = "Purchase 0.1 🎵/s";
console.log(typeof(upgrade));
upgrade.id = 'upgrade1';
app.append(upgrade);
upgrade.addEventListener("click", () => {
    increment += 0.1;
    counter -= 10;
    upgradePurchased += 1;
});
setInterval(checkUpgrade)
function checkUpgrade() {
    if (counter < 10) {
        upgrade.disabled = true;
    } else {
        upgrade.disabled = false;
    }
    if (counter < 100) {
        upgrade2.disabled = true;
    } else {
        upgrade2.disabled = false;
    }
    if (counter < 1000) {
        upgrade3.disabled = true;
    } else {
        upgrade3.disabled = false;
    }
}
// step 6
const upgrade2 = document.createElement("button");
upgrade2.innerHTML = "Purchase 2 🎵/s";
app.append(upgrade2);
upgrade2.addEventListener("click", () => {
    increment += 2.0;
    counter -= 100;
    upgrade2Purchased += 1;
});

const upgrade3 = document.createElement("button");
upgrade3.innerHTML = "Purchase 50 🎵/s";
app.append(upgrade3);
upgrade3.addEventListener("click", () => {
    increment += 50;
    counter -= 1000;
    upgrade3Purchased += 1;
});

const displayIncrement = document.createElement("div");
displayIncrement.innerHTML = `${increment} notes/s`;
app.append(displayIncrement);
