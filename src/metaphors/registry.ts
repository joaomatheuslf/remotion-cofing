export type MetaphorDefinition = {id:string;intent:string[];description:string;renderer?:string};
const m=(id:string,intent:string[],description:string,renderer?:string):MetaphorDefinition=>({id,intent,description,renderer});

export const metaphorRegistry:MetaphorDefinition[] = [
  m("token-flow",["flow","pipeline"],"algo atravessa um sistema","TokenFlowScene"),
  m("prompt-builder",["assembly","decompose"],"estrutura montada por peças","PromptBuilderScene"),
  m("context-window",["capacity","memory"],"capacidade limitada","ContextWindowScene"),
  m("queue",["queue","async"],"itens processados em fila","QueueScene"),
  m("counter-grid",["scale","count"],"quantidade ganha escala visual","CounterGridScene"),
  m("funnel",["filter","conversion"],"muitos entram, poucos saem"),
  m("pipeline",["flow","process"],"etapas sequenciais conectadas"),
  m("stack",["layers"],"camadas empilhadas"),
  m("layers",["architecture"],"sistema em níveis"),
  m("network",["relations"],"nós conectados"),
  m("tree",["hierarchy"],"hierarquia ramificada"),
  m("branching",["decision"],"um caminho se divide"),
  m("scale-balance",["tradeoff"],"comparar pesos e compromissos"),
  m("race",["speed","competition"],"duas opções avançam em ritmos diferentes"),
  m("ranking",["priority"],"itens sobem/descem por prioridade"),
  m("spotlight",["focus"],"um elemento é destacado"),
  m("magnifier",["inspect"],"zoom em detalhe importante"),
  m("xray",["inside"],"revelar interior/processo oculto"),
  m("assembly-line",["process"],"itens passam por estações"),
  m("memory-slots",["memory"],"slots ocupados/liberados"),
  m("before-after-morph",["transform"],"um estado morfa em outro"),
  m("zoom-into",["drilldown"],"aproximação progressiva"),
  m("cause-effect",["causality"],"causa dispara efeito"),
  m("feedback-loop",["iteration"],"ciclo de melhoria"),
  m("traffic",["load"],"congestionamento e throughput"),
  m("lock-key",["security"],"acesso/liberação"),
  m("shield",["protection"],"bloqueio/defesa"),
  m("bridge",["integration"],"conectar dois sistemas"),
  m("maze",["problem-solving"],"buscar caminho entre obstáculos"),
  m("decision-tree",["decision"],"escolhas condicionais"),
];

export const getMetaphor = (id:string) => metaphorRegistry.find(x=>x.id===id);
export const implementedMetaphors = () => metaphorRegistry.filter(x=>x.renderer);
