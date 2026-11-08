(() => {
  'use strict';

  // Lets CSS know JavaScript is available (the menu stays visible without it)
  document.documentElement.classList.add('js');

  /* ---------- Mobile menu ---------- */
  const btn = document.querySelector('.menu-btn');
  const nav = document.getElementById('nav');

  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? 'Close' : 'Menu';
  };

  btn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); btn.focus(); }
  });

  /* ---------- Project cards: show / hide details ---------- */
  document.querySelectorAll('.card .more').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const open = toggle.closest('.card').classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Hide details' : 'Show details';
    });
  });

  /* ---------- Highlight the nav link of the section in view ---------- */
  const links = [...nav.querySelectorAll('a')];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        const active = link.hash === `#${entry.target.id}`;
        link.classList.toggle('active', active);
        active ? link.setAttribute('aria-current', 'true') : link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach((s) => observer.observe(s));

  /* ---------- Hero glow follows the pointer ---------- */
  const hero = document.querySelector('.hero');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', `${e.clientX - r.left}px`);
      hero.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  }

  /* ---------- Copy email ---------- */
  const copy = document.getElementById('copy');
  const status = document.getElementById('copy-status');
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copy.dataset.email);
      status.textContent = 'Email copied to clipboard.';
    } catch {
      status.textContent = 'Copy failed. Select the address above and copy it manually.';
    }
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();