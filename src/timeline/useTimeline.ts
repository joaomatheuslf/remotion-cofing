import {useCurrentFrame,useVideoConfig} from "remotion";
import type {ActionTimeline,TimelineAction} from "./types";

export const useTimeline = (timeline:ActionTimeline=[]) => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const now=frame/fps;
  const elapsed=timeline.filter(a=>a.at<=now);
  const latest = <T extends TimelineAction["type"]>(type:T,target?:string) =>
    [...elapsed].reverse().find(a=>a.type===type && (!target || ("target" in a && a.target===target)));

  return {
    now,
    elapsed,
    isVisible:(target:string)=>{
      const show=latest("show",target);
      const hide=latest("hide",target);
      if(!show) return false;
      if(!hide) return true;
      return show.at>hide.at;
    },
    latest,
  };
};
