import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Ethan's Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// intitialize
let increment: number = 0;
let counter: number = 1000;

interface Upgrade {
    name: string;
    cost: number;
    amount: number;
    increment: number;
}

const upgrade1: Upgrade = {
    name: "🥁",
    cost: 10,
    amount: 0,
    increment: 0.1
}

const upgrade2: Upgrade = {
    name: "🎺",
    cost: 100,
    amount: 0,
    increment: 2
}

const upgrade3: Upgrade = {
    name: "🎻",
    cost: 1000,
    amount: 0,
    increment: 50
}

// Make main button and counter
const button = document.createElement("button");
button.innerHTML = "🎼";
app.append(button);

const displayCounter = document.createElement("div");
displayCounter.innerHTML = `${counter} notes`;
app.append(displayCounter);

button.addEventListener("click", () => {
    counter += 1;
    displayCounter.innerHTML = `${counter} notes`;
});

const displayIncrement = document.createElement("div");
displayIncrement.innerHTML = `${increment} notes/s`;
app.append(displayIncrement);

// Make upgrade buttons
const upgradeBox = document.createElement("div");
upgradeBox.classList.add("upgrade-box");

const upgrade1button = document.createElement("button");
upgrade1button.innerHTML = upgrade1.name;
upgradeBox.append(upgrade1button);
const upgrade2button = document.createElement("button");
upgrade2button.innerHTML = upgrade2.name;
upgradeBox.append(upgrade2button);
const upgrade3button = document.createElement("button");
upgrade3button.innerHTML = upgrade3.name;
upgradeBox.append(upgrade3button);

app.append(upgradeBox);

function increaseCounter(amount: number) {
    counter += amount;
    displayCounter.innerHTML = `${counter.toFixed(2)} notes`;
    displayIncrement.innerHTML = `${increment.toFixed(1)} notes/s`;
}

// Match frames with note count
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

// Upgrade Button Event Handlers
upgrade1button.addEventListener("click", () => {
    increment += upgrade1.increment;
    counter -= upgrade1.cost;
    upgrade1.amount += 1;
    upgrade1.cost = Number((upgrade1.cost * 1.15).toFixed(2));
});

upgrade2button.addEventListener("click", () => {
    increment += upgrade2.increment;
    counter -= upgrade2.cost;
    upgrade2.amount += 1;
    upgrade2.cost = Number((upgrade2.cost * 1.15).toFixed(2));
});

upgrade3button.addEventListener("click", () => {
    increment += upgrade3.increment;
    counter -= upgrade3.cost;
    upgrade3.amount += 1;
    upgrade3.cost = Number((upgrade3.cost * 1.15).toFixed(2));
});

// Update
setInterval(updateGame)
function updateGame() {
    if (counter < upgrade1.cost) {
        upgrade1button.disabled = true;
    } else {
        upgrade1button.disabled = false;
    }
    if (counter < upgrade2.cost) {
        upgrade2button.disabled = true;
    } else {
        upgrade2button.disabled = false;
    }
    if (counter < upgrade3.cost) {
        upgrade3button.disabled = true;
    } else {
        upgrade3button.disabled = false;
    }
    upgrade1button.innerHTML = `${upgrade1.name} (🎵 ${upgrade1.increment}/s) (Cost: ${upgrade1.cost}) Total: ${upgrade1.amount}`
    upgrade2button.innerHTML = `${upgrade2.name} (🎵 ${upgrade2.increment}/s) (Cost: ${upgrade2.cost}) Total: ${upgrade2.amount}`
    upgrade3button.innerHTML = `${upgrade3.name} (🎵 ${upgrade3.increment}/s) (Cost: ${upgrade3.cost}) Total: ${upgrade3.amount}`
}