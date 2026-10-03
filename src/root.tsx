import React from "react";
import {Composition} from "remotion";
import {LessonComposition} from "./LessonComposition";
import {exampleLesson} from "./lesson.example";
import {engineDemoLesson} from "./engine/demoLesson";
import {directorDemoLesson} from "./director/directorDemo";
import {outlineDemoLesson} from "./director/outlineDemo";
import {pixelDemoLesson} from "./engine/pixelDemo";
import {metaphorDemoLesson} from "./engine/metaphorDemo";
import {
  designerPixelNight,
  designerEditorialPop,
  designerCleanTech,
} from "./engine/designerDemo";
import {theme} from "./engine/theme";
import {DesignerGallery, designerGalleryDurationInFrames} from "./designers/DesignerGallery";
import {StoryboardSheet} from "./storyboard/StoryboardSheet";

import type {Lesson} from "./engine/types";
import pixelLessonJson from "../public/lessons/pixel-night/lesson.json";
const pixelLayeredLesson=pixelLessonJson as Lesson;

const frames = (seconds:number) => Math.round(seconds * 30);
const lessonDuration = (scenes:{duration:number}[]) =>
  frames(scenes.reduce((sum,s)=>sum+s.duration,0));

export const Root: React.FC = () => (
  <>
    <Composition id="Pixel18LayeredIA" component={LessonComposition} width={1080} height={864} fps={30} durationInFrames={4500} defaultProps={{lesson:pixelLayeredLesson}}/>
    <Composition id="PixelNightStoryboardA" component={StoryboardSheet} width={1080} height={864} fps={30} durationInFrames={180} defaultProps={{lesson:{...pixelLayeredLesson,scenes:pixelLayeredLesson.scenes.slice(0,9)}}}/>
    <Composition id="PixelNightStoryboardB" component={StoryboardSheet} width={1080} height={864} fps={30} durationInFrames={180} defaultProps={{lesson:{...pixelLayeredLesson,scenes:pixelLayeredLesson.scenes.slice(9)}}}/>
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
    <Composition
      id="DirectorDemo"
      component={LessonComposition}
      width={theme.canvas.width}
      height={theme.canvas.height}
      fps={30}
      durationInFrames={lessonDuration(directorDemoLesson.scenes)}
      defaultProps={{lesson: directorDemoLesson}}
    />
    <Composition
      id="OutlineDemo"
      component={LessonComposition}
      width={theme.canvas.width}
      height={theme.canvas.height}
      fps={30}
      durationInFrames={lessonDuration(outlineDemoLesson.scenes)}
      defaultProps={{lesson: outlineDemoLesson}}
    />
    <Composition
      id="PixelGameDemo"
      component={LessonComposition}
      width={theme.canvas.width}
      height={theme.canvas.height}
      fps={30}
      durationInFrames={lessonDuration(pixelDemoLesson.scenes)}
      defaultProps={{lesson: pixelDemoLesson}}
    />
    <Composition
      id="MetaphorDemo"
      component={LessonComposition}
      width={theme.canvas.width}
      height={theme.canvas.height}
      fps={30}
      durationInFrames={lessonDuration(metaphorDemoLesson.scenes)}
      defaultProps={{lesson: metaphorDemoLesson}}
    />
    <Composition
      id="DesignerPixelNight"
      component={LessonComposition}
      width={theme.canvas.width}
      height={theme.canvas.height}
      fps={30}
      durationInFrames={lessonDuration(designerPixelNight.scenes)}
      defaultProps={{lesson: designerPixelNight}}
    />
    <Composition
      id="DesignerEditorialPop"
      component={LessonComposition}
      width={theme.canvas.width}
      height={theme.canvas.height}
      fps={30}
      durationInFrames={lessonDuration(designerEditorialPop.scenes)}
      defaultProps={{lesson: designerEditorialPop}}
    />
    <Composition
      id="DesignerCleanTech"
      component={LessonComposition}
      width={theme.canvas.width}
      height={theme.canvas.height}
      fps={30}
      durationInFrames={lessonDuration(designerCleanTech.scenes)}
      defaultProps={{lesson: designerCleanTech}}
    />
    <Composition
      id="DesignerGallery"
      component={DesignerGallery}
      width={theme.canvas.width}
      height={theme.canvas.height}
      fps={30}
      durationInFrames={designerGalleryDurationInFrames}
    />
    <Composition
      id="StoryboardDemo"
      component={StoryboardSheet}
      width={theme.canvas.width}
      height={theme.canvas.height}
      fps={30}
      durationInFrames={180}
      defaultProps={{lesson: directorDemoLesson}}
    />
  </>
);
