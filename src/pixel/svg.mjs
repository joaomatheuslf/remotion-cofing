import {evaluateMotion} from './motion.mjs';
import {pixelGlyphs,textMetrics,wrapText} from './text.mjs';
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
/** Browser/player and render QA use the same scene graph, layout and clock. */
export function renderPixelSvg(spec,seconds,asset=name=>name){
 const sorted=[...spec.elements].sort((a,b)=>a.z-b.z);
 const render=e=>{
  const m=evaluateMotion(e.motion,seconds),pivot=e.pivot??{x:e.width/2,y:e.height/2};let shape='';
  if(e.type==='sprite')shape=`<image xlink:href="${esc(asset(e.asset))}" href="${esc(asset(e.asset))}" width="${e.width}" height="${e.height}" preserveAspectRatio="xMidYMid meet" style="image-rendering:${spec.designer==='pixel-night'?'pixelated':'auto'}"/>`;
  if(e.type==='rect')shape=`<rect rx="${e.radius??0}" width="${e.width*m.fill}" height="${e.height}" fill="${esc(e.fill??'#071935')}"/><rect rx="${e.radius??0}" width="${e.width}" height="${e.height}" fill="none" stroke="${esc(e.stroke??'#39dfff')}" stroke-width="${e.strokeWidth??4}"/>`;
  if(e.type==='path')shape=`<polyline points="${e.points.map(p=>`${p.x},${p.y}`).join(' ')}" fill="${esc(e.fill??'none')}" stroke="${esc(e.stroke??'#39dfff')}" stroke-width="${e.strokeWidth??4}" stroke-linejoin="miter"/>`;
  if(e.type==='text'&&e.font==='pixel')shape=`<g fill="${esc(e.color??'#ffde55')}">${pixelGlyphs(e).map(r=>`<rect x="${r.x}" y="${r.y}" width="${r.width}" height="${r.height}"/>`).join('')}</g>`;
  if(e.type==='text'&&e.font!=='pixel'){const {lineHeight}=textMetrics(e);shape=`<text fill="${esc(e.color??'#fff6e4')}" font-size="${e.fontSize}" font-family="DejaVu Sans Mono, monospace" font-weight="700">${wrapText(e).map((line,i)=>`<tspan x="0" y="${e.fontSize+i*lineHeight}">${esc(line)}</tspan>`).join('')}</text>`;}
  return `<g data-element-id="${esc(e.id)}" opacity="${m.opacity}" transform="translate(${e.x+m.dx} ${e.y+m.dy}) rotate(${m.rotation} ${pivot.x} ${pivot.y})">${shape}${sorted.filter(child=>child.parent===e.id).map(render).join('')}</g>`;
 };
 return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1080 864" width="1080" height="864" shape-rendering="${spec.designer==='pixel-night'?'crispEdges':'geometricPrecision'}" style="width:100%;height:100%"><rect width="1080" height="864" fill="${esc(spec.background.color)}"/>${spec.background.asset?`<image xlink:href="${esc(asset(spec.background.asset))}" href="${esc(asset(spec.background.asset))}" width="1080" height="864"/>`:''}${sorted.filter(e=>!e.parent).map(render).join('')}</svg>`;
}
