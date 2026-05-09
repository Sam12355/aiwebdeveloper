
(function(){
  const ADMIN_USER = 'YaK077wd';
  const ADMIN_PASS = '@YKwdLK##%$$';

  const form = document.getElementById('adminLoginForm');
  if(!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = document.getElementById('adminUser').value.trim();
    const pass = document.getElementById('adminPass').value.trim();
    const error = document.getElementById('adminLoginError');

    if(user === ADMIN_USER && pass === ADMIN_PASS){
      localStorage.setItem('wdlk_admin_logged_in','yes');
      sessionStorage.setItem('wdlk_admin_session', JSON.stringify({
        loggedAt:new Date().toISOString(),
        user: ADMIN_USER
      }));

      window.location.href = 'admin-dashboard.php';
    } else {
      error.textContent = 'Invalid admin login details.';
    }
  });
})();
