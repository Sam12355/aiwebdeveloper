
(function(){
  const $ = (s) => document.querySelector(s);

  function safeJson(key, fallback = {}){
    try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
    catch(e){ return fallback; }
  }

  function initials(name){
    const parts = (name || 'Customer').trim().split(/\s+/).slice(0,2);
    return parts.map(p => p[0] || '').join('').toUpperCase() || 'C';
  }

  function getCustomer(){
    let customer = safeJson('wdlk_customer', null);
    if(!customer){
      const step1 = safeJson('wdlk_step1', {});
      customer = {
        businessName: step1.businessName || localStorage.getItem('wdlk_business_type') || 'Your Business',
        yourName: step1.customerName || 'Customer',
        contactNumber: step1.contactNumber || '',
        email: step1.email || ''
      };
      localStorage.setItem('wdlk_customer', JSON.stringify(customer));
      localStorage.setItem('wdlk_logged_in', 'yes');
    }
    return customer;
  }

  const customer = getCustomer();
  const step1 = safeJson('wdlk_step1', {});
  const step2 = safeJson('wdlk_step2', {});
  const theme = safeJson('wdlk_theme', {});
  const payment = safeJson('wdlk_payment', {});
  const invoice = localStorage.getItem('wdlk_invoice_number') || payment.invoiceNumber || 'WD-PROJECT';

  function text(id, value){
    const el = document.getElementById(id);
    if(el) el.textContent = value;
  }

  function initUser(){
    text('dashName', customer.yourName || 'Customer');
    text('dashBusiness', customer.businessName || step1.businessName || 'Your Business');
    text('topName', customer.yourName || 'Customer');
    text('topInitials', initials(customer.yourName));
    text('projectName', (customer.businessName || step1.businessName || 'My Business') + ' Website');
    text('projectBusiness', customer.businessName || step1.businessName || 'Your Business');
    text('projectTheme', theme.themeName || theme.name || 'Modern Business Theme');
    text('projectPackage', step2.websitePath || 'Small Business Website');
    text('projectModel', step2.businessModel || 'Individual / Small Business');
    text('projectPages', step2.pageCount || '5 - 10 Pages');
    text('invoiceNo', invoice);
    text('profileBusiness', customer.businessName || '');
    text('profileName', customer.yourName || '');
    text('profilePhone', customer.contactNumber || '');
    text('profileEmail', customer.email || '');
  }

  function initCountdown(){
    if(window.WebDevProjectTimer){
      window.WebDevProjectTimer.startCountdown();
      return;
    }
    const start = new Date();
    const end = new Date(start.getTime() + 3 * 24 * 60 * 60 * 1000);
    function update(){
      let diff = Math.max(0, end - new Date());
      const days = Math.floor(diff / (24*60*60*1000)); diff -= days * 24*60*60*1000;
      const hours = Math.floor(diff / (60*60*1000)); diff -= hours * 60*60*1000;
      const minutes = Math.floor(diff / (60*1000));
      const seconds = Math.floor((diff - minutes * 60*1000) / 1000);
      text('countDays', String(days).padStart(2,'0'));
      text('countHours', String(hours).padStart(2,'0'));
      text('countMinutes', String(minutes).padStart(2,'0'));
      text('countSeconds', String(seconds).padStart(2,'0'));
    }
    update();
    setInterval(update, 1000);
  }


  function initHashTab(){
    const hash = (window.location.hash || '').replace('#','');
    if(!hash) return;
    const link = document.querySelector('[data-dash-tab="' + hash + '"]');
    if(link) link.click();
  }

  function initTabs(){
    document.querySelectorAll('[data-dash-tab]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = link.dataset.dashTab;
        document.querySelectorAll('[data-dash-tab]').forEach(l => l.classList.toggle('active', l.dataset.dashTab === tab));
        document.querySelectorAll('.dashboard-section').forEach(section => section.classList.toggle('active', section.id === tab));
      });
    });
  }

  function initUploads(){
    const uploadInput = document.getElementById('dashUpload');
    const uploadText = document.getElementById('uploadText');
    if(!uploadInput) return;
    uploadInput.addEventListener('change', () => {
      const files = [...uploadInput.files].map(f => f.name);
      if(files.length){
        uploadText.textContent = files.length + ' file(s) selected';
        localStorage.setItem('wdlk_dashboard_uploads', JSON.stringify(files));
      }
    });
  }

  function initProfile(){
    const form = document.getElementById('profileForm');
    if(!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const updated = {
        businessName: document.getElementById('profileBusinessInput').value.trim(),
        yourName: document.getElementById('profileNameInput').value.trim(),
        contactNumber: document.getElementById('profilePhoneInput').value.trim(),
        email: document.getElementById('profileEmailInput').value.trim(),
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('wdlk_customer', JSON.stringify(updated));
      localStorage.setItem('wdlk_logged_in', 'yes');
      document.getElementById('profileSaved').textContent = 'Profile updated successfully.';
      setTimeout(() => location.reload(), 700);
    });
  }





  function formatNotifyTime(value){
    try { return new Date(value).toLocaleString(); } catch(e){ return ''; }
  }

  function notifyIcon(type){
    const map = { payment:'▤', stage:'↻', message:'✉', upload:'⇧', live:'🚀', request:'✎', email:'@' };
    return map[type] || '🔔';
  }

  function renderCustomerNotifications(){
    if(!window.WebDevRealtime) return;
    const list = window.WebDevRealtime.getNotifications('customer');
    const target = document.getElementById('customerNotificationList');
    const count = window.WebDevRealtime.unreadCount('customer');

    ['customerTopBadge','customerNavBadge'].forEach(id => {
      const badge = document.getElementById(id);
      if(badge){
        badge.textContent = String(count);
        badge.style.display = count ? 'inline-flex' : 'none';
      }
    });

    if(!target) return;
    target.innerHTML = list.length ? list.map(n => `
      <div class="notification-item ${n.read ? '' : 'unread'}" data-customer-notification="${n.id}">
        <span class="notification-icon">${notifyIcon(n.type)}</span>
        <div>
          <h4>${n.title}</h4>
          <p>${n.message}</p>
        </div>
        <span class="notification-time">${formatNotifyTime(n.createdAt)}</span>
      </div>
    `).join('') : `<div class="notification-item"><span class="notification-icon">🔔</span><div><h4>No notifications yet</h4><p>Admin updates will appear here instantly.</p></div></div>`;
  }

  function initCustomerRealtimeNotifications(){
    if(!window.WebDevRealtime) return;

    renderCustomerNotifications();

    window.WebDevRealtime.subscribe((notification) => {
      if(notification && notification.audience === 'customer'){
        renderCustomerNotifications();
        window.WebDevRealtime.showToast(notification.title, notification.message);
      }
      if(notification && notification.audience === 'admin'){
        // ignore admin-side notifications in customer dashboard
      }
    });

    setInterval(renderCustomerNotifications, 2000);

    document.addEventListener('click', (e) => {
      const item = e.target.closest('[data-customer-notification]');
      if(item && window.WebDevRealtime){
        window.WebDevRealtime.markRead('customer', item.dataset.customerNotification);
        renderCustomerNotifications();
      }
    });

    const markAll = document.getElementById('customerMarkAllRead');
    if(markAll){
      markAll.addEventListener('click', () => {
        window.WebDevRealtime.markAllRead('customer');
        renderCustomerNotifications();
      });
    }
  }

  function initReceiptPopup(){
    const popup = document.getElementById('paymentReceiptPopup');
    if(!popup) return;

    const receipt = safeJson('wdlk_bank_receipt', {});
    const shouldShow = localStorage.getItem('wdlk_payment_status_popup') === 'show_receipt_pending' || (receipt.status === 'pending_verification');
    if(shouldShow){
      popup.classList.add('show');
      localStorage.removeItem('wdlk_payment_status_popup');
    }

    const close = document.getElementById('closeReceiptPopup');
    if(close) close.addEventListener('click', () => popup.classList.remove('show'));

    const fileInput = document.getElementById('dashboardReceiptFile');
    const fileName = document.getElementById('dashboardReceiptName');
    const preview = document.getElementById('dashboardReceiptPreview');
    const submit = document.getElementById('submitDashboardReceipt');
    const saved = document.getElementById('dashboardReceiptSaved');

    if(fileInput){
      fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if(!file) return;
        if(fileName) fileName.textContent = file.name;
        if(preview && file.type.startsWith('image/')){
          const reader = new FileReader();
          reader.onload = () => {
            preview.style.display = 'block';
            preview.innerHTML = `<img src="${reader.result}" alt="Payment receipt preview">`;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if(submit){
      submit.addEventListener('click', async () => {
        const file = fileInput && fileInput.files[0];
        if(!file){
          if(saved) saved.textContent = 'Please select receipt image first.';
          return;
        }
        submit.disabled = true;
        submit.textContent = 'Sending...';
        if(window.WebDevBankPayment){
          await window.WebDevBankPayment.saveReceipt(file, {paymentType:'advance', amount: 20000});
        }
        if(saved) saved.textContent = 'Receipt sent to admin dashboard.';
        if(window.WebDevRealtime){
          window.WebDevRealtime.addAdmin({
            type:'payment',
            title:'Receipt uploaded from customer dashboard',
            message:(customer.businessName || 'Customer') + ' uploaded or replaced a payment receipt.',
            actionUrl:'admin-dashboard.php#payments'
          });
        }
        submit.textContent = 'Sent';
        setTimeout(() => popup.classList.remove('show'), 900);
      });
    }
  }

  function initFinalPaymentStatus(){
    const finalPayment = safeJson('wdlk_final_payment', {});
    const launch = safeJson('wdlk_launch', {});
    if(finalPayment.status === 'balance_paid') {
      document.querySelectorAll('.pending').forEach(el => {
        if((el.textContent || '').toLowerCase().includes('due')){
          el.textContent = 'Paid';
          el.classList.remove('pending');
          el.classList.add('paid');
        }
      });
    }
  }

  function initProgressMirror(){
    const stageTitle = localStorage.getItem('wdlk_dashboard_stage_title') || 'Day 1 - Planning & First Design';
    const percent = Number(localStorage.getItem('wdlk_dashboard_stage_percent') || '28');
    const index = Number(localStorage.getItem('wdlk_dashboard_stage_index') || '0');
    const demoReview = safeJson('wdlk_demo_review', {});
    const finalReview = safeJson('wdlk_final_review', {});
    const finalPayment = safeJson('wdlk_final_payment', {});
    const launch = safeJson('wdlk_launch', {});
    const stageMap = ['Planning','Design','Demo','Development','Final'];
    const activeTitle = stageMap[Math.min(index + 1, stageMap.length - 1)] || 'Design & Planning';

    const stageText = document.getElementById('dashStageText');
    if(stageText) stageText.textContent = 'Current Stage: ' + stageTitle;

    const no = document.getElementById('dashActiveStageNo');
    if(no) no.textContent = String(Math.min(index + 2, 5));

    const title = document.getElementById('dashActiveStageTitle');
    if(title) title.textContent = activeTitle;

    const headline = document.getElementById('dashStatusHeadline');
    if(headline) headline.textContent = stageTitle;

    const desc = document.getElementById('dashStatusDescription');
    if(desc) desc.textContent = launch.status === 'live' ? 'Congratulations. Your website is live now.' : (finalPayment.status === 'balance_paid' ? 'Final payment completed. Your website is ready for launch preparation.' : (finalReview.status === 'accepted' ? 'Final website accepted. Balance payment is pending before launch.' : (demoReview.status === 'approved' ? 'Demo approved. Website development is now in progress.' : (demoReview.status === 'changes_requested' ? 'Demo changes requested. We will update the demo and continue.' : 'Current progress: ' + percent + '%. Open the progress page to see detailed updates.'))));
  }


  function getProfileLaunch(){
    if(window.WebDevProfileData){
      return window.WebDevProfileData.getProfileItem('wdlk_launch', {});
    }
    return safeJson('wdlk_launch', {});
  }

  function profileSet(name, value){
    if(window.WebDevProfileData) window.WebDevProfileData.setProfileItem(name, value);
    else localStorage.setItem(name, JSON.stringify(value));
  }

  function profileGet(name){
    if(window.WebDevProfileData) return window.WebDevProfileData.getProfileItem(name, {});
    return safeJson(name, {});
  }

  function simpleSlug(name){
    return (name || 'mybusiness').toLowerCase().replace(/[^a-z0-9]+/g,'').slice(0,24) || 'mybusiness';
  }

  function initDashboardLinks(){
    const live = document.getElementById('livePreviewLink');
    const launch = getProfileLaunch();
    const businessName = customer.businessName || step1.businessName || 'mybusiness';
    const business = simpleSlug(businessName);
    const url = launch.liveUrl || ('https://' + business + '.lk');
    if(live){
      live.href = launch.status === 'live' ? url : 'project-progress.php';
      live.textContent = launch.status === 'live' ? 'Open Live Website ↗' : 'View Project Progress →';
      if(launch.status === 'live'){
        live.target = '_blank';
        live.rel = 'noopener';
      }
    }
    text('liveUrl', url);
  }

  function initLivePanel(){
    const launch = getProfileLaunch();
    const panel = document.getElementById('liveDashboardPanel');
    if(!panel) return;

    const businessName = customer.businessName || step1.businessName || 'Your Business';
    const liveUrl = launch.liveUrl || ('https://' + simpleSlug(businessName) + '.lk');
    let renewal = 'Next Year';
    if(launch.renewalDate){
      renewal = new Date(launch.renewalDate).toLocaleDateString(undefined, {year:'numeric', month:'long', day:'numeric'});
    }

    text('livePanelBusiness', businessName);
    text('livePanelUrl', liveUrl);
    text('livePanelRenewal', renewal);

    const open = document.getElementById('livePanelOpen');
    if(open) open.href = liveUrl;

    const domainOnly = liveUrl.replace(/^https?:\/\//,'').replace(/\/$/,'');
    text('emailSetupDomain', domainOnly);
    text('suggestedEmail', 'info@' + domainOnly);
    text('changeRequestWebsite', liveUrl);

    if(launch.status === 'live'){
      panel.classList.remove('is-hidden');
    }
  }

  function initEmailSetup(){
    const form = document.getElementById('emailSetupForm');
    if(!form) return;

    const saved = profileGet('wdlk_email_setup');
    if(saved.preferredEmail) document.getElementById('preferredEmail').value = saved.preferredEmail;
    if(saved.alternativeEmail) document.getElementById('alternativeEmail').value = saved.alternativeEmail;
    if(saved.forwardEmail) document.getElementById('forwardEmail').value = saved.forwardEmail;
    if(saved.emailNotes) document.getElementById('emailNotes').value = saved.emailNotes;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const request = {
        preferredEmail: document.getElementById('preferredEmail').value.trim(),
        alternativeEmail: document.getElementById('alternativeEmail').value.trim(),
        forwardEmail: document.getElementById('forwardEmail').value.trim(),
        emailNotes: document.getElementById('emailNotes').value.trim(),
        status: 'submitted',
        submittedAt: new Date().toISOString()
      };
      profileSet('wdlk_email_setup', request);
      document.getElementById('emailSetupSaved').textContent = 'Email setup request submitted successfully.';
      if(window.WebDevRealtime){
        window.WebDevRealtime.addAdmin({
          type:'email',
          title:'Email setup request submitted by customer',
          message:(customer.businessName || 'Customer') + ' requested email setup: ' + request.preferredEmail,
          actionUrl:'admin-dashboard.php#requests'
        });
      }
    });
  }

  function initChangeRequest(){
    const form = document.getElementById('changeRequestForm');
    if(!form) return;

    const saved = profileGet('wdlk_change_request');
    const summary = document.getElementById('changeRequestSummary');

    function renderSummary(data){
      if(!summary || !data || !data.status) return;
      summary.innerHTML = `
        <div class="summary-row"><span>Status</span><strong>${data.status}</strong></div>
        <div class="summary-row"><span>Change Type</span><strong>${data.changeType || '-'}</strong></div>
        <div class="summary-row"><span>Section</span><strong>${data.changeSection || '-'}</strong></div>
        <div class="summary-row"><span>Submitted</span><strong>${data.submittedAt ? new Date(data.submittedAt).toLocaleString() : '-'}</strong></div>
      `;
    }

    renderSummary(saved);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const request = {
        changeType: document.getElementById('changeType').value,
        changeSection: document.getElementById('changeSection').value.trim(),
        changeDetails: document.getElementById('changeDetails').value.trim(),
        status: 'Submitted',
        submittedAt: new Date().toISOString()
      };
      profileSet('wdlk_change_request', request);
      document.getElementById('changeRequestSaved').textContent = 'Change request submitted successfully.';
      if(window.WebDevRealtime){
        window.WebDevRealtime.addAdmin({
          type:'request',
          title:'New website change request',
          message:(customer.businessName || 'Customer') + ' requested: ' + request.changeType + ' - ' + request.changeSection,
          actionUrl:'admin-dashboard.php#requests'
        });
      }
      renderSummary(request);
      form.reset();
    });
  }

  initUser();
  initCountdown();
  initTabs();
  initHashTab();
  initUploads();
  initProfile();
  initDashboardLinks();
  initLivePanel();
  initEmailSetup();
  initChangeRequest();
  initProgressMirror();
  initFinalPaymentStatus();
  initReceiptPopup();
  initCustomerRealtimeNotifications();
})();
