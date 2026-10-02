import {DesignerDefinition} from "./types";

export const blueprintDesigner: DesignerDefinition = {
  id: "blueprint",
  name: "Blueprint",
  description: "Prancha técnica azul, linhas de projeto e estética de engenharia.",
  tokens: {
    colors: {
      bg: "#0a3d62",
      panel: "#0f527d",
      cream: "#e9f5ff",
      yellow: "#ffd166",
      cyan: "#7fdbff",
      green: "#7bd389",
      pink: "#d7aefb",
      red: "#ff7b72",
      ink: "#062a43",
      white: "#f6fbff",
      text: "#f6fbff",
      muted: "#b8d7eb"
    },
    shape: {radius: 6, borderWidth: 2, tagRadius: 4},
    shadow: {x: 4, y: 4, blur: 0, color: "rgba(0,0,0,.28)"},
    typography: {
      title: "Arial, Helvetica, sans-serif",
      body: "Courier New, monospace",
      titleWeight: 800,
      bodyWeight: 600
    },
    backgrounds: {
      scene: "linear-gradient(rgba(127,219,255,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(127,219,255,.10) 1px, transparent 1px), #0a3d62",
      title: "linear-gradient(135deg,#07324f 0%,#0a4d78 70%,#0c6398 100%)",
      panel: "#e9f5ff"
    }
  },
  motion: {enter: "slide", emphasis: "pulse", error: "flash", speed: 1},
  variants: {panel: "clean", tag: "label", title: "minimal", scene: "clean-tech"}
};
