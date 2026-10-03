import React from "react";
import {Series} from "remotion";
import {Lesson} from "./engine/types";
import {validateProductionLesson} from "./pixel/schema.mjs";
import {SceneRenderer} from "./engine/SceneRenderer";
import {DesignerProvider} from "./designers/DesignerProvider";
import {TransitionOverlay} from "./transitions/TransitionOverlay";

export const LessonComposition: React.FC<{lesson:Lesson}> = ({lesson}) => {
  React.useMemo(()=>validateProductionLesson(lesson),[lesson]);
  return (
    <DesignerProvider designerId={lesson.designerId}>
      <Series>
        {lesson.scenes.map((scene,index)=>(
          <Series.Sequence key={scene.id} durationInFrames={Math.round(scene.duration*30)}>
            <SceneRenderer scene={scene} demo={lesson.mode==="demo"}/>
            <TransitionOverlay
              sceneDurationSeconds={scene.duration}
              disabled={index===lesson.scenes.length-1}
            />
          </Series.Sequence>
        ))}
      </Series>
    </DesignerProvider>
  );
};
