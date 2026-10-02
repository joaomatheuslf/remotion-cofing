import type {NarrationTrack} from "./types";
import type {ActionTimeline} from "../timeline/types";

export const syncNarrationToTimeline = (
  track:NarrationTrack,
  cueActions:Record<string,{target?:string;animation?:string;characterState?:string}>
):ActionTimeline => {
  const actions:ActionTimeline=[];
  for(const cue of track.cues){
    if(!cue.key) continue;
    const map=cueActions[cue.key];
    if(!map) continue;
    if(map.characterState){
      actions.push({type:"character",target:"presenter",at:cue.start,state:map.characterState});
    }
    if(map.target){
      actions.push({type:"show",target:map.target,at:cue.start});
      if(map.animation){
        actions.push({type:"animate",target:map.target,at:cue.start,animation:map.animation});
      }
    }
    actions.push({type:"cue",at:cue.start,cue:cue.key});
  }
  return actions.sort((a,b)=>a.at-b.at);
};
