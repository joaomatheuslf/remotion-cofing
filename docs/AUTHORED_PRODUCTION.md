# Produção autoral em todos os estilos

Antes de montar o grafo, aplique o recorte de `MINI_LESSON_DIRECTION.md`: pergunta
central, roteiro falado e tempo com pausas determinam as cenas.

A versão 0.8 exige um plano de elementos em todos os 13 designers. `mode` é
`production` por padrão. O modo `demo` mantém exemplos do SDK; é um opt-in explícito
que não passa no gate de produção. Não entregue demos como aulas finais.

Use `data.sceneGraph` no `Lesson` ou `segment.sceneGraph` no Blueprint.
Pixel Night continua aceitando `pixelScene`/`segment.pixel` para compatibilidade.
O designer declarado no plano deve ser igual ao da aula. Todo plano exige texto
nativo, elementos visuais separados, IDs, camadas, rig sem ciclos e ação didática
interna. Os demais estilos exigem também `artDirection`:

```json
{
  "description": "Traço de quadrinhos com contornos expressivos e retícula, composição própria para explicar conexões.",
  "referenceAssets": ["references/styles/comic-book.jpg"]
}
```

Esse bloco pertence à cena. Não basta declarar o nome do estilo e usar uma imagem
de página inteira. O renderer recebe formas e sprites já dirigidos e não gera,
por conta própria, retícula, papel, vidro ou caricatura a partir de um rótulo.
A arte deve ser produzida conforme `docs/ASSET_GENERATION.md`.

Quando houver `presenter-body`, declare no mesmo plano:

```json
{
  "characterId": "joao-matheus",
  "referenceIds": ["joao-suit", "joao-orange-polo"],
  "treatment": "João em traço de quadrinhos, óculos escuros e barba grisalha preservados."
}
```

Renderização: `AuthoredScene` utiliza o mesmo grafo e relógio em Remotion e HTML.
Pixel Night preserva desenho crisp/pixelado; os demais usam geometria suave e
texto nativo. Retângulos podem usar `radius`. Tipografia bitmap não é aceita como
recolorização nos demais estilos. Paths e sinais são independentes da estética.

```bash
npm run check
npm run test:production
npm run production:validate -- public/lessons/minha-aula/lesson.json
npm run pixel:preview -- public/lessons/minha-aula/lesson.json
npm run pixel:html -- public/lessons/minha-aula/lesson.json
```

Os nomes de preview/HTML conservam o prefixo antigo por compatibilidade, mas aceitam
lições autorais dos outros estilos. Para renderizar um novo MP4, registre a nova
lição em `src/root.tsx` com `LessonComposition`; não sobrescreva silenciosamente a aula
Pixel Night do guarda-chuva. Rode o gate com o arquivo da nova aula antes do render.

O gate verifica assets PNG locais, transparência, referências estéticas presentes, IDs do apresentador, rigs,
texto e limites amostrados de movimento. A revisão de storyboard é responsável
pela qualidade estética, fidelidade facial, sobreposição e explicação científica.
