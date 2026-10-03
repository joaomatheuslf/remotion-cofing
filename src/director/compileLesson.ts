import {parsePixelScene,validatePixelLesson} from "../pixel/schema.mjs";
import {Lesson, Scene} from "../engine/types";
import {theme} from "../engine/theme";
import {BlueprintSegment, LessonBlueprint} from "./types";
import {selectTemplate} from "./selectTemplate";
import {selectTemplateVariant} from "../templates/variants";

const palette = [
  theme.colors.yellow,
  theme.colors.green,
  theme.colors.cyan,
  theme.colors.pink,
];

const defaultDuration = (kind:Scene["kind"]) => {
  switch(kind){
    case "title": return 4;
    case "quiz": return 6;
    case "simulation":
    case "game-simulation":
      return 6;
    case "token-flow":
    case "prompt-builder":
    case "context-window":
    case "queue":
    case "counter-grid":
      return 7;
    default: return 5;
  }
};

const asSteps = (items:string[]) =>
  items.map((label, i) => ({
    label: label.length > 30 ? `Etapa ${i+1}` : label,
    detail: label.length > 30 ? label : undefined,
  }));

const splitBeforeAfter = (items:string[]) => ({
  before: {
    title: "ANTES",
    body: items[0] ?? "Estado inicial",
  },
  after: {
    title: "DEPOIS",
    body: items[1] ?? "Estado final",
  },
});

const makeMetrics = (segment:BlueprintSegment) => {
  const content = segment.content ?? [];
  return segment.metrics ?? content.map((label, i) => ({
    label,
    value: Math.min(100, 55 + i * 12),
    color: palette[i % palette.length],
  }));
};

const tokenFlowData = (segment:BlueprintSegment) => {
  const content = segment.content ?? [];
  const inferredInput = segment.input ?? content[0] ?? "Entrada";
  const inferredOutput =
    segment.output ??
    (content.length > 1 ? content[content.length - 1] : "Saída");
  const inferredTokens =
    segment.tokens ??
    content.slice(1, Math.max(1, content.length - 1));

  return {
    input: inferredInput,
    tokens: inferredTokens.length > 0 ? inferredTokens : ["token 1","token 2","token 3"],
    output: inferredOutput,
    modelLabel: segment.center ?? "MODELO IA",
  };
};

const dataFor = (segment:BlueprintSegment, kind:Scene["kind"]) => {
  const content = segment.content ?? [];

  switch(kind){
    case "title":
      return {
        subtitle: segment.subtitle ?? content[0],
        kicker: segment.kicker ?? "AULA ANIMADA",
      };

    case "explain":
      return {
        lead: content[0] ?? segment.subtitle ?? "",
        bullets: content.slice(1),
      };

    case "prompt-anatomy":
      return {
        parts: content.map((text, i) => ({
          text,
          label: ["Papel","Objetivo","Contexto","Formato"][i] ?? `Parte ${i+1}`,
          color: palette[i % palette.length],
        })),
      };

    case "comparison":
      return {
        left: segment.left ?? {
          label: "A",
          items: content.filter((_, i) => i % 2 === 0),
        },
        right: segment.right ?? {
          label: "B",
          items: content.filter((_, i) => i % 2 === 1),
        },
      };

    case "process":
      return {steps: asSteps(content)};

    case "timeline":
      return {
        items: content.map((title, i) => ({
          label: String(i+1).padStart(2,"0"),
          title,
        })),
      };

    case "before-after":
      return splitBeforeAfter(content);

    case "simulation":
      return {
        status: "SIMULAÇÃO",
        metrics: makeMetrics(segment),
      };

    case "game-simulation":
      return {
        dialogue:
          segment.dialogue ??
          segment.subtitle ??
          "Observe como o estado muda enquanto a explicação avança.",
        characterState: segment.characterState ?? "thinking",
        metrics: makeMetrics(segment),
      };

    case "token-flow":
      return tokenFlowData(segment);

    case "prompt-builder":
      return {
        parts: content,
        result: segment.output ?? "ESTRUTURA COMPLETA",
      };

    case "context-window":
      return {
        items: content,
        capacity: segment.capacity ?? 8,
        label: segment.center ?? "JANELA DE CONTEXTO",
      };

    case "queue":
      return {
        items: content,
        processor: segment.processor ?? segment.center ?? "PROCESSADOR",
        outputLabel: segment.output ?? "CONCLUÍDO",
      };

    case "counter-grid":
      return {
        value: segment.value ?? 100,
        label: content[0] ?? segment.title,
        unit: segment.unit ?? "",
        cells: 60,
      };

    case "diagram":
      return {
        center: segment.center ?? segment.title,
        nodes: content.slice(0,4).map((label, i) => ({
          label,
          color: i % 2 === 0 ? theme.colors.cream : "#f5fbff",
        })),
      };

    case "error":
      return {
        message: segment.subtitle ?? "Identifique o problema antes de continuar.",
        errors: content,
      };

    case "quiz":
      return {
        question: segment.quiz?.question ?? segment.title,
        options: segment.quiz?.options ?? content,
        answer: segment.quiz?.answer,
      };

    case "challenge":
      return {
        mission: content[0] ?? segment.subtitle ?? segment.title,
        tasks: content.slice(1),
        cta: segment.cta ?? "COMEÇAR MISSÃO",
      };

    case "summary":
      return {items: content};

    case "bad-vs-good":
      return {
        bad: content[0] ?? "",
        good: content[1] ?? "",
      };
  }
};

export const compileSegment = (segment:BlueprintSegment): Scene => {
  const kind = selectTemplate(segment);

  const baseData=dataFor(segment, kind);
  const seed=[...segment.id].reduce((sum,ch)=>sum+ch.charCodeAt(0),0);
  return {
    id: segment.id,
    kind,
    title: segment.title,
    duration: segment.duration ?? defaultDuration(kind),
    data: {
      ...baseData,
      ...(segment.pixel?{pixelScene:parsePixelScene(segment.pixel)}:{}),
      variant: selectTemplateVariant(kind,seed),
    },
  };
};

export const compileLesson = (blueprint:LessonBlueprint): Lesson => {
 const lesson:Lesson={
  id: blueprint.id,
  title: blueprint.title,
  designerId: blueprint.designerId??"pixel-night",
  theme: "prompt-forge",
  scenes: blueprint.segments.map(compileSegment),
};
 validatePixelLesson(lesson);
 return lesson;
};
