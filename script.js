/* ══════════════════════════════════════════════
   FIX: AudioContext — lazy init on first user gesture only.
   Browsers block AudioContext creation before a user gesture.
   The original code tried to create it on first click but could
   still fail silently. We now gate it properly.
══════════════════════════════════════════════ */
const AC = window.AudioContext || window.webkitAudioContext;
let ac;

function getAC(){
  if(!ac && AC){
    try{ ac = new AC(); }catch(e){}
  }
  return ac;
}

function playClick(){
  try{
    const ctx = getAC();
    if(!ctx) return;
    /* FIX: Resume context if it was suspended (required by Chrome autoplay policy) */
    if(ctx.state === 'suspended') ctx.resume();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.setValueAtTime(880, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + .08);
    g.gain.setValueAtTime(.1, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + .12);
    o.start(); o.stop(ctx.currentTime + .12);
  }catch(e){}
}

document.addEventListener('click', e => {
  if(e.target.closest('button, .choice, .mem-cell')) playClick();
});

/* ══════════════════════════════════════════════
   DATA
   FIX: Arabic text kept as-is (full strings, not split into chars)
   to preserve letter connections. The typewriter effect for Arabic
   now reveals full text with a fade instead of character-by-character
   spans, which disconnected Arabic letters on screen.
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
  "انت بتعرفيني!",
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
  {emoji:"❤️", label:"بداية", text:"صراحهه جد وقتها كنت منكد شوي بس لما فتحت الانستا و شفت انك باعثه و اكثر من 4 مسجز انبسطت وضحكتي حرفيا شقت وجهي لانه انا لما احكي معك جد برتاح بحس بكمية طاقه من وراكي ما بتنوصف لانه اكثر حد بفهمني وبحبه من كل قلبي والله بحس انه كلشي بفكر فيه بختفي فجأهه يزم الله يخليلي ليكي يا رب", image:"images4.jpg"},
  {emoji:"💖", label:"قلب",   text:"صحيح انه كول بس وحياه الله انه كنت كثير رايق من ورا هاي الكول و صحيح في كول اطول منها بس ما اخذت سكرين لانك فصلتي بس عاددي مش مشكله وكل كول بحكي معك فيه بكون احلى من اللي قبله بحب كلشي ب اي كول بينا و كثيرر بنبسط لما اسمعع صوتك وربي مش شوب لا وربي كثير بحب احكي معك كول بشكل رهيبب وحياه الله بحب لما تصيري تتخوثي علي بلكول بحب كل اشي بلكول بينا يروحي بحبكك جدا والله.", image:"images2.jpg"},
  {emoji:"🌙", label:"ليل",   text:"و هون اول مره عرفتي فيها انه انا كنت زعلان وقتها كثير كبرتي بعيني مش شوي وكثير انا انعجبت فيكي زي ما بحكوها لانه انا ما بوثقش ب اي انسان غير القريب مني كثيرر و حتى ما بحكيله اذا زعلان او لا وما بحكيله عن مشاكلي وما حد بعرف متى بكون زعلان او مبسوط و انتِ عرفتي جد كيفت و انبسطت وكثير والله مو بس شوي و اكثرر حد بوكل همي اكثر مني انتِ جد انا مش ندمان اني عرفتك ولا بعمري رح اندم لانه جد حبيتك من كل قلبي والله ورح اضل احبك لو ايش ما صار بينا.", image:"images3.jpg"},
  {emoji:"✨", label:"لحظة", text:"صحيح انها ai بس بحبها جدا جدا ووقتها لما بعتيها تمنيت لو انها واقع بس ب الحلال ان شاء الله شكلك فيها كثيرر حلو و اساسا انتِ من اول حلوه و بتجنني طول عمرك و عقلك سابق عمرك اساسا انتِ كلك على بعضك سابقه حالك ما وقفت على هاي والله ما كنت متوقع ابدا ابدا انك تعملي هيك اشي مثل الصوره هاي ينور عيوني انتِ والله كثير بحبك مش بس شوي و قد ما احكيلك مارح اوصفك والله روحيي انتِ ❤️❤️.", image:"images.jpg"},
  {emoji:"🌹", label:"وردة",  text:"صحيح برضو انها ai بس طبعا اكيد انا مبين فيها بومه كلعاده انتِ بتجننيي والله و كثير مش شوي كلشي فيكي حلو اسلوبك معي شكلك بجنن ملامح وجهك مش حاده ابدا رايقه و كثير كثير حلوه صاروخ اول مره بحكي مع بنت مش مارق اسلوبها علي قبل مره زيك انتِ اول مره بمرق علي اسلوب زي اسلوبك و كثيرر حبيته اساسا حبيتك كلك على بعضك بتجنني وربي.", image:"images5.jpg"},
  {emoji:"🎵", label:"أغنية", text:"هون لما طلبت منك صوره الك و انتِ ببوو صراحه ما كنت متوقع انك تقبلي ف كيفت و انبسطت كلعاده لانه مش اشي جديد ومن و امتِ صغيره بتجننيي و مبينه عليكي صاروخ طبعا كل اشي فيكي روعه وحياه الله بميزك من بين الف بنت بميز صوتك بميزكك حتى و انتِ مش مبينه من كثر ما بحبكككك يبنت.", image:"images6.jpg"},
  {emoji:"🌅", label:"صباح", text:"هايي اول كول بينا بحجه انه لولو بدها تحكي معك و انا كذاب اساسا انا اللي بدي احكي معك و مستحي احكيلك او بلاحرى اني اطلب منك وابدا ابداا ما توقعت تحكي تعال كول احكي معاها وقتها صرتت ارجفف توترتت كثيرر و صحيت لولو من النومم وقتها عشان ما ابين كذاب مش اكثر.", image:"images7.jpg"},
  {emoji:"💌", label:"رسالة", text:"هاي اول مره بتحكيلي بحبك فيها كان وقتها بعد يومين من اني حكيتلك بحبك صحيح اني صرت ارجف و خشيتت بلحيط اكثر من مرهه بس بستاهل و بعرف غصب عني و نسونجي بس تايب و بحبكككك بدل المره مليون مره ينورر عيوني انتِ.", image:"images8.jpg"}
];

const HEART_EMOJIS = ["❤️","💖","💕","🌸","✨","💗","🩷"];

/* ══════════════════════════════════════════════
   STATE
══════════════════════════════════════════════ */
let qIndex = 0;
let aiTimer = null;

/* ══════════════════════════════════════════════
   FIX: Detect mobile for performance tweaks
══════════════════════════════════════════════ */
const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

/* ══════════════════════════════════════════════
   FLOATING HEARTS SETUP
   FIX: Reduce heart count on mobile for better performance.
══════════════════════════════════════════════ */
(function spawnHearts(){
  const layer = document.getElementById('heartsLayer');
  /* FIX: Fewer hearts on mobile to reduce GPU load */
  const count = isMobile ? 12 : 22;
  for(let i = 0; i < count; i++){
    const h = document.createElement('div');
    h.className = 'fheart';
    h.textContent = HEART_EMOJIS[i % HEART_EMOJIS.length];
    const sz = 10 + Math.random() * 14;
    const op = 0.06 + Math.random() * 0.12;
    h.style.cssText = `
      left:${Math.random()*100}%;
      --fs:${sz}px;
      --op:${op};
      --dur:${8 + Math.random()*10}s;
      --del:${-Math.random()*12}s;
      --r1:${-20+Math.random()*40}deg;
      --r2:${-20+Math.random()*40}deg;
    `;
    layer.appendChild(h);
  }
})();

/* ══════════════════════════════════════════════
   HEART BURST (canvas particles)
   FIX: Fewer particles on mobile, skip on very low-end devices.
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
/* FIX: Debounce resize to avoid rapid firing on mobile keyboard show/hide */
let resizeTimer;
window.addEventListener('resize', ()=>{
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(resizeBurst, 150);
});

function burstAt(x, y){
  /* FIX: Fewer particles on mobile */
  const count = isMobile ? 10 : 18;
  for(let i = 0; i < count; i++){
    const angle = (Math.PI * 2 / count) * i + (Math.random()-.5)*.5;
    const speed = 2 + Math.random() * 3;
    particles.push({
      x, y,
      vx: Math.cos(angle)*speed,
      vy: Math.sin(angle)*speed - 1.5,
      life: 1,
      decay: .022 + Math.random()*.018,
      size: 7 + Math.random()*10,
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
   MUSIC FADE-IN / OUT
   FIX: Wrap play() in try/catch — autoplay is blocked until
   user interaction on mobile. We call play() only after the
   user taps startStory() so it should work, but guard anyway.
══════════════════════════════════════════════ */
function fadeInAudio(el, targetVol = 0.55, dur = 2500){
  if(!el) return;
  el.volume = 0;
  const playPromise = el.play();
  if(playPromise !== undefined){
    playPromise.catch(()=>{
      /* Autoplay blocked — wait for next user interaction */
      const resume = ()=>{ el.play().catch(()=>{}); document.removeEventListener('click', resume); };
      document.addEventListener('click', resume, {once:true});
    });
  }
  const step = targetVol / (dur / 50);
  const t = setInterval(()=>{
    el.volume = Math.min(targetVol, el.volume + step);
    if(el.volume >= targetVol) clearInterval(t);
  }, 50);
}

function fadeOutAudio(el, dur = 1200){
  if(!el || el.paused) return;
  const step = el.volume / (dur / 50);
  const t = setInterval(()=>{
    el.volume = Math.max(0, el.volume - step);
    if(el.volume <= 0){ el.pause(); clearInterval(t); }
  }, 50);
}

/* ══════════════════════════════════════════════
   ① NETFLIX → TEXT
   FIX: Slightly longer delay gives fonts time to load,
   preventing a flash of unstyled text on slow connections.
══════════════════════════════════════════════ */
setTimeout(()=>{
  const ns = document.getElementById('netflixScreen');
  ns.classList.add('out');
  setTimeout(()=>{ ns.remove(); startTextIntro(); }, 1200);
}, 2800);

/* ══════════════════════════════════════════════
   زر تفعيل الصوت للفيديو
   المتصفح يسمح بالصوت فقط بعد تفاعل المستخدم (tap/click)
══════════════════════════════════════════════ */
function unmuteVideo(){
  const vid = document.getElementById('mainVideo');
  const btn = document.getElementById('unmuteBtn');
  if(!vid) return;
  vid.muted = false;
  vid.volume = 1;
  /* إذا كان الفيديو واقف، شغّله من جديد */
  if(vid.paused) vid.play().catch(()=>{ vid.muted = true; });
  btn.classList.add('hidden');
}


/* ══════════════════════════════════════════════
   ② TEXT INTRO — ARABIC-SAFE TYPEWRITER
   Arabic lines use full-text fade-in to preserve letter connections.
   LTR English line uses character-by-character reveal.
══════════════════════════════════════════════ */
function startTextIntro(){
  typeLineSequence(0);
}

function typeLineSequence(lineIdx){
  if(lineIdx >= INTRO_LINES.length){
    setTimeout(transitionToVideo, 900);
    return;
  }
  const el = document.getElementById(`tl${lineIdx}`);
  el.innerHTML = '';
  el.classList.remove('on');

  const text = INTRO_LINES[lineIdx];
  const isArabic = lineIdx > 0; /* lines 1-3 are Arabic */

  if(isArabic){
    /* FIX: Arabic — set full text at once, then fade in.
       This preserves letter connections (ligatures). */
    el.textContent = text;
    /* Small delay so animation is noticeable */
    requestAnimationFrame(()=>{
      requestAnimationFrame(()=>{
        el.classList.add('on');
        /* Wait for line to be read, then move to next */
        const readTime = Math.max(1400, text.length * 40);
        setTimeout(()=> typeLineSequence(lineIdx + 1), readTime);
      });
    });
  } else {
    /* LTR English line — character-by-character is fine */
    let ci = 0;
    [...text].forEach(ch => {
      const s = document.createElement('span');
      /* Use inline-block for LTR spans so opacity works */
      s.style.cssText = 'display:inline;opacity:0;transition:opacity .18s,filter .18s;filter:blur(3px)';
      s.textContent = ch === ' ' ? '\u00A0' : ch;
      el.appendChild(s);
    });

    /* Show line container */
    el.classList.add('on');

    /* Add cursor */
    const cursor = document.createElement('span');
    cursor.className = 'tw-cursor';
    el.appendChild(cursor);

    function typeNext(){
      if(ci < text.length){
        const charSpans = el.querySelectorAll('span:not(.tw-cursor)');
        if(charSpans[ci]){
          charSpans[ci].style.opacity = '1';
          charSpans[ci].style.filter = 'blur(0)';
        }
        ci++;
        setTimeout(typeNext, 52 + Math.random()*28);
      } else {
        cursor.remove();
        setTimeout(()=> typeLineSequence(lineIdx + 1), 600);
      }
    }
    typeNext();
  }
}

/* ══════════════════════════════════════════════
   ③ VIDEO
   FIX: Mobile video optimizations:
   - Check readyState before trying to play
   - Shorter fallback timeout on mobile (videos may not load on slow connections)
   - Resume AudioContext on video start (needed after user interaction)
══════════════════════════════════════════════ */
function transitionToVideo(){
  const ts = document.getElementById('textScreen');
  ts.classList.add('out');

  setTimeout(()=>{
    ts.remove();
    const vs = document.getElementById('videoScreen');
    vs.classList.add('visible');

    const vid = document.getElementById('mainVideo');

    /* FIX: Resume AudioContext if suspended */
    const ctx = getAC();
    if(ctx && ctx.state === 'suspended') ctx.resume();

    /* FIX: Try to play; if blocked (no user gesture yet) skip to app */
    const playAttempt = vid.play();
    if(playAttempt !== undefined){
      playAttempt.catch(()=>{
        /* Can't autoplay video — skip directly to app */
        onVideoEnd();
      });
    }

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

    vid.addEventListener('ended', onVideoEnd, {once:true});

    /* FIX: Shorter timeout on mobile — if video hasn't loaded in 4s, skip it */
    const skipDelay = isMobile ? 4000 : 6000;
    setTimeout(()=>{
      if(vid.paused && vid.readyState < 3) onVideoEnd();
    }, skipDelay);

  }, 1400);
}

function showVidSub(text){
  const el = document.getElementById('vidSub');
  if(!el) return;
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
  if(!vs) return;
  const btn = document.getElementById('unmuteBtn');
  if(btn) btn.classList.add('hidden');
  vs.style.transition = 'opacity 1.4s var(--ease-film)';
  vs.style.opacity = '0';
  setTimeout(()=>{
    if(vs.parentNode) vs.remove();
    showApp('startScene');
  }, 1500);
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
  /* FIX: Start music after user tap — satisfies autoplay policy */
  setTimeout(()=> fadeInAudio(document.getElementById('song1'), 0.5, 3000), 100);
}

function renderQuestion(){
  const total = QUESTIONS.length;
  const fill = document.getElementById('progFill');
  fill.style.width = `${(qIndex/total)*100}%`;
  /* FIX: Update ARIA progressbar value */
  fill.parentElement.setAttribute('aria-valuenow', Math.round((qIndex/total)*100));
  document.getElementById('sceneTag').textContent = `لحظة ${qIndex+1} / ${total}`;

  const qEl = document.getElementById('qText');
  qEl.style.opacity = '0';
  qEl.style.transform = 'translateY(12px)';

  const wrap = document.getElementById('choicesWrap');
  wrap.style.opacity = '0';
  wrap.innerHTML = '';

  setTimeout(()=>{
    /* FIX: Set text content as whole string — do not split Arabic into chars */
    qEl.textContent = QUESTIONS[qIndex];
    qEl.style.transition = 'opacity .5s var(--ease-film), transform .5s var(--ease-film)';
    qEl.style.opacity = '1';
    qEl.style.transform = 'translateY(0)';
  }, 160);

  setTimeout(()=>{
    CHOICES[qIndex].forEach((label, idx)=>{
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice';
      /* FIX: Set Arabic text as whole string for correct ligatures */
      btn.textContent = label;
      btn.setAttribute('dir','rtl');
      btn.setAttribute('lang','ar');
      btn.style.opacity = '0';
      btn.style.transform = 'translateY(10px)';
      btn.addEventListener('click', ()=> onChoice(btn));
      wrap.appendChild(btn);

      setTimeout(()=>{
        btn.style.transition = 'opacity .4s var(--ease-film), transform .4s var(--ease-film), background .25s, border-color .25s, box-shadow .25s';
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
  /* Disable all other choices too */
  btn.closest('.choices')?.querySelectorAll('.choice').forEach(b => {
    b.style.pointerEvents = 'none';
  });

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
    cell.setAttribute('role','listitem');
    cell.setAttribute('tabindex','0');
    /* FIX: Arabic label in aria-label */
    cell.setAttribute('aria-label', m.label);

    /* photo layer */
    const imgDiv = document.createElement('div');
    imgDiv.className = 'cell-img';

    /* FIX: Use loading="lazy" equivalent via IntersectionObserver for images.
       Instead of creating a probe Image immediately for all 8 cells
       (which fires 8 network requests at once), we load lazily.
       This significantly improves performance on slow mobile connections. */
    const observer = new IntersectionObserver((entries, obs)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const probe = new Image();
          probe.onload = ()=>{
            imgDiv.style.backgroundImage = `url('${m.image}')`;
            cell.classList.add('has-img');
          };
          probe.onerror = ()=>{}; /* Silently fail — emoji shows as fallback */
          probe.src = m.image;
          obs.unobserve(cell);
        }
      });
    }, {rootMargin:'50px'});
    observer.observe(cell);

    /* dark scrim */
    const scrim = document.createElement('div');
    scrim.className = 'cell-scrim';

    /* emoji */
    const emojiSpan = document.createElement('span');
    emojiSpan.className = 'cell-emoji';
    emojiSpan.textContent = m.emoji;

    /* label — Arabic text */
    const labelSpan = document.createElement('span');
    labelSpan.className = 'cell-label';
    labelSpan.setAttribute('dir','rtl');
    labelSpan.setAttribute('lang','ar');
    /* FIX: Set as whole string, not split */
    labelSpan.textContent = m.label;

    cell.appendChild(imgDiv);
    cell.appendChild(scrim);
    cell.appendChild(emojiSpan);
    cell.appendChild(labelSpan);

    /* entrance animation */
    cell.style.opacity = '0';
    cell.style.transform = 'scale(.88)';

    cell.addEventListener('click', ()=>{
      openModal(m);
      burstAt(
        cell.getBoundingClientRect().left + cell.offsetWidth/2,
        cell.getBoundingClientRect().top  + cell.offsetHeight/2
      );
    });
    cell.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' ') openModal(m); });
    grid.appendChild(cell);

    setTimeout(()=>{
      cell.style.transition = `opacity .55s var(--ease-film) ${i*60}ms, transform .55s var(--ease-bounce) ${i*60}ms`;
      cell.style.opacity = '1';
      cell.style.transform = 'scale(1)';
    }, 60);
  });
}

/* ══════════════════════════════════════════════
   MODAL
   FIX: Arabic typewriter — use whole-text reveal, not char-by-char.
   Character splitting in Arabic disconnects letter shapes.
   Instead we use a progressive text reveal that stays as a
   connected string at all times.
══════════════════════════════════════════════ */
function openModal(mem){
  document.getElementById('modalEmoji').textContent = mem.emoji;
  document.getElementById('modalLabel').textContent = mem.label;

  const photo = document.getElementById('modalPhoto');
  photo.classList.remove('show');
  photo.style.backgroundImage = '';

  if(mem.image){
    const probe = new Image();
    probe.onload = ()=>{
      photo.style.backgroundImage = `url('${mem.image}')`;
      photo.classList.add('show');
    };
    probe.onerror = ()=>{
      photo.classList.remove('show');
    };
    probe.src = mem.image;
  }

  const tEl = document.getElementById('modalText');
  tEl.textContent = '';

  const modal = document.getElementById('modal');
  modal.classList.add('open');

  /* FIX: Trap focus in modal for accessibility */
  const closeBtn = document.getElementById('modalClose');
  closeBtn.focus();

  /* FIX: Arabic typewriter — reveal substring by substring.
     We grow the visible string from the start, ensuring Arabic
     shaping context is always correct (letters see their neighbours). */
  arabicTypeWriter(tEl, mem.text.trim(), 28);
}

/* FIX: Arabic-safe typewriter — reveals text as growing substrings.
   Unlike character spans, this keeps the Arabic script in one text node
   so the browser's bidirectional text algorithm and font shaper always
   see the full context and connect letters correctly. */
function arabicTypeWriter(el, text, speed){
  let i = 0;
  el.textContent = '';
  function tick(){
    if(i < text.length){
      /* Advance by one Unicode code point (handles emoji and surrogate pairs) */
      i = nextCodePoint(text, i);
      el.textContent = text.slice(0, i);
      setTimeout(tick, speed + Math.random()*15);
    }
  }
  tick();
}

/* Helper: advance index by one Unicode code point (handles emoji/surrogates) */
function nextCodePoint(str, i){
  const code = str.charCodeAt(i);
  /* Surrogate pair (emoji, etc.) */
  if(code >= 0xD800 && code <= 0xDBFF && i+1 < str.length){
    return i + 2;
  }
  return i + 1;
}

function closeModal(){
  const modal = document.getElementById('modal');
  modal.classList.remove('open');
  /* FIX: Stop any running typewriter by clearing the text element
     (prevents text from continuing to update after modal closes) */
  setTimeout(()=>{
    if(!modal.classList.contains('open')){
      document.getElementById('modalText').textContent = '';
    }
  }, 500);
}

function modalBackdropClick(e){
  if(e.target === document.getElementById('modal')) closeModal();
}

/* ══════════════════════════════════════════════
   MUSIC
══════════════════════════════════════════════ */
function playSong2(){
  const s2 = document.getElementById('song2');
  const btns = document.querySelectorAll('.mem-actions .btn-ghost');
  const btn = btns[0]; // first ghost button = song button

  if(!s2.paused){
    // already playing -> stop
    fadeOutAudio(s2, 800);
    if(btn) btn.innerHTML = '🎵 <span lang="ar">أغنية الذكريات</span>';
    return;
  }

  // stop song1 then fade in song2
  fadeOutAudio(document.getElementById('song1'), 800);
  setTimeout(()=> fadeInAudio(s2, 0.5, 2500), 600);
  if(btn) btn.innerHTML = '⏹ <span lang="ar">إيقاف الأغنية</span>';
}

function restartStory(){
  fadeOutAudio(document.getElementById('song1'));
  fadeOutAudio(document.getElementById('song2'));
  qIndex = 0;
  document.getElementById('memGrid').innerHTML = '';
  switchScene('memoriesScene','startScene');
}

/* ══════════════════════════════════════════════
   KEYBOARD NAVIGATION
   FIX: Added Space bar to close modal (accessibility)
══════════════════════════════════════════════ */
document.addEventListener('keydown', e=>{
  if(e.key==='Escape' || e.key===' '){
    const modal = document.getElementById('modal');
    if(modal.classList.contains('open')){
      e.preventDefault();
      closeModal();
    }
  }
});

/* ══════════════════════════════════════════════
   FIX: Prevent pull-to-refresh on mobile interfering with the app.
   The site uses fixed positioning throughout so body scroll is
   always hidden, but some Android browsers still trigger PTR.
══════════════════════════════════════════════ */
document.addEventListener('touchmove', e=>{
  if(e.target === document.body) e.preventDefault();
}, {passive:false});

/* ══════════════════════════════════════════════
   FIX: Handle iOS Safari viewport height changes
   (caused by browser chrome showing/hiding).
   We use a CSS custom property --vh to get the real viewport height.
══════════════════════════════════════════════ */
function setVH(){
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVH();
window.addEventListener('resize', setVH);
