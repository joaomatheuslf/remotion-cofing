import type {Lesson} from "../engine/types";

export type StoryboardCard = {
  sceneId:string; index:number; title:string; kind:string; duration:number;
  designerId?:string; notes?:string[];
};

export type Storyboard = {lessonId:string;title:string;cards:StoryboardCard[]};

export const lessonToStoryboard = (lesson:Lesson):Storyboard => ({
  lessonId:lesson.id,
  title:lesson.title,
  cards:lesson.scenes.map((scene,index)=>({
    sceneId:scene.id,
    index,
    title:scene.title,
    kind:scene.kind,
    duration:scene.duration,
    designerId:lesson.designerId,
    notes:[
      scene.data?.variant ? "variant: "+String(scene.data.variant) : "",
      scene.data?.metaphor ? "metaphor: "+String(scene.data.metaphor) : "",
    ].filter(Boolean),
  })),
});
