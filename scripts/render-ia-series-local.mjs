/** Offline MP4 export from the same SVG scene graph/clock as the HTML player and Remotion. */
import {readFileSync,mkdirSync} from 'node:fs';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const sharp=require('sharp');
import {renderPixelSvg} from '../src/pixel/svg.mjs';
import {validateProductionLesson} from '../src/pixel/schema.mjs';

const id=process.argv[2]??'01';
const lesson=JSON.parse(readFileSync(`public/lessons/ia-series/aula-${id}.json`,'utf8'));
validateProductionLesson(lesson);
const secondsLimit=process.argv[3]?Number(process.argv[3]):Infinity;
const fps=12,width=540,height=432;
const total=Math.min(secondsLimit,lesson.scenes.reduce((n,s)=>n+s.duration,0));
const out=`out/ia-series/aula-${id}.mp4`;mkdirSync(path.dirname(out),{recursive:true});
const used=new Set();for(const s of lesson.scenes){if(s.data.pixelScene.background.asset)used.add(s.data.pixelScene.background.asset);for(const e of s.data.pixelScene.elements)if(e.asset)used.add(e.asset)}
const assets=new Map([...used].map(name=>[name,`data:image/png;base64,${readFileSync(path.join('public',name)).toString('base64')}`]));
const video=spawn('ffmpeg',['-y','-loglevel','error','-f','rawvideo','-pixel_format','rgb24','-video_size',`${width}x${height}`,'-framerate',String(fps),'-i','pipe:0','-vf','scale=1080:864:flags=neighbor','-c:v','libx264','-preset','veryfast','-pix_fmt','yuv420p','-crf','23',out],{stdio:['pipe','inherit','inherit']});
let videoError;video.on('error',e=>videoError=e);
const starts=[0];for(const s of lesson.scenes)starts.push(starts.at(-1)+s.duration);
for(let frame=0;frame<Math.ceil(total*fps);frame++){
 const t=frame/fps;let i=lesson.scenes.findIndex((_,j)=>t<starts[j+1]);if(i<0)i=lesson.scenes.length-1;
 const svg=renderPixelSvg(lesson.scenes[i].data.pixelScene,t-starts[i],name=>assets.get(name));
 const rgb=await sharp(Buffer.from(svg)).resize(width,height).removeAlpha().raw().toBuffer();
 if(!video.stdin.write(rgb))await once(video.stdin,'drain');
 if(frame%240===0)process.stdout.write(`Aula ${id}: ${Math.round(t)}s / ${Math.round(total)}s\n`);
}
video.stdin.end();const [code]=await once(video,'close');if(videoError)throw videoError;if(code!==0)throw new Error(`ffmpeg exit ${code}`);
console.log(out);
