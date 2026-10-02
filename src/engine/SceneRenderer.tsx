import React from "react";
import {Scene} from "./types";
import {PromptAnatomy} from "../templates/PromptAnatomy";
import {BadVsGood} from "../templates/BadVsGood";
import {GameSimulationScene} from "../templates/GameSimulation";
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

export const SceneRenderer: React.FC<{scene:Scene}> = ({scene}) => {
  const data = scene.data ?? {};

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
