<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Successful | ecommercesrilanka.lk</title>
  <meta name="description" content="Your ecommercesrilanka.lk website project is confirmed after advance payment.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/auth.css">
  <style>
    :root{--blue:#1d5cff;--red:#ff3131;--green:#159947;--text:#081339;--muted:#5a6886;--line:#dfe7f8}
    *{box-sizing:border-box} body{margin:0;font-family:Inter,system-ui,sans-serif;background:linear-gradient(180deg,#f8fbff,#fff);color:var(--text);min-height:100vh}
    .flow-container{width:min(1180px,calc(100% - 48px));margin:0 auto}
    .flow-header{background:rgba(255,255,255,.94);border-bottom:1px solid var(--line);position:sticky;top:0;z-index:20;backdrop-filter:blur(12px)}
    .flow-header-inner{display:flex;justify-content:space-between;align-items:center;padding:15px 0}.flow-logo img{height:50px}.secure-label{font-weight:800;color:#132452}
    .success-hero{position:relative;overflow:hidden;padding:54px 0 30px;background:radial-gradient(circle at 12% 30%,rgba(21,153,71,.10),transparent 26%),radial-gradient(circle at 85% 35%,rgba(29,92,255,.12),transparent 28%)}
    .success-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:38px;align-items:center}.check-big{width:96px;height:96px;border-radius:50%;background:#eaf9ef;color:var(--green);font-size:56px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;box-shadow:0 18px 38px rgba(21,153,71,.14)}
    h1{font-size:46px;line-height:1.08;margin:0 0 14px}.green{color:var(--green)}p{color:var(--muted);font-size:18px;line-height:1.6;margin:0 0 20px}
    .payment-card{background:#fff;border:1px solid var(--line);border-radius:28px;box-shadow:0 24px 60px rgba(13,31,89,.09);padding:28px;text-align:center;position:relative}
    .payment-card .check{width:72px;height:72px;border-radius:50%;background:#eaf9ef;color:var(--green);font-size:42px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
    .txn{background:#f2f8f4;border-radius:14px;padding:12px;margin:14px 0;color:#36784d;font-weight:800}.amount{font-size:26px;font-weight:900}
    .success-steps{padding:24px 0 54px}.success-layout{display:grid;grid-template-columns:1.1fr .9fr;gap:24px}.card{background:#fff;border:1px solid var(--line);border-radius:24px;box-shadow:0 22px 54px rgba(13,31,89,.07);padding:26px}
    .next-list{display:grid;gap:20px}.next-item{display:grid;grid-template-columns:54px 1fr auto;gap:16px;align-items:center}.next-icon{width:52px;height:52px;border-radius:18px;display:flex;align-items:center;justify-content:center;background:#eef4ff;color:var(--blue);font-weight:900}.next-item.done .next-icon{background:#eaf9ef;color:var(--green)}.pill{padding:8px 12px;border-radius:999px;background:#eaf9ef;color:var(--green);font-size:13px;font-weight:900}
    .receipt-row{display:flex;justify-content:space-between;gap:18px;border-bottom:1px solid #edf2fb;padding:13px 0}.receipt-row span{color:#60708e;font-weight:700}.receipt-row strong{text-align:right}
    .project-mini{display:grid;grid-template-columns:160px 1fr;gap:16px;align-items:center;margin-top:18px}.preview{height:110px;border-radius:16px;background:linear-gradient(135deg,#0b2a6c,#1d5cff);position:relative;overflow:hidden}.preview:after{content:"";position:absolute;right:-20px;bottom:-25px;width:100px;height:100px;border-radius:50%;background:rgba(255,255,255,.15)}
    .cta-panel{text-align:center;margin-top:24px}.cta-panel a,.cta-panel button{display:inline-flex;align-items:center;justify-content:center;border:none;text-decoration:none;border-radius:18px;padding:20px 42px;font-weight:900;cursor:pointer;margin:6px;font-size:20px}.primary{background:var(--blue);color:#fff;box-shadow:0 16px 32px rgba(29,92,255,.22)}.next-big-btn{min-width:260px;min-height:66px}.next-big-btn.disabled{opacity:.75;pointer-events:none}.secondary{background:#fff;color:#1d5cff;border:1px solid #d7e1f6}
    @media(max-width:900px){.success-grid,.success-layout{grid-template-columns:1fr}.project-mini{grid-template-columns:1fr}h1{font-size:36px}.flow-container{width:min(100% - 28px,1180px)}.flow-header-inner{flex-wrap:wrap}.next-item{grid-template-columns:52px 1fr}.next-item .pill{grid-column:2}}
  
    /* V49 payment success dashboard button and left-side payment card */
    .success-grid .payment-card{order:-1}
    .success-card-dashboard-btn{display:inline-flex;align-items:center;justify-content:center;width:100%;margin-top:22px;min-height:64px;padding:17px 24px;border-radius:20px;background:linear-gradient(135deg,#1d5cff,#0b43d8);color:#fff!important;text-decoration:none;font-weight:800;font-size:19px;box-shadow:0 20px 42px rgba(29,92,255,.26),inset 0 1px 0 rgba(255,255,255,.18);transition:transform .28s ease,background .28s ease,box-shadow .28s ease}
    .success-card-dashboard-btn:hover{transform:translateY(-4px) scale(1.015);background:linear-gradient(135deg,#ff3131,#d90d0d);box-shadow:0 24px 48px rgba(255,49,49,.26),inset 0 1px 0 rgba(255,255,255,.18)}

  </style>
  <link rel="stylesheet" href="assets/css/global-v29.css" />
<link rel="stylesheet" href="assets/css/interactive-ui.css" />
  <link rel="stylesheet" href="assets/css/comfortaa-font.css" />
  <link rel="stylesheet" href="assets/css/sync-automation.css" />
  <link rel="stylesheet" href="assets/css/v52-admin-sync.css" />
  <link rel="stylesheet" href="assets/css/v54-price-sync.css" />
</head>
<body class="ai-step-pages">
  <header class="flow-header">
    <div class="flow-container flow-header-inner">
      <a href="index.php" class="flow-logo"><img src="assets/img/webdeveloper-logo-header.png" alt="ecommercesrilanka.lk"></a>
      <div class="secure-label">Secure & Trusted</div>
    </div>
  </header>

  <main>
    <section class="success-hero">
      <div class="flow-container success-grid">
        <div>
          <div class="check-big">✓</div>
          <h1>Payment Successful!<br><span class="green">Your Website Project is Confirmed.</span></h1>
          <p>Thank you. Your 50% advance payment has been received and your website project has been placed successfully.</p>
          <p>We will contact you during the progress and update your dashboard at key stages.</p>
        </div>
        <div class="payment-card">
          <div class="check">✓</div>
          <h2>Payment Successful</h2>
          <div class="txn" id="successInvoice">Transaction ID: WD-PAY</div>
          <span>Amount Paid</span>
          <div class="amount">LKR 20,000</div>
        </div>
      </div>
    </section>

    <section class="success-steps">
      <div class="flow-container">
        <div class="success-layout">
          <div class="card">
            <h2>What Happens Next?</h2>
            <div class="next-list">
              <div class="next-item done"><span class="next-icon">✓</span><div><strong>Project Confirmed</strong><p>We have received your payment and your project is now confirmed.</p></div><span class="pill">Done</span></div>
              <div class="next-item"><span class="next-icon">🚀</span><div><strong>Project Kickoff</strong><p>Our team will review your requirements and start planning your website.</p></div><span class="pill">Within 24 hours</span></div>
              <div class="next-item"><span class="next-icon">▣</span><div><strong>Design & Development</strong><p>We will design and develop your website with care and attention to detail.</p></div><span class="pill">2 - 3 days</span></div>
              <div class="next-item"><span class="next-icon">✉</span><div><strong>Progress Updates</strong><p>You will receive dashboard updates at each important stage.</p></div><span class="pill">Ongoing</span></div>
            </div>
          </div>

          <div>
            <div class="card">
              <h2>Payment Receipt</h2>
              <div class="receipt-row"><span>Invoice No</span><strong id="receiptInvoice">WD-INV</strong></div>
              <div class="receipt-row"><span>Payment Method</span><strong>Credit / Debit Card</strong></div>
              <div class="receipt-row"><span>Amount Paid</span><strong>LKR 20,000</strong></div>
              <div class="receipt-row"><span>Paid Amount</span><strong>50% Advance</strong></div>
              <div class="receipt-row"><span>Remaining Amount</span><strong>LKR 20,000<br><small>Pay after delivery</small></strong></div>
            </div>

            <div class="card" style="margin-top:22px">
              <h2>Project Details</h2>
              <div class="project-mini">
                <div class="preview"></div>
                <div>
                  <div class="receipt-row"><span>Business</span><strong id="successBusiness">Your Business</strong></div>
                  <div class="receipt-row"><span>Theme</span><strong id="successTheme">Modern Business</strong></div>
                  <div class="receipt-row"><span>Delivery</span><strong>Within 3 Days</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card cta-panel">
          <a class="primary next-big-btn" id="paymentSuccessNext" href="customer-dashboard.php">Next &rarr;</a>
        </div>
      </div>
    </section>
  </main>

  <script src="assets/js/backend-client.js"></script>
  <script src="assets/js/session-security.js"></script>
  <script src="assets/js/auth.js"></script>
  <script src="assets/js/project-timer.js"></script>
  <script src="assets/js/payment-success-account.js"></script>
  <script>
    (function(){
      function safe(key){try{return JSON.parse(localStorage.getItem(key)||'{}')}catch(e){return {}}}
      const pay = safe('wdlk_payment'), step1 = safe('wdlk_step1'), theme = safe('wdlk_theme');
      const inv = localStorage.getItem('wdlk_invoice_number') || pay.invoiceNumber || 'WD-PAY';
      document.getElementById('successInvoice').textContent = 'Transaction ID: ' + inv;
      document.getElementById('receiptInvoice').textContent = inv;
      document.getElementById('successBusiness').textContent = step1.businessName || localStorage.getItem('wdlk_business_type') || 'Your Business';
      document.getElementById('successTheme').textContent = theme.themeName || theme.name || 'Modern Business';
    })();
  </script>

<footer class="wd-common-footer">
  <div class="wd-footer-inner">
    <a href="index.php" class="wd-footer-logo"><img src="assets/img/webdeveloper-logo-footer.png" alt="ecommercesrilanka.lk"></a>
    <nav class="wd-footer-links">
      <a href="terms-and-conditions.php">Terms and Conditions</a>
      <a href="privacy-policy.php">Privacy Policy</a>
      <a href="security-policy.php">Security Policy</a>
    </nav>
    <div class="wd-footer-language"></div>
    <div class="wd-footer-copy">2026 All rights reserved. Fully Copyright protected.</div>
  </div>
</footer>

  <script>if(window.WebDevProjectTimer){window.WebDevProjectTimer.ensureProjectStart();}</script>
  <script src="assets/js/lang-switch.js"></script>
<script src="assets/js/interactive-ui.js"></script>
  <script src="assets/js/data-recorder.js"></script>
  <script src="assets/js/v52-system-sync.js"></script>
  <script src="assets/js/automation-sync.js"></script>
  <script src="assets/js/v54-price-sync.js"></script>
</body>
</html>