/* Minimal progressive enhancement — the site works fully without JS.
   1) Mobile nav toggle
   2) Auto-highlight the current page's nav link (so you never edit it by hand)
   3) Stamp the current year in the footer                                   */

(function () {
  'use strict';

  // 1) Mobile nav toggle
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close the menu after following a link (mobile)
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 2) Mark the current page in the nav
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(function (a) {
    var target = a.getAttribute('href');
    if (target === here || (here === 'index.html' && target === 'index.html')) {
      a.setAttribute('aria-current', 'page');
    }
  });

  // 3) Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 4) Lightbox for gallery images (only runs if a gallery is on the page)
  var galleryItems = document.querySelectorAll('.gallery__item[data-full]');
  if (galleryItems.length) {
    var box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Enlarged image');
    box.innerHTML =
      '<button class="lightbox__close" aria-label="Close">&times;</button>' +
      '<img alt="">' +
      '<p class="lightbox__cap"></p>';
    document.body.appendChild(box);

    var boxImg = box.querySelector('img');
    var boxCap = box.querySelector('.lightbox__cap');
    var lastFocused = null;

    function openBox(src, alt, caption) {
      lastFocused = document.activeElement;
      boxImg.src = src;
      boxImg.alt = alt || '';
      boxCap.textContent = caption || '';
      box.classList.add('is-open');
      box.querySelector('.lightbox__close').focus();
    }
    function closeBox() {
      box.classList.remove('is-open');
      boxImg.src = '';
      if (lastFocused) lastFocused.focus();
    }

    galleryItems.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var img = btn.querySelector('img');
        openBox(btn.getAttribute('data-full'), img ? img.alt : '', btn.getAttribute('data-caption'));
      });
    });
    box.addEventListener('click', function (e) {
      if (e.target === box || e.target.classList.contains('lightbox__close')) closeBox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && box.classList.contains('is-open')) closeBox();
    });
  }
})();
