/** Pixel Night production contract. Coordinates are in a 1080 × 864 canvas. */
export type PixelMotion = {
  type: 'float' | 'sway' | 'pulse' | 'signal' | 'fill' | 'gesture' | 'reveal' | 'dissolve';
  purpose: 'ambient' | 'teaching';
  explanation: string;
  start: number;
  end: number;
  amplitude?: number;
  period?: number;
  path?: Array<{x:number;y:number}>;
};
export type PixelElement = {
  id: string;
  type: 'sprite' | 'text' | 'rect' | 'path';
  role: 'title' | 'copy' | 'illustration' | 'presenter-body' | 'presenter-arm' | 'node' | 'connection' | 'signal' | 'caption';
  x: number; y: number; width: number; height: number;
  z: number;
  parent?: string;
  asset?: string;
  text?: string;
  font?: 'pixel' | 'body';
  fontSize?: number;
  color?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  points?: Array<{x:number;y:number}>;
  pivot?: {x:number;y:number};
  motion?: PixelMotion;
};
export type PixelSceneSpec = {
  version: 1;
  designer: 'pixel-night';
  canvas: {width:1080;height:864;fps:30};
  teachingGoal: string;
  background: {color:string;asset?:string};
  elements: PixelElement[];
};
