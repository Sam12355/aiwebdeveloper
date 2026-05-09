<!DOCTYPE html>

<html lang="si">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>පාරිභෝගික ඩෑෂ්බෝඩ් | Webdeveloper.lk සිංහල</title>
<meta content="Track your website project progress, payments, messages, and launch details with Webdeveloper.lk." name="description"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="../assets/css/auth.css" rel="stylesheet"/>
<link href="../assets/css/dashboard.css" rel="stylesheet"/>
<link href="../assets/css/global-v29.css" rel="stylesheet"/>
<link href="../assets/css/lang-si.css" rel="stylesheet"/>  <link rel="stylesheet" href="../assets/css/interactive-ui.css" />
  <link rel="stylesheet" href="../assets/css/comfortaa-font.css" />
  <link rel="stylesheet" href="../assets/css/sync-automation.css" />
  <link rel="stylesheet" href="../assets/css/v52-admin-sync.css" />
  <link rel="stylesheet" href="../assets/css/v54-price-sync.css" />
</head>
<body class="ai-step-pages dashboard-body">
<div class="dashboard-shell">
<aside class="dashboard-sidebar">
<a class="dashboard-logo" href="index.php"><img alt="Webdeveloper.lk" src="../assets/img/webdeveloper-logo-header.png"/></a>
<nav class="dash-nav">
<a class="active" data-dash-tab="dashboard" href="#">⌂ ඩෑෂ්බෝඩ්</a>
<a data-dash-tab="projects" href="#">▣ My ව්‍යාපෘති</a>
<a data-dash-tab="messages" href="#">✉ පණිවිඩ</a>
<a data-dash-tab="notifications" href="#">🔔 දැනුම්දීම් <span class="notification-badge" id="customerNavBadge" style="display:none">0</span></a>
<a data-dash-tab="email-setup" href="#">✉ ඊමේල් සැකසීම</a>
<a data-dash-tab="change-request" href="#">✎ වෙනසක් ඉල්ලන්න</a>
<a data-dash-tab="payments" href="#">▤ ඉන්වොයිසි සහ ගෙවීම්</a>
<a data-dash-tab="profile" href="#">♡ පැතිකඩ සැකසුම්</a>
</nav>
<div class="dash-gift">
<strong>ව්‍යාපෘතිය තහවුරු කර ඇත</strong>
<p>ඔබගේ වෙබ් අඩවි ව්‍යාපෘතිය දැන් සක්‍රීයයි. ප්‍රගතිය අතරතුර අපි ඔබව සම්බන්ධ කරගන්නෙමු.</p>
<a data-dash-tab="dashboard" href="#dashboard">තත්ත්වය බලන්න</a>
</div>
</aside>
<div class="dashboard-main">
<header class="dash-topbar">
<div>
<strong>Webdeveloper.lk පාරිභෝගික ප්‍රදේශය</strong>
<div style="color:#60708e;font-size:13px;margin-top:3px">ආරක්ෂිත ව්‍යාපෘති ඩෑෂ්බෝඩ්</div>
</div>
<div class="dash-top-actions">
<a class="notice-dot" data-dash-tab="notifications" href="#notifications">🔔 <span class="notification-badge" id="customerTopBadge" style="display:none">0</span></a>
<div class="dash-user">
<span class="dash-avatar" id="topInitials">JD</span>
<span id="topName">පාරිභෝගිකයා</span>
</div>
</div>
</header>
<main class="dash-content">
<section class="dashboard-section active" id="dashboard">
<div class="dash-hero">
<div>
<h1>ආයුබෝවන්, <span id="dashName">පාරිභෝගිකයා</span> 👋</h1>
<p>ඔබගේ වෙබ් අඩවි ව්‍යාපෘතිය <strong id="dashBusiness">ඔබගේ ව්‍යාපාරය</strong> දැන් ක්‍රියාත්මක වේ. ප්‍රගතිය අතරතුර අපි ඔබව සම්බන්ධ කරගන්නෙමු.</p><p id="dashStageText" style="margin-top:8px;color:#1d5cff;font-weight:800">වත්මන් අදියර: සැලසුම් කිරීම සහ පළමු නිර්මාණය</p>
</div>
<a class="view-site-btn" href="project-progress.php" id="progressLink">ව්‍යාපෘති ප්‍රගතිය බලන්න →</a>
</div>
<div class="live-dashboard-panel is-hidden" id="liveDashboardPanel">
<div class="live-panel-head">
<div class="live-check-icon">✓</div>
<div>
<h2>ඔබගේ වෙබ් අඩවිය දැන් සජීවීයි!</h2>
<p>සුභ පැතුම්. <strong id="livePanelBusiness">ඔබගේ ව්‍යාපාරය</strong> වෙබ් අඩවිය සාර්ථකව දියත් කර ඇත. ඔබගේ සජීවී වෙබ් අඩවි සබැඳිය සහ හිමිකාරීත්ව විස්තර පහතින් ලබාගත හැක.</p>
</div>
</div>
<div class="live-link-highlight">
<div>
<span>සජීවී වෙබ් අඩවි සබැඳිය</span>
<strong id="livePanelUrl">https://yourbusiness.lk</strong>
</div>
<a href="#" id="livePanelOpen" rel="noopener" target="_blank">වෙබ් අඩවිය විවෘත කරන්න ↗</a>
</div>
<div class="live-details-grid">
<div class="live-detail-card green"><span>වෙබ් අඩවි තත්ත්වය</span><strong>සජීවී</strong></div>
<div class="live-detail-card"><span>හෝස්ටිං</span><strong>පළමු වසර නොමිලේ</strong></div>
<div class="live-detail-card"><span>නවීකරණ දිනය</span><strong id="livePanelRenewal">ඊළඟ වසර</strong></div>
<div class="live-detail-card"><span>නවීකරණය</span><strong>වාර්ෂිකව LKR 12,000</strong></div>
</div>
<div class="live-detail-actions">
<a data-dash-tab="dashboard" href="#dashboard"><span>⌂</span> පාරිභෝගික ඩෑෂ්බෝඩ්</a>
<a data-dash-tab="email-setup" href="#email-setup"><span>✉</span> ඊමේල් සැකසුම් විකල්පය</a>
<a data-dash-tab="change-request" href="#change-request"><span>✎</span> වෙනස් කිරීමක් ඉල්ලන්න</a>
</div>
</div>
<div class="dashboard-grid">
<div>
<div class="dash-card project-progress">
<h2>ව්‍යාපෘති ප්‍රගතිය</h2>
<div class="progress-steps">
<div class="progress-step done"><span>✓</span><strong>අවශ්‍යතා</strong><small>සම්පූර්ණයි</small></div>
<div class="progress-step active"><span id="dashActiveStageNo">2</span><strong id="dashActiveStageTitle">නිර්මාණය සහ සැලසුම් කිරීම</strong><small>ක්‍රියාත්මකයි</small></div>
<div class="progress-step"><span>3</span><strong>සංවර්ධනය</strong><small>බලාපොරොත්තුවෙන්</small></div>
<div class="progress-step"><span>4</span><strong>සමාලෝචනය</strong><small>බලාපොරොත්තුවෙන්</small></div>
<div class="progress-step"><span>5</span><strong>අවසාන බෙදාහැරීම</strong><small>බලාපොරොත්තුවෙන්</small></div>
</div>
<div class="status-message">
<div class="icon">✨</div>
<div>
<strong id="dashStatusHeadline">හොඳයි! ඔබගේ වෙබ් අඩවි ව්‍යාපෘතිය ක්‍රියාත්මක වෙමින් පවතී.</strong>
<p id="dashStatusDescription">ඔබ තෝරාගත් තේමාව සහ ව්‍යාපාර විස්තර අනුව අපගේ කණ්ඩායම වෙබ් අඩවි ව්‍යුහය සහ නිර්මාණය සකස් කරමින් සිටී.</p>
<a href="project-progress.php" style="display:inline-flex;margin-top:10px;color:#1d5cff;font-weight:900;text-decoration:none">සම්පූර්ණ ප්‍රගති පිටුව විවෘත කරන්න →</a>
</div>
</div>
</div>
<div class="dash-card">
<h3>ව්‍යාපෘති කාලරේඛාව</h3>
<div class="timeline-list">
<div class="timeline-item done">
<span class="timeline-icon">✓</span>
<div><h4>අවශ්‍යතා යොමු කර ඇත</h4><p>ඔබ ව්‍යාපෘති විස්තර යොමු කර තේමාවක් තෝරාගෙන ඇත.</p></div>
<span class="timeline-date">සම්පූර්ණයි</span>
</div>
<div class="timeline-item active">
<span class="timeline-icon">✎</span>
<div><h4>නිර්මාණය සහ සැලසුම් කිරීම</h4><p>අපි පළමු වෙබ් අඩවි සැකැස්ම සහ ව්‍යාපෘති ව්‍යුහය සකස් කරමින් සිටිමු.</p></div>
<span class="timeline-date">Now</span>
</div>
<div class="timeline-item">
<span class="timeline-icon">&lt;/&gt;</span>
<div><h4>සංවර්ධනය</h4><p>අපගේ සංවර්ධකයින් ඔබගේ වෙබ් අඩවි පිටු සාදීම ආරම්භ කරනු ඇත.</p></div>
<span class="timeline-date">ඉදිරියේදී</span>
</div>
<div class="timeline-item">
<span class="timeline-icon">☑</span>
<div><h4>සමාලෝචනය සහ ප්‍රතිචාර</h4><p>ඔබ ඩෙමෝ වෙබ් අඩවිය සමාලෝචනය කර ප්‍රතිචාර ලබාදෙනු ඇත.</p></div>
<span class="timeline-date">ඉදිරියේදී</span>
</div>
<div class="timeline-item">
<span class="timeline-icon">🚀</span>
<div><h4>අවසාන බෙදාහැරීම</h4><p>අනුමැතිය සහ අවසාන ගෙවීමෙන් පසු ඔබගේ වෙබ් අඩවිය සජීවී වේ.</p></div>
<span class="timeline-date">ඉදිරියේදී</span>
</div>
</div>
</div>
<div class="dash-actions">
<a class="dash-action" href="project-progress.php"><span>⏱</span> ව්‍යාපෘති ප්‍රගතිය</a>
<a class="dash-action" data-dash-tab="messages" href="#messages"><span>✉</span> පණිවිඩ බලන්න</a>
<a class="dash-action" data-dash-tab="payments" href="#payments"><span>▤</span> ගෙවීම්</a>
<a class="dash-action" data-dash-tab="profile" href="#profile"><span>♡</span> පැතිකඩ</a>
</div>
</div>
<aside>
<div class="dash-card countdown-box">
<div class="countdown-title">⏱ ඉතිරි කාලය</div>
<div class="countdown-row">
<div class="time-unit"><strong id="countDays">02</strong><span>දින</span></div>
<div class="time-unit"><strong id="countHours">14</strong><span>පැය</span></div>
<div class="time-unit"><strong id="countMinutes">36</strong><span>මිනිත්තු</span></div>
<div class="time-unit"><strong id="countSeconds">00</strong><span>තත්පර</span></div>
</div>
<div style="position:relative;z-index:1;margin-top:14px;font-size:13px;color:rgba(255,255,255,.86);line-height:1.6">
<div>ආරම්භ වූ වේලාව: <strong id="dashboardStartTime">පූරණය වෙමින්...</strong></div>
<div>ඉලක්ක බෙදාහැරීම: <strong id="dashboardDeadlineTime">පූරණය වෙමින්...</strong></div>
<div data-countdown-expired="" style="display:none;color:#ffe8e8;font-weight:900;margin-top:6px">බෙදාහැරීමේ කාලය ළඟා වී ඇත. කරුණාකර නවතම ව්‍යාපෘති තත්ත්වය පරීක්ෂා කරන්න.</div>
</div>
</div>
<div class="dash-card" style="margin-top:22px">
<h3>ව්‍යාපෘතිය විස්තර</h3>
<div class="summary-table">
<div class="summary-row"><span>ව්‍යාපෘති නාමය</span><strong id="projectName">ව්‍යාපාරය වෙබ් අඩවිය</strong></div>
<div class="summary-row"><span>ව්‍යාපාරය</span><strong id="projectBusiness">ඔබගේ ව්‍යාපාරය</strong></div>
<div class="summary-row"><span>තෝරාගත් තේමාව</span><strong id="projectTheme">නවීන ව්‍යාපාරය</strong></div>
<div class="summary-row"><span>වෙබ් අඩවි මාර්ගය</span><strong id="projectPackage">කුඩා ව්‍යාපාරික වෙබ් අඩවිය</strong></div>
<div class="summary-row"><span>ව්‍යාපාර ආකෘතිය</span><strong id="projectModel">පුද්ගලික / කුඩා ව්‍යාපාර</strong></div>
<div class="summary-row"><span>පිටු</span><strong id="projectPages">පිටු 5 - 10</strong></div>
<div class="summary-row"><span>තත්ත්වය</span><strong><span class="status-pill">ක්‍රියාත්මකයි</span></strong></div>
</div>
<div style="position:relative;z-index:1;margin-top:14px;font-size:13px;color:rgba(255,255,255,.86);line-height:1.6">
<div>ආරම්භ වූ වේලාව: <strong id="dashboardStartTime">පූරණය වෙමින්...</strong></div>
<div>ඉලක්ක බෙදාහැරීම: <strong id="dashboardDeadlineTime">පූරණය වෙමින්...</strong></div>
<div data-countdown-expired="" style="display:none;color:#ffe8e8;font-weight:900;margin-top:6px">බෙදාහැරීමේ කාලය ළඟා වී ඇත. කරුණාකර නවතම ව්‍යාපෘති තත්ත්වය පරීක්ෂා කරන්න.</div>
</div>
</div>
<div class="dash-card" style="margin-top:22px">
<h3>ඔබගෙන් බලාපොරොත්තුවෙන්</h3>
<div class="pending-list">
<div class="pending-item"><div><span>අමතර ව්‍යාපාරික පින්තූර</span><br/><small>ඇත්නම් උඩුගත කරන්න</small></div><strong>අමතර</strong></div>
<div class="pending-item"><div><span>අමතර සටහන්</span><br/><small>විශේෂ අවශ්‍යතා බෙදාගන්න</small></div><strong>අමතර</strong></div>
<div class="pending-item done"><div><span>අත්තිකාරම් ගෙවීම</span><br/><small>සාර්ථකව ලැබී ඇත</small></div><strong>සම්පූර්ණයි</strong></div>
</div>
<div class="upload-box" style="margin-top:16px">
<input id="dashUpload" multiple="" type="file"/>
<label for="dashUpload">අමතර ගොනු උඩුගත කරන්න</label>
<p id="uploadText" style="margin:8px 0 0;color:#60708e">පින්තූර, PDF, DOC හෝ ලාංඡන ගොනු</p>
</div>
</div>
</aside>
</div>
</section>
<section class="dashboard-section" id="projects">
<div class="dash-card">
<h2>My ව්‍යාපෘති</h2>
<div class="summary-table">
<div class="summary-row"><span>ව්‍යාපෘතිය</span><strong id="projectName2">ඔබගේ වෙබ් අඩවි ව්‍යාපෘතිය</strong></div>
<div class="summary-row"><span>තත්ත්වය</span><strong><span class="status-pill">ක්‍රියාත්මකයි</span></strong></div>
<div class="summary-row"><span>ඉලක්ක බෙදාහැරීම</span><strong>දින 3ක් තුළ</strong></div>
<div class="summary-row"><span>සජීවී URL</span><strong id="liveUrl">සූදානම් කරමින්...</strong></div>
</div>
</div>
</section>
<section class="dashboard-section" id="notifications">
<div class="dash-card">
<div class="notification-actions">
<div>
<h2 style="margin-bottom:6px">සජීවී දැනුම්දීම්</h2>
<p style="color:#5c6b87;margin:0">පරිපාලක පැනලයෙන් එන ව්‍යාපෘති යාවත්කාලීන මෙහි වහාම පෙන්වයි.</p>
</div>
<button id="customerMarkAllRead" type="button">සියල්ල කියවූ ලෙස සලකන්න</button>
</div>
<div class="notification-list" id="customerNotificationList"></div>
</div>
</section>
<section class="dashboard-section" id="messages">
<div class="dash-card">
<h2>පණිවිඩ</h2>
<div class="messages-list">
<div class="message-item"><span class="message-avatar">WD</span><div><strong>Webdeveloper.lk කණ්ඩායම</strong><p>ඔබගේ ගෙවීම තහවුරු කර ඇත. අපි ඔබගේ වෙබ් අඩවි සැලසුම් කිරීම ආරම්භ කර ඇත.</p></div><span class="message-time">දැන්ම</span></div>
<div class="message-item"><span class="message-avatar">AI</span><div><strong>පද්ධති යාවත්කාලීන කිරීම</strong><p>ප්‍රගතිය අතරතුර අපි ඔබව සම්බන්ධ කරගෙන ප්‍රධාන අදියරවලදී ඩෑෂ්බෝඩ් යාවත්කාලීන කරන්නෙමු.</p></div><span class="message-time">අද</span></div>
</div>
</div>
</section>
<section class="dashboard-section" id="payments">
<div class="dash-card">
<h2>ඉන්වොයිසි සහ ගෙවීම්</h2>
<div class="payment-mini">
<div class="pay-status"><span>ඉන්වොයිසි අංකය</span><strong id="invoiceNo">WD-INV</strong></div>
<div class="pay-status"><span>අත්තිකාරම් ගෙවීම 50%</span><strong class="paid">ගෙවා ඇත</strong></div>
<div class="pay-status"><span>ඉතිරි ගෙවීම 50%</span><strong class="pending">දියත් කිරීමට පෙර ගෙවිය යුතුයි</strong></div>
<div class="pay-status"><span>මුළු ව්‍යාපෘති මිල</span><strong>LKR 40,000.00</strong></div>
</div>
</div>
</section>
<section class="dashboard-section" id="email-setup">
<div class="dash-card">
<h2>ඊමේල් සැකසුම් විකල්පය</h2>
<p style="color:#5c6b87;margin-top:-8px">ඔබගේ සජීවී වෙබ් අඩවි ඩොමේනය සඳහා වෘත්තීය ඊමේල් ගිණුම් ඉල්ලන්න.</p>
<div class="email-setup-grid">
<form class="dashboard-form" id="emailSetupForm">
<label>කැමති ඊමේල් ලිපිනය
                  <input id="preferredEmail" placeholder="Example: info" required="" type="text"/>
</label>
<label>විකල්ප ඊමේල් ලිපිනය
                  <input id="alternativeEmail" placeholder="Example: sales" type="text"/>
</label>
<label>ඊමේල් යොමු කළ යුතු ලිපිනය
                  <input id="forwardEmail" placeholder="yourname@example.com" required="" type="email"/>
</label>
<label>සටහන්
                  <textarea id="emailNotes" placeholder="අමතර ඊමේල් සැකසුම් ඉල්ලීමක් තිබේ නම්..."></textarea>
</label>
<button class="dashboard-submit" type="submit">ඊමේල් සැකසුම් ඉල්ලීම යවන්න</button>
<p class="dashboard-note-success" id="emailSetupSaved"></p>
</form>
<div class="dash-card" style="box-shadow:none">
<h3>ඊමේල් සැකසුම් සාරාංශය</h3>
<div class="summary-table">
<div class="summary-row"><span>වෙබ් අඩවිය Domain</span><strong id="emailSetupDomain">yourbusiness.lk</strong></div>
<div class="summary-row"><span>යෝජිත ඊමේල් ලිපිනය</span><strong id="suggestedEmail">info@yourbusiness.lk</strong></div>
<div class="summary-row"><span>තත්ත්වය</span><strong><span class="status-pill">ඉල්ලීම ලබාගත හැක</span></strong></div>
</div>
</div>
</div>
</div>
</section>
<section class="dashboard-section" id="change-request">
<div class="dash-card">
<h2>වෙනස් කිරීමක් ඉල්ලන්න</h2>
<p style="color:#5c6b87;margin-top:-8px">දියත් කිරීමෙන් පසු වෙබ් අඩවි වෙනස්කම් ඉල්ලීමක් යවන්න.</p>
<div class="change-request-grid">
<form class="dashboard-form" id="changeRequestForm">
<label>වෙනස් කිරීමේ වර්ගය
                  <select id="changeType" required="">
<option value="">වෙනස් කිරීමේ වර්ගය තෝරන්න</option>
<option>පෙළ වෙනස් කිරීම</option>
<option>පින්තූර වෙනස් කිරීම</option>
<option>සම්බන්ධතා විස්තර යාවත්කාලීන කිරීම</option>
<option>නව කොටසක් එක් කරන්න</option>
<option>වෙනත්</option>
</select>
</label>
<label>පිටුව / කොටස
                  <input id="changeSection" placeholder="Example: මුල් පිටුව page, සේවා section" required="" type="text"/>
</label>
<label>වෙනස් කිරීමේ විස්තර
                  <textarea id="changeDetails" placeholder="ඔබට අවශ්‍ය වෙනස්කම විස්තර කරන්න..." required=""></textarea>
</label>
<button class="dashboard-submit" type="submit">වෙනස් කිරීමේ ඉල්ලීම යවන්න</button>
<p class="dashboard-note-success" id="changeRequestSaved"></p>
</form>
<div class="dash-card" style="box-shadow:none">
<h3>වෙනස් කිරීමේ ඉල්ලීමේ තත්ත්වය</h3>
<div class="summary-table" id="changeRequestSummary">
<div class="summary-row"><span>තත්ත්වය</span><strong>ඉල්ලීමක් යොමු කර නැත</strong></div>
<div class="summary-row"><span>වෙබ් අඩවිය</span><strong id="changeRequestWebsite">https://yourbusiness.lk</strong></div>
</div>
</div>
</div>
</div>
</section>
<section class="dashboard-section" id="profile">
<div class="dash-card">
<h2>පැතිකඩ සැකසුම්</h2>
<form class="profile-form" id="profileForm">
<label>ව්‍යාපාර නාමය
                <input id="profileBusinessInput" required="" type="text"/>
</label>
<label>ඔබගේ නම
                <input id="profileNameInput" required="" type="text"/>
</label>
<label>දුරකථන අංකය
                <input id="profilePhoneInput" required="" type="text"/>
</label>
<label>Email
                <input id="profileEmailInput" required="" type="email"/>
</label>
<button class="save-profile" type="submit">පැතිකඩ සුරකින්න</button>
<p class="save-note" id="profileSaved"></p>
</form>
</div>
</section>
</main>
</div>
</div>
<script src="../assets/js/bank-payment.js"></script>
<script src="../assets/js/profile-data.js"></script>
<script src="../assets/js/project-timer.js"></script>
<script src="../assets/js/realtime-notifications.js"></script>
<script src="../assets/js/dashboard.js"></script>
<script src="../assets/js/backend-client.js"></script>
<footer class="wd-common-footer">
<div class="wd-footer-inner">
<a class="wd-footer-logo" href="index.php"><img alt="Webdeveloper.lk" src="../assets/img/webdeveloper-logo-footer.png"/></a>
<nav class="wd-footer-links">
<a href="terms-and-conditions.php">නියම සහ කොන්දේසි</a>
<a href="privacy-policy.php">රහස්‍යතා ප්‍රතිපත්තිය</a>
<a href="security-policy.php">ආරක්ෂණ ප්‍රතිපත්තිය</a>
</nav>
<div class="wd-footer-language"></div>
<div class="wd-footer-copy">2026 සියලු හිමිකම් ඇවිරිණි. සම්පූර්ණයෙන්ම කතුහිමිකම් ආරක්ෂිතයි.</div>
</div>
</footer>
<script src="../assets/js/session-security.js"></script>
<div class="receipt-popup-backdrop" id="paymentReceiptPopup">
<div class="receipt-popup">
<h2>ගෙවීම් රිසිට්පත යොමු කර ඇත</h2>
<p>ඔබගේ බැංකු ගෙවීම් slip එක තහවුරු කිරීම සඳහා පරිපාලක වෙත යවා ඇත. අවශ්‍ය නම් පහතින් තවත් රිසිට්පත් රූපයක් උඩුගත කළ හැක.</p>
<div class="receipt-upload-box">
<input accept="image/*,.pdf" id="dashboardReceiptFile" type="file"/>
<label for="dashboardReceiptFile">රිසිට්පත උඩුගත / වෙනස් කරන්න</label>
<p class="receipt-filename" id="dashboardReceiptName">රිසිට්පතක් තෝරාගෙන නොමැත</p>
<div class="receipt-preview" id="dashboardReceiptPreview"></div>
</div>
<div class="receipt-popup-actions">
<button class="secondary" id="closeReceiptPopup" type="button">වසන්න</button>
<button class="primary" id="submitDashboardReceipt" type="button">රිසිට්පත යවන්න</button>
</div>
<p class="dashboard-note-success" id="dashboardReceiptSaved"></p>
</div>
</div>
<script src="../assets/js/lang-switch.js"></script>
<script src="../assets/js/lang-si.js"></script>
  <script src="../assets/js/interactive-ui.js"></script>
  <script src="../assets/js/data-recorder.js"></script>
  <script src="../assets/js/v52-system-sync.js"></script>
  <script src="../assets/js/automation-sync.js"></script>
  <script src="../assets/js/v54-price-sync.js"></script>
</body>
</html>