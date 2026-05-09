
(function(){
  function fallbackSafe(key, fallback={}){
    try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}
    catch(e){return fallback}
  }
  function setText(id, val){const el=document.getElementById(id); if(el) el.textContent=val;}
  function slug(name){return (name || 'mybusiness').toLowerCase().replace(/[^a-z0-9]+/g,'').slice(0,24) || 'mybusiness';}

  const helper = window.WebDevProfileData;
  const customer = helper ? helper.getCustomer() : fallbackSafe('wdlk_customer');
  const step1 = fallbackSafe('wdlk_step1');
  const businessName = helper ? helper.getBusinessName() : (customer.businessName || step1.businessName || 'Your Business');
  let launch = helper ? helper.getProfileItem('wdlk_launch', {}) : fallbackSafe('wdlk_launch');

  if(!launch || !launch.liveUrl){
    const renewal = new Date();
    renewal.setFullYear(renewal.getFullYear() + 1);
    launch = {
      status: 'live',
      liveUrl: 'https://' + slug(businessName) + '.lk',
      launchedAt: new Date().toISOString(),
      renewalDate: renewal.toISOString(),
      hosting: { firstYear: 'Free', secondYearRenewal: 'LKR 12,000 annually' }
    };
    if(helper) helper.setProfileItem('wdlk_launch', launch);
    else localStorage.setItem('wdlk_launch', JSON.stringify(launch));
  }

  const liveUrl = launch.liveUrl;
  const renewal = launch.renewalDate ? new Date(launch.renewalDate).toLocaleDateString(undefined,{year:'numeric',month:'long',day:'numeric'}) : 'Next Year';

  setText('liveUrlText', liveUrl);
  setText('liveBusiness', businessName);
  setText('renewalDateLive', renewal);

  const liveBtn = document.getElementById('liveUrlBtn');
  if(liveBtn) liveBtn.href = liveUrl;
})();
