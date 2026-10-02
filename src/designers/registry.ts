import {bauhausDesigner} from "./bauhaus";
import {blueprintDesigner} from "./blueprint";
import {chalkboardDesigner} from "./chalkboard";
import {cleanTechDesigner} from "./clean-tech";
import {comicBookDesigner} from "./comic-book";
import {corporateGovDesigner} from "./corporate-gov";
import {cyberpunkNeonDesigner} from "./cyberpunk-neon";
import {editorialPopDesigner} from "./editorial-pop";
import {glassLabDesigner} from "./glass-lab";
import {paperCutDesigner} from "./paper-cut";
import {pixelNightDesigner} from "./pixel-night";
import {retroScienceDesigner} from "./retro-science";
import {terminalOsDesigner} from "./terminal-os";
import {DesignerDefinition, DesignerId} from "./types";

export const designers: Record<DesignerId, DesignerDefinition> = {
  "pixel-night": pixelNightDesigner,
  "editorial-pop": editorialPopDesigner,
  "clean-tech": cleanTechDesigner,
  "retro-science": retroScienceDesigner,
  "blueprint": blueprintDesigner,
  "terminal-os": terminalOsDesigner,
  "cyberpunk-neon": cyberpunkNeonDesigner,
  "paper-cut": paperCutDesigner,
  "chalkboard": chalkboardDesigner,
  "comic-book": comicBookDesigner,
  "glass-lab": glassLabDesigner,
  "corporate-gov": corporateGovDesigner,
  "bauhaus": bauhausDesigner
};

export const defaultDesignerId: DesignerId = "pixel-night";

export const getDesigner = (
  id?: DesignerId | string | null
): DesignerDefinition => {
  if (!id) return designers[defaultDesignerId];
  return designers[id as DesignerId] ?? designers[defaultDesignerId];
};

export const listDesigners = () => Object.values(designers);
