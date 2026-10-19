/* ==========================================================================
   ADNAN ABIR — MINIMALIST DUAL-WORLD GATEWAY
   Gamified Character Avatar & Side Switch Icon Engine
   ========================================================================== */

(function () {
  'use strict';

  const cardEng = document.getElementById('card-eng');
  const cardTrv = document.getElementById('card-trv');
  const charFrame = document.getElementById('character-frame');
  const switchBtn = document.getElementById('avatar-switch-btn');
  const themeBtn = document.getElementById('theme-btn');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');
  const shareBtn = document.getElementById('share-btn');
  const toast = document.getElementById('toast');
  let toastTimer = null;
  let currentWorld = null;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  }

  /* ── 1. Gamified Character & Card Highlight Switcher ── */
  function setCharacterWorld(world) {
    currentWorld = world;
    if (!world) {
      document.body.removeAttribute('data-hover');
      return;
    }
    document.body.setAttribute('data-hover', world);
    if (switchBtn) {
      switchBtn.classList.toggle('is-rotated', world === 'traveler');
    }
  }

  function toggleCharacterSide() {
    const nextWorld = currentWorld === 'engineer' ? 'traveler' : 'engineer';
    setCharacterWorld(nextWorld);
  }

  /* Desktop Hover & Focus on Portal Cards */
  if (cardEng) {
    cardEng.addEventListener('mouseenter', () => setCharacterWorld('engineer'));
    cardEng.addEventListener('focus', () => setCharacterWorld('engineer'));
    cardEng.addEventListener('mouseleave', () => setCharacterWorld(null));
    cardEng.addEventListener('blur', () => setCharacterWorld(null));
    cardEng.addEventListener('touchstart', () => setCharacterWorld('engineer'), { passive: true });
  }

  if (cardTrv) {
    cardTrv.addEventListener('mouseenter', () => setCharacterWorld('traveler'));
    cardTrv.addEventListener('focus', () => setCharacterWorld('traveler'));
    cardTrv.addEventListener('mouseleave', () => setCharacterWorld(null));
    cardTrv.addEventListener('blur', () => setCharacterWorld(null));
    cardTrv.addEventListener('touchstart', () => setCharacterWorld('traveler'), { passive: true });
  }

  /* Tap on the Switch Icon beside Avatar (or the Avatar itself) */
  if (switchBtn) {
    switchBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCharacterSide();
    });
  }

  if (charFrame) {
    charFrame.addEventListener('click', toggleCharacterSide);
    charFrame.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCharacterSide();
      }
    });
  }

  /* Mobile Scroll Detection: auto-switches character as cards scroll into view */
  if ('IntersectionObserver' in window) {
    const mobileMedia = window.matchMedia('(max-width: 820px)');
    const observer = new IntersectionObserver(
      (entries) => {
        if (!mobileMedia.matches) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            if (entry.target.id === 'card-eng') setCharacterWorld('engineer');
            if (entry.target.id === 'card-trv') setCharacterWorld('traveler');
          }
        });
      },
      { threshold: [0.6] }
    );
    if (cardEng) observer.observe(cardEng);
    if (cardTrv) observer.observe(cardTrv);

    if (mobileMedia.matches) {
      setCharacterWorld('engineer');
    }
  }

  /* ── 2. Paper / Night Theme Toggle ── */
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const html = document.documentElement;
      const isNight = html.getAttribute('data-theme') === 'night';
      html.setAttribute('data-theme', isNight ? 'daylight' : 'night');
      if (themeIcon) themeIcon.textContent = isNight ? '🌙' : '☀️';
      if (themeText) themeText.textContent = isNight ? 'Night' : 'Paper';
    });
  }

  /* ── 3. One-Click Share / Copy Link ── */
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const url = window.location.href;
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Adnan Abir — Portfolio & Travel Blog',
            text: 'Explore Adnan Abir’s Engineering Portfolio & The Broken Backpack Travel Blog:',
            url
          });
          return;
        } catch (_) {
          // Fallback to clipboard copy
        }
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).catch(() => {});
      }
      showToast('✨ Link copied to clipboard!');
    });
  }

  /* ── 4. Keyboard Shortcuts ([1] Portfolio, [2] Travel Blog) ── */
  window.addEventListener('keydown', (e) => {
    if (e.key === '1' && cardEng) {
      cardEng.focus();
      setCharacterWorld('engineer');
    } else if (e.key === '2' && cardTrv) {
      cardTrv.focus();
      setCharacterWorld('traveler');
    }
  });
})();
