
(function(){
  const API_URL = (window.location.pathname.includes('/sn/')) ? '../backend/api/record-project.php' : 'backend/api/record-project.php';

  function safeJson(key, fallback = {}){
    try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
    catch(e){ return fallback; }
  }

  function saveJson(key, value){
    try { localStorage.setItem(key, JSON.stringify(value)); } catch(e) {}
  }

  function firstValue(){
    for(const v of arguments){
      if(v !== undefined && v !== null && String(v).trim() !== '') return String(v).trim();
    }
    return '';
  }

  function projectKey(){
    let key = localStorage.getItem('wdlk_project_key');
    if(!key){
      key = 'WDLK-' + Date.now() + '-' + Math.random().toString(36).slice(2,8).toUpperCase();
      localStorage.setItem('wdlk_project_key', key);
    }
    return key;
  }

  function getAllData(reason){
    const customer = safeJson('wdlk_customer', {});
    const step1 = Object.assign({}, safeJson('wdlk_step1_business', {}), safeJson('wdlk_step1', {}));
    const step2 = Object.assign({}, safeJson('wdlk_step2_details', {}), safeJson('wdlk_step2', {}));
    const pricing = safeJson('wdlk_pricing', safeJson('wdlk_pricing_preview', {}));
    const theme = safeJson('wdlk_theme', {});
    const payment = safeJson('wdlk_payment', {});
    const finalPayment = safeJson('wdlk_final_payment', {});
    const launch = safeJson('wdlk_launch', {});
    const invoice = localStorage.getItem('wdlk_invoice_number') || payment.invoiceNumber || 'WD-' + new Date().toISOString().slice(2,10).replace(/-/g,'') + '-' + projectKey().slice(-4);

    const businessName = firstValue(step2.businessName, customer.businessName, step1.businessName, localStorage.getItem('wdlk_business_name'), localStorage.getItem('wdlk_business_type'), 'New Business');
    const customerName = firstValue(step1.yourName, step1.customerName, customer.yourName !== 'Customer' ? customer.yourName : '', 'Customer');
    const contactNumber = firstValue(customer.contactNumber, step1.contactNumber, '');
    const email = firstValue(customer.email, step1.email, '');
    const totalPrice = Number(pricing.totalPrice || step2.totalPrice || localStorage.getItem('wdlk_total_price') || payment.total || 0);
    const advancePayment = Number(pricing.advancePayment || step2.advancePayment || localStorage.getItem('wdlk_advance_payment') || payment.advance || 0);
    const balancePayment = Number(pricing.balancePayment || step2.balancePayment || localStorage.getItem('wdlk_balance_payment') || payment.balance || 0);
    const stage = localStorage.getItem('wdlk_project_stage') || launch.stage || payment.stage || 'lead';

    return {
      projectKey: projectKey(),
      invoiceNo: invoice,
      reason: reason || 'auto_capture',
      capturedAt: new Date().toISOString(),
      language: document.documentElement.lang || 'en',
      businessType: firstValue(step1.businessType, step2.businessType, localStorage.getItem('wdlk_business_type'), ''),
      businessName,
      customerName,
      contactNumber,
      email,
      businessDescription: firstValue(step1.businessDescription, step1.description, ''),
      mainServices: firstValue(step2.mainServices, step2.services, ''),
      pageCount: firstValue(step2.pages, step2.pageCount, localStorage.getItem('wdlk_pages'), ''),
      businessModel: firstValue(step2.businessModel, ''),
      websitePath: firstValue(step2.websitePath, localStorage.getItem('wdlk_website_path'), ''),
      feature: firstValue(step2.feature, 'Mobile Friendly Website'),
      additionalInfo: firstValue(step2.additionalInfo, ''),
      selectedTheme: firstValue(theme.themeName, theme.name, theme.theme, ''),
      themeCategory: firstValue(theme.category, theme.themeCategory, ''),
      themeImage: firstValue(theme.image, theme.themeImage, ''),
      pricingType: firstValue(pricing.pricingType, step2.pricingType, ''),
      pricingTypeLabel: firstValue(pricing.pricingTypeLabel, step2.pricingTypeLabel, ''),
      packageName: firstValue(pricing.packageName, step2.packageName, ''),
      packageLabel: firstValue(pricing.packageLabel, step2.packageLabel, ''),
      packagePages: firstValue(pricing.packagePages, step2.packagePages, ''),
      totalPrice,
      advancePayment,
      balancePayment,
      paymentStatus: firstValue(payment.status, 'lead'),
      paymentMethod: firstValue(payment.method, ''),
      paymentType: firstValue(payment.paymentType, ''),
      finalPaymentStatus: firstValue(finalPayment.status, ''),
      finalPaymentMethod: firstValue(finalPayment.method, ''),
      stage,
      status: launch.status === 'live' ? 'Live' : (payment.status ? 'Payment ' + payment.status : 'Lead'),
      progressPercent: Number(localStorage.getItem('wdlk_dashboard_stage_percent') || 0),
      liveUrl: firstValue(launch.liveUrl, ''),
      renewalDate: firstValue(launch.renewalDate, ''),
      raw: {
        customer, step1, step2, pricing, theme, payment, finalPayment, launch,
        receipts: [
          ...([safeJson('wdlk_bank_receipt', null)].filter(Boolean)),
          ...([safeJson('wdlk_final_bank_receipt', null)].filter(Boolean)),
          ...(Array.isArray(safeJson('wdlk_bank_receipts', [])) ? safeJson('wdlk_bank_receipts', []) : []),
          ...(Array.isArray(safeJson('wdlk_admin_bank_payments', [])) ? safeJson('wdlk_admin_bank_payments', []) : [])
        ],
        files: safeJson('wdlk_customer_uploads', []),
        notifications: safeJson('wdlk_customer_notifications', [])
      }
    };
  }

  function upsertProject(record){
    const projects = safeJson('wdlk_admin_projects', []);
    const idx = projects.findIndex(p => p.projectKey === record.projectKey || p.id === record.invoiceNo || p.invoiceNo === record.invoiceNo);
    const adminRecord = {
      id: record.invoiceNo,
      projectKey: record.projectKey,
      invoiceNo: record.invoiceNo,
      businessName: record.businessName,
      customerName: record.customerName,
      contactNumber: record.contactNumber,
      email: record.email,
      businessType: record.businessType,
      mainServices: record.mainServices,
      pageCount: record.pageCount,
      businessModel: record.businessModel,
      websitePath: record.websitePath,
      theme: record.selectedTheme,
      themeCategory: record.themeCategory,
      packageName: record.packageName,
      packageLabel: record.packageLabel,
      pricingTypeLabel: record.pricingTypeLabel,
      totalPrice: record.totalPrice,
      advancePayment: record.advancePayment,
      balancePayment: record.balancePayment,
      paymentStatus: record.paymentStatus,
      finalPaymentStatus: record.finalPaymentStatus,
      status: record.status,
      stage: record.stage,
      progressPercent: record.progressPercent,
      liveUrl: record.liveUrl,
      renewalDate: record.renewalDate,
      raw: record.raw,
      updatedAt: record.capturedAt,
      createdAt: (idx >= 0 && projects[idx].createdAt) ? projects[idx].createdAt : record.capturedAt
    };
    if(idx >= 0) projects[idx] = Object.assign({}, projects[idx], adminRecord);
    else projects.unshift(adminRecord);
    saveJson('wdlk_admin_projects', projects);

    const leads = safeJson('wdlk_admin_leads', []);
    if(!leads.some(l => l.projectKey === record.projectKey)){
      leads.unshift(adminRecord);
      saveJson('wdlk_admin_leads', leads);
    }
    return adminRecord;
  }

  function updatePayments(record){
    const payments = safeJson('wdlk_admin_payment_records', []);
    const receipts = Array.isArray(record.raw.receipts) ? record.raw.receipts : [];

    if(record.advancePayment || record.paymentStatus){
      const key = record.projectKey + '-advance';
      const idx = payments.findIndex(p => p.paymentKey === key);
      const p = {
        paymentKey: key,
        projectKey: record.projectKey,
        invoiceNo: record.invoiceNo,
        businessName: record.businessName,
        customerName: record.customerName,
        paymentType: 'advance',
        amount: record.advancePayment,
        method: record.paymentMethod || 'Bank / Card',
        status: record.paymentStatus || 'pending',
        receiptFile: receipts.find(r => r.paymentType === 'advance')?.fileName || receipts[0]?.fileName || '',
        updatedAt: record.capturedAt
      };
      if(idx >= 0) payments[idx] = Object.assign({}, payments[idx], p);
      else payments.unshift(p);
    }

    if(record.finalPaymentStatus){
      const key = record.projectKey + '-final';
      const idx = payments.findIndex(p => p.paymentKey === key);
      const p = {
        paymentKey: key,
        projectKey: record.projectKey,
        invoiceNo: record.invoiceNo,
        businessName: record.businessName,
        customerName: record.customerName,
        paymentType: 'final',
        amount: record.balancePayment,
        method: record.finalPaymentMethod || 'Bank / Card',
        status: record.finalPaymentStatus,
        receiptFile: receipts.find(r => r.paymentType === 'final')?.fileName || '',
        updatedAt: record.capturedAt
      };
      if(idx >= 0) payments[idx] = Object.assign({}, payments[idx], p);
      else payments.unshift(p);
    }

    saveJson('wdlk_admin_payment_records', payments);
  }

  function notifyAdmin(record){
    const notes = safeJson('wdlk_admin_realtime_notifications', []);
    const title = record.reason === 'payment_receipt' ? 'New payment receipt submitted' : 'Customer data updated';
    notes.unshift({
      id: 'N' + Date.now(),
      projectKey: record.projectKey,
      invoiceNo: record.invoiceNo,
      title,
      message: record.businessName + ' | ' + record.reason,
      type: record.reason,
      read: false,
      createdAt: record.capturedAt
    });
    saveJson('wdlk_admin_realtime_notifications', notes.slice(0, 100));
  }

  function syncBackend(record){
    if(location.protocol === 'file:') return;
    try{
      fetch(API_URL, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        credentials:'include',
        body:JSON.stringify(record)
      }).then(r => r.ok ? r.json() : null).then(data => {
        if(data && data.success){
          localStorage.setItem('wdlk_backend_project_id', data.projectId || '');
          localStorage.setItem('wdlk_invoice_number', data.invoiceNo || record.invoiceNo);
        }
      }).catch(() => {});
    }catch(e){}
  }

  let lastHash = '';
  let timer = null;

  function capture(reason){
    const record = getAllData(reason);
    const hash = JSON.stringify({
      businessName:record.businessName, contactNumber:record.contactNumber, email:record.email,
      step:record.stage, theme:record.selectedTheme, total:record.totalPrice,
      payment:record.paymentStatus, final:record.finalPaymentStatus, reason
    });

    upsertProject(record);
    updatePayments(record);

    if(hash !== lastHash || /payment|receipt|submit|click|stage|launch/.test(String(reason || ''))){
      notifyAdmin(record);
      syncBackend(record);
      lastHash = hash;
    }
  }

  function captureSoon(reason){
    clearTimeout(timer);
    timer = setTimeout(() => capture(reason), 250);
  }

  window.WebDevDataRecorder = {
    capture,
    getAllData,
    syncBackend,
    upsertProject
  };

  document.addEventListener('DOMContentLoaded', () => captureSoon('page_load_' + (location.pathname.split('/').pop() || 'index')));
  document.addEventListener('change', () => captureSoon('field_change'), true);
  document.addEventListener('input', () => captureSoon('field_input'), true);
  document.addEventListener('submit', () => captureSoon('form_submit'), true);
  window.addEventListener('beforeunload', () => capture('before_unload'));
  window.addEventListener('storage', e => { if(e.key && e.key.indexOf('wdlk_') === 0) captureSoon('storage_update'); });

  setInterval(() => captureSoon('auto_interval'), 12000);
})();
