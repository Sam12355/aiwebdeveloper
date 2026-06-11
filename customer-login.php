<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Return to Dashboard | ecommercesrilanka.lk</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/global-v29.css" />
  <link rel="stylesheet" href="assets/css/auth.css" />
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Inter',sans-serif;background:#f0f4ff;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px}
    .login-card{background:#fff;border-radius:24px;box-shadow:0 24px 60px rgba(13,31,89,.10);padding:44px 40px 36px;width:100%;max-width:440px}
    .login-logo{text-align:center;margin-bottom:28px}
    .login-logo img{height:40px}
    h1{font-size:22px;font-weight:800;color:#081339;text-align:center;margin-bottom:6px}
    .login-sub{font-size:14px;color:#5a6886;text-align:center;margin-bottom:28px}
    .field{display:flex;flex-direction:column;gap:7px;margin-bottom:18px}
    label{font-size:13px;font-weight:700;color:#081339}
    input{height:50px;border:1.5px solid #dde5f4;border-radius:12px;padding:0 16px;font-size:15px;font-family:inherit;color:#081339;outline:none;transition:border-color .2s}
    input:focus{border-color:#1d5cff}
    .login-btn{width:100%;height:54px;border:none;border-radius:14px;background:linear-gradient(135deg,#1d5cff,#0b42d8);color:#fff;font-size:17px;font-weight:800;cursor:pointer;box-shadow:0 14px 30px rgba(29,92,255,.22);transition:.25s;margin-top:4px}
    .login-btn:hover{transform:translateY(-2px);box-shadow:0 18px 38px rgba(29,92,255,.28)}
    .login-error{display:none;background:#fff2f2;border:1px solid #ffc5c5;border-radius:10px;padding:11px 14px;color:#cc2222;font-size:13px;font-weight:600;margin-top:14px;text-align:center}
    .login-error.show{display:block}
    .divider{text-align:center;font-size:13px;color:#8a96ac;margin:22px 0 14px}
    .new-link{display:block;text-align:center;font-size:14px;color:#1d5cff;font-weight:700;text-decoration:none}
    .new-link:hover{text-decoration:underline}
    .note{margin-top:20px;background:#f4f7ff;border-radius:12px;padding:13px 16px;font-size:12px;color:#5a6886;line-height:1.6}
    .note strong{color:#1d5cff}
  </style>
</head>
<body>
  <div class="login-card">
    <div class="login-logo">
      <img src="assets/img/webdeveloper-logo-header.png" alt="ecommercesrilanka.lk" />
    </div>
    <h1>Return to Dashboard</h1>
    <p class="login-sub">Enter your phone number or email to access your project dashboard.</p>

    <div class="field">
      <label for="loginPhone">Phone Number or Email</label>
      <input id="loginPhone" type="text" placeholder="077 123 4567 or you@email.com" autocomplete="off" />
    </div>

    <button class="login-btn" id="loginBtn">Open My Dashboard</button>
    <div class="login-error" id="loginError">No project found for this phone or email. Please check and try again.</div>

    <div class="divider">— or —</div>
    <a href="index.php" class="new-link">Start a New Website Project</a>

    <div class="note">
      <strong>Same device required.</strong> Your project data is saved in this browser. If you started your project on a different device, please open the dashboard on that device or contact us for support.
    </div>
  </div>

  <script>
    (function(){
      function clean(v){ return String(v||'').replace(/\D/g,'').trim(); }
      function norm(v){ return String(v||'').toLowerCase().trim(); }

      function saveSession(customer, project){
        localStorage.setItem('wdlk_customer', JSON.stringify(customer));
        localStorage.setItem('wdlk_logged_in', 'yes');
        if(project){
          localStorage.setItem('wdlk_project_key', project.projectKey || '');
          localStorage.setItem('wdlk_invoice_number', project.invoiceNo || project.id || '');
          localStorage.setItem('wdlk_business_type', project.businessType || '');
          localStorage.setItem('wdlk_business_name', project.businessName || customer.businessName || '');
          localStorage.setItem('wdlk_project_stage', project.stage || '');
          localStorage.setItem('wdlk_dashboard_stage_percent', String(project.progressPercent || 0));
          localStorage.setItem('wdlk_step1', JSON.stringify({
            businessType: project.businessType || '',
            businessName: project.businessName || '',
            customerName: project.customerName || customer.yourName || '',
            contactNumber: project.contactNumber || customer.contactNumber || '',
            email: project.email || customer.email || '',
            businessDescription: project.businessDescription || ''
          }));
          localStorage.setItem('wdlk_step1_business', localStorage.getItem('wdlk_step1'));
          localStorage.setItem('wdlk_step2', JSON.stringify({
            businessName: project.businessName || '',
            mainServices: project.mainServices || '',
            pages: project.pageCount || '',
            pageCount: project.pageCount || '',
            businessModel: project.businessModel || '',
            websitePath: project.websitePath || '',
            totalPrice: project.totalPrice || 0,
            advancePayment: project.advancePayment || 0,
            balancePayment: project.balancePayment || 0,
            pricingTypeLabel: project.pricingTypeLabel || '',
            packageName: project.packageName || '',
            packageLabel: project.packageLabel || '',
            packagePages: project.packagePages || ''
          }));
          localStorage.setItem('wdlk_step2_details', localStorage.getItem('wdlk_step2'));
          localStorage.setItem('wdlk_theme', JSON.stringify({
            themeName: project.themeName || '',
            name: project.themeName || '',
            category: project.themeCategory || '',
            image: project.themeImage || ''
          }));
          localStorage.setItem('wdlk_pricing', JSON.stringify({
            totalPrice: project.totalPrice || 0,
            advancePayment: project.advancePayment || 0,
            balancePayment: project.balancePayment || 0,
            pricingTypeLabel: project.pricingTypeLabel || '',
            packageName: project.packageName || '',
            packageLabel: project.packageLabel || '',
            packagePages: project.packagePages || ''
          }));
          localStorage.setItem('wdlk_payment', JSON.stringify({
            invoiceNumber: project.invoiceNo || project.id || '',
            status: project.paymentStatus || '',
            total: project.totalPrice || 0,
            advance: project.advancePayment || 0,
            balance: project.balancePayment || 0
          }));
        }
        var now = Date.now();
        sessionStorage.setItem('wdlk_session', JSON.stringify({
          token: 'wdlk_login_' + now,
          startedAt: new Date(now).toISOString(),
          lastActivity: now,
          expiresAt: now + (2 * 60 * 60 * 1000),
          email: customer.email || '',
          contactNumber: customer.contactNumber || '',
          businessName: customer.businessName || ''
        }));
      }

      async function lookupBackend(input){
        const res = await fetch('backend/api/customer-lookup.php', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          credentials:'include',
          body:JSON.stringify({login:input})
        });
        const data = await res.json().catch(function(){ return {}; });
        if(!res.ok || !data.success) throw new Error(data.message || 'No project found for this phone or email.');
        return data;
      }

      async function tryLogin(){
        const input = document.getElementById('loginPhone').value.trim();
        const errorEl = document.getElementById('loginError');
        errorEl.classList.remove('show');

        if(!input){ errorEl.textContent='Please enter your phone number or email.'; errorEl.classList.add('show'); return; }

        // Always hit the backend first: it sets the PHP session (customer_project_id)
        // and returns the canonical project (projectKey/invoiceNo) so message history and
        // live project data load on EVERY login, including returning users.
        try{
          const data = await lookupBackend(input);
          saveSession(data.customer, data.project);
          window.location.href = 'customer-dashboard.php';
          return;
        }catch(err){
          // Backend unreachable or no DB project — fall back to local data if it matches
          const customer = JSON.parse(localStorage.getItem('wdlk_customer') || '{}');
          const step1 = JSON.parse(localStorage.getItem('wdlk_step1') || '{}');
          const storedPhone = clean(customer.contactNumber || step1.contactNumber || step1.phone || '');
          const storedEmail = norm(customer.email || step1.email || '');
          const inp = norm(input);
          const inpPhone = clean(input);
          if((storedEmail && inp === storedEmail) || (storedPhone && inpPhone && inpPhone === storedPhone)){
            saveSession(customer, null);
            window.location.href = 'customer-dashboard.php';
          } else {
            errorEl.textContent = err.message || 'No project found for this phone or email. Please check and try again.';
            errorEl.classList.add('show');
          }
        }
      }

      document.getElementById('loginBtn').addEventListener('click', tryLogin);
      document.getElementById('loginPhone').addEventListener('keydown', function(e){ if(e.key === 'Enter') tryLogin(); });

      // Auto-redirect if already logged in (no lookup needed)
      if(localStorage.getItem('wdlk_logged_in') === 'yes' && !location.search.includes('force')){
        // Show the form anyway — let the user confirm their identity
      }
    })();
  </script>
</body>
</html>
