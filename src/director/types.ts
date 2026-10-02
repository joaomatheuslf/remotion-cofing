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

  content?: string[];

  subtitle?: string;
  kicker?: string;
  left?: ComparisonColumn;
  right?: ComparisonColumn;
  center?: string;
  metrics?: MetricSpec[];
  quiz?: QuizSpec;
  cta?: string;

  // Opcional para cenas gamificadas.
  dialogue?: string;
  characterState?: "idle" | "thinking" | "happy" | "warning";
};

export type LessonBlueprint = {
  id: string;
  title: string;
  segments: BlueprintSegment[];
};
