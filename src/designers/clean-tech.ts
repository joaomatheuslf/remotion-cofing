import {DesignerDefinition} from "./types";

export const cleanTechDesigner: DesignerDefinition = {
  id: "clean-tech",
  name: "Clean Tech",
  description: "Visual institucional moderno, claro, preciso e discreto.",
  tokens: {
    colors: {
      bg: "#eef4f8",
      panel: "#ffffff",
      cream: "#ffffff",
      yellow: "#f3c64d",
      cyan: "#2f80ed",
      green: "#35a66f",
      pink: "#9c6ade",
      red: "#d64545",
      ink: "#183044",
      white: "#ffffff",
      text: "#183044",
      muted: "#6b7d8c"
    },
    shape: {radius: 16, borderWidth: 2, tagRadius: 999},
    shadow: {x: 0, y: 8, blur: 24, color: "rgba(24,48,68,.14)"},
    typography: {
      title: "Arial, Helvetica, sans-serif",
      body: "Arial, Helvetica, sans-serif",
      titleWeight: 800,
      bodyWeight: 600
    },
    backgrounds: {
      scene: "linear-gradient(180deg,#f7fbfe 0%,#eaf2f7 100%)",
      title: "linear-gradient(135deg,#173b57 0%,#245b80 58%,#2f80ed 100%)",
      panel: "#ffffff"
    }
  },
  motion: {enter: "fade", emphasis: "pulse", error: "flash", speed: 1.1},
  variants: {panel: "clean", tag: "pill", title: "minimal", scene: "clean-tech"}
};
