import {Lesson} from "../engine/types";
import {theme} from "../engine/theme";

export const pixelDemoLesson: Lesson = {
  id:"pixel-game-demo",
  title:"Pixel Game Explainer",
  theme:"prompt-forge",
  scenes:[
    {
      id:"prompt-quality",
      kind:"game-simulation",
      title:"QUALIDADE DO PROMPT",
      duration:7,
      data:{
        dialogue:"Quanto mais claro o comando, menos a IA precisa adivinhar.",
        characterState:"thinking",
        metrics:[
          {label:"Clareza",value:92,color:theme.colors.yellow},
          {label:"Contexto",value:81,color:theme.colors.cyan},
          {label:"Formato",value:88,color:theme.colors.green},
          {label:"Ambiguidade",value:18,color:theme.colors.pink}
        ]
      }
    }
  ]
};
