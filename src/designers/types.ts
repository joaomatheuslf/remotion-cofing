export type DesignerId =
  | "pixel-night"
  | "editorial-pop"
  | "clean-tech"
  | "retro-science"
  | "blueprint"
  | "terminal-os"
  | "cyberpunk-neon"
  | "paper-cut"
  | "chalkboard"
  | "comic-book"
  | "glass-lab"
  | "corporate-gov"
  | "bauhaus";

export type DesignerMotionPreset = {
  enter: "pop" | "slide" | "fade";
  emphasis: "bounce" | "scale" | "pulse";
  error: "shake" | "wobble" | "flash";
  speed: number;
};

export type DesignerVariants = {
  panel: "chunky" | "paper" | "clean";
  tag: "badge" | "label" | "pill";
  title: "arcade" | "editorial" | "minimal";
  scene: "night-grid" | "paper-pop" | "clean-tech";
};

export type DesignerTokens = {
  colors: {
    bg: string;
    panel: string;
    cream: string;
    yellow: string;
    cyan: string;
    green: string;
    pink: string;
    red: string;
    ink: string;
    white: string;
    text: string;
    muted: string;
  };
  shape: {
    radius: number;
    borderWidth: number;
    tagRadius: number;
  };
  shadow: {
    x: number;
    y: number;
    blur: number;
    color: string;
  };
  typography: {
    title: string;
    body: string;
    titleWeight: number;
    bodyWeight: number;
  };
  backgrounds: {
    scene: string;
    title: string;
    panel: string;
  };
};

export type DesignerDefinition = {
  id: DesignerId;
  name: string;
  description: string;
  tokens: DesignerTokens;
  motion: DesignerMotionPreset;
  variants: DesignerVariants;
};
