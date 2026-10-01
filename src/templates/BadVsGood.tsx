import React from "react";
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from "remotion";
import {BigTitle, Panel, Tag} from "../components/ui";
import {pop} from "../engine/motion";
import {theme} from "../engine/theme";

export const BadVsGood: React.FC<{bad:string; good:string}> = ({bad,good}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const a = pop(frame,fps,18);
  const b = pop(frame,fps,42);

  return (
    <AbsoluteFill style={{background:theme.colors.bg,padding:52,fontFamily:"Inter, Arial, sans-serif"}}>
      <BigTitle>Prompt ruim vs prompt bom</BigTitle>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:34,marginTop:52}}>
        <div style={{opacity:a,transform:`scale(${.92+a*.08})`}}>
          <Panel style={{minHeight:470}}>
            <Tag color={theme.colors.red}>✕ PROMPT RUIM</Tag>
            <div style={{fontSize:35,fontWeight:900,marginTop:34}}>{bad}</div>
            <div style={{marginTop:44,fontSize:24,lineHeight:1.4}}>
              Vago • pouco contexto • saída imprevisível
            </div>
          </Panel>
        </div>
        <div style={{opacity:b,transform:`scale(${.92+b*.08})`}}>
          <Panel style={{minHeight:470}}>
            <Tag color={theme.colors.green}>✓ PROMPT BOM</Tag>
            <div style={{fontSize:31,fontWeight:900,marginTop:34}}>{good}</div>
            <div style={{marginTop:44,fontSize:24,lineHeight:1.4}}>
              Objetivo claro • contexto • formato definido
            </div>
          </Panel>
        </div>
      </div>
    </AbsoluteFill>
  );
};
