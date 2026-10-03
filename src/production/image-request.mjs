import {readFileSync,existsSync} from 'node:fs';
import path from 'node:path';
/** Prepare a concrete tool call; never pretend the renderer generates images. */
export function createImageRequest({assetId,designerId,kind,description,bodyAsset},publicRoot='public',privateReferenceRoot=process.env.JOAO_REFERENCE_DIR??path.resolve(publicRoot,'references/joao')){
 if(!/^[a-z0-9-]+$/.test(assetId??''))throw new Error('assetId must use letters, numbers and hyphens');
 const profile=JSON.parse(readFileSync(path.join(publicRoot,'references/joao/profile.json'),'utf8'));
 const style=profile.styles[designerId];if(!style)throw new Error(`Unknown asset designer: ${designerId}`);
 if(!['presenter-body','presenter-arm','prop','background'].includes(kind))throw new Error('Generate one body, arm, prop or background per request; never a complete slide');
 if(typeof description!=='string'||description.trim().length<12)throw new Error('Describe the single asset and its intended action');
 if(kind==='presenter-arm'&&(!bodyAsset||bodyAsset.includes('..')||path.isAbsolute(bodyAsset)))throw new Error('Presenter arm requires an approved local bodyAsset reference');
 const host=kind.startsWith('presenter-');
 const referencePaths=[...(host?profile.references.map(r=>path.resolve(privateReferenceRoot,path.basename(r.path))):[]),...(style.reference?[path.resolve(publicRoot,style.reference)]:[]),...(kind==='presenter-arm'?[path.resolve(publicRoot,bodyAsset)]:[])];
 for(const ref of referencePaths)if(!existsSync(ref))throw new Error(`Missing real reference file: ${ref}. Set JOAO_REFERENCE_DIR or import private photos; never replace João with stock.`);
 const prompt=[
 `Crie UM asset independente para uma aula animada 1080×864 no estilo ${designerId}.`,
 `DIREÇÃO ESTÉTICA: ${style.direction}`,
 `OBJETO: ${description.trim()}`,
 host?`APRESENTADOR: João Matheus. Use as fotos anexadas como referência de identidade. Preserve ${profile.identityAnchors.join('; ')}. Estilize material e traço, mantendo a identidade. A foto não é o asset final.`:'Não inclua personagens humanos extras.',
 kind==='presenter-body'?'Exporte o corpo do apresentador em pose adequada à ação. Deixe o braço que gesticula para um asset separado; mantenha o ombro compatível com a peça do braço. Preserve o outro braço quando necessário.':kind==='presenter-arm'?'Exporte SOMENTE o braço e mão que gesticulam, com área do ombro para articulação. Combine roupa, proporção, luz e orientação com o corpo aprovado, que deve ser anexado como referência adicional.':'' ,
 kind==='background'?'Somente cenário. Sem apresentador, diagramas, título ou conteúdo explicativo. Deixe área de leitura com pouco ruído.':'Fundo realmente transparente, objeto inteiro, sem cortar cabeça, mãos, pés ou bordas. Não inclua cenário, outros objetos ou sombra de outro elemento.',
 'Sem títulos, parágrafos, letras, logos, marcas d’água ou slide completo. Textos serão adicionados nativamente no motor.',
 'Referências de estilo definem material, contorno, paleta, textura e hierarquia. Não copie a página de referência como composição final.'
 ].filter(Boolean).join('\n\n');
 return {
  assetId,designerId,kind,referenceIds:host?profile.references.map(r=>r.id):[],
  tool:'image_gen.imagegen',
  arguments:{prompt,transparent_background:kind!=='background',referenced_image_paths:referencePaths},
  output:{path:`assets/generated/${designerId}/${assetId}.png`,role:kind,oneObjectPerFile:true,needsVisualReview:true},
  assembly:kind==='presenter-arm'?{parent:'joao-body',pivot:'Marcar o ombro na peça final antes de animar.',requiresApprovedBodyReference:true}:null,
 };
}
