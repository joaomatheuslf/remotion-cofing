import React from "react";
import {useCurrentFrame, useVideoConfig} from "remotion";

export type PixelCharacterState = "idle" | "thinking" | "happy" | "warning";

const px = (n:number) => n * 6;

export const PixelCharacter: React.FC<{
  state?: PixelCharacterState;
  scale?: number;
}> = ({state="idle",scale=1}) => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();

  const bob=Math.sin(frame/6)*3;
  const blink=(frame % Math.round(fps*2.6)) < 3;
  const talk=state==="happy" && Math.floor(frame/4)%2===0;

  const skin="#d79a6b";
  const hair="#16120f";
  const shirt=state==="warning" ? "#ff5e6c" : "#35d8ff";
  const pants="#162a49";
  const shoe="#0b0d12";

  return (
    <div style={{
      width:px(28),height:px(36),
      position:"relative",
      transform:`translateY(${bob}px) scale(${scale})`,
      transformOrigin:"bottom center",
      imageRendering:"pixelated",
      filter:"drop-shadow(8px 10px 0 rgba(0,0,0,.28))",
    }}>
      {/* cabelo */}
      <div style={{position:"absolute",left:px(8),top:px(1),width:px(12),height:px(4),background:hair}}/>
      <div style={{position:"absolute",left:px(6),top:px(3),width:px(16),height:px(5),background:hair}}/>

      {/* cabeça */}
      <div style={{position:"absolute",left:px(7),top:px(6),width:px(14),height:px(11),background:skin,border:`${px(.7)}px solid #101419`}}>
        <div style={{position:"absolute",left:px(2),top:px(3),width:px(2),height:blink?px(.5):px(2),background:"#101419"}}/>
        <div style={{position:"absolute",right:px(2),top:px(3),width:px(2),height:blink?px(.5):px(2),background:"#101419"}}/>
        <div style={{
          position:"absolute",left:px(5),top:px(7),
          width:px(4),height:talk?px(2):px(1),
          background:state==="happy" ? "#ffffff" : "#6d332a",
        }}/>
      </div>

      {/* orelhas */}
      <div style={{position:"absolute",left:px(5),top:px(9),width:px(2),height:px(4),background:skin}}/>
      <div style={{position:"absolute",right:px(5),top:px(9),width:px(2),height:px(4),background:skin}}/>

      {/* corpo */}
      <div style={{position:"absolute",left:px(6),top:px(17),width:px(16),height:px(10),background:shirt,border:`${px(.7)}px solid #101419`}}/>

      {/* braços */}
      <div style={{
        position:"absolute",left:px(3),top:px(18),width:px(4),height:px(10),background:skin,
        transform:state==="thinking" ? "rotate(-25deg) translate(8px,-10px)" : "rotate(6deg)",
        transformOrigin:"top center",
        border:`${px(.6)}px solid #101419`,
      }}/>
      <div style={{
        position:"absolute",right:px(3),top:px(18),width:px(4),height:px(10),background:skin,
        transform:state==="warning" ? "rotate(-35deg) translate(-6px,-8px)" : "rotate(-6deg)",
        transformOrigin:"top center",
        border:`${px(.6)}px solid #101419`,
      }}/>

      {/* pernas */}
      <div style={{position:"absolute",left:px(7),top:px(27),width:px(6),height:px(7),background:pants,border:`${px(.6)}px solid #101419`}}/>
      <div style={{position:"absolute",right:px(7),top:px(27),width:px(6),height:px(7),background:pants,border:`${px(.6)}px solid #101419`}}/>

      {/* sapatos */}
      <div style={{position:"absolute",left:px(6),bottom:0,width:px(8),height:px(3),background:shoe}}/>
      <div style={{position:"absolute",right:px(6),bottom:0,width:px(8),height:px(3),background:shoe}}/>

      {state==="thinking" ? (
        <>
          <div style={{position:"absolute",right:px(-2),top:px(2),fontSize:px(4)}}>?</div>
          <div style={{position:"absolute",right:px(-5),top:px(-2),fontSize:px(3),opacity:.7}}>?</div>
        </>
      ) : null}
    </div>
  );
};

export const PixelRobot: React.FC<{scale?:number}> = ({scale=1}) => {
  const frame=useCurrentFrame();
  const float=Math.sin(frame/7)*4;
  const light=Math.floor(frame/8)%2===0 ? "#55e68f" : "#35d8ff";

  return (
    <div style={{
      width:150,height:170,position:"relative",
      transform:`translateY(${float}px) scale(${scale})`,
      transformOrigin:"bottom center",
      filter:"drop-shadow(8px 10px 0 rgba(0,0,0,.25))",
    }}>
      <div style={{
        position:"absolute",left:18,top:22,width:114,height:88,
        background:"#e8f5ff",border:"7px solid #101419",borderRadius:18,
      }}>
        <div style={{position:"absolute",left:20,top:26,width:20,height:20,background:light,border:"5px solid #101419"}}/>
        <div style={{position:"absolute",right:20,top:26,width:20,height:20,background:light,border:"5px solid #101419"}}/>
        <div style={{position:"absolute",left:35,bottom:14,width:44,height:8,background:"#101419"}}/>
      </div>
      <div style={{position:"absolute",left:69,top:2,width:12,height:26,background:"#101419"}}/>
      <div style={{position:"absolute",left:61,top:0,width:28,height:16,background:"#ffc83d",border:"5px solid #101419"}}/>
      <div style={{
        position:"absolute",left:31,bottom:8,width:88,height:62,
        background:"#35d8ff",border:"7px solid #101419",borderRadius:14,
      }}>
        <div style={{position:"absolute",left:28,top:18,width:28,height:20,background:"#081426",border:"4px solid #101419"}}/>
      </div>
    </div>
  );
};
