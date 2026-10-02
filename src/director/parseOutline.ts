import {
  LessonBlueprint,
  TeachingIntent,
  VisualMetaphor,
  VisualStyle,
} from "./types";
import {DesignerId} from "../designers/types";

const intents: TeachingIntent[] = [
  "open","explain","decompose","compare","sequence","timeline",
  "transform","simulate","map","debug","check","practice","recap",
];

const styles: VisualStyle[] = ["default","pixel-game"];

const metaphors: VisualMetaphor[] = [
  "token-flow",
  "prompt-builder",
  "context-window",
  "queue",
  "counter-grid",
];

const designerIds: DesignerId[] = [
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
];

const isIntent = (value:string): value is TeachingIntent =>
  intents.includes(value as TeachingIntent);

const isVisualStyle = (value:string): value is VisualStyle =>
  styles.includes(value as VisualStyle);

const isMetaphor = (value:string): value is VisualMetaphor =>
  metaphors.includes(value as VisualMetaphor);

const isDesignerId = (value:string): value is DesignerId =>
  designerIds.includes(value as DesignerId);

const slug = (value:string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48) || "scene";

type DraftSegment = {
  title:string;
  intent:TeachingIntent;
  content:string[];
  subtitle?:string;
  kicker?:string;
  cta?:string;
  duration?:number;
  visualStyle?:VisualStyle;
  metaphor?:VisualMetaphor;
  dialogue?:string;
  characterState?:"idle"|"thinking"|"happy"|"warning";
  input?:string;
  output?:string;
  tokens?:string[];
  value?:number;
  unit?:string;
  capacity?:number;
  processor?:string;
  center?:string;
};

const headingPattern = /^##\s*\[([a-z-]+)\]\s*(.+)$/i;

export const parseOutline = (
  source:string,
  lessonTitle="Aula animada",
  lessonId="generated-lesson"
): LessonBlueprint => {
  const lines = source.split(/\r?\n/);
  const drafts: DraftSegment[] = [];
  let current: DraftSegment | null = null;
  let designerId: DesignerId | undefined;

  const flush = () => {
    if(current){
      drafts.push(current);
      current = null;
    }
  };

  for(const raw of lines){
    const line = raw.trim();
    if(!line) continue;

    if (!current && line.toLowerCase().startsWith("designer:")) {
      const candidate=line.slice("designer:".length).trim();
      if(!isDesignerId(candidate)){
        throw new Error("Designer desconhecido: " + candidate);
      }
      designerId=candidate;
      continue;
    }

    const heading = line.match(headingPattern);
    if(heading){
      flush();
      const intentRaw = heading[1].toLowerCase();
      if(!isIntent(intentRaw)){
        throw new Error(`Intent desconhecido: ${intentRaw}`);
      }
      current = {
        intent:intentRaw,
        title:heading[2].trim(),
        content:[],
      };
      continue;
    }

    if(!current) continue;

    const metadata = line.match(
      /^(subtitle|kicker|cta|duration|style|metaphor|dialogue|character|input|output|tokens|value|unit|capacity|processor|center):\s*(.+)$/i
    );

    if(metadata){
      const key = metadata[1].toLowerCase();
      const value = metadata[2].trim();

      if(key === "duration"){
        const duration = Number(value);
        if(Number.isFinite(duration) && duration > 0) current.duration = duration;
      } else if(key === "style"){
        if(!isVisualStyle(value)){
          throw new Error(`Visual style desconhecido: ${value}`);
        }
        current.visualStyle = value;
      } else if(key === "metaphor"){
        if(!isMetaphor(value)){
          throw new Error(`Metáfora desconhecida: ${value}`);
        }
        current.metaphor = value;
      } else if(key === "character"){
        if(["idle","thinking","happy","warning"].includes(value)){
          current.characterState = value as DraftSegment["characterState"];
        }
      } else if(key === "tokens"){
        current.tokens = value
          .split("|")
          .map((token) => token.trim())
          .filter(Boolean);
      } else if(key === "value"){
        const numberValue=Number(value);
        if(Number.isFinite(numberValue)) current.value=numberValue;
      } else if(key === "capacity"){
        const capacity=Number(value);
        if(Number.isFinite(capacity) && capacity > 0) current.capacity=capacity;
      } else if(key === "dialogue"){
        current.dialogue = value;
      } else if(key === "input"){
        current.input = value;
      } else if(key === "output"){
        current.output = value;
      } else if(key === "unit"){
        current.unit = value;
      } else if(key === "processor"){
        current.processor = value;
      } else if(key === "center"){
        current.center = value;
      } else {
        (current as Record<string, unknown>)[key] = value;
      }
      continue;
    }

    if(line.startsWith("- ")){
      current.content.push(line.slice(2).trim());
      continue;
    }

    current.content.push(line);
  }

  flush();

  if(drafts.length === 0){
    throw new Error(
      "Nenhuma cena encontrada. Use cabeçalhos como: ## [explain] Título da cena"
    );
  }

  const used = new Map<string,number>();

  return {
    id: lessonId,
    title: lessonTitle,
    designerId,
    segments: drafts.map((draft) => {
      const base = slug(draft.title);
      const count = used.get(base) ?? 0;
      used.set(base,count+1);
      const id = count === 0 ? base : `${base}-${count+1}`;

      return {
        id,
        intent:draft.intent,
        title:draft.title,
        content:draft.content,
        subtitle:draft.subtitle,
        kicker:draft.kicker,
        cta:draft.cta,
        duration:draft.duration,
        visualStyle:draft.visualStyle,
        metaphor:draft.metaphor,
        dialogue:draft.dialogue,
        characterState:draft.characterState,
        input:draft.input,
        output:draft.output,
        tokens:draft.tokens,
        value:draft.value,
        unit:draft.unit,
        capacity:draft.capacity,
        processor:draft.processor,
        center:draft.center,
      };
    }),
  };
};
