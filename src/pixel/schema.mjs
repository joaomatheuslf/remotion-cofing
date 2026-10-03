import {z} from 'zod';
const point=z.object({x:z.number().finite(),y:z.number().finite()});
const motion=z.object({
  type:z.enum(['float','sway','pulse','signal','fill','gesture','reveal','dissolve']),
  purpose:z.enum(['ambient','teaching']),explanation:z.string().min(12),
  start:z.number().nonnegative(),end:z.number().positive(),
  amplitude:z.number().nonnegative().max(16).optional(),period:z.number().min(.3).optional(),
  path:z.array(point).min(2).optional(),
}).superRefine((m,ctx)=>{
  if(m.end<=m.start)ctx.addIssue({code:'custom',message:'motion.end must follow motion.start'});
  if(m.type==='signal'&&!m.path)ctx.addIssue({code:'custom',message:'A signal needs a real path through the diagram'});
  if(m.type==='signal'&&m.path&&new Set(m.path.map(p=>`${p.x},${p.y}`)).size<2)ctx.addIssue({code:'custom',message:'Signal path must move'});
});
const element=z.object({
  id:z.string().min(1),type:z.enum(['sprite','text','rect','path']),
  role:z.enum(['title','copy','illustration','presenter-body','presenter-arm','node','connection','signal','caption']),
  x:z.number().finite(),y:z.number().finite(),width:z.number().positive(),height:z.number().positive(),z:z.number().int(),
  parent:z.string().optional(),asset:z.string().min(1).optional(),text:z.string().min(1).optional(),font:z.enum(['pixel','body']).optional(),fontSize:z.number().min(14).max(56).optional(),
  color:z.string().optional(),fill:z.string().optional(),stroke:z.string().optional(),strokeWidth:z.number().positive().optional(),
  points:z.array(point).min(2).optional(),pivot:point.optional(),motion:motion.optional(),
}).superRefine((e,ctx)=>{
  if(e.type==='sprite'&&!e.asset)ctx.addIssue({code:'custom',message:'Sprite asset is required'});
  if(e.type==='text'&&(!e.text||!e.fontSize))ctx.addIssue({code:'custom',message:'Native text and fontSize are required'});
  if(e.type==='path'&&!e.points)ctx.addIssue({code:'custom',message:'Connection points are required'});
  if(e.type==='sprite'&&e.width*e.height>1080*864*.7)ctx.addIssue({code:'custom',message:'A full slide cannot be a foreground sprite. Export semantic elements separately.'});
});
export const PixelSceneSchema=z.object({
  version:z.literal(1),designer:z.literal('pixel-night'),canvas:z.object({width:z.literal(1080),height:z.literal(864),fps:z.literal(30)}),
  teachingGoal:z.string().min(12),background:z.object({color:z.string(),asset:z.string().optional()}),elements:z.array(element).min(3),
}).strict().superRefine((s,ctx)=>{
  const ids=new Set(s.elements.map(e=>e.id));
  if(ids.size!==s.elements.length)ctx.addIssue({code:'custom',message:'Element IDs must be unique'});
  if(!s.elements.some(e=>e.type==='text'))ctx.addIssue({code:'custom',message:'Use native text; do not bake labels into a full slide'});
  if(!s.elements.some(e=>e.role==='illustration'||e.role==='node'||e.role==='presenter-body'))ctx.addIssue({code:'custom',message:'Pixel Night needs separate visual elements, not a title/card-only scene'});
  if(!s.elements.some(e=>e.motion?.purpose==='teaching'&&!['reveal','float','sway'].includes(e.motion.type)))ctx.addIssue({code:'custom',message:'At least one in-scene teaching motion is required. Entrances, transitions and ambient bobbing are insufficient.'});
  for(const e of s.elements){
    if(e.parent&&!ids.has(e.parent))ctx.addIssue({code:'custom',message:`Unknown parent for ${e.id}`});
    const seen=new Set([e.id]);let parent=e.parent;
    while(parent){if(seen.has(parent)){ctx.addIssue({code:'custom',message:`Rig cycle at ${e.id}`});break;}seen.add(parent);parent=s.elements.find(p=>p.id===parent)?.parent;}
    if(e.role==='presenter-arm'&&(!e.parent||!e.pivot))ctx.addIssue({code:'custom',message:'Presenter arm must have a parent and shoulder pivot'});
  }
});
export function parsePixelScene(input){return PixelSceneSchema.parse(input);}
export function validatePixelLesson(lesson){
  if((lesson.designerId??'pixel-night')!=='pixel-night')return;
  for(const scene of lesson.scenes){
    if(!scene.data?.pixelScene)throw new Error(`Pixel Night scene "${scene.id}" requires data.pixelScene. Generic templates, full-slide images and legacy flags are not production scenes. See docs/PIXEL_NIGHT_PRODUCTION.md.`);
    const spec=parsePixelScene(scene.data.pixelScene);
    for(const e of spec.elements)if(e.motion&&e.motion.end>scene.duration)throw new Error(`Motion ${scene.id}/${e.id} exceeds scene duration`);
  }
}
