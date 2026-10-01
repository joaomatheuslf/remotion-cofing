import React from "react";
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from "remotion";
import {BigTitle, Panel, Tag} from "../components/ui";
import {pop, slideY} from "../engine/motion";
import {theme} from "../engine/theme";

type Part = {text:string; label:string; color:string};

export const PromptAnatomy: React.FC<{title?:string; parts:Part[]}> = ({
  title="Anatomia do Prompt",
  parts
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{
      background:theme.colors.bg,
      padding:52,
      fontFamily:"Inter, Arial, sans-serif",
      overflow:"hidden"
    }}>
      <BigTitle>{title}</BigTitle>

      <div style={{display:"grid",gridTemplateColumns:"1.45fr .75fr",gap:34,marginTop:42}}>
        <Panel>
          <div style={{fontWeight:900,fontSize:22,marginBottom:20}}>PROMPT</div>
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {parts.map((p,i)=>{
              const start = Math.round((1+i*.85)*fps);
              const s = pop(frame,fps,start);
              return (
                <div key={p.label} style={{
                  transform:`translateY(${slideY(frame,fps,start,28)}px) scale(${.92 + s*.08})`,
                  opacity:s,
                  background:p.color,
                  border:theme.border,
                  borderRadius:16,
                  padding:"16px 18px",
                  fontWeight:800,
                  fontSize:27
                }}>{p.text}</div>
              )
            })}
          </div>
        </Panel>

        <div style={{display:"flex",flexDirection:"column",gap:22,justifyContent:"center"}}>
          {parts.map((p,i)=>{
            const start = Math.round((1.35+i*.85)*fps);
            const s = pop(frame,fps,start);
            return (
              <div key={p.label} style={{opacity:s,transform:`scale(${.85+s*.15})`}}>
                <Tag color={p.color}>{p.label.toUpperCase()}</Tag>
              </div>
            )
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
