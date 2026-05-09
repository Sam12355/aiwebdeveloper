
(function(){
  const DEFAULT_PACKAGES = [
    {id:'standard-starter', type:'Standard Business web design', name:'Starter', price:50000, pages:'5 Pages', hosting:'2 GB', emails:'1 Email address', details:'5 Pages, Animated Slider / Images, Content writing, Mobile responsive, Domain name, Web hosting, Contact form / Google map, Website visitor reports.', status:'Active', sortOrder:1},
    {id:'standard-business', type:'Standard Business web design', name:'Business', price:80000, pages:'10 Pages', hosting:'5 GB', emails:'3 Email addresses', details:'10 Pages, Products or Services pages, Content writing, Mobile responsive, Domain name, Web hosting, Contact form / Google map, Website visitor reports.', status:'Active', sortOrder:2},
    {id:'standard-corporate', type:'Standard Business web design', name:'Corporate', price:120000, pages:'Unlimited Pages', hosting:'10 GB', emails:'10 Email addresses', details:'Unlimited pages for products or services, Content writing, Mobile responsive, Domain name, Web hosting, Contact form / Google map, Website visitor reports.', status:'Active', sortOrder:3},
    {id:'custom-starter', type:'Custom Business website design', name:'Starter', price:50000, pages:'5 Pages', hosting:'2 GB', emails:'1 Email address', details:'Starter custom business website package with core business features.', status:'Active', sortOrder:4},
    {id:'custom-business', type:'Custom Business website design', name:'Business', price:80000, pages:'10 Pages', hosting:'5 GB', emails:'3 Email addresses', details:'Business custom website package for growing brands and companies.', status:'Active', sortOrder:5},
    {id:'custom-corporate', type:'Custom Business website design', name:'Corporate', price:150000, pages:'Unlimited Pages', hosting:'10 GB', emails:'10 Email addresses', details:'Corporate custom package for larger websites and advanced business requirements.', status:'Active', sortOrder:6}
  ];

  const isAdmin = /admin-dashboard\.(html|php)|\/my-admin/.test(location.pathname);
  const isDetails = /details\.php/.test(location.pathname);
  const isTheme = /theme-selection\.php/.test(location.pathname);
  const isSinhala = document.documentElement.lang === 'si' || location.pathname.includes('/sn/');

  const T = {
    selectPackage: isSinhala ? 'වෙබ් අඩවි පැකේජය තෝරන්න' : 'Select Website Package',
    packagesSync: isSinhala ? 'මෙම package details සහ මිල ගණන් admin panel එකෙන් real-time sync වේ.' : 'These package details and prices are synced from the admin panel in realtime.',
    package: isSinhala ? 'පැකේජය' : 'Package',
    startingPrice: isSinhala ? 'ආරම්භක මිල' : 'Starting Price',
    advance: isSinhala ? '50% අත්තිකාරම්' : '50% Advance',
    hosting: isSinhala ? 'හොස්ටින්' : 'Hosting',
    emails: isSinhala ? 'ඊමේල්' : 'Email Accounts',
    continueText: isSinhala ? 'ඉදිරියට යන්න' : 'Continue',
    selectedPackage: isSinhala ? 'තෝරාගත් පැකේජය' : 'Selected Package',
    selectedPrice: isSinhala ? 'මිල' : 'Price'
  };

  function safeJson(key, fallback){
    try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
    catch(e){ return fallback; }
  }
  function saveJson(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
  function esc(v){ return String(v ?? '').replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s])); }
  function slug(v){ return String(v || '').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') || ('package-' + Date.now()); }
  function money(v){ return 'LKR ' + Number(v || 0).toLocaleString('en-US'); }
  function apiUrl(){
    if(location.pathname.includes('/sn/')) return '../backend/api/packages-manage.php';
    return 'backend/api/packages-manage.php';
  }
  function normalize(list){
    return (Array.isArray(list) ? list : []).map((p, i) => ({
      id: p.id || p.packageKey || p.package_key || slug((p.type || p.package_type || 'package') + '-' + (p.name || p.package_name || i)),
      packageKey: p.packageKey || p.package_key || p.id || slug((p.type || p.package_type || 'package') + '-' + (p.name || p.package_name || i)),
      type: p.type || p.package_type || 'Standard Business web design',
      name: p.name || p.package_name || 'Package',
      price: Number(p.price || p.startingPrice || p.starting_price || 0),
      pages: p.pages || '',
      hosting: p.hosting || '',
      emails: p.emails || p.emailAccounts || p.email_accounts || '',
      details: p.details || p.package_details || p.description || '',
      status: p.status || 'Active',
      sortOrder: Number(p.sortOrder || p.sort_order || i),
      updatedAt: p.updatedAt || p.updated_at || new Date().toISOString()
    })).sort((a,b) => (a.sortOrder - b.sortOrder) || (a.price - b.price));
  }
  function packages(){
    const stored = safeJson('wdlk_admin_package_prices', []);
    if(Array.isArray(stored) && stored.length) return normalize(stored);
    saveJson('wdlk_admin_package_prices', DEFAULT_PACKAGES);
    return normalize(DEFAULT_PACKAGES);
  }
  function setPackages(list){
    const normalized = normalize(list);
    saveJson('wdlk_admin_package_prices', normalized);
    localStorage.setItem('wdlk_package_sync_ping', String(Date.now()));
    document.dispatchEvent(new CustomEvent('wdlk:packages-updated'));
    return normalized;
  }
  function activePackages(){
    return packages().filter(p => String(p.status || 'Active').toLowerCase() !== 'hidden');
  }
  function selectedPackage(){
    const id = localStorage.getItem('wdlk_selected_package_id');
    if(!id) return null;
    return packages().find(p => p.id === id || p.packageKey === id) || null;
  }
  function choosePackage(id){
    const p = activePackages().find(x => x.id === id || x.packageKey === id);
    if(!p) return;
    localStorage.setItem('wdlk_selected_package_id', p.id);
    const pricing = {
      pricingType: /custom/i.test(p.type) ? 'custom' : 'standard',
      pricingTypeLabel: p.type,
      packageName: p.name,
      packageLabel: p.type + ' - ' + p.name,
      packagePages: p.pages,
      packageHosting: p.hosting,
      packageEmails: p.emails,
      packageDetails: p.details,
      totalPrice: p.price,
      advancePayment: p.price / 2,
      balancePayment: p.price / 2,
      adminPackageId: p.id,
      adminPackageKey: p.packageKey || p.id,
      updatedAt: new Date().toISOString()
    };
    saveJson('wdlk_pricing_preview', pricing);
    saveJson('wdlk_pricing', pricing);
    localStorage.setItem('wdlk_total_price', String(pricing.totalPrice));
    localStorage.setItem('wdlk_advance_payment', String(pricing.advancePayment));
    localStorage.setItem('wdlk_balance_payment', String(pricing.balancePayment));
    updateDetailsSummary(pricing);
    renderDetailsPackages();
    renderThemePackageSync();
    if(window.WebDevV52Sync){ window.WebDevV52Sync.saveProject('package_selected'); }
  }

  function serverList(){
    if(location.protocol === 'file:') return Promise.resolve(packages());
    return fetch(apiUrl(), {credentials:'include'})
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if(data && data.success && Array.isArray(data.packages)){
          const normalized = normalize(data.packages);
          if(normalized.length){
            saveJson('wdlk_admin_package_prices', normalized);
            return normalized;
          }
        }
        return packages();
      })
      .catch(() => packages());
  }

  function renderDetailsLayout(){
    if(!isDetails) return;
    const alertBox = document.getElementById('detailsAlert');
    const form = alertBox ? alertBox.closest('form') : document.querySelector('form');
    const aside = document.querySelector('aside.side-column');
    if(!form || !aside) return;

    if(!document.querySelector('.v55-details-shell')){
      const shell = document.createElement('div');
      shell.className = 'v55-details-shell';
      const left = document.createElement('div');
      left.className = 'v55-left-stack';
      const right = document.createElement('div');
      right.className = 'v55-right-stack';

      const parent = form.parentElement;
      parent.parentNode.insertBefore(shell, parent);
      shell.appendChild(left);
      shell.appendChild(right);
      left.appendChild(form);
      right.appendChild(aside);
      if(parent.children.length === 0 || !parent.contains(form)) parent.remove();
    }

    const summaryCard = document.querySelector('.summary-card');
    if(summaryCard && !summaryCard.querySelector('.v55-summary-continue')){
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'v55-summary-continue';
      btn.textContent = T.continueText;
      btn.addEventListener('click', function(){
        const frm = document.querySelector('form');
        if(frm && typeof frm.requestSubmit === 'function') frm.requestSubmit();
        else if(frm) frm.submit();
      });
      summaryCard.appendChild(btn);
    }
  }

  function renderDetailsPackages(){
    if(!isDetails) return;
    renderDetailsLayout();
    const alertBox = document.getElementById('detailsAlert');
    const form = alertBox ? alertBox.closest('form') : document.querySelector('form');
    if(!form) return;

    let box = document.getElementById('v54FrontendPackageSelector');
    if(!box){
      box = document.createElement('section');
      box.id = 'v54FrontendPackageSelector';
      box.className = 'frontend-package-selector reveal up';
      box.innerHTML = `
        <div class="section-mini-heading">
          <h2>${T.selectPackage}</h2>
          <p>${T.packagesSync}</p>
        </div>
        <div class="frontend-package-grid" id="v54FrontendPackageGrid"></div>
      `;
      const anchor = document.getElementById('detailsAlert') || form.lastElementChild;
      form.insertBefore(box, anchor);
    }
    const grid = document.getElementById('v54FrontendPackageGrid');
    const selected = localStorage.getItem('wdlk_selected_package_id');
    grid.innerHTML = activePackages().map(p => `
      <button type="button" class="frontend-package-card ${selected === p.id ? 'selected':''}" data-package-id="${esc(p.id)}">
        <span class="package-type">${esc(p.type)}</span>
        <strong>${esc(p.name)}</strong>
        <em>${money(p.price)}</em>
        <small>${esc(p.pages || '')}${p.hosting ? ' | ' + esc(p.hosting) : ''}${p.emails ? ' | ' + esc(p.emails) : ''}</small>
        <p>${esc(p.details || '')}</p>
      </button>
    `).join('');
  }

  function updateDetailsSummary(pricing){
    if(!isDetails) return;
    const summaryList = document.querySelector('.summary-card .summary-list');
    if(!summaryList) return;
    const ensure = (id, label) => {
      let row = summaryList.querySelector('[data-summary="'+id+'"]');
      if(!row){
        row = document.createElement('div');
        row.className = 'summary-row';
        row.dataset.summary = id;
        row.innerHTML = `<span>${label}</span><strong id="${id}"></strong>`;
        summaryList.appendChild(row);
      }
      return row.querySelector('strong');
    };
    ensure('summaryPackage', T.package).textContent = pricing.packageLabel + (pricing.packagePages ? ' (' + pricing.packagePages + ')' : '');
    ensure('summaryPrice', T.startingPrice).textContent = money(pricing.totalPrice);
    ensure('summaryAdvance', T.advance).textContent = money(pricing.advancePayment);
    ensure('summaryHosting', T.hosting).textContent = pricing.packageHosting || '-';
    ensure('summaryEmails', T.emails).textContent = pricing.packageEmails || '-';
  }

  function renderThemePackageSync(){
    if(!isTheme) return;
    const summaryList = document.querySelector('.theme-summary-card .summary-list, .summary-card .summary-list');
    if(!summaryList) return;
    const pkg = selectedPackage();
    if(!pkg) return;
    const ensure = (id, label) => {
      let row = summaryList.querySelector('[data-theme-sync="'+id+'"]');
      if(!row){
        row = document.createElement('div');
        row.className = 'summary-row';
        row.dataset.themeSync = id;
        row.innerHTML = `<span>${label}</span><strong id="${id}"></strong>`;
        summaryList.appendChild(row);
      }
      return row.querySelector('strong');
    };
    ensure('themeSummaryPackageV55', T.selectedPackage).textContent = pkg.type + ' - ' + pkg.name;
    ensure('themeSummaryPriceV55', T.selectedPrice).textContent = money(pkg.price);
  }

  function bindPackageCards(){
    document.addEventListener('click', function(e){
      const card = e.target.closest('[data-package-id]');
      if(card) choosePackage(card.dataset.packageId);
    }, true);
  }

  function init(){
    bindPackageCards();
    serverList().then(() => {
      if(isDetails){
        renderDetailsPackages();
        const pkg = selectedPackage();
        if(pkg) choosePackage(pkg.id);
      }
      if(isTheme) renderThemePackageSync();
    });
    window.addEventListener('storage', function(e){
      if(e.key === 'wdlk_admin_package_prices' || e.key === 'wdlk_package_sync_ping' || e.key === 'wdlk_selected_package_id'){
        if(isDetails){
          renderDetailsPackages();
          const pkg = selectedPackage();
          if(pkg) choosePackage(pkg.id);
        }
        if(isTheme) renderThemePackageSync();
      }
    });
  }

  window.WebDevV56PriceSync = {
    packages, activePackages, selectedPackage, choosePackage, renderDetailsPackages, renderThemePackageSync
  };
  document.addEventListener('DOMContentLoaded', init);
})();
