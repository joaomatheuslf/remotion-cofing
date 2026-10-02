# Formato de roteiro rápido

Além de JSON, o motor aceita um outline textual simples.

Cada cena começa com:

```
## [intent] Título da cena
```

Exemplo:

```md
## [open] Prompt Forge
kicker: AULA ANIMADA
subtitle: Do pedido vago a uma instrução clara.

## [explain] O que é um prompt?
- É a instrução dada à IA.
- Define o objetivo.
- Dá contexto.
- Orienta o formato.

## [sequence] Como funciona
- Você escreve.
- O modelo recebe.
- O modelo processa.
- A resposta aparece.

## [practice] Sua vez
cta: COMEÇAR
- Reescreva um pedido vago.
- Defina objetivo.
- Adicione contexto.
- Escolha o formato.
```

Metadados suportados:

- `subtitle:`
- `kicker:`
- `cta:`
- `duration:`

O parser está em `src/director/parseOutline.ts`.


## Cena gamificada em pixel art

Use uma cena `simulate` com `style: pixel-game`.

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

Metadados adicionais:

- `style: pixel-game`
- `dialogue:`
- `character: idle | thinking | happy | warning`
