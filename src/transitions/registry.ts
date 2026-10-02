import type {DesignerId} from "../designers/types";

export type TransitionId =
  | "clean-fade" | "pixel-wipe" | "paper-swipe" | "terminal-clear"
  | "panel-snap" | "draw-lines" | "paper-cover" | "neon-glitch"
  | "glass-blur" | "chalk-erase" | "film-dissolve" | "shape-wipe";

export type TransitionPreset = {id:TransitionId;duration:number;description:string};

export const transitionPresets:Record<TransitionId,TransitionPreset> = {
  "clean-fade":{id:"clean-fade",duration:.35,description:"fade limpo"},
  "pixel-wipe":{id:"pixel-wipe",duration:.4,description:"wipe em blocos pixelados"},
  "paper-swipe":{id:"paper-swipe",duration:.45,description:"papel deslizando sobre a cena"},
  "terminal-clear":{id:"terminal-clear",duration:.3,description:"clear-screen de terminal"},
  "panel-snap":{id:"panel-snap",duration:.3,description:"painel de quadrinhos fecha e abre"},
  "draw-lines":{id:"draw-lines",duration:.45,description:"linhas técnicas redesenham a tela"},
  "paper-cover":{id:"paper-cover",duration:.5,description:"folha recortada cobre a cena"},
  "neon-glitch":{id:"neon-glitch",duration:.28,description:"glitch neon curto"},
  "glass-blur":{id:"glass-blur",duration:.4,description:"blur/transparência de vidro"},
  "chalk-erase":{id:"chalk-erase",duration:.5,description:"quadro é apagado"},
  "film-dissolve":{id:"film-dissolve",duration:.55,description:"dissolve de filme antigo"},
  "shape-wipe":{id:"shape-wipe",duration:.42,description:"formas geométricas fazem wipe"},
};

export const transitionByDesigner:Record<DesignerId,TransitionId> = {
  "pixel-night":"pixel-wipe",
  "editorial-pop":"paper-swipe",
  "clean-tech":"clean-fade",
  "retro-science":"film-dissolve",
  "blueprint":"draw-lines",
  "terminal-os":"terminal-clear",
  "cyberpunk-neon":"neon-glitch",
  "paper-cut":"paper-cover",
  "chalkboard":"chalk-erase",
  "comic-book":"panel-snap",
  "glass-lab":"glass-blur",
  "corporate-gov":"clean-fade",
  "bauhaus":"shape-wipe",
};
