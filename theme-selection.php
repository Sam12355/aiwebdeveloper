<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Theme Selection | Webdeveloper.lk</title>
  <meta name="description" content="Choose a website theme for your 3-day website project with Webdeveloper.lk." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css" />
  <link rel="stylesheet" href="assets/css/flow.css" />
  <link rel="stylesheet" href="assets/css/auth.css" />
  <link rel="stylesheet" href="assets/css/theme-gallery.css" />
  <link rel="stylesheet" href="assets/css/global-v29.css" />
  <link rel="stylesheet" href="assets/css/ai-step-transition.css" />
  <link rel="stylesheet" href="assets/css/interactive-ui.css" />
  <link rel="stylesheet" href="assets/css/comfortaa-font.css" />
  <link rel="stylesheet" href="assets/css/sync-automation.css" />
  <link rel="stylesheet" href="assets/css/v52-admin-sync.css" />
  <link rel="stylesheet" href="assets/css/v54-price-sync.css" />
</head>
<body class="ai-step-pages">
  <div class="flow-page theme-page">
    <header class="site-header">
      <div class="container header-wrap">
        <a href="index.php" class="brand" aria-label="Webdeveloper.lk home">
          <img src="assets/img/webdeveloper-logo-header.png" alt="Webdeveloper.lk" />
        </a>
        <nav class="main-nav flow-nav">
          <a href="index.php">Home</a>
          <a href="#faq">FAQ</a>
        </nav>
      </div>
    </header>

    <main class="flow-main theme-main">
      <canvas id="flow-particles" aria-hidden="true"></canvas>
      <div class="flow-bg glow-blue"></div>
      <div class="flow-bg glow-red"></div>

      <section class="flow-hero theme-hero">
        <div class="container">
          <div class="theme-title-row reveal up">
            <div class="flow-title-block theme-title-block">
              <h1>Choose Your Website <span>Theme</span></h1>
              <p>Select a clean design style for your website. We will use this as the starting point for your 3-day website build.</p>
            </div>
            <div class="ai-theme-badge idle-float-soft">
              <span>AI</span>
              <strong>Theme suggestion ready</strong>
            </div>
          </div>

          <div class="flow-stepper theme-stepper reveal up delay-1">
            <div class="stepper-item complete"><span>✓</span><strong>Business</strong></div>
            <div class="stepper-line active"></div>
            <div class="stepper-item complete"><span>✓</span><strong>Details</strong></div>
            <div class="stepper-line active"></div>
            <div class="stepper-item active"><span>3</span><strong>Theme</strong></div>
            <div class="stepper-line"></div>
            <div class="stepper-item"><span>4</span><strong>Payment</strong></div>
          </div>

          <div class="theme-layout">
            <form id="themeSelectionForm" class="flow-card theme-picker-card reveal up">
              <div class="theme-toolbar">
                <div>
                  <h2>Theme Selection</h2>
                  <p>Choose one theme and continue to create your website.</p>
                </div>
                <div class="selected-theme-pill" id="selectedThemePill">Modern Business selected</div>
              </div>

              <div class="theme-filter-bar" id="themeFilterBar">
                <button type="button" class="filter-btn active" data-filter="recommended">Recommended</button>
                <button type="button" class="filter-btn" data-filter="business">Business</button>
                <button type="button" class="filter-btn" data-filter="corporate">Corporate</button>
                <button type="button" class="filter-btn" data-filter="ecommerce">Ecommerce</button>
                <button type="button" class="filter-btn" data-filter="creative">Creative</button>
                <button type="button" class="filter-btn" data-filter="hospitality">Hotel / Food</button>
                <button type="button" class="filter-btn" data-filter="product">Product</button>
                <button type="button" class="filter-btn" data-filter="minimal">Minimal</button>
                <button type="button" class="filter-btn" data-filter="all">All</button>
              </div>

              <div class="theme-gallery-meta"><div class="theme-gallery-count">Showing <strong id="themeVisibleCount">0</strong> themes</div><div class="theme-help-note">Each category has 20 original theme ideas. Select a theme and click Create My Website.</div></div>
              <div class="theme-grid" id="themeGrid"></div>

              <label class="field theme-notes-field">
                <span>Additional theme notes <em>(optional)</em></span>
                <textarea id="themeNotes" placeholder="Example: I like blue color, clean layout, modern business look..."></textarea>
                <small class="counter"><b id="themeNotesCount">0</b> / 300</small>
              </label>

              <div id="themeAlert" class="form-alert"></div>

              <div class="form-actions theme-actions">
                <a href="details.php" class="btn-back">← Back</a>
                <button type="submit" class="btn-continue">Create My Website →</button>
              </div>
            </form>

            <aside class="theme-sidebar reveal up delay-1">
              <div class="flow-card progress-card theme-progress-card">
                <h2>Project Progress</h2>
                <div class="progress-list">
                  <div class="progress-item done"><span>✓</span><div><strong>Business Type</strong><small>Completed</small></div></div>
                  <div class="progress-item done"><span>✓</span><div><strong>Contact Details</strong><small>Completed</small></div></div>
                  <div class="progress-item done"><span>✓</span><div><strong>Business Details</strong><small>Completed</small></div></div>
                  <div class="progress-item active"><span>4</span><div><strong>Theme Selection</strong><small>In Progress</small></div></div>
                  <div class="progress-item"><span>5</span><div><strong>Invoice & Payment</strong><small>Upcoming</small></div></div>
                </div>
              </div>

              <div class="flow-card summary-card theme-summary-card">
                <h2>Your Project Summary</h2>
                <div class="summary-list">
                  <div class="summary-row"><span>Business Type</span><strong id="themeSummaryBusinessType">Small Business Website</strong></div>
                  <div class="summary-row"><span>Business Model</span><strong id="themeSummaryModel">Individual / Small Business</strong></div>
                  <div class="summary-row"><span>Pages</span><strong id="themeSummaryPages">5 - 10 Pages</strong></div>
                  <div class="summary-row"><span>Selected Theme</span><strong id="themeSummaryTheme">Modern Business</strong></div>
                  <div class="summary-row"><span>Feature</span><strong>Mobile Friendly Website</strong></div>
                  <div class="summary-row"><span>Delivery</span><strong>Within 3 Days</strong></div>
                </div>
              </div>

              <div class="flow-card next-step-card theme-next-card">
                <div class="next-step-icon">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M5 12L10 17L20 7" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <h2>Next Step</h2>
                <p>After selecting a theme, we will generate your invoice and prepare the 50% advance payment page.</p>
                <button type="submit" form="themeSelectionForm" class="theme-floating-create-btn">Create My Website →</button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  </div>

  <div class="theme-preview-modal" id="themeModal" aria-hidden="true">
    <div class="modal-backdrop" data-close-modal></div>
    <div class="modal-card">
      <button type="button" class="modal-close" data-close-modal>×</button>
      <div class="modal-preview" id="modalPreview"></div>
      <h3 id="modalTitle">Modern Business</h3>
      <p id="modalStyle">Clean • Professional • Modern</p>
      <button type="button" class="btn-continue" id="modalChooseBtn">Choose This Theme</button>
    </div>
  </div>

  <script src="assets/js/flow.js"></script>
  <script src="assets/js/theme-selection.js"></script>
  <script src="assets/js/backend-client.js"></script>
  <script src="assets/js/session-security.js"></script>

<footer class="wd-common-footer">
  <div class="wd-footer-inner">
    <a href="index.php" class="wd-footer-logo"><img src="assets/img/webdeveloper-logo-footer.png" alt="Webdeveloper.lk"></a>
    <nav class="wd-footer-links">
      <a href="terms-and-conditions.php">Terms and Conditions</a>
      <a href="privacy-policy.php">Privacy Policy</a>
      <a href="security-policy.php">Security Policy</a>
    </nav>
    <div class="wd-footer-language"></div>
    <div class="wd-footer-copy">2026 All rights reserved. Fully Copyright protected.</div>
  </div>
</footer>

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
