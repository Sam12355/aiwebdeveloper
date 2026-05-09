
(function(){
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  function safeJson(key, fallback={}){
    try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}
    catch(e){return fallback}
  }

  const customer = safeJson('wdlk_customer');
  const step1 = safeJson('wdlk_step1');
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

  function initSummary(){
    const businessName = customer.businessName || step1.businessName || localStorage.getItem('wdlk_business_type') || 'Your Business';
    const websitePath = step2.websitePath || 'Small Business Website';
    const selectedTheme = theme.themeName || theme.name || 'Modern Business Theme';
    const pages = step2.pageCount || '5 - 10 Pages';
    const projectId = localStorage.getItem('wdlk_invoice_number') || payment.invoiceNumber || 'WD-PROJECT';

    setText('demoBusinessName', businessName);
    setText('demoBusinessName2', businessName);
    setText('demoProjectId', projectId);
    setText('demoWebsitePath', websitePath);
    setText('demoTheme', selectedTheme);
    setText('demoPages', pages);
    setText('demoUrl', `https://${businessSlug(businessName)}.lk/demo-preview`);
  }

  function initDeviceSwitch(){
    const screen = $('#demoScreen');
    $$('.device-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.device-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        screen.classList.toggle('mobile', btn.dataset.device === 'mobile');
      });
    });
  }

  function toast(message){
    const el = $('#demoToast');
    el.textContent = message;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2400);
  }

  function updateDashboardMirror(stageTitle, percent, index){
    localStorage.setItem('wdlk_dashboard_stage_title', stageTitle);
    localStorage.setItem('wdlk_dashboard_stage_percent', String(percent));
    localStorage.setItem('wdlk_dashboard_stage_index', String(index));
  }

  function bindActions(){
    const approve = $('#approveDemo');
    const request = $('#requestChanges');
    const feedback = $('#demoFeedback');

    approve.addEventListener('click', () => {
      const review = {
        status: 'approved',
        feedback: feedback.value.trim(),
        approvedAt: new Date().toISOString()
      };
      localStorage.setItem('wdlk_demo_review', JSON.stringify(review));
      localStorage.setItem('wdlk_project_stage', 'development');
      updateDashboardMirror('Day 2 - Website Development', 82, 3);
      toast('Demo approved. Development stage started.');
      setTimeout(() => window.location.href = 'project-progress.php', 900);
    });

    request.addEventListener('click', () => {
      const text = feedback.value.trim();
      if(!text){
        toast('Please add your change request before submitting.');
        feedback.focus();
        return;
      }
      const review = {
        status: 'changes_requested',
        feedback: text,
        requestedAt: new Date().toISOString()
      };
      localStorage.setItem('wdlk_demo_review', JSON.stringify(review));
      localStorage.setItem('wdlk_project_stage', 'demo');
      updateDashboardMirror('Demo Changes Requested', 68, 2);
      toast('Change request saved. We will update the demo.');
    });

    $('#saveFeedback').addEventListener('click', () => {
      localStorage.setItem('wdlk_demo_feedback_draft', feedback.value.trim());
      toast('Feedback draft saved.');
    });

    const draft = localStorage.getItem('wdlk_demo_feedback_draft');
    if(draft) feedback.value = draft;
  }

  initSummary();
  initDeviceSwitch();
  bindActions();
})();
