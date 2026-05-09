
(function(){
  function safeJson(key, fallback = {}){
    try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
    catch(e){ return fallback; }
  }

  function getCustomer(){
    return safeJson('wdlk_customer', {});
  }

  function profileKey(){
    const c = getCustomer();
    const raw = (c.email || c.contactNumber || c.businessName || 'guest').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
    return raw || 'guest';
  }

  function getProfileItem(name, fallback = {}){
    const specific = localStorage.getItem(name + '_' + profileKey());
    if(specific){
      try { return JSON.parse(specific); } catch(e){}
    }
    return safeJson(name, fallback);
  }

  function setProfileItem(name, value){
    localStorage.setItem(name, JSON.stringify(value));
    localStorage.setItem(name + '_' + profileKey(), JSON.stringify(value));
  }

  function slug(name){
    return (name || 'mybusiness').toLowerCase().replace(/[^a-z0-9]+/g,'').slice(0,24) || 'mybusiness';
  }

  function getBusinessName(){
    const c = getCustomer();
    const step1 = safeJson('wdlk_step1', {});
    return c.businessName || step1.businessName || localStorage.getItem('wdlk_business_type') || 'Your Business';
  }

  window.WebDevProfileData = {
    safeJson,
    getCustomer,
    profileKey,
    getProfileItem,
    setProfileItem,
    slug,
    getBusinessName
  };
})();
