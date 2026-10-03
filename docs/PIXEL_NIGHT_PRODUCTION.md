# Pixel Night: conteúdo → elementos → cena animada

Pixel Night deixou de ser só uma troca de cores em templates genéricos. A rota de
produção é um grafo de cena tipado. O esquema está em `src/pixel/types.ts` e a
validação em `src/pixel/schema.mjs`.

## Contrato obrigatório

Uma `Lesson` com `designerId: "pixel-night"` (também o padrão quando omitido)
exige `data.pixelScene` em **todas** as cenas. Num `LessonBlueprint`, forneça o mesmo
objeto em `segment.pixel`. `compileLesson` valida; `LessonComposition` valida;
`SceneRenderer` encaminha todos os kinds para `PixelScene` antes do switch genérico.
Não há fallback de Pixel Night para os outros templates. Desde 0.8, todos os
outros designers também exigem `sceneGraph` na produção; consulte
`AUTHORED_PRODUCTION.md`. Referências do João e geração de objetos estão em
`ASSET_GENERATION.md`.

Cada plano contém:

- `teachingGoal`: o que se aprende;
- `canvas`: 1080 × 864, 30 fps;
- `background`: cenário sem conteúdo explicativo incorporado;
- `elements`: IDs estáveis, texto nativo, sprites transparentes, retângulos e paths;
- `z`: ordem de camadas;
- `parent` e `pivot`: montagem/articulação;
- `motion`: tipo, tempo em segundos, purpose e explicação pedagógica.

O título usa um alfabeto bitmap local de 5 × 7, com acentos portugueses. Corpo de
texto é nativo, em monospace, com quebra de linha validada. Nunca rasterize um
parágrafo para poder fatiá-lo depois.

## Assets e montagem

Gere/exporte um PNG transparente por objeto. Não gere uma página inteira como
asset da animação. Um storyboard de página inteira pode servir de referência de
aprovação, mas não entra como slide de produção. Fundo é cenário; rótulos e títulos
são elementos separados. Nós/fios/sinais normalmente ficam melhores como geometria.

Para João, resolva as referências reais e preserve óculos, cabelo escuro curto,
barba com grisalho e reconhecimento facial. O exemplo inclui sprites independentes
de corpo e braço; braço é filho do corpo, com um pivô de ombro.

Assets do exemplo em `public/lessons/pixel-18-layers/` são binários locais. Novo
conteúdo não recebe esses sprites por magia: o agente ou provedor de assets deve
produzir o que falta. O compilador não chama ImageGen.

## Ações implementadas

| Tipo | Comportamento | Uso |
| --- | --- | --- |
| `signal` | Percorre um path pela distância acumulada | Conexões neurais, fluxo de dados |
| `fill` | Preenche uma unidade durante o intervalo | Formação de tokens, ocupação |
| `dissolve` | Reduz opacidade até zero | Remoção progressiva de ruído |
| `pulse` | Ativa visualmente uma unidade | Processamento em nós |
| `gesture` | Articula um objeto em torno do pivô | Braço de João |
| `float`, `sway` | Oscilação ambiente | Robô e guarda-chuva |
| `reveal` | Entrada suave | Aparição de um elemento |

`float`, `sway` e `reveal` sozinhos não passam como aula animada. Toda cena exige
uma ação interna com `purpose: "teaching"` e uma explicação do que esse movimento
representa. A validação verifica a estrutura; a revisão visual/pedagógica continua
necessária para confirmar que a ação realmente ensina.

## Exemplo executável

`public/lessons/pixel-night/lesson.json` contém 18 cenas e elementos editáveis.
Os textos explicativos não são recortes dos slides antigos. Redes neurais têm nós,
fios e sinais independentes. Difusão separa o ruído e a casa. O cenário noturno é
um PNG de fundo; os diagramas e rótulos são nativos.

`scripts/build-pixel-lesson.py` é o autor dessa aula específica; não é um gerador
universal de conteúdo. Use os helpers como exemplo e projete cada nova aula.

## Revisão e publicação

```bash
npm ci
npm run check
npm run test:pixel
npm run pixel:validate
npm run pixel:preview
npm run pixel:html
npm run render:pixel:lesson
```

`pixel:preview` cria SVGs de início, meio e fim. `pixel:validate` confirma arquivos,
transparência dos sprites, limites de texto e área segura em amostras de 125 ms,
incluindo movimentos e rigs. Paths de assets são locais, sem `..`. Imagens de
slide inteiro e foregrounds do tamanho da página são rejeitados.

Remotion e HTML consomem o **mesmo grafo, relógio e funções de movimento/texto**.
O HTML permite revisar e arrastar a timeline sem renderizar MP4. No iPhone, a prévia
de arquivos pode desativar JavaScript: a animação exige navegador real. O primeiro
quadro fica visível como prévia estática, sem prometer interatividade no Quick Look.

Faça revisão visual antes da entrega: o contrato evita várias falhas de estrutura,
mas não prova que uma arte está bonita, que não há sobreposição entre objetos ou
que uma analogia científica está correta.

## Experimentos anteriores

As composições de screenshots em faixas e os fallbacks `sourceBackplate` foram
retirados da rota de produção/Studio. Os assets de produção contêm apenas o cenário e os objetos independentes usados
na aula. Não reaproveite essas flags para contornar a validação.
