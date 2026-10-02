import React from "react";
import {AbsoluteFill} from "remotion";
import type {Lesson} from "../engine/types";
import {lessonToStoryboard} from "./types";
import {DesignerProvider} from "../designers/DesignerProvider";
import {theme} from "../engine/theme";

export const StoryboardSheet:React.FC<{lesson:Lesson}> = ({lesson}) => {
  const board=lessonToStoryboard(lesson);
  return (
    <DesignerProvider designerId={lesson.designerId}>
      <AbsoluteFill style={{background:theme.backgrounds.scene,padding:38,color:theme.colors.text}}>
        <div style={{fontFamily:theme.typography.title,fontSize:44,fontWeight:900}}>
          STORYBOARD — {board.title}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18,marginTop:28,overflow:"hidden"}}>
          {board.cards.slice(0,9).map(card=>(
            <div key={card.sceneId} style={{
              minHeight:190,border:theme.border,borderRadius:theme.radius,
              background:theme.backgrounds.panel,color:theme.colors.ink,
              boxShadow:theme.shadow,padding:18
            }}>
              <div style={{fontSize:15,fontWeight:900,opacity:.55}}>
                {String(card.index+1).padStart(2,"0")} · {card.kind} · {card.duration}s
              </div>
              <div style={{fontSize:24,fontWeight:900,lineHeight:1.08,marginTop:14}}>{card.title}</div>
              <div style={{fontSize:15,marginTop:18,opacity:.65}}>{card.designerId ?? "pixel-night"}</div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </DesignerProvider>
  );
};
