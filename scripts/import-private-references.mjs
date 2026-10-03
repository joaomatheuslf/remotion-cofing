import {copyFileSync,existsSync,mkdirSync} from 'node:fs';
import path from 'node:path';
const source=process.argv[2];if(!source)throw new Error('Usage: npm run references:import -- /path/to/host/photos');
const target=process.env.JOAO_REFERENCE_DIR??'references-private';
const files=['joao-reference-suit.png','joao-reference-orange-polo.png'];
for(const file of files)if(!existsSync(path.join(source,file)))throw new Error(`Missing photo ${file} in source directory`);
mkdirSync(target,{recursive:true});for(const file of files)copyFileSync(path.join(source,file),path.join(target,file));
console.log('Two private photo references imported locally. This directory is excluded from git.');
