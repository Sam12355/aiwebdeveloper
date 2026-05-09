
// Step 2 Website Details functionality with package pricing
(function () {
  const form = document.getElementById('websiteDetailsForm');
  if (!form) return;

  const isSinhala = document.documentElement.lang === 'si' || window.location.pathname.includes('/sn/');

  function readJson(key) {
    try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch (e) { return {}; }
  }

  function formatLkr(num) {
    return 'LKR ' + Number(num || 0).toLocaleString('en-US');
  }

  const step1 = readJson('wdlk_step1_business');
  const step1New = readJson('wdlk_step1');
  const customer = readJson('wdlk_customer');
  const saved = readJson('wdlk_step2_details');
  const savedNew = readJson('wdlk_step2');
  const params = new URLSearchParams(window.location.search);

  const businessNameInput = document.getElementById('step2BusinessName');
  const servicesInput = document.getElementById('mainServices');
  const additionalInfo = document.getElementById('additionalInfo');
  const alertBox = document.getElementById('detailsAlert');

  function firstValue() {
    for (const item of arguments) {
      if (item !== undefined && item !== null && String(item).trim() !== '') return String(item).trim();
    }
    return '';
  }

  const autoBusinessName = firstValue(
    saved.businessName,
    savedNew.businessName,
    step1.businessName,
    step1New.businessName,
    customer.businessName,
    localStorage.getItem('wdlk_business_name'),
    params.get('businessName'),
    params.get('business'),
    localStorage.getItem('wdlk_business_type')
  );

  const autoBusinessType = firstValue(
    step1.businessType,
    step1New.businessType,
    saved.businessType,
    savedNew.businessType,
    localStorage.getItem('wdlk_business_type'),
    params.get('business')
  );

  function recommendPath(text) {
    const value = String(text || '').toLowerCase();
    if (/shop|store|ecommerce|e-commerce|clothing|fashion|gift|accessor|cosmetic|online|cart/.test(value)) return 'E-commerce Website';
    if (/product|supplier|hardware|furniture|machinery|import|export|distributor|factory|catalog/.test(value)) return 'Product Website';
    if (/corporate|engineering|manufacturing|group|enterprise|company|finance|legal|medical|clinic/.test(value)) return 'Corporate Website';
    if (/hotel|villa|restaurant|food|cafe|travel|tour|resort|guest/.test(value)) return 'Business Website';
    return 'Business Website';
  }

  const state = {
    pages: saved.pages || saved.pageCount || savedNew.pages || savedNew.pageCount || '5 - 10 Pages',
    businessModel: saved.businessModel || savedNew.businessModel || 'Individual / Small Business',
    websitePath: saved.websitePath || savedNew.websitePath || recommendPath(autoBusinessType || autoBusinessName),
  };

  if (businessNameInput) businessNameInput.value = autoBusinessName || localStorage.getItem('wdlk_business_name') || '';
  if (servicesInput) servicesInput.value = saved.mainServices || savedNew.mainServices || saved.services || '';
  if (additionalInfo) additionalInfo.value = saved.additionalInfo || savedNew.additionalInfo || '';

  const defaultPricingRules = {
    standard: { Starter: 50000, Business: 80000, Corporate: 120000 },
    custom: { Starter: 50000, Business: 80000, Corporate: 150000 }
  };
  function adminPackagePrices(){
    try{
      const list = JSON.parse(localStorage.getItem('wdlk_admin_package_prices') || '[]');
      if(!Array.isArray(list) || !list.length) return defaultPricingRules;
      const rules = JSON.parse(JSON.stringify(defaultPricingRules));
      list.forEach(row => {
        const type = /custom/i.test(row.type || row.package_type || '') ? 'custom' : 'standard';
        const name = row.name || row.package_name || '';
        const price = Number(row.price || row.starting_price || 0);
        if(price && /starter/i.test(name)) rules[type].Starter = price;
        if(price && /business/i.test(name)) rules[type].Business = price;
        if(price && /corporate/i.test(name)) rules[type].Corporate = price;
      });
      return rules;
    }catch(e){ return defaultPricingRules; }
  }
  function loadDetailsConfig(){
    try{return JSON.parse(localStorage.getItem('wdlk_admin_details_config') || '{}');}
    catch(e){return {};}
  }
  function renderAdminOptions(){
    const cfg = loadDetailsConfig();
    const map = {
      pages: {selector: '.option-grid[data-group="pages"]', icon:false, cardClass:''},
      businessModels: {selector: '.option-grid[data-group="businessModel"]', icon:true, cardClass:'icon-card'},
      websitePaths: {selector: '.option-grid[data-group="websitePath"]', icon:false, cardClass:'path-card'}
    };
    Object.entries(map).forEach(([key, meta]) => {
      const items = cfg[key];
      const grid = document.querySelector(meta.selector);
      if(!grid || !Array.isArray(items) || !items.length) return;
      grid.innerHTML = items.map((item, index) => `
        <button type="button" class="option-card ${meta.cardClass} ${index === 0 ? 'active selected' : ''}" data-value="${String(item.value || item.title || '').replace(/"/g,'&quot;')}">
          <span class="radio-dot"></span>
          ${meta.icon ? '<i class="model-icon blue-icon">▣</i>' : ''}
          <strong>${item.title || item.value}</strong>
          <small>${item.text || ''}</small>
        </button>
      `).join('');
    });
  }
  renderAdminOptions();

  const pricingRules = adminPackagePrices();

  function packageTier(pages, model, path) {
    const value = String([pages, model, path].join(' ')).toLowerCase();

    if (/10\s*-\s*15|10 pages|popular|business package/.test(String(pages).toLowerCase())) {
      return 'Business';
    }

    if (/product website|unlimited|corporate package/.test(String(pages).toLowerCase())) {
      return 'Corporate';
    }

    if (/not sure/.test(String(pages).toLowerCase())) {
      if (/corporate|enterprise|e-commerce|ecommerce|product/.test(value)) return 'Corporate';
      return 'Starter';
    }

    return 'Starter';
  }

  function pricingType(model, path) {
    const value = String([model, path].join(' ')).toLowerCase();
    if (/e-commerce|ecommerce|enterprise|other|not sure|custom/.test(value)) {
      return 'custom';
    }
    return 'standard';
  }

  function packagePageText(tier) {
    if (tier === 'Starter') return '5 Pages';
    if (tier === 'Business') return '10 Pages';
    return 'Unlimited Pages';
  }


  function getSelectedAdminPackage(){
    try{
      const selectedId = localStorage.getItem('wdlk_selected_package_id');
      if(!selectedId) return null;
      const list = JSON.parse(localStorage.getItem('wdlk_admin_package_prices') || '[]');
      if(!Array.isArray(list)) return null;
      const found = list.find(p => p.id === selectedId || p.packageKey === selectedId || p.package_key === selectedId);
      if(!found) return null;
      return {
        id: found.id || found.packageKey || found.package_key,
        packageKey: found.packageKey || found.package_key || found.id,
        type: found.type || found.package_type || 'Standard Business web design',
        name: found.name || found.package_name || 'Package',
        price: Number(found.price || found.starting_price || found.startingPrice || 0),
        pages: found.pages || '',
        hosting: found.hosting || '',
        emails: found.emails || found.email_accounts || found.emailAccounts || '',
        details: found.details || found.package_details || found.description || ''
      };
    }catch(e){ return null; }
  }

  function calculatePrice() {
    const selectedAdminPackage = getSelectedAdminPackage();
    if(selectedAdminPackage && selectedAdminPackage.price){
      return {
        pricingType: /custom/i.test(selectedAdminPackage.type) ? 'custom' : 'standard',
        pricingTypeLabel: selectedAdminPackage.type,
        packageName: selectedAdminPackage.name,
        packageLabel: selectedAdminPackage.type + ' - ' + selectedAdminPackage.name,
        totalPrice: selectedAdminPackage.price,
        advancePayment: selectedAdminPackage.price / 2,
        balancePayment: selectedAdminPackage.price / 2,
        packagePages: selectedAdminPackage.pages,
        packageHosting: selectedAdminPackage.hosting,
        packageEmails: selectedAdminPackage.emails,
        packageDetails: selectedAdminPackage.details,
        adminPackageId: selectedAdminPackage.id,
        adminPackageKey: selectedAdminPackage.packageKey
      };
    }
    const tier = packageTier(state.pages, state.businessModel, state.websitePath);
    const type = pricingType(state.businessModel, state.websitePath);
    const total = pricingRules[type][tier];
    return {
      pricingType: type,
      pricingTypeLabel: type === 'custom' ? 'Custom Business web design' : 'Standard Business web design',
      packageName: tier,
      packageLabel: (type === 'custom' ? 'Custom Business' : 'Standard Business') + ' - ' + tier,
      totalPrice: total,
      advancePayment: total / 2,
      balancePayment: total / 2,
      packagePages: packagePageText(tier),
      packageHosting: '',
      packageEmails: '',
      packageDetails: ''
    };
  }

  function showAlert(type, message) {
    if (!alertBox) return;
    alertBox.className = 'form-alert ' + type;
    alertBox.textContent = message;
  }

  function clearAlert() {
    if (!alertBox) return;
    alertBox.className = 'form-alert';
    alertBox.textContent = '';
  }

  function selectOption(group, value) {
    const grid = document.querySelector(`.option-grid[data-group="${group}"]`);
    if (!grid) return;

    grid.querySelectorAll('.option-card[data-value]').forEach(btn => {
      const selected = btn.dataset.value === value;
      btn.classList.toggle('selected', selected);
      btn.classList.toggle('active', selected);
      btn.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });
  }

  function ensurePricingSummary() {
    const summaryList = document.querySelector('.summary-list');
    if (!summaryList) return;

    if (!document.getElementById('summaryPackage')) {
      const row = document.createElement('div');
      row.className = 'summary-row price-row';
      row.innerHTML = `<span>${isSinhala ? 'පැකේජය' : 'Package'}</span><strong id="summaryPackage">Starter</strong>`;
      summaryList.appendChild(row);
    }

    if (!document.getElementById('summaryPrice')) {
      const row = document.createElement('div');
      row.className = 'summary-row price-row highlight-price';
      row.innerHTML = `<span>${isSinhala ? 'ආරම්භක මිල' : 'Starting Price'}</span><strong id="summaryPrice">LKR 50,000</strong>`;
      summaryList.appendChild(row);
    }

    if (!document.getElementById('summaryAdvance')) {
      const row = document.createElement('div');
      row.className = 'summary-row price-row';
      row.innerHTML = `<span>${isSinhala ? '50% අත්තිකාරම්' : '50% Advance'}</span><strong id="summaryAdvance">LKR 25,000</strong>`;
      summaryList.appendChild(row);
    }
  }

  function updateSummary() {
    const summaryName = document.getElementById('summaryBusinessName');
    const summaryType = document.getElementById('summaryBusinessType');
    const summaryPages = document.getElementById('summaryPages');
    const summaryModel = document.getElementById('summaryModel');
    const summaryPath = document.getElementById('summaryPath');

    const pricing = calculatePrice();

    ensurePricingSummary();

    if (summaryName && businessNameInput) summaryName.textContent = businessNameInput.value || (isSinhala ? 'ඔබගේ ව්‍යාපාරය' : 'Your Business');
    if (summaryType) summaryType.textContent = autoBusinessType || (isSinhala ? 'තවම එක් කර නැත' : 'Not added');
    if (summaryPages) summaryPages.textContent = state.pages;
    if (summaryModel) summaryModel.textContent = state.businessModel;
    if (summaryPath) summaryPath.textContent = state.websitePath;

    const summaryPackage = document.getElementById('summaryPackage');
    const summaryPrice = document.getElementById('summaryPrice');
    const summaryAdvance = document.getElementById('summaryAdvance');

    if (summaryPackage) summaryPackage.textContent = pricing.packageLabel + ' (' + pricing.packagePages + ')';
    if (summaryPrice) summaryPrice.textContent = formatLkr(pricing.totalPrice);
    if (summaryAdvance) summaryAdvance.textContent = formatLkr(pricing.advancePayment);

    try {
      localStorage.setItem('wdlk_pricing_preview', JSON.stringify(pricing));
    } catch(e) {}
  }

  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.option-grid[data-group] .option-card[data-value]');
    if(!btn) return;
    const grid = btn.closest('.option-grid[data-group]');
    if (!grid) return;
    const group = grid.dataset.group;
    const value = btn.dataset.value;
    if (!group || !value) return;
    state[group] = value;
    selectOption(group, value);
    updateSummary();
    clearAlert();
  });
  if (businessNameInput) businessNameInput.addEventListener('input', function(){
    localStorage.setItem('wdlk_business_name', this.value.trim());
    updateSummary();
    clearAlert();
  });
  if (servicesInput) servicesInput.addEventListener('input', clearAlert);
  if (additionalInfo) additionalInfo.addEventListener('input', clearAlert);

  selectOption('pages', state.pages);
  selectOption('businessModel', state.businessModel);
  selectOption('websitePath', state.websitePath);
  updateSummary();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearAlert();

    const pricing = calculatePrice();

    const data = {
      businessName: businessNameInput.value.trim(),
      businessType: autoBusinessType,
      mainServices: servicesInput.value.trim(),
      pages: state.pages,
      pageCount: state.pages,
      businessModel: state.businessModel,
      websitePath: state.websitePath,
      feature: 'Mobile Friendly Website',
      additionalInfo: additionalInfo.value.trim(),
      pricingType: pricing.pricingType,
      pricingTypeLabel: pricing.pricingTypeLabel,
      packageName: pricing.packageName,
      packageLabel: pricing.packageLabel,
      packagePages: pricing.packagePages,
      packageHosting: pricing.packageHosting || '',
      packageEmails: pricing.packageEmails || '',
      packageDetails: pricing.packageDetails || '',
      adminPackageId: pricing.adminPackageId || '',
      adminPackageKey: pricing.adminPackageKey || '',
      totalPrice: pricing.totalPrice,
      advancePayment: pricing.advancePayment,
      balancePayment: pricing.balancePayment,
      savedAt: new Date().toISOString()
    };

    if (!data.businessName || !data.mainServices || !data.pages || !data.businessModel || !data.websitePath) {
      showAlert('error', isSinhala ? 'ඉදිරියට යාමට පෙර අවශ්‍ය වෙබ් අඩවි විස්තර සම්පූර්ණ කරන්න.' : 'Please complete the required website details before continuing.');
      return;
    }

    try {
      localStorage.setItem('wdlk_step2_details', JSON.stringify(data));
      localStorage.setItem('wdlk_step2', JSON.stringify(data));
      localStorage.setItem('wdlk_pricing', JSON.stringify(pricing));
      localStorage.setItem('wdlk_business_name', data.businessName);
      localStorage.setItem('wdlk_website_path', data.websitePath);
      localStorage.setItem('wdlk_pages', data.pages);
      localStorage.setItem('wdlk_total_price', String(data.totalPrice));
      localStorage.setItem('wdlk_advance_payment', String(data.advancePayment));
      localStorage.setItem('wdlk_balance_payment', String(data.balancePayment));
    } catch (err) {}

    const detailsSync = Promise.resolve(window.WebDevV52Sync && window.WebDevV52Sync.saveProjectAsync ? window.WebDevV52Sync.saveProjectAsync('details_submitted') : null).catch(() => {});
    showAlert('success', isSinhala ? 'වෙබ් අඩවි විස්තර සුරකින ලදී. තේමා තේරීම වෙත යමින්...' : 'Website details saved. Redirecting to theme selection...');
    if(window.WDLK_AI_TRANSITION && window.WDLK_AI_TRANSITION.playAndNavigate){
      detailsSync.finally(() => window.WDLK_AI_TRANSITION.playAndNavigate('theme-selection.php', {reason:'details'}));
    } else {
      detailsSync.finally(() => {
        if(window.WebDevDataRecorder && window.WebDevDataRecorder.capture) window.WebDevDataRecorder.capture('details_submitted');
        setTimeout(function () {
          window.location.href = 'theme-selection.php';
        }, 300);
      });
    }
  });
})();
