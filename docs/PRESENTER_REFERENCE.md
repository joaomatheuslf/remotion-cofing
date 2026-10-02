# Presenter Reference — João Matheus

## Regra do projeto

Sempre que uma aula tiver **apresentador, professor, mentor, avatar, caricatura ou personagem humano principal**, o personagem padrão é **João Matheus**.

Não substituir João por um personagem humano genérico, salvo pedido explícito.

## Âncoras de identidade

Preservar, principalmente:

- óculos de armação escura;
- cabelo curto escuro, cacheado/ondulado;
- barba curta/cheia com grisalho bem visível;
- formato geral do rosto coerente com as referências;
- sorriso amigável quando compatível com a cena.

O estilo pode mudar. A identidade deve permanecer reconhecível.

## Referências fotográficas

As imagens originais ficam empacotadas no plugin privado **Aulas Animadas do João**:

```
skills/lesson-director/assets/host/joao-reference-suit.png
skills/lesson-director/assets/host/joao-reference-orange-polo.png
```

A foto formal é a referência principal de estrutura facial. A foto com polo laranja é uma segunda referência de aparência casual/natural.

## Referências de direção de arte

O plugin também contém as dez imagens individuais usadas para consolidar os designers:

```
retro-science.png
blueprint.png
terminal-os.png
cyberpunk-neon.png
paper-cut.png
chalkboard.png
comic-book.png
glass-lab.png
corporate-gov.png
bauhaus.png
```

Todas foram produzidas em **5:4**, coerentes com o canvas **1080×864** da engine, e com João como apresentador quando o estilo comporta personagem.

## Comportamento esperado do Director

1. decidir se a cena realmente precisa de personagem;
2. se houver humano principal, usar João;
3. escolher o tratamento visual pelo designer;
4. preservar as âncoras de identidade;
5. nunca trocar João por um apresentador stock apenas porque o designer mudou.

Veja também:

- `src/presenter/profile.ts`
- `src/presenter/designerPolicy.ts`
- `docs/DESIGNERS.md`
