"""Seven standalone slide/video players using the same authored clock as Remotion."""
from pathlib import Path
import base64
import html
import json
import re
import zipfile

root=Path(__file__).resolve().parents[1]
dest=root/'out/ia-series'
dest.mkdir(parents=True,exist_ok=True)
source=(root/'examples/mini-lessons/ia-series/player-template.html').read_text()
shared='\n'.join((root/f'src/pixel/{name}.mjs').read_text().replace('export function','function') for name in ['motion','text','svg'])
shared='\n'.join(line for line in shared.splitlines() if not line.startswith('import '))
opening_files=[
 'exec-20eecc26-5905-437a-bf96-6bf3f2a4f7f8.png',
 'exec-aa5e0ef4-c2ba-42d3-862a-2c31b81b03b3.png',
 'exec-cf30841d-7285-4836-8dab-7d3b3e87fb1d.png',
 'exec-7dfdcaef-8a1a-43fd-9f47-4164406feef1.png',
 'exec-a15cb1bc-db50-4e73-96d8-d259241ffb82.png',
 'exec-fc6ac625-5af3-4432-a0e8-1ef6aa8dd337.png',
 'exec-0e6e8384-407b-425d-9970-aedef636577d.png',
]
images=root.parent/'generated_images'
entries=[]
for i in range(1,8):
 lesson=json.loads((root/f'public/lessons/ia-series/aula-{i:02d}.json').read_text())
 used={s['data']['pixelScene']['background']['asset'] for s in lesson['scenes']}
 used|={e['asset'] for s in lesson['scenes'] for e in s['data']['pixelScene']['elements'] if e.get('asset')}
 assets={name:'data:image/png;base64,'+base64.b64encode((root/'public'/name).read_bytes()).decode() for name in sorted(used)}
 opening='data:image/png;base64,'+base64.b64encode((images/opening_files[i-1]).read_bytes()).decode()
 page=source.replace('__LESSON_TITLE__',html.escape(lesson['title'])).replace('__FALLBACK_IMAGE__',opening).replace('__SHARED_SOURCE__',shared).replace('__LESSON__',json.dumps(lesson,ensure_ascii=False,separators=(',',':'))).replace('__ASSETS__',json.dumps(assets,separators=(',',':')))
 file=dest/f'aula-{i:02d}.html';file.write_text(page)
 entries.append((i,lesson['title'],file.name))
links=''.join(f'<a href="{file}">Aula {i:02d} · {html.escape(title)}</a>' for i,title,file in entries)
(dest/'index.html').write_text('<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Aulas animadas Pixel Night</title><style>body{background:#06172e;color:#fff;font:20px system-ui;max-width:800px;margin:auto;padding:24px}h1{color:#ffde55}a{display:block;padding:18px;margin:10px 0;color:#fff;text-decoration:none;background:#123957;border:2px solid #20ddec;border-radius:8px}</style><h1>Sete aulas animadas</h1><p>Escolha uma aula. O modo slides mantém cada cena em movimento; o modo vídeo avança automaticamente.</p>'+links+'</html>')
(dest/'README.txt').write_text('Abra index.html no Safari, Chrome ou outro navegador. Cada aula tem oito cenas, modo slides animado e modo vídeo contínuo. O player usa os elementos nativos do projeto e funciona sem internet. A prévia de arquivos do ChatGPT pode impedir JavaScript; nesse caso, baixe e abra no navegador.\n')
with zipfile.ZipFile(root/'out/ia-series-players.zip','w',compression=zipfile.ZIP_DEFLATED,compresslevel=3) as archive:
 for file in dest.iterdir():
  if file.is_file():archive.write(file,file.name)
print('Seven HTML players, eight animated slides each:',root/'out/ia-series-players.zip')
