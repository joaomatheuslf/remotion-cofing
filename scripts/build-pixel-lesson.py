"""Author the 18-scene lesson as independent pixel elements, never slide bands.
Run after changing the educational script/layout. This is an authored example;
new lessons must provide their own scene graph and teaching motion.
"""
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1]
C=['#39dfff','#55e990','#b583ff','#ffaf55','#ffde55']
INK='#04132b';WHITE='#fff6e4'
DUR=[4,8,4,12,5,12,5,12,5,12,5,12,5,15,5,14,5,10]
TITLES=['O GUARDA-CHUVA DA IA','COMO LER O MAPA','INTELIGÊNCIA ARTIFICIAL','O QUE É IA?','MACHINE LEARNING','COMO O ML APRENDE?','REDES NEURAIS','COMO FUNCIONA UMA REDE?','DEEP LEARNING','O QUE TORNA A REDE PROFUNDA?','IA GENERATIVA','O QUE A IA GENERATIVA FAZ?','LLMs: GPT','O QUE É UM LLM?','MODELOS DE DIFUSÃO','COMO A DIFUSÃO GERA?','MAPA DESBLOQUEADO','GUARDE ESTAS IDEIAS']
NAMES=['INTELIGÊNCIA ARTIFICIAL','MACHINE LEARNING','REDES NEURAIS','DEEP LEARNING','IA GENERATIVA']
COPY={
 2:['IA é o campo maior.','Os menores representam áreas dentro dele.','São áreas relacionadas, não etapas obrigatórias.'],
 4:['Sistemas para planejar e reconhecer padrões.','Podem usar regras ou aprender com dados.','Exemplo: um sistema que planeja rotas.'],
 6:['O modelo aprende padrões a partir de dados.','Depois aplica esses padrões a novos exemplos.','Exemplo: identificar mensagens de spam.'],
 8:['Unidades conectadas transformam informações.','No treino, ajustamos os pesos das conexões.','São modelos matemáticos, não cérebros humanos.'],
 10:['Deep learning usa redes com várias camadas.','As camadas aprendem representações úteis.','Exemplo: reconhecer um gato numa foto.'],
 12:['Gera conteúdo a partir dos padrões aprendidos.','Pode produzir texto, imagem, áudio e vídeo.','Os principais modelos atuais usam deep learning.'],
 14:['Um grande modelo que trabalha com linguagem.','Os generativos produzem tokens considerando o contexto.','GPT é uma família. Uma resposta pode errar.'],
 16:['O modelo aprende a retirar ruído em vários passos.','Um pedido pode orientar a geração.','É outra família generativa, além dos LLMs.'],
 18:['IA é o campo. ML aprende com dados.','Redes neurais conectam unidades. DL usa várias camadas.','Generativa cria. LLMs e difusão são famílias.']}
scenes=[]
for n,(duration,title) in enumerate(zip(DUR,TITLES),1):
 elements=[]
 def add(id,type,role,x,y,w,h,**extra):
  e=dict(id=id,type=type,role=role,x=x,y=y,width=w,height=h,z=len(elements)+1,**extra);elements.append(e);return e
 def txt(id,text,x,y,w,h=100,size=26,color=WHITE,font='body',role='copy'):
  return add(id,'text',role,x,y,w,h,text=text,font=font,fontSize=size,color=color)
 def rect(id,x,y,w,h,color=C[0],fill=INK,role='illustration',**extra):
  return add(id,'rect',role,x,y,w,h,stroke=color,fill=fill,strokeWidth=4,**extra)
 def line(id,points,color=C[0],width=3):
  x=min(p[0] for p in points);y=min(p[1] for p in points)
  return add(id,'path','connection',x,y,max(1,max(p[0] for p in points)-x),max(1,max(p[1] for p in points)-y),points=[dict(x=a-x,y=b-y) for a,b in points],stroke=color,strokeWidth=width)
 def motion(type,purpose='teaching',start=0,period=2.5,amplitude=4,explanation='O movimento mostra a transformação da informação.',**extra):
  return dict(type=type,purpose=purpose,start=start,end=extra.pop("end",duration),period=period,amplitude=amplitude,explanation=explanation,**extra)
 def signal(id,points,color=C[4],period=2.5,start=0):
  return rect(id,0,0,10,10,color,color,'signal',motion=motion('signal',start=start,period=period,path=[dict(x=a,y=b) for a,b in points],explanation='O sinal percorre as conexões e mostra o caminho dos dados.'))
 def sprite(id,asset,x,y,w,h,m=None,role='illustration',**extra):
  return add(id,'sprite',role,x,y,w,h,asset='lessons/pixel-18-layers/'+asset,**({'motion':m} if m else {}),**extra)
 def umbrella(id,x,y,w,h,color,label,size=18):
  # Stepped silhouette, straight pixel edges, native editable label.
  pts=[(0,.65),(.08,.4),(.2,.18),(.35,.05),(.5,0),(.65,.05),(.8,.18),(.92,.4),(1,.65),(.85,.58),(.7,.74),(.5,.68),(.3,.74),(.15,.58),(0,.65)]
  add(id,'path','illustration',x,y,w,h,points=[dict(x=round(a*w/4)*4,y=round(b*h/4)*4) for a,b in pts],fill=color,stroke=INK,strokeWidth=6,motion=motion('sway','ambient',amplitude=.7,explanation='A oscilação suave mantém os guarda-chuvas vivos sem esconder o texto.'))
  size=max(14,min(size,int(w*.85/(len(label)*.62))))
  txt(id+'-label',label,x+(w-len(label)*size*.62)/2,y+h*.24,w*.85,max(60,h*.55),size,INK)
 def umbrellas(x,y,w,h=105,step=78):
  for j,(color,label) in enumerate(zip(C,NAMES)):umbrella('umbrella-'+str(j),x+j*w*.06,y+j*step,w*(1-j*.12),h*(1-j*.04),color,label,18 if w<500 else 24)
 def caption(text):
  rect('caption-panel',52,740,976,76,INK,INK)
  txt('caption',text,64,755,950,62,26,C[4],role='caption')
 def computer(id,x,y,w=250,h=170,label='IA'):
  rect(id+'-screen',x,y,w,h,C[0]);rect(id+'-base',x-8,y+h,w+16,18,C[0],C[0]);txt(id+'-text',label,x+16,y+22,w-32,h-40,22)
 def network(x,y,w,h,counts):
  rect('network-panel',x-35,y-40,w+70,h+80,INK,INK)
  cols=[]
  for col,count in enumerate(counts):cols.append([(x+w*col/(len(counts)-1),y+h*j/max(1,count-1)) for j in range(count)])
  for col in range(len(cols)-1):
   for j,a in enumerate(cols[col]):
    for k,b in enumerate(cols[col+1]):line(f'wire-{col}-{j}-{k}',[a,b],C[col%5],2)
  for col,points in enumerate(cols):
   for j,(a,b) in enumerate(points):
    rect(f'node-{col}-{j}',a-15,b-15,30,30,C[col%5],INK,'node',motion=motion('pulse',start=(col*.16+j*.07)%1,period=2.3,explanation='Os nós acendem em sequência para indicar o processamento da informação.'))
  for route in range(3):signal(f'network-signal-{route}',[col[(route+i)%len(col)] for i,col in enumerate(cols)],C[route%5],2.3,route*.3)
 def house(id,x,y,w=200,h=180):
  rect(id+'-ground',x,y+h*.88,w,h*.12,C[1],C[1]);rect(id+'-wall',x+w*.18,y+h*.35,w*.64,h*.53,WHITE,WHITE)
  add(id+'-roof','path','illustration',x,y,w,h*.42,points=[dict(x=0,y=h*.4),dict(x=w*.5,y=0),dict(x=w,y=h*.4),dict(x=0,y=h*.4)],fill='#ef763b',stroke=INK,strokeWidth=4)
  rect(id+'-door',x+w*.43,y+h*.61,w*.16,h*.27,C[0],INK);rect(id+'-window',x+w*.23,y+h*.49,w*.12,h*.12,C[0],C[0])
 def noise(id,x,y,w,h,end):
  for j in range(70):
   a=((j*37)%100)/100;b=((j*61)%100)/100
   rect(f'{id}-{j}',x+a*(w-12),y+b*(h-12),12,12,C[j%5],C[j%5],motion=motion('dissolve',start=0,explanation='Cada amostra de ruído desaparece enquanto a imagem fica visível.',end=end))
 # Header uses genuine local bitmap typography, independently of background.
 rect('number-box',48,48,88,82,C[0]);txt('number',f'{n:02}',58,52,76,76,35,C[4],'pixel','title')
 txt('title',title,164,52,864,140,42,C[4],'pixel','title')
 if n in COPY:
  for j,text in enumerate(COPY[n]):
   rect('copy-panel-'+str(j+1),76,210+j*164,545,150,INK,INK)
   txt('copy-'+str(j+1),text,96,226+j*164,510,148,26,C[4] if j==2 else WHITE)
   txt('copy-number-'+str(j+1),str(j+1),52,224+j*164,36,60,28,C[0],'pixel')
 if n in (1,17):
  if n==1: x,y,w,h=64,290,280,370;umbrellas(402,186,580,115,78)
  else:x,y,w,h=754,350,255,330;umbrellas(88,186,590,115,78)
  sprite('joao-body','joao-body.png',x,y,w,h,role='presenter-body')
  sprite('joao-arm','joao-arm.png',0,0,w,h,motion('gesture',amplitude=9,explanation='João aponta e gesticula para conduzir a leitura do mapa.'),'presenter-arm',parent='joao-body',pivot=dict(x=w*.593,y=h*.65))
  caption('Um campo dentro do outro.' if n==1 else 'Áreas relacionadas, não etapas obrigatórias.')
 elif n in (2,18):
  umbrellas(672,240,340,105,76);signal('map-reading',[(830,280),(830,375),(830,455),(830,535),(830,615)],period=4)
 elif n in (3,4):
  if n==3:
   umbrella('umbrella',80,205,920,190,C[0],NAMES[0],28)
   sprite('robot','slide-03/robot.png',450,430,240,220,motion('float','ambient',amplitude=5,explanation='O robô flutua suavemente sem encobrir os exemplos.'))
   route=[(100,540),(160,475),(255,540),(320,485)];line('route',route,C[1],6);signal('route-signal',route)
   txt('route-label','PLANEJAR',100,670,240,60,24);txt('robot-label','RECONHECER E AGIR',430,670,500,60,24)
   caption('A inteligência artificial é o campo maior.')
  else:
   umbrella('umbrella',650,300,370,145,C[0],NAMES[0],18);computer('computer',730,500,220,130)
   route=[(670,690),(730,655),(810,690),(900,655),(990,690)];line('route',route,C[1],4);signal('route-signal',route)
 elif n in (5,6):
  if n==5:umbrella('umbrella',100,210,880,155,C[1],NAMES[1],28);x,y=110,430;mx,my=445,465;ox,oy=865,460
  else:x,y=660,280;mx,my=800,440;ox,oy=980,590
  for j in range(3):
   rect('mail-'+str(j),x,y+j*58,74,42,C[0]);line('mail-fold-'+str(j),[(x,y+j*58),(x+37,y+j*58+25),(x+74,y+j*58)],C[0])
  rect('classifier',mx,my,140 if n==5 else 108,100,C[1]);txt('classifier-label','TREINO' if n==5 else 'MODELO',mx+8,my+28,126 if n==5 else 95,70,22 if n==5 else 20)
  rect('result',ox-30,oy,100,64,C[4]);txt('result-label','SPAM',ox-20,oy+16,85,40,20,C[4])
  signal('mail-flow',[(x+38,y+20),(mx+50,my+48),(ox,oy+30)],period=2.8)
  if n==5:caption('Dados → treinamento → previsão.')
 elif n in (7,8,9,10):
  if n==7:umbrella('umbrella',190,195,700,160,C[2],NAMES[2],28);network(145,440,790,240,[3,4,3]);caption('Unidades conectadas transformam informação.')
  if n==8:network(688,330,295,330,[3,4,3])
  if n==9:
   umbrella('umbrella',170,195,750,160,C[3],NAMES[3],28);network(300,445,510,235,[3,4,4,4,3]);sprite('cat-input','slide-09/cat-input.png',62,495,142,156);sprite('cat-output','slide-09/cat-output.png',890,495,122,164);caption('Redes neurais com várias camadas.')
  if n==10:
   txt('network-label','ENTRADA / CAMADAS / SAÍDA',655,222,375,85,20,C[3]);network(685,355,305,290,[2,3,3,3,2]);txt('cat-label','EXEMPLO: GATO',695,680,330,50,22,C[4])
 elif n in (11,12):
  if n==11:
   umbrella('umbrella',190,195,700,150,C[4],NAMES[4],28);computer('generator',430,455,220,155,'GERAR');computer('input',70,450,220,145,'PEDIDO');house('output',795,455,200,160)
   signal('creation-flow',[(285,520),(430,520),(650,520),(800,520)]);caption('A IA generativa produz conteúdo.')
  else:
   computer('generator',735,414,220,130,'GERAR')
   for j,label in enumerate(['TEXTO','IMAGEM','ÁUDIO / VÍDEO']):txt('output-'+str(j),label,705,290+j*190,320,50,22,C[j])
   signal('creation-flow',[(845,455),(845,335),(990,335),(990,635)],period=3)
 elif n in (13,14):
  if n==13:
   computer('prompt',65,305,360,180,'A capital do Piauí é');positions=[(500,410),(650,410),(800,410)]
   for j,(x,y) in enumerate(positions):rect('token-'+str(j),x,y,115,72,C[4],INK,motion=motion('fill',start=j*.4,explanation='Os tokens são construídos em sequência, como a resposta do modelo.'));txt('token-label-'+str(j),'TOKEN',x+8,y+19,103,50,22,C[4])
   txt('answer','Teresina',730,590,275,70,30,C[1]);signal('token-signal',[(425,435),(550,445),(705,445),(855,445),(855,590)],period=3);caption('Texto gerado token por token.')
  else:
   computer('prompt',680,310,330,185,'A capital do Piauí é')
   rect('token-progress',695,560,300,62,C[4],C[4],motion=motion('fill',start=.8,explanation='A resposta ganha tokens ao longo da geração.'));txt('answer','Teresina',710,646,295,62,30,C[1])
 elif n in (15,16):
  if n==15:
   for j,x in enumerate([78,402,726]):rect('diffusion-panel-'+str(j),x,320,270,300,C[0]);
   noise('noise',90,335,245,270,duration);house('refining',422,375,230,205);noise('refining-noise',414,335,245,270,duration*.75);house('clean',746,375,230,205)
   line('diffusion-arrow',[(350,470),(400,470)]);line('diffusion-arrow-2',[(674,470),(724,470)]);signal('refine-signal',[(350,470),(725,470)],period=3);caption('Do ruído até a imagem, em vários passos.')
  else:
   rect('diffusion-panel',680,300,330,360,C[0]);house('clean',706,375,280,245);noise('noise',694,315,300,330,duration-1)
 scenes.append(dict(id=f'pixel-{n:02}',kind='diagram',title=title,duration=duration,data=dict(pixelScene=dict(version=1,designer='pixel-night',canvas=dict(width=1080,height=864,fps=30),**(dict(presenter=dict(characterId='joao-matheus',referenceIds=['joao-suit','joao-orange-polo'],treatment='Pixel art com óculos, cabelo curto escuro e barba grisalha reconhecíveis.')) if n in (1,17) else {}),teachingGoal=title+' — compreender pela representação e pelo movimento.',background=dict(color=INK,asset='lessons/pixel-18-layers/night-background.png'),elements=elements))))
lesson=dict(id='pixel-night-ia-motion',title='O guarda-chuva da IA — Pixel Night com elementos separados',designerId='pixel-night',scenes=scenes)
out=ROOT/'public/lessons/pixel-night/lesson.json';out.write_text(json.dumps(lesson,ensure_ascii=False,indent=2)+'\n')
print(f'{len(scenes)} cenas, {sum(len(s["data"]["pixelScene"]["elements"]) for s in scenes)} elementos independentes: {out}')
