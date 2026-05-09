
(function(){
  const BANK_INFO = {
    bankName: 'Commercial Bank',
    branch: 'Kadawatha Branch',
    accountName: 'Web Designer & Web Developer (Pvt)Ltd',
    accountNumber: '1000433270'
  };

  const MAX_STORED_IMAGE_WIDTH = 1000;
  const MAX_STORED_IMAGE_HEIGHT = 1000;
  const IMAGE_QUALITY = 0.72;
  const MAX_DATA_URL_LENGTH = 1200000; // keep under browser localStorage limits

  function safeJson(key, fallback = {}){
    try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback));}
    catch(e){return fallback;}
  }

  function safeArray(key){
    const value = safeJson(key, []);
    return Array.isArray(value) ? value : [];
  }

  function saveJson(key, value){
    try{
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    }catch(e){
      console.warn('Storage failed for', key, e);
      return false;
    }
  }

  function fileToDataUrl(file){
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => reject(new Error('Could not read the receipt file.'));
      reader.readAsDataURL(file);
    });
  }

  async function imageToCompressedDataUrl(file){
    const raw = await fileToDataUrl(file);
    if(!file.type || !file.type.startsWith('image/')) return raw;

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        try{
          let {width, height} = img;
          const ratio = Math.min(MAX_STORED_IMAGE_WIDTH / width, MAX_STORED_IMAGE_HEIGHT / height, 1);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0,0,width,height);
          ctx.drawImage(img,0,0,width,height);

          const compressed = canvas.toDataURL('image/jpeg', IMAGE_QUALITY);
          resolve(compressed.length < raw.length ? compressed : raw);
        }catch(e){
          resolve(raw);
        }
      };
      img.onerror = () => resolve(raw);
      img.src = raw;
    });
  }

  async function readFileForStorage(file){
    if(!file) return {dataUrl:'', storedAs:'none'};

    const isImage = file.type && file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name || '');

    if(isPdf){
      return {
        dataUrl:'',
        storedAs:'metadata_only_pdf',
        storageNote:'PDF receipt selected. Prototype stores file name only to avoid browser storage limits.'
      };
    }

    if(!isImage){
      return {
        dataUrl:'',
        storedAs:'metadata_only_file',
        storageNote:'Receipt selected. Prototype stores file name only for this file type.'
      };
    }

    const dataUrl = await imageToCompressedDataUrl(file);
    if(dataUrl.length > MAX_DATA_URL_LENGTH){
      return {
        dataUrl:'',
        storedAs:'metadata_only_large_image',
        storageNote:'Image was too large for browser storage. File name was recorded for admin verification.'
      };
    }

    return {dataUrl, storedAs:'image_preview'};
  }

  function getCustomer(){
    return safeJson('wdlk_customer', {});
  }

  function getInvoice(){
    const pay = safeJson('wdlk_payment', {});
    const finalPay = safeJson('wdlk_final_payment', {});
    return localStorage.getItem('wdlk_invoice_number') || pay.invoiceNumber || finalPay.invoiceNumber || ('WD-' + Date.now());
  }

  function getPricingForPayment(){
    try{
      const pricing = JSON.parse(localStorage.getItem('wdlk_pricing') || '{}');
      const step2 = JSON.parse(localStorage.getItem('wdlk_step2') || '{}');
      const total = Number(pricing.totalPrice || step2.totalPrice || localStorage.getItem('wdlk_total_price') || 50000);
      return {
        total,
        advance: Number(pricing.advancePayment || step2.advancePayment || total / 2),
        balance: Number(pricing.balancePayment || step2.balancePayment || total / 2),
        packageName: pricing.packageName || step2.packageName || 'Starter',
        packageLabel: pricing.packageLabel || step2.packageLabel || 'Standard Business - Starter',
        pricingTypeLabel: pricing.pricingTypeLabel || step2.pricingTypeLabel || 'Standard Business web design',
        packagePages: pricing.packagePages || step2.packagePages || '5 Pages'
      };
    }catch(e){
      return {total:50000, advance:25000, balance:25000, packageName:'Starter', packageLabel:'Standard Business - Starter', pricingTypeLabel:'Standard Business web design', packagePages:'5 Pages'};
    }
  }

  function getBusinessName(){
    const customer = safeJson('wdlk_customer', {});
    const step1 = safeJson('wdlk_step1', safeJson('wdlk_step1_business', {}));
    return customer.businessName || step1.businessName || localStorage.getItem('wdlk_business_name') || localStorage.getItem('wdlk_business_type') || 'Your Business';
  }


  function backendApi(path){
    return window.location.pathname.includes('/sn/') ? '../backend/api/' + path : 'backend/api/' + path;
  }

  async function uploadReceiptToBackend(file, receipt){
    if(!file || window.location.protocol === 'file:') return null;
    try{
      const fd = new FormData();
      fd.append('receipt', file);
      fd.append('project_key', localStorage.getItem('wdlk_project_key') || receipt.invoiceNumber || '');
      fd.append('payment_type', receipt.paymentType || 'advance');
      fd.append('amount', String(receipt.amount || 0));
      fd.append('invoice_no', receipt.invoiceNumber || '');
      const res = await fetch(backendApi('payment-receipt-upload.php'), {
        method:'POST',
        credentials:'include',
        body:fd
      });
      if(!res.ok) return null;
      const data = await res.json();
      receipt.backendUploaded = !!data.success;
      receipt.backendResponse = data;
      return data;
    }catch(e){
      receipt.backendUploaded = false;
      receipt.backendError = String(e && e.message ? e.message : e);
      return null;
    }
  }

  function addAdminPaymentRecord(receipt){
    const payments = safeArray('wdlk_admin_bank_payments');
    const exists = payments.some(p => p.id === receipt.id);
    if(!exists){
      payments.unshift(receipt);
      if(!saveJson('wdlk_admin_bank_payments', payments)){
        // fallback without image preview
        const lightPayments = payments.map(p => ({...p, fileDataUrl:''}));
        saveJson('wdlk_admin_bank_payments', lightPayments);
      }
    }
  }

  function updateAdminProjectPayment(receipt){
    const projects = safeArray('wdlk_admin_projects');
    const p = projects.find(x => x.id === receipt.invoiceNumber);
    if(p){
      p.paymentMethod = receipt.method;
      p.paymentStatus = receipt.status;
      p.paymentType = receipt.paymentType;
      p.lastPaymentAmount = receipt.amount;
      p.updatedAt = new Date().toISOString();
      saveJson('wdlk_admin_projects', projects);
    }
  }

  async function saveReceipt(file, options = {}){
    if(!file){
      throw new Error('Please select a payment receipt file.');
    }

    const allowed = ['image/jpeg','image/png','image/webp','image/gif','application/pdf'];
    const fileType = file.type || '';
    const looksAllowed = allowed.includes(fileType) || /\.(jpg|jpeg|png|webp|gif|pdf)$/i.test(file.name || '');
    if(!looksAllowed){
      throw new Error('Please upload an image receipt or PDF file.');
    }

    const storedFile = await readFileForStorage(file);
    const customer = getCustomer();

    const receipt = {
      id: 'RCPT-' + Date.now(),
      invoiceNumber: getInvoice(),
      paymentType: options.paymentType || 'advance',
      method: 'Bank Transfer / Manual Deposit',
      bankName: BANK_INFO.bankName,
      branch: BANK_INFO.branch,
      accountName: BANK_INFO.accountName,
      accountNumber: BANK_INFO.accountNumber,
      amount: options.amount || 0,
      customerName: customer.yourName || customer.name || '',
      businessName: customer.businessName || getBusinessName(),
      contactNumber: customer.contactNumber || '',
      email: customer.email || '',
      fileName: file.name || '',
      fileType: file.type || '',
      fileSize: file.size || 0,
      fileDataUrl: storedFile.dataUrl || '',
      storedAs: storedFile.storedAs,
      storageNote: storedFile.storageNote || '',
      status: 'pending_verification',
      submittedAt: new Date().toISOString()
    };

    const key = receipt.paymentType === 'final' ? 'wdlk_final_bank_receipt' : 'wdlk_bank_receipt';
    if(!saveJson(key, receipt)){
      const lightReceipt = {...receipt, fileDataUrl:'', storedAs:'metadata_only_storage_fallback', storageNote:'Browser storage was full. File name was recorded without preview.'};
      saveJson(key, lightReceipt);
      receipt.fileDataUrl = '';
      receipt.storedAs = lightReceipt.storedAs;
      receipt.storageNote = lightReceipt.storageNote;
    }

    if(window.WebDevAutoSync){
      window.WebDevAutoSync.activity('payment','Payment verified','Admin verified ' + receipt.paymentType + ' payment.');
    }

    if(receipt.paymentType === 'advance'){
      const pay = safeJson('wdlk_payment', {});
      const pricing = getPricingForPayment();
      saveJson('wdlk_payment', {
        ...pay,
        invoiceNumber: receipt.invoiceNumber,
        method: receipt.method,
        status: 'pending_verification',
        bankReceiptId: receipt.id,
        amount: receipt.amount,
        total: pricing.total,
        advance: receipt.amount || pricing.advance,
        balance: pricing.balance,
        packageName: pricing.packageName,
        packageLabel: pricing.packageLabel,
        pricingTypeLabel: pricing.pricingTypeLabel,
        packagePages: pricing.packagePages,
        paidAt: new Date().toISOString()
      });
    } else {
      const finalPayment = safeJson('wdlk_final_payment', {});
      saveJson('wdlk_final_payment', {
        ...finalPayment,
        invoiceNumber: receipt.invoiceNumber,
        method: receipt.method,
        status: 'pending_verification',
        bankReceiptId: receipt.id,
        balancePaid: receipt.amount,
        paidAt: new Date().toISOString()
      });
    }

    await uploadReceiptToBackend(file, receipt);
    addAdminPaymentRecord(receipt);
    updateAdminProjectPayment(receipt);

    try{
      if(window.WebDevAutoSync){
        window.WebDevAutoSync.activity('payment','Payment receipt submitted',(receipt.businessName || 'Customer') + ' submitted ' + receipt.paymentType + ' payment slip.');
        window.WebDevAutoSync.syncNow('payment_receipt_submitted');
      }
    }catch(e){}

    try{
      if(window.WebDevRealtime){
        window.WebDevRealtime.addAdmin({
          type:'payment',
          title:'Bank payment receipt uploaded',
          message:(receipt.businessName || 'Customer') + ' uploaded a ' + receipt.paymentType + ' payment receipt. Please verify.',
          actionUrl:'admin-dashboard.php#payments'
        });
      }
    }catch(e){
      console.warn('Notification failed', e);
    }

    return receipt;
  }

  function markReceiptVerified(receiptId){
    const payments = safeArray('wdlk_admin_bank_payments');
    const receipt = payments.find(p => p.id === receiptId);
    if(!receipt) return null;

    receipt.status = 'received';
    receipt.verifiedAt = new Date().toISOString();
    saveJson('wdlk_admin_bank_payments', payments);

    const receiptKey = receipt.paymentType === 'final' ? 'wdlk_final_bank_receipt' : 'wdlk_bank_receipt';
    saveJson(receiptKey, receipt);

    if(receipt.paymentType === 'advance'){
      const pay = safeJson('wdlk_payment', {});
      saveJson('wdlk_payment', {
        ...pay,
        invoiceNumber: receipt.invoiceNumber,
        method: receipt.method,
        status: 'advance_paid',
        verifiedAt: receipt.verifiedAt,
        bankReceiptId: receipt.id,
        amount: receipt.amount,
        total: getPricingForPayment().total,
        advance: receipt.amount || pay.advance || getPricingForPayment().advance,
        balance: getPricingForPayment().balance,
        packageName: getPricingForPayment().packageName,
        packageLabel: getPricingForPayment().packageLabel,
        pricingTypeLabel: getPricingForPayment().pricingTypeLabel,
        packagePages: getPricingForPayment().packagePages,
        paidAt: pay.paidAt || receipt.submittedAt
      });
      localStorage.setItem('wdlk_project_stage', 'planning');
      localStorage.setItem('wdlk_dashboard_stage_title', 'Advance Payment Received - Planning Started');
      localStorage.setItem('wdlk_dashboard_stage_percent', '28');
    } else {
      const finalPayment = safeJson('wdlk_final_payment', {});
      saveJson('wdlk_final_payment', {
        ...finalPayment,
        invoiceNumber: receipt.invoiceNumber,
        method: receipt.method,
        status: 'balance_paid',
        verifiedAt: receipt.verifiedAt,
        bankReceiptId: receipt.id,
        balancePaid: receipt.amount,
        paidAt: finalPayment.paidAt || receipt.submittedAt
      });
      localStorage.setItem('wdlk_project_stage', 'ready_to_launch');
      localStorage.setItem('wdlk_dashboard_stage_title', 'Final Payment Completed - Ready to Launch');
      localStorage.setItem('wdlk_dashboard_stage_percent', '100');
    }

    const projects = safeArray('wdlk_admin_projects');
    const p = projects.find(x => x.id === receipt.invoiceNumber);
    if(p){
      p.paymentStatus = 'received';
      p.status = receipt.paymentType === 'advance' ? 'In Progress' : (p.status || 'Ready to Launch');
      p.stage = receipt.paymentType === 'advance' ? 'planning' : 'ready_to_launch';
      p.updatedAt = new Date().toISOString();
      saveJson('wdlk_admin_projects', projects);
    }

    if(window.WebDevAutoSync){
      window.WebDevAutoSync.syncNow('payment_verified_' + receipt.paymentType);
    }
    return receipt;
  }

  function copyText(text){
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).catch(()=>{});
    }
  }

  window.WebDevBankPayment = {
    BANK_INFO,
    saveReceipt,
    markReceiptVerified,
    copyText
  };
})();
