import React from "react";
import {interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {theme} from "../engine/theme";

export const GameHud: React.FC<React.PropsWithChildren<{label?:string}>> = ({
  label="STATUS",
  children
}) => (
  <div style={{
    background:"rgba(8,20,38,.94)",
    border:"5px solid #101419",
    boxShadow:"8px 8px 0 #101419",
    borderRadius:18,
    padding:22,
    color:"white",
  }}>
    <div style={{
      fontFamily:"Arial Black, Arial, sans-serif",
      fontSize:20,
      letterSpacing:2,
      color:theme.colors.yellow,
      marginBottom:20,
    }}>{label}</div>
    {children}
  </div>
);

export const GameStatBar: React.FC<{
  label:string;
  value:number;
  color?:string;
  delay?:number;
}> = ({label,value,color=theme.colors.cyan,delay=0}) => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const start=Math.round(delay*fps);
  const progress=interpolate(
    frame,
    [start,start+Math.round(.9*fps)],
    [0,value],
    {extrapolateLeft:"clamp",extrapolateRight:"clamp"}
  );

  return (
    <div style={{marginBottom:20}}>
      <div style={{
        display:"flex",justifyContent:"space-between",
        fontSize:19,fontWeight:900,marginBottom:8,
      }}>
        <span>{label.toUpperCase()}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div style={{
        height:26,background:"#1f2d43",
        border:"4px solid #101419",
        borderRadius:6,overflow:"hidden",
      }}>
        <div style={{
          width:`${progress}%`,height:"100%",background:color,
          boxShadow:`inset 0 -6px 0 rgba(0,0,0,.18)`,
        }}/>
      </div>
    </div>
  );
};

export const PixelDialog: React.FC<React.PropsWithChildren> = ({children}) => (
  <div style={{
    background:"#fff4da",
    color:"#101419",
    border:"5px solid #101419",
    boxShadow:"7px 7px 0 #101419",
    borderRadius:12,
    padding:"18px 22px",
    fontSize:24,
    lineHeight:1.2,
    fontWeight:850,
  }}>
    {children}
  </div>
);
