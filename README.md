# Prompt Forge Engine

Motor de aulas animadas em **Remotion + React + TypeScript**.

O repositório não é uma apresentação fixa. Ele é uma engine reutilizável: o conteúdo da aula é descrito como dados e o motor escolhe o template visual, executa as animações e renderiza o vídeo.

## Canvas padrão

- **1080×864 (5:4)**
- **30 fps**
- pensado para encaixar em vídeos verticais 1080×1920 sem reconstruir cada animação

## Fluxo

```
roteiro
  -> Lesson / Scene
  -> SceneRenderer
  -> template
  -> componentes + movimento
  -> Remotion
  -> MP4
```

## Rodar

```bash
npm install
npm run start
```

No Remotion Studio existem duas composições:

- `PromptForgeSlide`: exemplo simples
- `EngineShowcase`: demonstração dos templates genéricos

## Render

```bash
npm run render
npm run render:showcase
```

## Templates implementados

- `title` — abertura / capítulo
- `explain` — explicação com ideia central + pontos
- `prompt-anatomy` — partes coloridas de um prompt
- `bad-vs-good` — comparação didática específica
- `process` — fluxo em etapas
- `comparison` — A vs B
- `timeline` — linha do tempo
- `before-after` — transformação
- `simulation` — métricas e barras animadas
- `diagram` — conceito central + nós
- `error` — erros / debugging
- `quiz` — questão com alternativas
- `challenge` — missão prática
- `summary` — fechamento / takeaways

## Exemplo de cena

```ts
{
  id: "processo",
  kind: "process",
  title: "Como um prompt funciona",
  duration: 6,
  data: {
    steps: [
      {label: "Pedido", detail: "você descreve a tarefa"},
      {label: "Contexto", detail: "o modelo recebe informações"},
      {label: "Processamento", detail: "a IA organiza a resposta"},
      {label: "Saída", detail: "o resultado é apresentado"}
    ]
  }
}
```

## Arquivos principais

```
src/
  engine/
    types.ts
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
  lesson.example.ts
  root.tsx
```

## Filosofia

A engine separa:

1. **conteúdo** — o que ensinar;
2. **design** — como a informação é organizada;
3. **movimento** — como a atenção é conduzida;
4. **timing** — quando cada elemento aparece.

Assim, uma IA pode gerar apenas o schema da aula, sem reescrever React a cada vídeo.

## Próximas camadas naturais

- validação do schema com Zod;
- carregamento de aulas por JSON;
- sprites/personagens;
- biblioteca de ícones;
- áudio e legendas;
- timeline dirigida por `actions`;
- seleção automática de template;
- assets gerados por IA;
- render em lote.
