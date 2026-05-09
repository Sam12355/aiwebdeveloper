<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ecommercesrilanka.lk | AI Build Website for Your Business Within 3 Days</title>
  <meta name="description" content="AI Website builder for the first time in Sri Lanka. Get your business website ready within 3 days." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css" />
  <link rel="stylesheet" href="assets/css/auth.css" />
  <link rel="stylesheet" href="assets/css/global-v29.css" />
  <link rel="stylesheet" href="assets/css/ai-step-transition.css" />
  <link rel="stylesheet" href="assets/css/interactive-ui.css" />
  <link rel="stylesheet" href="assets/css/comfortaa-font.css" />
  <link rel="stylesheet" href="assets/css/sync-automation.css" />
  <link rel="stylesheet" href="assets/css/v52-admin-sync.css" />
  <link rel="stylesheet" href="assets/css/v54-price-sync.css" />
</head>
<body class="ai-step-pages">
  <div class="page-shell">
    <header class="site-header">
      <div class="container header-wrap">
        <a href="index.php" class="brand" aria-label="ecommercesrilanka.lk home">
          <img src="assets/img/webdeveloper-logo-header.png" alt="ecommercesrilanka.lk" />
        </a>
        <nav class="main-nav"></nav>
        <div class="header-cta-group">
          <a href="customer-login.php" class="btn btn-outline header-cta-return" id="returnDashboardBtn">My Dashboard</a>
          <a href="#start-form" class="btn btn-primary header-cta">Start My Website</a>
        </div>
      </div>
    </header>
    <script>
      var rb=document.getElementById('returnDashboardBtn');
      if(rb){
        if(localStorage.getItem('wdlk_logged_in')==='yes'){
          rb.href='customer-dashboard.php';
          rb.addEventListener('click', function(e){
            try{
              var c = JSON.parse(localStorage.getItem('wdlk_customer') || 'null');
              var s1b = JSON.parse(localStorage.getItem('wdlk_step1_business') || '{}');
              var s1 = Object.assign({}, s1b, JSON.parse(localStorage.getItem('wdlk_step1') || '{}'));
              if(!c && (s1.businessName || s1.contactNumber || s1.email)){
                c = {
                  businessName: s1.businessName || localStorage.getItem('wdlk_business_name') || localStorage.getItem('wdlk_business_type') || 'Your Business',
                  yourName: s1.customerName || s1.yourName || 'Customer',
                  contactNumber: s1.contactNumber || '',
                  email: s1.email || '',
                  accountStatus: 'active'
                };
                localStorage.setItem('wdlk_customer', JSON.stringify(c));
              }
              if(window.WebDevSession) window.WebDevSession.createSession();
            }catch(err){}
          });
        }
      }
    </script>

    <main>
      <section class="hero">
        <canvas id="particle-canvas" aria-hidden="true"></canvas>
        <div class="hero-glow glow-left"></div>
        <div class="hero-glow glow-right"></div>
        <div class="container hero-grid">
          <div class="hero-content reveal up">
            <div class="hero-badge idle-float">
              <span class="spark"></span>
              AI-Powered. Fast. Reliable.
            </div>
            <h1>AI Build Website for<br />Your Business Within <span>3 Days</span></h1>
            <p class="hero-text">
              AI Website builder for the first time in Sri Lanka.<br />
              Get your business website ready within 3 days.
            </p>

            <form id="start-form" class="hero-form" action="business-type.php" method="get">
              <label for="business" class="form-label">What is your business?</label>
              <div class="form-row">
                <div class="input-icon-wrap">
                  <span class="search-icon">
                    <svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"></circle><path d="M20 20L17 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>
                  </span>
                  <input type="text" id="business" name="business" placeholder="Restaurant, Hotel, Construction Company, Clothing Shop..." required />
                </div>
                <button type="submit" class="btn btn-primary btn-large cta-breathe">Start My Website</button>
              </div>
            </form>

            <div class="hero-note reveal up delay-1">
              <span class="note-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 2L19 5V11C19 16 15.5 20 12 21C8.5 20 5 16 5 11V5L12 2Z" stroke="currentColor" stroke-width="2"></path><path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </span>
              3-day delivery starts after advance payment and essential business details.
            </div>
          </div>

          <div class="hero-card-wrap reveal up delay-1">
            <div class="project-card idle-float-soft">
              <div class="project-card-head">
                <h3>My Website Project</h3>
                <span class="status-pill">In Progress</span>
              </div>
              <div class="mini-steps-header">
                <div class="day-line">7 Easy Steps</div>
                <div class="mini-step-name" id="miniStepName">Step 1 - Setup</div>
              </div>
              <div class="progress-track">
                <div class="progress-bar" id="miniProgress"></div>
              </div>

              <div class="mini-slider-frame">
                <img id="miniStepImage" src="assets/img/process/step1-home.png" alt="Step preview" />
              </div>

              <div class="mini-slider-meta">
                <span id="miniStepNumber">Step 1 of 7</span>
                <button type="button" class="view-progress-btn">View Process</button>
              </div>

              <div class="mini-slider-dots" id="miniStepDots">
                <button class="mini-dot active" data-step="0" aria-label="Step 1">1</button>
                <button class="mini-dot" data-step="1" aria-label="Step 2">2</button>
                <button class="mini-dot" data-step="2" aria-label="Step 3">3</button>
                <button class="mini-dot" data-step="3" aria-label="Step 4">4</button>
                <button class="mini-dot" data-step="4" aria-label="Step 5">5</button>
                <button class="mini-dot" data-step="5" aria-label="Step 6">6</button>
                <button class="mini-dot" data-step="6" aria-label="Step 7">7</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="process" class="how-it-works section">
        <div class="container">
          <h2 class="section-title reveal up">How It Works</h2>
          <div class="title-underline"></div>
          <div class="steps-decor decor-left"></div>
          <div class="steps-decor decor-right"></div>
          <div class="steps-grid">
            <article class="step-card reveal up">
              <div class="step-icon blue-bg icon-animate icon-user">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"></circle><path d="M5 20C5 16.5 8 14 12 14C16 14 19 16.5 19 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>
              </div>
              <h3>Tell Us Your Business</h3>
              <p>Share your business type in a few words.</p>
            </article>
            <article class="step-card reveal up delay-1">
              <div class="step-icon red-bg icon-animate icon-payment">
                <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2"></rect><path d="M3 10H21" stroke="currentColor" stroke-width="2"></path></svg>
              </div>
              <h3>Pay Advance</h3>
              <p>Secure your project with advance payment.</p>
            </article>
            <article class="step-card reveal up delay-2">
              <div class="step-icon blue-bg icon-animate icon-launch">
                <svg viewBox="0 0 24 24" fill="none"><path d="M5 18L9 14L13 16L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 7H19V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </div>
              <h3>Get Website in 3 Days</h3>
              <p>We build and deliver your website in just 3 days.</p>
            </article>
          </div>
        </div>
      </section>

      <section class="company-intro-section">
        <div class="container">
          <div class="company-intro-card reveal up">
            <p><strong>Web Designer &amp; Web Developer (Pvt) Ltd</strong> (Reg. Number : PV 00237315) is a Sri Lankan based AI web design and development company with over 15 years of experience in the web industry.</p>
          </div>
        </div>
      </section>

      <section id="live-customers" class="live-customers-section">
        <div class="live-customers-box reveal up">
          <h2 class="live-customers-title">Our live customers</h2>
          <div class="live-counter-wrap" id="liveCustomerCounter" aria-label="Live customer countdown">
            <span class="flip-digit">3</span>
            <span class="flip-digit">0</span>
            <span class="flip-digit">0</span>
          </div>
        </div>
      </section>

    </main>

    
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

  </div>

  <script src="assets/js/main.js"></script>
  <script src="assets/js/backend-client.js"></script>
  <script src="assets/js/session-security.js"></script>
  <script src="assets/js/auth.js"></script>
  <script src="assets/js/lang-switch.js"></script>
  <script src="assets/js/ai-step-transition.js"></script>
  <script src="assets/js/interactive-ui.js"></script>
  <script src="assets/js/data-recorder.js"></script>
  <script src="assets/js/v52-system-sync.js"></script>
  <script src="assets/js/automation-sync.js"></script>
  <script src="assets/js/v54-price-sync.js"></script>
</body>
</html>
