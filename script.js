/* ══════════════════════════════════════════════
   CLICK SFX (Web Audio)
══════════════════════════════════════════════ */
const AC = window.AudioContext || window.webkitAudioContext;
let ac;
function playClick(){
  try{
    if(!ac) ac = new AC();
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.connect(g); g.connect(ac.destination);
    o.frequency.setValueAtTime(880, ac.currentTime);
    o.frequency.exponentialRampToValueAtTime(440, ac.currentTime + .08);
    g.gain.setValueAtTime(.12, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(.0001, ac.currentTime + .12);
    o.start(); o.stop(ac.currentTime + .12);
  }catch(e){}
}
document.addEventListener('click', e => {
  if(e.target.closest('button, .choice, .mem-cell')) playClick();
});

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const INTRO_LINES = [
  "NETFLIX presents...",
  "نور عيوني...",
  "عملتلك هاي صحيح انه مش اشي ومش حلو...",
  "بس هاض الي قدرت عليه ❤️"
];

const VIDEO_SUBS = [
  "This is not just a story...",
  "It is a memory...",
  "Between two hearts ❤️",
  "That never fades..."
];

const AI_MSGS = [
  "She is thinking about you...",
  "Emotion detected ❤️",
  "Memory active...",
  "Love signal strong...",
  "Heart rate elevated..."
];

const QUESTIONS = [
  "ايش أحلى ذكرى بينا؟",
  "أنا شو بالنسبة إلك؟",
  "إنتِ شو بالنسبة إلي؟",
  "لما أجي على بالك؟",
  "لو اجتك فرصة تشوفيني؟",
  "متى عيد ميلادي",
  "متى أول مرة قلتلك بحبك؟",
  "انت بتعرفيني! ",
  "اش اكتثر اشي بتحبه فيني",
  "أنا شو بالنسبة إلك؟ ❤️"
];

const CHOICES = [
  ["الشات","موقف"],
  ["مهم","عادي"],
  ["نور عيوني","صديق"],
  ["المستقبل","الحاضر"],
  ["لا","اه"],
  ["9/10","10/10"],
  ["2/4","12/4"],
  ["معرفة غميقه","معرفة سطحيه"],
  ["انا كمحمد","اسلوبي"],
  ["حب حياتي","عادي"]
];

const MEMORIES = [
  {emoji:"❤️", label:"بداية", text:"صراحهه جد وقتها كنت منكد شوي بس لما فتحت الانستا و شفت انك باعثه و اكثر من4 مسجز انبسطت وضحكتي حرفيا شقت وجهي لانه انا لما احكي معك جد برتاح بحس بكمية طاقه من وراكي ما بتنوصف لانه اكثر حد بفهمني وبحبه من كل قلبي والله بحس انه كلشي بفكر فيه بختفي فجأهه يزم الله يخليلي ليكي يا رب",  image:"images4.jpg"},
  {emoji:"💖", label:"قلب",   text:"صحيح انه كول بس وحياه الله انه كنت كثير رايق من ورا هاي الكول و صحيح في كول اطول منها بس ما اخذت سكرين لانك فصلتي بس عاددي مش مشكله وكل كول بحكي معك فيه بكون احلى من اللي قبله بحب كلشي ب اي كول بينا و كثيرر بنبسط لما اسمعع صوتك وربي  مش شوب لا وربي كثير بحب احكي معك كول بشكل رهيبب وحياه الله بحب لما تصيري تتخوثي علي بلكول بحب كل اشي بلكول بينا يروحي بحبكك جدا والله .",            image:"images2.jpg"},
  {emoji:"🌙", label:"ليل",   text:" و هون اول مره عرفتي فيها انه انا كنت زعلان وقتها كثير كبرتي بعيني مش شوي وكثير انا انعجبت فيكي زي ما بحكوها لانه انا ما بوثقش ب اي انسان غير القريب مني كثيرر و حتى ما بحكيله اذا زعلان او لا وما بحكيله عن مشاكلي وما حد بعرف متى بكون زعلان او مبسوط و انتِ عرفتي جد كيفت و انبسطت وكثير والله مو بس شوي و اكثرر حد بوكل همي اكثر مني انتِ جد انا مش ندمان اني عرفتك ولا بعمري رح اندم لانه جد حبيتك من كل قلبي والله ورح اضل احبك لو ايش ما صار بينا   .",       image:"images3.jpg"},
  {emoji:"✨", label:"لحظة", text:"  صحيح انها ai بس بحبها جدا جدا ووقتها لما بعتيها تمنيت لو انها واقع بس ب الحلال ان شاء الله شكلك فيها كثيرر حلو و اساسا انتِ من اول حلوه و بتجنني طول عمرك و عقلك سابق عمرك اساسا انتِ كلك على بعضك سابقه حالك ما وقفت على هاي والله ما كنت متوقع ابدا ابدا انك تعملي هيك اشي مثل الصوره هاي ينور عيوني انتِ والله كثير بحبك مش بس شوي و قد ما احكيلك مارح اوصفك والله  روحيي انتِ ❤️❤️  .",          image:"images.jpg"},
  {emoji:"🌹", label:"وردة",  text:"صحيح برضو انها ai بس طبعا اكيد انا مبين فيها بومه كلعاده انتِ بتجننيي والله و كثير مش شوي كلشي فيكي حلو اسلوبك معي شكلك بجنن ملامح وجهك مش حاده ابدا رايقه و كثير كثير حلوه صاروخ اول مره بحكي مع بنت مش مارق اسلوبها علي قبل مره زيك انتِ اول مره بمرق علي اسلوب زي اسلوبك و كثيرر حبيته اساسا حبيتك كلك على بعضك بتجنني وربي.",     image:"images5.jpg"},
  {emoji:"🎵", label:"أغنية", text:" هون لما طلبت منك صوره الك و انتِ ببوو صراحه ما كنت متوقع انك تقبلي ف كيفت و انبسطت كلعاده لانه مش اشي جديد ومن و امتِ صغيره بتجننيي و مبينه عليكي صاروخ طبعا كل اشي فيكي روعه وحياه الله بميزك من بين الف بنت بميز صوتك بميزكك حتى و انتِ مش مبينه من كثر ما بحبكككك يبنت .",                  image:"images6.jpg"},
  {emoji:"🌅", label:"صباح", text:"   هايي اول كول بينا بحجه انه لولو بدها تحكي معك و انا كذاب اساسا انا اللي بدي احكي معك و مستحي احكيلك  او بلاحرى اني اطلب منك وابدا ابداا ما توقعت تحكي تعال كول احكي معاها وقتها صرتت ارجفف توترتت كثيرر و صحيت لولو من النومم وقتها عشان ما ابين كذاب مش اكثر   .",           image:"images7.jpg"},
  {emoji:"💌", label:"رسالة", text:"  هاي اول مره بتحكيلي بحبك فيها كان وقتها بعد يومين من اني حكيتلك بحبك صحيح اني صرت ارجف و خشيتت بلحيط اكثر من مرهه بس بستاهل و بعرف غصب عني و نسونجي بس تايب و بحبكككك بدل المره مليون مره ينورر عيوني انتِ  .",            image:"images8.jpg"}
];

const HEART_EMOJIS = ["❤️","💖","💕","🌸","✨","💗","🩷"];

/* ══════════════════════════════════════════════
   STATE
══════════════════════════════════════════════ */
let qIndex = 0;
let aiTimer = null;

/* ══════════════════════════════════════════════
   FLOATING HEARTS SETUP
══════════════════════════════════════════════ */
(function spawnHearts(){
  const layer = document.getElementById('heartsLayer');
  const count = 22;
  for(let i = 0; i < count; i++){
    const h = document.createElement('div');
    h.className = 'fheart';
    h.textContent = HEART_EMOJIS[i % HEART_EMOJIS.length];
    const sz = 10 + Math.random() * 16;
    const op = 0.08 + Math.random() * 0.13;
    h.style.cssText = `
      left:${Math.random()*100}%;
      --fs:${sz}px;
      --op:${op};
      --dur:${7 + Math.random()*10}s;
      --del:${-Math.random()*12}s;
      --r1:${-20+Math.random()*40}deg;
      --r2:${-20+Math.random()*40}deg;
    `;
    layer.appendChild(h);
  }
})();

/* ══════════════════════════════════════════════
   HEART BURST (canvas particles)
══════════════════════════════════════════════ */
const bCanvas = document.getElementById('burstCanvas');
const bCtx    = bCanvas.getContext('2d');
let particles = [];
let burstRaf  = null;

function resizeBurst(){
  bCanvas.width  = window.innerWidth;
  bCanvas.height = window.innerHeight;
}
resizeBurst();
window.addEventListener('resize', resizeBurst);

function burstAt(x, y){
  const count = 18;
  for(let i = 0; i < count; i++){
    const angle = (Math.PI * 2 / count) * i + (Math.random()-.5)*.5;
    const speed = 2 + Math.random() * 4;
    particles.push({
      x, y,
      vx: Math.cos(angle)*speed,
      vy: Math.sin(angle)*speed - 1.5,
      life: 1,
      decay: .018 + Math.random()*.018,
      size: 8 + Math.random()*12,
      emoji: HEART_EMOJIS[Math.floor(Math.random()*HEART_EMOJIS.length)]
    });
  }
  if(!burstRaf) animBurst();
}

function animBurst(){
  bCtx.clearRect(0,0,bCanvas.width,bCanvas.height);
  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => {
    bCtx.save();
    bCtx.globalAlpha = Math.max(0, p.life);
    bCtx.font = `${p.size}px serif`;
    bCtx.fillText(p.emoji, p.x - p.size/2, p.y + p.size/2);
    bCtx.restore();
    p.x += p.vx; p.y += p.vy; p.vy += .09; p.life -= p.decay;
  });
  if(particles.length) burstRaf = requestAnimationFrame(animBurst);
  else burstRaf = null;
}

/* ══════════════════════════════════════════════
   MUSIC FADE-IN
══════════════════════════════════════════════ */
function fadeInAudio(el, targetVol = 0.55, dur = 2500){
  el.volume = 0;
  el.play().catch(()=>{});
  const step = targetVol / (dur / 50);
  const t = setInterval(()=>{
    el.volume = Math.min(targetVol, el.volume + step);
    if(el.volume >= targetVol) clearInterval(t);
  }, 50);
}

function fadeOutAudio(el, dur = 1200){
  const step = el.volume / (dur / 50);
  const t = setInterval(()=>{
    el.volume = Math.max(0, el.volume - step);
    if(el.volume <= 0){ el.pause(); clearInterval(t); }
  }, 50);
}

/* ══════════════════════════════════════════════
   ① NETFLIX → TEXT
══════════════════════════════════════════════ */
setTimeout(()=>{
  const ns = document.getElementById('netflixScreen');
  ns.classList.add('out');
  setTimeout(()=>{ ns.remove(); startTextIntro(); }, 1200);
}, 2700);

/* ══════════════════════════════════════════════
   ② TYPEWRITER TEXT INTRO
══════════════════════════════════════════════ */
function startTextIntro(){
  typeLineSequence(0);
}

function typeLineSequence(lineIdx){
  if(lineIdx >= INTRO_LINES.length){
    setTimeout(transitionToVideo, 1000);
    return;
  }
  const el = document.getElementById(`tl${lineIdx}`);
  el.innerHTML = '';

  const text = INTRO_LINES[lineIdx];
  let ci = 0;

  /* build char spans */
  [...text].forEach(ch => {
    const s = document.createElement('span');
    s.className = 'char';
    s.textContent = ch === ' ' ? '\u00A0' : ch;
    el.appendChild(s);
  });

  /* add cursor to this line */
  const cursor = document.createElement('span');
  cursor.className = 'tw-cursor';
  el.appendChild(cursor);

  function typeNext(){
    if(ci < text.length){
      el.querySelectorAll('.char')[ci].classList.add('on');
      ci++;
      setTimeout(typeNext, 52 + Math.random()*28);
    } else {
      cursor.remove();
      setTimeout(()=> typeLineSequence(lineIdx + 1), 600);
    }
  }
  typeNext();
}

/* ══════════════════════════════════════════════
   ③ VIDEO
══════════════════════════════════════════════ */
function transitionToVideo(){
  const ts = document.getElementById('textScreen');
  ts.classList.add('out');

  setTimeout(()=>{
    ts.remove();
    const vs = document.getElementById('videoScreen');
    vs.classList.add('visible');

    const vid = document.getElementById('mainVideo');
    vid.play().catch(()=>{});

    /* subtitles */
    let si = 0;
    function nextSub(){
      if(si >= VIDEO_SUBS.length) return;
      showVidSub(VIDEO_SUBS[si++]);
      setTimeout(nextSub, 2900);
    }
    nextSub();

    /* ai pill */
    const pill = document.getElementById('aiPill');
    setTimeout(()=>{ pill.style.opacity='.85'; pill.textContent = AI_MSGS[0]; },1200);
    aiTimer = setInterval(()=>{
      pill.textContent = AI_MSGS[Math.floor(Math.random()*AI_MSGS.length)];
    }, 2200);

    vid.addEventListener('ended', onVideoEnd);
    setTimeout(()=>{ if(vid.paused && vid.readyState < 2) onVideoEnd(); }, 5500);
  }, 1400);
}

function showVidSub(text){
  const el = document.getElementById('vidSub');
  el.classList.remove('show');
  setTimeout(()=>{
    el.textContent = text;
    el.classList.add('show');
    setTimeout(()=> el.classList.remove('show'), 2300);
  }, 250);
}

function onVideoEnd(){
  clearInterval(aiTimer);
  const vs = document.getElementById('videoScreen');
  vs.style.transition = 'opacity 1.4s var(--ease-film)';
  vs.style.opacity = '0';
  setTimeout(()=>{ vs.remove(); showApp('startScene'); }, 1500);
}

/* ══════════════════════════════════════════════
   APP / SCENE MANAGEMENT
══════════════════════════════════════════════ */
function showApp(sceneId){
  const app = document.getElementById('app');
  app.classList.add('on');
  document.querySelectorAll('.scene').forEach(s => s.classList.remove('active','exit'));
  const t = document.getElementById(sceneId);
  if(t) requestAnimationFrame(()=> t.classList.add('active'));
}

function switchScene(from, to, cb){
  const wipe = document.getElementById('wipe');
  wipe.classList.add('in');

  setTimeout(()=>{
    const fEl = document.getElementById(from);
    if(fEl){ fEl.classList.remove('active'); fEl.classList.add('exit'); }
    const tEl = document.getElementById(to);
    if(tEl) tEl.classList.add('active');
    if(cb) cb();
    setTimeout(()=>{ wipe.classList.remove('in'); }, 120);
    setTimeout(()=>{ if(fEl) fEl.classList.remove('exit'); }, 900);
  }, 320);
}

/* ══════════════════════════════════════════════
   STORY / QUIZ
══════════════════════════════════════════════ */
function startStory(){
  qIndex = 0;
  renderQuestion();
  switchScene('startScene','quizScene');
  fadeInAudio(document.getElementById('song1'), 0.5, 3000);
}

function renderQuestion(){
  const total = QUESTIONS.length;
  document.getElementById('progFill').style.width = `${(qIndex/total)*100}%`;
  document.getElementById('sceneTag').textContent = `لحظة ${qIndex+1} / ${total}`;

  const qEl = document.getElementById('qText');
  qEl.style.opacity = '0';
  qEl.style.transform = 'translateY(12px)';

  const wrap = document.getElementById('choicesWrap');
  wrap.style.opacity = '0';
  wrap.innerHTML = '';

  setTimeout(()=>{
    qEl.textContent = QUESTIONS[qIndex];
    qEl.style.transition = 'opacity .5s var(--ease-film), transform .5s var(--ease-film)';
    qEl.style.opacity = '1';
    qEl.style.transform = 'translateY(0)';
  }, 160);

  setTimeout(()=>{
    CHOICES[qIndex].forEach((label, idx)=>{
      const btn = document.createElement('button');
      btn.className = 'choice';
      btn.textContent = label;
      btn.style.opacity = '0';
      btn.style.transform = 'translateY(10px)';
      btn.addEventListener('click', ()=> onChoice(btn));
      wrap.appendChild(btn);

      setTimeout(()=>{
        btn.style.transition = 'opacity .4s var(--ease-film), transform .4s var(--ease-film), background .25s, border-color .25s, box-shadow .25s, transform .25s var(--ease-bounce)';
        btn.style.opacity = '1';
        btn.style.transform = 'translateY(0)';
      }, 80 + idx * 100);
    });
    wrap.style.transition = 'opacity .3s';
    wrap.style.opacity = '1';
  }, 300);
}

function onChoice(btn){
  btn.classList.add('picked');
  btn.style.pointerEvents = 'none';

  /* heart burst at click position */
  const r = btn.getBoundingClientRect();
  burstAt(r.left + r.width/2, r.top + r.height/2);

  setTimeout(advanceQ, 520);
}

function advanceQ(){
  qIndex++;
  const qEl  = document.getElementById('qText');
  const wrap = document.getElementById('choicesWrap');
  qEl.style.opacity = '0';
  qEl.style.transform = 'translateY(-10px)';
  wrap.style.opacity = '0';

  if(qIndex < QUESTIONS.length){
    setTimeout(renderQuestion, 280);
  } else {
    document.getElementById('progFill').style.width = '100%';
    setTimeout(()=> switchScene('quizScene','endScene'), 500);
  }
}

/* ══════════════════════════════════════════════
   MEMORIES
══════════════════════════════════════════════ */
function goToMemories(){
  buildGrid();
  switchScene('endScene','memoriesScene');
}

function buildGrid(){
  const grid = document.getElementById('memGrid');
  if(grid.childElementCount > 0) return;

  MEMORIES.forEach((m, i)=>{
    const cell = document.createElement('div');
    cell.className = 'mem-cell';
    cell.setAttribute('role','button');
    cell.setAttribute('tabindex','0');
    cell.setAttribute('aria-label', m.label);

    /* photo layer */
    const imgDiv = document.createElement('div');
    imgDiv.className = 'cell-img';

    /* preload — if image exists apply it */
    const probe = new Image();
    probe.onload = () => {
      imgDiv.style.backgroundImage = `url('${m.image}')`;
      cell.classList.add('has-img');
    };
    probe.src = m.image;

    /* dark scrim */
    const scrim = document.createElement('div');
    scrim.className = 'cell-scrim';

    /* emoji */
    const emojiSpan = document.createElement('span');
    emojiSpan.className = 'cell-emoji';
    emojiSpan.textContent = m.emoji;

    /* label */
    const labelSpan = document.createElement('span');
    labelSpan.className = 'cell-label';
    labelSpan.textContent = m.label;

    cell.appendChild(imgDiv);
    cell.appendChild(scrim);
    cell.appendChild(emojiSpan);
    cell.appendChild(labelSpan);

    /* entrance animation */
    cell.style.opacity = '0';
    cell.style.transform = 'scale(.88)';

    cell.addEventListener('click', ()=>{ openModal(m); burstAt(
      cell.getBoundingClientRect().left + cell.offsetWidth/2,
      cell.getBoundingClientRect().top  + cell.offsetHeight/2
    ); });
    cell.addEventListener('keydown', e=>{ if(e.key==='Enter') openModal(m); });
    grid.appendChild(cell);

    setTimeout(()=>{
      cell.style.transition = `opacity .55s var(--ease-film) ${i*65}ms, transform .55s var(--ease-bounce) ${i*65}ms`;
      cell.style.opacity = '1';
      cell.style.transform = 'scale(1)';
    }, 60);
  });
}

/* ══════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════ */
function openModal(mem){
  /* emoji */
  document.getElementById('modalEmoji').textContent = mem.emoji;

  /* label */
  document.getElementById('modalLabel').textContent = mem.label;

  /* photo */
  const photo = document.getElementById('modalPhoto');
  photo.classList.remove('show');
  photo.style.backgroundImage = '';

  if(mem.image){
    const probe = new Image();
    probe.onload = () => {
      photo.style.backgroundImage = `url('${mem.image}')`;
      photo.classList.add('show');
    };
    probe.onerror = () => {
      photo.classList.remove('show');
      photo.style.backgroundImage = '';
    };
    probe.src = mem.image;
  }

  /* text */
  const tEl = document.getElementById('modalText');
  tEl.textContent = '';

  document.getElementById('modal').classList.add('open');
  typeWriter(tEl, mem.text, 38);
}

function typeWriter(el, text, speed){
  let i = 0;
  el.textContent = '';
  function t(){
    if(i < text.length){
      i++;
      el.textContent = text.slice(0, i);
      setTimeout(t, speed);
    }
  }
  t();
}

function closeModal(){
  document.getElementById('modal').classList.remove('open');
}
function modalBackdropClick(e){
  if(e.target === document.getElementById('modal')) closeModal();
}

/* ══════════════════════════════════════════════
   MUSIC
══════════════════════════════════════════════ */
function playSong2(){
  fadeOutAudio(document.getElementById('song1'), 800);
  setTimeout(()=> fadeInAudio(document.getElementById('song2'), 0.5, 2500), 600);
}
function restartStory(){
  fadeOutAudio(document.getElementById('song1'));
  fadeOutAudio(document.getElementById('song2'));
  qIndex = 0;
  document.getElementById('memGrid').innerHTML = '';
  switchScene('memoriesScene','startScene');
}

/* keyboard */
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });
