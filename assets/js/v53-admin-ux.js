
(function(){
  const $ = s => document.querySelector(s);
  function safeJson(key, fallback){
    try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback));}
    catch(e){return fallback;}
  }
  function saveJson(key, value){localStorage.setItem(key, JSON.stringify(value));}
  function projects(){
    const p = safeJson('wdlk_admin_projects', []);
    return Array.isArray(p) ? p : [];
  }
  function showTab(id){
    const target = document.getElementById(id);
    if(!target) return;
    document.querySelectorAll('.admin-section').forEach(s => s.classList.toggle('active', s.id === id));
    document.querySelectorAll('[data-admin-tab]').forEach(a => a.classList.toggle('active', a.dataset.adminTab === id));
    history.replaceState(null,'','#'+id);
    if(window.WebDevAdminRefresh) window.WebDevAdminRefresh('jump_' + id);
  }
  function fillProjectSelect(){
    const select = $('#stageProjectSelect');
    if(!select) return;
    const list = projects();
    const current = $('#stageProjectId')?.value || localStorage.getItem('wdlk_admin_selected_project') || '';
    select.innerHTML = list.map(p => `<option value="${p.id || p.invoiceNo || p.projectKey}" ${current && [p.id,p.invoiceNo,p.projectKey].includes(current) ? 'selected':''}>${p.businessName || 'Project'} - ${p.invoiceNo || p.id || p.projectKey}</option>`).join('');
    if(!select.value && select.options[0]) select.value = select.options[0].value;
    if(select.value) setProject(select.value);
  }
  function findProject(id){
    return projects().find(p => p.id === id || p.invoiceNo === id || p.projectKey === id) || null;
  }
  function stagePercent(stage){
    return {lead:5,pending_lead:15,planning:28,design:45,demo:60,development:74,final:88,final_payment:94,ready_to_launch:98,live:100}[stage] || 20;
  }
  function setProject(id){
    const p = findProject(id);
    if(!p) return;
    localStorage.setItem('wdlk_admin_selected_project', id);
    const pid = $('#stageProjectId'); if(pid) pid.value = p.id || p.invoiceNo || p.projectKey;
    const stage = $('#stageSelect'); if(stage) stage.value = p.stage || 'planning';
    const progress = $('#stageProgressPercent'); if(progress) progress.value = p.progressPercent || stagePercent(p.stage);
    const pv = $('#stageProgressValue'); if(pv) pv.textContent = (progress ? progress.value : stagePercent(p.stage)) + '%';
    const b = $('#updateSnapBusiness'); if(b) b.textContent = p.businessName || 'Project';
    const c = $('#updateSnapCustomer'); if(c) c.textContent = `${p.customerName || ''} | ${p.contactNumber || ''} | ${p.email || ''}`;
    document.querySelectorAll('[data-stage-dot]').forEach(dot => dot.classList.toggle('active', dot.dataset.stageDot === (p.stage || 'planning')));
  }
  function quickMessage(stage){
    return {
      planning:'Your advance payment has been confirmed. Website planning has started.',
      design:'Your homepage demo preparation is now in progress.',
      demo:'Your homepage demo is ready. Please review it from your dashboard.',
      final:'Your website is ready for final review. Please check and approve.',
      live:'Congratulations. Your website is live now.'
    }[stage] || 'Your project status has been updated.';
  }
  function bind(){
    document.addEventListener('click', e => {
      const jump = e.target.closest('[data-admin-jump]');
      if(jump){
        e.preventDefault();
        showTab(jump.dataset.adminJump);
      }
      const quick = e.target.closest('[data-stage-template]');
      if(quick){
        const st = quick.dataset.stageTemplate;
        if($('#stageSelect')) $('#stageSelect').value = st;
        if($('#stageMessage')) $('#stageMessage').value = quickMessage(st);
        if($('#stageProgressPercent')) $('#stageProgressPercent').value = stagePercent(st);
        if($('#stageProgressValue')) $('#stageProgressValue').textContent = stagePercent(st) + '%';
      }
    }, true);
    document.addEventListener('change', e => {
      if(e.target && e.target.id === 'stageProjectSelect') setProject(e.target.value);
      if(e.target && e.target.id === 'stageSelect'){
        const st = e.target.value;
        if($('#stageProgressPercent')) $('#stageProgressPercent').value = stagePercent(st);
        if($('#stageProgressValue')) $('#stageProgressValue').textContent = stagePercent(st) + '%';
        document.querySelectorAll('[data-stage-dot]').forEach(dot => dot.classList.toggle('active', dot.dataset.stageDot === st));
      }
      if(e.target && e.target.id === 'stageProgressPercent'){
        if($('#stageProgressValue')) $('#stageProgressValue').textContent = e.target.value + '%';
      }
    }, true);
    const form = $('#stageUpdateForm');
    if(form && !form.dataset.v53Bound){
      form.dataset.v53Bound = 'yes';
      form.addEventListener('submit', function(){
        const id = $('#stageProjectId')?.value || $('#stageProjectSelect')?.value;
        const st = $('#stageSelect')?.value || 'planning';
        const percent = Number($('#stageProgressPercent')?.value || stagePercent(st));
        const message = $('#stageMessage')?.value || quickMessage(st);
        let list = projects();
        const idx = list.findIndex(p => p.id === id || p.invoiceNo === id || p.projectKey === id);
        if(idx >= 0){
          list[idx].stage = st;
          list[idx].progressPercent = percent;
          list[idx].status = st === 'live' ? 'Live' : 'In Progress';
          list[idx].stageTitle = $('#stageSelect option:checked')?.textContent || st;
          list[idx].adminMessage = message;
          list[idx].updatedAt = new Date().toISOString();
          saveJson('wdlk_admin_projects', list);
        }
        saveJson('wdlk_admin_latest_message', {projectId:id, subject:'Project Status Update', message, createdAt:new Date().toISOString()});
        if(window.WebDevV52Sync){
          window.WebDevV52Sync.notify('Project status updated', message, 'project_update', window.WebDevV52Sync.collect('admin_project_update'));
          window.WebDevV52Sync.saveProject('admin_project_status_update');
        }
      }, true);
    }
  }
  function init(){
    fillProjectSelect();
    bind();
    setInterval(fillProjectSelect, 5000);
    if(location.hash){
      const id = location.hash.replace('#','');
      if(id) showTab(id);
    }
  }
  document.addEventListener('DOMContentLoaded', init);
})();
