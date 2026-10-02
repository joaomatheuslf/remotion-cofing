# Prompt Forge Engine

Motor de aulas animadas em **Remotion + React + TypeScript**.

A proposta é criar aulas como **dados + direção visual**, e não escrever uma nova animação do zero para cada roteiro.

## Canvas

- **1080×864 (5:4)**
- **30 fps**
- pensado para encaixar dentro de vídeo 1080×1920

## Arquitetura

```
transcrição / roteiro
        ↓
     Director
        ↓
 Lesson Blueprint
        ↓
 seleção de template
        ↓
  Lesson / Scene
        ↓
  SceneRenderer
        ↓
 templates + motion
        ↓
     Remotion
        ↓
       MP4
```

A engine agora possui três camadas:

1. **Director** — decide a intenção pedagógica e o tipo de visual.
2. **Engine visual** — renderiza layouts e movimentos reutilizáveis.
3. **Pixel Game Layer** — permite cenas gamificadas como nas referências.

## Rodar

```bash
npm install
npm run start
```

## Composições no Remotion Studio

- `PromptForgeSlide` — exemplo inicial
- `EngineShowcase` — showcase dos templates
- `DirectorDemo` — aula compilada a partir de Blueprint
- `OutlineDemo` — aula criada a partir de outline textual
- `PixelGameDemo` — explainer gamificado em pixel art

## Render

```bash
npm run render
npm run render:showcase
npm run render:director
npm run render:outline
npm run render:pixel
```

## Templates

- `title`
- `explain`
- `prompt-anatomy`
- `bad-vs-good`
- `process`
- `comparison`
- `timeline`
- `before-after`
- `simulation`
- `game-simulation`
- `diagram`
- `error`
- `quiz`
- `challenge`
- `summary`

## Intenções do Director

```
open       -> title
explain    -> explain
decompose  -> diagram / prompt-anatomy
compare    -> comparison
sequence   -> process
timeline   -> timeline
transform  -> before-after
simulate   -> simulation
map        -> diagram
debug      -> error
check      -> quiz
practice   -> challenge
recap      -> summary
```

### Pixel game

Uma cena `simulate` pode pedir explicitamente:

```ts
{
  intent: "simulate",
  visualStyle: "pixel-game",
  title: "Qualidade do prompt",
  dialogue: "Quanto mais claro o comando, menos a IA precisa adivinhar.",
  characterState: "thinking",
  metrics: [
    {label:"Clareza", value:92},
    {label:"Contexto", value:81},
    {label:"Formato", value:88}
  ]
}
```

O Director converte isso para `game-simulation`.

## Roteiro textual rápido

Também existe um formato simples:

```md
## [open] Prompt Forge
subtitle: Do pedido vago a uma instrução clara.

## [explain] O que é um prompt?
- É a instrução dada à IA.
- Define o objetivo.
- Dá contexto.

## [simulate] Qualidade do prompt
style: pixel-game
dialogue: Veja como a clareza muda o resultado.
character: thinking
- Clareza
- Contexto
- Formato

## [practice] Sua vez
cta: FORJAR PROMPT
- Reescreva um pedido vago.
- Defina o objetivo.
- Adicione contexto.
```

O parser está em:

```
src/director/parseOutline.ts
```

## Prompt para um LLM Director

O contrato recomendado para transformar transcrição em Blueprint está em:

```
docs/DIRECTOR_PROMPT.md
```

E o formato textual está em:

```
docs/SCRIPT_FORMAT.md
```

## Validação

Aula gerada por IA pode ser validada antes do render:

```ts
import {parseLesson} from "./engine/schema";

const lesson = parseLesson(input);
```

## Estrutura principal

```
src/
  director/
    types.ts
    selectTemplate.ts
    compileLesson.ts
    parseOutline.ts
    promptLessonBlueprint.ts
    directorDemo.ts
    outlineDemo.ts

  engine/
    types.ts
    schema.ts
    theme.ts
    motion.ts
    SceneRenderer.tsx
    demoLesson.ts
    pixelDemo.ts

  templates/
    GenericTemplates.tsx
    PromptAnatomy.tsx
    BadVsGood.tsx
    GameSimulation.tsx

  components/
    ui.tsx
    PixelCharacter.tsx
    GameHud.tsx

docs/
  DIRECTOR_PROMPT.md
  SCRIPT_FORMAT.md
  lesson-blueprint.example.json
```

## Estado atual

Já existe:

- engine de cenas;
- 15 tipos de template;
- Director por intenção pedagógica;
- compilador Blueprint → Lesson;
- parser de outline textual;
- schema Zod;
- personagem e robô pixel art;
- HUD gamificado;
- demo completa de pixel explainer;
- CI com TypeScript.

## Próximos passos

- timeline dirigida por `actions`;
- sprites externos e biblioteca de assets;
- legendas sincronizadas;
- áudio/narração;
- sistema de temas;
- escolha automática de metáfora visual;
- integração direta com LLM;
- render em lote.
