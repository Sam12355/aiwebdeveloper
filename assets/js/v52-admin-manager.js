
(function(){
  const CATEGORY_OPTIONS = [
    ['recommended','Recommended'],
    ['business','Business'],
    ['corporate','Corporate'],
    ['ecommerce','Ecommerce'],
    ['creative','Creative'],
    ['hospitality','Hotel / Food'],
    ['product','Product'],
    ['minimal','Minimal']
  ];
  const DEFAULT_PACKAGES = [
    {id:'standard-starter', type:'Standard Business web design', name:'Starter', price:50000, pages:'5 Pages', hosting:'2 GB', emails:'1 Email address', details:'5 Pages, Animated Slider / Images, Content writing, Mobile responsive, Domain name, Web hosting, Contact form / Google map, Visitor reports'},
    {id:'standard-business', type:'Standard Business web design', name:'Business', price:80000, pages:'10 Pages', hosting:'5 GB', emails:'3 Email addresses', details:'10 Pages, Products or Services pages, Animated Slider / Images, Content writing, Mobile responsive, Domain name, Web hosting, Contact form / Google map, Visitor reports'},
    {id:'standard-corporate', type:'Standard Business web design', name:'Corporate', price:120000, pages:'Unlimited Pages', hosting:'10 GB', emails:'10 Email addresses', details:'Unlimited pages, Products / Services, Animated Slider / Images, Content writing, Mobile responsive, Domain name, Web hosting, Contact form / Google map, Visitor reports'},
    {id:'custom-starter', type:'Custom Business website design', name:'Starter', price:50000, pages:'5 Pages', hosting:'2 GB', emails:'1 Email address', details:'Custom Starter website package'},
    {id:'custom-business', type:'Custom Business website design', name:'Business', price:80000, pages:'10 Pages', hosting:'5 GB', emails:'3 Email addresses', details:'Custom Business website package'},
    {id:'custom-corporate', type:'Custom Business website design', name:'Corporate', price:150000, pages:'Unlimited Pages', hosting:'10 GB', emails:'10 Email addresses', details:'Custom Corporate website package'}
  ];
  const DEFAULT_DETAILS = {
    pages:[
      {value:'5 - 10 Pages', title:'5 - 10 Pages', text:'Starter package, suitable for startup websites.'},
      {value:'10 - 15 Pages', title:'10 - 15 Pages', text:'Business package for growing websites.'},
      {value:'Product Website / Unlimited Pages', title:'Product Website / Unlimited Pages', text:'Corporate package for products/services.'},
      {value:'Not Sure', title:'Not Sure', text:'Let us recommend the best option.'}
    ],
    businessModels:[
      {value:'Individual / Small Business', title:'Individual / Small Business', text:'Small business or startup website.'},
      {value:'Corporate', title:'Corporate', text:'Professional company website.'},
      {value:'Enterprise', title:'Enterprise', text:'Large scale or advanced business.'},
      {value:'E-commerce', title:'E-commerce', text:'Online selling or product store.'},
      {value:'Product / Catalogue Business', title:'Product / Catalogue Business', text:'Products, services or catalogue website.'},
      {value:'Other / Not Sure', title:'Other / Not Sure', text:'We will guide the best website path.'}
    ],
    websitePaths:[
      {value:'Business Website', title:'Business Website', text:'Standard service/business website.'},
      {value:'Corporate Website', title:'Corporate Website', text:'Professional company website.'},
      {value:'Product Website', title:'Product Website', text:'Product and catalogue style website.'},
      {value:'E-commerce Website', title:'E-commerce Website', text:'Online store website path.'},
      {value:'Custom Website', title:'Custom Website', text:'Custom business website path.'},
      {value:'Not Sure', title:'Not Sure', text:'Let us choose the best path.'}
    ]
  };
  const $ = s => document.querySelector(s);
  function safeJson(key, fallback){
    try{return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));}
    catch(e){return fallback;}
  }
  function saveJson(key, value){localStorage.setItem(key, JSON.stringify(value));}
  function esc(v){return String(v ?? '').replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));}
  function money(n){return 'LKR ' + Number(n || 0).toLocaleString('en-US');}
  function readImage(file){
    return new Promise(resolve => {
      if(!file) return resolve('');
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  }
  function ensureDefaults(){
    if(!Array.isArray(safeJson('wdlk_admin_templates', null))) saveJson('wdlk_admin_templates', []);
    if(!Array.isArray(safeJson('wdlk_admin_package_prices', null))) saveJson('wdlk_admin_package_prices', DEFAULT_PACKAGES);
    if(!safeJson('wdlk_admin_details_config', null)) saveJson('wdlk_admin_details_config', DEFAULT_DETAILS);
  }
  function notify(title, message, type){
    if(window.WebDevV52Sync) window.WebDevV52Sync.notify(title, message, type || 'admin', window.WebDevV52Sync.collect('admin_notice'));
    if(window.WebDevV52Sync) window.WebDevV52Sync.saveProject(type || 'admin_update');
  }
  function addNav(){
    const nav = document.querySelector('.admin-nav');
    if(!nav || nav.dataset.v52Nav) return;
    nav.dataset.v52Nav = 'yes';
    const ensure = [
      ['template-manager','▧ Templates'],
      ['package-manager','💰 Packages'],
      ['client-inbox','📨 Client Inbox'],
      ['realtime-notifications','🔔 Realtime'],
      ['pending-leads','⏳ Pending Leads']
    ];
    const back = [...nav.querySelectorAll('a')].find(a => a.textContent.includes('Back'));
    ensure.forEach(([id,label]) => {
      if(nav.querySelector(`[data-admin-tab="${id}"]`)) return;
      const a = document.createElement('a');
      a.href='#';
      a.dataset.adminTab=id;
      a.textContent=label;
      nav.insertBefore(a, back || null);
    });
  }
  function showTab(id){
    document.querySelectorAll('.admin-section').forEach(s => s.classList.toggle('active', s.id === id));
    document.querySelectorAll('[data-admin-tab]').forEach(a => a.classList.toggle('active', a.dataset.adminTab === id));
    renderAll();
  }
  function addSections(){
    const main = document.querySelector('.admin-content');
    if(!main) return;
    const add = (id, html) => { if(!document.getElementById(id)) main.insertAdjacentHTML('beforeend', html); };
    
    add('template-manager', `<section id="template-manager" class="admin-section"><div class="admin-card"><h2>Template Manager</h2><p>Manage website templates and categories. These sync to theme-selection.php.</p><form class="admin-form" id="v52TemplateForm"><div class="form-two-col"><label>Template Name<input id="v52TplName" required placeholder="Modern Business"></label><label>Category<select id="v52TplCategory">${CATEGORY_OPTIONS.map(c=>`<option value="${c[0]}">${c[1]}</option>`).join('')}</select></label></div><div class="form-two-col"><label>Status<select id="v52TplStatus"><option>Active</option><option>Hidden</option><option>Coming Soon</option></select></label><label>Style Text<input id="v52TplStyle" placeholder="Clean • Professional"></label></div><label>Demo URL<input id="v52TplDemo" type="url" placeholder="https://..."></label><label>Template Image<input id="v52TplImage" type="file" accept="image/*"></label><label>Notes<textarea id="v52TplNotes"></textarea></label><button class="admin-submit" type="submit">Save Template</button></form><div class="v52-template-grid" id="v52TemplateList"></div></div></section>`);
    
    add('package-manager', `<section id="package-manager" class="admin-section"><div class="admin-card"><h2>Package Manager</h2><p>Manage website packages and pricing. These sync to details.php and invoice page.</p><form class="admin-form" id="v52PackageForm"><div class="form-two-col"><label>Package Type<input id="v52PkgType" required placeholder="Standard Business web design"></label><label>Package Name<input id="v52PkgName" required placeholder="Starter"></label></div><div class="form-three-col"><label>Price (LKR)<input id="v52PkgPrice" type="number" required placeholder="50000"></label><label>Pages<input id="v52PkgPages" placeholder="5 Pages"></label><label>Hosting<input id="v52PkgHosting" placeholder="2 GB"></label></div><label>Email Accounts<input id="v52PkgEmails" placeholder="1 Email address"></label><label>Details<textarea id="v52PkgDetails" placeholder="Features..."></textarea></label><button class="admin-submit" type="submit">Save Package</button></form><div id="v52PackageList" class="admin-manager-list"></div></div></section>`);

    add('pending-leads', `<section id="pending-leads" class="admin-section"><div class="admin-card"><h2>Pending Leads</h2><p>Leads from the invoice page that are not yet projects.</p><div id="v52PendingLeads"></div></div></section>`);
    
    add('client-inbox', `<section id="client-inbox" class="admin-section"><div class="admin-card"><h2>Client Inbox</h2><p>Communicate with customers. Messages appear in customer dashboard and are stored for backend sync.</p><form class="admin-form" id="v52InboxForm"><label>Project / Client<select id="v52InboxProject"></select></label><label>Client Email<input id="v52InboxEmail" type="email"></label><label>Subject<input id="v52InboxSubject" value="Your Webdeveloper.lk Project Update"></label><label>Message<textarea id="v52InboxMessage" required></textarea></label><button class="admin-submit" type="submit">Send / Save Message</button></form><div id="v52InboxList" class="admin-manager-list"></div></div></section>`);
    
    add('realtime-notifications', `<section id="realtime-notifications" class="admin-section"><div class="admin-card"><h2>Realtime Notifications</h2><p>Complete system notifications across frontend, customer dashboard, invoice and admin panel.</p><div class="admin-mini-toolbar"><button type="button" id="v52ClearNotifications">Clear Read</button></div><div id="v52NotificationList" class="admin-manager-list"></div></div></section>`);
  }

  function renderTemplates(cat='recommended'){
    const target = $('#v52TemplateList');
    if(!target) return;
    const list = safeJson('wdlk_admin_templates', []);
    const filtered = cat === 'recommended' ? list.filter(t => t.status !== 'Hidden') : list.filter(t => t.category === cat);
    target.innerHTML = filtered.length ? filtered.map(t => `<div class="v52-template-card"><figure>${t.image ? `<img src="${esc(t.image)}" alt="${esc(t.name)}">` : '<span>No Image</span>'}</figure><div><strong>${esc(t.name)}</strong><small>${esc(t.categoryLabel || t.category)} | ${esc(t.status || 'Active')}</small><p>${esc(t.style || t.notes || '')}</p></div><div class="v52-actions"><button data-v52-edit-template="${esc(t.id)}">Edit</button><button data-v52-delete-template="${esc(t.id)}">Delete</button></div></div>`).join('') : '<p>No templates saved for this category yet.</p>';
  }
  function renderPackages(){
    const target = $('#v52PackageList');
    if(!target) return;
    const list = safeJson('wdlk_admin_package_prices', DEFAULT_PACKAGES);
    target.innerHTML = list.map(p => `<div class="manager-item"><strong>${esc(p.type)} - ${esc(p.name)}: ${money(p.price)}</strong><small>${esc(p.pages||'')} | ${esc(p.hosting||'')} | ${esc(p.emails||'')}</small><p>${esc(p.details||'')}</p></div>`).join('');
  }
  function renderDetailsOptions(){
    const target = $('#v52DetailsOptionsList');
    if(!target) return;
    const cfg = safeJson('wdlk_admin_details_config', DEFAULT_DETAILS);
    target.innerHTML = Object.entries(cfg).map(([key,items]) => `<div class="admin-data-card"><h3>${esc(key)}</h3>${(items||[]).map((o,i)=>`<div class="manager-item"><strong>${esc(o.title)}</strong><small>${esc(o.value)}</small><p>${esc(o.text||'')}</p><button data-v52-delete-option="${key}:${i}">Delete</button></div>`).join('')}</div>`).join('');
  }
  function renderInbox(){
    const select = $('#v52InboxProject');
    const list = safeJson('wdlk_admin_projects', []);
    if(select){
      select.innerHTML = list.map(p => `<option value="${esc(p.projectKey || p.invoiceNo || p.id)}" data-email="${esc(p.email||'')}">${esc(p.businessName||'Project')} - ${esc(p.invoiceNo||'')}</option>`).join('');
      select.onchange = () => { const opt = select.options[select.selectedIndex]; if($('#v52InboxEmail') && opt) $('#v52InboxEmail').value = opt.dataset.email || ''; };
      if(select.options[0] && !$('#v52InboxEmail').value) select.onchange();
    }
    const target = $('#v52InboxList');
    if(target){
      const msgs = safeJson('wdlk_admin_messages', []);
      target.innerHTML = msgs.length ? msgs.map(m => `<div class="manager-item"><strong>${esc(m.subject||'Admin Message')}</strong><small>${esc(m.projectId||m.projectKey||'')} | ${m.createdAt ? new Date(m.createdAt).toLocaleString() : ''}</small><p>${esc(m.message||'')}</p></div>`).join('') : '<p>No messages yet.</p>';
    }
  }
  function renderNotifications(){
    const target = $('#v52NotificationList');
    if(!target) return;
    const notes = safeJson('wdlk_realtime_notifications', []);
    target.innerHTML = notes.length ? notes.map(n => `<div class="manager-item"><strong>${esc(n.title)}</strong><small>${esc(n.businessName||'')} | ${esc(n.type||'')} | ${n.createdAt ? new Date(n.createdAt).toLocaleString() : ''}</small><p>${esc(n.message||'')}</p></div>`).join('') : '<p>No realtime notifications yet.</p>';
    const badge = document.getElementById('adminTopBadge');
    if(badge){ badge.textContent = String(notes.filter(n => !n.read).length); badge.style.display = notes.length ? 'inline-flex' : 'none'; }
  }
  async function renderAll(){
    if(location.protocol === 'file:') {
        renderTemplates(document.querySelector('[data-v52-template-cat].active')?.dataset.v52TemplateCat || 'recommended');
        renderPackages();
        renderDetailsOptions();
        renderInbox();
        renderNotifications();
        renderPendingLeads();
        return;
    }

    try {
        const response = await fetch('backend/api/admin-dashboard-data.php');
        const data = await response.json();
        if(data.success) {
            // Update the display using DB data
            renderTemplatesFromData(data.templates, document.querySelector('[data-v52-template-cat].active')?.dataset.v52TemplateCat || 'recommended');
            renderPackagesFromData(data.packages);
            renderPendingLeadsFromData(data.projects); // In this system, projects are the leads
        }
    } catch(e) {
        console.error("Failed to fetch DB data", e);
    }
    
    renderDetailsOptions();
    renderInbox();
    renderNotifications();
  }

  function renderTemplatesFromData(list, cat='recommended'){
    const target = $('#v52TemplateList');
    if(!target) return;
    const filtered = cat === 'recommended' ? list.filter(t => t.status !== 'Hidden') : list.filter(t => t.category === cat);
    target.innerHTML = filtered.length ? filtered.map(t => `<div class="v52-template-card"><figure>${t.image ? `<img src="${esc(t.image)}" alt="${esc(t.name)}">` : '<span>No Image</span>'}</figure><div><strong>${esc(t.name)}</strong><small>${esc(t.categoryLabel || t.category)} | ${esc(t.status || 'Active')}</small><p>${esc(t.style || t.notes || '')}</p></div><div class="v52-actions"><button data-v52-edit-template="${esc(t.template_key || t.id)}">Edit</button><button data-v52-delete-template="${esc(t.template_key || t.id)}">Delete</button></div></div>`).join('') : '<p>No templates saved for this category yet.</p>';
  }

  function renderPackagesFromData(list){
    const target = $('#v52PackageList');
    if(!target) return;
    target.innerHTML = list.map(p => `<div class="manager-item"><strong>${esc(p.package_type)} - ${esc(p.package_name)}: ${money(p.starting_price)}</strong><small>${esc(p.pages||'')} | ${esc(p.hosting||'')} | ${esc(p.email_accounts||'')}</small><p>${esc(p.details||'')}</p></div>`).join('');
  }

  function renderPendingLeadsFromData(leads){
    const target = $('#v52PendingLeads');
    if(!target) return;
    const pending = leads.filter(l => l.status === 'Pending Lead' || l.status === 'lead');
    target.innerHTML = pending.length ? `<table class="admin-wide-table"><thead><tr><th>Business</th><th>Customer</th><th>Contact</th><th>Package</th><th>Status</th><th>Updated</th></tr></thead><tbody>${pending.map(l => `<tr><td><strong>${esc(l.business_name)}</strong><br><small>${esc(l.invoice_no)}</small></td><td>${esc(l.customer_name||'')}<br>${esc(l.email||'')}</td><td>${esc(l.contact_number||'')}</td><td>${esc(l.package_name||'')}<br>${money(l.total_price)}</td><td><span class="admin-pill red">${esc(l.status||'Pending Lead')}</span></td><td>${l.updated_at ? new Date(l.updated_at).toLocaleString() : ''}</td></tr>`).join('')}</tbody></table>` : '<p>No pending leads yet.</p>';
  }

  function renderTemplates(cat='recommended'){
    const list = safeJson('wdlk_admin_templates', []);
    renderTemplatesFromData(list, cat);
  }
  function renderPackages(){
    const list = safeJson('wdlk_admin_package_prices', DEFAULT_PACKAGES);
    renderPackagesFromData(list);
  }
  function renderPendingLeads(){
    const leads = safeJson('wdlk_pending_leads', []);
    renderPendingLeadsFromData(leads);
  }
  function bind(){
    document.addEventListener('click', e => {
      const tab = e.target.closest('[data-admin-tab]');
      if(tab){ e.preventDefault(); showTab(tab.dataset.adminTab); }
      const cat = e.target.closest('[data-v52-template-cat]');
      if(cat){ document.querySelectorAll('[data-v52-template-cat]').forEach(b=>b.classList.remove('active')); cat.classList.add('active'); renderTemplates(cat.dataset.v52TemplateCat); }
      const delTpl = e.target.closest('[data-v52-delete-template]');
      if(delTpl){ saveJson('wdlk_admin_templates', safeJson('wdlk_admin_templates', []).filter(t => t.id !== delTpl.dataset.v52DeleteTemplate)); notify('Template deleted','Template manager updated','template'); renderTemplates(); }
      const editTpl = e.target.closest('[data-v52-edit-template]');
      if(editTpl){ const t = safeJson('wdlk_admin_templates', []).find(x => x.id === editTpl.dataset.v52EditTemplate); if(t){ $('#v52TplName').value=t.name||''; $('#v52TplCategory').value=t.category||'business'; $('#v52TplStatus').value=t.status||'Active'; $('#v52TplStyle').value=t.style||''; $('#v52TplDemo').value=t.demoUrl||''; $('#v52TplNotes').value=t.notes||''; } }
      const delOpt = e.target.closest('[data-v52-delete-option]');
      if(delOpt){ const [key, idx] = delOpt.dataset.v52DeleteOption.split(':'); const cfg = safeJson('wdlk_admin_details_config', DEFAULT_DETAILS); if(cfg[key]) cfg[key].splice(Number(idx),1); saveJson('wdlk_admin_details_config', cfg); notify('Details option deleted','Package manager updated','package'); renderDetailsOptions(); }
      if(e.target && e.target.id === 'v52ClearNotifications'){ saveJson('wdlk_realtime_notifications', []); saveJson('wdlk_admin_realtime_notifications', []); renderNotifications(); }
    });
    document.addEventListener('submit', async e => {
      if(e.target.id === 'v52TemplateForm'){
        e.preventDefault();
        const image = await readImage($('#v52TplImage').files[0]);
        const cat = $('#v52TplCategory').value;
        const label = CATEGORY_OPTIONS.find(c => c[0] === cat)?.[1] || cat;
        const list = safeJson('wdlk_admin_templates', []);
        const id = 'admin-' + cat + '-' + Date.now();
        list.unshift({id, templateKey:id, name:$('#v52TplName').value.trim(), category:cat, categoryLabel:label, status:$('#v52TplStatus').value, style:$('#v52TplStyle').value.trim() || 'Admin managed template', image, demoUrl:$('#v52TplDemo').value.trim(), notes:$('#v52TplNotes').value.trim(), updatedAt:new Date().toISOString()});
        saveJson('wdlk_admin_templates', list);
        if(location.protocol !== 'file:'){
          fetch('backend/api/templates-manage.php', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            credentials:'include',
            body:JSON.stringify({action:'save', templateKey:id, name:list[0].name, category:cat, image:list[0].image, demoUrl:list[0].demoUrl, status:list[0].status, notes:list[0].notes})
          }).catch(()=>{});
        }
        notify('Template saved', `${$('#v52TplName').value.trim()} saved and synced to theme selection`, 'template');
        e.target.reset(); renderTemplates(cat);
        return;
      }
      if(e.target.id === 'v52PackageForm'){
        e.preventDefault();
        const type=$('#v52PkgType').value, name=$('#v52PkgName').value;
        const id = type.toLowerCase().replace(/[^a-z0-9]+/g,'-') + '-' + name.toLowerCase();
        let list = safeJson('wdlk_admin_package_prices', DEFAULT_PACKAGES);
        const row = {id,type,name,price:Number($('#v52PkgPrice').value||0),pages:$('#v52PkgPages').value.trim(),hosting:$('#v52PkgHosting').value.trim(),emails:$('#v52PkgEmails').value.trim(),details:$('#v52PkgDetails').value.trim(),updatedAt:new Date().toISOString()};
        const idx = list.findIndex(p => p.id === id);
        if(idx >= 0) list[idx] = row; else list.unshift(row);
        saveJson('wdlk_admin_package_prices', list);
        if(location.protocol !== 'file:'){
          fetch('backend/api/packages-manage.php', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            credentials:'include',
            body:JSON.stringify({action:'save', packageType:type, packageName:name, startingPrice:row.price, pages:row.pages, hosting:row.hosting, emailAccounts:row.emails, details:row.details, status:'Active'})
          }).catch(()=>{});
        }
        notify('Package saved', `${type} - ${name} updated and synced to website`, 'package');
        e.target.reset(); renderPackages();
        return;
      }
      if(e.target.id === 'v52DetailsOptionForm'){
        e.preventDefault();
        const cfg = safeJson('wdlk_admin_details_config', DEFAULT_DETAILS);
        const section=$('#v52OptSection').value;
        cfg[section] = Array.isArray(cfg[section]) ? cfg[section] : [];
        const row = {value:$('#v52OptValue').value.trim(), title:$('#v52OptTitle').value.trim(), text:$('#v52OptText').value.trim()};
        const idx = cfg[section].findIndex(x => x.value === row.value);
        if(idx >= 0) cfg[section][idx]=row; else cfg[section].push(row);
        saveJson('wdlk_admin_details_config', cfg);
        notify('Details page option saved', `${row.title} synced to details.php`, 'package');
        e.target.reset(); renderDetailsOptions();
        return;
      }
      if(e.target.id === 'v52InboxForm'){
        e.preventDefault();
        const msg = {id:'MSG-' + Date.now(), projectId:$('#v52InboxProject').value, projectKey:$('#v52InboxProject').value, email:$('#v52InboxEmail').value.trim(), subject:$('#v52InboxSubject').value.trim(), message:$('#v52InboxMessage').value.trim(), sender:'admin', createdAt:new Date().toISOString()};
        const msgs = safeJson('wdlk_admin_messages', []);
        msgs.unshift(msg); saveJson('wdlk_admin_messages', msgs);
        notify('Admin message sent', msg.subject, 'message');
        if(location.protocol !== 'file:'){ fetch('backend/api/admin-reply-client.php',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify({projectKey:msg.projectKey,email:msg.email,subject:msg.subject,message:msg.message})}).catch(()=>{}); }
        const mailto = 'mailto:' + encodeURIComponent(msg.email) + '?subject=' + encodeURIComponent(msg.subject) + '&body=' + encodeURIComponent(msg.message);
        window.open(mailto, '_blank');
        e.target.reset(); renderInbox();
      }
    }, true);
  }
  function init(){
    if(!/admin-dashboard\.(html|php)|\/my-admin/.test(location.pathname)) return;
    ensureDefaults();
    addNav();
    addSections();
    bind();
    renderAll();
    if(location.hash){ const id=location.hash.replace('#',''); if(document.getElementById(id)) showTab(id); }
    window.addEventListener('storage', e => { if(e.key && e.key.indexOf('wdlk_') === 0) renderAll(); });
    window.addEventListener('wdlk:v52-sync', renderAll);
    setInterval(renderAll, 2500);
  }
  document.addEventListener('DOMContentLoaded', init);
})();
