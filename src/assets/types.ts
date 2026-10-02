export type AssetKind = "character"|"icon"|"illustration"|"sprite"|"image"|"video"|"lottie"|"three";
export type AssetRequest = {key:string;kind?:AssetKind;designerId?:string;state?:string};
export type ResolvedAsset = {
  key:string;
  source:"local"|"plugin"|"generated"|"fallback";
  uri:string;
  metadata?:Record<string,unknown>;
};
