/** Deterministic seconds-based motion, shared by Remotion, HTML and tests. */
export function samplePath(points, progress) {
  const lengths=points.slice(1).map((b,i)=>Math.hypot(b.x-points[i].x,b.y-points[i].y));
  let distance=Math.max(0,Math.min(1,progress))*lengths.reduce((a,b)=>a+b,0);
  for(let i=0;i<lengths.length;i++){
    if(distance<=lengths[i]||i===lengths.length-1){
      const q=lengths[i]===0?0:distance/lengths[i];
      return {x:points[i].x+(points[i+1].x-points[i].x)*q,y:points[i].y+(points[i+1].y-points[i].y)*q};
    }
    distance-=lengths[i];
  }
  return points[0];
}
export function evaluateMotion(motion, seconds) {
  const state={dx:0,dy:0,rotation:0,scale:1,opacity:1,fill:1};
  if(!motion)return state;
  if(seconds<motion.start){state.opacity=0;return state;}
  const local=Math.min(seconds,motion.end)-motion.start;
  const period=motion.period??2.5;
  const wave=Math.sin(local*2*Math.PI/period);
  const amplitude=motion.amplitude??4;
  const progress=Math.max(0,Math.min(1,local/(motion.end-motion.start)));
  if(motion.type==='float')state.dy=wave*amplitude;
  if(motion.type==='sway'||motion.type==='gesture')state.rotation=wave*amplitude;
  if(motion.type==='pulse')state.opacity=.8+.2*(.5+.5*wave);
  if(motion.type==='reveal')state.opacity=Math.min(1,local/.35);
  if(motion.type==='dissolve')state.opacity=1-progress;
  if(motion.type==='fill')state.fill=progress;
  if(motion.type==='signal'){
    const p=seconds>=motion.end?1:(local%period)/period;
    const point=samplePath(motion.path,p);
    state.dx=point.x;state.dy=point.y;
  }
  return state;
}
