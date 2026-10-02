import {DesignerDefinition} from "./types";

export const retroScienceDesigner: DesignerDefinition = {
  id: "retro-science",
  name: "Retro Science",
  description: "Pôster científico vintage, papel envelhecido, azul petróleo e vermelho técnico.",
  tokens: {
    colors: {
      bg: "#e9dfc5",
      panel: "#f7efd9",
      cream: "#f7efd9",
      yellow: "#e4b63c",
      cyan: "#2b7885",
      green: "#6e8f59",
      pink: "#c96d7b",
      red: "#b84f46",
      ink: "#263238",
      white: "#fffdf8",
      text: "#263238",
      muted: "#746d61"
    },
    shape: {radius: 10, borderWidth: 3, tagRadius: 5},
    shadow: {x: 5, y: 5, blur: 0, color: "#263238"},
    typography: {
      title: "Georgia, Times New Roman, serif",
      body: "Arial, Helvetica, sans-serif",
      titleWeight: 800,
      bodyWeight: 600
    },
    backgrounds: {
      scene: "repeating-linear-gradient(0deg, rgba(38,50,56,.035) 0 1px, transparent 1px 5px), #e9dfc5",
      title: "linear-gradient(135deg,#264653 0%,#2a6f78 60%,#b84f46 100%)",
      panel: "#f7efd9"
    }
  },
  motion: {enter: "fade", emphasis: "scale", error: "shake", speed: .82},
  variants: {panel: "paper", tag: "label", title: "editorial", scene: "paper-pop"}
};
