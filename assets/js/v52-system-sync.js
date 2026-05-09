
(function(){
  const CHANNEL = 'wdlk_v52_realtime';
  const isSn = location.pathname.includes('/sn/');
  const isAdmin = /admin-dashboard\.php|\/my-admin/.test(location.pathname);
  const isInvoice = /invoice\.php/.test(location.pathname);
  const isCustomerDash = /customer-dashboard\.php/.test(location.pathname);

  function safeJson(key, fallback){
    try{return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));}
    catch(e){return fallback;}
  }
  function saveJson(key, value){localStorage.setItem(key, JSON.stringify(value));}
  function firstValue(){
    for(const v of arguments){
      if(v !== undefined && v !== null && String(v).trim() !== '') return String(v).trim();
    }
    return '';
  }
  function cleanPhone(phone){return String(phone || '').replace(/[^\d+]/g,'');}
  function slug(s){return String(s || 'client').toLowerCase().replace(/[^a-z0-9]+/g,'').slice(0,18) || 'client';}
  function makePassword(){
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789@#$';
    let p = 'WD';
    for(let i=0;i<8;i++) p += chars[Math.floor(Math.random()*chars.length)];
    return p;
  }
  function projectKey(){
    let key = localStorage.getItem('wdlk_project_key');
    if(!key){
      key = 'WDLK-' + Date.now() + '-' + Math.random().toString(36).slice(2,8).toUpperCase();
      localStorage.setItem('wdlk_project_key', key);
    }
    return key;
  }
  function invoiceNo(){
    let inv = localStorage.getItem('wdlk_invoice_number');
    if(!inv){
      inv = 'WD-' + new Date().toISOString().slice(2,10).replace(/-/g,'') + '-' + projectKey().slice(-4);
      localStorage.setItem('wdlk_invoice_number', inv);
    }
    return inv;
  }
  function ensureAccount(base, mode){
    let account = safeJson('wdlk_customer_account', null);
    const username = account && account.username ? account.username : slug(base.customerName || base.businessName) + (cleanPhone(base.contactNumber).slice(-4) || Math.floor(1000 + Math.random()*9000));
    const password = account && account.password ? account.password : (localStorage.getItem('wdlk_customer_password') || makePassword());
    account = Object.assign({}, account || {}, {
      projectKey: projectKey(),
      invoiceNo: invoiceNo(),
      username,
      password,
      businessName: base.businessName,
      customerName: base.customerName,
      contactNumber: base.contactNumber,
      email: base.email,
      loginIds: [username, base.contactNumber, base.email, base.businessName].filter(Boolean),
      status: 'active',
      createdAt: (account && account.createdAt) || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    saveJson('wdlk_customer_account', account);
    localStorage.setItem('wdlk_customer_username', username);
    localStorage.setItem('wdlk_customer_password', password);
    localStorage.setItem('wdlk_logged_in', 'yes');

    const customer = Object.assign({}, safeJson('wdlk_customer', {}), {
      businessName: base.businessName,
      yourName: base.customerName,
      contactNumber: base.contactNumber,
      email: base.email,
      username,
      password,
      accountStatus: 'active'
    });
    saveJson('wdlk_customer', customer);

    let accounts = safeJson('wdlk_admin_customer_accounts', []);
    if(!Array.isArray(accounts)) accounts = [];
    const idx = accounts.findIndex(a => a.projectKey === account.projectKey || a.invoiceNo === account.invoiceNo || a.contactNumber === account.contactNumber || a.username === account.username);
    if(idx >= 0) accounts[idx] = Object.assign({}, accounts[idx], account);
    else accounts.unshift(account);
    saveJson('wdlk_admin_customer_accounts', accounts);

    let alerts = safeJson('wdlk_customer_account_alerts', []);
    if(!Array.isArray(alerts)) alerts = [];
    if(!alerts.some(a => a.projectKey === account.projectKey)){
      alerts.unshift({
        id:'ALERT-' + Date.now(),
        projectKey: account.projectKey,
        invoiceNo: account.invoiceNo,
        email: account.email,
        phone: account.contactNumber,
        emailMessage:`Your Webdeveloper.lk login is ready. Username: ${username}. Contact Login: ${account.contactNumber}. Password: ${password}`,
        smsMessage:`Webdeveloper.lk login: ${username} / ${account.contactNumber}. Password: ${password}`,
        status:'prepared_for_email_sms',
        mode: mode || 'auto',
        createdAt:new Date().toISOString()
      });
      saveJson('wdlk_customer_account_alerts', alerts.slice(0,100));
    }
    return account;
  }
  function collect(reason){
    const customer = safeJson('wdlk_customer', {});
    const s1 = Object.assign({}, safeJson('wdlk_step1_business', {}), safeJson('wdlk_step1', {}));
    const s2 = Object.assign({}, safeJson('wdlk_step2_details', {}), safeJson('wdlk_step2', {}));
    const theme = safeJson('wdlk_theme', safeJson('wdlk_step3_theme', {}));
    const pricing = safeJson('wdlk_pricing', safeJson('wdlk_pricing_preview', {}));
    const payment = safeJson('wdlk_payment', {});
    const finalPayment = safeJson('wdlk_final_payment', {});
    const launch = safeJson('wdlk_launch', {});
    const businessName = firstValue(s2.businessName, customer.businessName, s1.businessName, localStorage.getItem('wdlk_business_name'), localStorage.getItem('wdlk_business_type'), 'New Business');
    const customerName = firstValue(s1.yourName, s1.customerName, customer.yourName !== 'Customer' ? customer.yourName : '', 'Customer');
    const contactNumber = firstValue(customer.contactNumber, s1.contactNumber, '');
    const email = firstValue(customer.email, s1.email, s1.customerEmail, '');
    const base = {businessName, customerName, contactNumber, email};
    const account = (reason && /theme|invoice|signup|login|account|submit/.test(reason)) ? ensureAccount(base, reason) : safeJson('wdlk_customer_account', {});
    const total = Number(pricing.totalPrice || s2.totalPrice || payment.total || localStorage.getItem('wdlk_total_price') || 0);
    const advance = Number(pricing.advancePayment || s2.advancePayment || payment.advance || localStorage.getItem('wdlk_advance_payment') || (total ? total/2 : 0));
    const balance = Number(pricing.balancePayment || s2.balancePayment || payment.balance || localStorage.getItem('wdlk_balance_payment') || (total ? total/2 : 0));
    const stage = isInvoice ? 'pending_lead' : (localStorage.getItem('wdlk_project_stage') || payment.stage || launch.stage || 'lead');
    const status = isInvoice ? 'Pending Lead' : (launch.status === 'live' ? 'Live' : (payment.status ? payment.status : 'Lead'));
    return {
      id: invoiceNo(),
      invoiceNo: invoiceNo(),
      projectKey: projectKey(),
      reason: reason || 'sync',
      businessName,
      customerName,
      contactNumber,
      email,
      username: account.username || '',
      accountPassword: account.password || '',
      accountStatus: account.status || '',
      businessType: firstValue(s1.businessType, s2.businessType, localStorage.getItem('wdlk_business_type'), ''),
      businessDescription: firstValue(s1.businessDescription, s1.description, ''),
      mainServices: firstValue(s2.mainServices, s2.services, ''),
      pageCount: firstValue(s2.pages, s2.pageCount, localStorage.getItem('wdlk_pages'), ''),
      businessModel: firstValue(s2.businessModel, ''),
      websitePath: firstValue(s2.websitePath, localStorage.getItem('wdlk_website_path'), ''),
      selectedTheme: firstValue(theme.themeName, theme.theme, theme.name, ''),
      themeCategory: firstValue(theme.category, ''),
      themeImage: firstValue(theme.image, ''),
      pricingType: firstValue(pricing.pricingType, s2.pricingType, ''),
      pricingTypeLabel: firstValue(pricing.pricingTypeLabel, s2.pricingTypeLabel, ''),
      packageName: firstValue(pricing.packageName, s2.packageName, ''),
      packageLabel: firstValue(pricing.packageLabel, s2.packageLabel, ''),
      packagePages: firstValue(pricing.packagePages, s2.packagePages, ''),
      totalPrice: total,
      advancePayment: advance,
      balancePayment: balance,
      paymentStatus: firstValue(payment.status, status),
      finalPaymentStatus: firstValue(finalPayment.status, ''),
      stage,
      status,
      pendingLead: isInvoice || stage === 'pending_lead' || status === 'Pending Lead',
      liveUrl: firstValue(launch.liveUrl, ''),
      renewalDate: firstValue(launch.renewalDate, ''),
      updatedAt: new Date().toISOString(),
      raw:{customer,s1,s2,theme,pricing,payment,finalPayment,launch,account}
    };
  }
  function upsert(list, rec){
    const idx = list.findIndex(p => (p.projectKey && p.projectKey === rec.projectKey) || (p.invoiceNo && p.invoiceNo === rec.invoiceNo) || (p.id && p.id === rec.id));
    if(idx >= 0) list[idx] = Object.assign({}, list[idx], rec);
    else list.unshift(rec);
    return list;
  }
  function notify(title, message, type, project){
    let notes = safeJson('wdlk_realtime_notifications', []);
    if(!Array.isArray(notes)) notes = [];
    notes.unshift({
      id:'N-' + Date.now() + '-' + Math.random().toString(36).slice(2,5),
      title, message, type:type || 'system',
      projectKey: project.projectKey,
      invoiceNo: project.invoiceNo,
      businessName: project.businessName,
      read:false,
      createdAt:new Date().toISOString()
    });
    saveJson('wdlk_realtime_notifications', notes.slice(0,200));
    saveJson('wdlk_admin_realtime_notifications', notes.slice(0,200));
  }
  function backendApi(){
    return isSn ? '../backend/api/v52-sync.php' : 'backend/api/v52-sync.php';
  }
  function syncBackend(project){
    if(location.protocol === 'file:') return Promise.resolve(null);
    return fetch(backendApi(), {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      credentials:'include',
      body:JSON.stringify(project)
    }).then(r => r.ok ? r.json() : Promise.reject(r));
  }
  function saveProject(reason){
    const p = collect(reason);
    let projects = safeJson('wdlk_admin_projects', []);
    if(!Array.isArray(projects)) projects = [];
    projects = upsert(projects, p);
    saveJson('wdlk_admin_projects', projects);
    saveJson('wdlk_current_project_snapshot', p);

    let leads = safeJson('wdlk_pending_leads', []);
    if(!Array.isArray(leads)) leads = [];
    if(p.pendingLead) {
      leads = upsert(leads, p);
      saveJson('wdlk_pending_leads', leads);
      notify('Pending lead created', `${p.businessName} reached invoice page`, 'pending_lead', p);
    }

    if(/submit|theme|invoice|payment|request|message|template|package|account/.test(String(reason||''))){
      notify('System sync', `${p.businessName} | ${reason}`, 'sync', p);
    }

    try{
      if(window.BroadcastChannel){
        const bc = new BroadcastChannel(CHANNEL);
        bc.postMessage({reason, project:p, time:Date.now()});
        bc.close();
      }
    }catch(e){}
    try{
      localStorage.setItem('wdlk_v52_sync_ping', JSON.stringify({reason, project:p, time:Date.now()}));
      window.dispatchEvent(new CustomEvent('wdlk:v52-sync', {detail:{reason, project:p}}));
    }catch(e){}

    syncBackend(p).catch(()=>{});
    return p;
  }
  function saveProjectAsync(reason){
    const p = saveProject(reason);
    return syncBackend(p).then(() => p).catch(() => p);
  }
  function customerLogin(loginId, password){
    const id = String(loginId || '').trim().toLowerCase();
    const pass = String(password || '');
    const accounts = [safeJson('wdlk_customer_account', null), ...safeJson('wdlk_admin_customer_accounts', [])].filter(Boolean);
    const acc = accounts.find(a => {
      const ids = [a.username, a.email, a.contactNumber, a.businessName, ...(Array.isArray(a.loginIds)?a.loginIds:[])].filter(Boolean).map(x => String(x).trim().toLowerCase());
      return ids.includes(id) || String(a.contactNumber||'').replace(/\s/g,'') === id.replace(/\s/g,'');
    });
    if(!acc) return {ok:false, message:'Customer account not found.'};
    if(acc.password && String(acc.password) !== pass) return {ok:false, message:'Incorrect password.'};
    saveJson('wdlk_customer_account', acc);
    saveJson('wdlk_customer', Object.assign({}, safeJson('wdlk_customer', {}), {
      businessName:acc.businessName, yourName:acc.customerName, contactNumber:acc.contactNumber, email:acc.email, username:acc.username, password:acc.password, accountStatus:'active'
    }));
    localStorage.setItem('wdlk_logged_in','yes');
    saveProject('customer_login');
    return {ok:true, account:acc};
  }

  window.WebDevV52Sync = {saveProject, saveProjectAsync, collect, ensureAccount, customerLogin, notify};

  document.addEventListener('DOMContentLoaded', function(){
    if(isInvoice) {
      localStorage.setItem('wdlk_project_stage','pending_lead');
      saveProject('invoice_page_pending_lead');
    } else {
      saveProject('page_load');
    }
  });
  document.addEventListener('submit', function(e){
    setTimeout(() => saveProject('form_submit_' + ((e.target && e.target.id) || 'form')), 200);
  }, true);
  document.addEventListener('change', function(){ setTimeout(() => saveProject('field_change'), 250); }, true);
  window.addEventListener('storage', function(e){ if(e.key && e.key.indexOf('wdlk_') === 0) setTimeout(() => saveProject('storage_update'), 100); });
  try{
    if(window.BroadcastChannel){
      const bc = new BroadcastChannel(CHANNEL);
      bc.onmessage = function(){ if(isAdmin || isCustomerDash) setTimeout(() => saveProject('broadcast_update'), 100); };
    }
  }catch(e){}
  setInterval(function(){ if(isAdmin || isCustomerDash || isInvoice) saveProject('auto_refresh'); }, isAdmin ? 2500 : 6000);
})();
