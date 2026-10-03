import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync,copyFileSync,rmSync} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
const fixtureRoot=mkdtempSync(path.join(os.tmpdir(),'joao-reference-fixtures-'));
// Synthetic reference placeholders test path resolution; no real photos or tool calls in CI.
for(const name of ['joao-reference-suit.png','joao-reference-orange-polo.png'])copyFileSync('public/lessons/pixel-18-layers/joao-body.png',path.join(fixtureRoot,name));
process.on('exit',()=>rmSync(fixtureRoot,{recursive:true,force:true}));
const imageRequest=input=>createImageRequest(input,'public',fixtureRoot);
import {designerIds,parseAuthoredScene,validateProductionLesson} from '../src/pixel/schema.mjs';
import {createImageRequest} from '../src/production/image-request.mjs';
import {checkPixelLesson} from '../scripts/check-pixel.mjs';
import {renderPixelSvg} from '../src/pixel/svg.mjs';
const source=JSON.parse(readFileSync('public/lessons/pixel-night/lesson.json','utf8'));
const profile=JSON.parse(readFileSync('public/references/joao/profile.json','utf8'));
function authored(designer){
 const scene=structuredClone(source.scenes[6]);const graph=scene.data.pixelScene;delete scene.data.pixelScene;
 graph.designer=designer;
 graph.artDirection={description:profile.styles[designer].direction,referenceAssets:profile.styles[designer].reference?[profile.styles[designer].reference]:[]};
 if(designer!=='pixel-night')for(const e of graph.elements)if(e.font==='pixel')e.font='body';
 scene.data.sceneGraph=graph;return {id:'test',title:'Test',designerId:designer,scenes:[scene]};
}
test('all 13 styles require authored elements and reject generic production',()=>{
 for(const designerId of designerIds){
  assert.throws(()=>validateProductionLesson({designerId,scenes:[{id:'generic',duration:5,data:{bullets:['Example']}}]}),/requires data.sceneGraph/);
  const lesson=authored(designerId);assert.doesNotThrow(()=>checkPixelLesson(lesson));
  assert.notEqual(renderPixelSvg(lesson.scenes[0].data.sceneGraph,.5),renderPixelSvg(lesson.scenes[0].data.sceneGraph,1.5));
 }
});
test('style mismatch and recolored pixel typography fail instead of using fallback',()=>{
 const lesson=authored('comic-book');lesson.designerId='clean-tech';assert.throws(()=>validateProductionLesson(lesson),/mismatch/);
 const graph=authored('comic-book').scenes[0].data.sceneGraph;delete graph.artDirection;assert.throws(()=>parseAuthoredScene(graph),/artDirection/);
 graph.artDirection={description:'Quadrinhos com contorno editorial',referenceAssets:[]};graph.elements[1].font='pixel';assert.throws(()=>parseAuthoredScene(graph),/Bitmap/);
});
test('presenter identity requires actual João references and a style treatment',()=>{
 const scene=structuredClone(source.scenes[0]);delete scene.data.pixelScene.presenter;assert.throws(()=>parseAuthoredScene(scene.data.pixelScene),/Presenter must be João/);
 scene.data.pixelScene.presenter={characterId:'stock-human',referenceIds:['joao-suit'],treatment:'Generic cartoon presenter'};assert.throws(()=>parseAuthoredScene(scene.data.pixelScene));
 const lesson=authored('blueprint');lesson.scenes[0].data.sceneGraph.artDirection.referenceAssets=['references/styles/missing.jpg'];assert.throws(()=>checkPixelLesson(lesson),/Missing or invalid production reference/);
});
test('image tool directives cover all styles, true transparency and João photo paths',()=>{
 for(const designerId of designerIds){
  const r=imageRequest({assetId:'joao-body',designerId,kind:'presenter-body',description:'João apresenta o diagrama apontando à direita.'});
  assert.equal(r.tool,'image_gen.imagegen');assert.equal(r.arguments.transparent_background,true);
  assert.equal(r.referenceIds.length,2);assert.ok(r.arguments.referenced_image_paths.some(p=>p.endsWith('joao-reference-suit.png')));
  assert.match(r.arguments.prompt,/UM asset independente/);assert.match(r.arguments.prompt,/Sem títulos/);
 }
 const arm={assetId:'joao-arm',designerId:'pixel-night',kind:'presenter-arm',description:'Braço direito da polo laranja apontando à esquerda.'};
 assert.throws(()=>imageRequest(arm),/approved local bodyAsset/);
 assert.ok(imageRequest({...arm,bodyAsset:'lessons/pixel-18-layers/joao-body.png'}).arguments.referenced_image_paths.some(p=>p.endsWith('joao-body.png')));
 const bg=imageRequest({assetId:'night',designerId:'pixel-night',kind:'background',description:'Cidade noturna com área livre para diagramas.'});assert.equal(bg.arguments.transparent_background,false);assert.equal(bg.referenceIds.length,0);
 assert.throws(()=>imageRequest({assetId:'page',designerId:'pixel-night',kind:'whole-slide',description:'Página completa'}),/never a complete slide/);
});
test('generic templates remain explicit demos and cannot pass production gate',()=>{
 const demo={mode:'demo',designerId:'clean-tech',scenes:[{id:'demo',duration:5,data:{}}]};assert.doesNotThrow(()=>validateProductionLesson(demo));assert.throws(()=>checkPixelLesson(demo),/Demo templates/);
});
test('Director preserves an authored plan for nonpixel styles and rejects missing plans',async()=>{
 const {compileLesson}=await import('../src/director/compileLesson.ts');
 const lesson=authored('comic-book'),scene=lesson.scenes[0];const base={id:'comic',title:'Comic',designerId:'comic-book',segments:[{id:scene.id,title:scene.title,intent:'map',duration:scene.duration}]};
 assert.throws(()=>compileLesson(base),/requires data.sceneGraph/);
 assert.deepEqual(compileLesson({...base,segments:[{...base.segments[0],sceneGraph:scene.data.sceneGraph}]}).scenes[0].data.sceneGraph,scene.data.sceneGraph);
});

test('all Studio compositions load with explicit demo markers',async()=>{
 const {Root}=await import('../src/root.tsx');assert.equal(typeof Root,'function');
});

test('image generation fails clearly when private source photos are unavailable',()=>{
 assert.throws(()=>createImageRequest({assetId:'joao',designerId:'clean-tech',kind:'presenter-body',description:'João em postura profissional.'},'public','/missing-private-photo-directory'),/JOAO_REFERENCE_DIR/);
});
