# Assets gerados por ferramenta de imagem

Estas diretrizes valem para os 13 designers. O gerador cria os objetos; Remotion/HTML
montam e animam os objetos. Uma imagem com todos os elementos já fundidos não é
um asset de produção, mesmo que tenha a estética correta.

## Referências reais

As duas fotos de João estão em `public/references/joao/`, incluídas neste repositório
com autorização explícita dele. São as referências padrão da ferramenta.
`JOAO_REFERENCE_DIR` permite usar um diretório alternativo.
`profile.json` registra identidade e direção para cada designer. Há referências
estéticas em `public/references/styles/` para dez estilos, em JPEGs de consulta
derivados das referências do plugin. Pixel Night usa o cenário aprovado como referência
estética. Editorial Pop e Clean Tech têm direção escrita; não há uma imagem aprovada
adicional desses dois estilos neste pacote. Não invente que foi anexada uma imagem ausente.

Fotos definem a identidade, imagens estéticas definem material/composição; o asset
final deve combinar as duas coisas. Os JPEGs de estilo não são templates finais.

## Diretório alternativo opcional

```bash
npm run references:import -- /caminho/das/fotos-do-joao
```

O diretório de origem deve conter `joao-reference-suit.png` e
`joao-reference-orange-polo.png`. Alternativamente, configure `JOAO_REFERENCE_DIR`.
O importador copia para `references-private/`, pasta ignorada pelo Git; para usar essa
alternativa, configure `JOAO_REFERENCE_DIR` com esse caminho. O padrão continua
sendo as fotos versionadas e autorizadas. Sem fotos, a geração retorna erro claro.
Os testes usam placeholders sintéticos, e a reprodução de assets já aprovados não
depende de ter as fotos presentes.

## Preparar uma chamada concreta

```bash
npm run asset:request -- --id joao-body --style comic-book --kind presenter-body --description "João em pose de professor apontando para a direita, roupa laranja."
```

O script devolve um JSON com `tool: "image_gen.imagegen"` e `arguments` compatíveis:

- `prompt`: identidade, material, objeto único, requisitos e exclusões;
- `transparent_background`: true para objetos/corpo/braço, false para cenário;
- `referenced_image_paths`: arquivos locais existentes, fotos do João e imagem estética quando disponível.

O agente deve **chamar a ferramenta** com esses argumentos, examinar o resultado e
salvar o PNG em `public/<output.path>`. O script prepara a solicitação; não chama a
ferramenta por conta própria e não promete que gerar um prompt gera uma imagem.
Se usar outro ambiente de ferramenta, adapte os paths mantendo os arquivos reais anexados.

Para o braço, gere e aprove o corpo antes:

```bash
npm run asset:request -- --id joao-arm --style comic-book --kind presenter-arm --body assets/generated/comic-book/joao-body.png --description "Braço direito com mão apontando, mesma polo laranja e proporções do corpo aprovado."
```

`--body` é obrigatório para braço: o corpo aprovado também é anexado, além das fotos.
Não misture peças de estilos, poses ou iluminação diferentes. Marque o pivô do ombro
após revisar o encaixe real; o script não conhece esse ponto antes da geração.

## Inventário por cena

| Asset | Forma de produzir | Como entra no motor |
| --- | --- | --- |
| Cenário | Imagem separada, sem conteúdo explicativo | `background.asset` |
| João | Corpo e braço separados com fotos anexadas | sprites, `parent` e `pivot` |
| Objetos | Um PNG transparente por objeto | `sprite` com ID e posição |
| Texto | Não pedir ao gerador de imagem | `text` nativo |
| Redes e diagramas | Preferir SVG nativo | `path`, `rect`, `signal` |
| Ruído, partículas, indicadores | Elementos independentes | ações sincronizadas |

## Revisão necessária

Confirme sem cortes: rosto, mãos, roupa, objetos e suas bordas. Confira transparência
real, proporções, cor/forma dos óculos e grisalho. Não aceite checkerboard desenhado
como fundo transparente. Não aceite título incorporado ao PNG. Compare a identidade
às fotos, monte as peças e revise o movimento. A validação consegue verificar arquivos,
metadados e área segura; não faz reconhecimento facial nem avaliação artística.

Novos assets precisam de um novo pedido: não recolorir o sprite Pixel Night para
fingir que ele é Paper Cut, Comic Book ou Clean Tech.
