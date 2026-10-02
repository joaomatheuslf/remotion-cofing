import React from "react";
import {interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {theme} from "../engine/theme";
import {
  ArrowTrack,
  FlowNode,
  MetaphorShell,
  TokenChip,
  useEnter,
  useLinearProgress,
} from "../components/MetaphorKit";

const palette=[
  theme.colors.yellow,
  theme.colors.cyan,
  theme.colors.green,
  theme.colors.pink,
];

export const TokenFlowScene: React.FC<{
  title:string;
  input:string;
  tokens:string[];
  output:string;
  modelLabel?:string;
}> = ({
  title,
  input,
  tokens,
  output,
  modelLabel="MODELO IA",
}) => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const inP=useEnter(.15);
  const modelP=useEnter(.55);
  const outP=useEnter(3.4);

  const pathStart=1.0;
  const tokenDuration=2.2;

  return (
    <MetaphorShell title={title} eyebrow="FLUXO DE TOKENS">
      <div style={{position:"absolute",inset:0}}>
        <div style={{position:"absolute",left:0,top:125,opacity:inP,transform:`scale(${.92+inP*.08})`}}>
          <FlowNode label="PROMPT" accent={theme.colors.yellow} width={260} height={210}>
            {input}
          </FlowNode>
        </div>

        <ArrowTrack left={270} top={220} width={225} progress={useLinearProgress(.7,.7)}/>

        <div style={{position:"absolute",left:500,top:95,opacity:modelP,transform:`scale(${.9+modelP*.1})`}}>
          <FlowNode label={modelLabel} accent={theme.colors.cyan} width={260} height={270}>
            <div>
              <div style={{
                width:96,height:96,borderRadius:24,
                margin:"0 auto 14px",
                border:"5px solid #101419",
                background:"#0f2443",
                display:"flex",alignItems:"center",justifyContent:"center",
                color:theme.colors.cyan,
                fontSize:50,
                boxShadow:"inset 0 0 0 8px rgba(53,216,255,.08)",
              }}>✦</div>
              PROCESSANDO
            </div>
          </FlowNode>
        </div>

        <ArrowTrack left={770} top={220} width={190} progress={useLinearProgress(3.0,.8)}/>

        <div style={{position:"absolute",right:0,top:125,opacity:outP,transform:`scale(${.92+outP*.08})`}}>
          <FlowNode label="SAÍDA" accent={theme.colors.green} width={260} height={210}>
            {output}
          </FlowNode>
        </div>

        {tokens.slice(0,6).map((token,i)=>{
          const delay=pathStart+i*.22;
          const local=interpolate(
            frame,
            [
              Math.round(delay*fps),
              Math.round((delay+tokenDuration)*fps),
            ],
            [0,1],
            {extrapolateLeft:"clamp",extrapolateRight:"clamp"}
          );

          const firstHalf=Math.min(1,local*2);
          const secondHalf=Math.max(0,(local-.5)*2);

          let x:number;
          let y:number;

          if(local<.5){
            x=255 + firstHalf*390;
            y=210 - Math.sin(firstHalf*Math.PI)*70 + (i%2)*20;
          }else{
            x=645 + secondHalf*330;
            y=210 + Math.sin(secondHalf*Math.PI)*58 - (i%2)*16;
          }

          const opacity=
            local<=.02 || local>=.98 ? .25 :
            local>.42 && local<.60 ? .45 : 1;

          return (
            <TokenChip
              key={token+i}
              text={token}
              color={palette[i%palette.length]}
              x={x}
              y={y}
              opacity={opacity}
              scale={.82+Math.sin(local*Math.PI)*.18}
            />
          );
        })}
      </div>
    </MetaphorShell>
  );
};

export const PromptBuilderScene: React.FC<{
  title:string;
  parts:string[];
  result?:string;
}> = ({title,parts,result="PROMPT ESTRUTURADO"}) => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();

  return (
    <MetaphorShell title={title} eyebrow="MONTAGEM">
      <div style={{
        display:"grid",
        gridTemplateColumns:"1fr 1.15fr",
        gap:48,
        height:"100%",
        alignItems:"center",
      }}>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {parts.slice(0,5).map((part,i)=>{
            const p=spring({
              frame:frame-Math.round((.35+i*.38)*fps),
              fps,
              config:{damping:13,stiffness:175,mass:.75},
            });
            const fly=interpolate(
              frame,
              [
                Math.round((1.9+i*.34)*fps),
                Math.round((2.7+i*.34)*fps),
              ],
              [0,1],
              {extrapolateLeft:"clamp",extrapolateRight:"clamp"}
            );

            return (
              <div key={part} style={{
                position:"relative",
                opacity:p*(1-fly*.35),
                transform:`translateX(${fly*430}px) scale(${.94+p*.06-fly*.12})`,
                zIndex:10-i,
              }}>
                <div style={{
                  padding:"14px 18px",
                  border:"4px solid #101419",
                  borderRadius:14,
                  boxShadow:"5px 5px 0 #101419",
                  background:palette[i%palette.length],
                  color:theme.colors.ink,
                  fontSize:22,
                  fontWeight:900,
                  lineHeight:1.15,
                }}>
                  <span style={{opacity:.55,marginRight:10}}>{String(i+1).padStart(2,"0")}</span>
                  {part}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{position:"relative",height:440}}>
          <div style={{
            position:"absolute",left:25,right:10,top:45,bottom:45,
            border:"6px solid #101419",
            borderRadius:30,
            boxShadow:"10px 10px 0 #101419",
            background:"#132544",
            overflow:"hidden",
          }}>
            <div style={{
              height:62,
              background:theme.colors.yellow,
              color:theme.colors.ink,
              borderBottom:"6px solid #101419",
              display:"flex",alignItems:"center",
              padding:"0 20px",
              fontWeight:950,
              fontSize:22,
            }}>PROMPT FORGE</div>

            <div style={{
              position:"absolute",left:40,right:40,top:100,bottom:92,
              display:"flex",flexDirection:"column",justifyContent:"center",gap:12,
            }}>
              {parts.slice(0,5).map((part,i)=>{
                const reveal=interpolate(
                  frame,
                  [
                    Math.round((2.45+i*.34)*fps),
                    Math.round((2.85+i*.34)*fps),
                  ],
                  [0,1],
                  {extrapolateLeft:"clamp",extrapolateRight:"clamp"}
                );
                return (
                  <div key={part+i} style={{
                    height:34,
                    borderRadius:8,
                    border:"3px solid #101419",
                    background:palette[i%palette.length],
                    opacity:reveal,
                    transform:`scaleX(${reveal})`,
                    transformOrigin:"left center",
                  }}/>
                );
              })}
            </div>

            <div style={{
              position:"absolute",left:34,right:34,bottom:24,
              border:"4px solid #101419",
              borderRadius:12,
              background:theme.colors.green,
              color:theme.colors.ink,
              padding:"12px 14px",
              textAlign:"center",
              fontWeight:950,
              fontSize:20,
              opacity:interpolate(frame,[Math.round(4.0*fps),Math.round(4.5*fps)],[0,1],{
                extrapolateLeft:"clamp",extrapolateRight:"clamp"
              }),
            }}>{result} ✓</div>
          </div>
        </div>
      </div>
    </MetaphorShell>
  );
};

export const ContextWindowScene: React.FC<{
  title:string;
  items:string[];
  capacity?:number;
  label?:string;
}> = ({title,items,capacity=8,label="JANELA DE CONTEXTO"}) => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const slots=Math.max(4,Math.min(12,capacity));
  const visible=items.slice(0,12);

  return (
    <MetaphorShell title={title} eyebrow="CAPACIDADE">
      <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:40,height:"100%",alignItems:"center"}}>
        <div style={{
          height:430,
          border:"6px solid #101419",
          borderRadius:28,
          boxShadow:"10px 10px 0 #101419",
          background:"#112441",
          padding:28,
          boxSizing:"border-box",
          position:"relative",
        }}>
          <div style={{fontSize:20,fontWeight:950,letterSpacing:1.4,color:theme.colors.cyan,marginBottom:18}}>
            {label}
          </div>

          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(4, 1fr)",
            gap:12,
          }}>
            {Array.from({length:slots}).map((_,i)=>{
              const item=visible[i];
              const p=item ? spring({
                frame:frame-Math.round((.5+i*.23)*fps),
                fps,
                config:{damping:14,stiffness:170,mass:.75},
              }) : 0;
              return (
                <div key={i} style={{
                  height:66,
                  border:"4px solid #101419",
                  borderRadius:12,
                  background:item ? palette[i%palette.length] : "#213450",
                  opacity:item ? .35+.65*p : .45,
                  transform:`scale(${item ? .85+p*.15 : 1})`,
                  color:theme.colors.ink,
                  fontSize:14,
                  fontWeight:950,
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  textAlign:"center",
                  padding:6,
                  boxSizing:"border-box",
                  overflow:"hidden",
                }}>{item ?? ""}</div>
              );
            })}
          </div>

          <div style={{
            position:"absolute",left:28,right:28,bottom:24,
            height:30,border:"4px solid #101419",borderRadius:999,
            overflow:"hidden",background:"#20324d",
          }}>
            <div style={{
              height:"100%",
              width:`${Math.min(100,(visible.length/slots)*100)}%`,
              background:visible.length>=slots ? theme.colors.red : theme.colors.green,
            }}/>
          </div>
        </div>

        <div>
          <div style={{
            border:"5px solid #101419",
            borderRadius:22,
            boxShadow:"8px 8px 0 #101419",
            background:"#fff4da",
            color:theme.colors.ink,
            padding:24,
          }}>
            <div style={{fontSize:18,fontWeight:950,opacity:.55}}>OCUPAÇÃO</div>
            <div style={{fontFamily:"Arial Black, Arial",fontSize:74,lineHeight:1,marginTop:10}}>
              {Math.min(visible.length,slots)}/{slots}
            </div>
            <div style={{fontSize:21,fontWeight:900,marginTop:18,lineHeight:1.25}}>
              {visible.length>=slots
                ? "A janela chegou ao limite."
                : "Ainda existe espaço para contexto."}
            </div>
          </div>

          {visible.length>slots ? (
            <div style={{
              marginTop:22,
              border:"5px solid #101419",
              borderRadius:18,
              background:theme.colors.red,
              color:"white",
              padding:18,
              boxShadow:"7px 7px 0 #101419",
              fontWeight:950,
              fontSize:20,
            }}>
              +{visible.length-slots} item(ns) ficaram de fora
            </div>
          ) : null}
        </div>
      </div>
    </MetaphorShell>
  );
};

export const QueueScene: React.FC<{
  title:string;
  items:string[];
  processor?:string;
  outputLabel?:string;
}> = ({title,items,processor="PROCESSADOR",outputLabel="CONCLUÍDO"}) => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const step=Math.max(1,Math.floor(frame/(fps*.8)));
  const processed=Math.min(items.length,Math.max(0,step-1));

  return (
    <MetaphorShell title={title} eyebrow="FILA / PROCESSAMENTO">
      <div style={{position:"absolute",inset:0}}>
        <div style={{position:"absolute",left:0,top:130,width:430}}>
          <div style={{fontSize:18,fontWeight:950,color:theme.colors.cyan,marginBottom:14}}>FILA</div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {items.slice(0,5).map((item,i)=>{
              const active=i===processed;
              const done=i<processed;
              return (
                <div key={item+i} style={{
                  padding:"14px 16px",
                  border:"4px solid #101419",
                  borderRadius:13,
                  background:done ? "#20314d" : active ? theme.colors.yellow : "#fff4da",
                  color:done ? "#8ea0ba" : theme.colors.ink,
                  boxShadow:active ? "6px 6px 0 #101419" : "3px 3px 0 #101419",
                  fontWeight:900,
                  fontSize:20,
                  transform:`translateX(${done ? -24 : active ? 18 : 0}px)`,
                  opacity:done ? .45 : 1,
                }}>{done ? "✓ " : active ? "▶ " : "• "}{item}</div>
              );
            })}
          </div>
        </div>

        <ArrowTrack left={430} top={300} width={170} progress={1}/>

        <div style={{position:"absolute",left:610,top:170}}>
          <FlowNode label={processor} accent={theme.colors.pink} width={250} height={250}>
            <div>
              <div style={{fontSize:58,marginBottom:12}}>⚙</div>
              {processed<items.length ? items[processed] ?? "AGUARDANDO" : "FILA VAZIA"}
            </div>
          </FlowNode>
        </div>

        <ArrowTrack left={865} top={300} width={110} progress={1}/>

        <div style={{
          position:"absolute",right:0,top:208,
          width:140,height:160,
          border:"5px solid #101419",
          borderRadius:20,
          background:theme.colors.green,
          color:theme.colors.ink,
          boxShadow:"7px 7px 0 #101419",
          display:"flex",flexDirection:"column",
          alignItems:"center",justifyContent:"center",
        }}>
          <div style={{fontFamily:"Arial Black, Arial",fontSize:54}}>{processed}</div>
          <div style={{fontWeight:950,fontSize:15,textAlign:"center"}}>{outputLabel}</div>
        </div>
      </div>
    </MetaphorShell>
  );
};

export const CounterGridScene: React.FC<{
  title:string;
  value:number;
  label:string;
  unit?:string;
  cells?:number;
}> = ({title,value,label,unit="",cells=60}) => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const progress=interpolate(
    frame,
    [Math.round(.5*fps),Math.round(4.6*fps)],
    [0,1],
    {extrapolateLeft:"clamp",extrapolateRight:"clamp"}
  );
  const current=Math.round(value*progress);
  const filled=Math.round(cells*progress);

  return (
    <MetaphorShell title={title} eyebrow="CONTADOR VISUAL">
      <div style={{display:"grid",gridTemplateColumns:"1fr 420px",gap:44,height:"100%",alignItems:"center"}}>
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(10,1fr)",
          gap:10,
          padding:22,
          border:"5px solid #101419",
          borderRadius:24,
          background:"#10203a",
          boxShadow:"8px 8px 0 #101419",
        }}>
          {Array.from({length:cells}).map((_,i)=>(
            <div key={i} style={{
              aspectRatio:"1/1",
              border:"3px solid #101419",
              borderRadius:8,
              background:i<filled ? palette[i%palette.length] : "#243651",
              transform:`scale(${i<filled ? 1 : .86})`,
              opacity:i<filled ? 1 : .35,
            }}/>
          ))}
        </div>

        <div>
          <div style={{
            padding:28,
            border:"6px solid #101419",
            borderRadius:26,
            background:"#fff4da",
            color:theme.colors.ink,
            boxShadow:"10px 10px 0 #101419",
          }}>
            <div style={{fontSize:18,fontWeight:950,opacity:.55}}>TOTAL</div>
            <div style={{
              fontFamily:"Arial Black, Arial",
              fontSize:78,
              lineHeight:.95,
              letterSpacing:-3,
              marginTop:12,
              wordBreak:"break-word",
            }}>{current.toLocaleString("pt-BR")}</div>
            <div style={{fontSize:28,fontWeight:950,marginTop:16}}>{unit}</div>
            <div style={{
              marginTop:24,
              paddingTop:20,
              borderTop:"4px solid #101419",
              fontSize:23,fontWeight:900,lineHeight:1.2,
            }}>{label}</div>
          </div>
        </div>
      </div>
    </MetaphorShell>
  );
};
