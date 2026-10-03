// Exercise the real Director compiler without adding a runtime dependency.
import {registerHooks} from 'node:module';
import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';
registerHooks({
 resolve(specifier,context,next){
  try{return next(specifier,context);}catch(error){
   if(specifier.startsWith('.')&&context.parentURL){
    for(const ext of ['.ts','.tsx']){const url=new URL(specifier+ext,context.parentURL);if(existsSync(url))return {url:url.href,shortCircuit:true};}
   }
   throw error;
  }
 },
 load(url,context,next){
  if(/\.tsx?$/.test(url))return {format:'module',shortCircuit:true,source:ts.transpileModule(readFileSync(fileURLToPath(url),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText};
  return next(url,context);
 }
});
