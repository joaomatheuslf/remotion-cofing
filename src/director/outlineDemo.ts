import {compileLesson} from "./compileLesson";
import {parseOutline} from "./parseOutline";

const outline = `
## [open] Prompt Forge
kicker: AULA ANIMADA
subtitle: Do pedido vago a uma instrução clara para IA.

## [explain] O que é um prompt?
- É a instrução que orienta o comportamento da IA.
- Define o objetivo.
- Fornece contexto.
- Indica o formato de saída.

## [decompose] Anatomia de um prompt
- Atue como especialista em educação.
- Crie uma aula introdutória sobre IA.
- O público é iniciante e trabalha no setor público.
- Entregue em tópicos curtos com exemplos.

## [sequence] Como a instrução vira resposta
- Você escreve o pedido.
- A IA recebe contexto e instruções.
- O modelo processa os sinais.
- A resposta é construída.

## [debug] Quando o resultado sai ruim
subtitle: Muitas falhas começam antes da geração.
- Pedido ambíguo.
- Contexto insuficiente.
- Restrições contraditórias.
- Muitas tarefas de uma vez.

## [practice] Missão final
cta: FORJAR PROMPT
- Pegue um pedido vago e transforme-o em um prompt estruturado.
- Defina o papel.
- Defina o objetivo.
- Adicione contexto.
- Escolha o formato de saída.

## [recap] Em uma frase
- Diga o que quer.
- Dê o contexto necessário.
- Mostre como a resposta deve vir.
- Refine depois de testar.
`;

export const outlineDemoLesson = compileLesson(
  parseOutline(outline, "Prompt Forge — Outline Demo", "outline-demo")
);
