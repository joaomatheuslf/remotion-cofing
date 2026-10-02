import {DesignerDefinition} from "./types";

export const bauhausDesigner: DesignerDefinition = {
  id: "bauhaus",
  name: "Bauhaus",
  description: "Geometria modernista, blocos primários, composição forte e minimalista.",
  tokens: {
    colors: {
      bg: "#f4efe3",
      panel: "#fffdf5",
      cream: "#fffdf5",
      yellow: "#f2c94c",
      cyan: "#2f80ed",
      green: "#5aa469",
      pink: "#d66aa5",
      red: "#d63a2f",
      ink: "#151515",
      white: "#ffffff",
      text: "#151515",
      muted: "#6b665d"
    },
    shape: {radius: 0, borderWidth: 3, tagRadius: 0},
    shadow: {x: 7, y: 7, blur: 0, color: "#151515"},
    typography: {
      title: "Arial Black, Arial, sans-serif",
      body: "Arial, Helvetica, sans-serif",
      titleWeight: 900,
      bodyWeight: 600
    },
    backgrounds: {
      scene: "linear-gradient(90deg, rgba(214,58,47,.08) 0 12%, transparent 12% 100%), linear-gradient(#f4efe3,#f4efe3)",
      title: "linear-gradient(120deg,#d63a2f 0 34%,#f2c94c 34% 67%,#2f80ed 67% 100%)",
      panel: "#fffdf5"
    }
  },
  motion: {enter: "slide", emphasis: "scale", error: "shake", speed: 1},
  variants: {panel: "chunky", tag: "label", title: "editorial", scene: "paper-pop"}
};
