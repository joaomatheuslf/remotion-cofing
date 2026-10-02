import {DesignerDefinition} from "./types";

export const paperCutDesigner: DesignerDefinition = {
  id: "paper-cut",
  name: "Paper Cut",
  description: "Papéis recortados, pastel, sombras macias e linguagem artesanal.",
  tokens: {
    colors: {
      bg: "#f5efe7",
      panel: "#fffaf3",
      cream: "#fffaf3",
      yellow: "#f6c85f",
      cyan: "#74c9c7",
      green: "#8ccf8a",
      pink: "#ee9bb5",
      red: "#df6d69",
      ink: "#463f3a",
      white: "#ffffff",
      text: "#463f3a",
      muted: "#867a70"
    },
    shape: {radius: 30, borderWidth: 2, tagRadius: 999},
    shadow: {x: 0, y: 12, blur: 26, color: "rgba(70,63,58,.16)"},
    typography: {
      title: "Trebuchet MS, Arial, sans-serif",
      body: "Trebuchet MS, Arial, sans-serif",
      titleWeight: 800,
      bodyWeight: 600
    },
    backgrounds: {
      scene: "radial-gradient(circle at 20% 10%, rgba(238,155,181,.20), transparent 22%), radial-gradient(circle at 85% 85%, rgba(116,201,199,.20), transparent 24%), #f5efe7",
      title: "linear-gradient(135deg,#f6c85f 0%,#ee9bb5 55%,#74c9c7 100%)",
      panel: "#fffaf3"
    }
  },
  motion: {enter: "slide", emphasis: "scale", error: "wobble", speed: .82},
  variants: {panel: "paper", tag: "pill", title: "editorial", scene: "paper-pop"}
};
