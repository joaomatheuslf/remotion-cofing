import {createImageRequest} from '../src/production/image-request.mjs';
const args=process.argv.slice(2),flags={};for(let i=0;i<args.length;i+=2)flags[args[i]]=args[i+1];
const request=createImageRequest({assetId:flags['--id'],designerId:flags['--style'],kind:flags['--kind'],description:flags['--description'],bodyAsset:flags['--body']});
console.log(JSON.stringify(request,null,2));
