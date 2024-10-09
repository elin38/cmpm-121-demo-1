import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Ethan's Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "🎼";
app.append(button);

let counter: number = 0;

const displayCounter = document.createElement("div");
displayCounter.innerHTML = `${counter} notes`;
app.append(displayCounter);

button.addEventListener("click", () => {
    counter += 1;
    displayCounter.innerHTML = `${counter} notes`;
});
