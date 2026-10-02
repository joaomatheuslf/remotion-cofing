import type {SceneKind} from "../engine/types";

export type TemplateVariantMap = Partial<Record<SceneKind,string[]>>;
export const templateVariants:TemplateVariantMap = {
  comparison:["split","cards","versus","table","battle"],
  process:["horizontal","vertical","pipeline","journey","circular"],
  timeline:["horizontal","vertical","milestones","cards"],
  diagram:["radial","network","stack","tree"],
  explain:["hero","two-column","cards","spotlight"],
  summary:["grid","checklist","takeaways"],
  challenge:["mission","boss-level","worksheet"],
};

export const getTemplateVariants = (kind:SceneKind) => templateVariants[kind] ?? ["default"];
export const selectTemplateVariant = (kind:SceneKind,seed=0) => {
  const variants=getTemplateVariants(kind);
  return variants[Math.abs(seed)%variants.length];
};
