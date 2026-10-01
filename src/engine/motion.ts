import {interpolate, spring} from "remotion";

export const pop = (frame:number, fps:number, start=0) => {
  return spring({
    frame: frame - start,
    fps,
    config: {damping: 12, stiffness: 180, mass: 0.7}
  });
};

export const fade = (frame:number, start:number, duration:number) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

export const slideY = (frame:number, fps:number, start=0, distance=40) => {
  const p = pop(frame, fps, start);
  return distance * (1 - p);
};

export const shakeX = (frame:number, start:number, duration=18, amount=8) => {
  if (frame < start || frame > start + duration) return 0;
  const life = 1 - (frame - start) / duration;
  return Math.sin((frame - start) * 1.7) * amount * life;
};
