import React from "react";
import {Scene} from "./types";
import {PixelScene} from "../pixel/PixelScene";
import {useDesigner} from "../designers/DesignerProvider";
import {getDesignerSceneOverride} from "../designers/sceneOverrides";
import {PromptAnatomy} from "../templates/PromptAnatomy";
import {BadVsGood} from "../templates/BadVsGood";
import {GameSimulationScene} from "../templates/GameSimulation";
import {
  ContextWindowScene,
  CounterGridScene,
  PromptBuilderScene,
  QueueScene,
  TokenFlowScene,
} from "../templates/MetaphorScenes";
import {
  BeforeAfterScene,
  ChallengeScene,
  ComparisonScene,
  DiagramScene,
  ErrorScene,
  ExplainScene,
  ProcessScene,
  QuizScene,
  SimulationScene,
  SummaryScene,
  TimelineScene,
  TitleScene,
} from "../templates/GenericTemplates";

export const SceneRenderer: React.FC<{scene:Scene;demo?:boolean}> = ({scene,demo=false}) => {
  const data = scene.data ?? {};
  const designer=useDesigner();
  if(!demo||designer.id==="pixel-night") return <PixelScene scene={scene}/>;
  const DesignerOverride=getDesignerSceneOverride(designer.id,scene.kind);

  if(DesignerOverride){
    return <DesignerOverride scene={scene}/>;
  }

  switch(scene.kind){
    case "title":
      return <TitleScene
        title={scene.title}
        subtitle={data.subtitle ? String(data.subtitle) : undefined}
        kicker={data.kicker ? String(data.kicker) : undefined}
      />;

    case "explain":
      return <ExplainScene
        title={scene.title}
        lead={data.lead ? String(data.lead) : undefined}
        bullets={(data.bullets ?? []) as string[]}
      />;

    case "prompt-anatomy":
      return <PromptAnatomy
        title={scene.title}
        parts={(data.parts ?? []) as Array<{text:string;label:string;color:string}>}
      />;

    case "bad-vs-good":
      return <BadVsGood
        bad={String(data.bad ?? "")}
        good={String(data.good ?? "")}
      />;

    case "process":
      return <ProcessScene
        title={scene.title}
        steps={(data.steps ?? []) as Array<{label:string;detail?:string}>}
      />;

    case "comparison":
      return <ComparisonScene
        title={scene.title}
        left={(data.left ?? {label:"A",items:[]}) as {label:string;items:string[]}}
        right={(data.right ?? {label:"B",items:[]}) as {label:string;items:string[]}}
      />;

    case "timeline":
      return <TimelineScene
        title={scene.title}
        items={(data.items ?? []) as Array<{label:string;title:string;detail?:string}>}
      />;

    case "before-after":
      return <BeforeAfterScene
        title={scene.title}
        before={(data.before ?? {title:"ANTES",body:""}) as {title:string;body:string}}
        after={(data.after ?? {title:"DEPOIS",body:""}) as {title:string;body:string}}
      />;

    case "simulation":
      return <SimulationScene
        title={scene.title}
        status={data.status ? String(data.status) : undefined}
        metrics={(data.metrics ?? []) as Array<{label:string;value:number;color?:string;note?:string}>}
      />;

    case "game-simulation":
      return <GameSimulationScene
        title={scene.title}
        dialogue={data.dialogue ? String(data.dialogue) : undefined}
        characterState={(data.characterState ?? "thinking") as "idle"|"thinking"|"happy"|"warning"}
        metrics={(data.metrics ?? []) as Array<{label:string;value:number;color?:string;note?:string}>}
      />;

    case "token-flow":
      return <TokenFlowScene
        title={scene.title}
        input={String(data.input ?? "")}
        tokens={(data.tokens ?? []) as string[]}
        output={String(data.output ?? "")}
        modelLabel={data.modelLabel ? String(data.modelLabel) : undefined}
      />;

    case "prompt-builder":
      return <PromptBuilderScene
        title={scene.title}
        parts={(data.parts ?? []) as string[]}
        result={data.result ? String(data.result) : undefined}
      />;

    case "context-window":
      return <ContextWindowScene
        title={scene.title}
        items={(data.items ?? []) as string[]}
        capacity={typeof data.capacity === "number" ? data.capacity : undefined}
        label={data.label ? String(data.label) : undefined}
      />;

    case "queue":
      return <QueueScene
        title={scene.title}
        items={(data.items ?? []) as string[]}
        processor={data.processor ? String(data.processor) : undefined}
        outputLabel={data.outputLabel ? String(data.outputLabel) : undefined}
      />;

    case "counter-grid":
      return <CounterGridScene
        title={scene.title}
        value={typeof data.value === "number" ? data.value : 0}
        label={String(data.label ?? "")}
        unit={data.unit ? String(data.unit) : undefined}
        cells={typeof data.cells === "number" ? data.cells : undefined}
      />;

    case "diagram":
      return <DiagramScene
        title={scene.title}
        center={String(data.center ?? "IDEIA")}
        nodes={(data.nodes ?? []) as Array<{label:string;detail?:string;color?:string}>}
      />;

    case "error":
      return <ErrorScene
        title={scene.title}
        message={data.message ? String(data.message) : undefined}
        errors={(data.errors ?? []) as string[]}
      />;

    case "quiz":
      return <QuizScene
        title={scene.title}
        question={String(data.question ?? "")}
        options={(data.options ?? []) as string[]}
        answer={typeof data.answer === "number" ? data.answer : undefined}
      />;

    case "challenge":
      return <ChallengeScene
        title={scene.title}
        mission={String(data.mission ?? "")}
        tasks={(data.tasks ?? []) as string[]}
        cta={data.cta ? String(data.cta) : undefined}
      />;

    case "summary":
      return <SummaryScene
        title={scene.title}
        items={(data.items ?? []) as string[]}
      />;

    default: {
      const neverScene: never = scene.kind;
      return <div style={{padding:50,fontSize:48}}>
        Template não implementado: {String(neverScene)}
      </div>;
    }
  }
};
