# Storyboard aprovado: oito slides por mini aula

Esta é a direção aprovada por João para a série Pixel Night sobre o guarda-chuva
da IA. Cada mini aula responde a uma pergunta central em aproximadamente 2–3
minutos. A primeira aula tem como referência a fala de João de cerca de 2min40
para analogia, definição de IA e origem do nome. Meça a fala gravada, as pausas e
o tempo de observação; não imponha oito blocos de segundos iguais.

## Ritmo editorial

O modelo aprovado tem **quatro momentos visuais e quatro explicações curtas**.
No storyboard de referência eles se alternam: visual → explicação → visual →
explicação → visual → explicação → visual → explicação. A fala é contínua, sem
precisar anunciar "slide dois". Quando a ideia pedir dois momentos visuais
consecutivos antes do texto, preserve a função pedagógica e o total de oito
slides; documente a escolha. Uma explicação pode permanecer enquanto seus
elementos ilustrativos se movem. Texto não significa tela imóvel.

| Slide | Papel | O que precisa acontecer |
| --- | --- | --- |
| 1 | Abertura visual | Exibir o nome do assunto e uma pergunta curta na própria cena; começar a metáfora ou o problema com uma ação observável. Quem chegou pelo Reel precisa reconhecer imediatamente se a aula é sobre machine learning, redes neurais, deep learning, LLMs etc. |
| 2 | Explicação | Definir em palavras simples o que o público acabou de ver. |
| 3 | Exemplo ou mecanismo | Mostrar entrada, mudança e resultado com peças separadas. |
| 4 | Explicação | Nomear a relação causal, sem repetir a imagem em prosa. |
| 5 | Aprofundamento | Acrescentar uma distinção, origem ou etapa necessária. |
| 6 | Explicação | Fixar uma frase que evita o erro mais provável. |
| 7 | Síntese visual | Reunir as peças e mostrar como se conectam. |
| 8 | Fecho em texto | Uma ideia-chave ou convite à aula seguinte, sem nova aula comprimida. |

Esses papéis são referência, não moldes gráficos. Cada cena deve responder à
pergunta específica do episódio. Replicar o mesmo fluxo de ícones em todos os
assuntos produz um template genérico, mesmo com a paleta Pixel Night.
O título da página HTML, o seletor da aula ou uma legenda externa não substituem
o tema visível no primeiro slide. Faça o título em texto nativo, dentro da área
segura, sem cobrir a demonstração; revele-o no início da animação e deixe tempo
para leitura. Use a grafia correta dos conceitos.

## Aula 01: ordem corrigida

| Slide | Tipo | Conteúdo de aprovação | Movimento semântico planejado |
| --- | --- | --- | --- |
| 1 | Visual | Título “O guarda-chuva da IA” e pergunta “O que é esse guarda-chuva e o que é IA?”; João abre o guarda-chuva e mostra conceitos sob ele. | Título aparece primeiro; armação abre; ícones entram em setores distintos. |
| 2 | Texto | IA reúne muitos métodos e conceitos; o guarda-chuva é analogia didática. | Palavras-chave aparecem conforme João aponta. |
| 3 | Visual | Tarefas de IA: imagem, conversa e rota. | Cada exemplo executa uma ação curta própria. |
| 4 | Texto | IA é o campo que busca criar sistemas para reconhecer, prever, responder ou planejar. | Exemplos iluminam os verbos correspondentes. |
| 5 | Visual | Proposta de 1955 → encontro em Dartmouth em 1956. | Documento recebe a data; calendário avança. |
| 6 | Texto | John McCarthy deu nome à área numa proposta com Minsky, Rochester e Shannon. | Datas e nomes são revelados na ordem da fala. |
| 7 | Visual | O guarda-chuva reúne regras, aprendizagem e outras abordagens. | Ramificações aparecem e se conectam ao topo IA. |
| 8 | Texto | “Debaixo desse guarda-chuva há muitos métodos e conceitos. Nas próximas mini aulas, vamos entender machine learning, redes neurais e tokenização.” Fecho: “Uma ideia por vez.” | Destaques acompanham a fala; sem lista numerada de aulas. |

A palavra “inteligência artificial” aparece na proposta de 1955; o encontro de
Dartmouth foi em 1956. O guarda-chuva é uma analogia didática sem origem única
documentada. Não atribua a metáfora a McCarthy nem represente as silhuetas
históricas como retratos fiéis sem referência.

## Preparação para outros agentes

1. Leia `AGENTS.md`, `docs/MINI_LESSON_DIRECTION.md`, este guia e
   `public/references/joao/profile.json`.
2. Escreva pergunta, resultado de aprendizagem, recorte, fala completa e duração
   estimada com pausas. Uma mini aula desenvolve um assunto; os vizinhos são
   contexto ou aulas seguintes.
3. Preencha oito registros como no JSON de exemplo, com `kind`, fala, texto
   visível, composição, partes separáveis e ação didática. Varie a composição.
4. Mostre uma prévia **estática** em HTML ou imagens, em 1080×864, para João
   aprovar texto, rosto, ordem e legibilidade. O vídeo final pode enquadrar esse
   canvas no Reel 1080×1920.
5. Após aprovação, gere **um objeto por asset** (transparência real quando for
   objeto), incluindo corpo e braço de João separados. Texto e rótulos são nativos.
6. Monte `data.pixelScene` ou `data.sceneGraph` com IDs, `z`, pais, pivôs, fios,
   nós e ações com `purpose: "teaching"`. Sincronize com a fala. Sinal percorre
   fio de verdade; exemplos entram no classificador; ruído dissolve; braço
   gesticula. Movimentos ambientes e transições não bastam.
7. Revise início, meio, fim e amplitude máxima em HTML, inclusive no tamanho de
   celular. Corrija sobreposições, cortes e fontes antes de renderizar MP4.
8. Rode `npm run check`, `npm run test:production` e
   `npm run production:validate -- caminho/lesson.json`.

**Separação essencial:** a folha de quatro quadros ou o HTML com a composição
finalizada servem para aprovar o storyboard. Nunca anime essa imagem achatada
como se fosse a aula. O grafo de produção reconstrói cada objeto e o texto para
permitir movimento que ensina.

## Próximos episódios desta série

No primeiro slide de cada episódio, escreva o nome completo do assunto:
“Machine learning”, “Redes neurais”, “Deep learning”, “IA generativa”, “LLMs”
e “Modelos de difusão”. Uma pergunta curta pode acompanhar o nome; mantenha os
dois legíveis dentro da imagem, inclusive no celular.

Machine learning: exemplos → treino → e-mail novo → previsão. Redes neurais:
pixels → conexões → ajuste de pesos → classificação, com sinal percorrendo fios.
Deep learning: camadas → bordas → formas → reconhecimento. IA generativa:
pedido → padrões → geração → conferência. LLMs: texto → tokens → próximo token
condicionado ao contexto → resposta e checagem. Difusão: aprendizado com ruído →
ruído inicial → refinamento em etapas → imagem e inspeção. Cada um terá quatro
explicações próprias entre essas ações visuais. Tokenização pode ganhar aula
própria depois, sem ser explicada por inteiro no fecho da aula 01.
