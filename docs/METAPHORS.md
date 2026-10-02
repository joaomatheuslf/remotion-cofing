# Biblioteca de metáforas visuais

Esses templates existem para explicar conceitos por **movimento e transformação**, e não apenas por cards animados.

## 1. token-flow

Use quando a ideia envolve algo atravessando um sistema.

Exemplos:
- prompt → tokens → modelo → resposta;
- dado → pipeline → banco;
- requisição → API → retorno.

Blueprint:

```ts
{
  intent: "sequence",
  metaphor: "token-flow",
  title: "Como o prompt atravessa o modelo",
  input: "Explique redes neurais",
  tokens: ["Explique","redes","neurais"],
  output: "Resposta gerada"
}
```

## 2. prompt-builder

Use quando o conceito é montado por peças.

Exemplos:
- anatomia de prompt;
- componentes de uma arquitetura;
- elementos de uma política;
- ingredientes de uma estratégia.

```ts
{
  intent: "decompose",
  metaphor: "prompt-builder",
  content: [
    "Papel",
    "Objetivo",
    "Contexto",
    "Formato"
  ]
}
```

## 3. context-window

Use para capacidade, limite, memória ou saturação.

Exemplos:
- context window;
- limite de tokens;
- memória de trabalho;
- capacidade de fila;
- orçamento.

```ts
{
  intent: "simulate",
  metaphor: "context-window",
  capacity: 8,
  content: ["system","histórico","arquivo","mensagem"]
}
```

## 4. queue

Use quando itens são processados um de cada vez.

Exemplos:
- fila de jobs;
- agentes executando tarefas;
- pedidos;
- tickets;
- processamento assíncrono.

```ts
{
  intent: "sequence",
  metaphor: "queue",
  content: ["Pesquisar","Resumir","Gerar","Revisar"]
}
```

## 5. counter-grid

Use quando a escala numérica precisa ser sentida visualmente.

Exemplos:
- repetições;
- quantidade de chamadas;
- tokens processados;
- acessos;
- economia acumulada.

```ts
{
  intent: "simulate",
  metaphor: "counter-grid",
  value: 200750,
  unit: "vezes",
  content: ["repetições acumuladas"]
}
```

## Regra de direção

Prefira metáfora quando a fala contiver:

- fluxo;
- transformação;
- capacidade;
- fila;
- acúmulo;
- repetição;
- montagem;
- causa e efeito visível.

Se a informação puder ser compreendida apenas lendo cards, use os templates normais. Se o movimento **explica** a ideia, use uma metáfora.
