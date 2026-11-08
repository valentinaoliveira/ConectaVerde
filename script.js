'use strict';
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const STORAGE_KEY = 'conectaverde_capitulos_v1';
let done = [];
try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); if (Array.isArray(saved)) done = saved.filter(n => [1,2,3,4].includes(n)); } catch (_) {}
function updateProgress(){
  $('#progressLabel').textContent = `${done.length} de 4 capítulos`;
  $('#progressPercent').textContent = `${done.length*25}%`;
  $('#progressFill').style.width = `${done.length*25}%`;
  $('#progressBar').setAttribute('aria-valuenow', String(done.length));
  $$('.chapter-card').forEach(card => {
    const btn = card.querySelector('.chapter-open');
    btn.firstChild.textContent = done.includes(Number(card.dataset.chapter)) ? 'Revisar capítulo ' : 'Explorar capítulo ';
  });
}
updateProgress();
$('#resetProgress').addEventListener('click',()=>{if(confirm('Deseja reiniciar os capítulos concluídos neste navegador?')){done=[];try{localStorage.removeItem(STORAGE_KEY)}catch(_){}updateProgress();}});
$('#menuToggle').addEventListener('click',()=>{const nav=$('.main-nav');const opened=nav.classList.toggle('open');$('#menuToggle').setAttribute('aria-expanded',String(opened))});
$$('.main-nav a').forEach(a=>a.addEventListener('click',()=>{$('.main-nav').classList.remove('open');$('#menuToggle').setAttribute('aria-expanded','false')}));
const chapters = {
  1:{tag:'CAPÍTULO 01 · TECNOLOGIA',title:'Tecnologia no dia a dia',content:`<p>Quando conversamos pelo celular, buscamos um endereço ou fazemos uma pesquisa, usamos tecnologias criadas para resolver necessidades humanas. A tecnologia facilita muitas tarefas, mas também exige escolhas responsáveis.</p><h3>O que é consumo consciente?</h3><p>É pensar antes de comprar, usar e descartar. Um equipamento que continua funcionando pode durar mais tempo quando recebe manutenção e cuidados adequados.</p><ul><li>Evite trocar de aparelho apenas porque surgiu um modelo novo.</li><li>Verifique se uma falha pode ser consertada com segurança por profissional qualificado.</li><li>Use capinhas, proteção e manutenção adequada para aumentar a durabilidade.</li><li>Compartilhe conhecimentos digitais com quem precisa de ajuda.</li></ul><div class="reader-note"><strong>Para pensar:</strong> você lembra de algum objeto eletrônico que poderia ter sido reparado em vez de substituído?</div>`},
  2:{tag:'CAPÍTULO 02 · SUSTENTABILIDADE',title:'O caminho do lixo eletrônico',content:`<p>Celulares, computadores, carregadores e outros equipamentos podem se tornar <strong>resíduos eletroeletrônicos</strong> ao final da vida útil. Eles contêm materiais que podem ser recuperados e componentes que precisam de tratamento adequado.</p><h3>Por que o descarte correto importa?</h3><p>O descarte inadequado pode causar riscos ao meio ambiente e à saúde, dependendo dos materiais e da forma de manejo. Por isso, eletrônicos não devem ser descartados como lixo doméstico comum.</p><h3>O que fazer?</h3><ol><li><strong>Reduzir:</strong> comprar somente quando necessário.</li><li><strong>Reparar e reutilizar:</strong> consertar ou doar equipamentos em bom estado, quando possível.</li><li><strong>Proteger dados:</strong> fazer backup e apagar dados pessoais antes de repassar ou descartar dispositivos com memória.</li><li><strong>Destinar corretamente:</strong> procurar pontos de recebimento específicos de eletroeletrônicos e seguir suas orientações.</li></ol><div class="reader-note"><strong>Segurança:</strong> nunca abra, perfure ou desmonte baterias. Se estiverem estufadas ou danificadas, peça orientação especializada para o descarte.</div><p>Para localizar pontos de coleta no Brasil, consulte as entidades <a target="_blank" rel="noopener noreferrer" href="https://sinir.gov.br/perfis/logistica-reversa/logistica-reversa/eletroeletronicos/">indicadas pelo SINIR</a>.</p>`},
  3:{tag:'CAPÍTULO 03 · LÓGICA',title:'Lógica: ensinar uma máquina a seguir passos',content:`<p>Um <strong>algoritmo</strong> é uma sequência organizada de instruções para resolver um problema. Não precisa ser complicado: uma receita, uma lista de tarefas ou um caminho explicado por etapas são bons exemplos.</p><h3>Exemplo: como preparar um sanduíche?</h3><ol><li>Separar pão e ingredientes.</li><li>Abrir o pão.</li><li>Colocar o recheio.</li><li>Fechar o sanduíche.</li></ol><p>Se trocarmos a ordem dos passos, o resultado pode não ser o esperado. Isso também acontece nos programas de computador.</p><h3>Condições e decisões</h3><p>Muitos algoritmos precisam decidir o que fazer: <strong>se</strong> o aparelho ainda pode ser reparado, investigar o conserto; <strong>senão</strong>, procurar opções de reutilização ou descarte adequado.</p><div class="reader-note"><strong>Experimente:</strong> no Laboratório, crie comandos para levar um robô até a estrela. Você estará escrevendo um pequeno algoritmo!</div>`},
  4:{tag:'CAPÍTULO 04 · AÇÃO',title:'Atitudes digitais para um futuro melhor',content:`<p>Você não precisa ser especialista para adotar hábitos positivos no uso de tecnologia. Pequenas decisões, repetidas por muitas pessoas, ajudam a reduzir desperdício.</p><h3>Checklist de atitudes</h3><ul><li>Usar os dispositivos pelo maior tempo possível, com manutenção adequada.</li><li>Considerar a doação de aparelhos em bom estado após apagar dados pessoais.</li><li>Dar preferência a reparos seguros, quando viáveis.</li><li>Fazer backup e remover contas antes de transferir ou descartar um dispositivo.</li><li>Pesquisar pontos de coleta específicos para eletrônicos, baterias e pilhas.</li><li>Compartilhar informações confiáveis com amigos e familiares.</li></ul><h3>Um desafio para hoje</h3><p>Escolha um aparelho que você não utiliza mais. Verifique se pode ser reutilizado, reparado ou encaminhado a um ponto adequado. Não realize desmontagem por conta própria.</p><div class="reader-note"><strong>Você pode multiplicar o aprendizado:</strong> explique a uma pessoa por que lixo eletrônico precisa de uma destinação especial.</div>`}
};
let currentChapter=1;
function openChapter(id){
  currentChapter=id;const item=chapters[id];
  $('#readerTag').textContent=item.tag;
  $('#readerContent').innerHTML=`<div class="reader-content"><h2>${item.title}</h2>${item.content}</div>`;
  $('#readerStatus').textContent=done.includes(id)?'Você já concluiu este capítulo.':'Leia e marque como concluído.';
  $('#leitura').hidden=false;
  $('#leitura').scrollIntoView({behavior:'smooth',block:'start'});
}
$$('[data-open]').forEach(btn=>btn.addEventListener('click',()=>openChapter(Number(btn.dataset.open))));
$('#closeReader').addEventListener('click',()=>{$('#leitura').hidden=true;$('#trilhas').scrollIntoView({behavior:'smooth'})});
$('#completeChapter').addEventListener('click',()=>{if(!done.includes(currentChapter)){done.push(currentChapter);try{localStorage.setItem(STORAGE_KEY,JSON.stringify(done))}catch(_){}updateProgress()}$('#readerStatus').textContent='✓ Capítulo concluído! Você pode continuar aprendendo.'});
// Atividade 1: cinco cenários de robô (5×5), múltiplas rotas possíveis.
let robotCommands=[];
const robotLevels=[
 {title:'Jardim inicial',start:[0,4],goal:[4,0],walls:[[1,2],[2,2],[3,2]]},
 {title:'Caminhos cruzados',start:[0,0],goal:[4,4],walls:[[1,1],[3,1],[1,3],[3,3]]},
 {title:'Passeio pelo parque',start:[4,4],goal:[0,0],walls:[[2,1],[2,2],[2,3]]},
 {title:'Ilhas de tecnologia',start:[0,2],goal:[4,2],walls:[[1,1],[3,1],[1,3],[3,3]]},
 {title:'Desafio final',start:[2,4],goal:[2,0],walls:[[0,1],[4,1],[1,2],[3,2],[0,3],[4,3]]}
];
let robotLevel=0;
const directions={up:{x:0,y:-1,label:'↑'},down:{x:0,y:1,label:'↓'},left:{x:-1,y:0,label:'←'},right:{x:1,y:0,label:'→'}};
function renderRobot(pos){
 const level=robotLevels[robotLevel], board=$('#robotBoard');board.innerHTML='';
 const [sx,sy]=level.start,[gx,gy]=level.goal;
 pos=pos||{x:sx,y:sy};
 board.setAttribute('aria-label',`Tabuleiro 5 por 5, desafio ${robotLevel+1} de ${robotLevels.length}. Robô em ${pos.x+1}, ${pos.y+1}; estrela em ${gx+1}, ${gy+1}`);
 for(let y=0;y<5;y++)for(let x=0;x<5;x++){
  const cell=document.createElement('div');cell.className='robot-cell';
  if(level.walls.some(([wx,wy])=>wx===x&&wy===y)){cell.classList.add('wall');cell.textContent='🪨';}
  if(x===gx&&y===gy){cell.classList.add('goal');cell.textContent='⭐';}
  if(x===pos.x&&y===pos.y){cell.classList.add('robot');cell.textContent='🤖';}
  board.appendChild(cell);
 }
 $('#robotLevelName').textContent=`${robotLevel+1}/${robotLevels.length} · ${level.title}`;
}
function renderSequence(){$('#sequence').textContent=robotCommands.length?robotCommands.map(d=>directions[d].label).join('  '):'Sua sequência aparecerá aqui.'}
function resetRobot(){robotCommands=[];renderSequence();renderRobot();$('#robotFeedback').textContent='';}
renderRobot();
$$('[data-command]').forEach(b=>b.addEventListener('click',()=>{if(robotCommands.length>=35){$('#robotFeedback').textContent='Limite de 35 comandos. Tente um caminho mais curto ou limpe a sequência.';return;}robotCommands.push(b.dataset.command);renderSequence();$('#robotFeedback').textContent=''}));
$('#clearRobot').addEventListener('click',resetRobot);
$('#undoRobot').addEventListener('click',()=>{robotCommands.pop();renderSequence();$('#robotFeedback').textContent=''});
$('#nextRobot').addEventListener('click',()=>{robotLevel=(robotLevel+1)%robotLevels.length;resetRobot()});
$('#runRobot').addEventListener('click',()=>{
 const level=robotLevels[robotLevel], [sx,sy]=level.start,[gx,gy]=level.goal;
 let pos={x:sx,y:sy},error='';
 if(!robotCommands.length){$('#robotFeedback').textContent='Adicione comandos usando as setas.';return;}
 for(const cmd of robotCommands){const d=directions[cmd];const next={x:pos.x+d.x,y:pos.y+d.y};
  if(next.x<0||next.x>4||next.y<0||next.y>4){error='O robô tentou sair do tabuleiro.';break;}
  if(level.walls.some(([wx,wy])=>wx===next.x&&wy===next.y)){error='O robô encontrou uma pedra! Tente outro caminho.';break;}
  pos=next;
 }
 renderRobot(pos);
 $('#robotFeedback').textContent=error||(pos.x===gx&&pos.y===gy?'🎉 Muito bem! Você chegou à estrela! Experimente outra rota ou avance para o próximo cenário.':'Ainda não chegou à estrela. Altere a sequência ou escolha outro caminho.');
});
// Atividade 2: classificação guiada com justificativa.
const sortItems=[
 {emoji:'📱',name:'Celular sem funcionamento',answer:'eletronico',why:'Se não for reparável, entregue em um ponto que receba eletrônicos. Remova seus dados pessoais primeiro.'},
 {emoji:'💻',name:'Notebook funcionando e sem uso',answer:'reutilizar',why:'Um aparelho em boas condições pode ganhar uma nova vida por meio de uso ou doação, com dados pessoais apagados.'},
 {emoji:'🔋',name:'Bateria danificada',answer:'eletronico',why:'Baterias exigem coleta específica e cuidados especiais. Não abra ou perfure.'},
 {emoji:'⌨️',name:'Teclado quebrado sem reparo possível',answer:'eletronico',why:'Procure um ponto de recebimento de eletroeletrônicos.'},
 {emoji:'📷',name:'Câmera funcionando e guardada',answer:'reutilizar',why:'Reutilizar ou doar aparelhos funcionais pode evitar descarte prematuro, após proteger seus dados.'}
];
// Em cada rodada, a ordem das alternativas é embaralhada.
const shuffle = values => {const a=[...values];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const sortChoices=[{key:'comum',label:'Lixo comum'},{key:'eletronico',label:'Ponto de coleta adequado'},{key:'reutilizar',label:'Reutilizar ou doar'}];
let sortIndex=0,sortScore=0,sortLocked=false;
function renderSort(){
 const item=sortItems[sortIndex];
 $('#sortScore').textContent=`${sortScore} acertos`;
 if(!item){$('#sortEmoji').textContent='🏆';$('#sortName').textContent='Atividade concluída!';$('#sortCounter').textContent=`${sortScore} de ${sortItems.length} acertos`;$('#sortOptions').innerHTML='';return;}
 $('#sortEmoji').textContent=item.emoji;$('#sortName').textContent=item.name;$('#sortCounter').textContent=`Item ${sortIndex+1} de ${sortItems.length}`;
 $('#sortOptions').innerHTML='';
 shuffle(sortChoices).forEach(choice=>{const b=document.createElement('button');b.type='button';b.dataset.sort=choice.key;b.textContent=choice.label;b.addEventListener('click',()=>{
  if(sortLocked)return;sortLocked=true;const correct=choice.key===item.answer;if(correct)sortScore++;
  $('#sortScore').textContent=`${sortScore} acertos`;
  $('#sortFeedback').textContent=(correct?'✓ Boa escolha! ':'Veja a orientação: ')+item.why;
  $$('#sortOptions button').forEach(button=>button.disabled=true);
  sortIndex++;setTimeout(()=>{$('#sortFeedback').textContent='';renderSort();},1600);
 });$('#sortOptions').appendChild(b);});sortLocked=false;
}
renderSort();
$('#resetSort').addEventListener('click',()=>{sortIndex=0;sortScore=0;sortLocked=false;$('#sortFeedback').textContent='';renderSort()});
// Atividade 3: ordenação acessível por botões.
const correctOrder=['Definir o que preciso saber','Buscar informações em fontes confiáveis','Comparar e verificar as informações','Utilizar o conhecimento com responsabilidade'];
let order=['Comparar e verificar as informações','Utilizar o conhecimento com responsabilidade','Definir o que preciso saber','Buscar informações em fontes confiáveis'];
function renderOrder(){const container=$('#orderList');container.innerHTML='';order.forEach((text,index)=>{const div=document.createElement('div');div.className='order-item';const label=document.createElement('span');label.textContent=`${index+1}. ${text}`;div.append(label);for(const [sym,delta,name] of [['↑',-1,'Subir'],['↓',1,'Descer']]){const btn=document.createElement('button');btn.textContent=sym;btn.setAttribute('aria-label',`${name}: ${text}`);btn.disabled=index+delta<0||index+delta>=order.length;btn.addEventListener('click',()=>{[order[index],order[index+delta]]=[order[index+delta],order[index]];renderOrder();$('#orderFeedback').textContent=''});div.append(btn)}container.append(div)})}
renderOrder();
$('#checkOrder').addEventListener('click',()=>{$('#orderFeedback').textContent=order.every((v,i)=>v===correctOrder[i])?'🎉 Perfeito! Você organizou um algoritmo lógico.':'Ainda não está na ordem mais adequada. Pense no que deve acontecer primeiro.'});
$('#resetOrder').addEventListener('click',()=>{order=['Comparar e verificar as informações','Utilizar o conhecimento com responsabilidade','Definir o que preciso saber','Buscar informações em fontes confiáveis'];renderOrder();$('#orderFeedback').textContent=''});
// Quiz: oito perguntas, uma por vez, com explicações.
const questions=[
 {topic:'TECNOLOGIA',q:'O que significa consumir tecnologia de forma consciente?',opts:['Trocar os aparelhos sempre que sair um modelo novo','Comprar apenas o mais caro','Avaliar a necessidade e cuidar do que já temos','Descartar aparelhos antigos no lixo comum'],correct:2,explain:'Consumir conscientemente inclui pensar antes de comprar e prolongar a vida útil do que já temos.'},
 {topic:'SUSTENTABILIDADE',q:'O que fazer com um celular que não funciona e não pode ser reparado?',opts:['Entregar em ponto de coleta de eletrônicos','Jogar no lixo comum','Deixar na rua para coleta informal','Abrir a bateria para separar materiais'],correct:0,explain:'A destinação adequada ocorre por pontos de recebimento específicos. Antes, proteja os dados armazenados no aparelho.'},
 {topic:'LÓGICA',q:'Qual definição descreve melhor um algoritmo?',opts:['Um componente físico de computador','Uma sequência organizada de instruções','Um tipo de vírus digital','Um aplicativo que funciona sem energia'],correct:1,explain:'Algoritmos são passos ordenados usados para realizar tarefas e resolver problemas.'},
 {topic:'SEGURANÇA',q:'Antes de doar um notebook usado, qual cuidado é mais importante?',opts:['Deixar todas as contas conectadas','Compartilhar a senha com o destinatário','Apagar apenas o papel de parede','Fazer backup e remover os dados pessoais'],correct:3,explain:'Faça backup do que importa e apague corretamente os dados e contas pessoais antes de transferir um dispositivo.'},
 {topic:'SUSTENTABILIDADE',q:'Qual atitude ajuda a reduzir a quantidade de lixo eletrônico?',opts:['Priorizar reparos e reutilização quando possível','Trocar o aparelho a cada nova atualização','Descartar cabos junto ao lixo orgânico','Guardar baterias danificadas perto do calor'],correct:0,explain:'Conserto e reutilização, quando seguros e viáveis, podem estender a vida dos dispositivos.'},
 {topic:'LÓGICA',q:'Qual é a ordem lógica para acessar um aplicativo em um computador desligado?',opts:['Abrir o aplicativo, ligar o computador, aguardar','Ligar, aguardar iniciar, abrir o aplicativo','Aguardar, abrir o aplicativo, desligar','Desligar, iniciar, fechar o aplicativo'],correct:1,explain:'A ordem dos passos importa: primeiro ligar, depois aguardar a inicialização e só então abrir o aplicativo.'},
 {topic:'MEIO AMBIENTE',q:'Por que eletrônicos não devem ir para o lixo doméstico comum?',opts:['Porque não contêm materiais reaproveitáveis','Porque funcionam para sempre','Porque exigem tratamento e destinação apropriados','Porque todos podem ser queimados com segurança'],correct:2,explain:'Resíduos eletrônicos podem conter materiais recuperáveis e componentes que exigem manejo adequado.'},
 {topic:'ATITUDE',q:'Qual é uma boa maneira de compartilhar o que você aprendeu?',opts:['Repassar qualquer notícia sem verificar','Incentivar o descarte em terrenos vazios','Abrir baterias para ensinar reciclagem','Orientar amigos sobre reparo e pontos de coleta'],correct:3,explain:'Compartilhar informações corretas sobre uso consciente e descarte responsável amplia o impacto da educação digital.'}
];
let quizIndex=0,quizSelected=null,quizLocked=false,quizScore=0;
let quizDisplay=[];
function prepareQuiz(){
 const targetPositions=shuffle([0,1,2,3,0,1,2,3]);
 quizDisplay=questions.map((q,i)=>{
  const others=shuffle(q.opts.map((label,index)=>({label,index})).filter(option=>option.index!==q.correct));
  const shown=[...others];shown.splice(targetPositions[i],0,{label:q.opts[q.correct],index:q.correct});
  return {...q,opts:shown.map(option=>option.label),correct:targetPositions[i]};
 });
}
prepareQuiz();
function renderQuiz(){const q=quizDisplay[quizIndex];$('#quizResult').hidden=true;$('#quizIndex').textContent=`PERGUNTA ${String(quizIndex+1).padStart(2,'0')} DE ${String(questions.length).padStart(2,'0')}`;$('#quizTopic').textContent=q.topic;$('#quizQuestion').textContent=q.q;$('#quizFill').style.width=`${quizIndex/questions.length*100}%`;$('#quizOptions').innerHTML='';q.opts.forEach((opt,i)=>{const btn=document.createElement('button');btn.className='quiz-option';btn.innerHTML=`<span>${'ABCD'[i]}</span>`;btn.append(document.createTextNode(opt));btn.addEventListener('click',()=>{if(quizLocked)return;quizSelected=i;$$('.quiz-option').forEach(o=>o.classList.remove('selected'));btn.classList.add('selected');$('#quizNext').disabled=false});$('#quizOptions').append(btn)});$('#quizExplain').hidden=true;$('#quizHint').textContent='Selecione a alternativa correta.';$('#quizNext').textContent='Confirmar resposta →';$('#quizNext').disabled=true;quizSelected=null;quizLocked=false;$('.quiz-bottom').hidden=false;$('.quiz-top').hidden=false;$('.quiz-track').hidden=false}
function showQuizResult(){const panel=$('#quizResult');$('.quiz-top').hidden=true;$('.quiz-track').hidden=true;$('#quizOptions').innerHTML='';$('#quizExplain').hidden=true;$('.quiz-bottom').hidden=true;panel.hidden=false;panel.innerHTML=`<span class="overline">RESULTADO FINAL</span><h3>Você concluiu o quiz!</h3><strong>${quizScore}/${questions.length}</strong><p>${quizScore===questions.length?'Excelente! Você acertou tudo.':quizScore>=5?'Muito bem! Continue praticando.':'Continue explorando os capítulos e tente novamente.'}</p><button class="btn btn-primary" id="retryQuiz">Refazer quiz ↻</button>`;$('#retryQuiz').addEventListener('click',()=>{quizIndex=0;quizScore=0;prepareQuiz();renderQuiz()})}
$('#quizNext').addEventListener('click',()=>{if(!quizLocked){if(quizSelected===null)return;quizLocked=true;const q=quizDisplay[quizIndex];if(quizSelected===q.correct)quizScore++;$$('.quiz-option').forEach((b,i)=>{b.disabled=true;if(i===q.correct)b.classList.add('correct');else if(i===quizSelected)b.classList.add('wrong')});$('#quizExplain').hidden=false;$('#quizExplain').textContent=q.explain;$('#quizHint').textContent=quizSelected===q.correct?'✓ Você acertou!':'Revise a explicação acima.';$('#quizNext').textContent=quizIndex===questions.length-1?'Ver resultado →':'Próxima pergunta →'}else{quizIndex++;if(quizIndex===questions.length)showQuizResult();else renderQuiz()}});
renderQuiz();
// Formulário de avaliação do projeto (externo). O site não armazena respostas.
const GOOGLE_FORMS_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdLYN4qJbiuvtDTeNt2TeK_kYFeALRMVeCrql8x0y4MAEXa5A/viewform?usp=header';
function setupGoogleForms(){
 const link=$('#googleFormsLink'), notice=$('#googleFormsNotice');
 if(/^https:\/\/(docs\.google\.com\/forms\/|forms\.gle\/)/i.test(GOOGLE_FORMS_URL)){
  link.href=GOOGLE_FORMS_URL;link.hidden=false;
  notice.textContent='Ao clicar, você responderá no Google Forms. As respostas ficam disponíveis para o responsável pelo formulário.';
 } else {
  link.hidden=true;
  notice.textContent='O formulário de avaliação será disponibilizado em breve.';
 }
}
setupGoogleForms();
