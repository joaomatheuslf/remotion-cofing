import type {PixelSceneSpec} from './types';
export function parsePixelScene(input:unknown):PixelSceneSpec;
export function validatePixelLesson(lesson:{designerId?:string;scenes:Array<{id:string;duration:number;data?:Record<string,unknown>}>}):void;
