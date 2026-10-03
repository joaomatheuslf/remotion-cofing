/** A small local 5×7 pixel alphabet; no font CDN or font-loading race. */
const patterns={
 A:'01110/10001/10001/11111/10001/10001/10001',B:'11110/10001/10001/11110/10001/10001/11110',C:'01111/10000/10000/10000/10000/10000/01111',D:'11110/10001/10001/10001/10001/10001/11110',E:'11111/10000/10000/11110/10000/10000/11111',F:'11111/10000/10000/11110/10000/10000/10000',G:'01111/10000/10000/10111/10001/10001/01111',H:'10001/10001/10001/11111/10001/10001/10001',I:'11111/00100/00100/00100/00100/00100/11111',J:'00111/00010/00010/00010/10010/10010/01100',K:'10001/10010/10100/11000/10100/10010/10001',L:'10000/10000/10000/10000/10000/10000/11111',M:'10001/11011/10101/10101/10001/10001/10001',N:'10001/11001/10101/10011/10001/10001/10001',O:'01110/10001/10001/10001/10001/10001/01110',P:'11110/10001/10001/11110/10000/10000/10000',Q:'01110/10001/10001/10001/10101/10010/01101',R:'11110/10001/10001/11110/10100/10010/10001',S:'01111/10000/10000/01110/00001/00001/11110',T:'11111/00100/00100/00100/00100/00100/00100',U:'10001/10001/10001/10001/10001/10001/01110',V:'10001/10001/10001/10001/10001/01010/00100',W:'10001/10001/10001/10101/10101/10101/01010',X:'10001/10001/01010/00100/01010/10001/10001',Y:'10001/10001/01010/00100/00100/00100/00100',Z:'11111/00001/00010/00100/01000/10000/11111',
 '0':'01110/10001/10011/10101/11001/10001/01110','1':'00100/01100/00100/00100/00100/00100/01110','2':'01110/10001/00001/00010/00100/01000/11111','3':'11110/00001/00001/01110/00001/00001/11110','4':'00010/00110/01010/10010/11111/00010/00010','5':'11111/10000/10000/11110/00001/00001/11110','6':'01110/10000/10000/11110/10001/10001/01110','7':'11111/00001/00010/00100/01000/01000/01000','8':'01110/10001/10001/01110/10001/10001/01110','9':'01110/10001/10001/01111/00001/00001/01110',
 '?':'01110/10001/00001/00010/00100/00000/00100','!':'00100/00100/00100/00100/00100/00000/00100','-':'00000/00000/00000/11111/00000/00000/00000','.':'00000/00000/00000/00000/00000/00110/00110',':':'00000/00110/00110/00000/00110/00110/00000',',':'00000/00000/00000/00000/00110/00100/01000','/':'00001/00001/00010/00100/01000/10000/10000',' ':'00000/00000/00000/00000/00000/00000/00000',
};
export function textMetrics(element){
 const unit=Math.max(2,Math.floor((element.fontSize??28)/7));
 return element.font==='pixel'?{advance:unit*6,lineHeight:unit*11,unit}:{advance:(element.fontSize??28)*.62,lineHeight:(element.fontSize??28)*1.35,unit};
}
export function wrapText(element){
 const {advance}=textMetrics(element),limit=Math.floor(element.width/advance),lines=[];
 for(const paragraph of element.text.split('\n')){
  let line='';
  for(const word of paragraph.split(/\s+/)){
   if(word.length>limit)throw new Error(`Text ${element.id}: word "${word}" does not fit`);
   if(line&&(line+' '+word).length>limit){lines.push(line);line=word;}else line=line?line+' '+word:word;
  }
  lines.push(line);
 }
 const {lineHeight}=textMetrics(element);
 if(lines.length*lineHeight>element.height)throw new Error(`Text ${element.id}: ${lines.length} lines need ${Math.ceil(lines.length*lineHeight)}px, available ${element.height}px. Shorten or reflow; never crop.`);
 return lines;
}
export function pixelGlyphs(element){
 const {unit,advance,lineHeight}=textMetrics(element),rects=[];
 wrapText(element).forEach((line,row)=>[...line.toUpperCase()].forEach((character,col)=>{
  const normalized=character.normalize('NFD'),base=normalized[0],pattern=patterns[base]??patterns['?'];
  pattern.split('/').forEach((bits,y)=>[...bits].forEach((bit,x)=>{if(bit==='1')rects.push({x:col*advance+x*unit,y:row*lineHeight+(y+3)*unit,width:unit,height:unit});}));
  const accent=normalized.slice(1);
  const dots=accent.includes('\u0301')?[[2,1],[3,0]]:accent.includes('\u0300')?[[1,0],[2,1]]:accent.includes('\u0302')?[[1,1],[2,0],[3,1]]:accent.includes('\u0303')?[[0,1],[1,0],[2,1],[3,0]]:accent.includes('\u0327')?[[2,10],[1,11]]:[];
  for(const [x,y] of dots)rects.push({x:col*advance+x*unit,y:row*lineHeight+y*unit,width:unit,height:unit});
 }));
 return rects;
}
