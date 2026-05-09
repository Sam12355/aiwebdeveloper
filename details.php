<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Website Details | ecommercesrilanka.lk</title>
  <meta name="description" content="Select your website details, pages, business model, and website path for your 3-day website project." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css" />
  <link rel="stylesheet" href="assets/css/flow.css" />
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
  <div class="flow-page">
    <header class="site-header">
      <div class="container header-wrap">
        <a href="index.php" class="brand" aria-label="ecommercesrilanka.lk home">
          <img src="assets/img/webdeveloper-logo-header.png" alt="ecommercesrilanka.lk" />
        </a>
        <nav class="main-nav flow-nav">
          <a href="index.php">Home</a>
          <a href="#faq">FAQ</a>
        </nav>
      </div>
    </header>

    <main class="flow-main details-main">
      <canvas id="flow-particles" aria-hidden="true"></canvas>
      <div class="flow-bg glow-blue"></div>
      <div class="flow-bg glow-red"></div>

      <section class="flow-hero details-hero">
        <div class="container">
          <div class="flow-title-block reveal up">
            <h1>Business <span>Details</span></h1>
            <p>Help us understand your website requirement so we can recommend the right website path.</p>
          </div>

          <div class="flow-stepper details-stepper reveal up delay-1">
            <div class="stepper-item complete">
              <span>✓</span>
              <strong>Business</strong>
            </div>
            <div class="stepper-line active"></div>
            <div class="stepper-item active">
              <span>2</span>
              <strong>Details</strong>
            </div>
            <div class="stepper-line"></div>
            <div class="stepper-item">
              <span>3</span>
              <strong>Theme</strong>
            </div>
            <div class="stepper-line"></div>
            <div class="stepper-item">
              <span>4</span>
              <strong>Payment</strong>
            </div>
          </div>

          <div class="flow-layout details-layout">
            <form id="websiteDetailsForm" class="flow-card form-card details-form reveal up">
              <div class="card-title">
                <div class="card-icon building-icon">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M4 21V7L12 3L20 7V21" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 21V13H15V21" stroke="currentColor" stroke-width="2"/><path d="M8 8H8.01M12 8H12.01M16 8H16.01M8 11H8.01M16 11H16.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>
                </div>
                <h2>Tell Us About Your Website</h2>
              </div>

              <div class="field-grid compact-grid">
                <label class="field">
                  <span>1. Business name</span>
                  <div class="input-wrap">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M4 21V7L12 3L20 7V21" stroke="currentColor" stroke-width="2"/><path d="M9 21V14H15V21" stroke="currentColor" stroke-width="2"/></svg>
                    <input id="step2BusinessName" name="businessName" type="text" placeholder="Business name" required />
                  </div>
                </label>

                <label class="field">
                  <span>2. Main services / products</span>
                  <div class="input-wrap">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M8 6H21M8 12H21M8 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M3 6H3.01M3 12H3.01M3 18H3.01" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>
                    <input id="mainServices" name="mainServices" type="text" placeholder="e.g. Web Design, Construction, Food Menu..." required />
                  </div>
                </label>
              </div>

              <div class="option-section">
                <h3>3. How many pages do you need?</h3>
                <div class="option-grid pages-grid" data-group="pages">
                  <button type="button" class="option-card active" data-value="5 - 10 Pages">
                    <span class="radio-dot"></span>
                    <strong>5 - 10 Pages</strong>
                    <small>Standard website, perfect for most businesses</small>
                  </button>
                  <button type="button" class="option-card" data-value="10 - 15 Pages">
                    <span class="radio-dot"></span>
                    <strong>10 - 15 Pages</strong>
                    <small>More pages for growing businesses</small>
                  </button>
                  <button type="button" class="option-card" data-value="Product Website">
                    <span class="radio-dot"></span>
                    <strong>Product Website</strong>
                    <small>Unlimited product pages</small>
                  </button>
                  <button type="button" class="option-card" data-value="Not Sure">
                    <span class="radio-dot"></span>
                    <strong>Not Sure</strong>
                    <small>We will recommend the best option</small>
                  </button>
                </div>
              </div>

              <div class="option-section">
                <h3>4. What best describes your business?</h3>
                <div class="option-grid business-model-grid" data-group="businessModel">
                  <button type="button" class="option-card icon-card active" data-value="Individual / Small Business">
                    <span class="radio-dot"></span>
                    <i class="model-icon blue-icon">👤</i>
                    <strong>Individual / Small Business</strong>
                  </button>
                  <button type="button" class="option-card icon-card" data-value="Corporate">
                    <span class="radio-dot"></span>
                    <i class="model-icon red-icon">🏢</i>
                    <strong>Corporate</strong>
                  </button>
                  <button type="button" class="option-card icon-card" data-value="Enterprise">
                    <span class="radio-dot"></span>
                    <i class="model-icon purple-icon">🏬</i>
                    <strong>Enterprise</strong>
                  </button>
                  <button type="button" class="option-card icon-card" data-value="Product Business">
                    <span class="radio-dot"></span>
                    <i class="model-icon orange-icon">📦</i>
                    <strong>Product Business</strong>
                  </button>
                  <button type="button" class="option-card icon-card" data-value="E-commerce">
                    <span class="radio-dot"></span>
                    <i class="model-icon green-icon">🛒</i>
                    <strong>E-commerce</strong>
                  </button>
                  <button type="button" class="option-card icon-card" data-value="Other">
                    <span class="radio-dot"></span>
                    <i class="model-icon gray-icon">⋯</i>
                    <strong>Other</strong>
                  </button>
                </div>
              </div>

              <div class="option-section">
                <h3>5. Recommended website path</h3>
                <p class="section-help">Choose one path. No technical platform selection needed here. We will handle the best setup for your website.</p>
                <div class="option-grid path-grid" data-group="websitePath">
                  <button type="button" class="option-card path-card active" data-value="Business Website">
                    <span class="radio-dot"></span>
                    <strong>Business Website</strong>
                    <small>For services, companies, and local businesses</small>
                  </button>
                  <button type="button" class="option-card path-card" data-value="Corporate Website">
                    <span class="radio-dot"></span>
                    <strong>Corporate Website</strong>
                    <small>Professional company profile website</small>
                  </button>
                  <button type="button" class="option-card path-card" data-value="Product Website">
                    <span class="radio-dot"></span>
                    <strong>Product Website</strong>
                    <small>Product catalogue and inquiry website</small>
                  </button>
                  <button type="button" class="option-card path-card" data-value="E-commerce Website">
                    <span class="radio-dot"></span>
                    <strong>E-commerce Website</strong>
                    <small>Online selling website with products</small>
                  </button>
                  <button type="button" class="option-card path-card" data-value="Other / Not Sure">
                    <span class="radio-dot"></span>
                    <strong>Other / Not Sure</strong>
                    <small>Let ecommercesrilanka.lk recommend</small>
                  </button>
                </div>
              </div>

              <div class="suggested-feature">
                <div class="feature-left">
                  <div class="benefit-icon blue">
                    <svg viewBox="0 0 24 24" fill="none"><rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" stroke-width="2"/><path d="M11 18H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                  </div>
                  <div>
                    <h3>Suggested Feature</h3>
                    <strong>Mobile Friendly Website</strong>
                    <p>Every website we build is responsive on mobile, tablet, and desktop.</p>
                  </div>
                </div>
                <span class="included-badge">Included</span>
              </div>

              <label class="field field-full">
                <span>6. Any additional information? <em>(Optional)</em></span>
                <textarea id="additionalInfo" name="additionalInfo" placeholder="Enter any special requirements, preferred colors, reference websites, or important notes..."></textarea>
              </label>

              <div class="form-alert" id="detailsAlert"></div>

              <div class="form-actions">
                <a class="back-btn" href="business-type.php">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M15 6L9 12L15 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  Back
                </a>
                <button type="submit" class="continue-btn">
                  Continue
                  <svg viewBox="0 0 24 24" fill="none"><path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
              </div>
            </form>

            <aside class="side-column reveal up delay-1">
              <div class="flow-card summary-card">
                <h2>Your Project Summary</h2>
                <div class="summary-list">
                  <div class="summary-row">
                    <span>Business</span>
                    <strong id="summaryBusinessName">Not added</strong>
                  </div>
                  <div class="summary-row">
                    <span>Business Category</span>
                    <strong id="summaryBusinessType">Not added</strong>
                  </div>
                  <div class="summary-row">
                    <span>Pages</span>
                    <strong id="summaryPages">5 - 10 Pages</strong>
                  </div>
                  <div class="summary-row">
                    <span>Business Model</span>
                    <strong id="summaryModel">Individual / Small Business</strong>
                  </div>
                  <div class="summary-row">
                    <span>Website Path</span>
                    <strong id="summaryPath">Business Website</strong>
                  </div>
                  <div class="summary-row">
                    <span>Feature</span>
                    <strong>Mobile Friendly Website</strong>
                  </div>
                </div>
              </div>

              <div class="flow-card progress-card">
                <h2>Progress</h2>
                <div class="progress-list">
                  <div class="progress-item done"><span>✓</span><div><strong>Business</strong><small>Completed</small></div></div>
                  <div class="progress-item active"><span>2</span><div><strong>Details</strong><small>In Progress</small></div></div>
                  <div class="progress-item"><span>3</span><div><strong>Theme Selection</strong><small>Upcoming</small></div></div>
                  <div class="progress-item"><span>4</span><div><strong>Summary & Payment</strong><small>Upcoming</small></div></div>
                </div>
              </div>

              <div class="flow-card next-step-card">
                <div class="next-step-icon">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M5 19C8.8 18.3 13.8 15.2 17.8 8.8L15.2 6.2C8.8 10.2 5.7 15.2 5 19Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M14.5 7.5L16.5 5.5C17.7 4.3 19.2 3.8 20 4C20.2 4.8 19.7 6.3 18.5 7.5L16.5 9.5" stroke="currentColor" stroke-width="2"/></svg>
                </div>
                <h2>Next Step</h2>
                <p>Next, choose a website theme that matches your business style.</p>
              </div>
            </aside>
          </div>

          <div class="benefit-strip reveal up">
            <div class="benefit-item">
              <div class="benefit-icon blue">
                <svg viewBox="0 0 24 24" fill="none"><rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" stroke-width="2"/><path d="M11 18H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              </div>
              <div>
                <h3>Mobile Friendly</h3>
                <p>Every website is responsive on all devices.</p>
              </div>
            </div>
            <div class="benefit-item">
              <div class="benefit-icon red">
                <svg viewBox="0 0 24 24" fill="none"><path d="M8 6H21M8 12H21M8 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M3 6H3.01M3 12H3.01M3 18H3.01" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>
              </div>
              <div>
                <h3>Simple Process</h3>
                <p>Clean guided steps without confusion.</p>
              </div>
            </div>
            <div class="benefit-item">
              <div class="benefit-icon blue">
                <svg viewBox="0 0 24 24" fill="none"><path d="M5 19C8.8 18.3 13.8 15.2 17.8 8.8L15.2 6.2C8.8 10.2 5.7 15.2 5 19Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
              </div>
              <div>
                <h3>Fast Delivery</h3>
                <p>Website delivery within 3 days after payment.</p>
              </div>
            </div>
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

  <script src="assets/js/flow.js"></script>
  <script src="assets/js/details.js"></script>
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
