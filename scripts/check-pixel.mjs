import {readFileSync,existsSync} from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {validateProductionLesson} from '../src/pixel/schema.mjs';
import {evaluateMotion} from '../src/pixel/motion.mjs';
import {wrapText,textMetrics,pixelGlyphs} from '../src/pixel/text.mjs';
import {pngMetrics} from './pixel-assets.mjs';
export function checkPixelLesson(lesson,publicRoot='public'){
 if(lesson.mode==='demo')throw new Error('Demo templates cannot pass production validation');
 validateProductionLesson(lesson);let assets=new Map(),motions=0;
 const getAsset=name=>{
  if(name.includes('..')||path.isAbsolute(name)||/^https?:/.test(name))throw new Error(`Asset must be a local public path: ${name}`);
  if(/(?:source-)?slide-\d+\.png$/i.test(name))throw new Error(`Flattened slide is forbidden in production: ${name}`);
  if(!assets.has(name))assets.set(name,pngMetrics(path.resolve(publicRoot,name)));
  return assets.get(name);
 };
 for(const scene of lesson.scenes){
  const spec=scene.data.sceneGraph??scene.data.pixelScene;
  const references=spec.artDirection?.referenceAssets??[];
  // Source photographs are private creation inputs, not runtime dependencies of an approved sprite.
  if(spec.presenter){const profile=JSON.parse(readFileSync(path.join(publicRoot,'references/joao/profile.json'),'utf8'));
   if(spec.presenter.referenceIds.some(id=>!profile.references.some(r=>r.id===id)))throw new Error('Unknown presenter reference ID');}
  for(const name of references){if(name.includes('..')||path.isAbsolute(name)||!existsSync(path.join(publicRoot,name)))throw new Error(`Missing or invalid production reference: ${name}`);}
  if(spec.background.asset)getAsset(spec.background.asset);
  for(const e of spec.elements){
   if(e.type==='text')wrapText(e);
   if(e.asset&&!getAsset(e.asset).transparent)throw new Error(`Foreground sprite ${scene.id}/${e.id} must have a transparent background`);
   if(e.motion?.purpose==='teaching')motions++;
  }
  for(let t=0;t<=scene.duration+.001;t+=.125){
   const matrixCache=new Map();
   const transform=e=>{
    if(matrixCache.has(e.id))return matrixCache.get(e.id);
    const m=evaluateMotion(e.motion,t),p=e.pivot??{x:e.width/2,y:e.height/2},rad=m.rotation*Math.PI/180,c=Math.cos(rad),s=Math.sin(rad);
    const own=[c,s,-s,c,e.x+m.dx+p.x-c*p.x+s*p.y,e.y+m.dy+p.y-s*p.x-c*p.y];
    let result=own;
    if(e.parent){const a=transform(spec.elements.find(p=>p.id===e.parent));result=[a[0]*c+a[2]*s,a[1]*c+a[3]*s,a[0]*-s+a[2]*c,a[1]*-s+a[3]*c,a[0]*own[4]+a[2]*own[5]+a[4],a[1]*own[4]+a[3]*own[5]+a[5]];}
    matrixCache.set(e.id,result);return result;
   };
   for(const e of spec.elements){
    const m=evaluateMotion(e.motion,t);if(m.opacity<.01)continue;
    let box={x:0,y:0,width:e.width,height:e.height};
    if(e.asset){const image=getAsset(e.asset),scale=Math.min(e.width/image.width,e.height/image.height),b=image.bounds;box={x:(e.width-image.width*scale)/2+b.x*scale,y:(e.height-image.height*scale)/2+b.y*scale,width:b.width*scale,height:b.height*scale};}
    if(e.type==='text'){
     if(e.font==='pixel'){const r=pixelGlyphs(e);const x=Math.min(...r.map(v=>v.x)),y=Math.min(...r.map(v=>v.y));box={x,y,width:Math.max(...r.map(v=>v.x+v.width))-x,height:Math.max(...r.map(v=>v.y+v.height))-y};}
     else {const lines=wrapText(e),metrics=textMetrics(e);box={x:0,y:0,width:Math.max(...lines.map(s=>s.length))*metrics.advance,height:lines.length*metrics.lineHeight};}
    }
    const a=transform(e),corners=[[box.x,box.y],[box.x+box.width,box.y],[box.x,box.y+box.height],[box.x+box.width,box.y+box.height]].map(([x,y])=>[a[0]*x+a[2]*y+a[4],a[1]*x+a[3]*y+a[5]]);
    const margin=e.type==='text'?48:20;
    if(corners.some(([x,y])=>x<margin-.01||x>1080-margin+.01||y<margin-.01||y>864-margin+.01))throw new Error(`Clipping/safe-area failure at ${scene.id}/${e.id}, t=${t.toFixed(3)}. Reposition or resize the element; never hide overflow.`);
   }
  }
 }
 return {scenes:lesson.scenes.length,assets:assets.size,teachingMotions:motions};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const file=process.argv[2]??'public/lessons/pixel-night/lesson.json';
 const result=checkPixelLesson(JSON.parse(readFileSync(file,'utf8')));
 console.log(`Authored production valid: ${result.scenes} scenes, ${result.assets} assets, ${result.teachingMotions} teaching motions. No clipped text or flattened slides.`);
}
