import React from "react";
import {Composition} from "remotion";
import {LessonComposition} from "./LessonComposition";
import {exampleLesson} from "./lesson.example";
import {engineDemoLesson} from "./engine/demoLesson";
import {theme} from "./engine/theme";

const frames = (seconds:number) => Math.round(seconds * 30);
const lessonDuration = (scenes:{duration:number}[]) =>
  frames(scenes.reduce((sum,s)=>sum+s.duration,0));

export const Root: React.FC = () => (
  <>
    <Composition
      id="PromptForgeSlide"
      component={LessonComposition}
      width={theme.canvas.width}
      height={theme.canvas.height}
      fps={30}
      durationInFrames={lessonDuration(exampleLesson.scenes)}
      defaultProps={{lesson: exampleLesson}}
    />
    <Composition
      id="EngineShowcase"
      component={LessonComposition}
      width={theme.canvas.width}
      height={theme.canvas.height}
      fps={30}
      durationInFrames={lessonDuration(engineDemoLesson.scenes)}
      defaultProps={{lesson: engineDemoLesson}}
    />
  </>
);
