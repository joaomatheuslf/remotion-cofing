import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {BigTitle, Panel, Tag} from "../components/ui";
import {theme} from "../engine/theme";

const bodyFont = "Inter, Arial, sans-serif";
const titleFont = "Arial Black, Arial, sans-serif";

const appear = (frame:number, fps:number, delayFrames:number) =>
  spring({
    frame: frame - delayFrames,
    fps,
    config: {damping: 14, stiffness: 170, mass: 0.75},
  });

const Reveal: React.FC<React.PropsWithChildren<{
  index?: number;
  delay?: number;
  style?: React.CSSProperties;
}>> = ({children, index=0, delay=0, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = appear(frame, fps, Math.round(delay * fps) + index * Math.round(.18 * fps));
  return (
    <div style={{
      opacity: p,
      transform: `translateY(${(1-p)*28}px) scale(${.96+p*.04})`,
      ...style,
    }}>
      {children}
    </div>
  );
};

const SceneShell: React.FC<React.PropsWithChildren<{
  title:string;
  eyebrow?:string;
}>> = ({title, eyebrow, children}) => (
  <AbsoluteFill style={{
    background:
      "radial-gradient(circle at 85% 10%, rgba(53,216,255,.12), transparent 34%), radial-gradient(circle at 10% 90%, rgba(255,104,190,.10), transparent 38%), #081426",
    padding:52,
    fontFamily:bodyFont,
    color:theme.colors.white,
    overflow:"hidden",
  }}>
    {eyebrow ? <Tag color={theme.colors.yellow}>{eyebrow}</Tag> : null}
    <div style={{marginTop:eyebrow ? 22 : 0}}>
      <BigTitle>{title}</BigTitle>
    </div>
    <div style={{flex:1, minHeight:0, marginTop:38}}>{children}</div>
  </AbsoluteFill>
);

export const TitleScene: React.FC<{
  title:string;
  subtitle?:string;
  kicker?:string;
}> = ({title, subtitle, kicker="AULA ANIMADA"}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = appear(frame, fps, 6);
  const q = appear(frame, fps, 22);

  return (
    <AbsoluteFill style={{
      background:"linear-gradient(145deg,#071224 0%,#10284a 60%,#1b2146 100%)",
      padding:64,
      fontFamily:bodyFont,
      color:"white",
      justifyContent:"center",
    }}>
      <div style={{
        position:"absolute", inset:30,
        border:"3px solid rgba(53,216,255,.32)",
        borderRadius:28,
      }}/>
      <div style={{opacity:p, transform:`translateY(${(1-p)*35}px)`}}>
        <Tag color={theme.colors.cyan}>{kicker}</Tag>
        <div style={{
          marginTop:28,
          fontFamily:titleFont,
          fontSize:86,
          lineHeight:.96,
          letterSpacing:-4,
          textShadow:"7px 7px 0 #101419",
          maxWidth:900,
        }}>{title}</div>
      </div>
      {subtitle ? (
        <div style={{
          opacity:q,
          marginTop:30,
          fontSize:32,
          lineHeight:1.25,
          maxWidth:820,
          color:"#d9e7ff",
        }}>{subtitle}</div>
      ) : null}
      <div style={{
        position:"absolute", right:70, bottom:60,
        width:150, height:150, borderRadius:30,
        border:theme.border, boxShadow:theme.shadow,
        background:theme.colors.yellow,
        color:theme.colors.ink,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontFamily:titleFont, fontSize:62,
      }}>▶</div>
    </AbsoluteFill>
  );
};

export const ExplainScene: React.FC<{
  title:string;
  lead?:string;
  bullets:string[];
}> = ({title, lead, bullets}) => (
  <SceneShell title={title} eyebrow="EXPLICAÇÃO">
    <div style={{display:"grid", gridTemplateColumns:"1.05fr .95fr", gap:34, height:"100%"}}>
      <Reveal>
        <Panel style={{height:"100%", display:"flex", alignItems:"center"}}>
          <div>
            <div style={{fontSize:22, fontWeight:900, opacity:.6}}>IDEIA CENTRAL</div>
            <div style={{fontSize:43, lineHeight:1.12, fontWeight:950, marginTop:18}}>
              {lead ?? "Transforme um conceito abstrato em uma ideia visual simples."}
            </div>
          </div>
        </Panel>
      </Reveal>
      <div style={{display:"flex", flexDirection:"column", gap:18, justifyContent:"center"}}>
        {bullets.map((b,i)=>(
          <Reveal key={b} index={i} delay={.35}>
            <Panel style={{padding:22, display:"flex", gap:18, alignItems:"center"}}>
              <div style={{
                minWidth:48,height:48,borderRadius:12,border:theme.border,
                background:[theme.colors.yellow,theme.colors.cyan,theme.colors.green,theme.colors.pink][i%4],
                display:"flex",alignItems:"center",justifyContent:"center",fontWeight:950,fontSize:22,
              }}>{i+1}</div>
              <div style={{fontSize:26,fontWeight:850,lineHeight:1.2}}>{b}</div>
            </Panel>
          </Reveal>
        ))}
      </div>
    </div>
  </SceneShell>
);

export const ProcessScene: React.FC<{
  title:string;
  steps:Array<{label:string;detail?:string}>;
}> = ({title, steps}) => (
  <SceneShell title={title} eyebrow="PROCESSO">
    <div style={{display:"flex", alignItems:"center", justifyContent:"center", height:"100%", gap:16}}>
      {steps.map((step,i)=>(
        <React.Fragment key={step.label}>
          <Reveal index={i}>
            <Panel style={{
              width: Math.max(160, 820/steps.length),
              minHeight:230,
              display:"flex",
              flexDirection:"column",
              justifyContent:"space-between",
              padding:22,
            }}>
              <Tag color={[theme.colors.yellow,theme.colors.cyan,theme.colors.green,theme.colors.pink][i%4]}>
                {String(i+1).padStart(2,"0")}
              </Tag>
              <div style={{fontSize:29,fontWeight:950,lineHeight:1.05,marginTop:26}}>{step.label}</div>
              {step.detail ? <div style={{fontSize:19,lineHeight:1.25,marginTop:15,opacity:.75}}>{step.detail}</div> : null}
            </Panel>
          </Reveal>
          {i < steps.length-1 ? (
            <Reveal index={i} delay={.18}>
              <div style={{fontSize:44,fontWeight:950,color:theme.colors.yellow}}>→</div>
            </Reveal>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  </SceneShell>
);

export const ComparisonScene: React.FC<{
  title:string;
  left:{label:string;items:string[]};
  right:{label:string;items:string[]};
}> = ({title,left,right}) => (
  <SceneShell title={title} eyebrow="COMPARAÇÃO">
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:36,height:"100%"}}>
      {[left,right].map((side,idx)=>(
        <Reveal key={side.label} index={idx}>
          <Panel style={{height:"100%"}}>
            <Tag color={idx===0 ? theme.colors.red : theme.colors.green}>{side.label}</Tag>
            <div style={{display:"flex",flexDirection:"column",gap:18,marginTop:32}}>
              {side.items.map((item,i)=>(
                <div key={item} style={{
                  border:"3px solid #101419",
                  borderRadius:14,
                  padding:"16px 18px",
                  background:idx===0 ? "#fff0ed" : "#eafff1",
                  fontSize:25,
                  fontWeight:850,
                }}>
                  {idx===0 ? "✕" : "✓"} &nbsp;{item}
                </div>
              ))}
            </div>
          </Panel>
        </Reveal>
      ))}
    </div>
  </SceneShell>
);

export const TimelineScene: React.FC<{
  title:string;
  items:Array<{label:string;title:string;detail?:string}>;
}> = ({title,items}) => (
  <SceneShell title={title} eyebrow="LINHA DO TEMPO">
    <div style={{position:"relative",height:"100%",padding:"35px 10px 0"}}>
      <div style={{
        position:"absolute",left:60,right:60,top:108,height:8,
        background:theme.colors.cream,border:"3px solid #101419",borderRadius:999,
      }}/>
      <div style={{display:"grid",gridTemplateColumns:`repeat(${items.length},1fr)`,gap:18}}>
        {items.map((item,i)=>(
          <Reveal key={item.label} index={i}>
            <div style={{textAlign:"center"}}>
              <div style={{
                width:36,height:36,borderRadius:"50%",margin:"0 auto 24px",
                background:[theme.colors.yellow,theme.colors.cyan,theme.colors.green,theme.colors.pink][i%4],
                border:theme.border,position:"relative",zIndex:2,
              }}/>
              <Tag color={[theme.colors.yellow,theme.colors.cyan,theme.colors.green,theme.colors.pink][i%4]}>{item.label}</Tag>
              <Panel style={{marginTop:20,padding:18,minHeight:180}}>
                <div style={{fontWeight:950,fontSize:24}}>{item.title}</div>
                {item.detail ? <div style={{fontSize:18,lineHeight:1.25,marginTop:13,opacity:.75}}>{item.detail}</div> : null}
              </Panel>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </SceneShell>
);

export const BeforeAfterScene: React.FC<{
  title:string;
  before:{title:string;body:string};
  after:{title:string;body:string};
}> = ({title,before,after}) => (
  <SceneShell title={title} eyebrow="ANTES / DEPOIS">
    <div style={{display:"grid",gridTemplateColumns:"1fr 100px 1fr",gap:22,alignItems:"center",height:"100%"}}>
      <Reveal>
        <Panel style={{minHeight:400}}>
          <Tag color={theme.colors.red}>{before.title}</Tag>
          <div style={{fontSize:34,fontWeight:900,lineHeight:1.2,marginTop:38}}>{before.body}</div>
        </Panel>
      </Reveal>
      <Reveal delay={.3} style={{textAlign:"center",fontSize:64,fontWeight:950,color:theme.colors.yellow}}>→</Reveal>
      <Reveal delay={.5}>
        <Panel style={{minHeight:400}}>
          <Tag color={theme.colors.green}>{after.title}</Tag>
          <div style={{fontSize:34,fontWeight:900,lineHeight:1.2,marginTop:38}}>{after.body}</div>
        </Panel>
      </Reveal>
    </div>
  </SceneShell>
);

export const SimulationScene: React.FC<{
  title:string;
  status?:string;
  metrics:Array<{label:string;value:number;color?:string;note?:string}>;
}> = ({title,status="SIMULAÇÃO",metrics}) => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();

  return (
    <SceneShell title={title} eyebrow={status}>
      <div style={{display:"grid",gridTemplateColumns:".75fr 1.25fr",gap:34,height:"100%"}}>
        <Reveal>
          <Panel style={{
            height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",
            background:"#101b32",color:"white",
          }}>
            <div style={{
              width:180,height:180,borderRadius:38,border:"5px solid #35d8ff",
              boxShadow:"0 0 40px rgba(53,216,255,.25)",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:82,
            }}>⚙</div>
            <div style={{marginTop:30,fontSize:28,fontWeight:950}}>ESTADO DO SISTEMA</div>
            <div style={{marginTop:12,fontSize:20,opacity:.7}}>os dados mudam com a cena</div>
          </Panel>
        </Reveal>

        <Panel style={{height:"100%"}}>
          <div style={{fontWeight:950,fontSize:24,marginBottom:24}}>MÉTRICAS</div>
          <div style={{display:"flex",flexDirection:"column",gap:24}}>
            {metrics.map((m,i)=>{
              const start=Math.round((.4+i*.3)*fps);
              const p=interpolate(frame,[start,start+Math.round(.9*fps)],[0,m.value],{
                extrapolateLeft:"clamp",extrapolateRight:"clamp"
              });
              return (
                <div key={m.label}>
                  <div style={{display:"flex",justifyContent:"space-between",fontWeight:900,fontSize:22}}>
                    <span>{m.label}</span><span>{Math.round(p)}%</span>
                  </div>
                  <div style={{height:30,background:"#dce3e9",border:theme.border,borderRadius:999,overflow:"hidden",marginTop:10}}>
                    <div style={{
                      height:"100%",width:`${p}%`,
                      background:m.color ?? [theme.colors.yellow,theme.colors.cyan,theme.colors.green,theme.colors.pink][i%4],
                    }}/>
                  </div>
                  {m.note ? <div style={{fontSize:16,marginTop:7,opacity:.65}}>{m.note}</div> : null}
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </SceneShell>
  );
};

export const DiagramScene: React.FC<{
  title:string;
  center:string;
  nodes:Array<{label:string;detail?:string;color?:string}>;
}> = ({title,center,nodes}) => (
  <SceneShell title={title} eyebrow="DIAGRAMA">
    <div style={{position:"relative",height:"100%"}}>
      <Reveal delay={.2} style={{
        position:"absolute",left:"50%",top:"48%",transform:"translate(-50%,-50%)",
        zIndex:3,
      }}>
        <div style={{
          width:250,minHeight:150,borderRadius:26,border:theme.border,boxShadow:theme.shadow,
          background:theme.colors.yellow,color:theme.colors.ink,
          display:"flex",alignItems:"center",justifyContent:"center",
          padding:24,textAlign:"center",fontSize:34,fontWeight:950,lineHeight:1.05,
        }}>{center}</div>
      </Reveal>
      <div style={{
        display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"1fr 1fr",
        gap:130,height:"100%",padding:"5px 30px",
      }}>
        {nodes.slice(0,4).map((n,i)=>(
          <Reveal key={n.label} index={i} delay={.3}>
            <Panel style={{height:"100%",padding:20,background:n.color ?? theme.colors.cream}}>
              <div style={{fontSize:27,fontWeight:950}}>{n.label}</div>
              {n.detail ? <div style={{fontSize:18,lineHeight:1.25,marginTop:10,opacity:.72}}>{n.detail}</div> : null}
            </Panel>
          </Reveal>
        ))}
      </div>
    </div>
  </SceneShell>
);

export const ErrorScene: React.FC<{
  title:string;
  message?:string;
  errors:string[];
}> = ({title,message="Algo está atrapalhando o resultado.",errors}) => (
  <SceneShell title={title} eyebrow="DEBUG">
    <div style={{display:"grid",gridTemplateColumns:".85fr 1.15fr",gap:34,height:"100%"}}>
      <Reveal>
        <Panel style={{height:"100%",background:"#341825",color:"white"}}>
          <div style={{fontFamily:titleFont,fontSize:92,color:theme.colors.red}}>!</div>
          <div style={{fontSize:36,fontWeight:950,lineHeight:1.1}}>ERRO DE PROMPT</div>
          <div style={{fontSize:22,lineHeight:1.35,marginTop:22,color:"#ffdbe0"}}>{message}</div>
        </Panel>
      </Reveal>
      <div style={{display:"flex",flexDirection:"column",gap:16,justifyContent:"center"}}>
        {errors.map((e,i)=>(
          <Reveal key={e} index={i} delay={.3}>
            <Panel style={{padding:18,display:"flex",alignItems:"center",gap:18}}>
              <div style={{
                width:44,height:44,borderRadius:12,border:theme.border,background:theme.colors.red,
                display:"flex",alignItems:"center",justifyContent:"center",fontWeight:950,
              }}>✕</div>
              <div style={{fontSize:25,fontWeight:850}}>{e}</div>
            </Panel>
          </Reveal>
        ))}
      </div>
    </div>
  </SceneShell>
);

export const QuizScene: React.FC<{
  title:string;
  question:string;
  options:string[];
  answer?:number;
}> = ({title,question,options,answer}) => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const revealAnswer=frame > Math.round(2.8*fps);

  return (
    <SceneShell title={title} eyebrow="QUIZ">
      <Panel style={{height:"100%"}}>
        <div style={{fontSize:36,fontWeight:950,lineHeight:1.15}}>{question}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginTop:34}}>
          {options.map((o,i)=>(
            <Reveal key={o} index={i} delay={.3}>
              <div style={{
                minHeight:105,border:theme.border,borderRadius:18,padding:20,
                background:revealAnswer && answer===i ? theme.colors.green : "#f8f4e8",
                fontSize:24,fontWeight:850,display:"flex",alignItems:"center",gap:18,
              }}>
                <div style={{
                  width:42,height:42,borderRadius:10,border:theme.border,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  background:theme.colors.yellow,
                }}>{String.fromCharCode(65+i)}</div>
                {o}
              </div>
            </Reveal>
          ))}
        </div>
      </Panel>
    </SceneShell>
  );
};

export const ChallengeScene: React.FC<{
  title:string;
  mission:string;
  tasks:string[];
  cta?:string;
}> = ({title,mission,tasks,cta="COMEÇAR MISSÃO"}) => (
  <SceneShell title={title} eyebrow="DESAFIO">
    <div style={{display:"grid",gridTemplateColumns:"1.1fr .9fr",gap:34,height:"100%"}}>
      <Reveal>
        <Panel style={{height:"100%"}}>
          <Tag color={theme.colors.yellow}>MISSÃO</Tag>
          <div style={{fontSize:42,fontWeight:950,lineHeight:1.08,marginTop:28}}>{mission}</div>
          <div style={{
            marginTop:34,display:"inline-block",padding:"18px 28px",borderRadius:16,border:theme.border,
            boxShadow:theme.shadow,background:theme.colors.cyan,fontSize:25,fontWeight:950,
          }}>{cta} →</div>
        </Panel>
      </Reveal>
      <div style={{display:"flex",flexDirection:"column",gap:15,justifyContent:"center"}}>
        {tasks.map((t,i)=>(
          <Reveal key={t} index={i} delay={.35}>
            <Panel style={{padding:18,fontSize:24,fontWeight:850}}>
              <span style={{color:theme.colors.green}}>✓</span> &nbsp;{t}
            </Panel>
          </Reveal>
        ))}
      </div>
    </div>
  </SceneShell>
);

export const SummaryScene: React.FC<{
  title:string;
  items:string[];
}> = ({title,items}) => (
  <SceneShell title={title} eyebrow="RESUMO">
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
      {items.map((item,i)=>(
        <Reveal key={item} index={i}>
          <Panel style={{padding:20,display:"flex",gap:18,alignItems:"center",minHeight:120}}>
            <div style={{
              minWidth:52,height:52,borderRadius:13,border:theme.border,
              background:[theme.colors.yellow,theme.colors.cyan,theme.colors.green,theme.colors.pink][i%4],
              display:"flex",alignItems:"center",justifyContent:"center",fontWeight:950,fontSize:23,
            }}>{i+1}</div>
            <div style={{fontSize:25,fontWeight:850,lineHeight:1.15}}>{item}</div>
          </Panel>
        </Reveal>
      ))}
    </div>
  </SceneShell>
);
