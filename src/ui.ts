import { mainCanvas } from "./canvasManipulation.js";

const toggle = document.getElementById("toggle") as HTMLButtonElement;
const info = document.getElementById("info") as HTMLDivElement;
const p = document.getElementsByTagName("p") as HTMLCollectionOf<HTMLParagraphElement>;
const labels = document.getElementsByTagName("label") as HTMLCollectionOf<HTMLLabelElement>;
const html = document.getElementsByTagName("html")[0] as HTMLHtmlElement;
const body = document.getElementsByTagName("body")[0] as HTMLBodyElement;
const audio = document.getElementsByTagName("audio")[0] as HTMLAudioElement;
let dark = false;

const toggleTone = (): void => {
	toggle.innerHTML = dark ? "☀️" : "🌙";
	let tone = dark ? "dark" : "light";
	dark = !dark;
	toggle.className = `border ${tone}`;
	mainCanvas.className = `border ${tone} `;
	info.className = `border ${tone} `;
	html.className = tone;
	body.className = tone;
	audio.className = tone;
	for (let i of p) i.className = tone;
	for (let i of labels) i.className = tone;
}

toggle.onclick = toggleTone;