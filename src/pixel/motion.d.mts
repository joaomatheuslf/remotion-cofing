import type {PixelMotion} from './types';
export function samplePath(points:Array<{x:number;y:number}>,progress:number):{x:number;y:number};
export function evaluateMotion(motion:PixelMotion|undefined,seconds:number):{dx:number;dy:number;rotation:number;scale:number;opacity:number;fill:number};
