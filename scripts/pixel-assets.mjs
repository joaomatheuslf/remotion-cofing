import {inflateSync} from 'node:zlib';
import {readFileSync} from 'node:fs';
export function pngMetrics(file){
 const data=readFileSync(file);if(data.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw new Error(`Expected a PNG sprite: ${file}`);
 const width=data.readUInt32BE(16),height=data.readUInt32BE(20),depth=data[24],type=data[25];
 if(depth!==8||![2,6].includes(type)||data[28]!==0)throw new Error(`Use non-interlaced 8-bit RGB/RGBA PNG: ${file}`);
 if(type===2)return {width,height,transparent:false,bounds:{x:0,y:0,width,height}};
 const chunks=[];for(let offset=8;offset<data.length;){const size=data.readUInt32BE(offset);if(data.subarray(offset+4,offset+8).toString()==='IDAT')chunks.push(data.subarray(offset+8,offset+8+size));offset+=size+12;}
 const raw=inflateSync(Buffer.concat(chunks)),stride=width*4;let previous=Buffer.alloc(stride),minX=width,minY=height,maxX=-1,maxY=-1,transparent=false;
 const paeth=(a,b,c)=>{const p=a+b-c,pa=Math.abs(p-a),pb=Math.abs(p-b),pc=Math.abs(p-c);return pa<=pb&&pa<=pc?a:pb<=pc?b:c;};
 for(let y=0;y<height;y++){
  const filter=raw[y*(stride+1)],row=Buffer.from(raw.subarray(y*(stride+1)+1,(y+1)*(stride+1)));
  for(let x=0;x<stride;x++){const a=x>=4?row[x-4]:0,b=previous[x],c=x>=4?previous[x-4]:0;row[x]=(row[x]+(filter===0?0:filter===1?a:filter===2?b:filter===3?Math.floor((a+b)/2):paeth(a,b,c)))&255;}
  for(let x=0;x<width;x++){const alpha=row[x*4+3];if(alpha===0)transparent=true;if(alpha>8){minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);}}
  previous=row;
 }
 if(maxX<0)throw new Error(`Empty sprite: ${file}`);
 return {width,height,transparent,bounds:{x:minX,y:minY,width:maxX-minX+1,height:maxY-minY+1}};
}
