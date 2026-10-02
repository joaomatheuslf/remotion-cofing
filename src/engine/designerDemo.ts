import {Lesson} from "./types";

const scenes: Lesson["scenes"] = [
  {
    id: "title",
    kind: "title",
    title: "A MESMA AULA",
    duration: 4,
    data: {
      kicker: "DESIGNER DEMO",
      subtitle: "Mesmo conteúdo. Mesma estrutura. Identidade visual diferente."
    }
  },
  {
    id: "process",
    kind: "process",
    title: "Como um prompt funciona",
    duration: 6,
    data: {
      steps: [
        {label:"Pedido",detail:"Você descreve a tarefa"},
        {label:"Contexto",detail:"A IA recebe informações"},
        {label:"Modelo",detail:"A instrução é processada"},
        {label:"Resposta",detail:"O resultado é apresentado"}
      ]
    }
  },
  {
    id: "token-flow",
    kind: "token-flow",
    title: "Do prompt à resposta",
    duration: 7,
    data: {
      input: "Explique IA para iniciantes",
      tokens: ["Explique","IA","para","iniciantes"],
      output: "Resposta adaptada",
      modelLabel: "MODELO"
    }
  }
];

const makeLesson = (
  designerId: Lesson["designerId"],
  id: string
): Lesson => ({
  id,
  title: "Designer Demo",
  designerId,
  theme: "prompt-forge",
  scenes
});

export const designerPixelNight = makeLesson(
  "pixel-night",
  "designer-pixel-night"
);

export const designerEditorialPop = makeLesson(
  "editorial-pop",
  "designer-editorial-pop"
);

export const designerCleanTech = makeLesson(
  "clean-tech",
  "designer-clean-tech"
);
