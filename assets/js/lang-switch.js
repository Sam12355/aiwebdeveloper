
(function(){
  function isSinhalaPath(path){
    return /\/sn\//.test(path) || /\/sn$/.test(path);
  }
  function currentPage(){
    const parts = location.pathname.split('/').filter(Boolean);
    return parts[parts.length - 1] || 'index.php';
  }
  function englishUrl(){
    const path = location.pathname;
    let target = path.replace(/\/sn\//, '/');
    target = target.replace(/\/sn$/, '/');
    if(target === path && path.includes('/sn') === false) target = path;
    return target + location.search + location.hash;
  }
  function sinhalaUrl(){
    const path = location.pathname;
    if(isSinhalaPath(path)) return path + location.search + location.hash;
    const page = currentPage();
    const base = path.substring(0, path.length - page.length);
    return base + 'sn/' + page + location.search + location.hash;
  }
  function preserveSession(lang){
    try{
      localStorage.setItem('wdlk_language', lang);
      localStorage.setItem('wdlk_language_switch_time', new Date().toISOString());
      if(window.WebDevV52Sync){ window.WebDevV52Sync.saveProject('language_switch_' + lang); }
      if(window.WebDevDataRecorder){ window.WebDevDataRecorder.capture('language_switch_' + lang); }
    }catch(e){}
  }
  function go(lang){
    preserveSession(lang);
    location.href = lang === 'si' ? sinhalaUrl() : englishUrl();
  }
  function createSwitch(){
    const isSi = isSinhalaPath(location.pathname) || document.documentElement.lang === 'si';
    const wrap = document.createElement('div');
    wrap.className = 'wd-header-lang-switch';
    wrap.setAttribute('aria-label','Language switch');
    wrap.innerHTML = `
      <button type="button" class="wd-lang-small ${isSi ? 'active':''}" data-lang-switch-to="si">සිංහල</button>
      <button type="button" class="wd-lang-small ${!isSi ? 'active':''}" data-lang-switch-to="en">English</button>
    `;
    wrap.addEventListener('click', function(e){
      const btn = e.target.closest('[data-lang-switch-to]');
      if(!btn) return;
      e.preventDefault();
      go(btn.dataset.langSwitchTo);
    });
    return wrap;
  }
  function mount(){
    // populate existing header language switch boxes
    document.querySelectorAll('.wd-header-lang-switch').forEach(box => {
      if(box.dataset.langReady) return;
      box.dataset.langReady='yes';
      box.innerHTML = '';
      box.appendChild(createSwitch());
    });

    // convert old footer language links/buttons
    document.querySelectorAll('.wd-footer-language, .wd-language-switch').forEach(box => {
      if(box.dataset.langReady) return;
      box.dataset.langReady='yes';
      box.innerHTML = '';
      box.appendChild(createSwitch());
    });

    // header placement
    const header = document.querySelector('.site-header .header-wrap') || document.querySelector('.admin-topbar') || document.querySelector('header .container') || document.querySelector('header');
    if(header && !header.querySelector('.wd-header-lang-switch')){
      const sw = createSwitch();
      const auth = header.querySelector('#authMount');
      const cta = header.querySelector('.header-cta');
      if(auth) header.insertBefore(sw, auth);
      else if(cta && cta.nextSibling) header.insertBefore(sw, cta.nextSibling);
      else header.appendChild(sw);
    }
  }
  document.addEventListener('DOMContentLoaded', mount);
  window.WebDevLanguageSwitch = {go, englishUrl, sinhalaUrl};
})();
