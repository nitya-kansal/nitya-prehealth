/* Site binder — copies values from window.SITE (site-data.js) into the page:
     [data-site="key"]       → element text
     [data-site-href="key"]  → element href  (an email value becomes mailto:)
   It also renders the shared awards list into any #awards-list element.
   Runs on every page; harmless where nothing matches.                       */

(function () {
  'use strict';
  var S = window.SITE || {};

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // text bindings
  document.querySelectorAll('[data-site]').forEach(function (el) {
    var v = S[el.getAttribute('data-site')];
    if (v != null) el.textContent = v;
  });

  // href bindings (a bare email address becomes a mailto: link)
  document.querySelectorAll('[data-site-href]').forEach(function (el) {
    var v = S[el.getAttribute('data-site-href')];
    if (v == null) return;
    if (/@/.test(v) && !/^[a-z][a-z0-9+.-]*:/i.test(v)) v = 'mailto:' + v;
    el.setAttribute('href', v);
  });

  // shared awards list — used on the Awards page and the CV page
  var host = document.getElementById('awards-list');
  if (host && S.awards) {
    host.innerHTML = S.awards.map(function (a) {
      return '<li class="record"><div>' +
          '<div class="record__title">' + esc(a.title) + '</div>' +
          (a.desc ? '<div class="record__desc">' + esc(a.desc) + '</div>' : '') +
        '</div><div class="record__year">' + esc(a.year || '—') + '</div></li>';
    }).join('');
  }
})();
