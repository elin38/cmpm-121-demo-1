import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Epic Ensemble";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// intitialize
let increment: number = 0;
let counter: number = 0;
const EMOJI_PARTICLE_RANGE = 200;
const UPGRADE_COST_MULTIPLIER = 1.15;
const EMOJI_REMOVE_DELAY = 1000;
const UPDATE_INTERVAL = 100;

interface Upgrade {
    name: string;
    cost: number;
    amount: number;
    increment: number;
    description: string;
}

const upgradeList: Upgrade[] = [
    {name: "🥁", cost: 10, amount: 0, increment: 0.1, description: "Ba Dum Tss<br>-A slow but steady beat"},
    {name: "🎺", cost: 100, amount: 0, increment: 2, description: "Ya like jazz?<br>-The sound of brass fills the air"},
    {name: "🎻", cost: 1000, amount: 0, increment: 50, description: "If you can play it slowly you can play it quickly<br>-Playing an elegant supporting melody"},
    {name: "🎹", cost: 10000, amount: 0, increment: 2500, description: "Did you know the Piano is both a stringed and a percussion instrument<br>-The melody is the heart and soul of music"}, 
    {name: "🎙️", cost: 100000, amount: 0, increment: 33333, description: "I am singing in the Rain<br>-Powerful lyrics that make you want to sing along"} 
];

// Make main button and counter
const button = document.createElement("button");
button.innerHTML = "🎼";
button.classList.add("note-button");
app.append(button);

const displayCounter = document.createElement("div");
displayCounter.innerHTML = `${counter} notes`;
displayCounter.classList.add("display-counter");
app.append(displayCounter);

button.addEventListener("click", () => {
    counter += 1;
    displayCounter.innerHTML = `${counter} notes`;

    //floating emoji written with chatGPT
    const note = document.createElement("span");
    note.innerHTML = "🎵";
    note.classList.add("note-emoji");
    app.append(note);

    const buttonRect = button.getBoundingClientRect();
    note.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
    note.style.top = `${buttonRect.top + buttonRect.height / 2}px`;

    const randomX = (Math.random() - 0.5) * EMOJI_PARTICLE_RANGE;
    const randomY = (Math.random() - 0.5) * EMOJI_PARTICLE_RANGE;

    note.style.transform = `translate(${randomX}px, ${randomY}px)`;
    setTimeout(() => {
        note.remove();
    }, EMOJI_REMOVE_DELAY);
});

const displayIncrement = document.createElement("div");
displayIncrement.innerHTML = `${increment} notes/s`;
displayIncrement.classList.add("display-increment");
app.append(displayIncrement);

// Make upgrade buttons
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

    // hoverBox written with the help of chatGPT
    const hoverBox = document.createElement("div");
    hoverBox.classList.add("hover-box");
    hoverBox.innerHTML = `${upgrade.description}`;
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

function increaseCounter(amount: number) {
    counter += amount;
    displayCounter.innerHTML = `${counter.toFixed(2)} Notes`;
    displayIncrement.innerHTML = `${increment.toFixed(1)} 🎵/s`;
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

// Update (written with the help of chatGPT)
setInterval(updateGame, UPDATE_INTERVAL);
function updateGame() {
    upgradeList.forEach((upgrade, index) => {
        const upgradeButton = upgradeBox.children[index] as HTMLButtonElement;
        const upgradeCount = upgradeCountBox.children[index] as HTMLDivElement;
        updateUpgradeDisplay(upgrade, upgradeButton, upgradeCount);
    });
}

function showHoverBox(hoverBox: HTMLDivElement, event: MouseEvent) {
    hoverBox.style.display = "block";
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    hoverBox.style.left = `${rect.right + 10}px`;
    hoverBox.style.top = `${rect.top}px`;
}

function hideHoverBox(hoverBox: HTMLDivElement) {
    hoverBox.style.display = "none";
}

function updateUpgradeDisplay(upgrade: Upgrade, button: HTMLButtonElement, countDiv: HTMLDivElement) {
    button.disabled = counter < upgrade.cost;
    button.innerHTML = `${upgrade.name} (🎶 ${upgrade.increment}/s) ${upgrade.cost}🎵`;
    countDiv.innerHTML = `${upgrade.name}: ${upgrade.amount}`;
}