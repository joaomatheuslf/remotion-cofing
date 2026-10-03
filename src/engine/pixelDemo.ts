import lesson from "../../public/lessons/pixel-night/lesson.json";
import type {Lesson} from "./types";
export const pixelDemoLesson:Lesson={...lesson,designerId:"pixel-night",scenes:[lesson.scenes[4]] as Lesson["scenes"]};
