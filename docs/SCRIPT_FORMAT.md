# Formato de roteiro rápido

Cada cena começa com:

```
## [intent] Título da cena
```

## Metadados gerais

- `subtitle:`
- `kicker:`
- `cta:`
- `duration:`
- `style:`
- `dialogue:`
- `character:`

## Metáforas

Use:

```
metaphor: token-flow
metaphor: prompt-builder
metaphor: context-window
metaphor: queue
metaphor: counter-grid
```

Metadados adicionais:

- `input:`
- `output:`
- `tokens:` — separados por `|`
- `value:`
- `unit:`
- `capacity:`
- `processor:`
- `center:`

## Exemplo — fluxo de tokens

```md
## [sequence] Como o prompt vira resposta
metaphor: token-flow
input: Explique redes neurais para iniciantes.
tokens: Explique | redes | neurais | iniciantes
output: Uma explicação adaptada.
```

## Exemplo — montagem

```md
## [decompose] Montando um prompt
metaphor: prompt-builder
output: PROMPT ESTRUTURADO
- Papel
- Objetivo
- Contexto
- Formato
```

## Exemplo — capacidade

```md
## [simulate] Janela de contexto
metaphor: context-window
capacity: 8
center: JANELA DE CONTEXTO
- system
- histórico
- arquivo
- mensagem
```

## Exemplo — fila

```md
## [sequence] Processamento
metaphor: queue
processor: AGENTE
output: FINALIZADO
- pesquisar
- resumir
- revisar
- publicar
```

## Exemplo — contador

```md
## [simulate] Escala acumulada
metaphor: counter-grid
value: 200750
unit: vezes
- repetições acumuladas
```

## Pixel game

```md
## [simulate] Qualidade do prompt
style: pixel-game
dialogue: Quanto mais claro o comando, menos a IA precisa adivinhar.
character: thinking
- Clareza
- Contexto
- Formato
- Precisão
```

O parser está em `src/director/parseOutline.ts`.
