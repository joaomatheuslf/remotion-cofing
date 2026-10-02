import {DesignerDefinition} from "./types";

export const cyberpunkNeonDesigner: DesignerDefinition = {
  id: "cyberpunk-neon",
  name: "Cyberpunk Neon",
  description: "Neon magenta/ciano sobre fundo violeta escuro, energético e futurista.",
  tokens: {
    colors: {
      bg: "#10091f",
      panel: "#1c1233",
      cream: "#f7edff",
      yellow: "#ffe45c",
      cyan: "#00f5ff",
      green: "#7cff6b",
      pink: "#ff3cac",
      red: "#ff4d6d",
      ink: "#160c25",
      white: "#ffffff",
      text: "#ffffff",
      muted: "#b9a7d1"
    },
    shape: {radius: 18, borderWidth: 3, tagRadius: 999},
    shadow: {x: 0, y: 0, blur: 24, color: "rgba(255,60,172,.38)"},
    typography: {
      title: "Arial Black, Arial, sans-serif",
      body: "Arial, Helvetica, sans-serif",
      titleWeight: 900,
      bodyWeight: 700
    },
    backgrounds: {
      scene: "radial-gradient(circle at 15% 20%, rgba(255,60,172,.22), transparent 28%), radial-gradient(circle at 85% 80%, rgba(0,245,255,.18), transparent 30%), #10091f",
      title: "linear-gradient(135deg,#130824 0%,#481063 52%,#0b7d8c 100%)",
      panel: "#f7edff"
    }
  },
  motion: {enter: "pop", emphasis: "pulse", error: "flash", speed: 1.22},
  variants: {panel: "chunky", tag: "pill", title: "arcade", scene: "night-grid"}
};
