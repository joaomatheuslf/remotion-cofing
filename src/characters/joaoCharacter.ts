import type {CharacterProfile} from "./types";

export const joaoCharacter:CharacterProfile = {
  id:"joao-matheus",
  name:"João Matheus",
  isDefaultPresenter:true,
  identityAnchors:[
    "óculos de armação escura",
    "cabelo curto escuro cacheado/ondulado",
    "barba curta cheia com grisalho visível",
    "formato geral do rosto consistente com as referências",
  ],
  referenceAssets:[
    "references/joao/joao-reference-suit.png",
    "references/joao/joao-reference-orange-polo.png",
  ],
  poses:[
    {state:"idle",description:"postura neutra, olhando para a câmera"},
    {state:"talking",description:"falando com gestos leves"},
    {state:"thinking",description:"expressão pensativa"},
    {state:"pointing-left",description:"apontando para conteúdo à esquerda"},
    {state:"pointing-right",description:"apontando para conteúdo à direita"},
    {state:"confused",description:"dúvida/ambiguidade"},
    {state:"happy",description:"sorriso e confirmação"},
    {state:"warning",description:"alerta/atenção"},
    {state:"typing",description:"interagindo com notebook/terminal"},
    {state:"presenting",description:"postura de professor/apresentador"},
  ],
  designerTreatments:{
    "pixel-night":"pixel art consistente com o host",
    "editorial-pop":"caricatura editorial limpa",
    "clean-tech":"apresentador profissional moderno",
    "retro-science":"professor/cientista vintage",
    "blueprint":"apresentador técnico opcional",
    "terminal-os":"mentor/dev em terminal",
    "cyberpunk-neon":"host futurista neon",
    "paper-cut":"recorte de papel",
    "chalkboard":"professor diante do quadro",
    "comic-book":"protagonista de quadrinhos",
    "glass-lab":"apresentador em laboratório digital",
    "corporate-gov":"apresentador institucional",
    "bauhaus":"caricatura geométrica opcional",
  },
};
