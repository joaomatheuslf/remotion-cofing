import {Lesson} from "./engine/types";
import {theme} from "./engine/theme";

export const exampleLesson: Lesson = {
  id: "prompt-basico",
  designerId: "clean-tech",
  mode:"demo",
  title: "Prompt Forge — Fundamentos",
  theme: "prompt-forge",
  scenes: [
    {
      id: "anatomia",
      kind: "prompt-anatomy",
      title: "Anatomia do Prompt",
      duration: 7,
      data: {
        parts: [
          {text:"Atue como especialista em educação",label:"Papel",color:theme.colors.yellow},
          {text:"Crie um plano de aula de 4 semanas",label:"Objetivo",color:theme.colors.green},
          {text:"para iniciantes em inteligência artificial",label:"Contexto",color:theme.colors.cyan},
          {text:"em formato de tabela",label:"Formato",color:theme.colors.pink}
        ]
      }
    },
    {
      id: "bad-good",
      kind: "bad-vs-good",
      title: "Prompt ruim vs prompt bom",
      duration: 6,
      data: {
        bad: "Faça um texto.",
        good: "Escreva um post de 150 palavras, tom didático, para Instagram, com um CTA no final."
      }
    }
  ]
};
