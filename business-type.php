<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Start Your Website | ecommercesrilanka.lk</title>
  <meta name="description" content="Tell us about your business and start your 3-day website project with ecommercesrilanka.lk." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css" />
  <link rel="stylesheet" href="assets/css/flow.css" />
  <link rel="stylesheet" href="assets/css/auth.css" />
  <link rel="stylesheet" href="assets/css/global-v29.css" />
  <link rel="stylesheet" href="assets/css/ai-step-transition.css" />
  <link rel="stylesheet" href="assets/css/interactive-ui.css" />
  <link rel="stylesheet" href="assets/css/comfortaa-font.css" />
  <link rel="stylesheet" href="assets/css/sync-automation.css" />
  <link rel="stylesheet" href="assets/css/v52-admin-sync.css" />
  <link rel="stylesheet" href="assets/css/v54-price-sync.css" />
</head>
<body class="ai-step-pages">
  <div class="flow-page">
    <header class="site-header">
      <div class="container header-wrap">
        <a href="index.php" class="brand" aria-label="ecommercesrilanka.lk home">
          <img src="assets/img/webdeveloper-logo-header.png" alt="ecommercesrilanka.lk" />
        </a>
        <nav class="main-nav flow-nav">
          <a href="index.php">Home</a>
          <a href="#faq">FAQ</a>
        </nav>
      </div>
    </header>

    <main class="flow-main">
      <canvas id="flow-particles" aria-hidden="true"></canvas>
      <div class="flow-bg glow-blue"></div>
      <div class="flow-bg glow-red"></div>

      <section class="flow-hero">
        <div class="container">
          <div class="flow-title-block reveal up">
            <h1>Let’s Start Your <span>Website</span></h1>
            <p>Tell us a few details about your business and we’ll guide you to the right website path.</p>
          </div>

          <div class="flow-stepper reveal up delay-1">
            <div class="stepper-item active">
              <span>1</span>
              <strong>Business</strong>
            </div>
            <div class="stepper-line active"></div>
            <div class="stepper-item">
              <span>2</span>
              <strong>Details</strong>
            </div>
            <div class="stepper-line"></div>
            <div class="stepper-item">
              <span>3</span>
              <strong>Website</strong>
            </div>
            <div class="stepper-line"></div>
            <div class="stepper-item">
              <span>4</span>
              <strong>Payment</strong>
            </div>
          </div>

          <div class="flow-layout">
            <form id="businessForm" class="flow-card form-card reveal up" enctype="multipart/form-data">
              <div class="card-title">
                <div class="card-icon building-icon">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M4 21V7L12 3L20 7V21" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 21V13H15V21" stroke="currentColor" stroke-width="2"/><path d="M8 8H8.01M12 8H12.01M16 8H16.01M8 11H8.01M16 11H16.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>
                </div>
                <h2>Tell Us About Your Business</h2>
              </div>

              <div class="field-grid">
                <label class="field">
                  <span>1. What is your business?</span>
                  <div class="input-wrap">
                    <svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="M20 20L17 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                    <input id="businessType" name="businessType" type="text" placeholder="Restaurant, Hotel, Construction Company..." required />
                  </div>
                </label>

                <label class="field">
                  <span>2. Business Name</span>
                  <div class="input-wrap">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M4 21V7L12 3L20 7V21" stroke="currentColor" stroke-width="2"/><path d="M9 21V14H15V21" stroke="currentColor" stroke-width="2"/></svg>
                    <input id="businessName" name="businessName" type="text" placeholder="Enter your business name" required />
                  </div>
                </label>

                <label class="field">
                  <span>3. Your Name</span>
                  <div class="input-wrap">
                    <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/><path d="M5 20C5 16.7 8 14 12 14C16 14 19 16.7 19 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                    <input id="customerName" name="customerName" type="text" placeholder="Enter your full name" required />
                  </div>
                </label>

                <label class="field">
                  <span>4. Contact Number</span>
                  <div class="input-wrap">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M22 16.9V20A2 2 0 0 1 19.8 22C9.4 20.8 3.2 14.6 2 4.2A2 2 0 0 1 4 2H7.1A2 2 0 0 1 9.1 3.7L9.7 6.7A2 2 0 0 1 9.1 8.6L7.8 9.9C9.1 12.5 11.5 14.9 14.1 16.2L15.4 14.9A2 2 0 0 1 17.3 14.3L20.3 14.9A2 2 0 0 1 22 16.9Z" stroke="currentColor" stroke-width="2"/></svg>
                    <input id="contactNumber" name="contactNumber" type="tel" placeholder="07X XXX XXXX" required />
                  </div>
                </label>

                <label class="field">
                  <span>5. Email Address</span>
                  <div class="input-wrap">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M4 6H20V18H4V6Z" stroke="currentColor" stroke-width="2"/><path d="M4 7L12 13L20 7" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
                    <input id="customerEmail" name="email" type="email" placeholder="Enter your email address" required />
                  </div>
                </label>
              </div>

              <label class="field field-full">
                <span>6. Tell us about your business</span>
                <textarea id="businessDescription" name="businessDescription" placeholder="Briefly describe what your business does, your target customers, and any special requirements..." required></textarea>
              </label>

              <div class="field field-full">
                <span>7. Upload Logo <em>(Optional)</em></span>
                <label class="upload-zone" id="uploadZone">
                  <input id="logoUpload" name="logoUpload" type="file" accept=".png,.jpg,.jpeg,.svg,.webp" />
                  <span class="upload-icon">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M12 16V4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M7 9L12 4L17 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 16.5V19A2 2 0 0 1 18 21H6A2 2 0 0 1 4 19V16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                  </span>
                  <span class="upload-main">Drag & drop or <strong>browse files</strong></span>
                  <small>PNG, JPG, SVG or WEBP. Max 5MB</small>
                  <span class="file-name" id="fileName"></span>
                </label>
              </div>

              <div class="form-alert" id="formAlert"></div>

              <div class="form-actions">
                <a class="back-btn" href="index.php">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M15 6L9 12L15 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  Back
                </a>
                <button type="submit" class="continue-btn">
                  Continue
                  <svg viewBox="0 0 24 24" fill="none"><path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
              </div>
            </form>

            <aside class="side-column reveal up delay-1">
              <div class="flow-card next-card">
                <h2>What Happens Next?</h2>
                <div class="timeline">
                  <div class="timeline-item">
                    <div class="timeline-icon blue">
                      <svg viewBox="0 0 24 24" fill="none"><path d="M7 8H17M7 12H17M7 16H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" stroke-width="2"/></svg>
                    </div>
                    <div>
                      <h3>1. Share business details</h3>
                      <p>Tell us about your business so we can understand your needs.</p>
                    </div>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-icon red">
                      <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2"/><path d="M8 21H16M12 17V21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                    </div>
                    <div>
                      <h3>2. Choose website type</h3>
                      <p>We’ll suggest the best website type that fits your business.</p>
                    </div>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-icon blue">
                      <svg viewBox="0 0 24 24" fill="none"><path d="M5 19C8.8 18.3 13.8 15.2 17.8 8.8L15.2 6.2C8.8 10.2 5.7 15.2 5 19Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M14.5 7.5L16.5 5.5C17.7 4.3 19.2 3.8 20 4C20.2 4.8 19.7 6.3 18.5 7.5L16.5 9.5" stroke="currentColor" stroke-width="2"/></svg>
                    </div>
                    <div>
                      <h3>3. Pay advance and start</h3>
                      <p>Secure your project with advance payment and we start building.</p>
                    </div>
                  </div>
                </div>

                <div class="delivery-note">
                  <div class="timeline-icon shield">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M12 2L19 5V11C19 16 15.5 20 12 21C8.5 20 5 16 5 11V5L12 2Z" stroke="currentColor" stroke-width="2"/></svg>
                  </div>
                  <div>
                    <h3>3-Day Delivery</h3>
                    <p>Delivery starts after advance payment and essential business details.</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <div class="benefit-strip reveal up">
            <div class="benefit-item">
              <div class="benefit-icon blue">
                <svg viewBox="0 0 24 24" fill="none"><rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" stroke-width="2"/><path d="M11 18H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              </div>
              <div>
                <h3>Mobile Friendly</h3>
                <p>Websites that look perfect on all devices.</p>
              </div>
            </div>
            <div class="benefit-item">
              <div class="benefit-icon red">
                <svg viewBox="0 0 24 24" fill="none"><path d="M8 6H21M8 12H21M8 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M3 6H3.01M3 12H3.01M3 18H3.01" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>
              </div>
              <div>
                <h3>Simple Process</h3>
                <p>A clear and easy process to get your website.</p>
              </div>
            </div>
            <div class="benefit-item">
              <div class="benefit-icon blue">
                <svg viewBox="0 0 24 24" fill="none"><path d="M5 19C8.8 18.3 13.8 15.2 17.8 8.8L15.2 6.2C8.8 10.2 5.7 15.2 5 19Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 15L5 19L6 14" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
              </div>
              <div>
                <h3>Fast Delivery</h3>
                <p>Get your professional website within just 3 days.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    
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

  </div>

  <script src="assets/js/flow.js"></script>
  <script src="assets/js/backend-client.js"></script>
  <script src="assets/js/session-security.js"></script>
  <script src="assets/js/auth.js"></script>
  <script src="assets/js/lang-switch.js"></script>
  <script src="assets/js/ai-step-transition.js"></script>
  <script src="assets/js/interactive-ui.js"></script>
  <script src="assets/js/data-recorder.js"></script>
  <script src="assets/js/v52-system-sync.js"></script>
  <script src="assets/js/automation-sync.js"></script>
  <script src="assets/js/v54-price-sync.js"></script>
</body>
</html>