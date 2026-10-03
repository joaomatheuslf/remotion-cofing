import type {PixelSceneSpec,AuthoredSceneSpec} from "../pixel/types";
import {DesignerId} from "../designers/types";

export type TeachingIntent =
  | "open"
  | "explain"
  | "decompose"
  | "compare"
  | "sequence"
  | "timeline"
  | "transform"
  | "simulate"
  | "map"
  | "debug"
  | "check"
  | "practice"
  | "recap";

export type VisualStyle = "default" | "pixel-game";

export type VisualMetaphor =
  | "token-flow"
  | "prompt-builder"
  | "context-window"
  | "queue"
  | "counter-grid";

export type ComparisonColumn = {
  label: string;
  items: string[];
};

export type QuizSpec = {
  question: string;
  options: string[];
  answer?: number;
};

export type MetricSpec = {
  label: string;
  value: number;
  color?: string;
  note?: string;
};

export type BlueprintSegment = {
  id: string;
  title: string;
  intent: TeachingIntent;
  duration?: number;
  visualStyle?: VisualStyle;
  pixel?: PixelSceneSpec;
  sceneGraph?:AuthoredSceneSpec;
  metaphor?: VisualMetaphor;
  content?: string[];
  subtitle?: string;
  kicker?: string;
  left?: ComparisonColumn;
  right?: ComparisonColumn;
  center?: string;
  metrics?: MetricSpec[];
  quiz?: QuizSpec;
  cta?: string;
  dialogue?: string;
  characterState?: "idle" | "thinking" | "happy" | "warning";
  input?: string;
  output?: string;
  tokens?: string[];
  value?: number;
  unit?: string;
  capacity?: number;
  processor?: string;
};

export type LessonBlueprint = {
  mode?:"production"|"demo";
  id: string;
  title: string;
  designerId?: DesignerId;
  segments: BlueprintSegment[];
};
