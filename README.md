# Prompt Forge Engine

Motor de aulas animadas em **Remotion + React + TypeScript**.

O objetivo deste repositório não é armazenar uma apresentação pronta. Ele fornece uma engine reutilizável: você descreve a aula como dados e a engine escolhe templates, animações e composição.

## Canvas padrão
- 1080×864 (5:4)
- 30 fps
- pensado para encaixar dentro de vídeos 1080×1920

## Fluxo
```
roteiro -> Lesson JSON/TS -> SceneRenderer -> template -> animações -> MP4
```

## Rodar
```bash
npm install
npm run start
```

## Render
```bash
npm run render
```

## Criando uma aula
Veja `src/lesson.example.ts`.

Cada cena possui:
- `kind`: template visual
- `duration`: segundos
- `data`: conteúdo
- `actions`: reservado para timeline dirigida por dados

Templates iniciais:
- `prompt-anatomy`
- `bad-vs-good`

Arquitetura preparada para adicionar:
- process
- comparison
- error
- challenge
- title
- explain

## Filosofia
A engine separa **conteúdo**, **design** e **movimento**. Isso permite que uma IA gere apenas o schema da aula, sem precisar reescrever React a cada vídeo.
