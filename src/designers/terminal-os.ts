import {DesignerDefinition} from "./types";

export const terminalOsDesigner: DesignerDefinition = {
  id: "terminal-os",
  name: "Terminal OS",
  description: "Console preto e verde, estética hacker/CLI sem perder legibilidade didática.",
  tokens: {
    colors: {
      bg: "#050807",
      panel: "#0b120f",
      cream: "#dfffe9",
      yellow: "#d8ff5f",
      cyan: "#6af7ff",
      green: "#59ff9a",
      pink: "#ff75d8",
      red: "#ff5f6d",
      ink: "#06100b",
      white: "#ecfff2",
      text: "#a7ffbf",
      muted: "#5f8d6c"
    },
    shape: {radius: 4, borderWidth: 2, tagRadius: 3},
    shadow: {x: 0, y: 0, blur: 18, color: "rgba(89,255,154,.18)"},
    typography: {
      title: "Courier New, monospace",
      body: "Courier New, monospace",
      titleWeight: 800,
      bodyWeight: 600
    },
    backgrounds: {
      scene: "repeating-linear-gradient(0deg, rgba(89,255,154,.035) 0 1px, transparent 1px 4px), #050807",
      title: "linear-gradient(135deg,#020403 0%,#07150d 60%,#0d2a18 100%)",
      panel: "#dfffe9"
    }
  },
  motion: {enter: "fade", emphasis: "pulse", error: "flash", speed: 1.15},
  variants: {panel: "clean", tag: "label", title: "arcade", scene: "night-grid"}
};
