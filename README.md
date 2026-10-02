# Prompt Forge Engine

Motor de aulas animadas em **Remotion + React + TypeScript**.

O repositório não é uma apresentação fixa. Ele é uma engine reutilizável: o conteúdo da aula é descrito como dados e o motor escolhe o template visual, executa as animações e renderiza o vídeo.

## Canvas padrão

- **1080×864 (5:4)**
- **30 fps**
- pensado para encaixar em vídeos verticais 1080×1920 sem reconstruir cada animação

## Arquitetura atual

```
Lesson Blueprint
      ↓
Director
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

Agora existem duas camadas independentes:

1. **Engine visual** — sabe desenhar e animar cenas.
2. **Director** — recebe a intenção pedagógica e decide qual tipo de cena usar.

## Rodar

```bash
npm install
npm run start
```

No Remotion Studio existem quatro composições:

- `PromptForgeSlide` — exemplo básico;
- `EngineShowcase` — showcase dos templates;
- `DirectorDemo` — uma aula montada automaticamente pelo Director.\n- `OutlineDemo` — uma aula criada a partir de um roteiro textual simples.

## Render

```bash
npm run render
npm run render:showcase
npm run render:director\nnpm run render:outline
```

## Templates implementados

- `title` — abertura / capítulo
- `explain` — explicação com ideia central + pontos
- `prompt-anatomy` — anatomia colorida de um prompt
- `bad-vs-good` — prompt ruim vs bom
- `process` — fluxo em etapas
- `comparison` — A vs B
- `timeline` — linha do tempo
- `before-after` — transformação
- `simulation` — métricas e barras animadas
- `diagram` — conceito central + nós
- `error` — debugging / erros
- `quiz` — pergunta e alternativas
- `challenge` — missão prática
- `summary` — fechamento / takeaways

## Director

O Director trabalha com **intenções pedagógicas**, não com nomes de componentes.

Exemplo:

```ts
{
  id: "fluxo",
  intent: "sequence",
  title: "Como um prompt funciona",
  content: [
    "Você descreve o pedido",
    "O modelo recebe o contexto",
    "A instrução é processada",
    "A resposta é construída"
  ]
}
```

A intenção `sequence` é convertida automaticamente para uma cena `process`.

Intenções disponíveis:

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

Para prompts, `decompose` possui uma regra especial: se o conteúdo tratar de papel, contexto, formato etc., o Director seleciona `prompt-anatomy`.

## Blueprint completo

Veja:

```
src/director/promptLessonBlueprint.ts
```

e um exemplo independente em JSON:

```
docs/lesson-blueprint.example.json
```

O blueprint é compilado assim:

```ts
import {compileLesson} from "./director/compileLesson";

const lesson = compileLesson(blueprint);
```

## Roteiro textual rápido\n\nAlém de Blueprint em TypeScript/JSON, o motor agora possui `parseOutline()`. Ele converte um roteiro marcado como `## [intent] Título` em Blueprint.\n\nDocumentação e prompt para o LLM:\n\n```\ndocs/SCRIPT_FORMAT.md\ndocs/DIRECTOR_PROMPT.md\n```\n\nIsso permite o fluxo:\n\n```\ntranscrição\n  -> LLM Director\n  -> outline/JSON\n  -> parser + compiler\n  -> engine visual\n```\n\n## Validação

A engine já possui schema Zod:

```ts
import {parseLesson} from "./engine/schema";

const lesson = parseLesson(input);
```

Isso permite receber uma aula produzida por IA e rejeitar estruturas inválidas antes do render.

## Estrutura

```
src/
  director/
    types.ts
    selectTemplate.ts
    compileLesson.ts
    promptLessonBlueprint.ts
    directorDemo.ts\n    parseOutline.ts\n    outlineDemo.ts

  engine/
    types.ts
    schema.ts
    theme.ts
    motion.ts
    SceneRenderer.tsx
    demoLesson.ts

  templates/
    PromptAnatomy.tsx
    BadVsGood.tsx
    GenericTemplates.tsx

  components/
    ui.tsx

  LessonComposition.tsx
  root.tsx

docs/
  lesson-blueprint.example.json\n  DIRECTOR_PROMPT.md\n  SCRIPT_FORMAT.md
```

## Objetivo do projeto

A meta não é pedir a uma IA para escrever uma animação React inteira a cada aula.

A meta é chegar a:

```
transcrição / roteiro
        ↓
IA cria blueprint
        ↓
Director decide linguagem visual
        ↓
Engine executa
        ↓
vídeo animado
```

Assim, o conteúdo muda constantemente, mas a identidade visual e o comportamento das animações permanecem consistentes.

## Próximas camadas

- parser de roteiro/transcrição para Blueprint;
- timeline dirigida por `actions`;
- sprites e personagens reutilizáveis;
- biblioteca de assets;
- legenda sincronizada;
- áudio/narração;
- render em lote;
- sistema de temas;
- seleção de metáforas visuais;
- integração com um LLM para planejamento das cenas.
