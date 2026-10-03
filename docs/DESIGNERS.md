# Designers

O Designer controla a identidade visual da aula sem alterar o conteúdo ou o template.

A mesma cena pode usar Pixel Night, Editorial Pop ou Clean Tech sem reescrever o roteiro.

## Designers disponíveis

- pixel-night — game explainer escuro, chunky e neon
- editorial-pop — infográfico editorial, papel quente e cores vibrantes
- clean-tech — institucional claro, moderno e discreto
- retro-science — pôster científico vintage e papel envelhecido
- blueprint — prancha técnica azul e linguagem de engenharia
- terminal-os — console preto/verde e estética CLI
- cyberpunk-neon — magenta/ciano, futurista e energético
- paper-cut — papéis recortados, pastel e artesanal
- chalkboard — quadro verde e linguagem de aula desenhada
- comic-book — quadrinhos pop, halftone e alto impacto
- glass-lab — laboratório digital, vidro e brilho suave
- corporate-gov — institucional sóbrio em azul-marinho e dourado
- bauhaus — geometria modernista e blocos primários

## Estrutura

~~~
src/designers/
  types.ts
  registry.ts
  DesignerProvider.tsx
  pixel-night.ts
  editorial-pop.ts
  clean-tech.ts
~~~

## Como adicionar um designer

1. Crie um novo arquivo em src/designers/.
2. Implemente DesignerDefinition.
3. Adicione o ID ao tipo DesignerId.
4. Registre em registry.ts.
5. Se necessário, adicione assets e componentes específicos.

## Regra de arquitetura

- Template = como a informação é organizada.
- Designer = como essa organização parece.
- Metáfora = como o movimento ajuda a explicar.
- Director = escolhe qual representação usar.

Exemplo conceitual:

~~~
conteúdo: prompt -> tokens -> modelo -> resposta
metáfora: token-flow
designer: pixel-night | editorial-pop | clean-tech
~~~

## CSS variables disponíveis

~~~
--pf-bg
--pf-panel
--pf-cream
--pf-yellow
--pf-cyan
--pf-green
--pf-pink
--pf-red
--pf-ink
--pf-white
--pf-text
--pf-muted
--pf-radius
--pf-border-width
--pf-tag-radius
--pf-shadow-x
--pf-shadow-y
--pf-shadow-blur
--pf-shadow-color
--pf-font-title
--pf-font-body
--pf-scene-bg
--pf-title-bg
--pf-panel-bg
~~~

Componentes novos devem preferir esses tokens em vez de hexadecimais fixos.


## Quando tokens não são suficientes

Um designer pode substituir uma cena específica sem alterar o core.

Use:

~~~
src/designers/sceneOverrides.tsx
~~~

Isso permite, por exemplo:

- Pixel Night usar uma versão gamificada de `timeline`;
- Editorial Pop usar uma capa completamente diferente;
- Clean Tech usar um diagrama institucional próprio;
- um designer 3D substituir apenas `token-flow` por uma cena Three.js.

A ordem de resolução é:

~~~
Designer scene override
        ↓
template padrão da engine
~~~

Se não existir override, a engine usa o template normal com os tokens do designer.

Isso evita forks do motor e deixa novos designers realmente expansíveis.


## Galeria visual

Abra no Remotion Studio:

~~~
DesignerGallery
~~~

ou renderize:

~~~bash
npm run render:designers
~~~

A galeria percorre todos os designers usando os mesmos componentes de referência. Isso facilita comparar paleta, tipografia, bordas, sombras e linguagem de movimento sem mudar o conteúdo.

## Sugestões de uso

- tecnologia gamificada: pixel-night
- conteúdo editorial/social: editorial-pop ou comic-book
- capacitação institucional: clean-tech ou corporate-gov
- história/ciência: retro-science
- arquitetura/sistemas: blueprint
- programação/DevOps: terminal-os
- futuro/IA avançada: cyberpunk-neon ou glass-lab
- educação leve: paper-cut ou chalkboard
- composição visual forte: bauhaus

Essas associações são apenas direções de arte; qualquer designer pode ser usado em qualquer aula.


## Presenter policy

Designer muda a linguagem visual, não a identidade do apresentador.

Quando houver humano principal, use João como padrão. A policy detalhada está em:

```
src/presenter/designerPolicy.ts
docs/PRESENTER_REFERENCE.md
```

Os designers `blueprint` e `bauhaus` podem funcionar sem personagem. Nos demais, quando a composição pedir host/professor/avatar, represente João e preserve as âncoras faciais.

## Pixel Night em produção

Não é apenas um tema aplicado aos templates genéricos. Requer o grafo de elementos
e movimentos de [PIXEL_NIGHT_PRODUCTION.md](PIXEL_NIGHT_PRODUCTION.md).

## Produção por elementos em todos os 13 estilos

Todos exigem `sceneGraph`, ação didática e arte própria ao estilo. Demos de tokens
não são aulas finais. Consulte `AUTHORED_PRODUCTION.md` e `ASSET_GENERATION.md`.
O perfil e as fotos autorizadas estão em `public/references/joao/`; não use personagem
genérico ao mudar de designer.
