import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {parsePixelScene,validatePixelLesson} from '../src/pixel/schema.mjs';
import {evaluateMotion,samplePath} from '../src/pixel/motion.mjs';
import {wrapText} from '../src/pixel/text.mjs';
import {renderPixelSvg} from '../src/pixel/svg.mjs';
import {checkPixelLesson} from '../scripts/check-pixel.mjs';
const lesson=JSON.parse(readFileSync('public/lessons/pixel-night/lesson.json','utf8'));
const clone=()=>structuredClone(lesson.scenes[6].data.pixelScene);
test('the entire 18-scene production lesson passes asset, rig, text and animated safe-area checks',()=>{
 const result=checkPixelLesson(lesson);assert.equal(result.scenes,18);assert.ok(result.teachingMotions>18);
});
test('default Pixel Night refuses generic templates, legacy screenshots and missing plans',()=>{
 for(const data of [{bullets:['Texto']},{pixelStoryboard:true,asset:'slide.png'},{pixelLayered:true,slide:1},{sourceBackplate:'slide.png'}])assert.throws(()=>validatePixelLesson({scenes:[{id:'bad',duration:5,data}]}),/requires data.pixelScene/);
 assert.doesNotThrow(()=>validatePixelLesson({designerId:'clean-tech',scenes:[{id:'ok',duration:5,data:{bullets:['Texto']}}]}));
});
test('entrance-only and ambient-only scenes cannot masquerade as animated teaching',()=>{
 const spec=clone();for(const e of spec.elements)if(e.motion)e.motion={...e.motion,type:'reveal',purpose:'teaching'};
 assert.throws(()=>parsePixelScene(spec),/in-scene teaching motion/);
 for(const e of spec.elements)if(e.motion)e.motion.purpose='ambient';assert.throws(()=>parsePixelScene(spec),/in-scene teaching motion/);
});
test('flattened foreground slides and cyclic presenter rigs are rejected',()=>{
 const spec=clone();spec.elements.push({id:'whole-slide',type:'sprite',role:'illustration',asset:'slide.png',x:0,y:0,width:1080,height:864,z:999});assert.throws(()=>parsePixelScene(spec),/full slide/);
 const rig=structuredClone(lesson.scenes[0].data.pixelScene);rig.elements.find(e=>e.id==='joao-body').parent='joao-arm';assert.throws(()=>parsePixelScene(rig),/Rig cycle/);
});
test('a neural signal follows the actual connection rather than a scene transition',()=>{
 const motion=clone().elements.find(e=>e.id==='network-signal-0').motion;
 const a=evaluateMotion(motion,.5),b=evaluateMotion(motion,1.2);assert.notDeepEqual([a.dx,a.dy],[b.dx,b.dy]);
 assert.deepEqual(samplePath([{x:10,y:10},{x:10,y:40},{x:50,y:40}],3/7),{x:10,y:40});
 const spec=clone();assert.notEqual(renderPixelSvg(spec,.5),renderPixelSvg(spec,1.2));
});
test('diffusion removes noise while the clean image remains a separate object',()=>{
 const scene=lesson.scenes[15];const noise=scene.data.pixelScene.elements.find(e=>e.id==='noise-0');assert.equal(evaluateMotion(noise.motion,0).opacity,1);assert.equal(evaluateMotion(noise.motion,scene.duration).opacity,0);assert.ok(scene.data.pixelScene.elements.some(e=>e.id==='clean-wall'&&!e.motion));
});
test('long Portuguese labels reflow or fail instead of being clipped',()=>{
 const e={id:'title',text:'INTELIGÊNCIA ARTIFICIAL',font:'pixel',fontSize:35,width:390,height:120};assert.equal(wrapText(e).length,2);
 assert.throws(()=>wrapText({...e,height:40}),/never crop/);
});
test('an animation that leaves the canvas fails the same gate used before render',()=>{
 const bad=structuredClone(lesson);const e=bad.scenes[6].data.pixelScene.elements.find(e=>e.id==='network-signal-0');e.motion.path[1].x=1500;assert.throws(()=>checkPixelLesson(bad),/Clipping\/safe-area/);
});
test('the real Director compiler refuses a generic default and preserves an authored pixel plan',async()=>{
 const {compileLesson}=await import('../src/director/compileLesson.ts');
 const base={id:'test',title:'Test',segments:[{id:'network',intent:'map',title:'Rede',duration:5,content:['Entrada','Saída']}]};
 assert.throws(()=>compileLesson(base),/requires data.sceneGraph/);
 const spec=clone();for(const e of spec.elements)if(e.motion)e.motion.end=5;
 const compiled=compileLesson({...base,segments:[{...base.segments[0],pixel:spec}]});
 assert.equal(compiled.designerId,'pixel-night');assert.deepEqual(compiled.scenes[0].data.pixelScene,spec);
 assert.equal(compileLesson({...base,designerId:'clean-tech',mode:'demo'}).designerId,'clean-tech');
});
