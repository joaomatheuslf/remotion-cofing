import React from "react";
import {interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {theme} from "../engine/theme";

export const MetaphorShell: React.FC<React.PropsWithChildren<{
  title:string;
  eyebrow?:string;
}>> = ({title,eyebrow="METÁFORA VISUAL",children}) => (
  <div style={{
    width:"100%",
    height:"100%",
    boxSizing:"border-box",
    padding:48,
    position:"relative",
    overflow:"hidden",
    background:theme.backgrounds.scene,
    color:theme.colors.text,
    fontFamily:theme.typography.body,
  }}>
    <div style={{
      display:"inline-block",
      padding:"8px 14px",
      border:"4px solid #101419",
      borderRadius:12,
      background:theme.colors.yellow,
      color:theme.colors.ink,
      fontWeight:950,
      fontSize:17,
      letterSpacing:1.3,
      boxShadow:"5px 5px 0 #101419",
    }}>{eyebrow}</div>
    <div style={{
      marginTop:20,
      fontFamily:theme.typography.title,
      fontSize:54,
      lineHeight:.98,
      letterSpacing:-2,
      textShadow:"5px 5px 0 #101419",
      maxWidth:900,
    }}>{title}</div>
    <div style={{position:"absolute",left:48,right:48,top:166,bottom:42}}>
      {children}
    </div>
  </div>
);

export const FlowNode: React.FC<React.PropsWithChildren<{
  label:string;
  accent?:string;
  width?:number;
  height?:number;
  style?:React.CSSProperties;
}>> = ({
  label,
  accent=theme.colors.cyan,
  width=250,
  height=180,
  style,
  children,
}) => (
  <div style={{
    width,
    height,
    border:"5px solid #101419",
    borderRadius:theme.radius,
    boxShadow:"8px 8px 0 #101419",
    background:theme.backgrounds.panel,
    color:theme.colors.ink,
    padding:18,
    boxSizing:"border-box",
    position:"relative",
    ...style,
  }}>
    <div style={{
      display:"inline-block",
      background:accent,
      border:"4px solid #101419",
      borderRadius:10,
      padding:"6px 10px",
      fontWeight:950,
      fontSize:16,
      letterSpacing:.8,
    }}>{label}</div>
    <div style={{
      height:"calc(100% - 44px)",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      textAlign:"center",
      fontSize:24,
      lineHeight:1.15,
      fontWeight:900,
    }}>{children}</div>
  </div>
);

export const TokenChip: React.FC<{
  text:string;
  color?:string;
  x:number;
  y:number;
  scale?:number;
  opacity?:number;
}> = ({text,color=theme.colors.yellow,x,y,scale=1,opacity=1}) => (
  <div style={{
    position:"absolute",
    left:x,
    top:y,
    transform:`translate(-50%,-50%) scale(${scale})`,
    opacity,
    minWidth:54,
    maxWidth:140,
    padding:"9px 12px",
    background:color,
    border:"4px solid #101419",
    boxShadow:"4px 4px 0 #101419",
    borderRadius:theme.tagRadius,
    color:theme.colors.ink,
    fontSize:16,
    fontWeight:950,
    textAlign:"center",
    whiteSpace:"nowrap",
    overflow:"hidden",
    textOverflow:"ellipsis",
  }}>{text}</div>
);

export const ArrowTrack: React.FC<{
  left:number;
  top:number;
  width:number;
  progress?:number;
}> = ({left,top,width,progress=1}) => (
  <div style={{
    position:"absolute",
    left,
    top,
    width,
    height:14,
    transformOrigin:"left center",
    transform:`scaleX(${Math.max(0,Math.min(1,progress))})`,
  }}>
    <div style={{
      position:"absolute",
      left:0,right:20,top:4,height:6,
      background:theme.colors.cyan,
      border:"2px solid #101419",
    }}/>
    <div style={{
      position:"absolute",
      right:0,top:-2,
      width:0,height:0,
      borderTop:"9px solid transparent",
      borderBottom:"9px solid transparent",
      borderLeft:`18px solid ${theme.colors.cyan}`,
      filter:"drop-shadow(2px 2px 0 #101419)",
    }}/>
  </div>
);

export const useEnter = (delaySeconds=0) => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  return spring({
    frame:frame-Math.round(delaySeconds*fps),
    fps,
    config:{damping:14,stiffness:170,mass:.75},
  });
};

export const useLinearProgress = (
  startSeconds:number,
  durationSeconds:number,
  from=0,
  to=1
) => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  return interpolate(
    frame,
    [
      Math.round(startSeconds*fps),
      Math.round((startSeconds+durationSeconds)*fps),
    ],
    [from,to],
    {extrapolateLeft:"clamp",extrapolateRight:"clamp"}
  );
};
