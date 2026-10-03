import {DesignerId} from "../designers/types";
import type {TimelineAction} from "../timeline/types";

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
  | "timeline"
  | "before-after"
  | "simulation"
  | "game-simulation"
  | "token-flow"
  | "prompt-builder"
  | "context-window"
  | "queue"
  | "counter-grid"
  | "diagram"
  | "error"
  | "quiz"
  | "challenge"
  | "summary";

export type SceneAction = TimelineAction;

export type Scene = {
  id: string;
  kind: SceneKind;
  title: string;
  duration: number;
  data?: Record<string, unknown>;
  actions?: SceneAction[];
};

export type Lesson = {
  mode?:"production"|"demo";
  id: string;
  title: string;
  designerId?: DesignerId;
  theme?: "prompt-forge";
  scenes: Scene[];
};
