
// Step 1 real page functionality
(function () {
  const params = new URLSearchParams(window.location.search);
  const savedBusiness = params.get('business') || localStorage.getItem('wdlk_business_type') || '';
  const businessType = document.getElementById('businessType');
  const form = document.getElementById('businessForm');
  const alertBox = document.getElementById('formAlert');
  const logoUpload = document.getElementById('logoUpload');
  const fileName = document.getElementById('fileName');
  const uploadZone = document.getElementById('uploadZone');

  if (businessType && savedBusiness) {
    businessType.value = savedBusiness;
  }

  try {
    const saved = JSON.parse(localStorage.getItem('wdlk_step1_business') || '{}');
    if (saved.businessType && !businessType.value) businessType.value = saved.businessType;
    if (saved.businessName) document.getElementById('businessName').value = saved.businessName;
    if (saved.customerName) document.getElementById('customerName').value = saved.customerName;
    if (saved.contactNumber) document.getElementById('contactNumber').value = saved.contactNumber;
    if (saved.email && document.getElementById('customerEmail')) document.getElementById('customerEmail').value = saved.email;
    if (saved.businessDescription) document.getElementById('businessDescription').value = saved.businessDescription;
    if (saved.logoName && fileName) {
      fileName.textContent = saved.logoName;
      fileName.style.display = 'inline-block';
    }
  } catch (err) {}

  function showAlert(type, message) {
    alertBox.className = 'form-alert ' + type;
    alertBox.textContent = message;
  }

  function clearAlert() {
    alertBox.className = 'form-alert';
    alertBox.textContent = '';
  }

  if (logoUpload) {
    logoUpload.addEventListener('change', function () {
      const file = logoUpload.files && logoUpload.files[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        showAlert('error', 'Logo file is too large. Please upload a file below 5MB.');
        logoUpload.value = '';
        return;
      }

      fileName.textContent = file.name;
      fileName.style.display = 'inline-block';
      clearAlert();
    });
  }

  if (uploadZone) {
    ['dragenter', 'dragover'].forEach(eventName => {
      uploadZone.addEventListener(eventName, function (e) {
        e.preventDefault();
        uploadZone.classList.add('dragging');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      uploadZone.addEventListener(eventName, function (e) {
        e.preventDefault();
        uploadZone.classList.remove('dragging');
      });
    });

    uploadZone.addEventListener('drop', function (e) {
      const file = e.dataTransfer.files && e.dataTransfer.files[0];
      if (!file || !logoUpload) return;

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      logoUpload.files = dataTransfer.files;
      logoUpload.dispatchEvent(new Event('change'));
    });
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearAlert();

      const data = {
        businessType: document.getElementById('businessType').value.trim(),
        businessName: document.getElementById('businessName').value.trim(),
        customerName: document.getElementById('customerName').value.trim(),
        contactNumber: document.getElementById('contactNumber').value.trim(),
        email: document.getElementById('customerEmail') ? document.getElementById('customerEmail').value.trim() : '',
        businessDescription: document.getElementById('businessDescription').value.trim(),
        logoName: logoUpload && logoUpload.files[0] ? logoUpload.files[0].name : (fileName ? fileName.textContent : ''),
        savedAt: new Date().toISOString()
      };

      const requiredMissing = !data.businessType || !data.businessName || !data.customerName || !data.contactNumber || !data.email || !data.businessDescription;

      if (requiredMissing) {
        showAlert('error', 'Please complete all required fields before continuing.');
        return;
      }

      const phoneClean = data.contactNumber.replace(/\s+/g, '');
      if (phoneClean.length < 9) {
        showAlert('error', 'Please enter a valid contact number.');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        showAlert('error', 'Please enter a valid email address.');
        return;
      }

      try {
        localStorage.setItem('wdlk_step1_business', JSON.stringify(data));
        localStorage.setItem('wdlk_step1', JSON.stringify(data));
        localStorage.setItem('wdlk_business_type', data.businessType);
        localStorage.setItem('wdlk_business_name', data.businessName);
      } catch (err) {}

      showAlert('success', 'Details saved. Redirecting to the next step...');
      Promise.resolve(window.WebDevV52Sync && window.WebDevV52Sync.saveProjectAsync ? window.WebDevV52Sync.saveProjectAsync('business_form_submitted') : null)
        .catch(() => {})
        .finally(() => {
          if(window.WebDevDataRecorder && window.WebDevDataRecorder.capture) window.WebDevDataRecorder.capture('business_form_submitted');
          if(window.WDLK_AI_TRANSITION && window.WDLK_AI_TRANSITION.playAndNavigate){
            window.WDLK_AI_TRANSITION.playAndNavigate('details.php', {reason:'business'});
          } else {
            setTimeout(function () {
              window.location.href = 'details.php';
            }, 300);
          }
        });
    });
  }
})();

// Reveal animations
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('in');
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();

// Flow particle background
(function () {
  const canvas = document.getElementById('flow-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let particles = [];
  const pointer = { x: null, y: null, active: false, radius: 135 };

  function resize() {
    const host = canvas.parentElement;
    width = host.offsetWidth;
    height = host.offsetHeight;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    createParticles();
  }

  function createParticles() {
    const count = Math.max(75, Math.floor(width / 14));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.1,
        vy: (Math.random() - 0.5) * 1.1,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * .36 + .12,
        color: Math.random() > .76 ? '255,49,49' : '37,93,255'
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -20 || p.x > width + 20) p.vx *= -1;
      if (p.y < -20 || p.y > height + 20) p.vy *= -1;

      if (pointer.active && pointer.x !== null) {
        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < pointer.radius && dist > .1) {
          const force = (1 - dist / pointer.radius) * .055;
          p.vx += dx / dist * force;
          p.vy += dy / dist * force;
        }
      }

      p.vx = Math.max(Math.min(p.vx, 1.6), -1.6);
      p.vy = Math.max(Math.min(p.vy, 1.6), -1.6);
      p.vx *= .996;
      p.vy *= .996;

      ctx.beginPath();
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 105) {
          ctx.strokeStyle = `rgba(37,93,255,${(1 - dist / 105) * .13})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  const host = canvas.parentElement;
  host.addEventListener('mousemove', (e) => {
    const rect = host.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
    pointer.active = true;
  });

  host.addEventListener('mouseleave', () => {
    pointer.active = false;
    pointer.x = null;
    pointer.y = null;
  });

  window.addEventListener('resize', resize);
  resize();
  draw();
})();
