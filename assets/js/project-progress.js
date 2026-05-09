
(function(){
  const STAGE_KEY = 'wdlk_project_stage';

  const stages = [
    {
      key:'planning',
      title:'Day 1 - Planning & First Design',
      pill:'Planning Started',
      percent:28,
      message:'We are reviewing your business details, selected theme, page count, and website path. Your first website structure is being prepared.',
      tasks:[
        ['done','Advance payment received','Your project is confirmed and active.'],
        ['current','Website structure planning','Our team is preparing the website flow.'],
        ['pending','Homepage first look','This will be prepared next.']
      ],
      activities:[
        ['Project confirmed','Advance payment and project details received.'],
        ['Team review started','Business details and selected theme are being checked.'],
        ['Website plan started','We are preparing the page structure.']
      ]
    },
    {
      key:'design',
      title:'Day 1 - Homepage Demo Preparation',
      pill:'Design In Progress',
      percent:48,
      message:'The homepage demo is being designed. We will update the preview link once the first demo is ready.',
      tasks:[
        ['done','Website structure completed','Main website flow is planned.'],
        ['current','Homepage demo design','Designer is preparing your first preview.'],
        ['pending','Customer review','You will review the demo after upload.']
      ],
      activities:[
        ['Homepage layout started','Your selected theme is being customized.'],
        ['Brand details applied','Logo, business name and colors are added.'],
        ['Preview link preparing','A demo preview will be available soon.']
      ]
    },
    {
      key:'demo',
      title:'Demo Website Ready',
      pill:'Demo Ready',
      percent:68,
      message:'Your demo website is ready for review. Please check the preview and continue to the demo review page.',
      tasks:[
        ['done','Homepage demo completed','First demo version is ready.'],
        ['current','Waiting for customer review','Please review and continue.'],
        ['pending','Inner page development','This starts after review.']
      ],
      activities:[
        ['Demo preview generated','Preview screen prepared for customer.'],
        ['Review request created','Customer review is now available.'],
        ['Next stage ready','Continue to demo review page.']
      ]
    },
    {
      key:'development',
      title:'Day 2 - Website Development',
      pill:'Development',
      percent:82,
      message:'Our team is developing the website pages, mobile layout, and basic content sections.',
      tasks:[
        ['done','Demo reviewed','Homepage direction confirmed.'],
        ['current','Website pages development','Inner pages and sections are being developed.'],
        ['pending','Final review','Final review will be available soon.']
      ],
      activities:[
        ['Inner pages started','Website sections are being created.'],
        ['Mobile layout processing','Responsive view is being improved.'],
        ['Content placement','Your details are being added.']
      ]
    },
    {
      key:'final',
      title:'Day 3 - Final Review Preparation',
      pill:'Final Review',
      percent:96,
      message:'Your website is almost ready. Continue to final review when available.',
      tasks:[
        ['done','Development completed','Website pages are prepared.'],
        ['current','Final testing','Mobile and form checks are in progress.'],
        ['pending','Final approval','Final approval and launch will be next.']
      ],
      activities:[
        ['Testing started','Website is being checked.'],
        ['Launch preparation','Domain, hosting and final steps are being prepared.'],
        ['Final approval pending','Customer approval is required before launch.']
      ]
    }
  ];

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  function safeJson(key, fallback={}){
    try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}
    catch(e){return fallback}
  }

  function getStageIndex(){
    const key = localStorage.getItem(STAGE_KEY) || 'planning';
    if(key === 'final_payment' || key === 'ready_to_launch' || key === 'live') return stages.length - 1;
    const found = stages.findIndex(s => s.key === key);
    return found >= 0 ? found : 0;
  }

  function setStage(index){
    const stage = stages[index] || stages[0];
    localStorage.setItem(STAGE_KEY, stage.key);
    renderStage();
  }

  function renderStage(){
    const index = getStageIndex();
    const stage = stages[index];
    $('#stageTitle').textContent = stage.title;
    $('#stagePillText').textContent = stage.pill;
    $('#stageMessage').textContent = stage.message;
    $('#stagePercent').textContent = stage.percent + '%';
    $('#mainProgressBar').style.width = stage.percent + '%';

    const taskList = $('#taskList');
    taskList.innerHTML = '';
    stage.tasks.forEach(t => {
      const div = document.createElement('div');
      div.className = 'task-item ' + t[0];
      div.innerHTML = `<span>${t[0]==='done'?'✓':t[0]==='current'?'•':'!'}</span><div><strong>${t[1]}</strong><small>${t[2]}</small></div>`;
      taskList.appendChild(div);
    });

    const activityList = $('#activityList');
    activityList.innerHTML = '';
    stage.activities.forEach(t => {
      const div = document.createElement('div');
      div.className = 'activity-item';
      div.innerHTML = `<span>AI</span><div><strong>${t[0]}</strong><small>${t[1]}</small></div>`;
      activityList.appendChild(div);
    });

    $$('.status-step').forEach((el, i) => {
      el.classList.toggle('done', i < index);
      el.classList.toggle('active', i === index);
      const badge = el.querySelector('span');
      if(badge) badge.textContent = i < index ? '✓' : (i + 1);
    });

    const nextBtn = $('#nextStageBtn');
    if(nextBtn){
      nextBtn.disabled = index >= stages.length - 1;
      nextBtn.textContent = index >= stages.length - 1 ? 'Final Stage Reached' : 'Move to Next Stage';
    }

    const demoBtn = $('#demoBtn');
    if(demoBtn){
      demoBtn.style.display = index >= 2 ? 'flex' : 'none';
    }
    const finalBtn = $('#finalBtn');
    if(finalBtn){
      finalBtn.style.display = index >= 4 ? 'flex' : 'none';
      if(localStorage.getItem(STAGE_KEY) === 'ready_to_launch'){
        finalBtn.href = 'launch-website.php';
        finalBtn.textContent = 'Launch Website';
      }
      if(localStorage.getItem(STAGE_KEY) === 'live'){
        finalBtn.href = 'website-live.php';
        finalBtn.textContent = 'Website Live';
      }
    }

    updateDashboardMirror(stage, index);

    const demoReview = safeJson('wdlk_demo_review', {});
    if(stage.key === 'demo' && demoReview.status === 'changes_requested'){
      const activityList = $('#activityList');
      if(activityList){
        const div = document.createElement('div');
        div.className = 'activity-item';
        div.innerHTML = `<span>!</span><div><strong>Changes requested</strong><small>${demoReview.feedback || 'Customer requested demo changes.'}</small></div>`;
        activityList.prepend(div);
      }
    }
  }

  function updateDashboardMirror(stage, index){
    localStorage.setItem('wdlk_dashboard_stage_title', stage.title);
    localStorage.setItem('wdlk_dashboard_stage_percent', String(stage.percent));
    localStorage.setItem('wdlk_dashboard_stage_index', String(index));
  }

  function countdown(){
    if(window.WebDevProjectTimer){
      window.WebDevProjectTimer.startCountdown();
      return;
    }
    const start = new Date();
    const end = new Date(start.getTime() + 3*24*60*60*1000);
    function tick(){
      let diff = Math.max(0,end - new Date());
      const d = Math.floor(diff/(24*60*60*1000)); diff -= d*24*60*60*1000;
      const h = Math.floor(diff/(60*60*1000)); diff -= h*60*60*1000;
      const m = Math.floor(diff/(60*1000)); diff -= m*60*1000;
      const s = Math.floor(diff/1000);
      $('#countDays').textContent = String(d).padStart(2,'0');
      $('#countHours').textContent = String(h).padStart(2,'0');
      $('#countMinutes').textContent = String(m).padStart(2,'0');
      const sec = $('#countSeconds'); if(sec) sec.textContent = String(s).padStart(2,'0');
    }
    tick();
    setInterval(tick,1000);
  }

  function initDetails(){
    const customer = safeJson('wdlk_customer');
    const step1 = safeJson('wdlk_step1');
    const step2 = safeJson('wdlk_step2');
    const theme = safeJson('wdlk_theme');
    const payment = safeJson('wdlk_payment');

    $('#businessName').textContent = customer.businessName || step1.businessName || localStorage.getItem('wdlk_business_type') || 'Your Business';
    $('#projectPath').textContent = step2.websitePath || 'Small Business Website';
    $('#selectedTheme').textContent = theme.themeName || theme.name || 'Selected Theme';
    $('#invoiceNo').textContent = localStorage.getItem('wdlk_invoice_number') || payment.invoiceNumber || 'WD-PROJECT';
  }

  function toast(message){
    const el = $('#statusToast');
    el.textContent = message;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2200);
  }

  function bind(){
    $('#nextStageBtn').addEventListener('click', () => {
      const index = getStageIndex();
      if(index < stages.length - 1){
        setStage(index + 1);
        toast('Project stage updated successfully.');
      }
    });

    $('#resetStageBtn').addEventListener('click', () => {
      setStage(0);
      toast('Progress reset to planning stage.');
    });

    $('#uploadProgressFiles').addEventListener('change', (e) => {
      const files = [...e.target.files].map(f => f.name);
      localStorage.setItem('wdlk_progress_uploads', JSON.stringify(files));
      toast(files.length + ' file(s) added.');
    });
  }

  initDetails();
  countdown();
  bind();
  renderStage();
})();
