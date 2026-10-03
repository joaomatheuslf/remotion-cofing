import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import path from 'node:path';
import {validatePixelLesson} from '../src/pixel/schema.mjs';
import {renderPixelSvg} from '../src/pixel/svg.mjs';
const lesson=JSON.parse(readFileSync(process.argv[2]??'public/lessons/pixel-night/lesson.json','utf8'));
validatePixelLesson(lesson);
const output=process.argv[3]??'out/pixel-qa';mkdirSync(output,{recursive:true});
const assets=new Map();const asset=name=>{
 if(!assets.has(name)){const file=path.resolve('public',name);const mime=name.endsWith('.svg')?'image/svg+xml':'image/png';assets.set(name,`data:${mime};base64,${readFileSync(file).toString('base64')}`);}
 return assets.get(name);
};
for(const [i,scene] of lesson.scenes.entries())for(const seconds of [0,Math.min(2,scene.duration/2),Math.max(0,scene.duration-.2)]){
 writeFileSync(path.join(output,`scene-${String(i+1).padStart(2,'0')}-${seconds.toFixed(1)}.svg`),renderPixelSvg(scene.data.pixelScene,seconds,asset));
}
console.log(`Preview: ${lesson.scenes.length} scenes × 3 samples at ${output}`);
