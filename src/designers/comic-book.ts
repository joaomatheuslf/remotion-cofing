import {DesignerDefinition} from "./types";

export const comicBookDesigner: DesignerDefinition = {
  id: "comic-book",
  name: "Comic Book",
  description: "Quadrinhos pop, amarelo/vermelho/azul, bordas grossas e impacto alto.",
  tokens: {
    colors: {
      bg: "#ffe45c",
      panel: "#fff8d6",
      cream: "#fff8d6",
      yellow: "#ffe45c",
      cyan: "#4cc9f0",
      green: "#80ed99",
      pink: "#ff70a6",
      red: "#ef233c",
      ink: "#111111",
      white: "#ffffff",
      text: "#111111",
      muted: "#5c5343"
    },
    shape: {radius: 4, borderWidth: 5, tagRadius: 4},
    shadow: {x: 10, y: 10, blur: 0, color: "#111111"},
    typography: {
      title: "Arial Black, Impact, Arial, sans-serif",
      body: "Arial, Helvetica, sans-serif",
      titleWeight: 900,
      bodyWeight: 800
    },
    backgrounds: {
      scene: "radial-gradient(circle, rgba(17,17,17,.14) 1px, transparent 1.5px), #ffe45c",
      title: "linear-gradient(135deg,#ef233c 0%,#ff70a6 45%,#4cc9f0 100%)",
      panel: "#fff8d6"
    }
  },
  motion: {enter: "pop", emphasis: "bounce", error: "shake", speed: 1.18},
  variants: {panel: "chunky", tag: "badge", title: "arcade", scene: "paper-pop"}
};
