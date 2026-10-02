import type {DesignerDefinition, DesignerId} from "../designers/types";
import type {SceneKind} from "../engine/types";

export type DesignerAssetMap = Record<string,string>;

export type DesignSystemPack = {
  id: DesignerId;
  designer: DesignerDefinition;
  assets?: DesignerAssetMap;
  sceneOverrides?: Partial<Record<SceneKind,string>>;
  transitions?: {default:string; emphasis?:string; chapter?:string};
  characterStyle?: string;
};

export type DesignSystemRegistry = Record<DesignerId,DesignSystemPack>;
