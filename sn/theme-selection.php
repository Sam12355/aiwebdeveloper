<!DOCTYPE html>

<html lang="si">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>තේමා තේරීම | Webdeveloper.lk සිංහල</title>
<meta content="Choose a website theme for your 3-day website project with Webdeveloper.lk." name="description"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="../assets/css/style.css" rel="stylesheet"/>
<link href="../assets/css/flow.css" rel="stylesheet"/>
<link href="../assets/css/auth.css" rel="stylesheet"/>
<link href="../assets/css/theme-gallery.css" rel="stylesheet"/>
<link href="../assets/css/global-v29.css" rel="stylesheet"/>
<link href="../assets/css/lang-si.css" rel="stylesheet"/>  <link rel="stylesheet" href="../assets/css/ai-step-transition.css" />
  <link rel="stylesheet" href="../assets/css/interactive-ui.css" />
  <link rel="stylesheet" href="../assets/css/comfortaa-font.css" />
  <link rel="stylesheet" href="../assets/css/sync-automation.css" />
  <link rel="stylesheet" href="../assets/css/v52-admin-sync.css" />
  <link rel="stylesheet" href="../assets/css/v54-price-sync.css" />
</head>
<body class="ai-step-pages">
<div class="flow-page theme-page">
<header class="site-header">
<div class="container header-wrap">
<a aria-label="Webdeveloper.lk home" class="brand" href="index.php">
<img alt="Webdeveloper.lk" src="../assets/img/webdeveloper-logo-header.png"/>
</a>
<nav class="main-nav flow-nav">
<a href="index.php">මුල් පිටුව</a>
<a href="#faq">නිතර අසන ප්‍රශ්න</a>
</nav>
</div>
</header>
<main class="flow-main theme-main">
<canvas aria-hidden="true" id="flow-particles"></canvas>
<div class="flow-bg glow-blue"></div>
<div class="flow-bg glow-red"></div>
<section class="flow-hero theme-hero">
<div class="container">
<div class="theme-title-row reveal up">
<div class="flow-title-block theme-title-block">
<h1>ඔබගේ වෙබ් අඩවිය තෝරන්න <span>තේමාව</span></h1>
<p>ඔබගේ වෙබ් අඩවිය සඳහා පිරිසිදු නිර්මාණ ශෛලියක් තෝරන්න. දින 3ක වෙබ් අඩවි නිර්මාණය සඳහා අපි එය ආරම්භක පදනම ලෙස භාවිතා කරන්නෙමු.</p>
</div>
<div class="ai-theme-badge idle-float-soft">
<span>AI</span>
<strong>තේමා යෝජනාව සූදානම්</strong>
</div>
</div>
<div class="flow-stepper theme-stepper reveal up delay-1">
<div class="stepper-item complete"><span>✓</span><strong>ව්‍යාපාරය</strong></div>
<div class="stepper-line active"></div>
<div class="stepper-item complete"><span>✓</span><strong>විස්තර</strong></div>
<div class="stepper-line active"></div>
<div class="stepper-item active"><span>3</span><strong>තේමාව</strong></div>
<div class="stepper-line"></div>
<div class="stepper-item"><span>4</span><strong>ගෙවීම</strong></div>
</div>
<div class="theme-layout">
<form class="flow-card theme-picker-card reveal up" id="themeSelectionForm">
<div class="theme-toolbar">
<div>
<h2>තේමා තේරීම</h2>
<p>තේමාවක් තෝරා ඔබගේ වෙබ් අඩවිය සාදන්න ඉදිරියට යන්න.</p>
</div>
<div class="selected-theme-pill" id="selectedThemePill">නවීන ව්‍යාපාරික තේමාව තෝරාගෙන ඇත</div>
</div>
<div class="theme-filter-bar" id="themeFilterBar">
<button class="filter-btn active" data-filter="recommended" type="button">නිර්දේශිත</button>
<button class="filter-btn" data-filter="business" type="button">ව්‍යාපාරය</button>
<button class="filter-btn" data-filter="corporate" type="button">කෝපරේට්</button>
<button class="filter-btn" data-filter="ecommerce" type="button">ඊ-කොමර්ස්</button>
<button class="filter-btn" data-filter="creative" type="button">නිර්මාණශීලී</button>
<button class="filter-btn" data-filter="hospitality" type="button">හෝටල් / ආහාර</button>
<button class="filter-btn" data-filter="product" type="button">නිෂ්පාදන</button>
<button class="filter-btn" data-filter="minimal" type="button">සරල</button>
<button class="filter-btn" data-filter="all" type="button">සියල්ල</button>
</div>
<div class="theme-gallery-meta"><div class="theme-gallery-count">පෙන්වන්නේ <strong id="themeVisibleCount">0</strong> තේමා</div><div class="theme-help-note">සෑම කාණ්ඩයකම මුල් තේමා අදහස් 20ක් ඇත. තේමාවක් තෝරා මගේ වෙබ් අඩවිය සාදන්න ක්ලික් කරන්න.</div></div>
<div class="theme-grid" id="themeGrid"></div>
<label class="field theme-notes-field">
<span>අමතර තේමා සටහන් <em>(අමතර)</em></span>
<textarea id="themeNotes" placeholder="Example: I like blue color, clean සැකැස්ම, modern business look..."></textarea>
<small class="counter"><b id="themeNotesCount">0</b> / 300</small>
</label>
<div class="form-alert" id="themeAlert"></div>
<div class="form-actions theme-actions">
<a class="btn-back" href="details.php">← ආපසු</a>
<button class="btn-continue" type="submit">මගේ වෙබ් අඩවිය සාදන්න →</button>
</div>
</form>
<aside class="theme-sidebar reveal up delay-1">
<div class="flow-card progress-card theme-progress-card">
<h2>ව්‍යාපෘති ප්‍රගතිය</h2>
<div class="progress-list">
<div class="progress-item done"><span>✓</span><div><strong>ව්‍යාපාර වර්ගය</strong><small>සම්පූර්ණයි</small></div></div>
<div class="progress-item done"><span>✓</span><div><strong>සම්බන්ධතා විස්තර</strong><small>සම්පූර්ණයි</small></div></div>
<div class="progress-item done"><span>✓</span><div><strong>ව්‍යාපාර විස්තර</strong><small>සම්පූර්ණයි</small></div></div>
<div class="progress-item active"><span>4</span><div><strong>තේමා තේරීම</strong><small>ක්‍රියාත්මකයි</small></div></div>
<div class="progress-item"><span>5</span><div><strong>ඉන්වොයිසිය සහ ගෙවීම</strong><small>ඉදිරියේදී</small></div></div>
</div>
</div>
<div class="flow-card summary-card theme-summary-card">
<h2>ඔබගේ ව්‍යාපෘති සාරාංශය</h2>
<div class="summary-list">
<div class="summary-row"><span>ව්‍යාපාර වර්ගය</span><strong id="themeSummaryBusinessType">කුඩා ව්‍යාපාරික වෙබ් අඩවිය</strong></div>
<div class="summary-row"><span>ව්‍යාපාර ආකෘතිය</span><strong id="themeSummaryModel">පුද්ගලික / කුඩා ව්‍යාපාර</strong></div>
<div class="summary-row"><span>පිටු</span><strong id="themeSummaryPages">පිටු 5 - 10</strong></div>
<div class="summary-row"><span>තෝරාගත් තේමාව</span><strong id="themeSummaryTheme">නවීන ව්‍යාපාරය</strong></div>
<div class="summary-row"><span>විශේෂාංගය</span><strong>ජංගම දුරකථන හිතකාමී වෙබ් අඩවිය</strong></div>
<div class="summary-row"><span>බෙදාහැරීම</span><strong>දින 3ක් තුළ</strong></div>
</div>
</div>
<div class="flow-card next-step-card theme-next-card">
<div class="next-step-icon">
<svg fill="none" viewbox="0 0 24 24"><path d="M5 12L10 17L20 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.3"></path></svg>
</div>
<h2>ඊළඟ පියවර</h2>
<p>තේමාවක් තෝරාගත් පසු, අපි ඔබගේ ඉන්වොයිසිය සාදා 50% අත්තිකාරම් ගෙවීමේ පිටුව සකස් කරමු.</p>
                <button type="submit" form="themeSelectionForm" class="theme-floating-create-btn">මගේ වෙබ් අඩවිය සාදන්න →</button>
</div>
</aside>
</div>
</div>
</section>
</main>
</div>
<div aria-hidden="true" class="theme-preview-modal" id="themeModal">
<div class="modal-backdrop" data-close-modal=""></div>
<div class="modal-card">
<button class="modal-close" data-close-modal="" type="button">×</button>
<div class="modal-preview" id="modalPreview"></div>
<h3 id="modalTitle">නවීන ව්‍යාපාරය</h3>
<p id="modalStyle">පිරිසිදු • වෘත්තීය • නවීන</p>
<button class="btn-continue" id="modalChooseBtn" type="button">මෙම තේමාව තෝරන්න</button>
</div>
</div>
<script src="../assets/js/flow.js"></script>
<script src="../assets/js/theme-selection.js"></script>
<script src="../assets/js/backend-client.js"></script>
<script src="../assets/js/session-security.js"></script>
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
<script src="../assets/js/auth.js"></script>
<script src="../assets/js/lang-switch.js"></script>
<script src="../assets/js/lang-si.js"></script>
  <script src="../assets/js/ai-step-transition.js"></script>
  <script src="../assets/js/interactive-ui.js"></script>
  <script src="../assets/js/data-recorder.js"></script>
  <script src="../assets/js/v52-system-sync.js"></script>
  <script src="../assets/js/automation-sync.js"></script>
  <script src="../assets/js/v54-price-sync.js"></script>
</body>
</html>
