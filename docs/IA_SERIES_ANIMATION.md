# Série IA: cenas animadas e dois modos de reprodução

Sete aulas Pixel Night de oito cenas foram geradas em
`public/lessons/ia-series/aula-01.json` a `aula-07.json`. O texto base editável
está em `examples/mini-lessons/ia-series/series-content.json`; execute
`npm run series:build` para atualizar os grafos. Cada cena contém texto nativo,
objetos com IDs, camadas, caminho de sinal e movimentos com propósito didático.
O apresentador da composição usa corpo e braço transparentes separados.

## Aprovação visual e produção

As sete imagens de abertura aprovadas são referências do storyboard e o fallback
estático do player quando o visualizador bloqueia JavaScript. O player animado
reconstrói a cena com sprites, texto e fios independentes. Ele não movimenta uma
imagem de slide achatada. A adaptação de roupa e caricatura das aberturas para
sprites transparentes por aula ainda requer uma rodada de direção de arte; o
conjunto atual de produção reutiliza o recorte de João com polo laranja.

Para editar uma aula, altere o texto em `series-content.json`, o mapa de objetos
e os movimentos em `scripts/build-ia-series.mjs`, reconstrua e valide as sete
lições. Mantenha a duração baseada na fala gravada: os 20 segundos por slide
atuais são marcações de montagem, totalizando 2min40 por aula.

## Uso

```bash
npm run series:build
for n in 01 02 03 04 05 06 07; do npm run production:validate -- "public/lessons/ia-series/aula-$n.json"; done
npm run series:html
```

Baixe `out/ia-series-players.zip`, descompacte e abra `index.html` em um
navegador. Em **modo slides**, a cena continua em movimento até o avanço manual;
em **modo vídeo**, as oito cenas avançam em sequência. O HTML funciona sem rede.
A prévia de anexos do ChatGPT pode bloquear JavaScript; ao abrir o arquivo num
navegador, os controles e os movimentos ficam ativos.

As composições Remotion `AulaIA01` a `AulaIA07` estão em `src/root.tsx` para
exportação em 1080×864 a 30 fps. Com Remotion disponível:

```bash
npx remotion render AulaIA01 out/ia-series/aula-01-remotion.mp4
```

Se o ambiente impedir o Chromium/serviço de download do Remotion, o exportador
local usa o **mesmo grafo SVG e relógio** do player para gerar MP4 offline, em
1080×864 a 12 fps:

```bash
for n in 01 02 03 04 05 06 07; do npm run series:video -- "$n"; done
```

O vídeo ainda não contém locução ou música; ajuste os tempos após gravar a fala
e adicione áudio à composição antes de publicar.
