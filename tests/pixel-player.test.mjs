import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const root=new URL('../',import.meta.url);
function player(){
 const read=p=>fs.readFileSync(new URL(p,root),'utf8');
 const lesson=JSON.parse(read('public/lessons/pixel-night/lesson.json'));
 const shared=['motion','text','svg'].map(n=>read(`src/pixel/${n}.mjs`).replace(/^import .*;?\s*$/gm,'').replace(/\bexport /g,'')).join('\n');
 const script=read('entrega-native/html-template.html').match(/<script>([\s\S]*?)<\/script>/)[1].replace('__SHARED_SOURCE__',shared).replace('__LESSON__',JSON.stringify(lesson)).replace('__ASSETS__','{}');
 const elements=new Map(); const create=()=>({innerHTML:'',value:0,textContent:'',classList:{toggle(){},remove(){}},append(){},click(){this.onclick?.();}});
 const get=id=>{if(!elements.has(id))elements.set(id,create());return elements.get(id);};
 let scheduled;
 vm.runInNewContext(script,{document:{getElementById:get,createElement:create,addEventListener(){}},requestAnimationFrame:fn=>{scheduled=fn;}});
 return {get,step:stamp=>scheduled(stamp)};
}
test('HTML playback animates elements and advances across scenes',()=>{
 const p=player(),canvas=p.get('canvas'); const initial=canvas.innerHTML;
 p.get('play').click(); p.step(100);p.step(1100);
 assert.notEqual(canvas.innerHTML,initial,'element transforms should change during a scene');
 p.step(5100);assert.match(p.get('meta').textContent,/02 \/ 18/);
 p.get('play').click();const paused=canvas.innerHTML;p.step(6100);assert.equal(canvas.innerHTML,paused);
});
test('HTML supports next, previous, seek, restart and replay at the end',()=>{
 const p=player();p.get('next').click();assert.match(p.get('meta').textContent,/02 \/ 18/);
 p.get('prev').click();assert.match(p.get('meta').textContent,/01 \/ 18/);
 p.get('seek').value=150;p.get('seek').oninput();assert.match(p.get('meta').textContent,/18 \/ 18/);
 p.get('play').click();assert.match(p.get('meta').textContent,/01 \/ 18/);
 p.get('restart').click();assert.match(p.get('play').textContent,/Reproduzir/);assert.equal(p.get('seek').value,0);
});
