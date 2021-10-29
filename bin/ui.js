import { mainCanvas } from "./canvasManipulation.js";
const toggle = document.getElementById("toggle");
const info = document.getElementById("info");
const p = document.getElementsByTagName("p");
const labels = document.getElementsByTagName("label");
const html = document.getElementsByTagName("html")[0];
const body = document.getElementsByTagName("body")[0];
const audio = document.getElementsByTagName("audio")[0];
let dark = false;
toggle.onclick = () => {
    toggle.innerHTML = dark ? "☀️" : "🌙";
    let tone = dark ? "dark" : "light";
    dark = !dark;
    toggle.className = `border ${tone}`;
    mainCanvas.className = `border ${tone} `;
    html.className = tone;
    body.className = tone;
    info.className = tone;
    audio.className = tone;
    for (let i of p)
        i.className = tone;
    for (let i of labels)
        i.className = tone;
};
