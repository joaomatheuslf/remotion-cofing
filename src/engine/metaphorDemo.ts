import {Lesson} from "./types";

export const metaphorDemoLesson: Lesson = {
  id:"metaphor-showcase",
  title:"Metaphor Library",
  theme:"prompt-forge",
  scenes:[
    {
      id:"tokens",
      kind:"token-flow",
      title:"Como o prompt atravessa o modelo",
      duration:7,
      data:{
        input:"Explique redes neurais para iniciantes.",
        tokens:["Explique","redes","neurais","para","iniciantes"],
        output:"Uma explicação adaptada ao pedido.",
        modelLabel:"MODELO"
      }
    },
    {
      id:"builder",
      kind:"prompt-builder",
      title:"Um bom prompt é montado por partes",
      duration:7,
      data:{
        parts:[
          "Papel: especialista em educação",
          "Objetivo: criar uma aula",
          "Contexto: público iniciante",
          "Formato: tópicos com exemplos"
        ],
        result:"PROMPT ESTRUTURADO"
      }
    },
    {
      id:"window",
      kind:"context-window",
      title:"A janela de contexto tem capacidade",
      duration:7,
      data:{
        label:"JANELA DE CONTEXTO",
        capacity:8,
        items:[
          "system","histórico","arquivo A","arquivo B",
          "mensagem 1","mensagem 2","exemplo","instrução",
          "anexo extra","texto antigo"
        ]
      }
    },
    {
      id:"queue",
      kind:"queue",
      title:"Algumas tarefas entram em fila",
      duration:7,
      data:{
        processor:"AGENTE",
        outputLabel:"FINALIZADO",
        items:["Pesquisar fontes","Resumir dados","Gerar pauta","Revisar","Publicar"]
      }
    },
    {
      id:"counter",
      kind:"counter-grid",
      title:"Repetição muda a escala",
      duration:7,
      data:{
        value:200750,
        label:"repetições acumuladas",
        unit:"vezes",
        cells:60
      }
    }
  ]
};
