import {Lesson} from "./types";
import {theme} from "./theme";

export const engineDemoLesson: Lesson = {
  id: "engine-showcase",
  title: "Prompt Forge Engine — Showcase",
  theme: "prompt-forge",
  scenes: [
    {
      id:"title",
      kind:"title",
      title:"Prompt Forge",
      duration:4,
      data:{subtitle:"Um motor reutilizável para aulas animadas.",kicker:"ENGINE SHOWCASE"}
    },
    {
      id:"explain",
      kind:"explain",
      title:"Ideias viram cenas",
      duration:5,
      data:{
        lead:"O conteúdo define o que ensinar. A engine decide como mostrar.",
        bullets:["Escolha um template","Passe os dados","Aplique movimento","Renderize em vídeo"]
      }
    },
    {
      id:"process",
      kind:"process",
      title:"Do roteiro ao vídeo",
      duration:5,
      data:{steps:[
        {label:"Roteiro",detail:"Texto bruto"},
        {label:"Cena",detail:"Schema"},
        {label:"Template",detail:"Layout"},
        {label:"Render",detail:"MP4"}
      ]}
    },
    {
      id:"comparison",
      kind:"comparison",
      title:"Duas formas de explicar",
      duration:5,
      data:{
        left:{label:"SEM ENGINE",items:["Refazer layout","Animar do zero","Inconsistência"]},
        right:{label:"COM ENGINE",items:["Templates","Movimentos prontos","Identidade consistente"]}
      }
    },
    {
      id:"timeline",
      kind:"timeline",
      title:"Evolução de uma aula",
      duration:5,
      data:{items:[
        {label:"01",title:"Introdução",detail:"crie o contexto"},
        {label:"02",title:"Conceito",detail:"explique visualmente"},
        {label:"03",title:"Prática",detail:"simule o uso"},
        {label:"04",title:"Desafio",detail:"faça o aluno aplicar"}
      ]}
    },
    {
      id:"before-after",
      kind:"before-after",
      title:"Transformação visual",
      duration:5,
      data:{
        before:{title:"ANTES",body:"Um bloco de texto difícil de acompanhar."},
        after:{title:"DEPOIS",body:"Uma sequência visual com hierarquia e movimento."}
      }
    },
    {
      id:"simulation",
      kind:"simulation",
      title:"Estado do aprendizado",
      duration:5,
      data:{
        status:"SIMULAÇÃO",
        metrics:[
          {label:"Clareza",value:92,color:theme.colors.yellow},
          {label:"Contexto",value:78,color:theme.colors.cyan},
          {label:"Formato",value:88,color:theme.colors.green},
          {label:"Precisão",value:84,color:theme.colors.pink}
        ]
      }
    },
    {
      id:"diagram",
      kind:"diagram",
      title:"Anatomia de uma cena",
      duration:5,
      data:{
        center:"CENA",
        nodes:[
          {label:"Conteúdo",detail:"o que precisa ser entendido"},
          {label:"Layout",detail:"como organizar visualmente"},
          {label:"Movimento",detail:"como conduzir atenção"},
          {label:"Timing",detail:"quando cada elemento aparece"}
        ]
      }
    },
    {
      id:"errors",
      kind:"error",
      title:"Erros que quebram a aula",
      duration:5,
      data:{
        message:"A engine também precisa de limites claros.",
        errors:["Texto demais","Animação sem função","Hierarquia fraca","Muitos estilos na mesma cena"]
      }
    },
    {
      id:"quiz",
      kind:"quiz",
      title:"Teste rápido",
      duration:5,
      data:{
        question:"Qual é a função principal do template?",
        options:["Escolher o conteúdo","Definir uma linguagem visual reutilizável","Gravar o áudio","Publicar o vídeo"],
        answer:1
      }
    },
    {
      id:"challenge",
      kind:"challenge",
      title:"Hora de criar",
      duration:5,
      data:{
        mission:"Transforme um conceito em uma cena animada.",
        tasks:["Escolha o template","Defina os dados","Ajuste o timing","Renderize e revise"],
        cta:"CRIAR CENA"
      }
    },
    {
      id:"summary",
      kind:"summary",
      title:"O motor em 4 ideias",
      duration:5,
      data:{items:["Conteúdo separado de layout","Templates reutilizáveis","Animações consistentes","Aulas descritas por dados"]}
    }
  ]
};
