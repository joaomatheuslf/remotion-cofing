# Motor de aulas do João — regras obrigatórias para TODOS os estilos

## Produção por elementos, sem template genérico

Pixel Night continua padrão quando não houver designer escolhido. Os 13 designers
exigem uma cena autoral com elementos separados, camadas, texto nativo e movimento
que explique a ideia. Não basta trocar paleta ou fonte de um card genérico.

Use `data.sceneGraph` (ou `data.pixelScene` nas aulas Pixel Night existentes).
No Blueprint, use `segment.sceneGraph` ou `segment.pixel`. O compilador e o renderer
rejeitam produção sem esse plano. `mode: "demo"` existe somente para demonstrações
antigas do SDK, identificadas como demo; nunca o use para contornar a produção.

## Ordem de trabalho

1. Roteiro e objetivo de aprendizagem por cena.
2. Storyboard com composição, metáfora, assets, ações e duração para revisão do João.
3. Leia `public/references/joao/profile.json`: direção estética e referências reais.
4. Gere assets com a ferramenta de imagem, UM objeto por arquivo. Prepare a chamada
   com `npm run asset:request -- --id ... --style ... --kind ... --description ...`.
5. Revise identidade, estilo, transparência, integridade das bordas e encaixe das peças.
6. Monte cenário, objetos, textos, fios, nós, corpo e braço com IDs, `z`, `parent`, pivô.
7. Anime ações dentro da cena e sincronize-as com a fala. Transições não bastam.
8. Prévia HTML e storyboard; após aprovação visual, renderize o vídeo.
9. Execute `npm run check`, `npm run test:production`, `npm run production:validate -- caminho/lesson.json`.

## João em todos os estilos

Quando houver apresentador ou humano principal, use João Matheus. Fotos reais:
`public/references/joao/joao-reference-suit.png` e
`public/references/joao/joao-reference-orange-polo.png`.
João autorizou incluir essas duas fotos neste repositório como referências de geração.
Use-as por padrão; `JOAO_REFERENCE_DIR` permite um diretório local alternativo.
Preserve óculos escuros, cabelo curto escuro ondulado/cacheado, barba com grisalho,
idade e proporções do rosto. Mude material e tratamento visual, não a identidade.
Declare `presenter.characterId`, `referenceIds` e `treatment` no plano.
Esses campos registram procedência; a comparação facial ainda exige revisão visual.
Nunca use personagem stock, emoji ou humano genérico como substituto.

## Geração via ferramenta de imagem

Guia completo: `docs/ASSET_GENERATION.md`. A chamada deve anexar arquivos reais de
referência, não apenas escrever “parecido com João”. O JSON de `asset:request`
contém `prompt`, `transparent_background` e `referenced_image_paths` para a ferramenta.
Corpo e braço são pedidos separados. Para braço, forneça `--body` com o corpo aprovado.
Não assuma que indicar uma foto ou executar o script já gera a imagem: é preciso
chamar a ferramenta, revisar o resultado e salvar o PNG em `public/assets/generated/`.

Cenário pode ser opaco. Objetos e peças precisam de transparência real. Títulos,
parágrafos e rótulos são texto nativo, fora da imagem. Referências estéticas não são
slides finais e não devem ser animadas como uma página única.

## Movimento e layout

- Rede neural: sinais percorrem fios reais e os nós respondem por etapa.
- Machine learning: exemplos entram, passam pelo processamento e seguem à classificação.
- Tokens: formação em sequência; não chamar palavras de tokens exatos.
- Difusão: remoção gradual de ruído sobre uma imagem separada.
- João: braço articulado ao corpo com pivô no ombro.
- Flutuação e oscilação são ambientes; não substituem a ação didática.
- Texto quebra linha ou o layout é reprojetado; nunca corte com overflow.
- Confira início, meio, fim e amplitudes máximas; a validação não prova beleza ou ausência de sobreposição.

## Identidade visual de cada designer

`public/references/joao/profile.json` define os 13 tratamentos. Quando houver imagem
estética, anexe-a também à geração; quando faltar imagem, siga a direção escrita e
peça aprovação do storyboard. Para Pixel Night use grade/pixel art, neon noturno e
bitmap nos títulos. Os demais usam o material/traço próprios, sem converter tudo em pixel.
Guia do contrato: `docs/AUTHORED_PRODUCTION.md`.
