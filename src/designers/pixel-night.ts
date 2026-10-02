import {DesignerDefinition} from "./types";

export const pixelNightDesigner: DesignerDefinition = {
  id: "pixel-night",
  name: "Pixel Night",
  description: "Game explainer noturno, chunky, neon e gamificado.",
  tokens: {
    colors: {
      bg: "#081426",
      panel: "#0d1d33",
      cream: "#fff4da",
      yellow: "#ffc83d",
      cyan: "#35d8ff",
      green: "#55e68f",
      pink: "#ff68be",
      red: "#ff5e6c",
      ink: "#101419",
      white: "#ffffff",
      text: "#ffffff",
      muted: "#9fb3cc"
    },
    shape: {radius: 22, borderWidth: 4, tagRadius: 14},
    shadow: {x: 8, y: 8, blur: 0, color: "#101419"},
    typography: {
      title: "Arial Black, Arial, sans-serif",
      body: "Inter, Arial, sans-serif",
      titleWeight: 900,
      bodyWeight: 700
    },
    backgrounds: {
      scene: "radial-gradient(circle at 85% 10%, rgba(53,216,255,.12), transparent 34%), radial-gradient(circle at 10% 90%, rgba(255,104,190,.10), transparent 38%), #081426",
      title: "linear-gradient(145deg,#071224 0%,#10284a 60%,#1b2146 100%)",
      panel: "#fff4da"
    }
  },
  motion: {enter: "pop", emphasis: "bounce", error: "shake", speed: 1},
  variants: {panel: "chunky", tag: "badge", title: "arcade", scene: "night-grid"}
};
