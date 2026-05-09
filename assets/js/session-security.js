
(function(){
  const SESSION_KEY = 'wdlk_session';
  const SESSION_TIMEOUT = 2 * 60 * 60 * 1000; // 2 hours
  const WARNING_BEFORE = 5 * 60 * 1000;

  function safeJson(key, fallback = null){
    try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
    catch(e){ return fallback; }
  }

  function getCustomer(){
    return safeJson('wdlk_customer', null);
  }

  function buildCustomerFromFlow(){
    const existing = getCustomer();
    if(existing && (existing.businessName || existing.contactNumber || existing.email)) return existing;
    const step1Business = safeJson('wdlk_step1_business', {}) || {};
    const step1 = Object.assign({}, step1Business, safeJson('wdlk_step1', {}) || {});
    const businessName = step1.businessName || localStorage.getItem('wdlk_business_name') || localStorage.getItem('wdlk_business_type') || '';
    const customerName = step1.customerName || step1.yourName || step1.name || 'Customer';
    const contactNumber = step1.contactNumber || step1.phone || '';
    const email = step1.email || step1.customerEmail || '';
    if(!businessName && !contactNumber && !email) return null;
    const customer = {
      businessName,
      yourName: customerName,
      contactNumber,
      email,
      accountStatus: 'active',
      accountCreatedFrom: 'flow_session'
    };
    localStorage.setItem('wdlk_customer', JSON.stringify(customer));
    return customer;
  }

  function makeToken(){
    const rand = (crypto && crypto.getRandomValues) ? Array.from(crypto.getRandomValues(new Uint8Array(16))).map(b => b.toString(16).padStart(2,'0')).join('') : Math.random().toString(36).slice(2);
    return 'wdlk_' + Date.now().toString(36) + '_' + rand;
  }

  function createSession(){
    const customer = getCustomer() || {};
    const now = Date.now();
    const session = {
      token: makeToken(),
      startedAt: new Date(now).toISOString(),
      lastActivity: now,
      expiresAt: now + SESSION_TIMEOUT,
      email: customer.email || '',
      contactNumber: customer.contactNumber || '',
      businessName: customer.businessName || ''
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    localStorage.setItem('wdlk_logged_in', 'yes');
    return session;
  }

  function getSession(){
    let session = null;
    try { session = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); } catch(e){}
    return session;
  }

  function isValidSession(){
    const session = getSession();
    const customer = getCustomer();
    if(!session || !customer) return false;
    if(Date.now() > Number(session.expiresAt || 0)) return false;

    const emailMatch = !session.email || !customer.email || session.email === customer.email;
    const phoneMatch = !session.contactNumber || !customer.contactNumber || session.contactNumber === customer.contactNumber;
    return emailMatch && phoneMatch;
  }

  function touchSession(){
    const session = getSession();
    if(!session) return;
    const now = Date.now();
    session.lastActivity = now;
    session.expiresAt = now + SESSION_TIMEOUT;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  function clearSession(){
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem('wdlk_logged_in');
  }

  // V36 Sinhala direct page access:
  // Sinhala customer pages are allowed to open directly for review/testing without redirecting to the home page.
  function allowSinhalaDirectAccess(){
    return window.location.pathname.includes('/sn/');
  }

  function ensureSinhalaDemoSession(){
    if(!allowSinhalaDirectAccess()) return false;
    if(!getCustomer()){
      localStorage.setItem('wdlk_customer', JSON.stringify({
        businessName:'ඔබගේ ව්‍යාපාරය',
        yourName:'පාරිභෝගිකයා',
        contactNumber:'',
        email:'',
        accountStatus:'demo_sinhala'
      }));
    }
    createSession();
    return true;
  }

  function requireSession(){
    if(isValidSession()){
      touchSession();
      return true;
    }

    if(localStorage.getItem('wdlk_logged_in') === 'yes' && buildCustomerFromFlow()){
      createSession();
      return true;
    }

    clearSession();

    const current = window.location.pathname.split('/').pop() || 'index.php';
    const openPages = [
      'index.php',
      '',
      'business-type.php',
      'details.php',
      'theme-selection.php',
      'invoice.php',
      'payment-success.php'
    ];

    if(!openPages.includes(current)){
      sessionStorage.setItem('wdlk_redirect_after_login', current + window.location.search + window.location.hash);
      window.location.href = 'index.php';
      return false;
    }
    return false;
  }

  function attachActivityRefresh(){
    ['click','keydown','mousemove','touchstart'].forEach(evt => {
      window.addEventListener(evt, () => {
        if(isValidSession()) touchSession();
      }, {passive:true});
    });
  }

  function startSessionWatch(){
    setInterval(() => {
      const session = getSession();
      if(!session) return;
      const left = Number(session.expiresAt || 0) - Date.now();
      if(left <= 0){
        clearSession();
        const current = window.location.pathname.split('/').pop() || 'index.php';
        if(!['index.php','','business-type.php','details.php','theme-selection.php','invoice.php','payment-success.php'].includes(current)){
          alert('Your session expired. Please login again.');
          window.location.href = 'index.php';
        }
      }
    }, 30000);
  }

  function init(){
    attachActivityRefresh();
    startSessionWatch();
    const protectedPages = [
      'customer-dashboard.php',
      'project-progress.php',
      'demo-review.php',
      'final-review.php',
      'final-payment.php',
      'launch-website.php',
      'website-live.php'
    ];
    const current = window.location.pathname.split('/').pop() || 'index.php';
    if(protectedPages.includes(current)){
      requireSession();
    }
  }

  window.WebDevSession = {
    createSession,
    getSession,
    isValidSession,
    requireSession,
    touchSession,
    clearSession
  };

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
