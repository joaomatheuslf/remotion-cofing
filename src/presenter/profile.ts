export const presenterProfile = {
  id: "joao-matheus-presenter",
  displayName: "João Matheus",
  defaultHumanPresenter: true,

  identityAnchors: [
    "óculos de armação escura",
    "cabelo curto escuro, cacheado/ondulado",
    "barba curta e cheia com grisalho marcante",
    "rosto adulto coerente com as referências",
    "sorriso amigável quando a cena for didática ou positiva",
  ],

  // Os binários originais estão empacotados no plugin privado
  // "Aulas Animadas do João". Estes nomes são o contrato estável
  // entre o projeto, o Director e o plugin.
  pluginAssetReferences: [
    "assets/host/joao-reference-suit.png",
    "assets/host/joao-reference-orange-polo.png",
  ],

  rules: {
    useAsDefaultPresenter: true,
    genericHumanReplacementAllowed: false,
    preserveGlassesByDefault: true,
    preserveGrayBeard: true,
    preserveRecognizability: true,
    allowWardrobeChange: true,
    allowSceneChange: true,
    allowStyleTransfer: true,
  },
} as const;

export type PresenterProfile = typeof presenterProfile;
