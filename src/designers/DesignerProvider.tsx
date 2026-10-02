import React, {createContext, useContext, useMemo} from "react";
import {getDesigner} from "./registry";
import {DesignerDefinition, DesignerId} from "./types";

const DesignerContext = createContext<DesignerDefinition>(getDesigner());

type CSSVars = React.CSSProperties & Record<string, string | number>;

const toCssVariables = (designer:DesignerDefinition): CSSVars => {
  const t=designer.tokens;

  return {
    "--pf-bg": t.colors.bg,
    "--pf-panel": t.colors.panel,
    "--pf-cream": t.colors.cream,
    "--pf-yellow": t.colors.yellow,
    "--pf-cyan": t.colors.cyan,
    "--pf-green": t.colors.green,
    "--pf-pink": t.colors.pink,
    "--pf-red": t.colors.red,
    "--pf-ink": t.colors.ink,
    "--pf-white": t.colors.white,
    "--pf-text": t.colors.text,
    "--pf-muted": t.colors.muted,
    "--pf-radius": t.shape.radius + "px",
    "--pf-border-width": t.shape.borderWidth + "px",
    "--pf-tag-radius": t.shape.tagRadius + "px",
    "--pf-shadow-x": t.shadow.x + "px",
    "--pf-shadow-y": t.shadow.y + "px",
    "--pf-shadow-blur": t.shadow.blur + "px",
    "--pf-shadow-color": t.shadow.color,
    "--pf-font-title": t.typography.title,
    "--pf-font-body": t.typography.body,
    "--pf-title-weight": t.typography.titleWeight,
    "--pf-body-weight": t.typography.bodyWeight,
    "--pf-scene-bg": t.backgrounds.scene,
    "--pf-title-bg": t.backgrounds.title,
    "--pf-panel-bg": t.backgrounds.panel,
    "--pf-motion-speed": designer.motion.speed
  };
};

export const DesignerProvider: React.FC<
  React.PropsWithChildren<{designerId?:DesignerId | string}>
> = ({designerId,children}) => {
  const designer=useMemo(()=>getDesigner(designerId),[designerId]);
  const vars=useMemo(()=>toCssVariables(designer),[designer]);

  return (
    <DesignerContext.Provider value={designer}>
      <div
        data-designer={designer.id}
        style={{
          ...vars,
          position:"absolute",
          inset:0,
          overflow:"hidden",
          fontFamily:"var(--pf-font-body)",
          background:"var(--pf-bg)",
          color:"var(--pf-text)"
        }}
      >
        {children}
      </div>
    </DesignerContext.Provider>
  );
};

export const useDesigner = () => useContext(DesignerContext);
