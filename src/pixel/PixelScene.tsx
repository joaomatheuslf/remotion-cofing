import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Scene} from '../engine/types';
import type {PixelElement} from './types';
import {parsePixelScene} from './schema.mjs';
import {evaluateMotion} from './motion.mjs';
import {pixelGlyphs,textMetrics,wrapText} from './text.mjs';

export const PixelScene:React.FC<{scene:Scene}>=({scene})=>{
 const frame=useCurrentFrame(),{fps}=useVideoConfig(),seconds=frame/fps;
 const spec=React.useMemo(()=>parsePixelScene(scene.data?.pixelScene),[scene.data?.pixelScene]);
 const sorted=[...spec.elements].sort((a,b)=>a.z-b.z);
 const renderElement=(e:PixelElement):React.ReactNode=>{
  const m=evaluateMotion(e.motion,seconds),pivot=e.pivot??{x:e.width/2,y:e.height/2};
  const children=sorted.filter(child=>child.parent===e.id);
  let content:React.ReactNode;
  if(e.type==='sprite')content=<image href={staticFile(e.asset!)} width={e.width} height={e.height} preserveAspectRatio="xMidYMid meet" style={{imageRendering:'pixelated'}}/>;
  else if(e.type==='rect')content=<g><rect width={e.width*m.fill} height={e.height} fill={e.fill??'#071935'}/><rect width={e.width} height={e.height} fill="none" stroke={e.stroke??'#39dfff'} strokeWidth={e.strokeWidth??4}/></g>;
  else if(e.type==='path')content=<polyline points={e.points!.map(p=>`${p.x},${p.y}`).join(' ')} fill={e.fill??'none'} stroke={e.stroke??'#39dfff'} strokeWidth={e.strokeWidth??4} strokeLinejoin="miter"/>;
  else if(e.font==='pixel')content=<g fill={e.color??'#ffde55'}>{pixelGlyphs(e).map((r,i)=><rect key={i} {...r}/>)}</g>;
  else {const {lineHeight}=textMetrics(e);content=<text fill={e.color??'#fff6e4'} fontSize={e.fontSize} fontFamily="DejaVu Sans Mono, monospace" fontWeight={700}>{wrapText(e).map((line,i)=><tspan key={i} x={0} y={e.fontSize!+i*lineHeight}>{line}</tspan>)}</text>;}
  return <g key={e.id} data-element-id={e.id} opacity={m.opacity} transform={`translate(${e.x+m.dx} ${e.y+m.dy}) rotate(${m.rotation} ${pivot.x} ${pivot.y})`}>
    {content}{children.map(renderElement)}
   </g>;
 };
 return <AbsoluteFill style={{background:spec.background.color}}>
  {spec.background.asset?<Img src={staticFile(spec.background.asset)} style={{position:'absolute',inset:0,width:1080,height:864,imageRendering:'pixelated'}}/>:null}
  <svg viewBox="0 0 1080 864" width={1080} height={864} shapeRendering="crispEdges" style={{position:'absolute',inset:0}}>{sorted.filter(e=>!e.parent).map(renderElement)}</svg>
 </AbsoluteFill>;
};
