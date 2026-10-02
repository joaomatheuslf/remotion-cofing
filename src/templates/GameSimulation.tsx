import React from "react";
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {GameHud, GameStatBar, PixelDialog} from "../components/GameHud";
import {PixelCharacter, PixelCharacterState, PixelRobot} from "../components/PixelCharacter";
import {theme} from "../engine/theme";

type Metric = {
  label:string;
  value:number;
  color?:string;
  note?:string;
};

export const GameSimulationScene: React.FC<{
  title:string;
  dialogue?:string;
  metrics:Metric[];
  characterState?:PixelCharacterState;
}> = ({title,dialogue,metrics,characterState="thinking"}) => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();

  const enter=spring({
    frame:frame-8,
    fps,
    config:{damping:13,stiffness:160,mass:.8},
  });

  return (
    <AbsoluteFill style={{
      background:"#071225",
      fontFamily:"Inter, Arial, sans-serif",
      color:"white",
      overflow:"hidden",
    }}>
      {/* cenário */}
      <div style={{
        position:"absolute",inset:0,
        background:
          "linear-gradient(rgba(53,216,255,.07) 2px, transparent 2px), linear-gradient(90deg, rgba(53,216,255,.07) 2px, transparent 2px), linear-gradient(#0d1c35,#111a31)",
        backgroundSize:"48px 48px,48px 48px,100% 100%",
      }}/>
      <div style={{
        position:"absolute",left:0,right:0,bottom:0,height:180,
        background:"linear-gradient(#17223a,#0c1323)",
        borderTop:"6px solid #101419",
      }}/>

      {/* janela / neon */}
      <div style={{
        position:"absolute",left:52,top:44,width:360,height:230,
        background:"linear-gradient(180deg,#143a61,#0a1830)",
        border:"7px solid #101419",
        boxShadow:"10px 10px 0 rgba(0,0,0,.25)",
      }}>
        <div style={{position:"absolute",left:"50%",top:0,bottom:0,width:6,background:"#101419"}}/>
        <div style={{position:"absolute",left:0,right:0,top:"50%",height:6,background:"#101419"}}/>
        {Array.from({length:18}).map((_,i)=>(
          <div key={i} style={{
            position:"absolute",
            left:((i*47)%330)+10,
            top:((i*31)%200)+8,
            width:3,height:18,
            background:"rgba(139,211,255,.35)",
            transform:"rotate(18deg)",
          }}/>
        ))}
      </div>

      {/* título */}
      <div style={{
        position:"absolute",left:48,top:306,
        fontFamily:"Arial Black, Arial, sans-serif",
        fontSize:47,lineHeight:1,
        textShadow:"5px 5px 0 #101419",
        maxWidth:570,
      }}>{title}</div>

      {/* personagem */}
      <div style={{
        position:"absolute",left:115,bottom:105,
        opacity:enter,
        transform:`translateX(${(1-enter)*-55}px)`,
      }}>
        <PixelCharacter state={characterState} scale={1.12}/>
      </div>

      {/* robô */}
      <div style={{
        position:"absolute",left:365,bottom:122,
        opacity:enter,
        transform:`translateY(${(1-enter)*28}px)`,
      }}>
        <PixelRobot scale={.9}/>
      </div>

      {/* fala */}
      {dialogue ? (
        <div style={{
          position:"absolute",left:350,bottom:350,width:330,
          opacity:enter,
          transform:`scale(${.9+enter*.1})`,
          transformOrigin:"bottom left",
        }}>
          <PixelDialog>{dialogue}</PixelDialog>
        </div>
      ) : null}

      {/* HUD */}
      <div style={{
        position:"absolute",right:45,top:45,width:330,
        opacity:enter,
        transform:`translateX(${(1-enter)*55}px)`,
      }}>
        <GameHud label="HUD DA CENA">
          {metrics.map((m,i)=>(
            <GameStatBar
              key={m.label}
              label={m.label}
              value={m.value}
              color={m.color ?? [
                theme.colors.yellow,theme.colors.cyan,
                theme.colors.green,theme.colors.pink
              ][i%4]}
              delay={.45+i*.18}
            />
          ))}
        </GameHud>
      </div>

      <div style={{
        position:"absolute",right:48,bottom:40,
        padding:"10px 14px",
        background:theme.colors.yellow,
        color:theme.colors.ink,
        border:"4px solid #101419",
        fontSize:17,fontWeight:950,
      }}>PIXEL EXPLAINER</div>
    </AbsoluteFill>
  );
};
