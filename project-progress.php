<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Website Project Progress | ecommercesrilanka.lk</title>
  <meta name="description" content="Track your 3-day website project progress with ecommercesrilanka.lk." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/auth.css" />
  <link rel="stylesheet" href="assets/css/project-progress.css" />
  <link rel="stylesheet" href="assets/css/global-v29.css" />
  <link rel="stylesheet" href="assets/css/interactive-ui.css" />
  <link rel="stylesheet" href="assets/css/comfortaa-font.css" />
  <link rel="stylesheet" href="assets/css/sync-automation.css" />
  <link rel="stylesheet" href="assets/css/v52-admin-sync.css" />
  <link rel="stylesheet" href="assets/css/v54-price-sync.css" />
</head>
<body class="ai-step-pages progress-body">
  <header class="progress-header">
    <div class="progress-container progress-header-inner">
      <a href="index.php" class="progress-logo"><img src="assets/img/webdeveloper-logo-header.png" alt="ecommercesrilanka.lk"></a>
      <a href="customer-dashboard.php" class="flow-action secondary" style="width:auto;min-height:46px">Back to Dashboard</a>
    </div>
  </header>

  <main class="progress-main">
    <section class="progress-hero">
      <div class="progress-container">
        <div class="progress-title-row">
          <div>
            <h1>Your Website is <span>Now in Progress</span></h1>
            <p>We will contact you during the progress. You can check the project status here anytime.</p>
          </div>
          <div class="project-id-box">
            <span>Project ID</span>
            <strong id="invoiceNo">WD-PROJECT</strong>
          </div>
        </div>

        <div class="stage-grid">
          <div>
            <div class="stage-card">
              <div class="stage-head">
                <div class="stage-pill"><span class="pulse-dot"></span><span id="stagePillText">Planning Started</span></div>
                <strong id="businessName">Your Business</strong>
              </div>
              <h2 id="stageTitle">Day 1 - Planning & First Design</h2>
              <p id="stageMessage">We are reviewing your business details and preparing the website structure.</p>

              <div class="build-visual">
                <div class="browser-bar"></div>
                <div class="visual-lines"><span></span><span></span><span></span></div>
                <div class="visual-preview"></div>
              </div>

              <div class="progress-bar-wrap">
                <div class="progress-labels">
                  <span>Website Progress</span>
                  <span id="stagePercent">28%</span>
                </div>
                <div class="main-progress"><span id="mainProgressBar"></span></div>
              </div>
            </div>

            <div class="status-panel">
              <div class="status-steps">
                <div class="status-step active"><span>1</span><strong>Planning</strong><small>Day 1</small></div>
                <div class="status-step"><span>2</span><strong>Design</strong><small>Day 1</small></div>
                <div class="status-step"><span>3</span><strong>Demo</strong><small>Review</small></div>
                <div class="status-step"><span>4</span><strong>Development</strong><small>Day 2</small></div>
                <div class="status-step"><span>5</span><strong>Final</strong><small>Day 3</small></div>
              </div>
            </div>

            <div class="quick-card-grid">
              <div class="task-card">
                <h3>Current Tasks</h3>
                <div class="task-list" id="taskList"></div>
              </div>
              <div class="activity-card">
                <h3>Activity Updates</h3>
                <div class="activity-list" id="activityList"></div>
              </div>
            </div>
          </div>

          <aside>
            <div class="count-card">
              <h3>3-Day Countdown</h3>
              <p>Delivery timeline started after your advance payment and essential details.</p>
              <div class="countdown-grid">
                <div class="count-unit"><strong id="countDays">02</strong><span>Days</span></div>
                <div class="count-unit"><strong id="countHours">14</strong><span>Hours</span></div>
                <div class="count-unit"><strong id="countMinutes">36</strong><span>Minutes</span></div>
                <div class="count-unit"><strong id="countSeconds">00</strong><span>Seconds</span></div>
              </div>
            </div>

            <div class="action-card" style="margin-top:22px">
              <h3>Project Summary</h3>
              <div class="task-list">
                <div class="task-item done"><span>✓</span><div><strong>Website Path</strong><small id="projectPath">Small Business Website</small></div></div>
                <div class="task-item done"><span>✓</span><div><strong>Selected Theme</strong><small id="selectedTheme">Selected Theme</small></div></div>
                <div class="task-item done"><span>✓</span><div><strong>Advance Payment</strong><small>50% paid successfully</small></div></div>
              </div>
            </div>

            <div class="action-card" style="margin-top:22px">
              <h3>Customer Actions</h3>
              <div class="action-buttons">
                <label class="flow-action secondary" for="uploadProgressFiles">Upload Files</label>
                <input id="uploadProgressFiles" type="file" multiple style="display:none">
                <a href="demo-review.php" class="flow-action primary" id="demoBtn" style="display:none">View Demo</a>
                <a href="final-review.php" class="flow-action red" id="finalBtn" style="display:none">Final Review</a>
                <button class="flow-action secondary" type="button" id="nextStageBtn">Move to Next Stage</button>
                <button class="flow-action secondary" type="button" id="resetStageBtn">Reset Progress</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </main>

  <div class="status-toast" id="statusToast">Updated</div>
  <script src="assets/js/backend-client.js"></script>
  <script src="assets/js/session-security.js"></script>
  <script src="assets/js/auth.js"></script>
  <script src="assets/js/project-timer.js"></script>

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

  <script src="assets/js/project-progress.js"></script>
  <script src="assets/js/lang-switch.js"></script>
  <script src="assets/js/interactive-ui.js"></script>
  <script src="assets/js/data-recorder.js"></script>
  <script src="assets/js/v52-system-sync.js"></script>
  <script src="assets/js/automation-sync.js"></script>
  <script src="assets/js/v54-price-sync.js"></script>
</body>
</html>