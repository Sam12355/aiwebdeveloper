
(function(){
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  function safeJson(key, fallback = []){
    try{return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));}
    catch(e){return fallback;}
  }
  function saveJson(key, value){localStorage.setItem(key, JSON.stringify(value));}

  function mergeBackendData(data){
    if(!data || !data.success) return;
    if(Array.isArray(data.projects) && data.projects.length){
      const local = allProjects();
      const mapped = data.projects.map(p => ({
        id:p.invoice_no,
        invoiceNo:p.invoice_no,
        projectKey:p.project_key,
        businessName:p.business_name,
        customerName:p.customer_name,
        contactNumber:p.contact_number,
        email:p.email,
        businessType:p.business_type,
        mainServices:p.main_services,
        pageCount:p.page_count,
        businessModel:p.business_model,
        websitePath:p.website_path,
        theme:p.theme_name,
        themeCategory:p.theme_category,
        packageName:p.package_name,
        packageLabel:p.package_label,
        pricingTypeLabel:p.pricing_type_label,
        totalPrice:Number(p.total_price || 0),
        advancePayment:Number(p.advance_payment || 0),
        balancePayment:Number(p.balance_payment || 0),
        paymentStatus:p.payment_status,
        finalPaymentStatus:p.final_payment_status,
        status:p.status,
        stage:p.stage,
        progressPercent:Number(p.progress_percent || 0),
        liveUrl:p.live_url,
        renewalDate:p.renewal_date,
        raw:p.raw_json ? JSON.parse(p.raw_json || '{}') : {},
        createdAt:p.created_at,
        updatedAt:p.updated_at
      }));
      const byKey = new Map();
      [...mapped, ...local].forEach(p => byKey.set(p.projectKey || p.invoiceNo || p.id, p));
      saveJson('wdlk_admin_projects', Array.from(byKey.values()));
    }
    if(Array.isArray(data.packages) && data.packages.length){
      saveJson('wdlk_admin_package_prices', data.packages.map(p => ({
        id:p.package_key,
        type:p.package_type,
        name:p.package_name,
        price:Number(p.starting_price || 0),
        pages:p.pages,
        hosting:p.hosting,
        emails:p.email_accounts,
        status:p.status
      })));
    }
    if(Array.isArray(data.templates) && data.templates.length){
      saveJson('wdlk_admin_templates', data.templates.map(t => ({
        id:t.template_key,
        name:t.name,
        category:t.category,
        status:t.status,
        image:t.image,
        demoUrl:t.demo_url,
        notes:t.notes
      })));
    }
    if(Array.isArray(data.receipts) && data.receipts.length){
      saveJson('wdlk_admin_backend_receipts', data.receipts);
    }
  }

  function fetchBackendData(){
    if(location.protocol === 'file:') return Promise.resolve();
    return fetch('backend/api/admin-dashboard-data.php', {credentials:'include'})
      .then(r => r.ok ? r.json() : null)
      .then(data => { mergeBackendData(data); renderAll(); })
      .catch(() => {});
  }


  const defaultPackages = [
    {id:'standard-starter', type:'Standard Business web design', name:'Starter', price:50000, pages:'5 Pages', emails:'1 Email address', hosting:'2 GB'},
    {id:'standard-business', type:'Standard Business web design', name:'Business', price:80000, pages:'10 Pages', emails:'3 Email addresses', hosting:'5 GB'},
    {id:'standard-corporate', type:'Standard Business web design', name:'Corporate', price:120000, pages:'Unlimited pages', emails:'10 Email addresses', hosting:'10 GB'},
    {id:'custom-starter', type:'Custom Business website design', name:'Starter', price:50000, pages:'5 Pages', emails:'1 Email address', hosting:'2 GB'},
    {id:'custom-business', type:'Custom Business website design', name:'Business', price:80000, pages:'10 Pages', emails:'3 Email addresses', hosting:'5 GB'},
    {id:'custom-corporate', type:'Custom Business website design', name:'Corporate', price:150000, pages:'Unlimited pages', emails:'10 Email addresses', hosting:'10 GB'}
  ];

  const defaultTemplates = [
    {id:'template-business-modern', category:'Business', name:'Modern Business', status:'Active', notes:'General business website theme.'},
    {id:'template-ecommerce-clean', category:'E-commerce', name:'Clean Product Store', status:'Active', notes:'Product and online store style.'},
    {id:'template-hotel-food', category:'Hotel / Food', name:'Hospitality Landing', status:'Active', notes:'Hotel, villa, restaurant style.'}
  ];

  function ensureDefaults(){
    if(!safeJson('wdlk_admin_package_prices', null)) saveJson('wdlk_admin_package_prices', defaultPackages);
    if(!safeJson('wdlk_admin_templates', null)) saveJson('wdlk_admin_templates', defaultTemplates);
  }

  function money(n){ return 'LKR ' + Number(n || 0).toLocaleString('en-US'); }
  function esc(v){return String(v ?? '').replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));}

  function allProjects(){
    const projects = safeJson('wdlk_admin_projects', []);
    return Array.isArray(projects) ? projects : [];
  }
  function allPayments(){
    const direct = safeJson('wdlk_admin_payment_records', []);
    const receipts = [
      ...safeJson('wdlk_bank_receipts', []),
      ...safeJson('wdlk_admin_backend_receipts', [])
    ];
    const merged = Array.isArray(direct) ? direct.slice() : [];
    if(Array.isArray(receipts)){
      receipts.forEach(r => {
        if(!merged.some(p => p.receiptId === r.id || p.receiptFile === r.fileName)){
          merged.push({
            paymentKey:r.id || ('receipt-' + Date.now()),
            receiptId:r.id,
            projectKey:r.projectKey || localStorage.getItem('wdlk_project_key') || '',
            invoiceNo:r.invoiceNumber || localStorage.getItem('wdlk_invoice_number') || '',
            businessName:r.businessName || '',
            customerName:r.customerName || '',
            paymentType:r.paymentType || 'advance',
            amount:r.amount || 0,
            method:r.method || 'Bank Transfer / Manual Deposit',
            status:r.status || 'pending_verification',
            receiptFile:r.fileName || '',
            updatedAt:r.submittedAt || r.createdAt || new Date().toISOString()
          });
        }
      });
    }
    return merged.sort((a,b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
  }

  function addNav(){
    const nav = $('.admin-nav');
    if(!nav || nav.dataset.v48Enhanced) return;
    nav.dataset.v48Enhanced = 'yes';
    const back = [...nav.querySelectorAll('a')].find(a => a.textContent.includes('Back to Website'));
    const items = [
      ['full-data','📋 Full Data'],
      ['payment-records','💳 Payment Records'],
      ['template-manager','▧ Templates'],
      ['package-manager','💰 Package Prices'],
      ['client-inbox','📨 Client Inbox']
    ];
    items.forEach(([tab,label]) => {
      const a = document.createElement('a');
      a.href = '#';
      a.dataset.adminTab = tab;
      a.textContent = label;
      nav.insertBefore(a, back || null);
    });
  }

  function addSections(){
    const main = $('.admin-content');
    if(!main || document.getElementById('full-data')) return;

    main.insertAdjacentHTML('beforeend', `
      <section id="full-data" class="admin-section">
        <div class="admin-card">
          <h2>Full Customer Data Records</h2>
          <p>All data gathered through the website flow appears here from browser storage and backend sync.</p>
          <div class="admin-mini-toolbar">
            <button type="button" id="refreshFullData">Refresh Data</button>
            <button type="button" id="exportFullData">Export JSON</button>
          </div>
          <div id="fullDataList" class="admin-data-grid"></div>
        </div>
      </section>

      <section id="payment-records" class="admin-section">
        <div class="admin-card">
          <h2>Client Payment Records</h2>
          <p>Advance and final payment records update in realtime when the client submits payment details or bank slip information.</p>
          <div class="admin-mini-toolbar">
            <button type="button" id="refreshPaymentRecords">Refresh Payments</button>
          </div>
          <div class="admin-table-wrap">
            <table class="admin-wide-table">
              <thead><tr><th>Invoice</th><th>Business</th><th>Payment</th><th>Amount</th><th>Status</th><th>Receipt</th><th>Updated</th></tr></thead>
              <tbody id="paymentRecordsBody"></tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="template-manager" class="admin-section">
        <div class="admin-card">
          <h2>Template Management</h2>
          <form class="admin-form" id="templateForm">
            <label>Template Name<input id="tplName" type="text" required></label>
            <label>Category<input id="tplCategory" type="text" placeholder="Business / E-commerce / Hotel" required></label>
            <label>Status<select id="tplStatus"><option>Active</option><option>Hidden</option><option>Coming Soon</option></select></label>
            <label>Notes<textarea id="tplNotes" placeholder="Theme notes, demo URL, layout direction"></textarea></label>
            <button class="admin-submit" type="submit">Save Template</button>
          </form>
          <div id="templateList" class="admin-manager-list"></div>
        </div>
      </section>

      <section id="package-manager" class="admin-section">
        <div class="admin-card">
          <h2>Package Price Management</h2>
          <form class="admin-form" id="packageForm">
            <label>Package Type<select id="pkgType"><option>Standard Business web design</option><option>Custom Business website design</option></select></label>
            <label>Package Name<select id="pkgName"><option>Starter</option><option>Business</option><option>Corporate</option></select></label>
            <label>Starting Price<input id="pkgPrice" type="number" min="0" step="1000" required></label>
            <label>Pages<input id="pkgPages" type="text" placeholder="5 Pages / 10 Pages / Unlimited"></label>
            <label>Hosting<input id="pkgHosting" type="text" placeholder="2 GB / 5 GB / 10 GB"></label>
            <label>Email Accounts<input id="pkgEmails" type="text" placeholder="1 Email address"></label>
            <button class="admin-submit" type="submit">Save Package Price</button>
          </form>
          <div id="packageList" class="admin-manager-list"></div>
        </div>
      </section>

      <section id="client-inbox" class="admin-section">
        <div class="admin-card">
          <h2>Client Inbox / Manual Email Reply</h2>
          <p>For now, this stores replies and opens your email app. Production PHP email endpoint is included for later server sending.</p>
          <form class="admin-form" id="clientReplyForm">
            <label>Project / Invoice<select id="replyProject"></select></label>
            <label>Client Email<input id="replyEmail" type="email" placeholder="client@email.com"></label>
            <label>Subject<input id="replySubject" type="text" value="Your Webdeveloper.lk Website Project Update"></label>
            <label>Message<textarea id="replyMessage" required placeholder="Write manual reply to client..."></textarea></label>
            <button class="admin-submit" type="submit">Save Reply & Open Email</button>
          </form>
          <div id="replyList" class="admin-manager-list"></div>
        </div>
      </section>
    `);
  }

  function renderFullData(){
    const target = $('#fullDataList');
    if(!target) return;
    const projects = allProjects();
    target.innerHTML = projects.length ? projects.map(p => `
      <div class="admin-data-card">
        <h3>${esc(p.businessName || 'Business')}</h3>
        <dl>
          <dt>Invoice</dt><dd>${esc(p.invoiceNo || p.id || '')}</dd>
          <dt>Customer</dt><dd>${esc(p.customerName || '')}</dd>
          <dt>Phone</dt><dd>${esc(p.contactNumber || '')}</dd>
          <dt>Email</dt><dd>${esc(p.email || '')}</dd>
          <dt>Business Type</dt><dd>${esc(p.businessType || '')}</dd>
          <dt>Services</dt><dd>${esc(p.mainServices || '')}</dd>
          <dt>Pages</dt><dd>${esc(p.pageCount || '')}</dd>
          <dt>Model</dt><dd>${esc(p.businessModel || '')}</dd>
          <dt>Path</dt><dd>${esc(p.websitePath || '')}</dd>
          <dt>Theme</dt><dd>${esc(p.theme || '')}</dd>
          <dt>Package</dt><dd>${esc(p.packageLabel || p.packageName || '')}</dd>
          <dt>Total</dt><dd>${money(p.totalPrice)}</dd>
          <dt>Advance</dt><dd>${money(p.advancePayment)}</dd>
          <dt>Balance</dt><dd>${money(p.balancePayment)}</dd>
          <dt>Stage</dt><dd>${esc(p.stage || '')}</dd>
        </dl>
        <details style="margin-top:12px"><summary>Raw Data</summary><pre class="admin-json-box">${esc(JSON.stringify(p.raw || {}, null, 2))}</pre></details>
      </div>
    `).join('') : '<p>No customer data records yet.</p>';
  }

  function renderPayments(){
    const body = $('#paymentRecordsBody');
    if(!body) return;
    const payments = allPayments();
    body.innerHTML = payments.length ? payments.map(p => `
      <tr>
        <td>${esc(p.invoiceNo || '')}</td>
        <td><strong>${esc(p.businessName || '')}</strong><br><small>${esc(p.customerName || '')}</small></td>
        <td>${esc(p.paymentType || '')}<br><small>${esc(p.method || '')}</small></td>
        <td>${money(p.amount)}</td>
        <td><span class="admin-pill ${String(p.status||'').includes('pending') ? 'red' : 'green'}">${esc(/received|paid|verified/i.test(String(p.status || '')) ? 'received' : (p.status || ''))}</span></td>
        <td>${esc(p.receiptFile || 'No slip recorded')}</td>
        <td>${p.updatedAt ? new Date(p.updatedAt).toLocaleString() : ''}<br>${/received|paid|verified/i.test(String(p.status || '')) ? '<button class="mini-btn green" type="button" disabled>Received</button>' : `<button class="mini-btn green" type="button" data-enhance-verify-payment="${esc(p.paymentKey || p.receiptId || '')}" data-backend-payment-id="${esc(p.backendPaymentId || '')}" data-project-id="${esc(p.projectId || '')}" data-payment-type="${esc(p.paymentType || 'advance')}">Verify</button>`}</td>
      </tr>
    `).join('') : '<tr><td colspan="7">No payment records yet.</td></tr>';
  }

  function renderTemplates(){
    const target = $('#templateList');
    if(!target) return;
    const list = safeJson('wdlk_admin_templates', defaultTemplates);
    target.innerHTML = list.map(t => `
      <div class="manager-item">
        <strong>${esc(t.name)}</strong>
        <small>${esc(t.category)} | ${esc(t.status)}</small>
        <p>${esc(t.notes || '')}</p>
      </div>
    `).join('');
  }

  function renderPackages(){
    const target = $('#packageList');
    if(!target) return;
    const list = safeJson('wdlk_admin_package_prices', defaultPackages);
    target.innerHTML = list.map(p => `
      <div class="manager-item">
        <strong>${esc(p.type)} - ${esc(p.name)}: ${money(p.price)}</strong>
        <small>${esc(p.pages)} | ${esc(p.hosting)} | ${esc(p.emails)}</small>
      </div>
    `).join('');
  }

  function renderReplyProjects(){
    const select = $('#replyProject');
    if(!select) return;
    const projects = allProjects();
    select.innerHTML = projects.map(p => `<option value="${esc(p.projectKey || p.invoiceNo || p.id)}" data-email="${esc(p.email || '')}">${esc(p.invoiceNo || p.id)} - ${esc(p.businessName)}</option>`).join('');
    select.addEventListener('change', () => {
      const opt = select.options[select.selectedIndex];
      if($('#replyEmail') && opt) $('#replyEmail').value = opt.dataset.email || '';
    });
    if(select.options[0]) {
      select.dispatchEvent(new Event('change'));
    }
  }

  function renderReplies(){
    const target = $('#replyList');
    if(!target) return;
    const replies = safeJson('wdlk_admin_email_replies', []);
    target.innerHTML = replies.length ? replies.map(r => `
      <div class="manager-item">
        <strong>${esc(r.subject)}</strong>
        <small>${esc(r.email)} | ${new Date(r.createdAt).toLocaleString()}</small>
        <p>${esc(r.message)}</p>
      </div>
    `).join('') : '<p>No manual replies saved yet.</p>';
  }

  function bindForms(){
    const tpl = $('#templateForm');
    if(tpl && !tpl.dataset.bound){
      tpl.dataset.bound = 'yes';
      tpl.addEventListener('submit', e => {
        e.preventDefault();
        const list = safeJson('wdlk_admin_templates', defaultTemplates);
        list.unshift({
          id:'tpl-' + Date.now(),
          name:$('#tplName').value.trim(),
          category:$('#tplCategory').value.trim(),
          status:$('#tplStatus').value,
          notes:$('#tplNotes').value.trim(),
          createdAt:new Date().toISOString()
        });
        saveJson('wdlk_admin_templates', list);
        try{
          fetch('backend/api/templates-manage.php', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            credentials:'include',
            body:JSON.stringify({action:'save', templateKey:list[0].id, name:list[0].name, category:list[0].category, status:list[0].status, notes:list[0].notes})
          }).catch(()=>{});
        }catch(e){}
        tpl.reset();
        renderTemplates();
      });
    }

    const pkg = $('#packageForm');
    if(pkg && !pkg.dataset.bound){
      pkg.dataset.bound = 'yes';
      pkg.addEventListener('submit', e => {
        e.preventDefault();
        const list = safeJson('wdlk_admin_package_prices', defaultPackages);
        const type = $('#pkgType').value;
        const name = $('#pkgName').value;
        const id = type.toLowerCase().replace(/[^a-z0-9]+/g,'-') + '-' + name.toLowerCase();
        const row = {
          id, type, name,
          price:Number($('#pkgPrice').value || 0),
          pages:$('#pkgPages').value.trim(),
          hosting:$('#pkgHosting').value.trim(),
          emails:$('#pkgEmails').value.trim(),
          updatedAt:new Date().toISOString()
        };
        const idx = list.findIndex(p => p.id === id);
        if(idx >= 0) list[idx] = row;
        else list.unshift(row);
        saveJson('wdlk_admin_package_prices', list);
        try{
          fetch('backend/api/packages-manage.php', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            credentials:'include',
            body:JSON.stringify({action:'save', packageType:row.type, packageName:row.name, startingPrice:row.price, pages:row.pages, hosting:row.hosting, emailAccounts:row.emails, status:'Active'})
          }).catch(()=>{});
        }catch(e){}
        pkg.reset();
        renderPackages();
      });
    }

    const reply = $('#clientReplyForm');
    if(reply && !reply.dataset.bound){
      reply.dataset.bound = 'yes';
      reply.addEventListener('submit', e => {
        e.preventDefault();
        const data = {
          id:'reply-' + Date.now(),
          projectKey:$('#replyProject').value,
          email:$('#replyEmail').value.trim(),
          subject:$('#replySubject').value.trim(),
          message:$('#replyMessage').value.trim(),
          createdAt:new Date().toISOString()
        };
        const list = safeJson('wdlk_admin_email_replies', []);
        list.unshift(data);
        saveJson('wdlk_admin_email_replies', list);

        try{
          fetch('backend/api/admin-reply-client.php', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            credentials:'include',
            body:JSON.stringify(data)
          }).catch(()=>{});
        }catch(e){}

        const mailto = 'mailto:' + encodeURIComponent(data.email) + '?subject=' + encodeURIComponent(data.subject) + '&body=' + encodeURIComponent(data.message);
        window.open(mailto, '_blank');
        reply.reset();
        renderReplies();
      });
    }

    const refreshFull = $('#refreshFullData');
    if(refreshFull && !refreshFull.dataset.bound){
      refreshFull.dataset.bound = 'yes';
      refreshFull.addEventListener('click', () => { renderAll(); });
    }

    const exportFull = $('#exportFullData');
    if(exportFull && !exportFull.dataset.bound){
      exportFull.dataset.bound = 'yes';
      exportFull.addEventListener('click', () => {
        const blob = new Blob([JSON.stringify(allProjects(), null, 2)], {type:'application/json'});
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'webdeveloper-project-data.json';
        a.click();
        URL.revokeObjectURL(a.href);
      });
    }

    const refreshPay = $('#refreshPaymentRecords');
    if(refreshPay && !refreshPay.dataset.bound){
      refreshPay.dataset.bound = 'yes';
      refreshPay.addEventListener('click', renderPayments);
    }

    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-enhance-verify-payment]');
      if(!btn || btn.dataset.verifying) return;
      btn.dataset.verifying = 'yes';
      fetch('backend/api/payment-verify.php', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        credentials:'include',
        body:JSON.stringify({
          paymentId: btn.dataset.backendPaymentId || 0,
          projectId: btn.dataset.projectId || 0,
          paymentType: btn.dataset.paymentType || 'advance'
        })
      }).then(r => r.json()).then(() => {
        if(window.WebDevAdminDbSync) return window.WebDevAdminDbSync.syncDashboard();
      }).then(() => renderAll()).catch(() => {}).finally(() => {
        delete btn.dataset.verifying;
      });
    }, {capture:true});
  }

  function bindTabs(){
    $$('[data-admin-tab]').forEach(link => {
      if(link.dataset.v48Bound) return;
      link.dataset.v48Bound = 'yes';
      link.addEventListener('click', e => {
        e.preventDefault();
        const tab = link.dataset.adminTab;
        $$('.admin-section').forEach(s => s.classList.toggle('active', s.id === tab));
        $$('.admin-nav a').forEach(a => a.classList.toggle('active', a.dataset.adminTab === tab));
        if(tab) history.replaceState(null, '', '#' + tab);
        renderAll();
      });
    });
  }

  function renderAll(){
    renderFullData();
    renderPayments();
    renderTemplates();
    renderPackages();
    renderReplyProjects();
    renderReplies();
  }

  function init(){
    ensureDefaults();
    addNav();
    addSections();
    bindTabs();
    bindForms();
    renderAll();
    fetchBackendData();

    const hash = location.hash.replace('#','');
    if(hash && document.getElementById(hash)){
      const link = document.querySelector(`[data-admin-tab="${hash}"]`);
      if(link) link.click();
    }

    window.addEventListener('storage', e => {
      if(e.key && e.key.indexOf('wdlk_') === 0) renderAll();
    });
    setInterval(renderAll, 8000);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
