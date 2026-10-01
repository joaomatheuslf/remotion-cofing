import React from "react";
import {Series} from "remotion";
import {Lesson} from "./engine/types";
import {SceneRenderer} from "./engine/SceneRenderer";

export const LessonComposition: React.FC<{lesson:Lesson}> = ({lesson}) => {
  return (
    <Series>
      {lesson.scenes.map((scene)=>(
        <Series.Sequence key={scene.id} durationInFrames={Math.round(scene.duration*30)}>
          <SceneRenderer scene={scene}/>
        </Series.Sequence>
      ))}
    </Series>
  );
};
