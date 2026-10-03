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
template / metáfora
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

A engine possui cinco camadas:

1. **Director** — decide intenção pedagógica e representação visual.
2. **Engine visual** — renderiza layouts e movimentos reutilizáveis.
3. **Pixel Game Layer** — cria cenas gamificadas com personagem, robô e HUD.
4. **Metaphor Library** — explica fluxo, capacidade, fila, montagem e escala com movimento.
5. **Designer System** — troca identidade visual sem reescrever conteúdo ou templates.

## Rodar

```bash
npm install
npm run start
```

## Composições no Remotion Studio

- `PromptForgeSlide` — exemplo inicial
- `EngineShowcase` — showcase dos templates
- `DirectorDemo` — aula clean-tech compilada a partir de Blueprint
- `OutlineDemo` — aula criada a partir de outline textual
- `PixelGameDemo` — fluxo de exemplos com elementos Pixel Night separados
- `MetaphorDemo` — showcase das metáforas animadas
- `DesignerPixelNight` — grafo Pixel Night com animação por elemento
- `DesignerEditorialPop` — mesma aula em Editorial Pop
- `DesignerCleanTech` — mesma aula em Clean Tech
- `DesignerGallery` — galeria animada de todos os designers

## Render

```bash
npm run render
npm run render:showcase
npm run render:director
npm run render:outline
npm run render:pixel
npm run render:metaphors
npm run render:designer:pixel
npm run render:designer:editorial
npm run render:designer:clean
npm run render:designers
```

Os exemplos genéricos abaixo requerem um designer explícito como `clean-tech`.
Para Pixel Night, use o grafo documentado no guia de produção.

## Templates principais

```
title
explain
prompt-anatomy
bad-vs-good
process
comparison
timeline
before-after
simulation
game-simulation
diagram
error
quiz
challenge
summary
```

## Metáforas visuais

```
token-flow       prompt → tokens → modelo → saída
prompt-builder   peças entram e montam uma estrutura
context-window   itens ocupam uma capacidade limitada
queue            itens aguardam e são processados um a um
counter-grid     uma quantidade cresce e ganha escala visual
```

Documentação detalhada:

```
docs/METAPHORS.md
```

### Exemplo: fluxo de tokens

```ts
{
  intent: "sequence",
  metaphor: "token-flow",
  title: "Como o prompt atravessa o modelo",
  input: "Explique redes neurais",
  tokens: ["Explique", "redes", "neurais"],
  output: "Resposta gerada"
}
```

### Exemplo: janela de contexto

```ts
{
  intent: "simulate",
  metaphor: "context-window",
  title: "A janela de contexto tem limite",
  capacity: 8,
  content: [
    "system",
    "histórico",
    "arquivo",
    "mensagem"
  ]
}
```


## Designers

Os designers gerais compartilham os templates. Pixel Night tem um contrato próprio
de elementos separados; ele exige reautoria do plano visual, não só troca de cores.
Exemplo para os designers gerais:

~~~ts
{
  id: "prompt-basico",
  title: "Fundamentos de Prompt",
  designerId: "editorial-pop",
  scenes: [...]
}
~~~

Designers atuais:

- `pixel-night`
- `editorial-pop`
- `clean-tech`
- `retro-science`
- `blueprint`
- `terminal-os`
- `cyberpunk-neon`
- `paper-cut`
- `chalkboard`
- `comic-book`
- `glass-lab`
- `corporate-gov`
- `bauhaus`

O sistema usa um `DesignerProvider` + CSS variables para que componentes antigos também herdem boa parte da identidade automaticamente.

Arquivos:

~~~
src/designers/
  types.ts
  registry.ts
  DesignerProvider.tsx
  pixel-night.ts
  editorial-pop.ts
  clean-tech.ts
~~~

Guia para criar novos designers:

~~~
docs/DESIGNERS.md
~~~

## Pixel game

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

## Roteiro textual rápido

```md
## [sequence] Como o prompt vira resposta
metaphor: token-flow
input: Explique redes neurais para iniciantes.
tokens: Explique | redes | neurais | iniciantes
output: Uma explicação adaptada ao pedido.

## [simulate] Janela de contexto
metaphor: context-window
capacity: 8
- system
- histórico
- arquivo A
- arquivo B
- mensagem atual

## [simulate] Escala
metaphor: counter-grid
value: 200750
unit: vezes
- repetições acumuladas
```

O parser está em:

```
src/director/parseOutline.ts
```

## Director para LLM

O contrato recomendado para transformar uma transcrição em Blueprint está em:

```
docs/DIRECTOR_PROMPT.md
```

Formato textual:

```
docs/SCRIPT_FORMAT.md
```

## Validação

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

  engine/
    types.ts
    schema.ts
    theme.ts
    motion.ts
    SceneRenderer.tsx
    pixelDemo.ts
    metaphorDemo.ts
    designerDemo.ts

  templates/
    GenericTemplates.tsx
    PromptAnatomy.tsx
    BadVsGood.tsx
    GameSimulation.tsx
    MetaphorScenes.tsx

  designers/
    types.ts
    registry.ts
    DesignerProvider.tsx
    pixel-night.ts
    editorial-pop.ts
    clean-tech.ts
    retro-science.ts
    blueprint.ts
    terminal-os.ts
    cyberpunk-neon.ts
    paper-cut.ts
    chalkboard.ts
    comic-book.ts
    glass-lab.ts
    corporate-gov.ts
    bauhaus.ts

  components/
    ui.tsx
    PixelCharacter.tsx
    GameHud.tsx
    MetaphorKit.tsx

docs/
  DIRECTOR_PROMPT.md
  SCRIPT_FORMAT.md
  METAPHORS.md
  DESIGNERS.md
```

## Estado atual

Já existe:

- engine de cenas;
- Director por intenção pedagógica;
- seleção de template;
- seleção explícita e heurística de metáforas;
- compilador Blueprint → Lesson;
- parser de outline textual;
- schema Zod;
- camada pixel game;
- biblioteca de 5 metáforas animadas;
- Designer Registry com 13 identidades visuais;
- DesignerProvider baseado em tokens e CSS variables;
- demos da mesma aula em três designers;
- demos separadas no Remotion Studio;
- CI com TypeScript.

## Próximas camadas

- timeline realmente dirigida por `actions`;
- sprites externos e biblioteca de assets;
- legendas sincronizadas;
- áudio/narração;
- integração direta com LLM;
- render em lote.


## Apresentador padrão

Quando uma cena tiver humano principal, o padrão é **João Matheus**. O Director deve preservar óculos, cabelo curto escuro, barba grisalha e reconhecibilidade facial, adaptando apenas o tratamento ao designer.

Contrato no projeto:

```
src/presenter/profile.ts
src/presenter/designerPolicy.ts
references/presenter-profile.json
docs/PRESENTER_REFERENCE.md
```

As fotos originais e referências visuais ficam empacotadas no plugin privado **Aulas Animadas do João**, para que o plugin use a mesma identidade visual do projeto.


## Arquitetura 0.6

Foram adicionadas as melhorias selecionadas 1, 2, 4, 5, 6, 7, 8, 9, 11 e 12:

- Design System Packs em `src/design-system/`;
- Character Engine do João em `src/characters/`;
- timeline por ações em `src/timeline/`;
- sincronização de narração em `src/narration/`;
- registry com 30 metáforas em `src/metaphors/`;
- variantes de templates em `src/templates/variants.ts`;
- transições específicas por designer em `src/transitions/`;
- Asset Resolver em `src/assets/`;
- storyboard automático em `src/storyboard/`;
- Designer SDK em `scripts/create-designer.mjs`.

### Storyboard

No Studio:

```
StoryboardDemo
```

Render:

```bash
npm run render:storyboard
```

### Criar designer

```bash
npm run designer:new -- retro-future
```

Detalhes em:

```
docs/ROADMAP_SELECTED_1_2_4_5_6_7_8_9_11_12.md
```

Observação: o registry possui 30 metáforas semânticas; neste momento, 5 já têm renderer completo. As demais estão registradas para implementação incremental, sem fingir que já renderizam.

## Pixel Night obrigatório: elementos separados e animação interna

Pixel Night é o designer padrão. Ele exige `data.pixelScene` em todas as cenas:
texto nativo, sprites transparentes, nós, conexões, ordem de camadas, pivôs e um
movimento que explique a ideia. O motor falha se só receber bullets genéricos,
flags de screenshots, um slide inteiro ou animações de entrada.

O Director recebe `segment.pixel` e compila para o mesmo grafo. Todos os tipos de
cena Pixel Night seguem para `PixelScene`, sem fallback para `GenericTemplates`.
Outros designers precisam ser escolhidos explicitamente.

A aula de referência `public/lessons/pixel-night/lesson.json` tem 18 cenas montadas
com elementos independentes. João possui corpo e braço articulados; redes neurais
possuem fios, nós e sinais que percorrem suas conexões; difusão remove ruído sobre
uma imagem separada. Os textos explicativos são nativos, sem recortes horizontais.

```bash
npm run check
npm run test:pixel
npm run pixel:validate
npm run pixel:preview
npm run pixel:html
npm run render:pixel:lesson
```

No Studio: `Pixel18LayeredIA`, `PixelNightStoryboardA` e `PixelNightStoryboardB`.
O HTML é gerado em `entrega-native/Aula_IA_Pixel_Night_Interativa.html`, com play,
pausa, navegação e timeline. Ele usa o mesmo grafo e movimento do Remotion.
A prévia de arquivos do iPhone não executa o player; use um navegador real.

O motor não inventa assets: o agente precisa produzir/resolver cada objeto e dirigir
seu movimento. Guia obrigatório: [PIXEL_NIGHT_PRODUCTION.md](docs/PIXEL_NIGHT_PRODUCTION.md).
Instruções para agentes: [AGENTS.md](AGENTS.md).
