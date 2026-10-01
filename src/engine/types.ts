export type AnimationName =
  | "pop"
  | "slide-up"
  | "slide-left"
  | "fade"
  | "shake"
  | "pulse"
  | "typewriter"
  | "progress"
  | "highlight";

export type SceneKind =
  | "title"
  | "explain"
  | "prompt-anatomy"
  | "bad-vs-good"
  | "process"
  | "comparison"
  | "error"
  | "challenge";

export type SceneAction = {
  at: number; // segundos
  target: string;
  animation: AnimationName;
  duration?: number;
};

export type Scene = {
  id: string;
  kind: SceneKind;
  title: string;
  duration: number;
  data?: Record<string, unknown>;
  actions?: SceneAction[];
};

export type Lesson = {
  id: string;
  title: string;
  theme?: "prompt-forge";
  scenes: Scene[];
};
