import {DesignerDefinition} from "./types";

export const editorialPopDesigner: DesignerDefinition = {
  id: "editorial-pop",
  name: "Editorial Pop",
  description: "Infográfico editorial vibrante, papel quente e contraste alto.",
  tokens: {
    colors: {
      bg: "#f2e7ce",
      panel: "#fffaf0",
      cream: "#fffaf0",
      yellow: "#ffd21f",
      cyan: "#1fc7d9",
      green: "#7ddc78",
      pink: "#ff5fa8",
      red: "#ef4e55",
      ink: "#171717",
      white: "#ffffff",
      text: "#171717",
      muted: "#6d665c"
    },
    shape: {radius: 28, borderWidth: 4, tagRadius: 8},
    shadow: {x: 10, y: 10, blur: 0, color: "#171717"},
    typography: {
      title: "Arial Black, Arial, sans-serif",
      body: "Arial, Helvetica, sans-serif",
      titleWeight: 900,
      bodyWeight: 700
    },
    backgrounds: {
      scene: "radial-gradient(circle at 12% 15%, rgba(255,95,168,.16), transparent 25%), radial-gradient(circle at 88% 82%, rgba(31,199,217,.16), transparent 28%), #f2e7ce",
      title: "linear-gradient(135deg,#ffd21f 0%,#ff8fbf 48%,#62d6e2 100%)",
      panel: "#fffaf0"
    }
  },
  motion: {enter: "slide", emphasis: "scale", error: "wobble", speed: .9},
  variants: {panel: "paper", tag: "label", title: "editorial", scene: "paper-pop"}
};
