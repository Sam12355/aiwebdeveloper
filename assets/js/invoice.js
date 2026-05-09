const qs = (s) => document.querySelector(s);

const formatLkr = (num) => {
  return 'LKR ' + Number(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const getSaved = () => {
  try {
    return {
      step1: JSON.parse(localStorage.getItem('wdlk_step1') || '{}'),
      step1Business: JSON.parse(localStorage.getItem('wdlk_step1_business') || '{}'),
      step2: JSON.parse(localStorage.getItem('wdlk_step2') || '{}'),
      theme: JSON.parse(localStorage.getItem('wdlk_theme') || '{}')
    };
  } catch (e) {
    return { step1: {}, step2: {}, theme: {} };
  }
};

const saved = getSaved();

function readPricing(){
  try{
    const pricing = JSON.parse(localStorage.getItem('wdlk_pricing') || '{}');
    const step2 = saved.step2 || {};
    const totalPrice = Number(pricing.totalPrice || step2.totalPrice || localStorage.getItem('wdlk_total_price') || 50000);
    const packageName = pricing.packageName || step2.packageName || 'Starter';
    const packageLabel = pricing.packageLabel || step2.packageLabel || 'Standard Business - Starter';
    const pricingTypeLabel = pricing.pricingTypeLabel || step2.pricingTypeLabel || 'Standard Business web design';
    const packagePages = pricing.packagePages || step2.packagePages || '5 Pages';
    return {
      totalPrice,
      advancePayment: Number(pricing.advancePayment || step2.advancePayment || totalPrice / 2),
      balancePayment: Number(pricing.balancePayment || step2.balancePayment || totalPrice / 2),
      packageName,
      packageLabel,
      pricingTypeLabel,
      packagePages
    };
  }catch(e){
    return {
      totalPrice: 50000,
      advancePayment: 25000,
      balancePayment: 25000,
      packageName: 'Starter',
      packageLabel: 'Standard Business - Starter',
      pricingTypeLabel: 'Standard Business web design',
      packagePages: '5 Pages'
    };
  }
}

const pricing = readPricing();
const total = pricing.totalPrice;
const advance = pricing.advancePayment;
const balance = pricing.balancePayment;

function generateInvoiceNumber() {
  let existing = localStorage.getItem('wdlk_invoice_number');
  if (!existing) {
    const date = new Date();
    const y = String(date.getFullYear()).slice(-2);
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const r = Math.floor(1000 + Math.random() * 9000);
    existing = `WD-${y}${m}${d}-${r}`;
    localStorage.setItem('wdlk_invoice_number', existing);
  }
  return existing;
}

function setText(id, value) {
  const el = qs('#' + id);
  if (el) el.textContent = value;
}


function updateInvoiceRows(websitePath){
  const rows = document.querySelectorAll('.invoice-card .invoice-row');
  if(!rows.length) return;

  const first = rows[0];
  const title = first.querySelector('strong');
  const desc = first.querySelector('small');
  const amount = first.querySelector('span:last-child');

  if(title) title.textContent = pricing.packageLabel + ' Website Package';
  if(desc) desc.textContent = pricing.pricingTypeLabel + ' | ' + pricing.packagePages + ' | ' + websitePath;
  if(amount) amount.textContent = total.toLocaleString('en-US', { minimumFractionDigits: 2 });

  rows.forEach((row, index) => {
    if(index > 0) row.style.display = 'none';
  });
}

function initInvoice() {
  const themeName = saved.theme.themeName || saved.theme.name || 'Modern Business Theme';
  const websitePath = saved.step2.websitePath || saved.step2.path || 'Small Business Website';
  const businessModel = saved.step2.businessModel || saved.step2.model || 'Individual / Small Business';

  setText('invoiceNumber', generateInvoiceNumber());
  setText('selectedThemeName', themeName);
  setText('summaryPath', websitePath);
  setText('summaryModel', businessModel);
  updateInvoiceRows(websitePath);

  setText('subtotalAmount', total.toLocaleString('en-US', { minimumFractionDigits: 2 }));
  setText('advanceAmount', advance.toLocaleString('en-US', { minimumFractionDigits: 2 }));
  setText('balanceAmount', balance.toLocaleString('en-US', { minimumFractionDigits: 2 }));

  setText('payTotal', formatLkr(total));
  setText('payAdvance', formatLkr(advance));
  setText('payBalance', formatLkr(balance));
  setText('bankAdvanceAmount', formatLkr(advance));
}

function onlyDigits(v) {
  return v.replace(/\D/g, '');
}

function initPaymentFormatting() {
  const cardNumber = qs('#cardNumber');
  const expiry = qs('#expiryDate');

  if (cardNumber) {
    cardNumber.addEventListener('input', () => {
      let value = onlyDigits(cardNumber.value).slice(0, 16);
      cardNumber.value = value.replace(/(.{4})/g, '$1 ').trim();
    });
  }

  if (expiry) {
    expiry.addEventListener('input', () => {
      let value = onlyDigits(expiry.value).slice(0, 4);
      if (value.length >= 3) value = value.slice(0, 2) + ' / ' + value.slice(2);
      expiry.value = value;
    });
  }
}

function validatePayment() {
  const name = qs('#cardName').value.trim();
  const number = onlyDigits(qs('#cardNumber').value);
  const expiry = onlyDigits(qs('#expiryDate').value);
  const cvv = onlyDigits(qs('#cvv').value);

  if (name.length < 3) return 'Please enter the cardholder name.';
  if (number.length < 16) return 'Please enter a valid card number.';
  if (expiry.length < 4) return 'Please enter a valid expiry date.';
  if (cvv.length < 3) return 'Please enter a valid CVV.';
  return '';
}

function initFormSubmit() {
  const form = qs('#paymentForm');
  const error = qs('#paymentError');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = validatePayment();
    if (msg) {
      error.textContent = msg;
      return;
    }

    error.textContent = '';
    const paymentData = {
      status: 'advance_paid',
      invoiceNumber: generateInvoiceNumber(),
      total,
      advance,
      balance,
      paidAt: new Date().toISOString(),
      method: 'Card Payment',
      packageName: pricing.packageName,
      packageLabel: pricing.packageLabel,
      pricingTypeLabel: pricing.pricingTypeLabel,
      packagePages: pricing.packagePages
    };

    localStorage.setItem('wdlk_payment', JSON.stringify(paymentData));
    localStorage.setItem('wdlk_project_stage', 'planning');
    Promise.resolve(window.WebDevV52Sync && window.WebDevV52Sync.saveProjectAsync ? window.WebDevV52Sync.saveProjectAsync('advance_card_paid') : null)
      .catch(() => {})
      .finally(() => {
        if(window.WebDevDataRecorder && window.WebDevDataRecorder.capture) window.WebDevDataRecorder.capture('advance_card_paid');
        setTimeout(() => { window.location.href = 'payment-success.php'; }, 250);
      });
  });
}

function initDownloadInvoice() {
  const btn = qs('#downloadInvoice');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const themeName = qs('#selectedThemeName').textContent;
    const path = qs('#summaryPath').textContent;
    const model = qs('#summaryModel').textContent;
    const invoice = qs('#invoiceNumber').textContent;

    const lines = [
      'Webdeveloper.lk Generated Invoice',
      'Invoice No: ' + invoice,
      '',
      'Selected Theme: ' + themeName,
      'Website Path: ' + path,
      'Business Model: ' + model,
      'Package: ' + pricing.packageLabel,
      'Price Type: ' + pricing.pricingTypeLabel,
      'Package Pages: ' + pricing.packagePages,
      'Delivery Time: 3 Days',
      'Feature: Mobile Friendly Website',
      '',
      'Subtotal: ' + formatLkr(total),
      'Advance Payment Required (50%): ' + formatLkr(advance),
      'Balance Payment (50%): ' + formatLkr(balance),
      '',
      'Note: 3-day delivery starts after advance payment and essential business details.'
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = invoice + '.txt';
    a.click();
    URL.revokeObjectURL(url);
  });
}

initInvoice();
initPaymentFormatting();
initFormSubmit();
initDownloadInvoice();


function initPaymentMethodTabs(){
  document.querySelectorAll('[data-pay-method]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-pay-method]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const method = btn.dataset.payMethod;
      const bank = document.getElementById('bankPaymentPanel');
      const card = document.getElementById('cardPaymentPanel');
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

function initBankAdvance(){
  const fileInput = document.getElementById('advanceReceiptFile');
  const fileName = document.getElementById('advanceReceiptName');
  const preview = document.getElementById('advanceReceiptPreview');
  const submit = document.getElementById('submitBankAdvance');
  const error = document.getElementById('bankPaymentError');

  if(!fileInput || !submit) return;

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if(!file) return;
    if(fileName) fileName.textContent = file.name;
    if(preview && file.type.startsWith('image/')){
      const reader = new FileReader();
      reader.onload = () => {
        preview.style.display = 'block';
        preview.innerHTML = `<img src="${reader.result}" alt="Payment receipt preview">`;
      };
      reader.readAsDataURL(file);
    } else if(preview) {
      preview.style.display = 'none';
      preview.innerHTML = '';
    }
  });

  submit.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if(!file){
      if(error) error.textContent = 'Please upload your bank payment receipt slip.';
      return;
    }
    if(error) error.textContent = '';

    submit.disabled = true;
    submit.textContent = 'Submitting Receipt...';

    try{
      if(!window.WebDevBankPayment) throw new Error('Bank payment module not loaded.');
      const receipt = await window.WebDevBankPayment.saveReceipt(file, {paymentType:'advance', amount: advance});

      localStorage.setItem('wdlk_payment_status_popup', 'show_receipt_pending');
      localStorage.setItem('wdlk_project_stage', 'payment_pending_verification');
      localStorage.setItem('wdlk_dashboard_stage_title', 'Payment Slip Submitted - Pending Verification');
      localStorage.setItem('wdlk_dashboard_stage_percent', '18');

      submit.textContent = 'Opening Dashboard...';
      setTimeout(() => window.location.href = 'payment-success.php', 700);
    }catch(err){
      console.error('Receipt submit failed:', err);
      if(error) error.textContent = (err && err.message) ? err.message : 'Could not submit receipt. Please try again.';
      submit.disabled = false;
      submit.textContent = 'Submit Receipt & Open Dashboard';
    }
  });
}

initPaymentMethodTabs();
initBankAdvance();
