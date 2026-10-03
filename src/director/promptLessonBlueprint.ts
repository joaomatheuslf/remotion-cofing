import {LessonBlueprint} from "./types";

export const promptLessonBlueprint: LessonBlueprint = {
  id: "prompt-director-demo",
  designerId: "clean-tech",
  mode:"demo",
  title: "Prompt — do pedido ao comando",
  segments: [
    {
      id: "open",
      intent: "open",
      title: "PROMPT",
      subtitle: "Como transformar intenção em uma instrução clara para a IA.",
      kicker: "PROMPT FORGE",
    },
    {
      id: "definition",
      intent: "explain",
      title: "O que é um prompt?",
      content: [
        "É a instrução que orienta o que a IA deve fazer.",
        "Diga o objetivo",
        "Dê contexto",
        "Defina a forma de saída",
      ],
    },
    {
      id: "anatomy",
      intent: "decompose",
      title: "Anatomia de um prompt",
      content: [
        "Atue como especialista em educação",
        "Crie uma aula introdutória sobre IA",
        "para servidores públicos sem experiência prévia",
        "entregue em tópicos curtos com exemplos",
      ],
    },
    {
      id: "flow",
      intent: "sequence",
      title: "O caminho da instrução",
      content: [
        "Você descreve o pedido",
        "O modelo recebe o contexto",
        "A instrução é processada",
        "A resposta é construída",
      ],
    },
    {
      id: "compare",
      intent: "compare",
      title: "Vago ou específico?",
      left: {
        label: "VAGO",
        items: ["Sem objetivo claro","Pouco contexto","Formato indefinido"],
      },
      right: {
        label: "ESPECÍFICO",
        items: ["Tarefa definida","Contexto suficiente","Saída esperada"],
      },
    },
    {
      id: "debug",
      intent: "debug",
      title: "Por que prompts falham?",
      subtitle: "Nem sempre o problema é o modelo.",
      content: [
        "Pedido ambíguo",
        "Informações faltando",
        "Restrições contraditórias",
        "Muitas tarefas ao mesmo tempo",
      ],
    },
    {
      id: "quiz",
      intent: "check",
      title: "Teste rápido",
      quiz: {
        question: "Qual mudança tende a deixar o pedido mais controlável?",
        options: [
          "Adicionar palavras aleatórias",
          "Definir objetivo, contexto e formato",
          "Escrever tudo em caixa alta",
          "Remover detalhes da tarefa",
        ],
        answer: 1,
      },
    },
    {
      id: "challenge",
      intent: "practice",
      title: "Sua vez",
      content: [
        "Transforme um pedido vago em um prompt estruturado.",
        "Defina o papel",
        "Escreva o objetivo",
        "Adicione contexto",
        "Escolha o formato de saída",
      ],
      cta: "FORJAR PROMPT",
    },
    {
      id: "recap",
      intent: "recap",
      title: "O que levar daqui",
      content: [
        "Prompt é instrução",
        "Contexto reduz ambiguidade",
        "Formato orienta a saída",
        "Iterar faz parte do processo",
      ],
    },
  ],
};
