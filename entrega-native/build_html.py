"""Build the HTML player from the same native Pixel Night scene graph as Remotion."""
from pathlib import Path
import base64,json,shutil,subprocess
root=Path(__file__).resolve().parents[1]
lesson=json.loads((root/'public/lessons/pixel-night/lesson.json').read_text())
used={s['data']['pixelScene']['background']['asset'] for s in lesson['scenes'] if s['data']['pixelScene']['background'].get('asset')}
used|={e['asset'] for s in lesson['scenes'] for e in s['data']['pixelScene']['elements'] if e.get('asset')}
shared='\n'.join((root/f'src/pixel/{name}.mjs').read_text().replace('export function','function') for name in ['motion','text','svg'])
shared='\n'.join(line for line in shared.splitlines() if not line.startswith('import '))
source=(root/'entrega-native/html-template.html').read_text()
# Render first scene with the identical shared renderer, for script-disabled viewers.
subprocess.run(['node','scripts/pixel-preview.mjs'],cwd=root,check=True)
preview=(root/'out/pixel-qa/scene-01-2.0.svg').read_text()
def build(assets,fallback):
 return source.replace('__SHARED_SOURCE__',shared).replace('__LESSON__',json.dumps(lesson,ensure_ascii=False)).replace('__ASSETS__',json.dumps(assets)).replace('__FALLBACK_SVG__',fallback)
inline={name:'data:image/png;base64,'+base64.b64encode((root/'public'/name).read_bytes()).decode() for name in sorted(used)}
(root/'entrega-native/Aula_IA_Pixel_Night_Interativa.html').write_text(build(inline,preview))
project=root/'entrega-native/html-player'
if project.exists():shutil.rmtree(project)
project.mkdir()
(project/'index.html').write_text(build({},preview))
for name in used:
 dest=project/'assets'/name;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(root/'public'/name,dest)
(project/'README.md').write_text('Abra index.html em um navegador com JavaScript. A prévia do iPhone não executa o player. As 18 cenas usam elementos separados e o mesmo relógio de animação do Remotion. Edite public/lessons/pixel-night/lesson.json no projeto e execute npm run pixel:html.\n')
print(f'HTML Pixel Night: {len(used)} sprites/cenário, 18 cenas com texto e geometria nativos.')
