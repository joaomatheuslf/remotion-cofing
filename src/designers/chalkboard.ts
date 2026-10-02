import {DesignerDefinition} from "./types";

export const chalkboardDesigner: DesignerDefinition = {
  id: "chalkboard",
  name: "Chalkboard",
  description: "Quadro verde, giz claro e estética de aula desenhada à mão.",
  tokens: {
    colors: {
      bg: "#173f35",
      panel: "#234f43",
      cream: "#fff7df",
      yellow: "#f7df79",
      cyan: "#8fd3ff",
      green: "#b9ef9f",
      pink: "#f4a6c8",
      red: "#ff8a80",
      ink: "#183127",
      white: "#fffdf5",
      text: "#fffdf5",
      muted: "#b7d0c5"
    },
    shape: {radius: 8, borderWidth: 2, tagRadius: 6},
    shadow: {x: 3, y: 4, blur: 0, color: "rgba(0,0,0,.22)"},
    typography: {
      title: "Georgia, Times New Roman, serif",
      body: "Trebuchet MS, Arial, sans-serif",
      titleWeight: 800,
      bodyWeight: 600
    },
    backgrounds: {
      scene: "repeating-linear-gradient(0deg, rgba(255,255,255,.018) 0 1px, transparent 1px 5px), #173f35",
      title: "linear-gradient(135deg,#173f35 0%,#24594b 100%)",
      panel: "#fff7df"
    }
  },
  motion: {enter: "fade", emphasis: "scale", error: "wobble", speed: .78},
  variants: {panel: "paper", tag: "label", title: "editorial", scene: "night-grid"}
};
