import React from "react";
import {theme} from "../engine/theme";
import {useDesigner} from "../designers/DesignerProvider";

export const Panel: React.FC<
  React.PropsWithChildren<{style?:React.CSSProperties}>
> = ({children, style}) => {
  const designer=useDesigner();

  const variant:React.CSSProperties =
    designer.variants.panel === "clean"
      ? {
          border: theme.border,
          boxShadow: theme.shadow,
          background: theme.backgrounds.panel
        }
      : designer.variants.panel === "paper"
        ? {
            border: theme.border,
            boxShadow: theme.shadow,
            background: theme.backgrounds.panel,
            transform: "rotate(-0.15deg)"
          }
        : {
            border: theme.border,
            boxShadow: theme.shadow,
            background: theme.backgrounds.panel
          };

  return (
    <div style={{
      ...variant,
      borderRadius: theme.radius,
      padding: 28,
      color: theme.colors.ink,
      ...style
    }}>{children}</div>
  );
};

export const Tag: React.FC<
  React.PropsWithChildren<{color?:string}>
> = ({children, color=theme.colors.yellow}) => {
  const designer=useDesigner();
  const padding =
    designer.variants.tag === "pill"
      ? "9px 18px"
      : designer.variants.tag === "label"
        ? "10px 14px"
        : "10px 16px";

  return (
    <div style={{
      display:"inline-block",
      background:color,
      border:theme.border,
      borderRadius:theme.tagRadius,
      padding,
      color:theme.colors.ink,
      fontWeight:900,
      fontSize:24,
      letterSpacing:.3
    }}>{children}</div>
  );
};

export const BigTitle: React.FC<React.PropsWithChildren> = ({children}) => {
  const designer=useDesigner();

  return (
    <div style={{
      fontFamily:theme.typography.title,
      fontSize:designer.variants.title === "minimal" ? 56 : 62,
      fontWeight:"var(--pf-title-weight, 900)",
      lineHeight:1,
      letterSpacing:designer.variants.title === "editorial" ? -3 : -2,
      color:designer.variants.title === "arcade"
        ? theme.colors.white
        : theme.colors.ink,
      textShadow:designer.variants.title === "minimal"
        ? "none"
        : "5px 5px 0 var(--pf-ink, #101419)"
    }}>{children}</div>
  );
};
