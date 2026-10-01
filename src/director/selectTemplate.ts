import {SceneKind} from "../engine/types";
import {BlueprintSegment} from "./types";

const explicitMap: Record<BlueprintSegment["intent"], SceneKind> = {
  open: "title",
  explain: "explain",
  decompose: "diagram",
  compare: "comparison",
  sequence: "process",
  timeline: "timeline",
  transform: "before-after",
  simulate: "simulation",
  map: "diagram",
  debug: "error",
  check: "quiz",
  practice: "challenge",
  recap: "summary",
};

const includesAny = (value:string, terms:string[]) =>
  terms.some((term) => value.toLowerCase().includes(term));

export const selectTemplate = (segment:BlueprintSegment): SceneKind => {
  // Casos especiais podem sobrescrever a intenção genérica.
  const searchable = [
    segment.title,
    ...(segment.content ?? []),
  ].join(" ").toLowerCase();

  if (
    segment.intent === "decompose" &&
    includesAny(searchable, ["prompt", "papel", "contexto", "formato"])
  ) {
    return "prompt-anatomy";
  }

  return explicitMap[segment.intent];
};
