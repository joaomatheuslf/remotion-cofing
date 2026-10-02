import {assetCatalog} from "./catalog";
import type {AssetRequest,ResolvedAsset} from "./types";

export const resolveAsset = (request:AssetRequest):ResolvedAsset => {
  const exact=assetCatalog[request.key];
  if(exact) return exact;
  if(request.key.startsWith("presenter.joao")){
    return {
      key:request.key,
      source:"generated",
      uri:"generate://joao",
      metadata:{state:request.state ?? "presenting",designerId:request.designerId,preserveIdentity:true},
    };
  }
  return {key:request.key,source:"fallback",uri:"placeholder://asset",metadata:{request}};
};
