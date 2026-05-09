
(function(){
  const path = window.location.pathname;
  const isSinhala = document.documentElement.lang === 'si' || path.includes('/sn/');
  const page = path.split('/').pop() || 'index.php';

  const flowPages = ['index.php','business-type.php','details.php','theme-selection.php'];
  if(!flowPages.includes(page)) return;

  function readJson(key, fallback = {}){
    try{ return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
    catch(e){ return fallback; }
  }

  function firstValue(){
    for(const value of arguments){
      if(value !== undefined && value !== null && String(value).trim() !== '') return String(value).trim();
    }
    return '';
  }

  function getData(){
    const s1 = readJson('wdlk_step1_business');
    const s1n = readJson('wdlk_step1');
    const s2 = readJson('wdlk_step2_details');
    const s2n = readJson('wdlk_step2');
    return {
      businessName: firstValue(s2.businessName, s2n.businessName, s1.businessName, s1n.businessName, localStorage.getItem('wdlk_business_name'), isSinhala ? 'ඔබගේ ව්‍යාපාරය' : 'your business'),
      businessType: firstValue(s1.businessType, s1n.businessType, s2.businessType, s2n.businessType, localStorage.getItem('wdlk_business_type'), isSinhala ? 'business' : 'business'),
      services: firstValue(s2.mainServices, s2n.mainServices, isSinhala ? 'services' : 'services'),
      theme: firstValue(readJson('wdlk_theme').themeName, readJson('wdlk_theme').name, isSinhala ? 'theme' : 'theme')
    };
  }

  const data = () => getData();

  function getCopy(targetPage){
    const d = data();
    const en = {
      'business-type.php': 'AI is gathering information for your website',
      'details.php': `AI is organizing information for ${d.businessName}`,
      'theme-selection.php': `AI is gathering design preferences for ${d.businessName}`,
      default: 'AI is gathering information for your website'
    };
    const si = {
      'business-type.php': 'AI ඔබගේ වෙබ් අඩවිය සඳහා තොරතුරු එකතු කරමින් සිටී',
      'details.php': `AI ${d.businessName} සඳහා තොරතුරු සකස් කරමින්`,
      'theme-selection.php': `AI ${d.businessName} සඳහා නිර්මාණ රුචිකත්ව තොරතුරු එකතු කරමින්`,
      default: 'AI ඔබගේ වෙබ් අඩවිය සඳහා තොරතුරු එකතු කරමින් සිටී'
    };
    const map = isSinhala ? si : en;
    return map[targetPage] || map.default;
  }

  function effectFor(targetPage){
    if(targetPage === 'business-type.php') return 'swarm';
    if(targetPage === 'details.php') return 'spiral';
    if(targetPage === 'theme-selection.php') return 'burst';
    return 'swarm';
  }

  const MIN_PLAY_MS = 6600;
  const MAX_PLAY_MS = 8000;

  function randomDuration(){
    return Math.floor(MIN_PLAY_MS + Math.random() * (MAX_PLAY_MS - MIN_PLAY_MS));
  }

  function createOverlay(){
    const overlay = document.createElement('div');
    overlay.className = 'ai-step-overlay v46-particles-only';
    overlay.innerHTML = `
      <canvas class="ai-transition-canvas"></canvas>
      <div class="ai-step-overlay-inner">
        <div class="ai-step-status">
          <h3 class="ai-step-title"></h3>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const canvas = overlay.querySelector('.ai-transition-canvas');
    const titleEl = overlay.querySelector('.ai-step-title');
    const ctx = canvas.getContext('2d');

    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let active = false;
    let startTime = 0;
    let mode = 'swarm';
    let hideTimer = null;

    const paletteMap = {
      swarm: ['#2f80ed','#56ccf2','#7ee787','#ffd166','#ff4f7b'],
      spiral: ['#8b5cf6','#56ccf2','#2f80ed','#ff4f7b','#ffffff'],
      burst: ['#ff4f7b','#ffd166','#56ccf2','#2f80ed','#7ee787']
    };

    function spawnParticle(i){
      const cx = w / 2;
      const cy = h / 2 - 40;
      const palette = paletteMap[mode] || paletteMap.swarm;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        baseX: Math.random() * w,
        baseY: Math.random() * h,
        vx: (Math.random() - .5) * 2.8,
        vy: (Math.random() - .5) * 2.8,
        r: Math.random() * 2.7 + 1.2,
        color: palette[i % palette.length],
        angle: Math.random() * Math.PI * 2,
        orbit: 26 + Math.random() * Math.min(w,h) * .24,
        noise: Math.random() * 2000,
        trail: [],
        targetX: cx,
        targetY: cy
      };
    }

    function resize(){
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr,0,0,dpr,0,0);
      const count = Math.max(70, Math.min(140, Math.floor(w / 12)));
      particles = Array.from({length: count}, (_,i) => spawnParticle(i));
    }

    function setMode(nextMode){
      mode = nextMode || 'swarm';
      particles = particles.map((_, i) => spawnParticle(i));
    }

    function drawGlow(x,y,size,color,alpha=.45){
      ctx.save();
      ctx.globalAlpha = alpha;
      const g = ctx.createRadialGradient(x,y,0,x,y,size);
      g.addColorStop(0,color);
      g.addColorStop(1,'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x,y,size,0,Math.PI*2);
      ctx.fill();
      ctx.restore();
    }

    function drawTrails(p){
      if(p.trail.length < 2) return;
      ctx.save();
      for(let i=1; i<p.trail.length; i++){
        const a = p.trail[i-1];
        const b = p.trail[i];
        ctx.strokeStyle = p.color + Math.floor((i/p.trail.length)*120).toString(16).padStart(2,'0');
        ctx.lineWidth = Math.max(.5, (i / p.trail.length) * 2.2);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawLinks(maxDist=120){
      for(let i=0; i<particles.length; i++){
        const p = particles[i];
        for(let j=i+1; j<particles.length; j+=3){
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if(dist < maxDist){
            ctx.strokeStyle = `rgba(255,255,255,${Math.max(0.02, .15 - dist/900)})`;
            ctx.lineWidth = .8;
            ctx.beginPath();
            ctx.moveTo(p.x,p.y);
            ctx.lineTo(q.x,q.y);
            ctx.stroke();
          }
        }
      }
    }

    function updateParticles(elapsed){
      const cx = w / 2;
      const cy = h / 2 - 40;
      const t = elapsed / 1000;

      particles.forEach((p, i) => {
        if(mode === 'swarm'){
          const tx = cx + Math.sin(t * .8 + i * .12) * (80 + (i % 14) * 6);
          const ty = cy + Math.cos(t * .65 + i * .18) * (50 + (i % 10) * 5);
          p.vx += (tx - p.x) * 0.008;
          p.vy += (ty - p.y) * 0.008;
        } else if(mode === 'spiral'){
          p.angle += 0.018 + (i % 9) * 0.0007;
          const radius = 24 + ((i * 7) % Math.min(w,h) * .22);
          const tx = cx + Math.cos(p.angle) * radius * (.45 + .55 * Math.sin(t + i));
          const ty = cy + Math.sin(p.angle) * radius * (.45 + .55 * Math.cos(t * .8 + i));
          p.vx += (tx - p.x) * 0.010;
          p.vy += (ty - p.y) * 0.010;
        } else if(mode === 'burst'){
          const burst = 1 + .28 * Math.sin(t * 2.5);
          const tx = cx + Math.cos(p.angle) * p.orbit * burst;
          const ty = cy + Math.sin(p.angle) * p.orbit * burst;
          p.angle += 0.01 + (i % 5) * 0.0008;
          p.vx += (tx - p.x) * 0.009;
          p.vy += (ty - p.y) * 0.009;
        }

        p.vx *= 0.94;
        p.vy *= 0.94;
        p.x += p.vx;
        p.y += p.vy;
        p.trail.push({x:p.x, y:p.y});
        if(p.trail.length > 12) p.trail.shift();
      });
    }

    function drawFrame(now){
      ctx.clearRect(0,0,w,h);
      if(active){
        const elapsed = now - startTime;
        const cx = w / 2;
        const cy = h / 2 - 40;

        updateParticles(elapsed);

        // Background accent glows
        drawGlow(cx, cy, 120, 'rgba(86,204,242,.22)', .22);
        drawGlow(cx - 80, cy + 20, 90, 'rgba(255,79,123,.16)', .18);
        drawGlow(cx + 90, cy - 10, 85, 'rgba(47,128,237,.18)', .18);

        // Particle links first
        drawLinks(mode === 'burst' ? 100 : 125);

        // Trails and particles
        particles.forEach((p, i) => {
          drawTrails(p);

          ctx.save();
          ctx.globalCompositeOperation = 'lighter';
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          drawGlow(p.x, p.y, 12 + p.r * 2, p.color, .16);

          if(mode === 'burst' && i % 12 === 0){
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 1;
            ctx.globalAlpha = .55;
            ctx.beginPath();
            ctx.moveTo(p.x - 6, p.y);
            ctx.lineTo(p.x + 6, p.y);
            ctx.moveTo(p.x, p.y - 6);
            ctx.lineTo(p.x, p.y + 6);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      }
      requestAnimationFrame(drawFrame);
    }

    function show(targetPage, duration){
      titleEl.textContent = getCopy(targetPage);
      setMode(effectFor(targetPage));
      active = true;
      startTime = performance.now();
      overlay.classList.add('is-active');
      document.body.style.cursor = 'progress';
      clearTimeout(hideTimer);
      hideTimer = setTimeout(hide, duration || randomDuration());
      return duration;
    }

    function hide(){
      active = false;
      overlay.classList.remove('is-active');
      document.body.style.cursor = '';
    }

    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(drawFrame);

    return { show, hide };
  }

  const overlay = createOverlay();

  function isFlowDestination(href){
    if(!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
    try{
      const url = new URL(href, window.location.href);
      const targetPage = url.pathname.split('/').pop();
      return flowPages.includes(targetPage) && targetPage !== page;
    }catch(e){
      return false;
    }
  }

  function pageFromHref(href){
    try{
      const url = new URL(href, window.location.href);
      return url.pathname.split('/').pop() || 'index.php';
    }catch(e){
      return 'index.php';
    }
  }

  function playAndNavigate(href){
    if(!href) return;
    const targetPage = pageFromHref(href);
    const duration = randomDuration();
    overlay.show(targetPage, duration);
    setTimeout(() => { window.location.href = href; }, Math.max(1000, duration - 140));
  }

  window.WDLK_AI_TRANSITION = { playAndNavigate };

  let locked = false;
  document.addEventListener('click', function(e){
    const a = e.target.closest('a[href]');
    if(a && isFlowDestination(a.getAttribute('href'))){
      if(locked) return;
      locked = true;
      e.preventDefault();
      playAndNavigate(a.getAttribute('href'));
    }
  }, true);

  document.addEventListener('submit', function(e){
    const form = e.target;
    if(!(form instanceof HTMLFormElement)) return;
    if(typeof form.checkValidity === 'function' && !form.checkValidity()) return;
  }, true);
})();
