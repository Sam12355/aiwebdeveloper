<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Dashboard | ecommercesrilanka.lk/</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/admin.css">
  <link rel="stylesheet" href="assets/css/global-v29.css" />
  <link rel="stylesheet" href="assets/css/comfortaa-font.css" />
  <link rel="stylesheet" href="assets/css/admin-enhancements.css" />
  <link rel="stylesheet" href="assets/css/sync-automation.css" />
  <link rel="stylesheet" href="assets/css/v52-admin-sync.css" />
  <link rel="stylesheet" href="assets/css/v54-price-sync.css" />
  <link rel="stylesheet" href="assets/css/messaging.css" />
</head>
<body class="admin-body">
  <div class="admin-shell">
    <aside class="admin-sidebar">
      <a href="index.php" class="admin-logo"><img src="assets/img/webdeveloper-logo-header.png" alt="ecommercesrilanka.lk"></a>
      <nav class="admin-nav">
        <a href="#" class="active" data-admin-tab="overview">⌂ Overview</a>
        <a href="#" data-admin-tab="projects">▣ Projects</a>
        <a href="#" data-admin-tab="project-update">↻ Stage Updates</a>
        <a href="#" data-admin-tab="payments">▤ Payments</a>
        <a href="#" data-admin-tab="staff">👥 Jobs & Staff</a>
        <a href="#" data-admin-tab="requests">✎ Requests</a>
        <a href="#" data-admin-tab="notifications">🔔 Notifications <span class="notification-badge" id="adminNavBadge" style="display:none">0</span></a>
        <a href="#" data-admin-tab="messages">✉ Messages</a>
        <a href="#" data-admin-tab="uploads">⇧ Uploads</a>
        <a href="index.php">↩ Back to Website</a>
      </nav>
      <div class="admin-note">
        <strong>Prototype Admin</strong>
        <p>This admin dashboard works with browser storage now. Backend files are included for PHP/MySQL production conversion.</p>
      </div>
    </aside>

    <div class="admin-main">
      <header class="admin-topbar">
        <div><strong>ecommercesrilanka.lk Admin Area</strong><div style="color:#60708e;font-size:13px;margin-top:3px">Lead and project management</div></div>
        <a href="#notifications" class="notice-dot" data-admin-tab="notifications">🔔 <span class="notification-badge" id="adminTopBadge" style="display:none">0</span></a><div class="wd-language-switch"><a class="wd-lang-btn" href="#">සිංහල</a><span class="wd-lang-sep">/</span><a class="wd-lang-btn" href="#">English</a></div><div class="admin-user"><span class="admin-avatar">AD</span><span>Admin</span></div>
      </header>

      <main class="admin-content">
        <section class="admin-hero">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage leads, projects, progress stages, files, customer requests, and notifications. Login is disabled for current testing, so you can access all admin sections directly.</p>
          </div>
          <div class="admin-search">
            <input id="adminSearch" type="search" placeholder="Search project, customer, phone...">
            <button id="adminSearchBtn">Search</button>
          </div>
        </section>

        <div class="admin-stats">
          <button class="stat-card stat-link-card" type="button" data-admin-jump="pending-leads"><span>Total Leads</span><strong id="statLeads">0</strong><em>▣</em><small>Open leads</small></button>
          <button class="stat-card stat-link-card" type="button" data-admin-jump="payments"><span>Paid Projects</span><strong id="statPaid">0</strong><em>✓</em><small>Open payments</small></button>
          <button class="stat-card stat-link-card" type="button" data-admin-jump="project-update"><span>In Progress</span><strong id="statProgress">0</strong><em>↻</em><small>Update stages</small></button>
          <button class="stat-card stat-link-card" type="button" data-admin-jump="projects"><span>Live Websites</span><strong id="statLive">0</strong><em>🚀</em><small>Open live list</small></button>
        </div>

        <section id="overview" class="admin-section active">

          <div class="overview-action-grid">
            <button type="button" class="overview-action-card blue" data-admin-jump="pending-leads">
              <span>⏳</span><strong>Pending Leads</strong><small>Customers who reached invoice page</small>
            </button>
            <button type="button" class="overview-action-card green" data-admin-jump="project-update">
              <span>↻</span><strong>Update Project Status</strong><small>Manage current stage and customer message</small>
            </button>
            <button type="button" class="overview-action-card red" data-admin-jump="payments">
              <span>💳</span><strong>Payment Records</strong><small>Receipts and verification</small>
            </button>
            <button type="button" class="overview-action-card dark" data-admin-jump="client-inbox">
              <span>✉</span><strong>Client Inbox</strong><small>Communicate with customers</small>
            </button>
          </div>
          <div class="admin-grid">
            <div class="admin-card">
              <h2>Recent Projects</h2>
              <table class="project-table">
                <thead><tr><th>Project</th><th>Customer</th><th>Website</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody id="projectsBody"></tbody>
              </table>
            </div>
            <aside class="admin-card">
              <h3>Admin Direct Page Links</h3>
              <div class="stage-board" style="margin-bottom:22px">
                <a class="stage-item" href="admin-dashboard.php#overview" style="text-decoration:none;color:inherit"><div><strong>Overview</strong><small>Main admin summary</small></div><span class="status-badge">Open</span></a>
                <a class="stage-item" href="admin-dashboard.php#projects" style="text-decoration:none;color:inherit"><div><strong>Projects</strong><small>All customer jobs</small></div><span class="status-badge">Open</span></a>
                <a class="stage-item" href="admin-dashboard.php#payments" style="text-decoration:none;color:inherit"><div><strong>Payments</strong><small>Receipts and bank verification</small></div><span class="status-badge">Open</span></a>
                <a class="stage-item" href="admin-dashboard.php#notifications" style="text-decoration:none;color:inherit"><div><strong>Notifications</strong><small>Realtime customer alerts</small></div><span class="status-badge">Open</span></a>
                <a class="stage-item" href="admin-dashboard.php#staff" style="text-decoration:none;color:inherit"><div><strong>Jobs & Staff</strong><small>Assign staff jobs</small></div><span class="status-badge">Open</span></a>
              </div>

              <h3>Selected Project</h3>
              <div class="stage-board">
                <div class="stage-item"><div><strong id="selectedProjectTitle">Project</strong><small id="selectedProjectMeta">Project ID</small></div><span class="status-badge">Selected</span></div>
                <div class="stage-item"><div><strong>Next Action</strong><small>Update project stage or send customer message.</small></div></div>
              </div>
            </aside>
          </div>
        </section>

        <section id="projects" class="admin-section">
          <div class="admin-card">
            <h2>All Projects</h2>
            <table class="project-table">
              <thead><tr><th>Project</th><th>Customer</th><th>Website</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody id="projectsBodyDuplicate"></tbody>
            </table>
          </div>
        </section>

        <section id="project-update" class="admin-section">
          <div class="project-update-layout">
            <div class="admin-card project-update-main">
              <div class="admin-section-heading">
                <div>
                  <h2>Project Status Manager</h2>
                  <p>Select a project, update the stage, write a customer dashboard message, and sync it instantly.</p>
                </div>
                <span class="status-badge green">Realtime Sync</span>
              </div>

              <form class="admin-form status-manager-form" id="stageUpdateForm">
                <div class="form-two-col">
                  <label>Project
                    <select id="stageProjectSelect"></select>
                  </label>
                  <label>Project ID
                    <input id="stageProjectId" type="text" readonly>
                  </label>
                </div>

                <label>Project Stage
                  <select id="stageSelect" required>
                    <option value="lead">Lead Captured</option>
                    <option value="pending_lead">Pending Lead</option>
                    <option value="planning">Planning</option>
                    <option value="design">Homepage Demo Preparation</option>
                    <option value="demo">Demo Ready</option>
                    <option value="development">Development</option>
                    <option value="final">Final Review</option>
                    <option value="final_payment">Final Payment Pending</option>
                    <option value="ready_to_launch">Ready to Launch</option>
                    <option value="live">Live</option>
                  </select>
                </label>

                <div class="status-progress-editor">
                  <label>Progress Percentage
                    <input id="stageProgressPercent" type="range" min="0" max="100" step="1" value="20">
                  </label>
                  <strong id="stageProgressValue">20%</strong>
                </div>

                <label>Customer Update Message
                  <textarea id="stageMessage" placeholder="Write a clear update message for the customer dashboard..."></textarea>
                </label>

                <div class="status-quick-actions">
                  <button type="button" data-stage-template="planning">Planning Started</button>
                  <button type="button" data-stage-template="design">Demo Preparation</button>
                  <button type="button" data-stage-template="demo">Demo Ready</button>
                  <button type="button" data-stage-template="final">Final Review Ready</button>
                  <button type="button" data-stage-template="live">Website Live</button>
                </div>

                <button class="admin-submit green" type="submit">Save Stage Update & Notify Customer</button>
              </form>
            </div>

            <aside class="admin-card project-update-side">
              <h3>Selected Project Snapshot</h3>
              <div class="stage-board" id="projectUpdateSnapshot">
                <div class="stage-item"><div><strong id="updateSnapBusiness">Select a project</strong><small id="updateSnapCustomer">Customer details will appear here</small></div><span class="status-badge">Waiting</span></div>
              </div>

              <h3 style="margin-top:22px">Stage Flow</h3>
              <div class="stage-timeline-admin">
                <div data-stage-dot="lead"><span>1</span><div><strong>Lead</strong><small>Customer details captured</small></div></div>
                <div data-stage-dot="pending_lead"><span>2</span><div><strong>Pending Lead</strong><small>Invoice page reached</small></div></div>
                <div data-stage-dot="planning"><span>3</span><div><strong>Planning</strong><small>After advance payment</small></div></div>
                <div data-stage-dot="design"><span>4</span><div><strong>Demo Preparation</strong><small>Homepage demo work</small></div></div>
                <div data-stage-dot="demo"><span>5</span><div><strong>Demo Ready</strong><small>Customer reviews demo</small></div></div>
                <div data-stage-dot="development"><span>6</span><div><strong>Development</strong><small>Full website build</small></div></div>
                <div data-stage-dot="final"><span>7</span><div><strong>Final Review</strong><small>Before final payment</small></div></div>
                <div data-stage-dot="live"><span>8</span><div><strong>Live</strong><small>Website launched</small></div></div>
              </div>
            </aside>
          </div>
        </section>


        <section id="payments" class="admin-section">
          <div class="admin-grid">
            <div class="admin-card">
              <h2>Bank Payment Receipts</h2>
              <div class="admin-payment-list" id="adminPaymentList"></div>
            </div>
            <aside class="admin-card">
              <h3>Payment Process</h3>
              <div class="stage-board">
                <div class="stage-item"><div><strong>1. Customer uploads receipt</strong><small>Receipt appears here for checking.</small></div></div>
                <div class="stage-item"><div><strong>2. Admin verifies bank account</strong><small>Check Commercial Bank account transaction.</small></div></div>
                <div class="stage-item"><div><strong>3. Mark as Payment Received</strong><small>Project starts after advance payment is confirmed.</small></div></div>
              </div>
            </aside>
          </div>
        </section>

        <section id="staff" class="admin-section">
          <div class="admin-grid">
            <div class="admin-card">
              <h2>Assign Job to Staff</h2>
              <form class="admin-form" id="staffAssignForm">
                <label>Project
                  <select id="assignProjectSelect" required></select>
                </label>
                <label>Staff Member
                  <select id="assignStaffSelect" required></select>
                </label>
                <label>Job Type
                  <select id="assignJobType" required>
                    <option>Website Planning</option>
                    <option>UI Design</option>
                    <option>WordPress Development</option>
                    <option>Content Upload</option>
                    <option>Testing</option>
                    <option>Launch Setup</option>
                  </select>
                </label>
                <label>Instructions
                  <textarea id="assignInstructions" placeholder="Brief the staff member about this job..."></textarea>
                </label>
                <button class="admin-submit green" type="submit">Assign Job</button>
              </form>
            </div>
            <aside class="admin-card">
              <h3>Staff Members</h3>
              <div class="staff-grid">
                <form class="admin-form" id="staffCreateForm">
                  <label>Name
                    <input id="staffName" type="text" required>
                  </label>
                  <label>Role
                    <input id="staffRole" type="text" placeholder="Designer / Developer" required>
                  </label>
                  <button class="admin-submit" type="submit">Add Staff</button>
                </form>
                <div class="staff-list" id="staffList"></div>
              </div>
              <h3 style="margin-top:22px">Assignments</h3>
              <div class="staff-list" id="assignmentList"></div>
            </aside>
          </div>
        </section>


        <section id="notifications" class="admin-section">
          <div class="admin-card">
            <div class="notification-actions">
              <div>
                <h2 style="margin-bottom:6px">Realtime Notifications</h2>
                <p style="color:#5c6b87;margin:0">Customer actions and system alerts will appear here instantly.</p>
              </div>
              <button type="button" id="adminMarkAllRead">Mark All Read</button>
            </div>
            <div class="notification-list" id="adminNotificationList"></div>
          </div>
        </section>

        <section id="requests" class="admin-section">
          <div class="admin-card">
            <h2>Customer Requests</h2>
            <div class="request-list" id="requestsList"></div>
          </div>
        </section>

        <section id="messages" class="admin-section">
          <div class="admin-msg-layout">
            <div class="admin-card admin-msg-inbox">
              <h2>Customer Inbox</h2>
              <div class="msg-project-list" id="adminMsgProjectList">
                <div class="msg-loading">Loading conversations...</div>
              </div>
            </div>
            <div class="admin-card admin-msg-thread-panel">
              <div class="admin-msg-thread-header">
                <h3 id="adminMsgThreadTitle">Select a conversation</h3>
                <span id="adminMsgThreadMeta"></span>
              </div>
              <div class="message-thread" id="adminMessageThread">
                <div class="msg-empty">Select a project from the inbox to view messages.</div>
              </div>
              <form class="message-compose-form" id="adminSendMessageForm">
                <div class="message-compose">
                  <input type="hidden" id="adminMsgProjectId">
                  <input type="hidden" id="adminMsgProjectEmail">
                  <input type="hidden" id="adminMsgProjectKey">
                  <textarea id="adminMessageInput" placeholder="Reply to customer..." rows="3" disabled></textarea>
                  <button type="submit" class="msg-send-btn" disabled>Send Reply</button>
                </div>
                <p class="msg-send-status" id="adminMsgStatus"></p>
              </form>
            </div>
          </div>
        </section>

        <section id="uploads" class="admin-section">
          <div class="admin-grid">
            <div class="admin-card">
              <h2>Upload / Record Project Files</h2>
              <form class="admin-form" id="adminUploadForm">
                <label>Project ID
                  <input id="uploadProjectId" type="text" readonly>
                </label>
                <label>Files
                  <input id="adminUploadFiles" type="file" multiple>
                </label>
                <label>Notes
                  <textarea id="uploadNotes" placeholder="Demo link, final files, update notes..."></textarea>
                </label>
                <button class="admin-submit" type="submit">Save Upload Record</button>
              </form>
            </div>
            <aside class="admin-card">
              <h3>Upload Records</h3>
              <div class="request-list" id="uploadList"></div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  </div>
  <div class="toast" id="adminToast">Saved</div>
  <script src="assets/js/bank-payment.js"></script>
  <script src="assets/js/realtime-notifications.js"></script>

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

  <script src="assets/js/admin.js"></script>
  <script src="assets/js/messaging.js?v=<?php echo @filemtime(__DIR__ . '/assets/js/messaging.js'); ?>"></script>
  <script src="assets/js/admin-enhancements.js"></script>

  <script src="assets/js/lang-switch.js"></script>
  <script src="assets/js/data-recorder.js"></script>
  <script src="assets/js/v52-system-sync.js?v=<?php echo @filemtime(__DIR__ . '/assets/js/v52-system-sync.js'); ?>"></script>
  <script src="assets/js/automation-sync.js"></script>
  <script src="assets/js/v52-admin-manager.js"></script>
  <script src="assets/js/v53-admin-ux.js"></script>
  <script src="assets/js/v54-price-sync.js?v=<?php echo @filemtime(__DIR__ . '/assets/js/v54-price-sync.js'); ?>"></script>
  <script src="assets/js/admin-db-sync.js"></script>
</body>
</html>