
(function(){
  const $ = (s) => document.querySelector(s);

  function safeJson(key, fallback={}){
    try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}
    catch(e){return fallback}
  }

  function setText(id, val){
    const el = document.getElementById(id);
    if(el) el.textContent = val;
  }

  function format(num){
    return 'LKR ' + Number(num).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2});
  }

  function onlyDigits(v){ return String(v || '').replace(/\D/g,''); }

  function slug(name){
    return (name || 'mybusiness').toLowerCase().replace(/[^a-z0-9]+/g,'').slice(0,24) || 'mybusiness';
  }

  const customer = safeJson('wdlk_customer');
  const step1 = Object.assign({}, safeJson('wdlk_step1_business'), safeJson('wdlk_step1'));
  const step2 = safeJson('wdlk_step2');
  const theme = safeJson('wdlk_theme');
  const payment = safeJson('wdlk_payment');
  const pricing = safeJson('wdlk_pricing');
  const finalReview = safeJson('wdlk_final_review');

  const total = Number(payment.total || pricing.totalPrice || step2.totalPrice || localStorage.getItem('wdlk_total_price') || 50000);
  const advance = Number(payment.advance || pricing.advancePayment || step2.advancePayment || total / 2);
  const balance = Number(payment.balance || pricing.balancePayment || step2.balancePayment || total / 2);

  function initSummary(){
    const businessName = customer.businessName || step1.businessName || localStorage.getItem('wdlk_business_type') || 'Your Business';
    const projectId = localStorage.getItem('wdlk_invoice_number') || payment.invoiceNumber || 'WD-PROJECT';

    setText('projectId', projectId);
    setText('summaryBusiness', businessName);
    setText('summaryTheme', theme.themeName || theme.name || 'Modern Business Theme');
    setText('summaryPath', step2.websitePath || 'Small Business Website');
    setText('summaryPages', step2.pageCount || '5 - 10 Pages');
    setText('summaryUrl', 'https://' + slug(businessName) + '.lk');

    setText('totalAmount', format(total));
    setText('advanceAmount', format(advance));
    setText('balanceAmount', format(balance));
    setText('balanceDue', format(balance));
    setText('payButtonText', 'Pay Balance ' + format(balance));

    const approvalDate = finalReview.acceptedAt ? new Date(finalReview.acceptedAt).toLocaleString() : 'Accepted';
    setText('approvalDate', approvalDate);
  }

  function initFormatting(){
    const cardNumber = $('#finalCardNumber');
    const expiry = $('#finalExpiryDate');

    if(cardNumber){
      cardNumber.addEventListener('input', () => {
        let value = onlyDigits(cardNumber.value).slice(0,16);
        cardNumber.value = value.replace(/(.{4})/g,'$1 ').trim();
      });
    }

    if(expiry){
      expiry.addEventListener('input', () => {
        let value = onlyDigits(expiry.value).slice(0,4);
        if(value.length >= 3) value = value.slice(0,2) + ' / ' + value.slice(2);
        expiry.value = value;
      });
    }
  }

  function validate(){
    const name = $('#finalCardName').value.trim();
    const number = onlyDigits($('#finalCardNumber').value);
    const expiry = onlyDigits($('#finalExpiryDate').value);
    const cvv = onlyDigits($('#finalCvv').value);

    if(name.length < 3) return 'Please enter the cardholder name.';
    if(number.length < 16) return 'Please enter a valid card number.';
    if(expiry.length < 4) return 'Please enter a valid expiry date.';
    if(cvv.length < 3) return 'Please enter a valid CVV.';
    return '';
  }

  function updateDashboard(stageTitle, percent, index){
    localStorage.setItem('wdlk_dashboard_stage_title', stageTitle);
    localStorage.setItem('wdlk_dashboard_stage_percent', String(percent));
    localStorage.setItem('wdlk_dashboard_stage_index', String(index));
  }

  function toast(message){
    const el = $('#finalPaymentToast');
    el.textContent = message;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2400);
  }

  function bindPayment(){
    const form = $('#finalPaymentForm');
    const error = $('#finalPaymentError');

    if(!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = validate();
      if(msg){
        error.textContent = msg;
        return;
      }

      error.textContent = '';

      const finalPayment = {
        status:'balance_paid',
        total,
        advancePaid: advance,
        balancePaid: balance,
        paidAt: new Date().toISOString(),
        method:'Card Payment',
        invoiceNumber: localStorage.getItem('wdlk_invoice_number') || payment.invoiceNumber || 'WD-PROJECT'
      };

      localStorage.setItem('wdlk_final_payment', JSON.stringify(finalPayment));
      localStorage.setItem('wdlk_project_stage', 'ready_to_launch');
      updateDashboard('Final Payment Completed - Ready to Launch', 100, 4);

      toast('Final payment successful. Preparing launch page...');
      Promise.resolve(window.WebDevV52Sync && window.WebDevV52Sync.saveProjectAsync ? window.WebDevV52Sync.saveProjectAsync('final_card_paid') : null)
        .catch(() => {})
        .finally(() => {
          if(window.WebDevDataRecorder && window.WebDevDataRecorder.capture) window.WebDevDataRecorder.capture('final_card_paid');
          setTimeout(() => window.location.href = 'launch-website.php', 300);
        });
    });
  }


  function initFinalMethodTabs(){
    document.querySelectorAll('[data-final-method]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-final-method]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const method = btn.dataset.finalMethod;
        const bank = document.getElementById('finalBankPanel');
        const card = document.getElementById('finalCardPanel');
        if(bank) bank.classList.toggle('active', method === 'bank');
        if(card) card.classList.toggle('active', method === 'card');
      });
    });
    document.querySelectorAll('[data-copy-bank]').forEach(btn => {
      btn.addEventListener('click', () => {
        if(window.WebDevBankPayment) window.WebDevBankPayment.copyText(btn.dataset.copyBank);
        btn.textContent = 'Copied';
        setTimeout(() => btn.textContent = 'Copy', 1500);
      });
    });
  }

  function initFinalBankPayment(){
    const fileInput = document.getElementById('finalReceiptFile');
    const fileName = document.getElementById('finalReceiptName');
    const preview = document.getElementById('finalReceiptPreview');
    const submit = document.getElementById('submitFinalBank');
    const error = document.getElementById('finalBankError');
    if(!fileInput || !submit) return;

    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if(!file) return;
      if(fileName) fileName.textContent = file.name;
      if(preview && file.type.startsWith('image/')){
        const reader = new FileReader();
        reader.onload = () => {
          preview.style.display = 'block';
          preview.innerHTML = `<img src="${reader.result}" alt="Final receipt preview">`;
        };
        reader.readAsDataURL(file);
      }
    });

    submit.addEventListener('click', async () => {
      const file = fileInput.files[0];
      if(!file){
        if(error) error.textContent = 'Please upload your final payment receipt slip.';
        return;
      }
      if(error) error.textContent = '';
      submit.disabled = true;
      submit.textContent = 'Submitting Receipt...';

      try{
        if(window.WebDevBankPayment){
          await window.WebDevBankPayment.saveReceipt(file, {paymentType:'final', amount: balance});
        }
        localStorage.setItem('wdlk_project_stage', 'final_payment');
        updateDashboard('Final Payment Slip Submitted - Pending Verification', 96, 4);
        submit.textContent = 'Receipt Submitted';
        setTimeout(() => window.location.href = 'customer-dashboard.php', 700);
      }catch(e){
        console.error('Final receipt submit failed:', e);
        if(error) error.textContent = (e && e.message) ? e.message : 'Could not submit receipt. Please try again.';
        submit.disabled = false;
        submit.textContent = 'Submit Final Receipt';
      }
    });
  }

  initSummary();
  initFormatting();
  bindPayment();
  initFinalMethodTabs();
  initFinalBankPayment();
})();
