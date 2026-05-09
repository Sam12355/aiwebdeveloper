
(function(){
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  function safeJson(key, fallback={}){
    try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}
    catch(e){return fallback}
  }

  const customer = safeJson('wdlk_customer');
  const step1 = Object.assign({}, safeJson('wdlk_step1_business'), safeJson('wdlk_step1'));
  const step2 = safeJson('wdlk_step2');
  const theme = safeJson('wdlk_theme');
  const payment = safeJson('wdlk_payment');

  function setText(id, val){
    const el = document.getElementById(id);
    if(el) el.textContent = val;
  }

  function businessSlug(name){
    return (name || 'mybusiness').toLowerCase().replace(/[^a-z0-9]+/g,'').slice(0,24) || 'mybusiness';
  }

  function updateDashboardMirror(stageTitle, percent, index){
    localStorage.setItem('wdlk_dashboard_stage_title', stageTitle);
    localStorage.setItem('wdlk_dashboard_stage_percent', String(percent));
    localStorage.setItem('wdlk_dashboard_stage_index', String(index));
  }

  function initSummary(){
    const businessName = customer.businessName || step1.businessName || localStorage.getItem('wdlk_business_type') || 'Your Business';
    const websitePath = step2.websitePath || 'Small Business Website';
    const selectedTheme = theme.themeName || theme.name || 'Modern Business Theme';
    const pages = step2.pageCount || '5 - 10 Pages';
    const projectId = localStorage.getItem('wdlk_invoice_number') || payment.invoiceNumber || 'WD-PROJECT';
    const liveUrl = `https://${businessSlug(businessName)}.lk`;

    setText('finalBusinessName', businessName);
    setText('finalBusinessName2', businessName);
    setText('finalProjectId', projectId);
    setText('finalWebsitePath', websitePath);
    setText('finalTheme', selectedTheme);
    setText('finalPages', pages);
    setText('finalLiveUrl', liveUrl);
    setText('summaryBusiness', businessName);
    setText('summaryTheme', selectedTheme);
    setText('summaryPath', websitePath);
    setText('summaryPages', pages);
  }

  function initDeviceSwitch(){
    const screen = $('#finalScreen');
    $$('.device-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.device-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        screen.classList.toggle('mobile', btn.dataset.device === 'mobile');
      });
    });
  }

  function toast(message){
    const el = $('#finalToast');
    el.textContent = message;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2400);
  }

  function bindApproval(){
    const check = $('#approvalCheck');
    const acceptBtn = $('#acceptFinal');
    const error = $('#finalError');
    const feedback = $('#finalFeedback');

    function updateButton(){
      acceptBtn.disabled = !check.checked;
    }

    check.addEventListener('change', updateButton);
    updateButton();

    acceptBtn.addEventListener('click', () => {
      if(!check.checked){
        error.textContent = 'Please confirm final review before accepting.';
        return;
      }

      error.textContent = '';

      const finalReview = {
        status: 'accepted',
        finalNote: feedback.value.trim(),
        acceptedAt: new Date().toISOString()
      };

      localStorage.setItem('wdlk_final_review', JSON.stringify(finalReview));
      localStorage.setItem('wdlk_project_stage', 'final_payment');
      updateDashboardMirror('Final Website Accepted - Balance Payment Pending', 98, 4);

      toast('Final website accepted. Opening final payment page...');
      Promise.resolve(window.WebDevV52Sync && window.WebDevV52Sync.saveProjectAsync ? window.WebDevV52Sync.saveProjectAsync('final_review_accepted') : null)
        .catch(() => {})
        .finally(() => {
          if(window.WebDevDataRecorder && window.WebDevDataRecorder.capture) window.WebDevDataRecorder.capture('final_review_accepted');
          setTimeout(() => window.location.href = 'final-payment.php', 300);
        });
    });

    const saved = safeJson('wdlk_final_review', {});
    if(saved.finalNote) feedback.value = saved.finalNote;
  }

  initSummary();
  initDeviceSwitch();
  bindApproval();
})();
