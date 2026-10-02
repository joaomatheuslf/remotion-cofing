import React from "react";
import {AbsoluteFill,interpolate,useCurrentFrame,useVideoConfig} from "remotion";
import {transitionByDesigner,transitionPresets} from "./registry";
import {useDesigner} from "../designers/DesignerProvider";
import {theme} from "../engine/theme";

export const TransitionOverlay:React.FC<{sceneDurationSeconds:number;disabled?:boolean}> = ({sceneDurationSeconds,disabled}) => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const designer=useDesigner();
  if(disabled) return null;
  const id=transitionByDesigner[designer.id];
  const preset=transitionPresets[id];
  const start=Math.max(0,sceneDurationSeconds-preset.duration);
  const p=interpolate(frame/fps,[start,sceneDurationSeconds],[0,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  if(p<=0) return null;

  if(id==="pixel-wipe" || id==="panel-snap" || id==="shape-wipe"){
    return <AbsoluteFill style={{pointerEvents:"none",display:"grid",gridTemplateColumns:"repeat(8,1fr)"}}>
      {Array.from({length:8}).map((_,i)=><div key={i} style={{background:theme.colors.ink,transform:"scaleY("+Math.max(0,Math.min(1,p*1.5-i*.07))+")",transformOrigin:i%2?"bottom":"top"}} />)}
    </AbsoluteFill>;
  }

  if(id==="terminal-clear" || id==="chalk-erase" || id==="draw-lines"){
    return <AbsoluteFill style={{pointerEvents:"none",background:theme.colors.bg,transform:"translateY("+((1-p)*100)+"%)"}}/>;
  }

  if(id==="neon-glitch"){
    return <AbsoluteFill style={{pointerEvents:"none",background:p>.72?theme.colors.pink:theme.colors.cyan,opacity:p*.9,transform:"translateX("+Math.sin(frame*2)*10+"px)"}}/>;
  }

  return <AbsoluteFill style={{pointerEvents:"none",background:id==="paper-cover"?theme.colors.cream:theme.colors.bg,opacity:p}}/>;
};
