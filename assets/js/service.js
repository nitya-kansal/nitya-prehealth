/* Service renderer — reads window.SERVICE (from service-data.js) and builds
   the MULTI-SELECT category tabs plus the filtered card grid.
   No build tools; runs in the browser as a plain script.                    */

(function () {
  'use strict';

  var root = document.getElementById('service-root');
  if (!root) return;

  var data = (window.SERVICE && window.SERVICE.categories) ? window.SERVICE : { categories: [], items: [] };
  var cats  = data.categories || [];
  var items = (data.items || []).slice();

  // Pull the shared awards list (from site-data.js) in as "honors" items, so
  // awards are defined in ONE place yet appear on the Service page too.
  var SITE = window.SITE || {};
  (SITE.awards || []).forEach(function (a) {
    items.push({
      title: a.title,
      meta: 'Honor / Recognition',
      date: a.year || '',
      body: a.desc || '',
      cats: ['honors'].concat(a.cats || [])
    });
  });

  // id -> name, for showing category labels on each card
  var catName = {};
  cats.forEach(function (c) { catName[c.id] = c.name; });

  // Selected category ids. Empty set === "All".
  var selected = Object.create(null);
  function selectedCount() { return Object.keys(selected).length; }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // ---- tabs -------------------------------------------------------------
  function renderTabs() {
    var isAll = selectedCount() === 0;
    var html = '<button class="chip' + (isAll ? ' is-active' : '') +
      '" data-cat="__all" aria-pressed="' + isAll + '">All</button>';
    cats.forEach(function (c) {
      var on = !!selected[c.id];
      html += '<button class="chip' + (on ? ' is-active' : '') +
        '" data-cat="' + esc(c.id) + '" aria-pressed="' + on + '">' + esc(c.name) + '</button>';
    });
    return '<div class="chips" role="group" aria-label="Filter by category">' + html + '</div>';
  }

  // ---- cards ------------------------------------------------------------
  function matches(item) {
    if (selectedCount() === 0) return true;               // All
    var ic = item.cats || [];
    for (var i = 0; i < ic.length; i++) if (selected[ic[i]]) return true; // ANY (OR)
    return false;
  }

  function cardHtml(item) {
    var tags = (item.cats || []).map(function (id) {
      return '<span class="tag">' + esc(catName[id] || id) + '</span>';
    }).join('');
    var link = '';
    if (item.link && item.link.href) {
      link = '<p style="margin-top:16px"><a href="' + esc(item.link.href) + '"' +
        (/^https?:/.test(item.link.href) ? ' target="_blank" rel="noopener"' : '') +
        '>' + esc(item.link.label || 'Learn more') + '</a></p>';
    }
    return '<article class="card card--accent">' +
      (item.meta ? '<p class="card__meta">' + esc(item.meta) + '</p>' : '') +
      '<h3>' + esc(item.title) + '</h3>' +
      (item.date ? '<p class="card__date">' + esc(item.date) + '</p>' : '') +
      (item.body ? '<p>' + esc(item.body) + '</p>' : '') +
      (tags ? '<div class="tags">' + tags + '</div>' : '') +
      link +
    '</article>';
  }

  function renderCards() {
    var shown = items.filter(matches);
    if (!shown.length) {
      return '<div class="gallery-empty"><p><strong>Nothing here yet.</strong></p>' +
        '<p>No entries match the selected categories. Add them in <code>service-data.js</code>.</p></div>';
    }
    return '<div class="grid grid--3">' + shown.map(cardHtml).join('') + '</div>';
  }

  // ---- render + events --------------------------------------------------
  function render() {
    root.innerHTML = renderTabs() + renderCards();
    root.querySelectorAll('.chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var id = chip.getAttribute('data-cat');
        if (id === '__all') {
          selected = Object.create(null);               // clear all
        } else if (selected[id]) {
          delete selected[id];                          // toggle off
        } else {
          selected[id] = true;                          // toggle on
        }
        render();
      });
    });
  }

  render();
})();
