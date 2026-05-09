// Homepage form
const startForm = document.getElementById('start-form');
if (startForm) {
  startForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const input = document.getElementById('business');
    const value = input.value.trim();
    if (!value) return;
    try { localStorage.setItem('wdlk_business_type', value); } catch (e) {}
    const nextUrl = 'business-type.php?business=' + encodeURIComponent(value);
    if(window.WDLK_AI_TRANSITION && window.WDLK_AI_TRANSITION.playAndNavigate){
      window.WDLK_AI_TRANSITION.playAndNavigate(nextUrl, {reason:'home'});
    } else {
      window.location.href = nextUrl;
    }
  });
}

// Reveal animation
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Shared process data for mini slider and bottom slider
const processSteps = [
  {
    title: 'Step 1 - Setup',
    short: 'Setup',
    image: 'assets/img/process/step1-home.png',
    desc: 'Business owners start by typing their business type in the homepage search box to begin the website creation flow.',
    points: ['Search by business type', 'Simple entry point', 'Fast guided experience']
  },
  {
    title: 'Step 2 - Business Details',
    short: 'Business Details',
    image: 'assets/img/process/step2-business.png',
    desc: 'The next step collects your contact details and basic business information so the project can start correctly.',
    points: ['Customer name and contact', 'Business name and category', 'Short business description']
  },
  {
    title: 'Step 3 - Website Details',
    short: 'Website Details',
    image: 'assets/img/process/step3-website.png',
    desc: 'Select page range, business type, and the website path that best suits your business needs.',
    points: ['5 to 10 or 10 to 15 pages', 'Business type selection', 'Clear guided options']
  },
  {
    title: 'Step 4 - Theme Selection',
    short: 'Theme Selection',
    image: 'assets/img/process/step4-theme.png',
    desc: 'Choose a clean design theme that matches your business so the team can build your website faster.',
    points: ['Theme categories', 'Visual preview', 'Better design matching']
  },
  {
    title: 'Step 5 - Advance Payment',
    short: 'Advance Payment',
    image: 'assets/img/process/step5-payment.png',
    desc: 'Make the 50% advance payment securely online. Once payment is completed, the 3-day process begins.',
    points: ['Online card payment', '50% advance', 'Instant confirmation']
  },
  {
    title: 'Step 6 - Final Review',
    short: 'Final Review',
    image: 'assets/img/process/step6-review.png',
    desc: 'The website is presented for final review and approval before it goes live.',
    points: ['Preview website', 'Approve design', 'Ready to launch']
  },
  {
    title: 'Step 7 - Owner Dashboard',
    short: 'Owner Dashboard',
    image: 'assets/img/process/step7-owner-dashboard.png',
    desc: 'After launch, the website owner can access the dashboard to view the live link, status, setup email options, and request changes.',
    points: ['Live website link', 'Status and renewal details', 'Owner dashboard access']
  }
];

let activeStep = 0;
let stepInterval;

function updateProcessStep(index) {
  activeStep = index;
  const step = processSteps[index];

  // Mini slider
  const miniImg = document.getElementById('miniStepImage');
  const miniProgress = document.getElementById('miniProgress');
  const miniStepName = document.getElementById('miniStepName');
  const miniStepNumber = document.getElementById('miniStepNumber');
  if (miniImg) {
    miniImg.classList.add('fade');
    setTimeout(() => {
      miniImg.src = step.image;
      miniImg.alt = step.title;
      miniImg.classList.remove('fade');
    }, 120);
  }
  if (miniProgress) {
    miniProgress.style.width = `${((index + 1) / processSteps.length) * 100}%`;
  }
  if (miniStepName) miniStepName.textContent = `Step ${index + 1} - ${step.short}`;
  if (miniStepNumber) miniStepNumber.textContent = `Step ${index + 1} of ${processSteps.length}`;
  document.querySelectorAll('.mini-dot').forEach((dot, i) => dot.classList.toggle('active', i === index));

  // Bottom slider
  const processImage = document.getElementById('processImage');
  const processStepLabel = document.getElementById('processStepLabel');
  const processTitle = document.getElementById('processTitle');
  const processDesc = document.getElementById('processDesc');
  const processPoints = document.getElementById('processPoints');

  if (processImage) {
    processImage.classList.add('fade');
    setTimeout(() => {
      processImage.src = step.image;
      processImage.alt = step.title;
      processImage.classList.remove('fade');
    }, 120);
  }
  if (processStepLabel) processStepLabel.textContent = `Step ${index + 1}`;
  if (processTitle) processTitle.textContent = step.title;
  if (processDesc) processDesc.textContent = step.desc;
  if (processPoints) {
    processPoints.innerHTML = '';
    step.points.forEach(point => {
      const li = document.createElement('li');
      li.textContent = point;
      processPoints.appendChild(li);
    });
  }

  document.querySelectorAll('.easy-tab').forEach((tab, i) => tab.classList.toggle('active', i === index));
  document.querySelectorAll('.dot').forEach((dot, i) => dot.classList.toggle('active', i === index));
}

function bindStepButtons(selector) {
  document.querySelectorAll(selector).forEach(btn => {
    btn.addEventListener('click', () => {
      const step = Number(btn.dataset.step);
      updateProcessStep(step);
      restartAutoSteps();
    });
  });
}

function restartAutoSteps() {
  clearInterval(stepInterval);
  stepInterval = setInterval(() => {
    updateProcessStep((activeStep + 1) % processSteps.length);
  }, 4200);
}

bindStepButtons('.mini-dot');
bindStepButtons('.easy-tab');
bindStepButtons('.dot');
updateProcessStep(0);
restartAutoSteps();

// Particles: faster with gather hover effect
(function particleSystem() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let width = 0;
  let height = 0;

  const pointer = {
    x: null,
    y: null,
    active: false,
    radius: 150
  };

  function resize() {
    const host = canvas.parentElement;
    width = host.offsetWidth;
    height = host.offsetHeight;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    createParticles();
  }

  function createParticles() {
    const count = Math.max(90, Math.floor(width / 10));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.6,
        vy: (Math.random() - 0.5) * 1.6,
        size: Math.random() * 2.4 + 1,
        alpha: Math.random() * 0.45 + 0.18,
        hue: Math.random() > 0.72 ? '255,67,67' : '35,95,255'
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -20 || p.x > width + 20) p.vx *= -1;
      if (p.y < -20 || p.y > height + 20) p.vy *= -1;

      if (pointer.active && pointer.x !== null && pointer.y !== null) {
        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < pointer.radius && dist > 0.1) {
          const force = (1 - dist / pointer.radius) * 0.08;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }

      p.vx = Math.max(Math.min(p.vx, 2.2), -2.2);
      p.vy = Math.max(Math.min(p.vy, 2.2), -2.2);
      p.vx *= 0.996;
      p.vy *= 0.996;

      ctx.beginPath();
      ctx.fillStyle = `rgba(${p.hue},${p.alpha})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = `rgba(${p.hue},0.35)`;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 118) {
          const opacity = (1 - dist / 118) * 0.18;
          const grad = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
          grad.addColorStop(0, `rgba(35,95,255,${opacity})`);
          grad.addColorStop(1, `rgba(255,67,67,${opacity})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  const host = canvas.parentElement;
  host.addEventListener('mousemove', (e) => {
    const rect = host.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
    pointer.active = true;
  });
  host.addEventListener('mouseenter', () => pointer.active = true);
  host.addEventListener('mouseleave', () => {
    pointer.active = false;
    pointer.x = null;
    pointer.y = null;
  });

  window.addEventListener('resize', resize);
  resize();
  draw();
})();


// V30 Live customer counter: starts from 300 and goes upward by 1 each minute
(function(){
  const counter = document.getElementById('liveCustomerCounter');
  if(!counter) return;

  const STORAGE_KEY = 'wdlk_live_customer_counter';
  const START_VALUE = 300;
  const MIN_VALUE = 300;
  const ONE_MINUTE = 60 * 1000;

  function readState(){
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch(e){ return null; }
  }

  function saveState(state){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function getCurrentValue(){
    let state = readState();
    const now = Date.now();

    if(!state || typeof state.value !== 'number' || !state.startedAt){
      state = { value: START_VALUE, startedAt: now, lastTick: now };
      saveState(state);
      return START_VALUE;
    }

    const elapsedMinutes = Math.floor((now - Number(state.startedAt)) / ONE_MINUTE);
    const value = Math.max(MIN_VALUE, START_VALUE + elapsedMinutes);

    if(value !== state.value){
      state.value = value;
      state.lastTick = now;
      saveState(state);
    }

    return value;
  }

  function renderNumber(value, animate){
    const number = String(value).padStart(3, '0');
    const digits = counter.querySelectorAll('.flip-digit');

    number.split('').forEach((char, i) => {
      const digit = digits[i];
      if(!digit) return;
      if(digit.textContent !== char){
        digit.textContent = char;
        if(animate){
          digit.classList.remove('flip');
          void digit.offsetWidth;
          digit.classList.add('flip');
        }
      }
    });
  }

  renderNumber(getCurrentValue(), false);

  setInterval(() => {
    renderNumber(getCurrentValue(), true);
  }, 1000);
})();
