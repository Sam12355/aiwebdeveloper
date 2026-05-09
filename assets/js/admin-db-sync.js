/*
  admin-db-sync.js
  Pulls live data from the MySQL database into the admin dashboard localStorage keys.
  Works silently — if the backend is unavailable, localStorage still drives the UI.
*/
(function () {
  localStorage.setItem('wdlk_admin_logged_in', 'yes');

  const ADMIN_USER = 'YaK077wd';
  const ADMIN_PASS = '@YKwdLK##%$$';
  const DATA_URL   = 'backend/api/admin-dashboard-data.php';
  const LOGIN_URL  = 'backend/api/admin/login.php';

  function safeJson(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
    catch(e) { return fallback; }
  }

  // Map a DB project row (snake_case) to the JS format admin.js expects
  function mapProject(p) {
    return {
      id:                 p.invoice_no || String(p.id),
      dbId:               p.id,
      projectId:          p.id,
      projectKey:         p.project_key        || '',
      invoiceNo:          p.invoice_no         || '',
      businessName:       p.business_name      || '',
      customerName:       p.customer_name      || '',
      contactNumber:      p.contact_number     || '',
      email:              p.email              || '',
      businessType:       p.business_type      || '',
      mainServices:       p.main_services      || '',
      pageCount:          p.page_count         || '',
      businessModel:      p.business_model     || '',
      websitePath:        p.website_path       || '',
      theme:              p.theme_name         || '',
      themeCategory:      p.theme_category     || '',
      packageName:        p.package_name       || '',
      packageLabel:       p.package_label      || '',
      pricingTypeLabel:   p.pricing_type_label || '',
      totalPrice:         parseFloat(p.total_price    || 0),
      advancePayment:     parseFloat(p.advance_payment || 0),
      balancePayment:     parseFloat(p.balance_payment || 0),
      paymentStatus:      p.payment_status       || '',
      finalPaymentStatus: p.final_payment_status || '',
      status:             p.status             || '',
      stage:              p.stage              || '',
      progressPercent:    parseInt(p.progress_percent || 0, 10),
      liveUrl:            p.live_url           || '',
      renewalDate:        p.renewal_date       || '',
      createdAt:          p.created_at         || '',
      updatedAt:          p.updated_at         || '',
    };
  }

  // Map a DB payment_receipts row to the format admin.js / bank-payment.js expects
  function mapReceipt(r) {
    return {
      id:            'DB-' + r.id,
      invoiceNumber: r.invoice_no    || '',
      businessName:  r.business_name || '',
      customerName:  r.customer_name || '',
      paymentType:   r.payment_type  || 'advance',
      method:        r.method        || 'Bank Transfer / Manual Deposit',
      bankName:      r.bank_name     || 'Commercial Bank',
      branch:        r.branch        || '',
      accountName:   r.account_name  || '',
      accountNumber: r.account_number|| '',
      amount:        parseFloat(r.amount || 0),
      fileName:      r.receipt_file  || '',
      fileUrl:       r.file_url      || '',
      fileDataUrl:   '',
      storedAs:      'db_record',
      status:        r.status        || 'pending_verification',
      submittedAt:   r.submitted_at  || '',
      verifiedAt:    r.verified_at   || '',
    };
  }

  function mapPayment(p) {
    return {
      id:            'PAY-' + p.id,
      backendPaymentId: p.id,
      projectId:     p.project_id,
      invoiceNumber: p.invoice_no    || '',
      businessName:  p.business_name || '',
      customerName:  p.customer_name || '',
      paymentType:   p.payment_type  || 'advance',
      method:        p.method        || 'Bank Transfer / Manual Deposit',
      amount:        parseFloat(p.amount || 0),
      fileName:      p.gateway_reference || '',
      fileUrl:       '',
      fileDataUrl:   '',
      storedAs:      'db_payment_record',
      status:        p.status        || 'pending_verification',
      submittedAt:   p.created_at    || '',
      verifiedAt:    p.paid_at       || '',
    };
  }

  // Map a DB admin_notifications row to the format admin.js expects
  function mapNotification(n) {
    return {
      id:         'DB-' + n.id,
      projectKey: n.project_key || '',
      invoiceNo:  n.invoice_no  || '',
      title:      n.title       || '',
      message:    n.message     || '',
      type:       n.type        || '',
      read:       !!n.is_read,
      createdAt:  n.created_at  || '',
    };
  }

  function mergeByKey(dbItems, localItems, keyFn) {
    const dbKeysSet = new Set(dbItems.map(keyFn).filter(Boolean));
    const localOnly = localItems.filter(x => !dbKeysSet.has(keyFn(x)));
    return [...dbItems, ...localOnly];
  }

  function applyToLocalStorage(data) {
    // Projects
    if (Array.isArray(data.projects) && data.projects.length > 0) {
      const dbProjects = data.projects.map(mapProject);
      const stored     = safeJson('wdlk_admin_projects', []);
      const merged     = mergeByKey(dbProjects, stored, p => p.projectKey);
      localStorage.setItem('wdlk_admin_projects', JSON.stringify(merged));
    }

    // Payment receipts (the admin bank-payments list)
    if ((Array.isArray(data.receipts) && data.receipts.length > 0) || (Array.isArray(data.payments) && data.payments.length > 0)) {
      const dbReceipts = data.receipts.map(mapReceipt);
      const dbPayments = data.payments.map(mapPayment);
      const stored     = safeJson('wdlk_admin_bank_payments', []);
      const merged     = mergeByKey([...dbReceipts, ...dbPayments], stored, r => r.id);
      localStorage.setItem('wdlk_admin_bank_payments', JSON.stringify(merged));
    }

    // Notifications
    if (Array.isArray(data.notifications) && data.notifications.length > 0) {
      const dbNotes = data.notifications.map(mapNotification);
      const stored  = safeJson('wdlk_admin_realtime_notifications', []);
      const merged  = mergeByKey(dbNotes, stored, n => n.id).slice(0, 100);
      localStorage.setItem('wdlk_admin_realtime_notifications', JSON.stringify(merged));
    }

    try {
      window.dispatchEvent(new CustomEvent('wdlk:admin-db-synced', { detail: data }));
      if (window.WebDevAdminRefresh) window.WebDevAdminRefresh('db_sync');
      renderPaymentsDirect(data);
    } catch(e) {}
  }

  function money(value) {
    return 'LKR ' + Number(value || 0).toLocaleString('en-US');
  }

  function esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
  }

  function normalizePaymentRows(data) {
    const receiptRows = Array.isArray(data.receipts) ? data.receipts.map(mapReceipt) : [];
    const paymentRows = Array.isArray(data.payments) ? data.payments.map(mapPayment) : [];
    return [...receiptRows, ...paymentRows];
  }

  function renderPaymentsDirect(data) {
    const target = document.getElementById('adminPaymentList');
    if (!target || !data) return;

    const rows = normalizePaymentRows(data);
    if (!rows.length) {
      target.innerHTML = '<div class="admin-payment-item"><strong>No payment records yet</strong><p style="color:#60708e">When a customer pays or uploads a receipt, it will appear here.</p></div>';
      return;
    }

    target.innerHTML = rows.map(p => {
      const statusText = String(p.status || '').toLowerCase();
      const isReceived = statusText === 'received' || statusText.includes('paid') || statusText.includes('verified');
      return `
        <div class="admin-payment-item">
          <div class="admin-payment-head">
            <div>
              <strong>${esc(p.businessName || 'Customer')} - ${p.paymentType === 'final' ? 'Final Payment' : 'Advance Payment'}</strong>
              <small>${esc(p.invoiceNumber || '')} &bull; ${esc(p.method || 'Bank Transfer / Manual Deposit')}</small>
            </div>
            <span class="status-badge ${isReceived ? 'green' : 'orange'}">${isReceived ? 'Payment Received' : esc(p.status || 'Pending Verification')}</span>
          </div>
          <div class="request-meta">
            <span>Amount: ${money(p.amount)}</span>
            <span>${p.submittedAt ? new Date(p.submittedAt).toLocaleString() : ''}</span>
          </div>
          <p style="color:#60708e">Receipt file: ${esc(p.fileName || p.fileUrl || 'No slip file recorded')}</p>
          <div class="row-actions" style="margin-top:14px">
            <button class="mini-btn green" data-db-verify-payment="${esc(p.id)}" data-backend-payment-id="${esc(p.backendPaymentId || '')}" data-project-id="${esc(p.projectId || '')}" data-payment-type="${esc(p.paymentType || 'advance')}" ${isReceived ? 'disabled' : ''}>${isReceived ? 'Received' : 'Mark Payment Received'}</button>
            <button class="mini-btn" data-select-project="${esc(p.invoiceNumber || '')}">Open Project</button>
          </div>
        </div>
      `;
    }).join('');
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-db-verify-payment]');
    if (!btn || btn.disabled) return;
    btn.disabled = true;
    fetch('backend/api/payment-verify.php', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        paymentId: btn.dataset.backendPaymentId || 0,
        projectId: btn.dataset.projectId || 0,
        paymentType: btn.dataset.paymentType || 'advance'
      })
    }).then(() => syncDashboard()).catch(() => {
      btn.disabled = false;
    });
  });

  async function ensureSession() {
    // Try a lightweight probe; if the backend returns 403 we need to login first
    try {
      const probe = await fetch(DATA_URL, { credentials: 'include' });
      if (probe.ok) {
        const d = await probe.json();
        if (d.success) return true;
      }
    } catch(e) { /* backend may not be running */ }

    // Establish PHP session via the admin login endpoint
    try {
      const r = await fetch(LOGIN_URL, {
        method:      'POST',
        headers:     { 'Content-Type': 'application/json' },
        credentials: 'include',
        body:        JSON.stringify({ username: ADMIN_USER, password: ADMIN_PASS }),
      });
      const d = await r.json();
      return !!d.success;
    } catch(e) { return false; }
  }

  async function syncDashboard() {
    const ok = await ensureSession();
    if (!ok) return;

    try {
      const r = await fetch(DATA_URL, { credentials: 'include' });
      if (!r.ok) return;
      const data = await r.json();
      if (!data.success) return;
      applyToLocalStorage(data);
      renderPaymentsDirect(data);
    } catch(e) {
      // Silently fail — localStorage continues to drive the UI
    }
  }

  // Initial sync + periodic refresh
  syncDashboard();
  setInterval(syncDashboard, 15000);

  window.WebDevAdminDbSync = { syncDashboard };
})();
