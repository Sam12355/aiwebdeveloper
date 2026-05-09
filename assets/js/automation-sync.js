
(function(){
  const CHANNEL = 'wdlk_auto_sync_channel';
  const isAdmin = /admin-dashboard\.php|\/my-admin/.test(location.pathname);
  const isDashboard = /customer-dashboard\.php/.test(location.pathname);
  const isSinhala = document.documentElement.lang === 'si' || location.pathname.includes('/sn/');

  const STAGE_META = {
    lead:{title:'Lead Captured', percent:5, index:0, status:'Lead'},
    invoice_ready:{title:'Invoice Ready', percent:16, index:0, status:'Invoice Ready'},
    payment_pending_verification:{title:'Payment Slip Submitted - Pending Verification', percent:18, index:0, status:'Payment Pending Verification'},
    planning:{title:'Advance Payment Received - Planning Started', percent:28, index:0, status:'In Progress'},
    design:{title:'Homepage Demo Preparation', percent:45, index:1, status:'In Progress'},
    demo:{title:'Demo Ready', percent:60, index:2, status:'Demo Ready'},
    development:{title:'Development', percent:74, index:3, status:'In Progress'},
    final:{title:'Final Review', percent:88, index:4, status:'Final Review'},
    final_payment:{title:'Final Payment Pending', percent:94, index:4, status:'Final Payment Pending'},
    ready_to_launch:{title:'Ready to Launch', percent:100, index:4, status:'Ready to Launch'},
    live:{title:'Website Live', percent:100, index:4, status:'Live'}
  };

  function safeJson(key, fallback = {}){
    try{return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));}
    catch(e){return fallback;}
  }
  function saveJson(key, value){
    try{localStorage.setItem(key, JSON.stringify(value)); return true;}
    catch(e){console.warn('Sync storage failed', key, e); return false;}
  }
  function firstValue(){
    for(const v of arguments){
      if(v !== undefined && v !== null && String(v).trim() !== '') return String(v).trim();
    }
    return '';
  }
  function money(n){ return 'LKR ' + Number(n || 0).toLocaleString('en-US'); }
  function esc(v){ return String(v ?? '').replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s])); }

  function projectKey(){
    let key = localStorage.getItem('wdlk_project_key');
    if(!key){
      key = 'WDLK-' + Date.now() + '-' + Math.random().toString(36).slice(2,8).toUpperCase();
      localStorage.setItem('wdlk_project_key', key);
    }
    return key;
  }

  function getInvoice(){
    const pay = safeJson('wdlk_payment', {});
    const finalPay = safeJson('wdlk_final_payment', {});
    let inv = localStorage.getItem('wdlk_invoice_number') || pay.invoiceNumber || finalPay.invoiceNumber;
    if(!inv){
      inv = 'WD-' + new Date().toISOString().slice(2,10).replace(/-/g,'') + '-' + projectKey().slice(-4);
      localStorage.setItem('wdlk_invoice_number', inv);
    }
    return inv;
  }

  function slug(name){
    return (name || 'yourbusiness').toLowerCase().replace(/[^a-z0-9]+/g,'').slice(0,24) || 'yourbusiness';
  }

  function getStage(){
    const launch = safeJson('wdlk_launch', {});
    const finalPay = safeJson('wdlk_final_payment', {});
    const finalReview = safeJson('wdlk_final_review', {});
    const demoReview = safeJson('wdlk_demo_review', {});
    let stage = localStorage.getItem('wdlk_project_stage') || '';
    if(launch.status === 'live') stage = 'live';
    else if(finalPay.status === 'balance_paid' && !stage) stage = 'ready_to_launch';
    else if(finalReview.status === 'accepted' && !stage) stage = 'final_payment';
    else if(demoReview.status === 'approved' && !stage) stage = 'development';
    else if(!stage) stage = 'lead';
    return stage;
  }

  function setStage(stage, source='auto'){
    const meta = STAGE_META[stage] || STAGE_META.lead;
    localStorage.setItem('wdlk_project_stage', stage);
    localStorage.setItem('wdlk_dashboard_stage_title', meta.title);
    localStorage.setItem('wdlk_dashboard_stage_percent', String(meta.percent));
    localStorage.setItem('wdlk_dashboard_stage_index', String(meta.index));
    activity('stage', 'Project stage updated', meta.title, {stage, source});
    ping('stage_' + stage);
  }

  function collectProject(reason='sync'){
    const customer = safeJson('wdlk_customer', {});
    const step1 = Object.assign({}, safeJson('wdlk_step1_business', {}), safeJson('wdlk_step1', {}));
    const step2 = Object.assign({}, safeJson('wdlk_step2_details', {}), safeJson('wdlk_step2', {}));
    const theme = safeJson('wdlk_theme', {});
    const pricing = safeJson('wdlk_pricing', safeJson('wdlk_pricing_preview', {}));
    const payment = safeJson('wdlk_payment', {});
    const finalPayment = safeJson('wdlk_final_payment', {});
    const launch = safeJson('wdlk_launch', {});
    const stage = getStage();
    const meta = STAGE_META[stage] || STAGE_META.lead;

    const businessName = firstValue(step2.businessName, customer.businessName, step1.businessName, localStorage.getItem('wdlk_business_name'), localStorage.getItem('wdlk_business_type'), 'New Business');
    const customerName = firstValue(customer.yourName, step1.yourName, step1.customerName, 'Customer');
    const contactNumber = firstValue(customer.contactNumber, step1.contactNumber, '');
    const email = firstValue(customer.email, step1.email, '');
    const total = Number(pricing.totalPrice || step2.totalPrice || payment.total || localStorage.getItem('wdlk_total_price') || 0);
    const advance = Number(pricing.advancePayment || step2.advancePayment || payment.advance || localStorage.getItem('wdlk_advance_payment') || (total ? total/2 : 0));
    const balance = Number(pricing.balancePayment || step2.balancePayment || payment.balance || localStorage.getItem('wdlk_balance_payment') || (total ? total/2 : 0));
    const invoiceNo = getInvoice();

    const liveUrl = firstValue(launch.liveUrl, 'https://' + slug(businessName) + '.lk');

    return {
      id: invoiceNo,
      invoiceNo,
      projectKey: projectKey(),
      reason,
      businessName,
      customerName,
      contactNumber,
      email,
      businessType: firstValue(step1.businessType, step2.businessType, localStorage.getItem('wdlk_business_type'), ''),
      businessDescription: firstValue(step1.businessDescription, step1.description, ''),
      mainServices: firstValue(step2.mainServices, step2.services, ''),
      pageCount: firstValue(step2.pages, step2.pageCount, localStorage.getItem('wdlk_pages'), ''),
      businessModel: firstValue(step2.businessModel, ''),
      websitePath: firstValue(step2.websitePath, localStorage.getItem('wdlk_website_path'), ''),
      feature: firstValue(step2.feature, 'Mobile Friendly Website'),
      additionalInfo: firstValue(step2.additionalInfo, ''),
      theme: firstValue(theme.themeName, theme.name, theme.theme, ''),
      themeCategory: firstValue(theme.category, theme.themeCategory, ''),
      themeImage: firstValue(theme.image, theme.themeImage, ''),
      packageName: firstValue(pricing.packageName, step2.packageName, ''),
      packageLabel: firstValue(pricing.packageLabel, step2.packageLabel, ''),
      pricingType: firstValue(pricing.pricingType, step2.pricingType, ''),
      pricingTypeLabel: firstValue(pricing.pricingTypeLabel, step2.pricingTypeLabel, ''),
      packagePages: firstValue(pricing.packagePages, step2.packagePages, ''),
      totalPrice: total,
      advancePayment: advance,
      balancePayment: balance,
      paymentStatus: firstValue(payment.status, 'lead'),
      paymentMethod: firstValue(payment.method, ''),
      finalPaymentStatus: firstValue(finalPayment.status, ''),
      finalPaymentMethod: firstValue(finalPayment.method, ''),
      stage,
      status: launch.status === 'live' ? 'Live' : meta.status,
      progressPercent: Number(localStorage.getItem('wdlk_dashboard_stage_percent') || meta.percent),
      stageTitle: localStorage.getItem('wdlk_dashboard_stage_title') || meta.title,
      liveUrl,
      renewalDate: firstValue(launch.renewalDate, ''),
      updatedAt: new Date().toISOString(),
      createdAt: firstValue(step1.savedAt, payment.paidAt, new Date().toISOString()),
      raw: {customer, step1, step2, theme, pricing, payment, finalPayment, launch}
    };
  }

  function upsert(list, record, keys){
    const idx = list.findIndex(item => keys.some(k => item[k] && record[k] && String(item[k]) === String(record[k])));
    if(idx >= 0) list[idx] = Object.assign({}, list[idx], record);
    else list.unshift(record);
    return list;
  }

  function upsertAdminProject(project){
    let projects = safeJson('wdlk_admin_projects', []);
    if(!Array.isArray(projects)) projects = [];
    projects = upsert(projects, project, ['projectKey','invoiceNo','id']);
    saveJson('wdlk_admin_projects', projects);
  }

  function upsertPayment(project, type='advance'){
    let payments = safeJson('wdlk_admin_payment_records', []);
    if(!Array.isArray(payments)) payments = [];
    const receipts = [
      safeJson('wdlk_bank_receipt', null),
      safeJson('wdlk_final_bank_receipt', null),
      ...(Array.isArray(safeJson('wdlk_bank_receipts', [])) ? safeJson('wdlk_bank_receipts', []) : []),
      ...(Array.isArray(safeJson('wdlk_admin_bank_payments', [])) ? safeJson('wdlk_admin_bank_payments', []) : [])
    ].filter(Boolean);
    const receipt = receipts.find(r => (type === 'final' ? r.paymentType === 'final' : r.paymentType !== 'final')) || {};

    const amount = type === 'final' ? project.balancePayment : project.advancePayment;
    const status = type === 'final' ? (project.finalPaymentStatus || receipt.status || 'pending') : (project.paymentStatus || receipt.status || 'lead');
    if(!amount && !receipt.id && status === 'lead') return;

    const payment = {
      paymentKey: project.projectKey + '-' + type,
      projectKey: project.projectKey,
      invoiceNo: project.invoiceNo,
      businessName: project.businessName,
      customerName: project.customerName,
      paymentType: type,
      amount,
      method: receipt.method || (type === 'final' ? project.finalPaymentMethod : project.paymentMethod) || 'Bank / Card',
      status,
      receiptId: receipt.id || '',
      receiptFile: receipt.fileName || receipt.receipt_file || '',
      receiptDataUrl: receipt.fileDataUrl || '',
      updatedAt: receipt.submittedAt || project.updatedAt
    };
    payments = upsert(payments, payment, ['paymentKey']);
    saveJson('wdlk_admin_payment_records', payments);
  }

  function collectReceipts(){
    return [
      safeJson('wdlk_bank_receipt', null),
      safeJson('wdlk_final_bank_receipt', null),
      ...(Array.isArray(safeJson('wdlk_bank_receipts', [])) ? safeJson('wdlk_bank_receipts', []) : []),
      ...(Array.isArray(safeJson('wdlk_admin_bank_payments', [])) ? safeJson('wdlk_admin_bank_payments', []) : [])
    ].filter(Boolean);
  }

  function syncRequests(project){
    const emailReq = safeJson('wdlk_email_setup', {});
    const changeReq = safeJson('wdlk_change_request', {});
    let requests = safeJson('wdlk_admin_customer_requests', []);
    if(!Array.isArray(requests)) requests = [];

    if(emailReq && emailReq.status){
      requests = upsert(requests, {
        id: project.projectKey + '-email',
        projectKey: project.projectKey,
        invoiceNo: project.invoiceNo,
        businessName: project.businessName,
        customerName: project.customerName,
        type:'Email Setup',
        title:'Email Setup Request',
        details:`Preferred: ${emailReq.preferredEmail || '-'} | Alternative: ${emailReq.alternativeEmail || '-'} | Forward: ${emailReq.forwardEmail || '-'}`,
        notes: emailReq.emailNotes || '',
        status: emailReq.adminStatus || emailReq.status,
        submittedAt: emailReq.submittedAt || new Date().toISOString()
      }, ['id']);
    }
    if(changeReq && changeReq.status){
      requests = upsert(requests, {
        id: project.projectKey + '-change',
        projectKey: project.projectKey,
        invoiceNo: project.invoiceNo,
        businessName: project.businessName,
        customerName: project.customerName,
        type:'Change Request',
        title:'Website Change Request',
        details:`${changeReq.changeType || '-'} | ${changeReq.changeSection || '-'}`,
        notes: changeReq.changeDetails || '',
        status: changeReq.adminStatus || changeReq.status,
        submittedAt: changeReq.submittedAt || new Date().toISOString()
      }, ['id']);
    }
    saveJson('wdlk_admin_customer_requests', requests);
  }

  function activity(type, title, message, extra={}){
    const project = collectProject('activity_' + type);
    let log = safeJson('wdlk_activity_log', []);
    if(!Array.isArray(log)) log = [];
    const row = {
      id:'ACT-' + Date.now() + '-' + Math.random().toString(36).slice(2,5),
      projectKey: project.projectKey,
      invoiceNo: project.invoiceNo,
      businessName: project.businessName,
      type, title, message,
      extra,
      createdAt: new Date().toISOString()
    };
    log.unshift(row);
    saveJson('wdlk_activity_log', log.slice(0, 300));
    try{
      if(location.protocol !== 'file:'){
        const api = location.pathname.includes('/sn/') ? '../backend/api/automation-sync.php' : 'backend/api/automation-sync.php';
        fetch(api, {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          credentials:'include',
          body:JSON.stringify({
            projectKey: row.projectKey,
            invoiceNo: row.invoiceNo,
            type: row.type,
            title: row.title,
            message: row.message,
            activityId: row.id,
            createdAt: row.createdAt,
            extra: row.extra || {}
          })
        }).catch(()=>{});
      }
    }catch(e){}
    return row;
  }

  function ping(reason='sync'){
    const payload = {reason, time:Date.now(), project: collectProject(reason)};
    try{
      if(window.BroadcastChannel){
        const bc = new BroadcastChannel(CHANNEL);
        bc.postMessage(payload);
        bc.close();
      }
    }catch(e){}
    try{
      localStorage.setItem('wdlk_auto_sync_ping', JSON.stringify(payload));
      window.dispatchEvent(new CustomEvent('wdlk:auto-sync', {detail:payload}));
    }catch(e){}
  }

  let syncing = false;
  function syncNow(reason='sync'){
    if(syncing) return;
    syncing = true;
    try{
      if(window.WebDevDataRecorder && window.WebDevDataRecorder.capture) window.WebDevDataRecorder.capture(reason);
      const project = collectProject(reason);
      upsertAdminProject(project);
      upsertPayment(project, 'advance');
      if(project.finalPaymentStatus || getStage() === 'ready_to_launch' || getStage() === 'live') upsertPayment(project, 'final');
      syncRequests(project);
      if(/payment|receipt|stage|message|request|email|upload|launch|dashboard|form|submit|click/i.test(reason)){
        activity(reason.includes('payment') || reason.includes('receipt') ? 'payment' : 'sync', 'System Sync', reason, {stage:project.stage});
      }
      saveJson('wdlk_current_project_snapshot', project);
      renderCustomer(project);
      renderAdmin(project);
    }finally{
      syncing = false;
    }
  }

  function stageDescription(stage, project){
    const map = {
      lead:'Your project information has been captured. Please continue the guided process.',
      invoice_ready:'Your invoice is ready. You can proceed from the invoice page.',
      payment_pending_verification:'Your payment slip has been submitted and is waiting for admin verification.',
      planning:'Your advance payment is verified. Planning has started.',
      design:'Homepage demo preparation is now in progress.',
      demo:'Your demo is ready for review.',
      development:'Your approved website is under development.',
      final:'Your website is ready for final review.',
      final_payment:'Final website accepted. Balance payment is pending before launch.',
      ready_to_launch:'Final payment completed. Your website is ready for launch.',
      live:'Congratulations. Your website is live now.'
    };
    return map[stage] || 'Your dashboard is synced with admin updates.';
  }

  function renderCustomer(project = collectProject('render_customer')){
    if(!isDashboard) return;

    const stage = STAGE_META[project.stage] || STAGE_META.lead;
    const ids = {
      dashBusiness: project.businessName,
      dashName: project.customerName,
      topName: project.customerName,
      projectName: project.businessName + ' Website',
      projectBusiness: project.businessName,
      projectTheme: project.theme || 'Selected Theme',
      projectPackage: project.packageLabel || project.packageName || 'Website Package',
      projectModel: project.businessModel || '-',
      projectPages: project.pageCount || '-',
      projectName2: project.businessName + ' Website',
      liveUrl: project.liveUrl || 'Preparing...',
      invoiceNo: project.invoiceNo,
      dashStageText: 'Current Stage: ' + (project.stageTitle || stage.title),
      dashActiveStageNo: String(Math.min(Number(stage.index || 0) + 1, 5)),
      dashActiveStageTitle: project.stageTitle || stage.title,
      dashStatusHeadline: project.stageTitle || stage.title,
      dashStatusDescription: stageDescription(project.stage, project),
      livePanelBusiness: project.businessName,
      livePanelUrl: project.liveUrl,
      emailSetupDomain: (project.liveUrl || '').replace(/^https?:\/\//,'').replace(/\/$/,'') || slug(project.businessName) + '.lk',
      suggestedEmail: 'info@' + ((project.liveUrl || '').replace(/^https?:\/\//,'').replace(/\/$/,'') || slug(project.businessName) + '.lk'),
      changeRequestWebsite: project.liveUrl
    };
    Object.entries(ids).forEach(([id,val]) => {
      const el = document.getElementById(id);
      if(el) el.textContent = val;
    });
    const liveOpen = document.getElementById('livePanelOpen');
    if(liveOpen) liveOpen.href = project.liveUrl || '#';
    const livePanel = document.getElementById('liveDashboardPanel');
    if(livePanel && project.stage === 'live') livePanel.classList.remove('is-hidden');

    renderCustomerMessages(project);
    renderCustomerPayments(project);
    renderCustomerActivity(project);
    renderCustomerUploads(project);
  }

  function renderCustomerMessages(project){
    const box = document.querySelector('#messages .messages-list');
    if(!box) return;
    const msgs = safeJson('wdlk_admin_messages', []);
    const uploads = safeJson('wdlk_admin_uploads', []);
    const latest = safeJson('wdlk_admin_latest_message', null);
    const rows = [];

    if(latest && latest.message){
      rows.push({avatar:'WD', subject:'Latest Admin Update', message:latest.message, createdAt:latest.createdAt});
    }
    if(Array.isArray(msgs)){
      msgs.filter(m => !m.projectId || m.projectId === project.invoiceNo || m.projectId === project.id || m.projectId === project.projectKey).forEach(m => {
        rows.push({avatar:'WD', subject:m.subject || 'Message from Admin', message:m.message || '', createdAt:m.createdAt});
      });
    }
    if(Array.isArray(uploads)){
      uploads.filter(u => !u.projectId || u.projectId === project.invoiceNo || u.projectId === project.projectKey).forEach(u => {
        rows.push({avatar:'UP', subject:'Admin File / Update', message:(u.files || []).join(', ') + (u.notes ? ' | ' + u.notes : ''), createdAt:u.uploadedAt});
      });
    }
    if(!rows.length){
      rows.push(
        {avatar:'WD', subject:'Webdeveloper.lk Team', message:'Your project dashboard is synced with admin panel updates.', createdAt:new Date().toISOString()},
        {avatar:'AI', subject:'System Update', message:'We will contact you during the progress and update the dashboard at key stages.', createdAt:new Date().toISOString()}
      );
    }
    box.innerHTML = rows.slice(0,20).map(r => `
      <div class="message-item">
        <span class="message-avatar">${esc(r.avatar)}</span>
        <div><strong>${esc(r.subject)}</strong><p>${esc(r.message)}</p></div>
        <span class="message-time">${r.createdAt ? new Date(r.createdAt).toLocaleString() : ''}</span>
      </div>
    `).join('');
  }

  function renderCustomerPayments(project){
    const paymentMini = document.querySelector('#payments .payment-mini');
    if(!paymentMini) return;
    const receipts = collectReceipts();
    const advanceReceipt = receipts.find(r => r.paymentType !== 'final');
    const finalReceipt = receipts.find(r => r.paymentType === 'final');
    const advancePaid = /paid|received|verified|advance_paid/.test(String(project.paymentStatus || advanceReceipt?.status || '').toLowerCase());
    const advancePending = /pending/.test(String(project.paymentStatus || advanceReceipt?.status || '').toLowerCase());
    const finalPaid = /paid|received|verified|balance_paid/.test(String(project.finalPaymentStatus || finalReceipt?.status || '').toLowerCase());
    paymentMini.innerHTML = `
      <div class="pay-status"><span>Invoice Number</span><strong>${esc(project.invoiceNo)}</strong></div>
      <div class="pay-status"><span>Advance Payment 50%</span><strong class="${advancePaid ? 'paid' : 'pending'}">${advancePaid ? 'Paid' : (advancePending ? 'Pending Verification' : 'Pending')}</strong></div>
      <div class="pay-status"><span>Balance Payment 50%</span><strong class="${finalPaid ? 'paid' : 'pending'}">${finalPaid ? 'Paid' : 'Due before launch'}</strong></div>
      <div class="pay-status"><span>Total Project Price</span><strong>${money(project.totalPrice)}</strong></div>
      <div class="pay-status"><span>Advance Amount</span><strong>${money(project.advancePayment)}</strong></div>
      <div class="pay-status"><span>Balance Amount</span><strong>${money(project.balancePayment)}</strong></div>
    `;
  }

  function renderCustomerActivity(project){
    const dash = document.getElementById('dashboard');
    if(!dash) return;
    let panel = document.getElementById('customerSyncActivityPanel');
    if(!panel){
      panel = document.createElement('div');
      panel.id = 'customerSyncActivityPanel';
      panel.className = 'dash-card sync-activity-card';
      panel.style.marginTop = '22px';
      panel.innerHTML = `<h2>Synced Activity</h2><div id="customerSyncActivityList" class="sync-activity-list"></div>`;
      dash.appendChild(panel);
    }
    const target = document.getElementById('customerSyncActivityList');
    const log = safeJson('wdlk_activity_log', []).filter(a => !a.projectKey || a.projectKey === project.projectKey).slice(0,8);
    target.innerHTML = log.length ? log.map(a => `
      <div class="sync-activity-item"><span>${esc(a.type || 'sync')}</span><div><strong>${esc(a.title)}</strong><small>${esc(a.message || '')} • ${a.createdAt ? new Date(a.createdAt).toLocaleString() : ''}</small></div></div>
    `).join('') : `<div class="sync-activity-item"><span>sync</span><div><strong>Dashboard connected</strong><small>Admin and customer activities will appear here.</small></div></div>`;
  }

  function renderCustomerUploads(project){
    const txt = document.getElementById('uploadText');
    const files = safeJson('wdlk_dashboard_uploads', []);
    if(txt && Array.isArray(files) && files.length) txt.textContent = files.length + ' file(s) selected and synced with admin';
  }

  function renderAdmin(project = collectProject('render_admin')){
    if(!isAdmin) return;
    renderAdminSyncStatus(project);
    renderAdminCustomerRequests();
    renderAdminActivity();
  }

  function renderAdminSyncStatus(project){
    const overview = document.getElementById('overview') || document.querySelector('.admin-section');
    if(!overview) return;
    let card = document.getElementById('adminSyncStatusCard');
    if(!card){
      card = document.createElement('div');
      card.id = 'adminSyncStatusCard';
      card.className = 'admin-card';
      card.style.marginTop = '18px';
      card.innerHTML = `
        <h2>Realtime Sync Status</h2>
        <div class="summary-table">
          <div class="summary-row"><span>Latest Project</span><strong id="syncLatestBusiness"></strong></div>
          <div class="summary-row"><span>Current Stage</span><strong id="syncLatestStage"></strong></div>
          <div class="summary-row"><span>Payment Status</span><strong id="syncLatestPayment"></strong></div>
          <div class="summary-row"><span>Last Synced</span><strong id="syncLatestTime"></strong></div>
        </div>`;
      overview.appendChild(card);
    }
    const set = (id,val) => { const el=document.getElementById(id); if(el) el.textContent=val; };
    set('syncLatestBusiness', project.businessName + ' (' + project.invoiceNo + ')');
    set('syncLatestStage', project.stageTitle || (STAGE_META[project.stage] || {}).title || project.stage);
    set('syncLatestPayment', project.paymentStatus || 'lead');
    set('syncLatestTime', new Date(project.updatedAt).toLocaleString());
  }

  function renderAdminCustomerRequests(){
    const target = document.getElementById('requestsList');
    if(!target) return;
    const requests = safeJson('wdlk_admin_customer_requests', []);
    const emailReq = safeJson('wdlk_email_setup', {});
    const changeReq = safeJson('wdlk_change_request', {});
    let html = '';

    if(Array.isArray(requests) && requests.length){
      html += requests.map(r => `<div class="request-item"><strong>${esc(r.title || r.type)}</strong><p>${esc(r.businessName || '')}<br>${esc(r.details || '')}<br>${esc(r.notes || '')}</p><div class="request-meta"><span>${esc(r.status || '')}</span><span>${r.submittedAt ? new Date(r.submittedAt).toLocaleString() : ''}</span></div></div>`).join('');
    }
    if(!html && (emailReq.status || changeReq.status)){
      if(emailReq.status) html += `<div class="request-item"><strong>Email Setup Request</strong><p>Preferred: ${esc(emailReq.preferredEmail || '-')} | Forward: ${esc(emailReq.forwardEmail || '-')}</p><div class="request-meta"><span>${esc(emailReq.status)}</span><span>${emailReq.submittedAt ? new Date(emailReq.submittedAt).toLocaleString() : ''}</span></div></div>`;
      if(changeReq.status) html += `<div class="request-item"><strong>Change Request</strong><p>${esc(changeReq.changeType || '-')} | ${esc(changeReq.changeSection || '-')}<br>${esc(changeReq.changeDetails || '')}</p><div class="request-meta"><span>${esc(changeReq.status)}</span><span>${changeReq.submittedAt ? new Date(changeReq.submittedAt).toLocaleString() : ''}</span></div></div>`;
    }
    if(html) target.innerHTML = html;
  }

  function renderAdminActivity(){
    let section = document.getElementById('full-data') || document.getElementById('overview');
    if(!section) return;
    let panel = document.getElementById('adminActivityTimeline');
    if(!panel){
      panel = document.createElement('div');
      panel.id = 'adminActivityTimeline';
      panel.className = 'admin-card';
      panel.style.marginTop = '18px';
      panel.innerHTML = `<h2>Frontend Activity Timeline</h2><div id="adminActivityList" class="sync-activity-list"></div>`;
      section.appendChild(panel);
    }
    const target = document.getElementById('adminActivityList');
    const log = safeJson('wdlk_activity_log', []).slice(0,30);
    target.innerHTML = log.length ? log.map(a => `
      <div class="sync-activity-item"><span>${esc(a.type || 'sync')}</span><div><strong>${esc(a.businessName || '')} - ${esc(a.title || '')}</strong><small>${esc(a.message || '')} • ${a.createdAt ? new Date(a.createdAt).toLocaleString() : ''}</small></div></div>
    `).join('') : `<div class="sync-activity-item"><span>sync</span><div><strong>No frontend activity yet</strong><small>Customer actions will appear here automatically.</small></div></div>`;
  }

  function bindPageEvents(){
    document.addEventListener('change', e => {
      const input = e.target;
      if(input && input.id === 'dashUpload' && input.files && input.files.length){
        const files = [...input.files].map(f => ({name:f.name, size:f.size, type:f.type, uploadedAt:new Date().toISOString()}));
        let uploads = safeJson('wdlk_customer_upload_records', []);
        if(!Array.isArray(uploads)) uploads = [];
        uploads.unshift({projectKey:projectKey(), invoiceNo:getInvoice(), files, uploadedAt:new Date().toISOString(), source:'customer_dashboard'});
        saveJson('wdlk_customer_upload_records', uploads);
        activity('upload','Customer uploaded extra files', files.map(f => f.name).join(', '));
        if(window.WebDevRealtime) window.WebDevRealtime.addAdmin({type:'upload', title:'Customer uploaded extra files', message:files.map(f => f.name).join(', '), actionUrl:'admin-dashboard.php#uploads'});
        ping('customer_upload');
      }
    }, true);

    document.addEventListener('submit', e => {
      const id = e.target && e.target.id;
      if(!id) return;
      setTimeout(() => {
        if(id === 'emailSetupForm') activity('email','Email setup request submitted','Customer submitted email setup request.');
        if(id === 'changeRequestForm') activity('request','Change request submitted','Customer submitted a website change request.');
        if(id === 'adminMessageForm') activity('message','Admin message sent','Admin saved a message for customer.');
        if(id === 'stageUpdateForm') activity('stage','Admin stage update','Admin updated project stage.');
        if(id === 'adminUploadForm') activity('upload','Admin upload/update saved','Admin added project file or note.');
        if(id === 'staffAssignForm') activity('staff','Staff job assigned','Admin assigned a job to staff.');
        syncNow('form_submit_' + id);
        ping('form_submit_' + id);
      }, 250);
    }, true);

    document.addEventListener('click', e => {
      const verify = e.target.closest && e.target.closest('[data-verify-payment]');
      if(verify){
        setTimeout(() => { activity('payment','Payment verified by admin','Admin marked payment as received.'); syncNow('payment_verified'); ping('payment_verified'); }, 350);
      }
    }, true);
  }

  function backendPull(){
    if(location.protocol === 'file:' || !isAdmin) return;
    try{
      fetch('backend/api/admin-dashboard-data.php', {credentials:'include'})
        .then(r => r.ok ? r.json() : null)
        .then(data => {
          if(!data || !data.success) return;
          if(Array.isArray(data.projects) && data.projects.length){
            const mapped = data.projects.map(p => ({
              id:p.invoice_no,
              invoiceNo:p.invoice_no,
              projectKey:p.project_key,
              businessName:p.business_name,
              customerName:p.customer_name,
              contactNumber:p.contact_number,
              email:p.email,
              businessType:p.business_type,
              mainServices:p.main_services,
              pageCount:p.page_count,
              businessModel:p.business_model,
              websitePath:p.website_path,
              theme:p.theme_name,
              themeCategory:p.theme_category,
              packageName:p.package_name,
              packageLabel:p.package_label,
              pricingTypeLabel:p.pricing_type_label,
              totalPrice:Number(p.total_price || 0),
              advancePayment:Number(p.advance_payment || 0),
              balancePayment:Number(p.balance_payment || 0),
              paymentStatus:p.payment_status,
              finalPaymentStatus:p.final_payment_status,
              status:p.status,
              stage:p.stage,
              progressPercent:Number(p.progress_percent || 0),
              liveUrl:p.live_url,
              renewalDate:p.renewal_date,
              raw:p.raw_json ? JSON.parse(p.raw_json || '{}') : {},
              updatedAt:p.updated_at || p.created_at
            }));
            saveJson('wdlk_admin_projects', mapped);
          }
          if(Array.isArray(data.receipts)) saveJson('wdlk_admin_backend_receipts', data.receipts);
          if(Array.isArray(data.payments)) saveJson('wdlk_admin_backend_payments', data.payments);
          syncNow('backend_pull');
        }).catch(()=>{});
    }catch(e){}
  }

  function init(){
    syncNow('automation_init');
    bindPageEvents();

    try{
      if(window.BroadcastChannel){
        const bc = new BroadcastChannel(CHANNEL);
        bc.onmessage = () => syncNow('broadcast');
      }
    }catch(e){}

    window.addEventListener('storage', e => {
      if(e.key && e.key.indexOf('wdlk_') === 0) syncNow('storage_' + e.key);
    });
    window.addEventListener('wdlk:auto-sync', () => syncNow('custom_event'));

    setInterval(() => syncNow('auto_refresh'), isAdmin ? 2000 : 2500);
    if(isAdmin) setInterval(backendPull, 12000);
  }

  window.WebDevAutoSync = {
    syncNow,
    collectProject,
    setStage,
    activity,
    ping
  };

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
