<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Generated Invoice | Webdeveloper.lk</title>
  <meta name="description" content="Review your generated invoice and pay 50% advance to start your 3-day website build." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/flow.css" />
  <link rel="stylesheet" href="assets/css/payment.css" />
  <link rel="stylesheet" href="assets/css/auth.css" />
  <link rel="stylesheet" href="assets/css/global-v29.css" />
<link rel="stylesheet" href="assets/css/interactive-ui.css" />
  <link rel="stylesheet" href="assets/css/comfortaa-font.css" />
  <link rel="stylesheet" href="assets/css/sync-automation.css" />
  <link rel="stylesheet" href="assets/css/v52-admin-sync.css" />
  <link rel="stylesheet" href="assets/css/v54-price-sync.css" />
</head>
<body class="ai-step-pages">
  <div class="flow-page">
    <header class="flow-header">
      <div class="flow-container flow-header-inner">
        <a href="index.php" class="flow-logo">
          <img src="assets/img/webdeveloper-logo-header.png" alt="Webdeveloper.lk">
        </a>
        <div class="secure-label">
          <span class="shield-icon">✓</span>
          Secure & Trusted
        </div>
      </div>
    </header>

    <main>
      <section class="payment-hero">
        <div class="flow-container">
          <div class="flow-stepbar compact">
            <div class="flow-step done"><span>✓</span><small>Business Type</small></div>
            <div class="flow-line done"></div>
            <div class="flow-step done"><span>✓</span><small>Contact Details</small></div>
            <div class="flow-line done"></div>
            <div class="flow-step done"><span>✓</span><small>Business Info</small></div>
            <div class="flow-line done"></div>
            <div class="flow-step done"><span>✓</span><small>Theme Selection</small></div>
            <div class="flow-line done"></div>
            <div class="flow-step active"><span>5</span><small>Summary & Payment</small></div>
          </div>

          <div class="payment-title-wrap">
            <div>
              <h1>Generated Invoice</h1>
              <p>Review your project details and make the 50% advance payment to start your website.</p>
            </div>
            <div class="invoice-id-card">
              <span>Invoice No</span>
              <strong id="invoiceNumber">WD-INV-0001</strong>
            </div>
          </div>
        </div>
      </section>

      <section class="invoice-section">
        <div class="flow-container invoice-grid">
          <div class="invoice-panel">
            <div class="selected-theme-box">
              <div>
                <span class="eyebrow">Selected Theme</span>
                <h2 id="selectedThemeName">Modern Business Theme</h2>
                <button type="button" class="ghost-btn" id="previewThemeBtn">View Preview ↗</button>
              </div>
              <div class="theme-preview-tile" id="themePreviewTile">
                <div class="mock-top"></div>
                <div class="mock-content">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>

            <div class="project-strip">
              <div class="strip-item">
                <span class="round-icon blue">🌐</span>
                <div><small>Website Path</small><strong id="summaryPath">Small Business Website</strong></div>
              </div>
              <div class="strip-item">
                <span class="round-icon red">👤</span>
                <div><small>Business Model</small><strong id="summaryModel">Individual / Small Business</strong></div>
              </div>
              <div class="strip-item">
                <span class="round-icon green">⏱</span>
                <div><small>Delivery Time</small><strong>3 Days</strong></div>
              </div>
              <div class="strip-item">
                <span class="round-icon violet">📱</span>
                <div><small>Feature</small><strong>Mobile Friendly Website</strong></div>
              </div>
            </div>

            <div class="invoice-card">
              <div class="invoice-card-head">
                <h3>Invoice Details</h3>
                <span>Amount (LKR)</span>
              </div>

              <div class="invoice-row">
                <div>
                  <strong>Website Design & Setup</strong>
                  <small>Professional setup of your website with selected theme</small>
                </div>
                <span>15,000.00</span>
              </div>
              <div class="invoice-row">
                <div>
                  <strong>Theme-Based Layout Customization</strong>
                  <small>Customize layout, colors, fonts and branding as per your needs</small>
                </div>
                <span>10,000.00</span>
              </div>
              <div class="invoice-row">
                <div>
                  <strong>Mobile Friendly Setup</strong>
                  <small>Fully responsive for all devices and screen sizes</small>
                </div>
                <span>5,000.00</span>
              </div>
              <div class="invoice-row">
                <div>
                  <strong>Basic Content Placement</strong>
                  <small>Add your text, images and essential content</small>
                </div>
                <span>5,000.00</span>
              </div>
              <div class="invoice-row">
                <div>
                  <strong>3-Day Build Process</strong>
                  <small>Complete website delivery within 3 working days after required details</small>
                </div>
                <span>5,000.00</span>
              </div>

              <div class="invoice-total-box">
                <div><span>Subtotal</span><strong id="subtotalAmount">40,000.00</strong></div>
                <div class="advance-row"><span>Advance Payment Required (50%)</span><strong id="advanceAmount">20,000.00</strong></div>
                <div><span>Balance Payment (50%)</span><strong id="balanceAmount">20,000.00</strong></div>
              </div>
            </div>

            <div class="info-note">
              <span>i</span>
              Pay 50% advance now to start your project. The remaining 50% is due before website launch.
            </div>

            <div class="invoice-actions">
              <a class="back-btn" href="theme-selection.php">← Back</a>
              <button type="button" class="download-btn" id="downloadInvoice">Download Invoice</button>
            </div>
            <div class="invoice-next-wrap">
              <a class="invoice-next-dashboard" href="customer-dashboard.php" id="invoiceNextDashboard">Next</a>
            </div>
          </div>

          <aside class="payment-panel">
            <div class="pay-card">
              <div class="pay-head">
                <div>
                  <h2>Pay Advance</h2>
                  <p>Main payment method is bank transfer or manual bank deposit. Card payment is available as the second option.</p>
                </div>
                <span class="shield-large">✓</span>
              </div>

              <div class="payment-method-tabs">
                <button class="payment-method-tab recommended active" type="button" data-pay-method="bank">
                  <strong>Bank Transfer / Deposit</strong>
                  <small>Pay to Commercial Bank and upload the receipt slip.</small>
                </button>
                <button class="payment-method-tab" type="button" data-pay-method="card">
                  <strong>Card Payment</strong>
                  <small>Pay online with card as the second option.</small>
                </button>
              </div>

              <div class="payment-method-panel active" id="bankPaymentPanel">
                <div class="bank-details-card">
                  <div class="bank-row"><span>Bank</span><strong>Commercial Bank</strong></div>
                  <div class="bank-row"><span>Branch</span><strong>Kadawatha Branch</strong></div>
                  <div class="bank-row"><span>Account Name</span><strong>Web Designer & Web Developer (Pvt)Ltd</strong></div>
                  <div class="copy-bank-row">
                    <div><span style="display:block;color:#60708e;font-weight:800;font-size:13px">Account Number</span><code>1000433270</code></div>
                    <button type="button" data-copy-bank="1000433270">Copy</button>
                  </div>
                </div>

                <div class="balance-highlight" style="margin-top:16px">
                  <div>
                    <span>Advance Payment Required</span>
                    <strong id="bankAdvanceAmount">LKR 20,000.00</strong>
                  </div>
                  <div class="pay-icon">▤</div>
                </div>

                <div class="bank-warning">
                  <span>!</span>
                  <div>
                    <strong>Upload your bank slip after payment.</strong><br>
                    Pay from online banking or manual bank deposit, then upload the receipt image here. Admin will verify and mark payment as received.
                  </div>
                </div>

                <div class="receipt-upload-box">
                  <input id="advanceReceiptFile" type="file" accept="image/*,.pdf">
                  <label for="advanceReceiptFile">Upload Payment Receipt</label>
                  <p class="receipt-filename" id="advanceReceiptName">No receipt selected</p>
                  <div class="receipt-preview" id="advanceReceiptPreview"></div>
                </div>

                <button class="pay-btn" type="button" id="submitBankAdvance">Submit Receipt & Open Dashboard</button>
                <p class="form-error" id="bankPaymentError"></p>
              </div>

              <div class="payment-method-panel" id="cardPaymentPanel">
                <div class="test-card-box open">
                  <div class="test-card-header" onclick="this.parentElement.classList.toggle('open')">
                    <span>🧪 Test Card Details</span>
                    <span class="test-card-toggle">▼</span>
                  </div>
                  <div class="test-card-body">
                    <div class="test-card-row"><span>Card Number</span><strong>4111 1111 1111 1111</strong></div>
                    <div class="test-card-row"><span>Expiry</span><strong>12 / 28</strong></div>
                    <div class="test-card-row"><span>CVV</span><strong>123</strong></div>
                    <div class="test-card-row"><span>Name</span><strong>Test User</strong></div>
                    <button type="button" class="use-test-card-btn" onclick="fillTestCard()">Use Test Card</button>
                  </div>
                </div>

                <div class="card-brands">
                  <span>VISA</span>
                  <span>Mastercard</span>
                  <span>AMEX</span>
                </div>

                <form id="paymentForm" class="payment-form" novalidate>
                  <div class="field">
                    <label for="cardName">Cardholder Name</label>
                    <input id="cardName" name="cardName" type="text" placeholder="Enter cardholder name" required>
                  </div>
                  <div class="field">
                    <label for="cardNumber">Card Number</label>
                    <input id="cardNumber" name="cardNumber" type="text" placeholder="1234 5678 9012 3456" maxlength="19" required>
                  </div>
                  <div class="two-fields">
                    <div class="field">
                      <label for="expiryDate">Expiry Date</label>
                      <input id="expiryDate" name="expiryDate" type="text" placeholder="MM / YY" maxlength="7" required>
                    </div>
                    <div class="field">
                      <label for="cvv">CVV</label>
                      <input id="cvv" name="cvv" type="password" placeholder="123" maxlength="4" required>
                    </div>
                  </div>

                  <div class="payment-summary">
                    <div><span>Total Price</span><strong id="payTotal">LKR 40,000.00</strong></div>
                    <div><span>Advance Payment (50%)</span><strong id="payAdvance">LKR 20,000.00</strong></div>
                    <div><span>Balance Later (50%)</span><strong id="payBalance">LKR 20,000.00</strong></div>
                  </div>

                  <div class="green-alert">
                    <span>✓</span>
                    <div>
                      <strong>You are paying 50% advance by card</strong>
                      <small>Your project will start after successful payment.</small>
                    </div>
                  </div>

                  <button class="pay-btn" type="submit">Pay 50% Advance by Card</button>
                  <p class="form-error" id="paymentError"></p>
                </form>
              </div>

              <div class="secure-row">
                <span>🔒 Secure Process</span>
                <span>🏦 Bank Transfer Main</span>
                <span>💳 Card Optional</span>
              </div>
            </div>

            <div class="progress-summary-card">
              <h3>Progress Summary</h3>
              <ul>
                <li><span>✓</span><div><strong>Business Type</strong><small>Completed</small></div></li>
                <li><span>✓</span><div><strong>Contact Details</strong><small>Completed</small></div></li>
                <li><span>✓</span><div><strong>Business Info</strong><small>Completed</small></div></li>
                <li><span>✓</span><div><strong>Theme Selection</strong><small>Completed</small></div></li>
                <li class="current"><span>5</span><div><strong>Advance Payment</strong><small>Upload slip or pay by card</small></div></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  </div>

  <script src="assets/js/realtime-notifications.js"></script>
  <script src="assets/js/bank-payment.js"></script>
  <script src="assets/js/invoice.js"></script>
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
<script src="assets/js/interactive-ui.js"></script>
  <script src="assets/js/data-recorder.js"></script>
  <script src="assets/js/v52-system-sync.js"></script>
  <script src="assets/js/automation-sync.js"></script>

<script>
  function fillTestCard(){
    var box = document.querySelector('.test-card-box');
    if(box) box.classList.remove('open');
    var n = document.getElementById('cardNumber');
    var name = document.getElementById('cardName');
    var exp = document.getElementById('expiryDate');
    var cvv = document.getElementById('cvv');
    if(name) name.value = 'Test User';
    if(n) n.value = '4111 1111 1111 1111';
    if(exp) exp.value = '12 / 28';
    if(cvv) cvv.value = '123';
  }

  // V49 invoice next dashboard capture
  document.addEventListener('DOMContentLoaded', function(){
    var next = document.getElementById('invoiceNextDashboard');
    if(next){
      next.addEventListener('click', function(e){
        e.preventDefault();
        try{
          var step1Business = {};
          var step1 = {};
          try{ step1Business = JSON.parse(localStorage.getItem('wdlk_step1_business') || '{}'); }catch(err){}
          try{ step1 = JSON.parse(localStorage.getItem('wdlk_step1') || '{}'); }catch(err){}
          step1 = Object.assign({}, step1Business, step1);
          var customer = {
            businessName: step1.businessName || localStorage.getItem('wdlk_business_name') || localStorage.getItem('wdlk_business_type') || 'Your Business',
            yourName: step1.customerName || step1.yourName || 'Customer',
            contactNumber: step1.contactNumber || step1.phone || '',
            email: step1.email || step1.customerEmail || '',
            accountStatus: 'active',
            accountCreatedFrom: 'invoice_next'
          };
          localStorage.setItem('wdlk_customer', JSON.stringify(customer));
          localStorage.setItem('wdlk_logged_in', 'yes');
          localStorage.setItem('wdlk_project_stage', localStorage.getItem('wdlk_project_stage') || 'invoice_ready');
          if(window.WebDevSession){ window.WebDevSession.createSession(); }
          if(window.WebDevV52Sync && window.WebDevV52Sync.saveProjectAsync){
            window.WebDevV52Sync.saveProjectAsync('invoice_next_to_dashboard').finally(function(){
              window.location.href = 'customer-dashboard.php';
            });
            return;
          }
          if(window.WebDevDataRecorder && window.WebDevDataRecorder.capture){
            window.WebDevDataRecorder.capture('invoice_next_to_customer_account');
          }
        }catch(e){}
        window.location.href = 'customer-dashboard.php';
      });
    }
  });
</script>

  <script src="assets/js/v54-price-sync.js"></script>
</body>
</html>
