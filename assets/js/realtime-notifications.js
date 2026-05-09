
(function(){
  const CHANNEL_NAME = 'wdlk_realtime_notifications';
  const ADMIN_KEY = 'wdlk_notifications_admin';
  const CUSTOMER_KEY = 'wdlk_notifications_customer';

  function safeJson(key, fallback = []){
    try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
    catch(e){ return fallback; }
  }

  function saveJson(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getCustomer(){
    try { return JSON.parse(localStorage.getItem('wdlk_customer') || '{}'); } catch(e){ return {}; }
  }

  function profileKey(){
    const c = getCustomer();
    const raw = (c.email || c.contactNumber || c.businessName || 'guest').toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,'');
    return raw || 'guest';
  }

  function getInvoice(){
    const pay = safeJson('wdlk_payment', {});
    const finalPay = safeJson('wdlk_final_payment', {});
    return localStorage.getItem('wdlk_invoice_number') || pay.invoiceNumber || finalPay.invoiceNumber || 'WD-PROJECT';
  }

  function makeNotification(data){
    return {
      id: data.id || ('NTF-' + Date.now() + '-' + Math.random().toString(36).slice(2,7)),
      audience: data.audience || 'customer',
      type: data.type || 'info',
      title: data.title || 'Notification',
      message: data.message || '',
      projectId: data.projectId || getInvoice(),
      profileKey: data.profileKey || profileKey(),
      read: false,
      createdAt: data.createdAt || new Date().toISOString(),
      actionUrl: data.actionUrl || ''
    };
  }

  function getStoreKey(audience){
    if(audience === 'admin') return ADMIN_KEY;
    return CUSTOMER_KEY + '_' + profileKey();
  }

  function getNotifications(audience){
    const list = safeJson(getStoreKey(audience), []);
    return Array.isArray(list) ? list : [];
  }

  function setNotifications(audience, list){
    saveJson(getStoreKey(audience), list);
  }

  function broadcast(notification){
    const payload = { source:'wdlk', notification, time: Date.now() };
    try {
      if(window.BroadcastChannel){
        const channel = new BroadcastChannel(CHANNEL_NAME);
        channel.postMessage(payload);
        channel.close();
      }
    } catch(e){}

    localStorage.setItem('wdlk_notification_ping', JSON.stringify(payload));
    window.dispatchEvent(new CustomEvent('wdlk:notification', { detail: payload }));
  }

  function addNotification(audience, data){
    const notification = makeNotification({ ...data, audience });
    const list = getNotifications(audience);
    const exists = list.some(n => n.id === notification.id);
    if(!exists){
      list.unshift(notification);
      setNotifications(audience, list.slice(0,100));
    }
    broadcast(notification);
    return notification;
  }

  function addCustomer(data){ return addNotification('customer', data); }
  function addAdmin(data){ return addNotification('admin', data); }

  function markRead(audience, id){
    const list = getNotifications(audience);
    const item = list.find(n => n.id === id);
    if(item) item.read = true;
    setNotifications(audience, list);
    broadcast({ audience, type:'read', id, title:'Read', message:'Read status updated' });
  }

  function markAllRead(audience){
    const list = getNotifications(audience).map(n => ({...n, read:true}));
    setNotifications(audience, list);
    broadcast({ audience, type:'read_all', title:'Read', message:'All read' });
  }

  function unreadCount(audience){
    return getNotifications(audience).filter(n => !n.read).length;
  }

  function subscribe(callback){
    function handler(payload){
      if(!payload || payload.source !== 'wdlk') return;
      callback(payload.notification);
    }

    try {
      if(window.BroadcastChannel){
        const channel = new BroadcastChannel(CHANNEL_NAME);
        channel.onmessage = (event) => handler(event.data);
      }
    } catch(e){}

    window.addEventListener('storage', (event) => {
      if(event.key !== 'wdlk_notification_ping' || !event.newValue) return;
      try { handler(JSON.parse(event.newValue)); } catch(e){}
    });

    window.addEventListener('wdlk:notification', (event) => handler(event.detail));
  }

  function showToast(title, message){
    let toast = document.getElementById('realtimeNotificationToast');
    if(!toast){
      toast = document.createElement('div');
      toast.id = 'realtimeNotificationToast';
      toast.className = 'realtime-notification-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<strong>${title}</strong><span>${message || ''}</span>`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
  }

  window.WebDevRealtime = {
    addCustomer,
    addAdmin,
    getNotifications,
    markRead,
    markAllRead,
    unreadCount,
    subscribe,
    showToast,
    profileKey,
    getInvoice
  };
})();
