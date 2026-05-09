
(function(){
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  function safeJson(key, fallback = {}){
    try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback));}
    catch(e){return fallback;}
  }
  function saveJson(key, value){localStorage.setItem(key, JSON.stringify(value));}

  function seedProjects(){
    const existing = safeJson('wdlk_admin_projects', null);
    if(existing && Array.isArray(existing) && existing.length) return existing;

    const customer = safeJson('wdlk_customer', {});
    const step1 = safeJson('wdlk_step1', safeJson('wdlk_step1_business', {}));
    const step2 = safeJson('wdlk_step2', safeJson('wdlk_step2_details', {}));
    const theme = safeJson('wdlk_theme', {});
    const payment = safeJson('wdlk_payment', {});
    const launch = safeJson('wdlk_launch', {});
    const invoice = localStorage.getItem('wdlk_invoice_number') || payment.invoiceNumber || 'WD-PROJECT';

    const projects = [{
      id: invoice,
      businessName: customer.businessName || step1.businessName || 'Demo Business',
      customerName: customer.yourName || step1.customerName || 'Customer',
      contactNumber: customer.contactNumber || step1.contactNumber || '',
      email: customer.email || '',
      websitePath: step2.websitePath || 'Small Business Website',
      theme: theme.themeName || theme.name || 'Modern Business Theme',
      status: launch.status === 'live' ? 'Live' : 'In Progress',
      stage: localStorage.getItem('wdlk_project_stage') || 'planning',
      createdAt: payment.paidAt || step1.savedAt || new Date().toISOString(),
      liveUrl: launch.liveUrl || '',
      notes: ''
    }];

    saveJson('wdlk_admin_projects', projects);
    return projects;
  }

  let projects = seedProjects();
  let selectedProjectId = projects[0] ? projects[0].id : null;

  function toast(msg){
    const el = $('#adminToast');
    if(!el) return;
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2200);
  }

  function stageLabel(stage){
    const map = {
      planning:'Planning',
      design:'Homepage Demo Preparation',
      demo:'Demo Ready',
      development:'Development',
      final:'Final Review',
      final_payment:'Final Payment Pending',
      ready_to_launch:'Ready to Launch',
      live:'Live'
    };
    return map[stage] || stage || 'Planning';
  }

  function statusClass(status){
    status = String(status||'').toLowerCase();
    if(status.includes('live') || status.includes('paid')) return 'green';
    if(status.includes('pending') || status.includes('progress')) return 'orange';
    if(status.includes('request')) return 'red';
    return '';
  }

  function renderStats(){
    $('#statLeads').textContent = String(projects.length);
    $('#statPaid').textContent = String(projects.filter(p => ['planning','design','demo','development','final','final_payment','ready_to_launch','live'].includes(p.stage)).length);
    $('#statProgress').textContent = String(projects.filter(p => p.status !== 'Live').length);
    $('#statLive').textContent = String(projects.filter(p => p.status === 'Live').length);
  }

  function renderProjects(list = projects){
    const body = $('#projectsBody');
    if(!body) return;
    body.innerHTML = list.map(p => `
      <tr>
        <td><strong>${p.businessName}</strong><br><small>${p.id}</small></td>
        <td>${p.customerName}<br><small>${p.contactNumber || p.email || '-'}</small></td>
        <td>${p.websitePath}<br><small>${p.theme}</small></td>
        <td><span class="status-badge ${statusClass(p.status)}">${p.status}</span><br><small>${stageLabel(p.stage)}</small></td>
        <td>
          <div class="row-actions">
            <button class="mini-btn primary" data-select-project="${p.id}">Open</button>
            <button class="mini-btn green" data-stage-project="${p.id}">Update Stage</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  function renderSelected(){
    const p = projects.find(x => x.id === selectedProjectId) || projects[0];
    if(!p) return;
    selectedProjectId = p.id;
    $('#selectedProjectTitle').textContent = p.businessName;
    $('#selectedProjectMeta').textContent = `${p.id} • ${stageLabel(p.stage)}`;
    $('#stageProjectId').value = p.id;
    $('#stageSelect').value = p.stage || 'planning';
    $('#adminMessageProject').value = p.id;
    $('#uploadProjectId').value = p.id;
  }

  function renderRequests(){
    const emailReq = safeJson('wdlk_email_setup', {});
    const changeReq = safeJson('wdlk_change_request', {});
    const target = $('#requestsList');
    if(!target) return;

    let html = '';
    if(emailReq.status){
      html += `<div class="request-item"><strong>Email Setup Request</strong><p>Preferred: ${emailReq.preferredEmail || '-'} • Forward to: ${emailReq.forwardEmail || '-'}</p><div class="request-meta"><span>${emailReq.status}</span><span>${emailReq.submittedAt ? new Date(emailReq.submittedAt).toLocaleString() : ''}</span></div></div>`;
    }
    if(changeReq.status){
      html += `<div class="request-item"><strong>Change Request</strong><p>${changeReq.changeType || '-'} • ${changeReq.changeSection || '-'}<br>${changeReq.changeDetails || ''}</p><div class="request-meta"><span>${changeReq.status}</span><span>${changeReq.submittedAt ? new Date(changeReq.submittedAt).toLocaleString() : ''}</span></div></div>`;
    }
    if(!html) html = `<div class="request-item"><strong>No active requests</strong><p>Email setup and change requests will appear here.</p></div>`;
    target.innerHTML = html;
  }



  function formatNotifyTime(value){
    try { return new Date(value).toLocaleString(); } catch(e){ return ''; }
  }

  function notifyIcon(type){
    const map = { payment:'▤', stage:'↻', message:'✉', upload:'⇧', live:'🚀', request:'✎', email:'@', staff:'👥' };
    return map[type] || '🔔';
  }

  function renderAdminNotifications(){
    if(!window.WebDevRealtime) return;
    const list = window.WebDevRealtime.getNotifications('admin');
    const target = document.getElementById('adminNotificationList');
    const count = window.WebDevRealtime.unreadCount('admin');

    ['adminTopBadge','adminNavBadge'].forEach(id => {
      const badge = document.getElementById(id);
      if(badge){
        badge.textContent = String(count);
        badge.style.display = count ? 'inline-flex' : 'none';
      }
    });

    if(!target) return;
    target.innerHTML = list.length ? list.map(n => `
      <div class="notification-item ${n.read ? '' : 'unread'}" data-admin-notification="${n.id}">
        <span class="notification-icon">${notifyIcon(n.type)}</span>
        <div>
          <h4>${n.title}</h4>
          <p>${n.message}</p>
        </div>
        <span class="notification-time">${formatNotifyTime(n.createdAt)}</span>
      </div>
    `).join('') : `<div class="notification-item"><span class="notification-icon">🔔</span><div><h4>No notifications yet</h4><p>Customer actions and system alerts will appear here.</p></div></div>`;
  }

  function initAdminRealtimeNotifications(){
    if(!window.WebDevRealtime) return;

    renderAdminNotifications();

    window.WebDevRealtime.subscribe((notification) => {
      if(notification && notification.audience === 'admin'){
        renderAdminNotifications();
        window.WebDevRealtime.showToast(notification.title, notification.message);
      }
      if(notification && notification.audience === 'customer'){
        // no admin toast for customer-directed messages
      }
    });

    setInterval(renderAdminNotifications, 2000);

    document.addEventListener('click', (e) => {
      const item = e.target.closest('[data-admin-notification]');
      if(item && window.WebDevRealtime){
        window.WebDevRealtime.markRead('admin', item.dataset.adminNotification);
        renderAdminNotifications();
      }
    });

    const markAll = document.getElementById('adminMarkAllRead');
    if(markAll){
      markAll.addEventListener('click', () => {
        window.WebDevRealtime.markAllRead('admin');
        renderAdminNotifications();
      });
    }
  }

  function defaultStaff(){
    let staff = safeJson('wdlk_staff_members', null);
    if(Array.isArray(staff) && staff.length) return staff;
    staff = [
      {id:'staff-1', name:'Web Designer', role:'UI Designer', active:true},
      {id:'staff-2', name:'Web Developer', role:'Developer', active:true},
      {id:'staff-3', name:'Content Manager', role:'Content Upload', active:true}
    ];
    saveJson('wdlk_staff_members', staff);
    return staff;
  }

  function renderPayments(){
    const target = document.getElementById('adminPaymentList');
    if(!target) return;
    const payments = safeJson('wdlk_admin_bank_payments', []);
    target.innerHTML = Array.isArray(payments) && payments.length ? payments.map(p => {
      const statusText = String(p.status || '').toLowerCase();
      const isReceived = statusText === 'received' || statusText.includes('paid') || statusText.includes('verified');
      return `
      <div class="admin-payment-item">
        <div class="admin-payment-head">
          <div>
            <strong>${p.businessName || 'Customer'} - ${p.paymentType === 'final' ? 'Final Payment' : 'Advance Payment'}</strong>
            <small>${p.invoiceNumber} • ${p.method}</small>
          </div>
          <span class="status-badge ${isReceived ? 'green' : 'orange'}">${isReceived ? 'Payment Received' : 'Pending Verification'}</span>
        </div>
        <div class="request-meta"><span>Amount: LKR ${Number(p.amount || 0).toLocaleString()}</span><span>${p.submittedAt ? new Date(p.submittedAt).toLocaleString() : ''}</span></div>
        ${p.fileDataUrl && p.fileType && p.fileType.startsWith('image/') ? `<img class="admin-receipt-image" src="${p.fileDataUrl}" alt="Payment receipt">` : `<p style="color:#60708e">Receipt file: ${p.fileName || 'Uploaded file'}</p>`}
        <div class="row-actions" style="margin-top:14px">
          <button class="mini-btn green" data-verify-payment="${p.id}" data-backend-payment-id="${p.backendPaymentId || ''}" data-project-id="${p.projectId || ''}" data-payment-type="${p.paymentType || 'advance'}" ${isReceived ? 'disabled' : ''}>${isReceived ? 'Received' : 'Mark Payment Received'}</button>
          <button class="mini-btn" data-select-project="${p.invoiceNumber}">Open Project</button>
        </div>
      </div>
    `}).join('') : `<div class="admin-payment-item"><strong>No bank receipts yet</strong><p style="color:#60708e">Uploaded bank deposit or online transfer slips will appear here.</p></div>`;
  }

  function bindPayments(){
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-verify-payment]');
      if(!btn) return;
      if(btn.disabled) return;
      btn.disabled = true;
      if(window.WebDevBankPayment){
        window.WebDevBankPayment.markReceiptVerified(btn.dataset.verifyPayment);
      } else {
        const payments = safeJson('wdlk_admin_bank_payments', []);
        const p = payments.find(x => x.id === btn.dataset.verifyPayment);
        if(p) p.status = 'received';
        saveJson('wdlk_admin_bank_payments', payments);
      }
      if(location.protocol !== 'file:'){
        fetch('backend/api/payment-verify.php', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          credentials:'include',
          body:JSON.stringify({
            paymentId: btn.dataset.backendPaymentId || 0,
            projectId: btn.dataset.projectId || 0,
            paymentType: btn.dataset.paymentType || 'advance'
          })
        }).then(r => r.json()).then(() => {
          if(window.WebDevAdminDbSync) window.WebDevAdminDbSync.syncDashboard();
        }).catch(() => {}).finally(() => { btn.disabled = false; });
      } else {
        btn.disabled = false;
      }
      projects = seedProjects();
      renderPayments();
      renderStats();
      renderProjects();
      renderSelected();
      toast('Payment marked as received.');
      if(window.WebDevRealtime){
        const receipt = safeJson('wdlk_admin_bank_payments', []).find(x => x.id === btn.dataset.verifyPayment);
        window.WebDevRealtime.addCustomer({
          type:'payment',
          title:'Payment received and verified',
          message: receipt && receipt.paymentType === 'final' ? 'Your final payment has been verified. Your website is ready for launch.' : 'Your advance payment has been verified. Your website project is now starting.',
          actionUrl:'customer-dashboard.php#dashboard'
        });
      }
    });
  }

  function renderStaff(){
    const staff = defaultStaff();
    const staffList = document.getElementById('staffList');
    const staffSelect = document.getElementById('assignStaffSelect');
    if(staffList){
      staffList.innerHTML = staff.map(s => `<div class="staff-item"><div><strong>${s.name}</strong><small>${s.role}</small></div><span class="status-badge green">Active</span></div>`).join('');
    }
    if(staffSelect){
      staffSelect.innerHTML = staff.map(s => `<option value="${s.id}">${s.name} - ${s.role}</option>`).join('');
    }

    const projectSelect = document.getElementById('assignProjectSelect');
    if(projectSelect){
      projectSelect.innerHTML = projects.map(p => `<option value="${p.id}">${p.businessName} (${p.id})</option>`).join('');
    }
  }

  function renderAssignments(){
    const target = document.getElementById('assignmentList');
    if(!target) return;
    const assignments = safeJson('wdlk_job_assignments', []);
    const staff = defaultStaff();
    target.innerHTML = assignments.length ? assignments.map(a => {
      const s = staff.find(x => x.id === a.staffId) || {name:'Staff'};
      return `<div class="assignment-card"><strong>${a.jobType}</strong><small>Project: ${a.projectId} • Staff: ${s.name}</small><p style="color:#60708e;margin:8px 0 0">${a.instructions || ''}</p><div class="request-meta"><span>${a.status}</span><span>${new Date(a.assignedAt).toLocaleString()}</span></div></div>`;
    }).join('') : `<div class="assignment-card"><strong>No jobs assigned yet</strong><small>Assign website jobs after payment is received.</small></div>`;
  }

  function bindStaff(){
    const createForm = document.getElementById('staffCreateForm');
    if(createForm){
      createForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const staff = defaultStaff();
        staff.push({id:'staff-' + Date.now(), name:document.getElementById('staffName').value.trim(), role:document.getElementById('staffRole').value.trim(), active:true});
        saveJson('wdlk_staff_members', staff);
        createForm.reset();
        renderStaff();
        toast('Staff member added.');
      });
    }

    const assignForm = document.getElementById('staffAssignForm');
    if(assignForm){
      assignForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const assignments = safeJson('wdlk_job_assignments', []);
        const assignment = {
          id:'JOB-' + Date.now(),
          projectId:document.getElementById('assignProjectSelect').value,
          staffId:document.getElementById('assignStaffSelect').value,
          jobType:document.getElementById('assignJobType').value,
          instructions:document.getElementById('assignInstructions').value.trim(),
          status:'Assigned',
          assignedAt:new Date().toISOString()
        };
        assignments.unshift(assignment);
        saveJson('wdlk_job_assignments', assignments);
        if(window.WebDevAutoSync){ window.WebDevAutoSync.activity('staff','Staff job assigned', assignment.jobType + ' assigned.'); window.WebDevAutoSync.syncNow('staff_assignment'); }

        const projects = safeJson('wdlk_admin_projects', []);
        const p = projects.find(x => x.id === assignment.projectId);
        if(p){
          p.assignedStaffId = assignment.staffId;
          p.currentJob = assignment.jobType;
          p.updatedAt = new Date().toISOString();
          saveJson('wdlk_admin_projects', projects);
        }

        assignForm.reset();
        renderAssignments();
        toast('Job assigned to staff.');
        if(window.WebDevRealtime){
          window.WebDevRealtime.addAdmin({
            type:'staff',
            title:'Staff job assigned',
            message:'Job assigned: ' + assignment.jobType + ' for project ' + assignment.projectId,
            actionUrl:'admin-dashboard.php#staff'
          });
          window.WebDevRealtime.addCustomer({
            type:'stage',
            title:'Project team assigned',
            message:'Your project has been assigned to our team for ' + assignment.jobType + '.',
            actionUrl:'customer-dashboard.php#dashboard'
          });
        }
      });
    }
  }

  function showAdminTab(tab, updateHash = true){
    if(!tab) tab = 'overview';
    const target = document.getElementById(tab);
    if(!target) return false;

    $$('[data-admin-tab]').forEach(l => l.classList.toggle('active', l.dataset.adminTab === tab));
    $$('.admin-section').forEach(s => s.classList.toggle('active', s.id === tab));

    if(updateHash) history.replaceState(null, '', '#' + tab);
    return true;
  }

  function bindTabs(){
    $$('[data-admin-tab]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        showAdminTab(link.dataset.adminTab, true);
      });
    });

    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href*="#"]');
      if(!anchor) return;
      const href = anchor.getAttribute('href') || '';
      const hash = href.split('#')[1];
      if(hash && document.getElementById(hash) && anchor.closest('.admin-shell')){
        e.preventDefault();
        showAdminTab(hash, true);
      }
    });

    window.addEventListener('hashchange', () => {
      initAdminHashTab();
    });
  }

  function initAdminHashTab(){
    const hash = (window.location.hash || '').replace('#','');
    if(hash) showAdminTab(hash, false);
  }

  function bindProjects(){
    document.addEventListener('click', (e) => {
      const selectBtn = e.target.closest('[data-select-project]');
      if(selectBtn){
        selectedProjectId = selectBtn.dataset.selectProject;
        renderSelected();
        toast('Project opened.');
      }
      const stageBtn = e.target.closest('[data-stage-project]');
      if(stageBtn){
        selectedProjectId = stageBtn.dataset.stageProject;
        renderSelected();
        $('[data-admin-tab="project-update"]').click();
      }
    });

    $('#adminSearchBtn').addEventListener('click', () => {
      const q = ($('#adminSearch').value || '').toLowerCase();
      const list = projects.filter(p => [p.businessName,p.customerName,p.contactNumber,p.email,p.id,p.status,p.stage].join(' ').toLowerCase().includes(q));
      renderProjects(list);
    });
  }

  function bindStageUpdate(){
    const form = $('#stageUpdateForm');
    if(!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = $('#stageProjectId').value;
      const stage = $('#stageSelect').value;
      const message = $('#stageMessage').value.trim();
      const p = projects.find(x => x.id === id);
      if(!p) return;
      p.stage = stage;
      p.status = stage === 'live' ? 'Live' : (stage === 'ready_to_launch' ? 'Ready to Launch' : 'In Progress');
      p.adminMessage = message;
      p.updatedAt = new Date().toISOString();
      saveJson('wdlk_admin_projects', projects);
      if(location.protocol !== 'file:'){
        fetch('backend/api/project-stage-update.php', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          credentials:'include',
          body:JSON.stringify({projectId:p.rawId || p.projectId || p.backendId || p.dbId || p.project_id || 0, stage, message, progressPercent:Number($('#stageProgressPercent')?.value || 0)})
        }).then(() => {
          if(window.WebDevAdminDbSync) window.WebDevAdminDbSync.syncDashboard();
        }).catch(() => {});
      }
      if(window.WebDevAutoSync){ window.WebDevAutoSync.setStage(stage, 'admin_stage_update'); window.WebDevAutoSync.syncNow('admin_stage_update'); }

      // Mirror to customer flow in prototype
      localStorage.setItem('wdlk_project_stage', stage);
      localStorage.setItem('wdlk_dashboard_stage_title', stageLabel(stage));
      localStorage.setItem('wdlk_dashboard_stage_percent', stage === 'live' ? '100' : (stage === 'ready_to_launch' ? '100' : '82'));
      if(message){
        localStorage.setItem('wdlk_admin_latest_message', JSON.stringify({projectId:id,message,createdAt:new Date().toISOString()}));
      }

      renderStats(); renderProjects(); renderSelected();
      toast('Project stage updated.');
      if(window.WebDevRealtime){
        window.WebDevRealtime.addCustomer({
          type:'stage',
          title:'Project stage updated by admin',
          message: message || ('Your project stage is now: ' + stageLabel(stage)),
          actionUrl:'customer-dashboard.php#dashboard'
        });
      }
    });
  }

  function bindMessage(){
    const form = $('#adminMessageForm');
    if(!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = {
        projectId: $('#adminMessageProject').value,
        subject: $('#adminMessageSubject').value.trim(),
        message: $('#adminMessageText').value.trim(),
        createdAt: new Date().toISOString(),
        status: 'sent'
      };
      const messages = safeJson('wdlk_admin_messages', []);
      messages.unshift(msg);
      saveJson('wdlk_admin_messages', messages);
      if(window.WebDevAutoSync){ window.WebDevAutoSync.activity('message','Admin message saved', msg.subject + ': ' + msg.message); window.WebDevAutoSync.syncNow('admin_message'); }
      form.reset();
      renderMessages();
      toast('Message saved for customer.');
      if(window.WebDevRealtime){
        window.WebDevRealtime.addCustomer({
          type:'message',
          title:'New message from admin',
          message: msg.subject + ': ' + msg.message,
          actionUrl:'customer-dashboard.php#messages'
        });
      }
    });
  }

  function renderMessages(){
    const target = $('#messageList');
    if(!target) return;
    const messages = safeJson('wdlk_admin_messages', []);
    target.innerHTML = messages.length ? messages.map(m => `<div class="request-item"><strong>${m.subject}</strong><p>${m.message}</p><div class="request-meta"><span>${m.projectId}</span><span>${new Date(m.createdAt).toLocaleString()}</span></div></div>`).join('') : `<div class="request-item"><strong>No messages sent</strong><p>Messages to customers will appear here.</p></div>`;
  }

  function bindUpload(){
    const form = $('#adminUploadForm');
    if(!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const files = [...$('#adminUploadFiles').files].map(f => f.name);
      const uploads = safeJson('wdlk_admin_uploads', []);
      uploads.unshift({projectId:$('#uploadProjectId').value, files, notes:$('#uploadNotes').value.trim(), uploadedAt:new Date().toISOString()});
      saveJson('wdlk_admin_uploads', uploads);
      if(window.WebDevAutoSync){ window.WebDevAutoSync.activity('upload','Admin project update saved', ($('#uploadNotes') ? $('#uploadNotes').value.trim() : '')); window.WebDevAutoSync.syncNow('admin_upload'); }
      form.reset();
      renderUploads();
      toast('Upload record saved.');
      if(window.WebDevRealtime){
        window.WebDevRealtime.addCustomer({
          type:'upload',
          title:'New project file/update uploaded',
          message:'Admin added a project file or update record.',
          actionUrl:'customer-dashboard.php#dashboard'
        });
      }
    });
  }

  function renderUploads(){
    const target = $('#uploadList');
    if(!target) return;
    const uploads = safeJson('wdlk_admin_uploads', []);
    target.innerHTML = uploads.length ? uploads.map(u => `<div class="request-item"><strong>${u.files.join(', ') || 'No file names'}</strong><p>${u.notes || ''}</p><div class="request-meta"><span>${u.projectId}</span><span>${new Date(u.uploadedAt).toLocaleString()}</span></div></div>`).join('') : `<div class="request-item"><strong>No uploads recorded</strong><p>Admin uploads and notes will appear here.</p></div>`;
  }


  function refreshProjectsFromStorage(source='auto'){
    const fresh = safeJson('wdlk_admin_projects', []);
    if(Array.isArray(fresh) && fresh.length){
      projects = fresh;
      if(!selectedProjectId || !projects.some(p => p.id === selectedProjectId || p.invoiceNo === selectedProjectId || p.projectKey === selectedProjectId)){
        selectedProjectId = projects[0].id || projects[0].invoiceNo || projects[0].projectKey;
      }
    }
    renderStats();
    renderProjects();
    renderSelected();
    renderRequests();
    renderMessages();
    renderUploads();
    renderPayments();
    renderStaff();
    renderAssignments();
  }

  function init(){
    // Login disabled for current prototype testing.
    // Direct admin access is allowed.
    localStorage.setItem('wdlk_admin_logged_in', 'yes');
    bindTabs(); bindProjects(); bindStageUpdate(); bindMessage(); bindUpload(); bindPayments(); bindStaff();
    renderStats(); renderProjects(); renderSelected(); renderRequests(); renderMessages(); renderUploads(); renderPayments(); renderStaff(); renderAssignments(); initAdminRealtimeNotifications(); initAdminHashTab();
    window.WebDevAdminRefresh = refreshProjectsFromStorage;
    window.addEventListener('storage', (e) => {
      if(e.key && e.key.indexOf('wdlk_') === 0) refreshProjectsFromStorage('storage');
    });
    window.addEventListener('wdlk:auto-sync', () => refreshProjectsFromStorage('auto_sync'));
    window.addEventListener('wdlk:admin-db-synced', () => refreshProjectsFromStorage('db_sync'));
    setInterval(() => refreshProjectsFromStorage('interval'), 3000);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
