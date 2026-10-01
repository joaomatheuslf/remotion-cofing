import React from "react";
import {theme} from "../engine/theme";

export const Panel: React.FC<React.PropsWithChildren<{style?:React.CSSProperties}>> = ({children, style}) => (
  <div style={{
    background: theme.colors.cream,
    border: theme.border,
    boxShadow: theme.shadow,
    borderRadius: theme.radius,
    padding: 28,
    color: theme.colors.ink,
    ...style
  }}>{children}</div>
);

export const Tag: React.FC<React.PropsWithChildren<{color?:string}>> = ({children, color=theme.colors.yellow}) => (
  <div style={{
    display:"inline-block",
    background:color,
    border:theme.border,
    borderRadius:14,
    padding:"10px 16px",
    fontWeight:900,
    fontSize:24,
    letterSpacing:.3
  }}>{children}</div>
);

export const BigTitle: React.FC<React.PropsWithChildren> = ({children}) => (
  <div style={{
    fontFamily:"Arial Black, Arial, sans-serif",
    fontSize:62,
    lineHeight:1,
    letterSpacing:-2,
    color:theme.colors.white,
    textShadow:"5px 5px 0 #101419"
  }}>{children}</div>
);
