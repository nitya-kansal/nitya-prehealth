/* Gallery renderer — reads window.GALLERY (from gallery-data.js) and builds
   the album index, category filters, album detail view, and lightbox.
   No build tools; runs in the browser as a plain script.                    */

(function () {
  'use strict';

  var root = document.getElementById('gallery-root');
  if (!root) return;

  var data = (window.GALLERY && window.GALLERY.categories) ? window.GALLERY : { categories: [] };

  // Flatten albums, tagging each with its category + a stable global index.
  var albums = [];
  data.categories.forEach(function (cat) {
    (cat.albums || []).forEach(function (al) {
      albums.push({ catId: cat.id, catName: cat.name, data: al, index: albums.length });
    });
  });

  // ---- helpers ----------------------------------------------------------
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function fmtDate(d) {
    if (!d) return '';
    var m = String(d).match(/^(\d{4})-(\d{2})$/);
    if (m) return MONTHS[parseInt(m[2], 10) - 1] + ' ' + m[1];
    return String(d);
  }
  function coverImg(album, alt) {
    if (album.cover) {
      return '<img src="' + esc(album.cover) + '" alt="' + esc(alt) + '" loading="lazy" ' +
        'onerror="this.parentNode.innerHTML=\'<div class=&quot;gallery__placeholder&quot;>Add a cover photo</div>\'">';
    }
    return '<div class="gallery__placeholder">Add a cover photo</div>';
  }

  // ---- index (all albums, optional category filter) ---------------------
  function renderIndex(catId) {
    if (!albums.length) {
      root.innerHTML = '<div class="gallery-empty"><p><strong>No photos yet.</strong></p>' +
        '<p>Add your events and images in <code>gallery-data.js</code> — the gallery builds itself from that file.</p></div>';
      return;
    }

    var chips = '<button class="chip' + (!catId ? ' is-active' : '') + '" data-cat="">All</button>';
    data.categories.forEach(function (c) {
      if (!(c.albums && c.albums.length)) return;
      chips += '<button class="chip' + (catId === c.id ? ' is-active' : '') + '" data-cat="' + esc(c.id) + '">' + esc(c.name) + '</button>';
    });

    var shown = albums.filter(function (a) { return !catId || a.catId === catId; });
    var cards = shown.map(function (a) {
      var al = a.data;
      var count = (al.photos && al.photos.length) || 0;
      return '<button class="album-card" data-album="' + a.index + '">' +
        '<div class="album-card__cover">' + coverImg(al, al.title) +
          (count > 1 ? '<span class="album-card__count">' + count + ' photos</span>' : '') +
        '</div>' +
        '<div class="album-card__body">' +
          '<div class="album-card__cat">' + esc(a.catName) + '</div>' +
          '<div class="album-card__title">' + esc(al.title) + '</div>' +
          '<div class="album-card__date">' + esc(fmtDate(al.date)) + '</div>' +
        '</div>' +
      '</button>';
    }).join('');

    root.innerHTML = '<div class="chips">' + chips + '</div><div class="album-grid">' + cards + '</div>';

    root.querySelectorAll('.chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var c = chip.getAttribute('data-cat');
        location.hash = c ? 'cat=' + c : '';
        if (!c) route(); // hash cleared may not fire; force
      });
    });
    root.querySelectorAll('.album-card').forEach(function (card) {
      card.addEventListener('click', function () {
        location.hash = 'album=' + card.getAttribute('data-album');
      });
    });
  }

  // ---- album detail -----------------------------------------------------
  function renderAlbum(i) {
    var a = albums[i];
    if (!a) { location.hash = ''; return; }
    var al = a.data;
    var photos = al.photos || [];

    var head = '<button class="album-back" data-cat="' + esc(a.catId) + '">&larr; Back to gallery</button>' +
      '<div class="album-detail__head">' +
        '<p class="album-card__cat">' + esc(a.catName) + '</p>' +
        '<h2>' + esc(al.title) + '</h2>' +
        '<p>' + esc(fmtDate(al.date)) +
          (al.link ? ' &nbsp;·&nbsp; <a href="' + esc(al.link) + '" target="_blank" rel="noopener">View source ↗</a>' : '') +
        '</p>' +
      '</div>';

    var grid;
    if (!photos.length) {
      grid = '<div class="gallery-empty">No photos in this album yet — add them in <code>gallery-data.js</code>.</div>';
    } else {
      grid = '<div class="gallery">' + photos.map(function (p, idx) {
        return '<figure><button class="album-photo" data-i="' + idx + '">' +
          '<img src="' + esc(p.src) + '" alt="' + esc(p.caption || al.title) + '" loading="lazy" ' +
            'onerror="this.parentNode.parentNode.style.display=\'none\'">' +
          '</button>' +
          (p.caption ? '<figcaption>' + esc(p.caption) + '</figcaption>' : '') +
        '</figure>';
      }).join('') + '</div>';
    }

    root.innerHTML = head + grid;

    root.querySelector('.album-back').addEventListener('click', function () {
      var c = this.getAttribute('data-cat');
      location.hash = c ? 'cat=' + c : '';
    });
    root.querySelectorAll('.album-photo').forEach(function (btn) {
      btn.addEventListener('click', function () { openLightbox(photos, parseInt(btn.getAttribute('data-i'), 10)); });
    });
    window.scrollTo(0, 0);
  }

  // ---- lightbox with prev/next ------------------------------------------
  var box, boxImg, boxCap, current = [], pos = 0, lastFocused = null;
  function buildLightbox() {
    box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Photo viewer');
    box.innerHTML =
      '<button class="lightbox__close" aria-label="Close">&times;</button>' +
      '<button class="lightbox__nav lightbox__nav--prev" aria-label="Previous">&#8249;</button>' +
      '<img alt="">' +
      '<button class="lightbox__nav lightbox__nav--next" aria-label="Next">&#8250;</button>' +
      '<p class="lightbox__cap"></p>';
    document.body.appendChild(box);
    boxImg = box.querySelector('img');
    boxCap = box.querySelector('.lightbox__cap');

    box.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
    box.querySelector('.lightbox__nav--prev').addEventListener('click', function () { step(-1); });
    box.querySelector('.lightbox__nav--next').addEventListener('click', function () { step(1); });
    box.addEventListener('click', function (e) { if (e.target === box) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
    });
  }
  function show() {
    var p = current[pos];
    boxImg.src = p.src;
    boxImg.alt = p.caption || '';
    boxCap.textContent = (p.caption ? p.caption + '  ' : '') + '(' + (pos + 1) + ' / ' + current.length + ')';
    var single = current.length < 2;
    box.querySelector('.lightbox__nav--prev').hidden = single;
    box.querySelector('.lightbox__nav--next').hidden = single;
  }
  function step(d) { pos = (pos + d + current.length) % current.length; show(); }
  function openLightbox(photos, i) {
    if (!box) buildLightbox();
    current = photos; pos = i;
    lastFocused = document.activeElement;
    show();
    box.classList.add('is-open');
    box.querySelector('.lightbox__close').focus();
  }
  function closeLightbox() {
    box.classList.remove('is-open');
    boxImg.src = '';
    if (lastFocused) lastFocused.focus();
  }

  // ---- routing (hash-based, so Back button works) -----------------------
  function route() {
    var h = location.hash.replace(/^#/, '');
    var mAlbum = h.match(/^album=(\d+)$/);
    var mCat = h.match(/^cat=(.+)$/);
    if (mAlbum) renderAlbum(parseInt(mAlbum[1], 10));
    else if (mCat) renderIndex(decodeURIComponent(mCat[1]));
    else renderIndex(null);
  }
  window.addEventListener('hashchange', route);
  route();
})();
