# Roadmap implementado — seleção 1, 2, 4, 5, 6, 7, 8, 9, 11 e 12

## 1. Design System Pack
Criado em src/design-system/. Designer passa a agrupar tokens, assets, overrides e transições.

## 2. Character Engine
Criado em src/characters/ com João como personagem padrão e 10 estados semânticos.

## 4. Timeline por ações
Criado em src/timeline/. Suporta show/hide, animação, câmera, personagem e cues.

## 5. Sincronização de narração
Criado em src/narration/. Cues temporais geram ações sincronizadas.

## 6. Metaphor Registry
Criado em src/metaphors/registry.ts com 30 metáforas semânticas. Cinco têm renderer agora; as demais são vocabulário de expansão.

## 7. Variantes de templates
Criado em src/templates/variants.ts com variantes para comparison, process, timeline, diagram, explain, summary e challenge.

## 8. Transições por designer
Criado em src/transitions/registry.ts com presets para os 13 designers.

## 9. Asset Resolver
Criado em src/assets/. Resolve catálogo local, plugin, geração e fallback.

## 11. Storyboard automático
Criado em src/storyboard/. StoryboardSheet transforma Lesson em folha de aprovação.

## 12. Designer SDK
Criado scripts/create-designer.mjs.

Comando:

    npm run designer:new -- retro-future

O comando gera um esqueleto de designer pronto para registro.
