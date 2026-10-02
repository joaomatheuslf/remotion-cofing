import {DesignerDefinition} from "./types";

export const glassLabDesigner: DesignerDefinition = {
  id: "glass-lab",
  name: "Glass Lab",
  description: "Laboratório digital em azul profundo, superfícies translúcidas e brilho suave.",
  tokens: {
    colors: {
      bg: "#071521",
      panel: "#102433",
      cream: "#eefbff",
      yellow: "#ffd166",
      cyan: "#64e9ff",
      green: "#72efb2",
      pink: "#cf8cff",
      red: "#ff6b7a",
      ink: "#102433",
      white: "#ffffff",
      text: "#effbff",
      muted: "#98b3c4"
    },
    shape: {radius: 24, borderWidth: 1, tagRadius: 999},
    shadow: {x: 0, y: 12, blur: 36, color: "rgba(0,0,0,.30)"},
    typography: {
      title: "Arial, Helvetica, sans-serif",
      body: "Arial, Helvetica, sans-serif",
      titleWeight: 800,
      bodyWeight: 500
    },
    backgrounds: {
      scene: "radial-gradient(circle at 80% 10%, rgba(100,233,255,.18), transparent 30%), radial-gradient(circle at 20% 90%, rgba(207,140,255,.14), transparent 28%), #071521",
      title: "linear-gradient(135deg,#071521 0%,#0f3042 58%,#29506a 100%)",
      panel: "linear-gradient(145deg, rgba(255,255,255,.96), rgba(231,248,255,.92))"
    }
  },
  motion: {enter: "fade", emphasis: "pulse", error: "flash", speed: 1.05},
  variants: {panel: "clean", tag: "pill", title: "minimal", scene: "clean-tech"}
};
