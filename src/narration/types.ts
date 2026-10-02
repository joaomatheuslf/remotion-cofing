export type NarrationCue = {start:number;end?:number;text:string;key?:string};
export type NarrationTrack = {duration:number;cues:NarrationCue[]};
