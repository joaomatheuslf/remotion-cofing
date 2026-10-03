import {z} from "zod";
import {validateProductionLesson} from "../pixel/schema.mjs";

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
  actions: z.array(z.discriminatedUnion("type", [
    z.object({type:z.literal("show"),target:z.string(),at:z.number().nonnegative()}),
    z.object({type:z.literal("hide"),target:z.string(),at:z.number().nonnegative()}),
    z.object({type:z.literal("animate"),target:z.string(),at:z.number().nonnegative(),duration:z.number().positive().optional(),animation:z.string()}),
    z.object({type:z.literal("character"),target:z.literal("presenter"),at:z.number().nonnegative(),state:z.string()}),
    z.object({type:z.literal("camera"),at:z.number().nonnegative(),duration:z.number().positive().optional(),action:z.enum(["zoom-in","zoom-out","pan-left","pan-right"])}),
    z.object({type:z.literal("cue"),at:z.number().nonnegative(),cue:z.string()}),
  ])).optional(),
});

export const LessonSchema = z.object({
  mode:z.enum(["production","demo"]).default("production"),
  id: z.string().min(1),
  title: z.string().min(1),
  designerId: DesignerIdSchema.default("pixel-night"),
  theme: z.literal("prompt-forge").optional(),
  scenes: z.array(SceneSchema).min(1),
}).superRefine((lesson,ctx)=>{
  try {validateProductionLesson(lesson);} catch(error){ctx.addIssue({code:"custom",message:error instanceof Error?error.message:String(error)});}
});

export const parseLesson = (input:unknown) => LessonSchema.parse(input);
