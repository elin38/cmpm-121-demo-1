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
// setInterval(increaseCounter, 1000, 1);

function increaseCounter(amount: number) {
    counter += amount;
    displayCounter.innerHTML = `${counter.toFixed(2)} notes`;
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
upgrade.innerHTML = "Purchase 🎵";
app.append(upgrade);
upgrade.addEventListener("click", () => {
    increment += 1;
    counter -= 10;
});
setInterval(checkUpgrade)
function checkUpgrade() {
    if (counter < 10) {
        upgrade.disabled = true;
    } else {
        upgrade.disabled = false;
    }
}