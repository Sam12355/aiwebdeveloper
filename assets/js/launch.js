
(function(){
  const $ = (s) => document.querySelector(s);

  function safeJson(key, fallback={}){
    try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}
    catch(e){return fallback}
  }

  function setText(id, val){
    const el = document.getElementById(id);
    if(el) el.textContent = val;
  }

  function slug(name){
    return (name || 'mybusiness').toLowerCase().replace(/[^a-z0-9]+/g,'').slice(0,24) || 'mybusiness';
  }

  function updateDashboard(stageTitle, percent, index){
    localStorage.setItem('wdlk_dashboard_stage_title', stageTitle);
    localStorage.setItem('wdlk_dashboard_stage_percent', String(percent));
    localStorage.setItem('wdlk_dashboard_stage_index', String(index));
  }

  function init(){
    const customer = safeJson('wdlk_customer');
    const step1 = Object.assign({}, safeJson('wdlk_step1_business'), safeJson('wdlk_step1'));
    const step2 = safeJson('wdlk_step2');
    const theme = safeJson('wdlk_theme');
    const payment = safeJson('wdlk_payment');
    const finalPayment = safeJson('wdlk_final_payment');

    const businessName = customer.businessName || step1.businessName || localStorage.getItem('wdlk_business_type') || 'Your Business';
    const domain = 'https://' + slug(businessName) + '.lk';
    const projectId = localStorage.getItem('wdlk_invoice_number') || payment.invoiceNumber || finalPayment.invoiceNumber || 'WD-PROJECT';

    setText('launchBusinessName', businessName);
    setText('previewBusinessName', businessName);
    setText('launchDomain', domain);
    setText('projectId', projectId);
    setText('launchTheme', theme.themeName || theme.name || 'Modern Business Theme');
    setText('launchPath', step2.websitePath || 'Small Business Website');
    setText('launchPages', step2.pageCount || '5 - 10 Pages');

    const renewal = new Date();
    renewal.setFullYear(renewal.getFullYear() + 1);
    setText('renewalDate', renewal.toLocaleDateString(undefined, {year:'numeric', month:'long', day:'numeric'}));
  }

  function toast(message){
    const el = $('#launchToast');
    el.textContent = message;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2400);
  }

  function bindLaunch(){
    const btn = $('#launchNow');
    const overlay = $('#launchOverlay');
    btn.addEventListener('click', () => {
      btn.disabled = true;
      overlay.classList.add('show');

      const customer = safeJson('wdlk_customer');
      const step1 = Object.assign({}, safeJson('wdlk_step1_business'), safeJson('wdlk_step1'));
      const businessName = customer.businessName || step1.businessName || localStorage.getItem('wdlk_business_type') || 'Your Business';
      const liveUrl = 'https://' + slug(businessName) + '.lk';

      const renewal = new Date();
      renewal.setFullYear(renewal.getFullYear() + 1);

      const launchData = {
        status: 'live',
        liveUrl,
        launchedAt: new Date().toISOString(),
        renewalDate: renewal.toISOString(),
        hosting: {
          firstYear: 'Free',
          secondYearRenewal: 'LKR 12,000 annually'
        }
      };

      localStorage.setItem('wdlk_launch', JSON.stringify(launchData));
      if(window.WebDevProfileData){ window.WebDevProfileData.setProfileItem('wdlk_launch', launchData); }
      localStorage.setItem('wdlk_project_stage', 'live');
      updateDashboard('Website Live', 100, 4);

      Promise.resolve(window.WebDevV52Sync && window.WebDevV52Sync.saveProjectAsync ? window.WebDevV52Sync.saveProjectAsync('website_launched') : null)
        .catch(() => {})
        .finally(() => {
          if(window.WebDevDataRecorder && window.WebDevDataRecorder.capture) window.WebDevDataRecorder.capture('website_launched');
          setTimeout(() => {
            window.location.href = 'website-live.php';
          }, 700);
        });
    });
  }

  init();
  bindLaunch();
})();
