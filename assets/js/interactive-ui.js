
(function(){
  const path = window.location.pathname;
  const isSinhala = document.documentElement.lang === 'si' || path.includes('/sn/');
  const actionWords = isSinhala
    ? ['ඊළඟ','ඉදිරියට','ආරම්භ','ගෙවන්න','යවන්න','තෝරන්න','විවෘත','සුරකින්න','අනුමත','දියත්','සකසන්න','Request','Dashboard']
    : ['next','continue','start','pay','submit','choose','select','open','save','approve','launch','request','dashboard','create'];

  const buttonSelectors = [
    'button',
    'input[type="submit"]',
    'input[type="button"]',
    'input[type="reset"]',
    'a[class*="btn"]',
    'a[class*="action"]',
    'a[class*="button"]',
    'a[class*="cta"]',
    '.btn',
    '.btn-primary',
    '.btn-secondary',
    '.back-btn',
    '.continue-btn',
    '.btn-continue',
    '.pay-btn',
    '.view-site-btn',
    '.live-action',
    '.dash-action',
    '.demo-action',
    '.accept-btn',
    '.launch-button',
    '.next-big-btn',
    '.download-btn',
    '.view-progress-btn',
    '.site-cta'
  ].join(',');

  function shouldStyle(el){
    if(!el) return false;
    if(el.closest('.site-header nav') || el.closest('.wd-footer-links') || el.classList.contains('wd-lang-btn')) return false;
    if(el.classList.contains('option-card') || el.closest('.option-grid')) return false;
    const text = ((el.innerText || el.value || '') + '').trim().toLowerCase();
    if(el.matches('button, input[type="submit"], input[type="button"], input[type="reset"]')) return true;
    if(el.matches('a') && el.getAttribute('href') && el.getAttribute('href') !== '#'){
      if(el.className && /(btn|action|button|cta)/i.test(el.className)) return true;
      return actionWords.some(w => text.includes(w.toLowerCase()));
    }
    return false;
  }

  function styleButtons(){
    document.querySelectorAll(buttonSelectors).forEach(el => {
      if(!shouldStyle(el)) return;
      el.classList.add('wdlk-glass-btn');
      if(/back|ghost|outline/i.test(el.className)) el.classList.add('is-outline');
      if(/pay|signup|launch|accept/i.test(el.className) || /ගෙව|ලියාපදිංචි|දියත්|අනුමත/.test((el.innerText||''))){
        el.classList.add('is-red');
      } else if(/view-site|continue|next|open|dashboard|request|live-action|site-cta|btn-primary|dash-action/i.test(el.className) || /ඊළඟ|ඉදිරියට|විවෘත|ඩෑෂ්බෝඩ්|ඉල්ල/.test((el.innerText||''))){
        el.classList.add('is-blue');
      } else if(/back|download|device|filter/i.test(el.className)) {
        el.classList.add('is-light');
      } else {
        el.classList.add('is-blue');
      }
    });
  }

  function wirePointerEffects(scope=document){
    scope.querySelectorAll('.wdlk-glass-btn').forEach(el => {
      if(el.dataset.wdlkBound === '1') return;
      el.dataset.wdlkBound = '1';
      el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty('--mx', x + '%');
        el.style.setProperty('--my', y + '%');
      });
    });
  }

  function floatCards(){
    document.querySelectorAll('.theme-card, .content-card, .summary-card, .invoice-card, .payment-card, .dashboard-card, .section-card, .action-card').forEach(el => {
      el.classList.add('wdlk-floaty');
    });
  }

  function run(){
    styleButtons();
    wirePointerEffects();
    floatCards();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();

  const mo = new MutationObserver(() => run());
  mo.observe(document.documentElement, {childList:true, subtree:true});
})();
