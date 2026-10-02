import {designers} from "../designers/registry";
import type {DesignerId} from "../designers/types";
import type {DesignSystemPack, DesignSystemRegistry} from "./types";

const transitionFor = (id:DesignerId) => {
  if (id === "pixel-night") return "pixel-wipe";
  if (id === "editorial-pop") return "paper-swipe";
  if (id === "terminal-os") return "terminal-clear";
  if (id === "comic-book") return "panel-snap";
  if (id === "blueprint") return "draw-lines";
  if (id === "paper-cut") return "paper-cover";
  if (id === "cyberpunk-neon") return "neon-glitch";
  if (id === "glass-lab") return "glass-blur";
  if (id === "chalkboard") return "chalk-erase";
  if (id === "retro-science") return "film-dissolve";
  if (id === "bauhaus") return "shape-wipe";
  return "clean-fade";
};

export const designSystems:DesignSystemRegistry = Object.fromEntries(
  Object.entries(designers).map(([id,designer])=>[
    id,
    {id,designer,transitions:{default:transitionFor(id as DesignerId)},characterStyle:id} satisfies DesignSystemPack,
  ])
) as DesignSystemRegistry;

export const getDesignSystem = (id:DesignerId):DesignSystemPack => designSystems[id];
