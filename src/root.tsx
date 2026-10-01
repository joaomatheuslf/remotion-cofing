import React from "react";
import {Composition} from "remotion";
import {LessonComposition} from "./LessonComposition";
import {exampleLesson} from "./lesson.example";
import {theme} from "./engine/theme";

const duration = Math.round(exampleLesson.scenes.reduce((sum,s)=>sum+s.duration,0)*30);

export const Root: React.FC = () => (
  <Composition
    id="PromptForgeSlide"
    component={LessonComposition}
    width={theme.canvas.width}
    height={theme.canvas.height}
    fps={30}
    durationInFrames={duration}
    defaultProps={{lesson: exampleLesson}}
  />
);
