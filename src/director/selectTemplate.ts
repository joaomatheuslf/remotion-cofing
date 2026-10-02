import {SceneKind} from "../engine/types";
import {BlueprintSegment, VisualMetaphor} from "./types";

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

const metaphorMap: Record<VisualMetaphor, SceneKind> = {
  "token-flow": "token-flow",
  "prompt-builder": "prompt-builder",
  "context-window": "context-window",
  "queue": "queue",
  "counter-grid": "counter-grid",
};

const includesAny = (value:string, terms:string[]) =>
  terms.some((term) => value.toLowerCase().includes(term));

export const selectTemplate = (segment:BlueprintSegment): SceneKind => {
  const searchable = [
    segment.title,
    segment.subtitle ?? "",
    ...(segment.content ?? []),
  ].join(" ").toLowerCase();

  // 1. O Director pode pedir uma metáfora explicitamente.
  if (segment.metaphor) {
    return metaphorMap[segment.metaphor];
  }

  // 2. Visual gamificado.
  if (segment.intent === "simulate" && segment.visualStyle === "pixel-game") {
    return "game-simulation";
  }

  // 3. Templates semânticos especializados.
  if (
    segment.intent === "decompose" &&
    includesAny(searchable, ["prompt", "papel", "contexto", "formato"])
  ) {
    return "prompt-anatomy";
  }

  // 4. Heurísticas simples para metáforas que ajudam a explicar movimento.
  if (
    segment.intent === "sequence" &&
    includesAny(searchable, ["token", "tokens", "modelo", "prompt"]) &&
    includesAny(searchable, ["resposta", "saída", "output", "processa"])
  ) {
    return "token-flow";
  }

  if (
    segment.intent === "simulate" &&
    includesAny(searchable, ["janela de contexto", "context window", "capacidade", "limite de tokens"])
  ) {
    return "context-window";
  }

  if (
    segment.intent === "sequence" &&
    includesAny(searchable, ["fila", "queue", "aguarda", "um por vez"])
  ) {
    return "queue";
  }

  if (
    segment.intent === "simulate" &&
    includesAny(searchable, ["repetição", "repetições", "contador", "acumulado", "quantidade"])
  ) {
    return "counter-grid";
  }

  return explicitMap[segment.intent];
};
