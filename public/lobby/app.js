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

  const faviconLink = document.querySelector('link[rel="icon"]');
  const faviconBase = faviconLink
    ? faviconLink.getAttribute('href').replace(/favicon[^/]*\.svg$/, '')
    : 'assets/';

  /* ── 1. Gamified Character, Card Highlight & Dynamic Favicon Switcher ── */
  function setCharacterWorld(world) {
    currentWorld = world;
    if (!world) {
      document.body.removeAttribute('data-hover');
      if (faviconLink) faviconLink.setAttribute('href', `${faviconBase}favicon.svg`);
      return;
    }
    document.body.setAttribute('data-hover', world);
    if (switchBtn) {
      switchBtn.classList.toggle('is-rotated', world === 'traveler');
    }
    if (faviconLink) {
      const iconName = world === 'engineer' ? 'favicon-engineer.svg' : 'favicon-traveler.svg';
      faviconLink.setAttribute('href', `${faviconBase}${iconName}`);
    }
  }

  function toggleCharacterSide() {
    const nextWorld = currentWorld === 'engineer' ? 'traveler' : 'engineer';
    setCharacterWorld(nextWorld);
  }

  const mobileMedia = window.matchMedia('(max-width: 820px)');

  /* Desktop Hover & Focus on Portal Cards (Desktop stays side-by-side as is) */
  if (cardEng) {
    cardEng.addEventListener('mouseenter', () => {
      if (!mobileMedia.matches) setCharacterWorld('engineer');
    });
    cardEng.addEventListener('focus', () => {
      if (!mobileMedia.matches) setCharacterWorld('engineer');
    });
    cardEng.addEventListener('mouseleave', () => {
      if (!mobileMedia.matches) setCharacterWorld(null);
    });
    cardEng.addEventListener('blur', () => {
      if (!mobileMedia.matches) setCharacterWorld(null);
    });
  }

  if (cardTrv) {
    cardTrv.addEventListener('mouseenter', () => {
      if (!mobileMedia.matches) setCharacterWorld('traveler');
    });
    cardTrv.addEventListener('focus', () => {
      if (!mobileMedia.matches) setCharacterWorld('traveler');
    });
    cardTrv.addEventListener('mouseleave', () => {
      if (!mobileMedia.matches) setCharacterWorld(null);
    });
    cardTrv.addEventListener('blur', () => {
      if (!mobileMedia.matches) setCharacterWorld(null);
    });
  }

  /* Tap on the Switch Icon beside Avatar (or the Avatar itself)
     On mobile: switches character AND brings the respective card to the top */
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

  /* Initialize mobile with Engineer card on top */
  if (mobileMedia.matches) {
    setCharacterWorld('engineer');
  }
  mobileMedia.addEventListener('change', (e) => {
    if (e.matches && !currentWorld) {
      setCharacterWorld('engineer');
    }
  });

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
