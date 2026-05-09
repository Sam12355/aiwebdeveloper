<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Customer Dashboard | ecommercesrilanka.lk</title>
  <meta name="description" content="Track your website project progress, payments, messages, and launch details with ecommercesrilanka.lk." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/auth.css" />
  <link rel="stylesheet" href="assets/css/dashboard.css" />
  <link rel="stylesheet" href="assets/css/global-v29.css" />
  <link rel="stylesheet" href="assets/css/interactive-ui.css" />
  <link rel="stylesheet" href="assets/css/comfortaa-font.css" />
  <link rel="stylesheet" href="assets/css/sync-automation.css" />
  <link rel="stylesheet" href="assets/css/v52-admin-sync.css" />
  <link rel="stylesheet" href="assets/css/v54-price-sync.css" />
</head>
<body class="ai-step-pages dashboard-body">
  <div class="dashboard-shell">
    <aside class="dashboard-sidebar">
      <a href="index.php" class="dashboard-logo"><img src="assets/img/webdeveloper-logo-header.png" alt="ecommercesrilanka.lk"></a>
      <nav class="dash-nav">
        <a href="#" class="active" data-dash-tab="dashboard">⌂ Dashboard</a>
        <a href="#" data-dash-tab="projects">▣ My Projects</a>
        <a href="#" data-dash-tab="messages">✉ Messages</a>
        <a href="#" data-dash-tab="notifications">🔔 Notifications <span class="notification-badge" id="customerNavBadge" style="display:none">0</span></a>
        <a href="#" data-dash-tab="email-setup">✉ Setup Email</a>
        <a href="#" data-dash-tab="change-request">✎ Request Change</a>
        <a href="#" data-dash-tab="payments">▤ Invoices & Payments</a>
        <a href="#" data-dash-tab="profile">♡ Profile Settings</a>
      </nav>
      <div class="dash-gift">
        <strong>Project Confirmed</strong>
        <p>Your website project is now active. We will contact you during the progress.</p>
        <a href="#dashboard" data-dash-tab="dashboard">View Status</a>
      </div>
    </aside>

    <div class="dashboard-main">
      <header class="dash-topbar">
        <div>
          <strong>ecommercesrilanka.lk Client Area</strong>
          <div style="color:#60708e;font-size:13px;margin-top:3px">Secure project dashboard</div>
        </div>
        <div class="dash-top-actions">
          <a href="#notifications" class="notice-dot" data-dash-tab="notifications">🔔 <span class="notification-badge" id="customerTopBadge" style="display:none">0</span></a>
          <div class="dash-user">
            <span class="dash-avatar" id="topInitials">JD</span>
            <span id="topName">Customer</span>
          </div>
        </div>
      </header>

      <main class="dash-content">
        <section id="dashboard" class="dashboard-section active">
          <div class="dash-hero">
            <div>
              <h1>Welcome, <span id="dashName">Customer</span> 👋</h1>
              <p>Your website project for <strong id="dashBusiness">Your Business</strong> is in progress. We will contact you during the progress.</p><p style="margin-top:8px;color:#1d5cff;font-weight:800" id="dashStageText">Current Stage: Planning & First Design</p>
            </div>
            <a href="project-progress.php" class="view-site-btn" id="progressLink">View Project Progress →</a>
          </div>

          <div class="live-dashboard-panel is-hidden" id="liveDashboardPanel">
            <div class="live-panel-head">
              <div class="live-check-icon">✓</div>
              <div>
                <h2>Your Website is Live Now!</h2>
                <p>Congratulations. <strong id="livePanelBusiness">Your Business</strong> website has been launched successfully. Your live website link and ownership details are now available below.</p>
              </div>
            </div>

            <div class="live-link-highlight">
              <div>
                <span>Live Website Link</span>
                <strong id="livePanelUrl">https://yourbusiness.lk</strong>
              </div>
              <a href="#" id="livePanelOpen" target="_blank" rel="noopener">Open Website ↗</a>
            </div>

            <div class="live-details-grid">
              <div class="live-detail-card green"><span>Website Status</span><strong>Live</strong></div>
              <div class="live-detail-card"><span>Hosting</span><strong>Free 1st Year</strong></div>
              <div class="live-detail-card"><span>Renewal Date</span><strong id="livePanelRenewal">Next Year</strong></div>
              <div class="live-detail-card"><span>Renewal</span><strong>LKR 12,000 annually</strong></div>
            </div>

            <div class="live-detail-actions">
              <a href="#dashboard" data-dash-tab="dashboard"><span>⌂</span> Client Dashboard</a>
              <a href="#email-setup" data-dash-tab="email-setup"><span>✉</span> Setup Email Option</a>
              <a href="#change-request" data-dash-tab="change-request"><span>✎</span> Request a Change</a>
            </div>
          </div>

          <div class="dashboard-grid">
            <div>
              <div class="dash-card project-progress">
                <h2>Project Progress</h2>
                <div class="progress-steps">
                  <div class="progress-step done"><span>✓</span><strong>Requirements</strong><small>Completed</small></div>
                  <div class="progress-step active"><span id="dashActiveStageNo">2</span><strong id="dashActiveStageTitle">Design & Planning</strong><small>In Progress</small></div>
                  <div class="progress-step"><span>3</span><strong>Development</strong><small>Pending</small></div>
                  <div class="progress-step"><span>4</span><strong>Review</strong><small>Pending</small></div>
                  <div class="progress-step"><span>5</span><strong>Final Delivery</strong><small>Pending</small></div>
                </div>
                <div class="status-message">
                  <div class="icon">✨</div>
                  <div>
                    <strong id="dashStatusHeadline">Great! Your website project is in progress.</strong>
                    <p id="dashStatusDescription">Our team is preparing the website structure and design based on your selected theme and business details.</p>
                    <a href="project-progress.php" style="display:inline-flex;margin-top:10px;color:#1d5cff;font-weight:900;text-decoration:none">Open full progress page →</a>
                  </div>
                </div>
              </div>

              <div class="dash-card">
                <h3>Project Timeline</h3>
                <div class="timeline-list">
                  <div class="timeline-item done">
                    <span class="timeline-icon">✓</span>
                    <div><h4>Requirements Submitted</h4><p>You have submitted the project details and selected a theme.</p></div>
                    <span class="timeline-date">Completed</span>
                  </div>
                  <div class="timeline-item active">
                    <span class="timeline-icon">✎</span>
                    <div><h4>Design & Planning</h4><p>We are creating the first website layout and project structure.</p></div>
                    <span class="timeline-date">Now</span>
                  </div>
                  <div class="timeline-item">
                    <span class="timeline-icon">&lt;/&gt;</span>
                    <div><h4>Development</h4><p>Our developers will start building your website pages.</p></div>
                    <span class="timeline-date">Upcoming</span>
                  </div>
                  <div class="timeline-item">
                    <span class="timeline-icon">☑</span>
                    <div><h4>Review & Feedback</h4><p>You will review the demo website and share feedback.</p></div>
                    <span class="timeline-date">Upcoming</span>
                  </div>
                  <div class="timeline-item">
                    <span class="timeline-icon">🚀</span>
                    <div><h4>Final Delivery</h4><p>After approval and final payment, your website will go live.</p></div>
                    <span class="timeline-date">Upcoming</span>
                  </div>
                </div>
              </div>

              <div class="dash-actions">
                <a href="project-progress.php" class="dash-action"><span>⏱</span> Project Progress</a>
                <a href="#messages" class="dash-action" data-dash-tab="messages"><span>✉</span> View Messages</a>
                <a href="#payments" class="dash-action" data-dash-tab="payments"><span>▤</span> Payments</a>
                <a href="#profile" class="dash-action" data-dash-tab="profile"><span>♡</span> Profile</a>
              </div>
            </div>

            <aside>
              <div class="dash-card countdown-box">
                <div class="countdown-title">⏱ Time Remaining</div>
                <div class="countdown-row">
                  <div class="time-unit"><strong id="countDays">02</strong><span>Days</span></div>
                  <div class="time-unit"><strong id="countHours">14</strong><span>Hours</span></div>
                  <div class="time-unit"><strong id="countMinutes">36</strong><span>Minutes</span></div>
                  <div class="time-unit"><strong id="countSeconds">00</strong><span>Seconds</span></div>
                </div>
                <div style="position:relative;z-index:1;margin-top:14px;font-size:13px;color:rgba(255,255,255,.86);line-height:1.6">
                  <div>Started: <strong id="dashboardStartTime">Loading...</strong></div>
                  <div>Target Delivery: <strong id="dashboardDeadlineTime">Loading...</strong></div>
                  <div data-countdown-expired style="display:none;color:#ffe8e8;font-weight:900;margin-top:6px">Delivery time reached. Please check latest project status.</div>
                </div>
              </div>

              <div class="dash-card" style="margin-top:22px">
                <h3>Project Details</h3>
                <div class="summary-table">
                  <div class="summary-row"><span>Project Name</span><strong id="projectName">Business Website</strong></div>
                  <div class="summary-row"><span>Business</span><strong id="projectBusiness">Your Business</strong></div>
                  <div class="summary-row"><span>Selected Theme</span><strong id="projectTheme">Modern Business</strong></div>
                  <div class="summary-row"><span>Website Path</span><strong id="projectPackage">Small Business Website</strong></div>
                  <div class="summary-row"><span>Business Model</span><strong id="projectModel">Individual / Small Business</strong></div>
                  <div class="summary-row"><span>Pages</span><strong id="projectPages">5 - 10 Pages</strong></div>
                  <div class="summary-row"><span>Status</span><strong><span class="status-pill">In Progress</span></strong></div>
                </div>
                <div style="position:relative;z-index:1;margin-top:14px;font-size:13px;color:rgba(255,255,255,.86);line-height:1.6">
                  <div>Started: <strong id="dashboardStartTime">Loading...</strong></div>
                  <div>Target Delivery: <strong id="dashboardDeadlineTime">Loading...</strong></div>
                  <div data-countdown-expired style="display:none;color:#ffe8e8;font-weight:900;margin-top:6px">Delivery time reached. Please check latest project status.</div>
                </div>
              </div>

              <div class="dash-card" style="margin-top:22px">
                <h3>Pending From You</h3>
                <div class="pending-list">
                  <div class="pending-item"><div><span>Extra business images</span><br><small>Upload if available</small></div><strong>Optional</strong></div>
                  <div class="pending-item"><div><span>Additional notes</span><br><small>Share special requirements</small></div><strong>Optional</strong></div>
                  <div class="pending-item done"><div><span>Advance payment</span><br><small>Received successfully</small></div><strong>Done</strong></div>
                </div>
                <div class="upload-box" style="margin-top:16px">
                  <input type="file" id="dashUpload" multiple>
                  <label for="dashUpload">Upload extra files</label>
                  <p id="uploadText" style="margin:8px 0 0;color:#60708e">Images, PDF, DOC or logo files</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="projects" class="dashboard-section">
          <div class="dash-card">
            <h2>My Projects</h2>
            <div class="summary-table">
              <div class="summary-row"><span>Project</span><strong id="projectName2">Your Website Project</strong></div>
              <div class="summary-row"><span>Status</span><strong><span class="status-pill">In Progress</span></strong></div>
              <div class="summary-row"><span>Delivery Target</span><strong>Within 3 Days</strong></div>
              <div class="summary-row"><span>Live URL</span><strong id="liveUrl">Preparing...</strong></div>
            </div>
          </div>
        </section>


        <section id="notifications" class="dashboard-section">
          <div class="dash-card">
            <div class="notification-actions">
              <div>
                <h2 style="margin-bottom:6px">Realtime Notifications</h2>
                <p style="color:#5c6b87;margin:0">Project updates from the admin panel will appear here instantly.</p>
              </div>
              <button type="button" id="customerMarkAllRead">Mark All Read</button>
            </div>
            <div class="notification-list" id="customerNotificationList"></div>
          </div>
        </section>

        <section id="messages" class="dashboard-section">
          <div class="dash-card">
            <h2>Messages</h2>
            <div class="messages-list">
              <div class="message-item"><span class="message-avatar">WD</span><div><strong>ecommercesrilanka.lk Team</strong><p>Your payment is confirmed. We have started your website planning.</p></div><span class="message-time">Just now</span></div>
              <div class="message-item"><span class="message-avatar">AI</span><div><strong>System Update</strong><p>We will contact you during the progress and update the dashboard at key stages.</p></div><span class="message-time">Today</span></div>
            </div>
          </div>
        </section>

        <section id="payments" class="dashboard-section">
          <div class="dash-card">
            <h2>Invoices & Payments</h2>
            <div class="payment-mini">
              <div class="pay-status"><span>Invoice Number</span><strong id="invoiceNo">WD-INV</strong></div>
              <div class="pay-status"><span>Advance Payment 50%</span><strong class="paid">Paid</strong></div>
              <div class="pay-status"><span>Balance Payment 50%</span><strong class="pending">Due before launch</strong></div>
              <div class="pay-status"><span>Total Project Price</span><strong>LKR 40,000.00</strong></div>
            </div>
          </div>
        </section>


        <section id="email-setup" class="dashboard-section">
          <div class="dash-card">
            <h2>Setup Email Option</h2>
            <p style="color:#5c6b87;margin-top:-8px">Request professional email accounts for your live website domain.</p>
            <div class="email-setup-grid">
              <form class="dashboard-form" id="emailSetupForm">
                <label>Preferred Email Address
                  <input id="preferredEmail" type="text" placeholder="Example: info" required>
                </label>
                <label>Alternative Email Address
                  <input id="alternativeEmail" type="text" placeholder="Example: sales">
                </label>
                <label>Forward Emails To
                  <input id="forwardEmail" type="email" placeholder="yourname@example.com" required>
                </label>
                <label>Notes
                  <textarea id="emailNotes" placeholder="Any extra email setup request..."></textarea>
                </label>
                <button class="dashboard-submit" type="submit">Submit Email Setup Request</button>
                <p class="dashboard-note-success" id="emailSetupSaved"></p>
              </form>
              <div class="dash-card" style="box-shadow:none">
                <h3>Email Setup Summary</h3>
                <div class="summary-table">
                  <div class="summary-row"><span>Website Domain</span><strong id="emailSetupDomain">yourbusiness.lk</strong></div>
                  <div class="summary-row"><span>Suggested Email</span><strong id="suggestedEmail">info@yourbusiness.lk</strong></div>
                  <div class="summary-row"><span>Status</span><strong><span class="status-pill">Request Available</span></strong></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="change-request" class="dashboard-section">
          <div class="dash-card">
            <h2>Request a Change</h2>
            <p style="color:#5c6b87;margin-top:-8px">Submit a website change request after launch.</p>
            <div class="change-request-grid">
              <form class="dashboard-form" id="changeRequestForm">
                <label>Change Type
                  <select id="changeType" required>
                    <option value="">Select change type</option>
                    <option>Text change</option>
                    <option>Image change</option>
                    <option>Contact details update</option>
                    <option>Add new section</option>
                    <option>Other</option>
                  </select>
                </label>
                <label>Page / Section
                  <input id="changeSection" type="text" placeholder="Example: Home page, Services section" required>
                </label>
                <label>Change Details
                  <textarea id="changeDetails" placeholder="Explain the change you need..." required></textarea>
                </label>
                <button class="dashboard-submit" type="submit">Submit Change Request</button>
                <p class="dashboard-note-success" id="changeRequestSaved"></p>
              </form>
              <div class="dash-card" style="box-shadow:none">
                <h3>Change Request Status</h3>
                <div class="summary-table" id="changeRequestSummary">
                  <div class="summary-row"><span>Status</span><strong>No request submitted</strong></div>
                  <div class="summary-row"><span>Website</span><strong id="changeRequestWebsite">https://yourbusiness.lk</strong></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="profile" class="dashboard-section">
          <div class="dash-card">
            <h2>Profile Settings</h2>
            <form class="profile-form" id="profileForm">
              <label>Business Name
                <input id="profileBusinessInput" type="text" required>
              </label>
              <label>Your Name
                <input id="profileNameInput" type="text" required>
              </label>
              <label>Contact Number
                <input id="profilePhoneInput" type="text" required>
              </label>
              <label>Email
                <input id="profileEmailInput" type="email" required>
              </label>
              <button class="save-profile" type="submit">Save Profile</button>
              <p class="save-note" id="profileSaved"></p>
            </form>
          </div>
        </section>
      </main>
    </div>
  </div>

  <script src="assets/js/bank-payment.js"></script>
  <script src="assets/js/profile-data.js"></script>
  <script src="assets/js/project-timer.js"></script>
  <script src="assets/js/realtime-notifications.js"></script>
  <script src="assets/js/dashboard.js"></script>
  <script src="assets/js/backend-client.js"></script>

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

  <script src="assets/js/session-security.js"></script>

  <div class="receipt-popup-backdrop" id="paymentReceiptPopup">
    <div class="receipt-popup">
      <h2>Payment Receipt Submitted</h2>
      <p>Your bank payment slip has been sent to admin for verification. You can also upload another receipt image below if needed.</p>
      <div class="receipt-upload-box">
        <input id="dashboardReceiptFile" type="file" accept="image/*,.pdf">
        <label for="dashboardReceiptFile">Upload / Replace Receipt</label>
        <p class="receipt-filename" id="dashboardReceiptName">No receipt selected</p>
        <div class="receipt-preview" id="dashboardReceiptPreview"></div>
      </div>
      <div class="receipt-popup-actions">
        <button class="secondary" type="button" id="closeReceiptPopup">Close</button>
        <button class="primary" type="button" id="submitDashboardReceipt">Send Receipt</button>
      </div>
      <p class="dashboard-note-success" id="dashboardReceiptSaved"></p>
    </div>
  </div>

  <script src="assets/js/lang-switch.js"></script>
  <script src="assets/js/interactive-ui.js"></script>
  <script src="assets/js/data-recorder.js"></script>
  <script src="assets/js/v52-system-sync.js"></script>
  <script src="assets/js/automation-sync.js"></script>
  <script src="assets/js/v54-price-sync.js"></script>
</body>
</html>