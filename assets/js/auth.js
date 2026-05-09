
(function(){
  const STORAGE_KEY = 'wdlk_customer';

  function getCustomer(){
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); }
    catch(e){ return null; }
  }

  function saveCustomer(customer){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customer));
    localStorage.setItem('wdlk_logged_in', 'yes');
    updateAuthUI();
  }

  function initials(name){
    const clean = (name || 'Customer').trim();
    const parts = clean.split(/\s+/).slice(0,2);
    return parts.map(p => p[0] || '').join('').toUpperCase() || 'C';
  }

  function createModal(){
    if(document.getElementById('authModal')) return;

    const modal = document.createElement('div');
    modal.className = 'auth-modal-backdrop';
    modal.id = 'authModal';
    modal.innerHTML = `
      <div class="auth-modal" role="dialog" aria-modal="true">
        <div class="auth-modal-content">
          <div class="auth-modal-head">
            <div>
              <h2 id="authTitle">Customer Sign Up</h2>
              <p id="authIntro">Create your customer profile to track your website project.</p>
            </div>
            <button class="auth-close" type="button" aria-label="Close">×</button>
          </div>

          <form class="auth-form" id="signupForm">
            <div class="auth-field">
              <label for="signupBusiness">Business Name</label>
              <input id="signupBusiness" type="text" placeholder="Enter business name" required>
            </div>
            <div class="auth-field">
              <label for="signupName">Your Name</label>
              <input id="signupName" type="text" placeholder="Enter your name" required>
            </div>
            <div class="auth-field">
              <label for="signupPhone">Contact Number</label>
              <input id="signupPhone" type="tel" placeholder="07X XXX XXXX" required>
            </div>
            <div class="auth-field">
              <label for="signupEmail">Email</label>
              <input id="signupEmail" type="email" placeholder="name@example.com" required>
            </div>
            <p class="auth-error" id="signupError"></p>
            <p class="auth-success" id="signupSuccess"></p>
            <button class="auth-submit" type="submit">Create Account & Open Dashboard</button>
            <div class="auth-helper">Already have a profile? <button type="button" data-open-login>Sign In</button></div>
          </form>

          <form class="auth-form" id="loginForm" style="display:none">
            <div class="auth-field">
              <label for="loginId">Username, Email or Contact Number</label>
              <input id="loginId" type="text" placeholder="Enter username, email or contact number" required>
            </div>
            <div class="auth-field">
              <label for="loginPassword">Password</label>
              <input id="loginPassword" type="password" placeholder="Enter auto generated password" required>
            </div>
            <p class="auth-error" id="loginError"></p>
            <button class="auth-submit" type="submit">Sign In to Dashboard</button>
            <div class="auth-helper">No profile yet? <button type="button" data-open-signup>Create account</button></div>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.auth-close').addEventListener('click', closeAuthModal);
    modal.addEventListener('click', (e) => {
      if(e.target === modal) closeAuthModal();
    });
    modal.querySelector('[data-open-login]').addEventListener('click', () => openAuthModal('login'));
    modal.querySelector('[data-open-signup]').addEventListener('click', () => openAuthModal('signup'));

    const signupForm = modal.querySelector('#signupForm');
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const businessName = document.getElementById('signupBusiness').value.trim();
      const yourName = document.getElementById('signupName').value.trim();
      const contactNumber = document.getElementById('signupPhone').value.trim();
      const email = document.getElementById('signupEmail').value.trim();
      const error = document.getElementById('signupError');
      const success = document.getElementById('signupSuccess');

      error.textContent = '';
      success.textContent = '';

      if(!businessName || !yourName || !contactNumber || !email){
        error.textContent = 'Please complete all fields.';
        return;
      }
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        error.textContent = 'Please enter a valid email address.';
        return;
      }

      const customer = {
        businessName,
        yourName,
        contactNumber,
        email,
        createdAt: new Date().toISOString()
      };

      saveCustomer(customer);
      if(window.WebDevV52Sync){ window.WebDevV52Sync.saveProject('signup_customer_account'); }
      if(window.WebDevSession){ window.WebDevSession.createSession(); }
      success.textContent = 'Account created. Opening your dashboard...';

      try {
        const existingStep1 = JSON.parse(localStorage.getItem('wdlk_step1') || '{}');
        localStorage.setItem('wdlk_step1', JSON.stringify({
          ...existingStep1,
          businessName: existingStep1.businessName || businessName,
          customerName: existingStep1.customerName || yourName,
          contactNumber: existingStep1.contactNumber || contactNumber,
          email: existingStep1.email || email
        }));
      } catch(e) {}

      setTimeout(() => {
        window.location.href = 'customer-dashboard.php';
      }, 700);
    });

    const loginForm = modal.querySelector('#loginForm');
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const loginId = document.getElementById('loginId').value.trim();
      const passwordEl = document.getElementById('loginPassword');
      const loginPassword = passwordEl ? passwordEl.value.trim() : '';
      const error = document.getElementById('loginError');
      error.textContent = '';

      if(window.WebDevV52Sync && passwordEl){
        const result = window.WebDevV52Sync.customerLogin(loginId, loginPassword);
        if(!result.ok){
          error.textContent = result.message || 'Profile not found or password incorrect.';
          return;
        }
      } else {
        const customer = getCustomer();
        if(!customer){
          error.textContent = 'No customer profile found. Please sign up first.';
          return;
        }
        const matchEmail = (customer.email || '').toLowerCase() === loginId.toLowerCase();
        const matchPhone = (customer.contactNumber || '').replace(/\s/g,'') === loginId.replace(/\s/g,'');
        if(!matchEmail && !matchPhone){
          error.textContent = 'Profile not found. Please check your email or contact number.';
          return;
        }
      }

      localStorage.setItem('wdlk_logged_in', 'yes');
      if(window.WebDevSession){ window.WebDevSession.createSession(); }
      if(window.WebDevV52Sync){ window.WebDevV52Sync.saveProject('customer_login'); }
      const redirect = sessionStorage.getItem('wdlk_redirect_after_login') || 'customer-dashboard.php';
      sessionStorage.removeItem('wdlk_redirect_after_login');
      window.location.href = redirect;
    });
  }

  function openAuthModal(mode){
    createModal();
    const modal = document.getElementById('authModal');
    const title = document.getElementById('authTitle');
    const intro = document.getElementById('authIntro');
    const signup = document.getElementById('signupForm');
    const login = document.getElementById('loginForm');

    if(mode === 'login'){
      title.textContent = 'Customer Login';
      intro.textContent = 'Login to view your project status, payment, and dashboard.';
      signup.style.display = 'none';
      login.style.display = 'grid';
    } else {
      title.textContent = 'Customer Sign Up';
      intro.textContent = 'Create your customer profile to track your website project.';
      signup.style.display = 'grid';
      login.style.display = 'none';
      prefillSignup();
    }

    modal.classList.add('show');
  }

  function closeAuthModal(){
    const modal = document.getElementById('authModal');
    if(modal) modal.classList.remove('show');
  }

  function prefillSignup(){
    try {
      const step1 = JSON.parse(localStorage.getItem('wdlk_step1') || '{}');
      const businessType = localStorage.getItem('wdlk_business_type') || '';
      const businessName = document.getElementById('signupBusiness');
      const yourName = document.getElementById('signupName');
      const phone = document.getElementById('signupPhone');
      const email = document.getElementById('signupEmail');

      if(businessName && !businessName.value) businessName.value = step1.businessName || businessType || '';
      if(yourName && !yourName.value) yourName.value = step1.customerName || '';
      if(phone && !phone.value) phone.value = step1.contactNumber || '';
      if(email && !email.value) email.value = step1.email || '';
    } catch(e) {}
  }

  function profileIconUrl(){
    return window.location.pathname.includes('/sn/') ? '../assets/img/customer-profile-icon.svg' : 'assets/img/customer-profile-icon.svg';
  }

  function authHTML(){
    return `
      <div class="auth-actions" id="authActions">
        <a class="auth-btn login signin" href="#" data-auth-login>Sign In</a>
        <a class="auth-btn signup" href="#" data-auth-signup>Sign Up</a>
        <a class="auth-user-pill" href="customer-dashboard.php" id="authUserPill" data-auth-profile-pill>
          <span class="mini-avatar image-avatar"><img src="${profileIconUrl()}" alt="Customer profile icon" /></span>
          <span id="authUserName">Dashboard</span>
        </a>
        <button class="auth-profile-3d" type="button" data-auth-profile aria-label="Customer profile">
          <img src="${profileIconUrl()}" alt="Customer profile icon" class="profile-icon-image" />
        </button>
      </div>
    `;
  }


  function createLanguageSwitch(){
    const wrap = document.createElement('div');
    wrap.className = 'wd-language-switch';
    wrap.innerHTML = '<a class="wd-lang-btn" href="#" data-lang="si">සිංහල</a><span class="wd-lang-sep">/</span><a class="wd-lang-btn" href="#" data-lang="en">English</a>';
    wrap.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function(e){
        e.preventDefault();
        localStorage.setItem('wdlk_language', this.dataset.lang);
      });
    });
    return wrap;
  }


  function dashboardUrl(){
    const isSinhala = document.documentElement.lang === 'si' || window.location.pathname.includes('/sn/');
    return isSinhala ? 'customer-dashboard.php' : 'customer-dashboard.php';
  }

  function ensureProfileSession(){
    let customer = getCustomer();
    if(customer && (customer.businessName || customer.yourName || customer.contactNumber || customer.email)){
      localStorage.setItem('wdlk_logged_in', 'yes');
      if(window.WebDevSession){ window.WebDevSession.createSession(); }
      return customer;
    }

    let step1 = {};
    let step2 = {};
    try { step1 = JSON.parse(localStorage.getItem('wdlk_step1') || localStorage.getItem('wdlk_step1_business') || '{}'); } catch(e) {}
    try { step2 = JSON.parse(localStorage.getItem('wdlk_step2') || localStorage.getItem('wdlk_step2_details') || '{}'); } catch(e) {}

    const businessType = localStorage.getItem('wdlk_business_type') || '';
    customer = {
      businessName: step2.businessName || step1.businessName || businessType || 'My Business',
      yourName: step1.customerName || step1.yourName || 'Customer',
      contactNumber: step1.contactNumber || '',
      email: step1.email || '',
      accountStatus: 'profile_dashboard_ready',
      createdAt: new Date().toISOString()
    };

    saveCustomer(customer);
    localStorage.setItem('wdlk_logged_in', 'yes');
    if(window.WebDevSession){ window.WebDevSession.createSession(); }
    return customer;
  }

  function mountAuth(){
    if(document.getElementById('authActions')) return;

        const headerWrap = document.querySelector('.header-wrap') || document.querySelector('.flow-header-inner') || document.querySelector('.progress-header-inner') || document.querySelector('.demo-header-inner') || document.querySelector('.final-header-inner') || document.querySelector('.launch-header-inner') || document.querySelector('.live-header-inner');
    if(!headerWrap) return;

    const holder = document.createElement('div');
    holder.innerHTML = authHTML();
    headerWrap.appendChild(holder.firstElementChild);

    document.querySelectorAll('[data-auth-login]').forEach(el => el.addEventListener('click', (e) => {
      e.preventDefault();
      openAuthModal('login');
    }));
    document.querySelectorAll('[data-auth-signup]').forEach(el => el.addEventListener('click', (e) => {
      e.preventDefault();
      openAuthModal('signup');
    }));
    document.querySelectorAll('[data-auth-profile]').forEach(el => el.addEventListener('click', () => {
      ensureProfileSession();
      if(window.WebDevDataRecorder && window.WebDevDataRecorder.capture){
        window.WebDevDataRecorder.capture('profile_icon_click');
      }
      window.location.href = dashboardUrl();
    }));

    updateAuthUI();
  }

  function updateAuthUI(){
    const actions = document.getElementById('authActions');
    if(!actions) return;
    const customer = getCustomer();
    const logged = customer && localStorage.getItem('wdlk_logged_in') === 'yes';

    actions.classList.toggle('logged', !!logged);
    const profile = actions.querySelector('.auth-profile-3d');
    if(profile) profile.classList.toggle('active', !!logged);

    if(logged){
      const name = document.getElementById('authUserName');
      const ini = document.getElementById('authInitials');
      if(name) name.textContent = customer.yourName || 'Dashboard';
      if(ini) ini.textContent = initials(customer.yourName);
    }
  }

  window.WebDevAuth = { open: openAuthModal, close: closeAuthModal, getCustomer, saveCustomer, updateAuthUI };

  document.addEventListener('DOMContentLoaded', () => {
    createModal();
    mountAuth();
  });
})();
