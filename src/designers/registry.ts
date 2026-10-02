import {cleanTechDesigner} from "./clean-tech";
import {editorialPopDesigner} from "./editorial-pop";
import {pixelNightDesigner} from "./pixel-night";
import {DesignerDefinition, DesignerId} from "./types";

export const designers: Record<DesignerId, DesignerDefinition> = {
  "pixel-night": pixelNightDesigner,
  "editorial-pop": editorialPopDesigner,
  "clean-tech": cleanTechDesigner
};

export const defaultDesignerId: DesignerId = "pixel-night";

export const getDesigner = (
  id?: DesignerId | string | null
): DesignerDefinition => {
  if (!id) return designers[defaultDesignerId];
  return designers[id as DesignerId] ?? designers[defaultDesignerId];
};

export const listDesigners = () => Object.values(designers);
