
(function(){
  function safeJson(key, fallback = {}){
    try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
    catch(e){ return fallback; }
  }

  function saveJson(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  }

  function cleanPhone(value){
    return String(value || '').replace(/\s+/g,' ').trim();
  }

  function makeEmailFromPhone(phone){
    const digits = String(phone || '').replace(/\D/g,'');
    if(digits) return 'customer' + digits.slice(-9) + '@webdeveloper.lk';
    return 'customer' + Date.now() + '@webdeveloper.lk';
  }

  function first(){
    for(const item of arguments){
      if(item !== undefined && item !== null && String(item).trim() !== '') return String(item).trim();
    }
    return '';
  }

  function buildCustomer(){
    const existingCustomer = safeJson('wdlk_customer', {});
    const step1Business = safeJson('wdlk_step1_business', {});
    const step1 = Object.assign({}, step1Business, safeJson('wdlk_step1', {}));
    const step2 = safeJson('wdlk_step2', {});
    const payment = safeJson('wdlk_payment', {});
    const businessType = localStorage.getItem('wdlk_business_type') || '';
    const businessNameStored = localStorage.getItem('wdlk_business_name') || '';

    const businessName = first(
      existingCustomer.businessName,
      step1.businessName,
      step1Business.businessName,
      businessNameStored,
      businessType,
      'Your Business'
    );

    const yourName = first(
      existingCustomer.yourName,
      existingCustomer.name,
      step1.customerName,
      step1.yourName,
      step1Business.customerName,
      step1Business.yourName,
      'Customer'
    );

    const contactNumber = cleanPhone(first(
      existingCustomer.contactNumber,
      step1.contactNumber,
      step1.phone,
      step1Business.contactNumber,
      step1Business.phone,
      ''
    ));

    const email = first(
      existingCustomer.email,
      step1.email,
      step1Business.email,
      contactNumber ? makeEmailFromPhone(contactNumber) : ''
    );

    return {
      businessName,
      yourName,
      contactNumber,
      email,
      accountStatus: 'active',
      accountCreatedFrom: 'advance_payment_success',
      createdAt: existingCustomer.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      invoiceNumber: localStorage.getItem('wdlk_invoice_number') || payment.invoiceNumber || ''
    };
  }

  async function createBackendAccount(customer){
    if(!window.WebDevBackend || !window.WDLK_BACKEND_ENABLED) {
      return {success:false, offline:true};
    }

    try {
      return await window.WebDevBackend.register({
        businessName: customer.businessName,
        name: customer.yourName,
        contactNumber: customer.contactNumber,
        email: customer.email,
        password: ''
      });
    } catch(e) {
      return {success:false, error:String(e)};
    }
  }

  function createProjectRecord(customer){
    const step2 = safeJson('wdlk_step2', safeJson('wdlk_step2_details', {}));
    const theme = safeJson('wdlk_theme', safeJson('wdlk_step3_theme', {}));
    const payment = safeJson('wdlk_payment', {});
    const projectId = localStorage.getItem('wdlk_invoice_number') || payment.invoiceNumber || ('WD-' + Date.now());

    const project = {
      id: projectId,
      businessName: customer.businessName,
      customerName: customer.yourName,
      contactNumber: customer.contactNumber,
      email: customer.email,
      websitePath: step2.websitePath || 'Small Business Website',
      pageCount: step2.pageCount || step2.pages || '5 - 10 Pages',
      businessModel: step2.businessModel || 'Individual / Small Business',
      theme: theme.themeName || theme.name || theme.theme || 'Modern Business Theme',
      themeImage: theme.image || '',
      status: 'In Progress',
      stage: 'planning',
      createdAt: payment.paidAt || new Date().toISOString(),
      accountCreated: true
    };

    saveJson('wdlk_customer_project', project);

    const projects = safeJson('wdlk_admin_projects', []);
    const exists = Array.isArray(projects) && projects.some(p => p.id === project.id);
    if(Array.isArray(projects) && !exists){
      projects.unshift(project);
      saveJson('wdlk_admin_projects', projects);
    }

    return project;
  }

  function createRealtimeAccount(){
    const customer = buildCustomer();

    saveJson('wdlk_customer', customer);
    localStorage.setItem('wdlk_logged_in', 'yes');

    const step1 = safeJson('wdlk_step1', {});
    saveJson('wdlk_step1', {
      ...step1,
      businessName: step1.businessName || customer.businessName,
      customerName: step1.customerName || customer.yourName,
      contactNumber: step1.contactNumber || customer.contactNumber,
      email: step1.email || customer.email
    });

    if(window.WebDevSession){
      window.WebDevSession.createSession();
    }

    if(window.WebDevProjectTimer){
      window.WebDevProjectTimer.ensureProjectStart();
    }

    const project = createProjectRecord(customer);

    return {customer, project};
  }

  function updateButtonState(text, disabled){
    const btn = document.getElementById('paymentSuccessNext');
    if(!btn) return;
    btn.textContent = text;
    btn.classList.toggle('disabled', !!disabled);
    if(disabled){
      btn.setAttribute('aria-disabled','true');
    } else {
      btn.removeAttribute('aria-disabled');
    }
  }

  function bind(){
    const btn = document.getElementById('paymentSuccessNext');
    if(!btn) return;

    btn.addEventListener('click', async function(e){
      e.preventDefault();
      updateButtonState('Creating Account...', true);

      const {customer} = createRealtimeAccount();
      await createBackendAccount(customer);
      if(window.WebDevV52Sync && window.WebDevV52Sync.saveProjectAsync){
        await window.WebDevV52Sync.saveProjectAsync('customer_account_created');
      }
      if(window.WebDevDataRecorder && window.WebDevDataRecorder.capture) window.WebDevDataRecorder.capture('customer_account_created');

      updateButtonState('Opening Dashboard...', true);

      setTimeout(() => {
        window.location.href = 'customer-dashboard.php';
      }, 550);
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    // Keep data prepared, but only finalize account when customer presses Next.
    bind();
  });

  window.WebDevAutoAccount = {
    createRealtimeAccount
  };
})();
