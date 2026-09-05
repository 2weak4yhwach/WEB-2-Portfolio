/**
 * Web 1.0 Subtle Cinematic Engine
 * Pure Vanilla JavaScript - Read-only architecture, no jQuery, no external dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initHitCounter();
  initScanlineToggle();
  highlightActiveNav();
});

/**
 * Live Digital System Clock
 */
function initClock() {
  const clockEl = document.getElementById('system-clock');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    clockEl.textContent = `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
  }

  update();
  setInterval(update, 1000);
}

/**
 * Simulated Web 1.0 Hit Counter
 * Increments subtly per visit in localStorage
 */
function initHitCounter() {
  const counterEl = document.getElementById('hit-counter');
  if (!counterEl) return;

  const baseHits = 4820;
  let storedHits = localStorage.getItem('rasman_web_hits');

  if (!storedHits) {
    storedHits = baseHits + Math.floor(Math.random() * 10) + 1;
  } else {
    storedHits = parseInt(storedHits, 10) + 1;
  }

  localStorage.setItem('rasman_web_hits', storedHits);

  // Format as 6-digit odometer string e.g. 004821
  const formatted = String(storedHits).padStart(6, '0');
  counterEl.textContent = formatted;
}

/**
 * Scanline Overlay Toggle
 */
function initScanlineToggle() {
  const toggleBtn = document.getElementById('toggle-scanlines');
  const isEnabled = localStorage.getItem('rasman_scanlines') === 'true';

  if (isEnabled) {
    document.body.classList.add('scanlines');
    if (toggleBtn) toggleBtn.textContent = 'CRT: ON';
  } else {
    document.body.classList.remove('scanlines');
    if (toggleBtn) toggleBtn.textContent = 'CRT: OFF';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const active = document.body.classList.toggle('scanlines');
      localStorage.setItem('rasman_scanlines', active ? 'true' : 'false');
      toggleBtn.textContent = active ? 'CRT: ON' : 'CRT: OFF';
    });
  }
}

/**
 * Current Page Nav Highlighter
 * Supports both root /index.html and directory routes e.g. /about/, /projects/
 */
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Check match for root
    const isRoot = (currentPath.endsWith('/') || currentPath.endsWith('index.html')) && 
                   !currentPath.includes('/about/') && 
                   !currentPath.includes('/projects/') && 
                   !currentPath.includes('/experience/') && 
                   !currentPath.includes('/guestbook/') && 
                   !currentPath.includes('/contact/');

    if (isRoot && (href.endsWith('index.html') && !href.includes('../') && !href.includes('/')) || href === './' || href === '/') {
      link.classList.add('active');
    } else if (
      (href.includes('about') && currentPath.includes('/about/')) ||
      (href.includes('projects') && currentPath.includes('/projects/')) ||
      (href.includes('experience') && currentPath.includes('/experience/')) ||
      (href.includes('guestbook') && currentPath.includes('/guestbook/')) ||
      (href.includes('contact') && currentPath.includes('/contact/'))
    ) {
      link.classList.add('active');
    }
  });
}
