
/*
Webdeveloper.lk Backend Client Scaffold
Use this file when moving from localStorage prototype to PHP/MySQL backend.
Set window.WDLK_BACKEND_ENABLED = true after backend/config.php and schema.sql are installed.
*/
window.WDLK_BACKEND_ENABLED = window.WDLK_BACKEND_ENABLED !== false;

window.WebDevBackend = {
  async post(endpoint, data){
    if(!window.WDLK_BACKEND_ENABLED) {
      return {success:false, offline:true, message:'Backend disabled. Prototype is using browser storage.'};
    }
    const res = await fetch('backend/api/' + endpoint, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      credentials:'include',
      body:JSON.stringify(data || {})
    });
    return res.json();
  },
  register(data){return this.post('register.php', data);},
  login(data){return this.post('login.php', data);},
  createProject(data){return this.post('create-project.php', data);},
  createPayment(data){return this.post('payment-create.php', data);},
  updateStage(data){return this.post('project-stage-update.php', data);},
  notify(data){return this.post('notify.php', data);}
};
