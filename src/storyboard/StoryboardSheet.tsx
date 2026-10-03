import React from "react";
import {AbsoluteFill,Freeze} from "remotion";
import type {Lesson} from "../engine/types";
import {DesignerProvider} from "../designers/DesignerProvider";
import {theme} from "../engine/theme";
import {SceneRenderer} from "../engine/SceneRenderer";

export const StoryboardSheet:React.FC<{lesson:Lesson}> = ({lesson}) => {
  const scenes=lesson.scenes.slice(0,9);
  return (
    <DesignerProvider designerId={lesson.designerId}>
      <AbsoluteFill style={{background:theme.backgrounds.scene,padding:28,color:theme.colors.text}}>
        <div style={{fontFamily:theme.typography.title,fontSize:36,fontWeight:900}}>
          STORYBOARD — {lesson.title}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginTop:18}}>
          {scenes.map((scene,index)=>(
            <div key={scene.id} style={{
              height:238,border:theme.border,borderRadius:theme.radius,
              background:theme.backgrounds.panel,boxShadow:theme.shadow,overflow:"hidden",position:"relative"
            }}>
              <div style={{position:"absolute",left:0,top:0,width:1080,height:864,transform:"scale(.282)",transformOrigin:"top left"}}>
                <Freeze frame={Math.min(90,Math.max(12,Math.round(scene.duration*15)))}>
                  <SceneRenderer scene={scene} demo={lesson.mode==="demo"}/>
                </Freeze>
              </div>
              <div style={{
                position:"absolute",left:8,right:8,bottom:8,
                background:"rgba(0,0,0,.72)",color:"#fff",borderRadius:8,padding:"7px 9px",
                fontSize:13,fontWeight:800
              }}>
                {String(index+1).padStart(2,"0")} · {scene.kind} · {scene.duration}s
              </div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </DesignerProvider>
  );
};
