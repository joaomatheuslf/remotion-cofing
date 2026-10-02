import {z} from "zod";

export const DesignerIdSchema = z.enum([
  "pixel-night",
  "editorial-pop",
  "clean-tech",
  "retro-science",
  "blueprint",
  "terminal-os",
  "cyberpunk-neon",
  "paper-cut",
  "chalkboard",
  "comic-book",
  "glass-lab",
  "corporate-gov",
  "bauhaus",
]);

export const SceneKindSchema = z.enum([
  "title",
  "explain",
  "prompt-anatomy",
  "bad-vs-good",
  "process",
  "comparison",
  "timeline",
  "before-after",
  "simulation",
  "game-simulation",
  "token-flow",
  "prompt-builder",
  "context-window",
  "queue",
  "counter-grid",
  "diagram",
  "error",
  "quiz",
  "challenge",
  "summary",
]);

export const SceneSchema = z.object({
  id: z.string().min(1),
  kind: SceneKindSchema,
  title: z.string().min(1),
  duration: z.number().positive().max(120),
  data: z.record(z.string(), z.unknown()).optional(),
  actions: z.array(z.object({
    at: z.number().nonnegative(),
    target: z.string().min(1),
    animation: z.enum([
      "pop","slide-up","slide-left","fade","shake",
      "pulse","typewriter","progress","highlight",
    ]),
    duration: z.number().positive().optional(),
  })).optional(),
});

export const LessonSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  designerId: DesignerIdSchema.optional(),
  theme: z.literal("prompt-forge").optional(),
  scenes: z.array(SceneSchema).min(1),
});

export const parseLesson = (input:unknown) => LessonSchema.parse(input);
