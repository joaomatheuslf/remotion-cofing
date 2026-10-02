export type TimelineAction =
  | {type:"show"; target:string; at:number}
  | {type:"hide"; target:string; at:number}
  | {type:"animate"; target:string; at:number; duration?:number; animation:string}
  | {type:"character"; target:"presenter"; at:number; state:string}
  | {type:"camera"; at:number; duration?:number; action:"zoom-in"|"zoom-out"|"pan-left"|"pan-right"}
  | {type:"cue"; at:number; cue:string};

export type ActionTimeline = TimelineAction[];
