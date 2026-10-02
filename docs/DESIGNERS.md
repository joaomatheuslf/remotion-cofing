# Designers

O Designer controla a identidade visual da aula sem alterar o conteúdo ou o template.

A mesma cena pode usar Pixel Night, Editorial Pop ou Clean Tech sem reescrever o roteiro.

## Designers iniciais

- pixel-night — game explainer escuro, chunky e neon
- editorial-pop — infográfico editorial, papel quente e cores vibrantes
- clean-tech — institucional claro, moderno e discreto

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
