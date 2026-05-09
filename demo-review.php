<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Demo Review | ecommercesrilanka.lk</title>
  <meta name="description" content="Review your website demo and approve or request changes before development continues." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/auth.css" />
  <link rel="stylesheet" href="assets/css/demo-review.css" />
  <link rel="stylesheet" href="assets/css/global-v29.css" />
  <link rel="stylesheet" href="assets/css/interactive-ui.css" />
  <link rel="stylesheet" href="assets/css/comfortaa-font.css" />
  <link rel="stylesheet" href="assets/css/sync-automation.css" />
  <link rel="stylesheet" href="assets/css/v52-admin-sync.css" />
  <link rel="stylesheet" href="assets/css/v54-price-sync.css" />
</head>
<body class="ai-step-pages demo-body">
  <header class="demo-header">
    <div class="demo-container demo-header-inner">
      <a href="index.php" class="demo-logo"><img src="assets/img/webdeveloper-logo-header.png" alt="ecommercesrilanka.lk"></a>
      <a href="project-progress.php" class="back-dashboard">Back to Progress</a>
    </div>
  </header>

  <main class="demo-main">
    <section class="demo-hero">
      <div class="demo-container">
        <div class="demo-title-row">
          <div>
            <h1>Your Website <span>Demo is Ready</span></h1>
            <p>Please review the demo preview. You can approve it to continue development or request changes.</p>
          </div>
          <div class="demo-status-box">
            <span>Project ID</span>
            <strong id="demoProjectId">WD-PROJECT</strong>
          </div>
        </div>

        <div class="demo-grid">
          <div class="preview-panel">
            <div class="preview-head">
              <h2>Demo Preview</h2>
              <div class="device-switch">
                <button class="device-btn active" type="button" data-device="desktop">Desktop</button>
                <button class="device-btn" type="button" data-device="mobile">Mobile</button>
              </div>
            </div>

            <div class="demo-browser">
              <div class="demo-browser-top">
                <div class="browser-dots"><span></span><span></span><span></span></div>
                <div class="demo-url" id="demoUrl">https://yourbusiness.lk/demo-preview</div>
              </div>

              <div class="demo-screen" id="demoScreen">
                <div class="site-top">
                  <div class="site-logo"><span id="demoBusinessName">Business</span></div>
                  <div class="site-nav"><span>Home</span><span>About</span><span>Services</span><span>Contact</span></div>
                  <div class="site-cta">Contact</div>
                </div>
                <div class="site-hero">
                  <div>
                    <h3>Professional Website for <span id="demoBusinessName2">Your Business</span></h3>
                    <p>A modern, mobile-friendly website demo prepared using your selected theme and business details.</p>
                    <a href="#">Get Started</a>
                  </div>
                  <div class="site-visual"></div>
                </div>
                <div class="site-section">
                  <div class="section-grid">
                    <div class="service-card"><span>01</span><h4>Business Profile</h4><p>Clean presentation of your business details.</p></div>
                    <div class="service-card"><span>02</span><h4>Services</h4><p>Simple service sections for customer inquiries.</p></div>
                    <div class="service-card"><span>03</span><h4>Contact</h4><p>Easy contact details and inquiry direction.</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside>
            <div class="review-panel">
              <h2>Review Checklist</h2>
              <div class="review-checklist">
                <div class="review-item"><span>✓</span><div><strong>Business Details Added</strong><small>Your business name and basic details are applied.</small></div></div>
                <div class="review-item"><span>✓</span><div><strong>Selected Theme Applied</strong><small>The selected visual direction has been used.</small></div></div>
                <div class="review-item"><span>✓</span><div><strong>Mobile-Friendly Preview</strong><small>Desktop and mobile views are available.</small></div></div>
                <div class="review-item"><span>✓</span><div><strong>Ready for Development</strong><small>Approve to continue the website development stage.</small></div></div>
              </div>
            </div>

            <div class="feedback-panel">
              <h3>Feedback or Change Request</h3>
              <textarea id="demoFeedback" placeholder="Example: Change hero image, update service names, adjust colors, add another section..."></textarea>
              <div class="action-stack">
                <button class="demo-action secondary" id="saveFeedback" type="button">Save Feedback Draft</button>
                <button class="demo-action red" id="requestChanges" type="button">Request Changes</button>
                <button class="demo-action primary" id="approveDemo" type="button">Approve Demo & Continue Development</button>
              </div>
            </div>

            <div class="info-panel">
              <h3>Project Summary</h3>
              <div class="summary-list">
                <div class="summary-row"><span>Website Path</span><strong id="demoWebsitePath">Small Business Website</strong></div>
                <div class="summary-row"><span>Selected Theme</span><strong id="demoTheme">Modern Business</strong></div>
                <div class="summary-row"><span>Pages</span><strong id="demoPages">5 - 10 Pages</strong></div>
                <div class="summary-row"><span>Current Stage</span><strong>Demo Ready</strong></div>
              </div>
            </div>

            <div class="next-panel">
              <h3>Next After Approval</h3>
              <div class="next-list">
                <div class="next-item"><span>1</span><div><strong>Website Development</strong><small>Our team will start developing inner pages and content sections.</small></div></div>
                <div class="next-item"><span>2</span><div><strong>Final Testing</strong><small>Mobile view, layout, and basic functions will be checked.</small></div></div>
                <div class="next-item"><span>3</span><div><strong>Final Review</strong><small>You will review the completed website before launch.</small></div></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </main>

  <div class="demo-toast" id="demoToast">Saved</div>
  <script src="assets/js/backend-client.js"></script>
  <script src="assets/js/session-security.js"></script>
  <script src="assets/js/auth.js"></script>

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

  <script src="assets/js/demo-review.js"></script>
  <script src="assets/js/lang-switch.js"></script>
  <script src="assets/js/interactive-ui.js"></script>
  <script src="assets/js/data-recorder.js"></script>
  <script src="assets/js/v52-system-sync.js"></script>
  <script src="assets/js/automation-sync.js"></script>
  <script src="assets/js/v54-price-sync.js"></script>
</body>
</html>