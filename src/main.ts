import "./style.css";

// Constants
const EMOJI_PARTICLE_RANGE = 200;
const UPGRADE_COST_MULTIPLIER = 1.15;
const EMOJI_REMOVE_DELAY = 1000;
const UPDATE_INTERVAL = 100;

// Interfaces
interface Upgrade {
    name: string;
    cost: number;
    amount: number;
    increment: number;
    description: string;
}

// Variables
let increment: number = 0;
let counter: number = 0;
let startTime = 0;

// Functions

// Displays a hover box on mouse enter
function showHoverBox(hoverBox: HTMLDivElement, event: MouseEvent) {
    hoverBox.style.display = "block";
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    hoverBox.style.left = `${rect.right + 10}px`;
    hoverBox.style.top = `${rect.top}px`;
}

// Hides the hover box on mouse leave
function hideHoverBox(hoverBox: HTMLDivElement) {
    hoverBox.style.display = "none";
}

// Updates the UI display of each upgrade's button and count
function updateUpgradeDisplay(upgrade: Upgrade, button: HTMLButtonElement, countDiv: HTMLDivElement) {
    button.disabled = counter < upgrade.cost;
    button.innerHTML = `${upgrade.name} (🎶 ${upgrade.increment}/s) ${upgrade.cost}🎵`;
    countDiv.innerHTML = `${upgrade.name}: ${upgrade.amount}`;
}

// Updates the counter and increment displays
function updateGame() {
    upgradeList.forEach((upgrade, index) => {
        const upgradeButton = upgradeBox.children[index] as HTMLButtonElement;
        const upgradeCount = upgradeCountBox.children[index] as HTMLDivElement;
        updateUpgradeDisplay(upgrade, upgradeButton, upgradeCount);
    });
}

// Increases the counter by a specified amount
function increaseCounter(amount: number) {
    counter += amount;
    displayCounter.innerHTML = `${counter.toFixed(2)} Notes`;
    displayIncrement.innerHTML = `${increment.toFixed(1)} 🎵/s`;
}

// Auto-increment functionality tied to animation frames
function autoClick(endTime: number) {
    if (startTime !== 0) {
        const elapsedTime = (endTime - startTime) / 1000;
        const amount = elapsedTime * increment;
        increaseCounter(amount);
    }
    startTime = endTime;
    requestAnimationFrame(autoClick);
}

// Main Setup
const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Epic Ensemble";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Display counter
const displayCounter = document.createElement("div");
displayCounter.classList.add("display-counter");
displayCounter.innerHTML = `${counter} notes`;
app.append(displayCounter);

// Display increment
const displayIncrement = document.createElement("div");
displayIncrement.classList.add("display-increment");
displayIncrement.innerHTML = `${increment} notes/s`;
app.append(displayIncrement);

// Main Button Setup
const button = document.createElement("button");
button.classList.add("note-button");
button.innerHTML = "🎼";
button.addEventListener("click", () => {
    counter += 1;
    displayCounter.innerHTML = `${counter} notes`;

    const note = document.createElement("span");
    note.classList.add("note-emoji");
    note.innerHTML = "🎵";
    app.append(note);

    const buttonRect = button.getBoundingClientRect();
    note.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
    note.style.top = `${buttonRect.top + buttonRect.height / 2}px`;

    const randomX = (Math.random() - 0.5) * EMOJI_PARTICLE_RANGE;
    const randomY = (Math.random() - 0.5) * EMOJI_PARTICLE_RANGE;

    note.style.transform = `translate(${randomX}px, ${randomY}px)`;
    setTimeout(() => note.remove(), EMOJI_REMOVE_DELAY);
});
app.append(button);

// Upgrade setup
const upgradeList: Upgrade[] = [
    {name: "🥁", cost: 10, amount: 0, increment: 0.1, description: "Ba Dum Tss<br>-A slow but steady beat"},
    {name: "🎺", cost: 100, amount: 0, increment: 2, description: "Ya like jazz?<br>-The sound of brass fills the air"},
    {name: "🎻", cost: 1000, amount: 0, increment: 50, description: "If you can play it slowly you can play it quickly<br>-Playing an elegant supporting melody"},
    {name: "🎹", cost: 10000, amount: 0, increment: 2500, description: "Did you know the Piano is both a stringed and a percussion instrument<br>-The melody is the heart and soul of music"},
    {name: "🎙️", cost: 100000, amount: 0, increment: 33333, description: "I am singing in the Rain<br>-Powerful lyrics that make you want to sing along"}
];

const upgradeBox = document.createElement("div");
upgradeBox.classList.add("upgrade-box");

const upgradeCountBox = document.createElement("div");
upgradeCountBox.classList.add("upgrade-count-box");

upgradeList.forEach((upgrade) => {
    const upgradeButton = document.createElement("button");
    upgradeButton.innerHTML = `${upgrade.name} (🎶 ${upgrade.increment}/s) (Cost: ${upgrade.cost})`;
    upgradeBox.append(upgradeButton);

    const upgradeCount = document.createElement("div");
    upgradeCount.innerHTML = `${upgrade.name}: ${upgrade.amount}`;
    upgradeCountBox.append(upgradeCount);

    const hoverBox = document.createElement("div");
    hoverBox.classList.add("hover-box");
    hoverBox.innerHTML = upgrade.description;
    hoverBox.style.display = "none";
    app.append(hoverBox);

    upgradeButton.addEventListener("mouseenter", (e) => showHoverBox(hoverBox, e));
    upgradeButton.addEventListener("mouseleave", () => hideHoverBox(hoverBox));

    upgradeButton.addEventListener("click", () => {
        if (counter >= upgrade.cost) {
            increment += upgrade.increment;
            counter -= upgrade.cost;
            upgrade.amount += 1;
            upgrade.cost = Number((upgrade.cost * UPGRADE_COST_MULTIPLIER).toFixed(2));
            updateGame();
        }
    });
});

app.append(upgradeBox);
app.append(upgradeCountBox);

// Start auto-click and game update interval
requestAnimationFrame(autoClick);
setInterval(updateGame, UPDATE_INTERVAL);