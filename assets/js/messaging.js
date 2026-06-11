(function () {
  'use strict';

  var BASE = location.protocol !== 'file:' ? 'backend/api/' : null;

  // Read the project identifiers the customer always has in localStorage
  function projectIds() {
    var key = localStorage.getItem('wdlk_project_key') || '';
    var inv = localStorage.getItem('wdlk_invoice_number') || '';
    if (!inv) {
      try { inv = (JSON.parse(localStorage.getItem('wdlk_payment') || '{}')).invoiceNumber || ''; } catch (e) {}
    }
    return { projectKey: key, invoiceNo: inv };
  }

  function fmt(dateStr) {
    try {
      return new Date(dateStr).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch (e) { return ''; }
  }

  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function bubble(msg) {
    var type  = msg.sender_type || 'system';
    var label = type === 'admin' ? 'Team' : type === 'customer' ? 'You' : 'System';
    return '<div class="msg-bubble ' + type + '">' +
      '<div class="msg-sender">' + label + '</div>' +
      '<div class="msg-text">' + esc(msg.message) + '</div>' +
      '<div class="msg-time">' + fmt(msg.created_at) + '</div>' +
      '</div>';
  }

  function scrollBottom(el) { if (el) el.scrollTop = el.scrollHeight; }

  // =====================================================================
  // CUSTOMER MESSAGING
  // =====================================================================
  function initCustomer() {
    var thread = document.getElementById('customerMessageThread');
    var form   = document.getElementById('customerSendMessageForm');
    if (!thread && !form) return;

    var lastCount = -1;
    var _loadInFlight = false;

    function renderThread(msgs) {
      if (!thread) return;
      if (!msgs || !msgs.length) {
        thread.innerHTML = '<div class="msg-empty">No messages yet.<br>Send a message to the team below.</div>';
        return;
      }
      thread.innerHTML = msgs.map(bubble).join('');
      scrollBottom(thread);
    }

    // Merge DB messages with any stored in localStorage (for offline-added ones)
    function storageMsgs() {
      var out = [];
      var adminRaw = localStorage.getItem('wdlk_admin_latest_message');
      if (adminRaw) {
        try {
          var a = JSON.parse(adminRaw);
          if (a && a.message) out.push({ sender_type: 'admin', message: a.message, created_at: a.createdAt || new Date().toISOString() });
        } catch (e) {}
      }
      try { out = out.concat(JSON.parse(localStorage.getItem('wdlk_customer_messages') || '[]')); } catch (e) {}
      out.sort(function (a, b) { return new Date(a.created_at) - new Date(b.created_at); });
      return out;
    }

    function load() {
      if (!BASE) { renderThread(storageMsgs()); return; }
      if (_loadInFlight) return;
      _loadInFlight = true;

      var ids = projectIds();
      var qs  = [];
      if (ids.projectKey) qs.push('projectKey=' + encodeURIComponent(ids.projectKey));
      if (ids.invoiceNo)  qs.push('invoiceNo='  + encodeURIComponent(ids.invoiceNo));
      var url = BASE + 'messages-get.php' + (qs.length ? '?' + qs.join('&') : '');

      var ctrl = (typeof AbortController !== 'undefined') ? new AbortController() : null;
      var timer = ctrl ? setTimeout(function () { try { ctrl.abort(); } catch (e) {} }, 8000) : null;

      fetch(url, { credentials: 'include', signal: ctrl ? ctrl.signal : undefined })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (timer) clearTimeout(timer);
          _loadInFlight = false;
          if (data.success && Array.isArray(data.messages)) {
            if (data.messages.length !== lastCount) {
              lastCount = data.messages.length;
              renderThread(data.messages);
            }
          } else {
            if (thread && thread.querySelector('.msg-loading')) renderThread(storageMsgs());
          }
        })
        .catch(function () { if (timer) clearTimeout(timer); _loadInFlight = false; renderThread(storageMsgs()); });
    }

    if (form) {
      var input  = document.getElementById('customerMessageInput');
      var status = document.getElementById('customerMsgStatus');
      var btn    = form.querySelector('.msg-send-btn');

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var text = input ? input.value.trim() : '';
        if (!text) return;
        if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }

        // Always persist to localStorage first (instant feedback + offline fallback)
        var stored = [];
        try { stored = JSON.parse(localStorage.getItem('wdlk_customer_messages') || '[]'); } catch (x) {}
        stored.push({ sender_type: 'customer', message: text, created_at: new Date().toISOString() });
        localStorage.setItem('wdlk_customer_messages', JSON.stringify(stored));

        // Notify admin via BroadcastChannel / realtime system
        if (window.WebDevRealtime) {
          var cust = {};
          try { cust = JSON.parse(localStorage.getItem('wdlk_customer') || '{}'); } catch (x) {}
          window.WebDevRealtime.addAdmin({
            type: 'message',
            title: 'New message from ' + (cust.businessName || cust.yourName || 'customer'),
            message: text.slice(0, 100),
            actionUrl: 'admin-dashboard.php#messages'
          });
        }

        function finish(ok, msg) {
          if (status) { status.textContent = msg; setTimeout(function () { if (status) status.textContent = ''; }, 3000); }
          if (btn)    { btn.disabled = false; btn.textContent = 'Send Message'; }
          if (ok && input) input.value = '';
          lastCount = -1;
          load();
        }

        if (BASE) {
          var ids  = projectIds();
          var ctrl = (typeof AbortController !== 'undefined') ? new AbortController() : null;
          var timer = ctrl ? setTimeout(function () { try { ctrl.abort(); } catch (e) {} }, 12000) : null;
          fetch(BASE + 'customer-send-message.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            signal: ctrl ? ctrl.signal : undefined,
            body: JSON.stringify({
              message:    text,
              subject:    'Customer Message',
              projectKey: ids.projectKey,
              invoiceNo:  ids.invoiceNo
            })
          })
            .then(function (r) { return r.json(); })
            .then(function (data) {
              if (timer) clearTimeout(timer);
              if (data.success) {
                // Remove the locally-stored copy (now in DB), avoid duplicates on next load
                localStorage.removeItem('wdlk_customer_messages');
              }
              finish(data.success, data.success ? 'Message sent.' : (data.error || 'Error sending.'));
            })
            .catch(function () { if (timer) clearTimeout(timer); finish(true, 'Message saved locally.'); });
        } else {
          finish(true, 'Message saved.');
        }
      });
    }

    load();
    setInterval(load, 6000);
  }

  // =====================================================================
  // ADMIN MESSAGING
  // =====================================================================
  function initAdmin() {
    var projectList = document.getElementById('adminMsgProjectList');
    var thread      = document.getElementById('adminMessageThread');
    var form        = document.getElementById('adminSendMessageForm');
    if (!projectList && !thread) return;

    var selectedPid    = null;
    var cachedProjects = [];
    var pollTimer      = null;

    // ---- Inbox ----
    function loadInbox() {
      if (!BASE) { loadInboxStorage(); return; }
      fetch(BASE + 'admin-dashboard-data.php', { credentials: 'include' })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data.success) {
            cachedProjects = data.projects || [];
            renderInbox(data.messages || [], cachedProjects);
          }
        })
        .catch(loadInboxStorage);
    }

    function loadInboxStorage() {
      var adminMsgs = [];
      var custMsgs  = [];
      try { adminMsgs = JSON.parse(localStorage.getItem('wdlk_admin_messages') || '[]'); } catch (e) {}
      try { custMsgs  = JSON.parse(localStorage.getItem('wdlk_customer_messages') || '[]'); } catch (e) {}
      var projs = [];
      try { projs = JSON.parse(localStorage.getItem('wdlk_admin_projects') || '[]'); } catch (e) {}
      cachedProjects = projs;
      var firstId   = projs.length ? (projs[0].dbId || projs[0].backendId || projs[0].id || 1) : 1;
      var firstName = projs.length ? (projs[0].businessName || 'Project') : 'Project';
      var firstInv  = projs.length ? (projs[0].invoiceNo || projs[0].id || '') : '';

      var msgs = adminMsgs.map(function (m, i) {
        return { id: i, project_id: firstId, sender_type: 'admin', message: m.message || '', created_at: m.createdAt || new Date().toISOString(), business_name: firstName, invoice_no: firstInv };
      }).concat(custMsgs.map(function (m, i) {
        return { id: 'c' + i, project_id: firstId, sender_type: 'customer', message: m.message || '', created_at: m.created_at || new Date().toISOString(), business_name: firstName, invoice_no: firstInv };
      }));

      renderInbox(msgs, projs);
    }

    function renderInbox(msgs, projects) {
      if (!projectList) return;

      var groups = {};
      msgs.forEach(function (m) {
        var pid = String(m.project_id || 0);
        if (!groups[pid]) groups[pid] = { pid: pid, name: m.business_name || 'Project', invoice: m.invoice_no || pid, msgs: [] };
        groups[pid].msgs.push(m);
      });

      var pids = Object.keys(groups);
      if (!pids.length) {
        projectList.innerHTML = '<div class="msg-empty">No messages yet.<br>Messages from customers appear here.</div>';
        return;
      }

      projectList.innerHTML = pids.map(function (pid) {
        var g       = groups[pid];
        var last    = g.msgs[g.msgs.length - 1];
        var preview = (last.message || '').slice(0, 54) + ((last.message || '').length > 54 ? '…' : '');
        var cCount  = g.msgs.filter(function (m) { return m.sender_type === 'customer'; }).length;
        var active  = pid === String(selectedPid) ? 'active' : '';
        return '<div class="msg-project-item ' + active + '" data-mpid="' + esc(pid) + '" data-minvoice="' + esc(g.invoice) + '" data-mname="' + esc(g.name) + '">' +
          '<div class="msg-project-meta"><div class="msg-project-name">' + esc(g.name) + '</div>' +
          (cCount ? '<span class="msg-unread-badge">' + cCount + '</span>' : '') +
          '</div><div class="msg-project-preview">' + esc(preview) + '</div></div>';
      }).join('');

      projectList.querySelectorAll('[data-mpid]').forEach(function (item) {
        item.addEventListener('click', function () {
          selectProject(item.dataset.mpid, item.dataset.mname, item.dataset.minvoice, projects);
        });
      });
    }

    // ---- Select project ----
    function selectProject(pid, name, invoice, projects) {
      selectedPid = pid;

      var titleEl = document.getElementById('adminMsgThreadTitle');
      var metaEl  = document.getElementById('adminMsgThreadMeta');
      if (titleEl) titleEl.textContent = name || 'Conversation';
      if (metaEl)  metaEl.textContent  = invoice || '';

      var input = document.getElementById('adminMessageInput');
      var btn   = form ? form.querySelector('.msg-send-btn') : null;
      if (input) input.disabled = false;
      if (btn)   btn.disabled   = false;

      var pidField  = document.getElementById('adminMsgProjectId');
      var keyField  = document.getElementById('adminMsgProjectKey');
      var mailField = document.getElementById('adminMsgProjectEmail');
      if (pidField) pidField.value = pid;
      if (keyField) keyField.value = invoice; // invoice_no matches OR invoice_no in admin-reply-client lookup

      var proj = null;
      if (Array.isArray(projects)) {
        proj = projects.filter(function (p) {
          return String(p.id) === String(pid) || String(p.project_id) === String(pid);
        })[0] || null;
      }
      if (mailField) mailField.value = (proj && proj.email) ? proj.email : '';

      if (projectList) {
        projectList.querySelectorAll('[data-mpid]').forEach(function (el) {
          el.classList.toggle('active', el.dataset.mpid === String(pid));
        });
      }

      loadThread(pid);
      if (pollTimer) clearInterval(pollTimer);
      pollTimer = setInterval(function () { loadThread(pid); }, 6000);
    }

    // ---- Thread ----
    var _threadInFlight = false;
    function loadThread(pid) {
      if (!pid) return;
      if (!BASE) { loadThreadStorage(); return; }
      if (_threadInFlight) return;
      _threadInFlight = true;
      var ctrl = (typeof AbortController !== 'undefined') ? new AbortController() : null;
      var timer = ctrl ? setTimeout(function () { try { ctrl.abort(); } catch (e) {} }, 8000) : null;
      fetch(BASE + 'messages-get.php?projectId=' + encodeURIComponent(pid), { credentials: 'include', signal: ctrl ? ctrl.signal : undefined })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (timer) clearTimeout(timer);
          _threadInFlight = false;
          if (data.success && Array.isArray(data.messages)) renderThread(data.messages);
        })
        .catch(function () { if (timer) clearTimeout(timer); _threadInFlight = false; loadThreadStorage(); });
    }

    function loadThreadStorage() {
      var adminMsgs = [];
      var custMsgs  = [];
      try { adminMsgs = JSON.parse(localStorage.getItem('wdlk_admin_messages') || '[]'); } catch (e) {}
      try { custMsgs  = JSON.parse(localStorage.getItem('wdlk_customer_messages') || '[]'); } catch (e) {}
      var all = adminMsgs.map(function (m) { return { sender_type: 'admin', message: m.message, created_at: m.createdAt }; })
        .concat(custMsgs.map(function (m) { return { sender_type: 'customer', message: m.message, created_at: m.created_at }; }));
      all.sort(function (a, b) { return new Date(a.created_at) - new Date(b.created_at); });
      renderThread(all);
    }

    function renderThread(msgs) {
      if (!thread) return;
      if (!msgs || !msgs.length) {
        thread.innerHTML = '<div class="msg-empty">No messages in this conversation yet.</div>';
        return;
      }
      thread.innerHTML = msgs.map(bubble).join('');
      scrollBottom(thread);
    }

    // ---- Admin reply ----
    if (form) {
      var input  = document.getElementById('adminMessageInput');
      var status = document.getElementById('adminMsgStatus');
      var btn    = form.querySelector('.msg-send-btn');

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!selectedPid) return;
        var text = input ? input.value.trim() : '';
        if (!text) return;
        if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }

        var subject    = 'Update from ecommercesrilanka.lk Team';
        var invoiceKey = document.getElementById('adminMsgProjectKey')  ? document.getElementById('adminMsgProjectKey').value  : '';
        var email      = document.getElementById('adminMsgProjectEmail') ? document.getElementById('adminMsgProjectEmail').value : '';

        // Persist to localStorage (also drives the customer realtime notification)
        var msgs = [];
        try { msgs = JSON.parse(localStorage.getItem('wdlk_admin_messages') || '[]'); } catch (x) {}
        msgs.unshift({ projectId: selectedPid, subject: subject, message: text, createdAt: new Date().toISOString(), status: 'sent' });
        localStorage.setItem('wdlk_admin_messages', JSON.stringify(msgs));

        if (window.WebDevRealtime) {
          window.WebDevRealtime.addCustomer({
            type: 'message',
            title: 'New message from the team',
            message: text.slice(0, 100),
            actionUrl: 'customer-dashboard.php#messages'
          });
        }

        function finish(ok, msg) {
          if (status) { status.textContent = msg; setTimeout(function () { if (status) status.textContent = ''; }, 3000); }
          if (btn)    { btn.disabled = false; btn.textContent = 'Send Reply'; }
          if (ok && input) input.value = '';
          loadThread(selectedPid);
          loadInbox();
        }

        if (BASE) {
          fetch(BASE + 'admin-reply-client.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email: email, subject: subject, message: text, projectKey: invoiceKey })
          })
            .then(function (r) { return r.json(); })
            .then(function (data) { finish(true, data.mailSent ? 'Reply sent.' : 'Reply saved.'); })
            .catch(function () { finish(true, 'Reply saved.'); });
        } else {
          finish(true, 'Reply saved.');
        }
      });
    }

    loadInbox();
    setInterval(loadInbox, 12000);
  }

  // =====================================================================
  document.addEventListener('DOMContentLoaded', function () {
    initCustomer();
    initAdmin();
  });
})();
