import type {PixelElement} from './types';
export function textMetrics(element:PixelElement):{advance:number;lineHeight:number;unit:number};
export function wrapText(element:PixelElement):string[];
export function pixelGlyphs(element:PixelElement):Array<{x:number;y:number;width:number;height:number}>;
