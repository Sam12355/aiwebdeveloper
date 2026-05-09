<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Launch Website | ecommercesrilanka.lk</title>
  <meta name="description" content="Launch your completed website after final payment with ecommercesrilanka.lk." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/auth.css" />
  <link rel="stylesheet" href="assets/css/launch.css" />
  <link rel="stylesheet" href="assets/css/global-v29.css" />
  <link rel="stylesheet" href="assets/css/interactive-ui.css" />
  <link rel="stylesheet" href="assets/css/comfortaa-font.css" />
  <link rel="stylesheet" href="assets/css/sync-automation.css" />
  <link rel="stylesheet" href="assets/css/v52-admin-sync.css" />
  <link rel="stylesheet" href="assets/css/v54-price-sync.css" />
</head>
<body class="ai-step-pages launch-body">
  <header class="launch-header">
    <div class="launch-container launch-header-inner">
      <a href="index.php" class="launch-logo"><img src="assets/img/webdeveloper-logo-header.png" alt="ecommercesrilanka.lk"></a>
      <a href="customer-dashboard.php" class="back-dashboard">Back to Dashboard</a>
    </div>
  </header>

  <main class="launch-main">
    <section class="launch-hero">
      <div class="launch-container">
        <div class="launch-title-row">
          <div>
            <h1>Ready to <span>Launch Your Website</span></h1>
            <p>Final payment is completed. Review the launch setup and click launch to make your website live.</p>
          </div>
          <div class="launch-status">
            <span>Project ID</span>
            <strong id="projectId">WD-PROJECT</strong>
          </div>
        </div>

        <div class="launch-grid">
          <div>
            <div class="launch-card">
              <h2>Website Preview</h2>
              <div class="launch-preview">
                <div class="browser">
                  <div class="browser-top"><span></span><span></span><span></span></div>
                  <div class="browser-body">
                    <div>
                      <h3><span id="previewBusinessName">Your Business</span> Website</h3>
                      <p>Your completed website is ready to be published live.</p>
                      <a href="#">View Website</a>
                    </div>
                    <div class="visual-block"></div>
                  </div>
                </div>
              </div>
              <div class="ready-message">
                <span>✓</span>
                <div>
                  <strong>Everything is ready for launch.</strong>
                  <small>Website files, payment, and final approval are completed.</small>
                </div>
              </div>
            </div>

            <div class="domain-card" style="margin-top:22px">
              <h3>Domain & Website Link</h3>
              <div class="domain-box">
                <div>
                  <span>Website URL</span>
                  <strong id="launchDomain">https://yourbusiness.lk</strong>
                </div>
                <div class="domain-badge">Ready</div>
              </div>
            </div>

            <div class="hosting-card" style="margin-top:22px">
              <h3>Hosting & Renewal</h3>
              <div class="hosting-grid">
                <div class="hosting-item free">
                  <span>First Year Hosting</span>
                  <strong>Free Service</strong>
                </div>
                <div class="hosting-item">
                  <span>Renewal Date</span>
                  <strong id="renewalDate">Next Year</strong>
                </div>
                <div class="hosting-item">
                  <span>2nd Year Renewal</span>
                  <strong>LKR 12,000 annually</strong>
                </div>
                <div class="hosting-item">
                  <span>Website Status</span>
                  <strong>Ready to Launch</strong>
                </div>
              </div>
              <div class="hosting-note">
                First year hosting is provided free as part of the launch service. From the second year onward, annual renewal applies.
              </div>
            </div>
          </div>

          <aside>
            <div class="action-card">
              <div class="launch-icon">🚀</div>
              <h3>Launch Confirmation</h3>
              <p>Click the button below to mark the website as live and activate the customer live website dashboard.</p>
              <button class="launch-button" id="launchNow" type="button">Launch Website Now</button>

              <div class="launch-steps">
                <div class="launch-step"><span>✓</span><div><strong>Final Review Accepted</strong><small>Website approved by customer.</small></div></div>
                <div class="launch-step"><span>✓</span><div><strong>Final Payment Completed</strong><small>Balance payment received.</small></div></div>
                <div class="launch-step"><span>3</span><div><strong>Launch Website</strong><small>Click launch to publish status.</small></div></div>
                <div class="launch-step"><span>4</span><div><strong>Owner Dashboard</strong><small>Live link and renewal details will be active.</small></div></div>
              </div>
            </div>

            <div class="check-card" style="margin-top:22px">
              <h3>Final Checklist</h3>
              <div class="launch-checks">
                <div class="launch-check"><span>✓</span><div><strong>Website Design Completed</strong><small>Final website preview has been approved.</small></div></div>
                <div class="launch-check"><span>✓</span><div><strong>Mobile Friendly</strong><small>Responsive view is ready for launch.</small></div></div>
                <div class="launch-check"><span>✓</span><div><strong>Payment Completed</strong><small>Advance and balance payments are completed.</small></div></div>
                <div class="launch-check"><span>✓</span><div><strong>Hosting Ready</strong><small>First year hosting is free and ready.</small></div></div>
              </div>
            </div>

            <div class="check-card" style="margin-top:22px">
              <h3>Project Summary</h3>
              <div class="launch-checks">
                <div class="launch-check"><span>▣</span><div><strong id="launchBusinessName">Your Business</strong><small>Business name</small></div></div>
                <div class="launch-check"><span>▣</span><div><strong id="launchTheme">Modern Business Theme</strong><small>Selected theme</small></div></div>
                <div class="launch-check"><span>▣</span><div><strong id="launchPath">Small Business Website</strong><small>Website path</small></div></div>
                <div class="launch-check"><span>▣</span><div><strong id="launchPages">5 - 10 Pages</strong><small>Page range</small></div></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </main>

  <div class="launch-overlay" id="launchOverlay">
    <div class="launch-loader">
      <div class="loader-rocket">🚀</div>
      <h2>Launching Your Website</h2>
      <p>Please wait while we activate your live website dashboard.</p>
      <div class="loader-bar"><span></span></div>
    </div>
  </div>

  <div class="launch-toast" id="launchToast">Saved</div>
  <script src="assets/js/backend-client.js"></script>
  <script src="assets/js/session-security.js"></script>
  <script src="assets/js/auth.js"></script>
  <script src="assets/js/profile-data.js"></script>

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

  <script src="assets/js/launch.js"></script>
  <script src="assets/js/lang-switch.js"></script>
  <script src="assets/js/interactive-ui.js"></script>
  <script src="assets/js/data-recorder.js"></script>
  <script src="assets/js/v52-system-sync.js"></script>
  <script src="assets/js/automation-sync.js"></script>
  <script src="assets/js/v54-price-sync.js"></script>
</body>
</html>