import { mainCanvas } from "./canvasManipulation.js";
import { state, updateState } from "./state.js";

const toggle = document.getElementById("toggle") as HTMLButtonElement;
const info = document.getElementById("info") as HTMLDivElement;
const p = document.getElementsByTagName(
  "p"
) as HTMLCollectionOf<HTMLParagraphElement>;
const labels = document.getElementsByTagName(
  "label"
) as HTMLCollectionOf<HTMLLabelElement>;
const html = document.getElementsByTagName("html")[0] as HTMLHtmlElement;
const body = document.getElementsByTagName("body")[0] as HTMLBodyElement;
const audio = document.getElementsByTagName("audio")[0] as HTMLAudioElement;

toggle.onclick = (): void => {
  toggle.innerHTML = state.dark ? "☀️" : "🌙";
  const tone = state.dark ? "dark" : "light";
  updateState({
    dark: !state.dark,
  });
  toggle.className = `border ${tone}`;
  mainCanvas.className = `border ${tone}`;
  html.className = tone;
  body.className = tone;
  info.className = tone;
  audio.className = tone;
  for (let i of p) i.className = tone;
  for (let i of labels) i.className = tone;
};
