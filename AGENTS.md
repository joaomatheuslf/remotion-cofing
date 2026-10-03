# Motor de aulas do João — regras de produção

## Pixel Night é a rota padrão

Quando o pedido for Pixel Night, ou não indicar designer, use `designerId: "pixel-night"`.
Toda cena precisa de `data.pixelScene` no contrato de `src/pixel/types.ts`.
O Director/compilador e o renderer rejeitam cenas sem esse plano. Outros designers
continuam disponíveis apenas quando escolhidos explicitamente.

Não transforme Pixel Night em cards genéricos com cores escuras. Use pixel art de
verdade: silhuetas angulares, desenho em grade, paleta neon noturna, tipografia
bitmap local nos títulos e sprites coerentes com as referências aprovadas.

## Ordem do trabalho

1. Conteúdo: objetivo didático e fala de cada cena.
2. Storyboard: composição, elementos, ação que explica o conceito e duração.
3. Assets separados: cenário, objetos, corpo, braço, ícones. Gere PNGs transparentes
   por objeto quando necessário; use SVG/HTML nativos para fios, nós, texto e sinais.
4. Montagem: posição, camada `z`, relação `parent` e pivô de articulação.
5. Movimento: trajetória, ativação, preenchimento, gesto ou redução de ruído dentro
   da cena, sincronizados com a ideia. Entrada/saída não contam como animação didática.
6. Prévia HTML e storyboard para revisão. Depois renderize o vídeo aprovado.
7. Rode `npm run check`, `npm run test:pixel` e `npm run pixel:validate`.
   Confira início, meio e fim de cada cena, inclusive a amplitude máxima do movimento.

## Proibições que vêm dos problemas encontrados na aula

- Não entregue slides achatados com zoom, fade, recortes horizontais ou transições
  como substituto da animação dos elementos.
- Não use `sourceBackplate`, `pixelStoryboard`, `pixelLayered`, `pixelMode` ou
  `pixelNative` como contrato de novas cenas. São experimentos antigos.
- Não conserte texto cortado voltando a uma imagem inteira do slide.
- Não faça título/copy/legenda parte de um PNG de página completa. Texto nativo
  precisa quebrar linha ou reprojetar o layout; nunca use overflow hidden para cortar.
- Não permita fallback silencioso para `GenericTemplates` quando Pixel Night foi pedido.
- Não use emoji, personagem stock, fonte de CDN ou humano genérico como asset final.

## O movimento deve ensinar

- Rede neural: sinais passam pelos fios reais e os nós acendem por etapa.
- Aprendizado de máquina: exemplos entram, são processados e seguem à classificação.
- Tokens: unidades aparecem/avançam na ordem da geração, sem chamar palavras de tokens exatos.
- Difusão: ruído desaparece em etapas enquanto a imagem ganha definição.
- Guarda-chuvas: revele contenção e relação entre as áreas; não sugira evolução obrigatória.
- João: use sua caricatura reconhecível; corpo e braço separados, parent e pivô no ombro.
- Flutuar robô ou oscilar guarda-chuva é movimento ambiente; precisa acompanhar uma
  ação didática, não substituí-la.

## Fontes e limitações reais

O motor não gera automaticamente novos PNGs a partir de qualquer roteiro. O agente
precisa produzir/resolver os assets, montar o plano e validar. Se faltar asset ou
movimento, entregue um erro claro e complete esse trabalho; nunca invente um renderer.
Referência executável: `public/lessons/pixel-night/lesson.json`.
Guia: `docs/PIXEL_NIGHT_PRODUCTION.md`.
