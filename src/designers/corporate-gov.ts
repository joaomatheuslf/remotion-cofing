import {DesignerDefinition} from "./types";

export const corporateGovDesigner: DesignerDefinition = {
  id: "corporate-gov",
  name: "Corporate Gov",
  description: "Institucional sóbrio com azul-marinho, branco e dourado discreto.",
  tokens: {
    colors: {
      bg: "#f3f6f9",
      panel: "#ffffff",
      cream: "#ffffff",
      yellow: "#c7a14a",
      cyan: "#3d7ea6",
      green: "#4f8a6d",
      pink: "#8f6cab",
      red: "#b34d4d",
      ink: "#17324d",
      white: "#ffffff",
      text: "#17324d",
      muted: "#687b8f"
    },
    shape: {radius: 10, borderWidth: 1, tagRadius: 4},
    shadow: {x: 0, y: 8, blur: 20, color: "rgba(23,50,77,.12)"},
    typography: {
      title: "Arial, Helvetica, sans-serif",
      body: "Arial, Helvetica, sans-serif",
      titleWeight: 800,
      bodyWeight: 600
    },
    backgrounds: {
      scene: "linear-gradient(180deg,#f8fafc 0%,#edf2f6 100%)",
      title: "linear-gradient(135deg,#10283f 0%,#1e4b6d 68%,#c7a14a 160%)",
      panel: "#ffffff"
    }
  },
  motion: {enter: "fade", emphasis: "scale", error: "flash", speed: .92},
  variants: {panel: "clean", tag: "label", title: "minimal", scene: "clean-tech"}
};
