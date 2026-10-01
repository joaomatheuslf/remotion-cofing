import React from "react";
import {Scene} from "./types";
import {PromptAnatomy} from "../templates/PromptAnatomy";
import {BadVsGood} from "../templates/BadVsGood";

export const SceneRenderer: React.FC<{scene:Scene}> = ({scene}) => {
  const data = scene.data ?? {};

  switch(scene.kind){
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
    default:
      return <div style={{padding:50,fontSize:48}}>Template ainda não implementado: {scene.kind}</div>;
  }
};
