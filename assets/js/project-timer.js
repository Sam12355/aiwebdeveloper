
(function(){
  const START_KEY = 'wdlk_project_started_at';
  const DEADLINE_KEY = 'wdlk_project_deadline_at';

  function safeJson(key, fallback = {}){
    try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
    catch(e){ return fallback; }
  }

  function ensureProjectStart(){
    let startedAt = localStorage.getItem(START_KEY);
    const payment = safeJson('wdlk_payment', {});
    const finalPayment = safeJson('wdlk_final_payment', {});
    const launch = safeJson('wdlk_launch', {});

    if(!startedAt){
      // Project countdown starts from the first confirmed project start time.
      // Priority: advance payment time > final payment time > launch time > current dashboard open time.
      startedAt = payment.paidAt || finalPayment.paidAt || launch.launchedAt || new Date().toISOString();
      localStorage.setItem(START_KEY, startedAt);
    }

    let deadlineAt = localStorage.getItem(DEADLINE_KEY);
    if(!deadlineAt){
      const startDate = new Date(startedAt);
      const deadline = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
      deadlineAt = deadline.toISOString();
      localStorage.setItem(DEADLINE_KEY, deadlineAt);
    }

    return { startedAt, deadlineAt };
  }

  function getRemaining(){
    const times = ensureProjectStart();
    const end = new Date(times.deadlineAt);
    let diff = Math.max(0, end.getTime() - Date.now());

    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    diff -= days * 24 * 60 * 60 * 1000;
    const hours = Math.floor(diff / (60 * 60 * 1000));
    diff -= hours * 60 * 60 * 1000;
    const minutes = Math.floor(diff / (60 * 1000));
    diff -= minutes * 60 * 1000;
    const seconds = Math.floor(diff / 1000);

    return { days, hours, minutes, seconds, expired: end.getTime() <= Date.now(), ...times };
  }

  function pad(num){
    return String(num).padStart(2, '0');
  }

  function renderCountdown(prefix){
    const remaining = getRemaining();

    const ids = [
      ['countDays', remaining.days],
      ['countHours', remaining.hours],
      ['countMinutes', remaining.minutes],
      ['countSeconds', remaining.seconds],
      ['dashboardStartTime', new Date(remaining.startedAt).toLocaleString()],
      ['dashboardDeadlineTime', new Date(remaining.deadlineAt).toLocaleString()]
    ];

    ids.forEach(([id, value]) => {
      const el = document.getElementById(id);
      if(!el) return;
      if(id.includes('Time')) el.textContent = value;
      else el.textContent = pad(value);
    });

    const expiredItems = document.querySelectorAll('[data-countdown-expired]');
    expiredItems.forEach(el => {
      el.style.display = remaining.expired ? '' : 'none';
    });

    const activeItems = document.querySelectorAll('[data-countdown-active]');
    activeItems.forEach(el => {
      el.style.display = remaining.expired ? 'none' : '';
    });

    return remaining;
  }

  function startCountdown(){
    ensureProjectStart();
    renderCountdown();
    setInterval(renderCountdown, 1000);
  }

  window.WebDevProjectTimer = {
    ensureProjectStart,
    getRemaining,
    renderCountdown,
    startCountdown
  };
})();
