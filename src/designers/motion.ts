import {interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {useDesigner} from "./DesignerProvider";

export const useDesignerEnter = (
  delaySeconds=0,
  index=0
) => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const designer=useDesigner();

  const speed=Math.max(.45,designer.motion.speed);
  const delayFrames=Math.round(
    (delaySeconds + index * .18) * fps
  );

  const springProgress=spring({
    frame:frame-delayFrames,
    fps,
    config:{
      damping:designer.motion.enter === "pop" ? 12 : 16,
      stiffness:designer.motion.enter === "pop" ? 185 : 140,
      mass:.75 / speed
    }
  });

  const fadeProgress=interpolate(
    frame,
    [delayFrames,delayFrames+Math.round(.55*fps/speed)],
    [0,1],
    {extrapolateLeft:"clamp",extrapolateRight:"clamp"}
  );

  const progress=
    designer.motion.enter === "fade"
      ? fadeProgress
      : springProgress;

  const translateY=
    designer.motion.enter === "slide"
      ? (1-progress)*42
      : designer.motion.enter === "fade"
        ? (1-progress)*10
        : (1-progress)*26;

  const scale=
    designer.motion.enter === "pop"
      ? .92+progress*.08
      : .98+progress*.02;

  return {
    progress,
    style:{
      opacity:progress,
      transform:"translateY(" + translateY + "px) scale(" + scale + ")"
    }
  };
};

export const useDesignerEmphasis = () => {
  const designer=useDesigner();
  return designer.motion.emphasis;
};
