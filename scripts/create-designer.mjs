import fs from "node:fs";
import path from "node:path";

const id=process.argv[2];
if(!id){console.error("Uso: npm run designer:new -- meu-designer");process.exit(1);}
if(!/^[a-z0-9-]+$/.test(id)){console.error("Use apenas letras minúsculas, números e hífens.");process.exit(1);}

const dir=path.join(process.cwd(),"src","designers");
const file=path.join(dir,id+".ts");
if(fs.existsSync(file)){console.error("Designer já existe:",file);process.exit(1);}

const pascal=id.split("-").map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join("");
const lines=[
  'import {DesignerDefinition} from "./types";',
  "",
  "export const "+pascal+"Designer = {",
  '  id: "'+id+'",',
  '  name: "'+pascal+'",',
  '  description: "Novo designer visual.",',
  "  tokens: {",
  '    colors: {bg:"#101820",panel:"#182630",cream:"#ffffff",yellow:"#ffd166",cyan:"#5ee7ff",green:"#7ee787",pink:"#ff7ac6",red:"#ff6b6b",ink:"#101820",white:"#ffffff",text:"#ffffff",muted:"#9fb0bd"},',
  '    shape: {radius:16,borderWidth:2,tagRadius:12},',
  '    shadow: {x:0,y:8,blur:20,color:"rgba(0,0,0,.18)"},',
  '    typography: {title:"Arial, sans-serif",body:"Arial, sans-serif",titleWeight:800,bodyWeight:600},',
  '    backgrounds: {scene:"#101820",title:"linear-gradient(135deg,#101820,#234)",panel:"#ffffff"}',
  "  },",
  '  motion: {enter:"fade",emphasis:"scale",error:"shake",speed:1},',
  '  variants: {panel:"clean",tag:"pill",title:"minimal",scene:"clean-tech"}',
  "} satisfies DesignerDefinition;",
  "",
];
fs.writeFileSync(file,lines.join("\n"));
console.log("Criado:",file);
console.log("Registre o novo ID em src/designers/types.ts e src/designers/registry.ts");

console.log("Produção exige também registro em src/pixel/schema.mjs e direção/referências em public/references/joao/profile.json. Leia docs/AUTHORED_PRODUCTION.md e docs/ASSET_GENERATION.md.");
