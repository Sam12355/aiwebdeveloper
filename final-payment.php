<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Final Payment | ecommercesrilanka.lk</title>
  <meta name="description" content="Pay the final balance payment before launching your ecommercesrilanka.lk website." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/auth.css" />
  <link rel="stylesheet" href="assets/css/final-payment.css" />
  <link rel="stylesheet" href="assets/css/global-v29.css" />
  <link rel="stylesheet" href="assets/css/interactive-ui.css" />
  <link rel="stylesheet" href="assets/css/comfortaa-font.css" />
  <link rel="stylesheet" href="assets/css/sync-automation.css" />
  <link rel="stylesheet" href="assets/css/v52-admin-sync.css" />
  <link rel="stylesheet" href="assets/css/v54-price-sync.css" />
</head>
<body class="ai-step-pages final-pay-body">
  <header class="flow-header">
    <div class="flow-container flow-header-inner">
      <a href="index.php" class="flow-logo"><img src="assets/img/webdeveloper-logo-header.png" alt="ecommercesrilanka.lk"></a>
      <a href="final-review.php" class="back-final">Back to Final Review</a>
    </div>
  </header>

  <main class="final-payment-main">
    <section class="final-pay-hero">
      <div class="flow-container">
        <div class="final-pay-title-row">
          <div>
            <h1>Final Balance <span>Payment</span></h1>
            <p>Your final website has been accepted. Pay the remaining balance to prepare your website launch.</p>
          </div>
          <div class="final-pay-status">
            <span>Project ID</span>
            <strong id="projectId">WD-PROJECT</strong>
          </div>
        </div>

        <div class="final-pay-grid">
          <div class="pay-left">
            <div class="final-card">
              <div class="approval-success">
                <span>✓</span>
                <div>
                  <strong>Final website accepted successfully.</strong>
                  <small>Accepted on <span id="approvalDate">Accepted</span>. The next step is balance payment before launch.</small>
                </div>
              </div>
            </div>

            <div class="final-card">
              <h2>Project Payment Summary</h2>
              <div class="amount-box">
                <div class="amount-item total">
                  <span>Total Project Price</span>
                  <strong id="totalAmount">LKR 40,000.00</strong>
                </div>
                <div class="amount-item paid">
                  <span>Advance Paid</span>
                  <strong id="advanceAmount">LKR 20,000.00</strong>
                </div>
                <div class="amount-item due">
                  <span>Balance Due</span>
                  <strong id="balanceAmount">LKR 20,000.00</strong>
                </div>
              </div>
            </div>

            <div class="final-card">
              <h2>Website Launch Summary</h2>
              <div class="project-preview">
                <div class="lines"><span></span><span></span><span></span></div>
              </div>
              <div class="invoice-summary">
                <div class="summary-row"><span>Business</span><strong id="summaryBusiness">Your Business</strong></div>
                <div class="summary-row"><span>Selected Theme</span><strong id="summaryTheme">Modern Business Theme</strong></div>
                <div class="summary-row"><span>Website Path</span><strong id="summaryPath">Small Business Website</strong></div>
                <div class="summary-row"><span>Pages</span><strong id="summaryPages">5 - 10 Pages</strong></div>
                <div class="summary-row"><span>Launch URL</span><strong id="summaryUrl">https://yourbusiness.lk</strong></div>
              </div>
            </div>
          </div>

          <aside class="pay-right">
            <div class="final-pay-form-card">
              <div class="pay-form-head">
                <div>
                  <h2>Pay Final Balance</h2>
                  <p>Main option is bank transfer / manual deposit. Card payment is available as the second option.</p>
                </div>
                <span class="secure-badge">✓</span>
              </div>

              <div class="payment-method-tabs">
                <button class="payment-method-tab recommended active" type="button" data-final-method="bank">
                  <strong>Bank Transfer / Deposit</strong>
                  <small>Pay to Commercial Bank and upload the final payment slip.</small>
                </button>
                <button class="payment-method-tab" type="button" data-final-method="card">
                  <strong>Card Payment</strong>
                  <small>Pay online with card as the second option.</small>
                </button>
              </div>

              <div class="payment-method-panel active" id="finalBankPanel">
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
                    <span>Balance Payment Required</span>
                    <strong id="balanceDue">LKR 20,000.00</strong>
                  </div>
                  <div class="pay-icon">▤</div>
                </div>

                <div class="receipt-upload-box">
                  <input id="finalReceiptFile" type="file" accept="image/*,.pdf">
                  <label for="finalReceiptFile">Upload Final Payment Receipt</label>
                  <p class="receipt-filename" id="finalReceiptName">No receipt selected</p>
                  <div class="receipt-preview" id="finalReceiptPreview"></div>
                </div>

                <button class="pay-btn" type="button" id="submitFinalBank">Submit Final Receipt</button>
                <p class="form-error" id="finalBankError"></p>
              </div>

              <div class="payment-method-panel" id="finalCardPanel">
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
                    <button type="button" class="use-test-card-btn" onclick="fillFinalTestCard()">Use Test Card</button>
                  </div>
                </div>

                <div class="card-brands">
                  <span>VISA</span>
                  <span>Mastercard</span>
                  <span>AMEX</span>
                </div>

                <form id="finalPaymentForm" class="payment-form" novalidate>
                  <div class="field">
                    <label for="finalCardName">Cardholder Name</label>
                    <input id="finalCardName" type="text" placeholder="Enter cardholder name" required>
                  </div>

                  <div class="field">
                    <label for="finalCardNumber">Card Number</label>
                    <input id="finalCardNumber" type="text" placeholder="1234 5678 9012 3456" maxlength="19" required>
                  </div>

                  <div class="two-fields">
                    <div class="field">
                      <label for="finalExpiryDate">Expiry Date</label>
                      <input id="finalExpiryDate" type="text" placeholder="MM / YY" maxlength="7" required>
                    </div>
                    <div class="field">
                      <label for="finalCvv">CVV</label>
                      <input id="finalCvv" type="password" placeholder="123" maxlength="4" required>
                    </div>
                  </div>

                  <div class="launch-note">
                    <span>✓</span>
                    <div>
                      <strong>After card payment, your website moves to launch preparation.</strong>
                      <small>You will continue to the launch page after successful payment.</small>
                    </div>
                  </div>

                  <button class="pay-btn" type="submit" id="payButtonText">Pay Balance LKR 20,000.00</button>
                  <p class="form-error" id="finalPaymentError"></p>
                </form>
              </div>

              <div class="secure-row">
                <span>🏦 Bank Main</span>
                <span>💳 Card Optional</span>
                <span>✓ Admin Verification</span>
              </div>
            </div></div>

            <div class="final-card">
              <h3>Launch Steps</h3>
              <div class="launch-steps">
                <div class="launch-step done"><span>✓</span><div><strong>Website Accepted</strong><small>Final preview approved by customer.</small></div></div>
                <div class="launch-step current"><span>2</span><div><strong>Final Payment</strong><small>Balance payment is required now.</small></div></div>
                <div class="launch-step"><span>3</span><div><strong>Launch Website</strong><small>Website will be prepared to go live after payment.</small></div></div>
                <div class="launch-step"><span>4</span><div><strong>Owner Dashboard</strong><small>Live link, renewal and change request options will be available.</small></div></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </main>

  <div class="toast" id="finalPaymentToast">Saved</div>
  <script src="assets/js/backend-client.js"></script>
  <script src="assets/js/session-security.js"></script>
  <script src="assets/js/auth.js"></script>
  <script src="assets/js/realtime-notifications.js"></script>
  <script src="assets/js/bank-payment.js"></script>

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

  <script src="assets/js/final-payment.js"></script>
  <script src="assets/js/lang-switch.js"></script>
  <script src="assets/js/interactive-ui.js"></script>
  <script src="assets/js/data-recorder.js"></script>
  <script src="assets/js/v52-system-sync.js"></script>
  <script src="assets/js/automation-sync.js"></script>
  <script src="assets/js/v54-price-sync.js"></script>
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