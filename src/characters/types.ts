import type {DesignerId} from "../designers/types";

export type CharacterState =
  | "idle" | "talking" | "thinking" | "pointing-left" | "pointing-right"
  | "confused" | "happy" | "warning" | "typing" | "presenting";

export type CharacterPose = {state:CharacterState;description:string};

export type CharacterProfile = {
  id:string; name:string; isDefaultPresenter:boolean;
  identityAnchors:string[]; referenceAssets:string[];
  poses:CharacterPose[];
  designerTreatments:Partial<Record<DesignerId,string>>;
};
