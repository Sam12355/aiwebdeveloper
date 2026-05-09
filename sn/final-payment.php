<!DOCTYPE html>

<html lang="si">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>අවසාන ගෙවීම | Webdeveloper.lk සිංහල</title>
<meta content="Pay the final balance payment before launching your Webdeveloper.lk website." name="description"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="../assets/css/auth.css" rel="stylesheet"/>
<link href="../assets/css/final-payment.css" rel="stylesheet"/>
<link href="../assets/css/global-v29.css" rel="stylesheet"/>
<link href="../assets/css/lang-si.css" rel="stylesheet"/>  <link rel="stylesheet" href="../assets/css/interactive-ui.css" />
  <link rel="stylesheet" href="../assets/css/comfortaa-font.css" />
  <link rel="stylesheet" href="../assets/css/sync-automation.css" />
  <link rel="stylesheet" href="../assets/css/v52-admin-sync.css" />
  <link rel="stylesheet" href="../assets/css/v54-price-sync.css" />
</head>
<body class="ai-step-pages final-pay-body">
<header class="flow-header">
<div class="flow-container flow-header-inner">
<a class="flow-logo" href="index.php"><img alt="Webdeveloper.lk" src="../assets/img/webdeveloper-logo-header.png"/></a>
<a class="back-final" href="final-review.php">ආපසු to අවසාන සමාලෝචනය</a>
</div>
</header>
<main class="final-payment-main">
<section class="final-pay-hero">
<div class="flow-container">
<div class="final-pay-title-row">
<div>
<h1>අවසාන ඉතිරි මුදල <span>ගෙවීම</span></h1>
<p>ඔබගේ අවසාන වෙබ් අඩවිය අනුමත කර ඇත. වෙබ් අඩවිය දියත් කිරීමට සූදානම් කිරීම සඳහා ඉතිරි මුදල ගෙවන්න.</p>
</div>
<div class="final-pay-status">
<span>ව්‍යාපෘතිය ID</span>
<strong id="projectId">WD-PROJECT</strong>
</div>
</div>
<div class="final-pay-grid">
<div class="pay-left">
<div class="final-card">
<div class="approval-success">
<span>✓</span>
<div>
<strong>අවසාන වෙබ් අඩවිය සාර්ථකව අනුමත කර ඇත.</strong>
<small>අනුමත කළ දිනය <span id="approvalDate">අනුමතයි</span>. ඊළඟ පියවර දියත් කිරීමට පෙර ඉතිරි ගෙවීමයි.</small>
</div>
</div>
</div>
<div class="final-card">
<h2>ව්‍යාපෘති ගෙවීම් සාරාංශය</h2>
<div class="amount-box">
<div class="amount-item total">
<span>මුළු ව්‍යාපෘති මිල</span>
<strong id="totalAmount">LKR 40,000.00</strong>
</div>
<div class="amount-item paid">
<span>අත්තිකාරම් ගෙවා ඇත</span>
<strong id="advanceAmount">LKR 20,000.00</strong>
</div>
<div class="amount-item due">
<span>ගෙවිය යුතු ඉතිරිය</span>
<strong id="balanceAmount">LKR 20,000.00</strong>
</div>
</div>
</div>
<div class="final-card">
<h2>වෙබ් අඩවි දියත් කිරීමේ සාරාංශය</h2>
<div class="project-preview">
<div class="lines"><span></span><span></span><span></span></div>
</div>
<div class="invoice-summary">
<div class="summary-row"><span>ව්‍යාපාරය</span><strong id="summaryBusiness">ඔබගේ ව්‍යාපාරය</strong></div>
<div class="summary-row"><span>තෝරාගත් තේමාව</span><strong id="summaryTheme">නවීන ව්‍යාපාරික තේමාව</strong></div>
<div class="summary-row"><span>වෙබ් අඩවි මාර්ගය</span><strong id="summaryPath">කුඩා ව්‍යාපාරික වෙබ් අඩවිය</strong></div>
<div class="summary-row"><span>පිටු</span><strong id="summaryPages">පිටු 5 - 10</strong></div>
<div class="summary-row"><span>දියත් කිරීමේ URL</span><strong id="summaryUrl">https://yourbusiness.lk</strong></div>
</div>
</div>
</div>
<aside class="pay-right">
<div class="final-pay-form-card">
<div class="pay-form-head">
<div>
<h2>අවසාන ඉතිරි මුදල ගෙවන්න</h2>
<p>ප්‍රධාන විකල්පය බැංකු මාරු කිරීම / බැංකු තැන්පතුව වේ. කාඩ් ගෙවීම දෙවන විකල්පය ලෙස ඇත.</p>
</div>
<span class="secure-badge">✓</span>
</div>
<div class="payment-method-tabs">
<button class="payment-method-tab recommended active" data-final-method="bank" type="button">
<strong>බැංකු මාරු කිරීම / තැන්පතු</strong>
<small>Commercial Bank වෙත ගෙවා අවසාන ගෙවීම් slip එක උඩුගත කරන්න.</small>
</button>
<button class="payment-method-tab" data-final-method="card" type="button">
<strong>කාඩ් ගෙවීම</strong>
<small>දෙවන විකල්පය ලෙස කාඩ්පතෙන් මාර්ගගතව ගෙවන්න.</small>
</button>
</div>
<div class="payment-method-panel active" id="finalBankPanel">
<div class="bank-details-card">
<div class="bank-row"><span>බැංකුව</span><strong>Commercial Bank</strong></div>
<div class="bank-row"><span>ශාඛාව</span><strong>කඩවත ශාඛාව</strong></div>
<div class="bank-row"><span>ගිණුමේ නම</span><strong>Web නිර්මාණයer &amp; Web Developer (Pvt)Ltd</strong></div>
<div class="copy-bank-row">
<div><span style="display:block;color:#60708e;font-weight:800;font-size:13px">ගිණුම් අංකය</span><code>1000433270</code></div>
<button data-copy-bank="1000433270" type="button">පිටපත් කරන්න</button>
</div>
</div>
<div class="balance-highlight" style="margin-top:16px">
<div>
<span>ඉතිරි ගෙවීම අවශ්‍යයි</span>
<strong id="balanceDue">LKR 20,000.00</strong>
</div>
<div class="pay-icon">▤</div>
</div>
<div class="receipt-upload-box">
<input accept="image/*,.pdf" id="finalReceiptFile" type="file"/>
<label for="finalReceiptFile">අවසාන ගෙවීම් රිසිට්පත උඩුගත කරන්න</label>
<p class="receipt-filename" id="finalReceiptName">රිසිට්පතක් තෝරාගෙන නොමැත</p>
<div class="receipt-preview" id="finalReceiptPreview"></div>
</div>
<button class="pay-btn" id="submitFinalBank" type="button">අවසාන රිසිට්පත යවන්න</button>
<p class="form-error" id="finalBankError"></p>
</div>
<div class="payment-method-panel" id="finalCardPanel">
<div class="test-card-box open">
  <div class="test-card-header" onclick="this.parentElement.classList.toggle('open')">
    <span>🧪 පරීක්ෂා කාඩ් තොරතුරු</span>
    <span class="test-card-toggle">▼</span>
  </div>
  <div class="test-card-body">
    <div class="test-card-row"><span>කාඩ් අංකය</span><strong>4111 1111 1111 1111</strong></div>
    <div class="test-card-row"><span>කල් ඉකුත් වීම</span><strong>12 / 28</strong></div>
    <div class="test-card-row"><span>CVV</span><strong>123</strong></div>
    <div class="test-card-row"><span>නම</span><strong>Test User</strong></div>
    <button type="button" class="use-test-card-btn" onclick="fillFinalTestCard()">පරීක්ෂා කාඩ් භාවිත කරන්න</button>
  </div>
</div>
<div class="card-brands">
<span>VISA</span>
<span>Mastercard</span>
<span>AMEX</span>
</div>
<form class="payment-form" id="finalPaymentForm" novalidate="">
<div class="field">
<label for="finalCardName">කාඩ් හිමිකරුගේ නම</label>
<input id="finalCardName" placeholder="Enter cardholder name" required="" type="text"/>
</div>
<div class="field">
<label for="finalCardNumber">කාඩ් අංකය</label>
<input id="finalCardNumber" maxlength="19" placeholder="1234 5678 9012 3456" required="" type="text"/>
</div>
<div class="two-fields">
<div class="field">
<label for="finalExpiryDate">කල් ඉකුත් වන දිනය</label>
<input id="finalExpiryDate" maxlength="7" placeholder="MM / YY" required="" type="text"/>
</div>
<div class="field">
<label for="finalCvv">CVV</label>
<input id="finalCvv" maxlength="4" placeholder="123" required="" type="password"/>
</div>
</div>
<div class="launch-note">
<span>✓</span>
<div>
<strong>කාඩ් ගෙවීමෙන් පසු ඔබගේ වෙබ් අඩවිය දියත් කිරීමේ සූදානමට යයි.</strong>
<small>සාර්ථක ගෙවීමෙන් පසු දියත් කිරීමේ පිටුවට යනු ඇත.</small>
</div>
</div>
<button class="pay-btn" id="payButtonText" type="submit">ඉතිරි මුදල LKR 20,000.00 ගෙවන්න</button>
<p class="form-error" id="finalPaymentError"></p>
</form>
</div>
<div class="secure-row">
<span>🏦 බැංකු ගෙවීම ප්‍රධානයි</span>
<span>💳 කාඩ් ගෙවීම අමතරයි</span>
<span>✓ පරිපාලක තහවුරු කිරීම</span>
</div>
</div></aside></div>
<div class="final-card">
<h3>දියත් කිරීමේ පියවර</h3>
<div class="launch-steps">
<div class="launch-step done"><span>✓</span><div><strong>වෙබ් අඩවිය අනුමතයි</strong><small>අවසාන පෙරදසුන පාරිභෝගිකයා විසින් අනුමත කර ඇත.</small></div></div>
<div class="launch-step current"><span>2</span><div><strong>අවසාන ගෙවීම</strong><small>ඉතිරි ගෙවීම දැන් අවශ්‍යයි.</small></div></div>
<div class="launch-step"><span>3</span><div><strong>වෙබ් අඩවිය දියත් කරන්න</strong><small>ගෙවීමෙන් පසු වෙබ් අඩවිය සජීවී කිරීමට සූදානම් කරනු ඇත.</small></div></div>
<div class="launch-step"><span>4</span><div><strong>හිමිකරුගේ ඩෑෂ්බෝඩ්</strong><small>සජීවී සබැඳිය, නවීකරණය සහ වෙනස්කම් ඉල්ලීමේ විකල්ප ලබාගත හැක.</small></div></div>
</div>
</div>
</div>
</section>
</main>
<div class="toast" id="finalPaymentToast">සුරකින ලදී</div>
<script src="../assets/js/backend-client.js"></script>
<script src="../assets/js/session-security.js"></script>
<script src="../assets/js/auth.js"></script>
<script src="../assets/js/realtime-notifications.js"></script>
<script src="../assets/js/bank-payment.js"></script>
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
<script src="../assets/js/final-payment.js"></script>
<script src="../assets/js/lang-switch.js"></script>
<script src="../assets/js/lang-si.js"></script>
  <script src="../assets/js/interactive-ui.js"></script>
  <script src="../assets/js/data-recorder.js"></script>
  <script src="../assets/js/v52-system-sync.js"></script>
  <script src="../assets/js/automation-sync.js"></script>
  <script src="../assets/js/v54-price-sync.js"></script>
<script>
  function fillFinalTestCard(){
    var box = document.querySelector('#finalCardPanel .test-card-box');
    if(box) box.classList.remove('open');
    var name = document.getElementById('finalCardName');
    var n = document.getElementById('finalCardNumber');
    var exp = document.getElementById('finalExpiryDate');
    var cvv = document.getElementById('finalCvv');
    if(name) name.value = 'Test User';
    if(n) n.value = '4111 1111 1111 1111';
    if(exp) exp.value = '12 / 28';
    if(cvv) cvv.value = '123';
  }
</script>
</body>
</html>