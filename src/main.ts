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

interface Upgrade {
    name: string;
    cost: number;
    amount: number;
    increment: number;
}

const upgradeList: Upgrade[] = [
    {name: "🥁", cost: 10, amount: 0, increment: 0.1},
    {name: "🎺", cost: 100, amount: 0, increment: 2},
    {name: "🎻", cost: 1000, amount: 0, increment: 50}
];

// Make main button and counter
const button = document.createElement("button");
button.innerHTML = "🎼";
button.classList.add("note-button");
app.append(button);

const displayCounter = document.createElement("div");
displayCounter.innerHTML = `${counter} notes`;
app.append(displayCounter);

button.addEventListener("click", () => {
    counter += 1;
    displayCounter.innerHTML = `${counter} notes`;

    // Written with the help of chatGPT
    const note = document.createElement("span");
    note.innerHTML = "🎵";
    note.classList.add("note-emoji");
    app.append(note);

    const buttonRect = button.getBoundingClientRect();
    note.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
    note.style.top = `${buttonRect.top + buttonRect.height / 2}px`;

    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 200;

    note.style.transform = `translate(${randomX}px, ${randomY}px)`;
    setTimeout(() => {
        note.remove();
    }, 1000);
});

const displayIncrement = document.createElement("div");
displayIncrement.innerHTML = `${increment} notes/s`;
app.append(displayIncrement);

// Make upgrade buttons
const upgradeBox = document.createElement("div");
upgradeBox.classList.add("upgrade-box");

upgradeList.forEach((upgrade) => {
    const upgradeButton = document.createElement("button");
    upgradeButton.innerHTML = `${upgrade.name} (🎶 ${upgrade.increment}/s) (Cost: ${upgrade.cost})`;
    upgradeBox.append(upgradeButton);

    upgradeButton.addEventListener("click", () => {
        if (counter >= upgrade.cost) {
            increment += upgrade.increment;
            counter -= upgrade.cost;
            upgrade.amount += 1;
            upgrade.cost = Number((upgrade.cost * 1.15).toFixed(2));

            updateGame();
        }
    });
});

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

// Update (written with the help of chatGPT)
setInterval(updateGame)
function updateGame() {
    upgradeList.forEach((upgrade, index) => {
        const upgradeButton = upgradeBox.children[index] as HTMLButtonElement;
        if (counter < upgrade.cost) {
            upgradeButton.disabled = true;
        } else {
            upgradeButton.disabled = false;
        }
        upgradeButton.innerHTML = `${upgrade.name} (🎶 ${upgrade.increment}/s) (Cost: ${upgrade.cost}) Total: ${upgrade.amount}`;
    });
}