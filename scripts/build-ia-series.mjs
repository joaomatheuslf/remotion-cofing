import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import path from 'node:path';
import {validateProductionLesson} from '../src/pixel/schema.mjs';

const content=JSON.parse(readFileSync('examples/mini-lessons/ia-series/series-content.json','utf8'));
const target='public/lessons/ia-series';
const sharedAssets={night:'night-background', 'joao-body':'joao-body', 'joao-arm':'joao-arm'};
const asset=name=>sharedAssets[name]?`lessons/pixel-18-layers/${sharedAssets[name]}.png`:`lessons/ia-series/assets/${name}.png`;
const C={cyan:'#21e7f4',gold:'#ffdc58',white:'#f4f9ff',blue:'#0b2f58'};
const motion=(type,explanation,start=0,end=20,extra={})=>({type,purpose:'teaching',explanation,start,end,...extra});
const rect=(id,x,y,w,h,z,fill='#071c39',stroke=C.cyan)=>({id,type:'rect',role:'illustration',x,y,width:w,height:h,z,fill,stroke,strokeWidth:4});
const txt=(id,text,x,y,w,h,size,z,role='copy',color=C.white,start=0)=>({id,type:'text',role,x,y,width:w,height:h,z,text,font:'body',fontSize:size,color,motion:motion('reveal',`Revelar ${id} na ordem da explicação.`,start,20)});
const sprite=(id,name,x,y,w,h,z,mode='pulse')=>({id,type:'sprite',role:'illustration',x,y,width:w,height:h,z,asset:asset(name),motion:motion(mode,`Mover o elemento ${id} para representar a etapa explicada.`,.3,19.5,{period:3,amplitude:mode==='sway'?3:4})});
const pathLine=(id,x,y,pts,z=6)=>({id,type:'path',role:'connection',x,y,width:Math.max(...pts.map(p=>p.x))+8,height:Math.max(...pts.map(p=>p.y))+8,z,points:pts,stroke:C.cyan,strokeWidth:5});
const signal=(id,points,start=1)=>({id,type:'rect',role:'signal',x:0,y:0,width:16,height:16,z:9,fill:C.gold,stroke:'#fff6b0',strokeWidth:2,motion:motion('signal',`O sinal ${id} percorre de fato a conexão entre entrada, transformação e saída.`,start,19.5,{path:points,period:3.2})});
const presenter=()=>[
  {id:'joao-body',type:'sprite',role:'presenter-body',x:60,y:364,width:280,height:370,z:12,asset:asset('joao-body')},
  {id:'joao-arm',type:'sprite',role:'presenter-arm',parent:'joao-body',pivot:{x:166,y:240},x:0,y:0,width:280,height:370,z:13,asset:asset('joao-arm'),motion:motion('gesture','João aponta para o mecanismo no ritmo da explicação.',0,20,{period:3.5,amplitude:6})},
];
const subjects=[
  [['umbrella','robot'],['robot','generator'],['emails','training'],['umbrella','network']],
  [['emails','robot'],['emails','training'],['emails','robot'],['training','emails']],
  [['cat','network'],['cat','network'],['network','cat-result'],['cat','cat-result']],
  [['cat','deep'],['cat','network'],['network','deep'],['deep','cat-result']],
  [['emails','generator'],['generator','image'],['generator','image'],['image','robot']],
  [['token-1','token-2'],['token-1','token-3'],['token-2','token-3'],['token-3','generator']],
  [['noise','refine'],['noise','refine'],['refine','image'],['noise','image']],
];
const captions=[
  [['MUITAS FORMAS','UM CAMPO'],['RECONHECER','PLANEJAR'],['1955: PROPOSTA','1956: ENCONTRO'],['REGRAS + DADOS','SOB A IA']],
  [['EXEMPLOS','RÓTULOS'],['TREINO','AJUSTE'],['E-MAIL NOVO','TESTE'],['PADRÃO','PREVISÃO']],
  [['IMAGEM','NÚMEROS'],['ENTRADA','CONEXÕES'],['PESOS','AJUSTES'],['SINAL','GATO']],
  [['IMAGEM','CAMADAS'],['BORDAS','SINAIS'],['FORMAS','COMBINAÇÕES'],['CAMADAS','RECONHECER']],
  [['PEDIDO','MODELO'],['PADRÕES','CRIAÇÃO'],['GERAR','CONTEÚDOS'],['RESULTADO','CONFERIR']],
  [['TEXTO','TOKENS'],['DIVIDIR','UNIDADES'],['CONTEXTO','PRÓXIMO'],['TOKENS','RESPOSTA']],
  [['EXEMPLOS','APRENDER'],['RUÍDO','PONTO INICIAL'],['ETAPAS','REFINAR'],['RUÍDO','IMAGEM']],
];
function networkElements(prefix='network'){
 const nodes=[];const cols=[780,864,948],rows=[350,425,500];
 for(let col=0;col<3;col++)for(let row=0;row<3;row++){
  const x=cols[col],y=rows[row];
  nodes.push({...rect(`${prefix}-node-${col}-${row}`,x,y,24,24,7,col===1?C.gold:C.cyan,'#d8faff'),role:'node',radius:12,motion:motion('pulse','O nó acende quando recebe um sinal de outra camada.',1+col*.8,19.5,{period:2.4})});
 }
 for(let col=0;col<2;col++)for(let row=0;row<3;row++)for(let next=0;next<3;next++){
  const x=cols[col]+12,y=rows[row]+12,xx=cols[col+1]+12,yy=rows[next]+12,top=Math.min(y,yy);
  nodes.push({...pathLine(`${prefix}-wire-${col}-${row}-${next}`,x,top,[{x:0,y:y-top},{x:xx-x,y:yy-top}],5),role:'connection',stroke:next===row?C.gold:'#2b86bc',strokeWidth:next===row?4:2});
 }
 nodes.push(signal(`${prefix}-propagation`,[{x:792,y:362},{x:876,y:437},{x:960,y:362}],2.2));
 return nodes;
}
function visualScene(lessonIndex,pairIndex,pair){
 const first=pairIndex===0;
 const title=first?content[lessonIndex].openingTitle:pair.title;
 const sub=first?content[lessonIndex].question:pair.takeaway;
 const [a,b]=subjects[lessonIndex][pairIndex], [left,right]=captions[lessonIndex][pairIndex];
 const elements=[rect('header',46,42,988,178,0),txt('title',title,69,58,940,68,first?43:48,1,'title',C.gold),txt('subtitle',sub,72,134,925,67,27,2,'caption',C.white,.7),...presenter()];
 if(lessonIndex===0&&pairIndex===0){
  elements.push(sprite('umbrella','umbrella',330,290,640,215,5,'sway'));
  elements.push(sprite('icon-a','robot',410,514,130,130,6),sprite('icon-b','generator',630,514,130,130,6));
  elements.push(pathLine('umbrella-link',504,558,[{x:0,y:0},{x:320,y:0}],7),signal('meaning-flow',[{x:510,y:566},{x:824,y:566}],1.2));
 }else{
  elements.push(sprite('input',a,380,322,235,235,5));
  if((lessonIndex===2||lessonIndex===3)&&(b==='network'||b==='deep'))elements.push(...networkElements());
  else elements.push(sprite('result',b,770,322,225,235,5));
  elements.push(pathLine('flow',599,435,[{x:0,y:0},{x:205,y:0}],7),signal('flow-signal',[{x:607,y:440},{x:793,y:440}],1.3));
 }
 elements.push(txt('input-label',left,383,604,245,70,22,10,'caption',C.cyan,2),txt('result-label',right,769,604,260,70,22,10,'caption',C.gold,4));
 // A mechanism-specific counter, layer, or choice moves in every visual scene.
 elements.push(rect('progress-track',390,696,575,21,3,'#092b4c','#22597b'));
 elements.push({...rect('process-progress',396,702,560,9,4,C.gold,C.gold),motion:motion('fill',`A barra acompanha a transformação: ${left} para ${right}.`,2,17)});
 return {id:`aula-${lessonIndex+1}-visual-${pairIndex+1}`,kind:'diagram',title,duration:20,data:{pixelScene:{version:1,designer:'pixel-night',canvas:{width:1080,height:864,fps:30},presenter:{characterId:'joao-matheus',referenceIds:['joao-orange-polo'],treatment:'João Matheus em pixel art, óculos, cabelo curto e barba grisalha; corpo e braço independentes.'},teachingGoal:`Mostrar em movimento a relação entre ${left} e ${right} na aula de ${content[lessonIndex].name}.`,background:{color:'#061a37',asset:asset('night')},elements}}};
}
function explanationScene(lessonIndex,pairIndex,pair){
 const [a,b]=subjects[lessonIndex][pairIndex], [left,right]=captions[lessonIndex][pairIndex];
 const elements=[rect('header',45,40,990,175,0),txt('number',`AULA ${String(lessonIndex+1).padStart(2,'0')}  /  EXPLICAÇÃO`,74,58,920,52,24,1,'caption',C.cyan),txt('title',pair.title,74,111,930,75,46,2,'title',C.gold,.4),rect('copy-panel',68,244,944,347,3,'#07172f','#1b719b'),txt('body',pair.body,100,273,850,278,34,4,'copy',C.white,1.2),pathLine('teaching-path',140,618,[{x:0,y:0},{x:725,y:0}],5),signal('key-signal',[{x:155,y:624},{x:855,y:624}],2),rect('takeaway-panel',89,655,900,102,4,'#0d3551',C.cyan),txt('takeaway',pair.takeaway,116,681,842,65,27,7,'caption',C.gold,5)];
 // A subject-specific small element remains separate and reacts during the explanation.
 elements.push(sprite('topic-icon',b,852,507,120,100,8));
 return {id:`aula-${lessonIndex+1}-text-${pairIndex+1}`,kind:'explain',title:pair.title,duration:20,data:{pixelScene:{version:1,designer:'pixel-night',canvas:{width:1080,height:864,fps:30},teachingGoal:`Explicar ${pair.title.toLowerCase()} com texto progressivo e reforço visual do conceito ${right}.`,background:{color:'#061a37',asset:asset('night')},elements}}};
}
mkdirSync(target,{recursive:true});
const lessons=content.map((lesson,i)=>{
 const scenes=lesson.pairs.flatMap((pair,j)=>[visualScene(i,j,pair),explanationScene(i,j,pair)]);
 const result={mode:'production',id:lesson.id,title:lesson.name,designerId:'pixel-night',scenes};
 validateProductionLesson(result);
 const file=path.join(target,`${lesson.id}.json`);writeFileSync(file,JSON.stringify(result,null,2)+'\n');
 return {id:lesson.id,title:lesson.name,file,scenes:scenes.length};
});
writeFileSync(path.join(target,'index.json'),JSON.stringify(lessons,null,2)+'\n');
console.log(`Generated ${lessons.length} lessons / ${lessons.reduce((sum,l)=>sum+l.scenes,0)} separated-element scenes.`);
