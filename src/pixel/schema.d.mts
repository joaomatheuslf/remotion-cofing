import type {PixelSceneSpec,AuthoredSceneSpec} from './types';
export function parsePixelScene(input:unknown):PixelSceneSpec;
export function validatePixelLesson(lesson:{designerId?:string;scenes:Array<{id:string;duration:number;data?:Record<string,unknown>}>}):void;

export const designerIds:string[];
export function parseAuthoredScene(input:unknown):AuthoredSceneSpec;
export function validateProductionLesson(lesson:{mode?:string;designerId?:string;scenes:Array<{id:string;duration:number;data?:Record<string,unknown>}>}):void;
