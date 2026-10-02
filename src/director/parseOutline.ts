import {LessonBlueprint, TeachingIntent, VisualStyle} from "./types";

const intents: TeachingIntent[] = [
  "open","explain","decompose","compare","sequence","timeline",
  "transform","simulate","map","debug","check","practice","recap",
];

const styles: VisualStyle[] = ["default","pixel-game"];

const isIntent = (value:string): value is TeachingIntent =>
  intents.includes(value as TeachingIntent);

const isVisualStyle = (value:string): value is VisualStyle =>
  styles.includes(value as VisualStyle);

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
  dialogue?:string;
  characterState?:"idle"|"thinking"|"happy"|"warning";
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

  const flush = () => {
    if(current){
      drafts.push(current);
      current = null;
    }
  };

  for(const raw of lines){
    const line = raw.trim();
    if(!line) continue;

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
      /^(subtitle|kicker|cta|duration|style|dialogue|character):\s*(.+)$/i
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
      } else if(key === "character"){
        if(["idle","thinking","happy","warning"].includes(value)){
          current.characterState = value as DraftSegment["characterState"];
        }
      } else if(key === "dialogue"){
        current.dialogue = value;
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
        dialogue:draft.dialogue,
        characterState:draft.characterState,
      };
    }),
  };
};
