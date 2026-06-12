/* ═══════════════════════════════════════════════════════════════
   GOWTHAM — ENGINEERING PORTFOLIO
   portfolio.js | Interactions, Animations & UX Logic
   ═══════════════════════════════════════════════════════════════ */

'use strict';

// ── 1. INIT ON DOM READY ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();       // Render all Lucide icons
  initCursorGlow();
  initNavbar();
  initTypingEffect();
  initScrollReveal();
  initStackAnimations();
  initDevlogNotify();
  initSubscribeForm();
  initRoadmapHighlight();
  initActiveNavLinks();
  console.log('%c Gowtham\'s Portfolio Loaded ✓', 'color:#38bdf8;font-family:monospace;font-size:14px;font-weight:bold;');
});

// ── 2. CURSOR GLOW ────────────────────────────────────────────
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;
  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;
  let rafId;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth lerp follow
  function animateGlow() {
    const ease = 0.08;
    currentX += (mouseX - currentX) * ease;
    currentY += (mouseY - currentY) * ease;
    glow.style.left = currentX + 'px';
    glow.style.top  = currentY + 'px';
    rafId = requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // Hide when mouse leaves viewport
  document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { glow.style.opacity = '1'; });
}

// ── 3. NAVBAR — SCROLL & MOBILE TOGGLE ───────────────────────
function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks  = document.getElementById('nav-links');

  // Scroll class
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile hamburger
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav when link clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });
}

// ── 4. ACTIVE NAV LINK (INTERSECTION OBSERVER) ───────────────
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href').replace('#', '');
            link.classList.toggle('active', href === id);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach(s => observer.observe(s));
}

// ── 5. TYPING EFFECT (HERO TERMINAL) ─────────────────────────
function initTypingEffect() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const messages = [
    'whoami',
    'echo "BTech CSE | Year 1 | Building systems"',
    'cat passion.txt',
    'git commit -m "learning every day"',
    'python -c "print(\'Hello, World!\')"',
  ];

  let msgIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let delay = 120;

  function type() {
    const current = messages[msgIdx];

    if (!isDeleting) {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      delay = 90;

      if (charIdx === current.length) {
        isDeleting = true;
        delay = 2200; // Pause before deleting
      }
    } else {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      delay = 45;

      if (charIdx === 0) {
        isDeleting = false;
        msgIdx = (msgIdx + 1) % messages.length;
        delay = 500;
      }
    }

    setTimeout(type, delay);
  }

  // Start after 800ms
  setTimeout(type, 800);
}

// ── 6. SCROLL REVEAL ─────────────────────────────────────────
function initScrollReveal() {
  // Add reveal class to elements
  const targets = [
    '.stack-category',
    '.project-case',
    '.devlog-card',
    '.devlog-cta',
    '.roadmap-item',
    '.footer-link-card',
    '.footer-connect',
  ];

  targets.forEach((selector, selectorIdx) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      // Staggered delay for grid children
      const delay = Math.min(i * 0.1, 0.4);
      el.style.transitionDelay = delay + 's';
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── 7. SKILL BAR & DIVE BAR ANIMATIONS ───────────────────────
function initStackAnimations() {
  // Animate skill level bars when visible
  const levelItems = document.querySelectorAll('.stack-item');
  const diveItems  = document.querySelectorAll('.dive-item');

  const animObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          animObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  levelItems.forEach(el => animObserver.observe(el));
  diveItems.forEach(el  => animObserver.observe(el));
}

// ── 8. DEVLOG NOTIFY BUTTONS ──────────────────────────────────
function initDevlogNotify() {
  const notifyBtns = document.querySelectorAll('.devlog-notify-btn');

  notifyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const postId = btn.dataset.post;
      const alreadyNotified = btn.classList.contains('notified');

      if (alreadyNotified) {
        showToast('Already subscribed to this post!', 'info');
        return;
      }

      btn.classList.add('notified');
      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Subscribed!';

      showToast(`You'll be notified when DevLog #${postId} publishes! ✓`, 'success');
    });
  });
}

// ── 9. SUBSCRIBE FORM (DEVLOG) ────────────────────────────────
function initSubscribeForm() {
  const form      = document.getElementById('devlog-cta');
  const emailInput = document.getElementById('subscribe-email');
  const btn       = document.getElementById('btn-subscribe');

  if (!btn || !emailInput) return;

  btn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    if (!email) {
      showToast('Please enter your email address.', 'info');
      emailInput.focus();
      return;
    }
    if (!isValidEmail(email)) {
      showToast('Please enter a valid email address.', 'info');
      emailInput.focus();
      return;
    }

    // Success state
    emailInput.value = '';
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg> Subscribed!
    `;
    btn.style.background = '#4ade80';
    btn.style.color = '#000';
    btn.disabled = true;

    showToast(`Subscribed! You'll receive DevLog updates at ${email} ✓`, 'success');

    // Reset after 5s
    setTimeout(() => {
      btn.innerHTML = '<i data-lucide="bell"></i> Subscribe';
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      lucide.createIcons();
    }, 5000);
  });

  // Allow pressing Enter in input
  emailInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') btn.click();
  });
}

// ── 10. ROADMAP HOVER HIGHLIGHT ───────────────────────────────
function initRoadmapHighlight() {
  const items = document.querySelectorAll('.roadmap-item');

  items.forEach(item => {
    const dot = item.querySelector('.roadmap-dot');
    if (!dot) return;

    item.addEventListener('mouseenter', () => {
      dot.style.borderColor = 'var(--accent)';
      dot.style.background  = 'var(--accent)';
      dot.style.boxShadow   = '0 0 16px var(--accent-glow)';
    });
    item.addEventListener('mouseleave', () => {
      if (!dot.classList.contains('roadmap-dot-active')) {
        dot.style.borderColor = '';
        dot.style.background  = '';
        dot.style.boxShadow   = '';
      }
    });
  });
}

// ── 11. TOAST NOTIFICATION SYSTEM ────────────────────────────
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconSvg = type === 'success'
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
         <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
         <polyline points="22 4 12 14.01 9 11.01"/>
       </svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
         <circle cx="12" cy="12" r="10"/>
         <line x1="12" y1="8" x2="12" y2="12"/>
         <line x1="12" y1="16" x2="12.01" y2="16"/>
       </svg>`;

  toast.innerHTML = `${iconSvg}<span>${message}</span>`;
  container.appendChild(toast);

  // Auto-remove after 4s
  setTimeout(() => {
    toast.classList.add('removing');
    toast.addEventListener('animationend', () => toast.remove());
  }, 4000);
}

// ── 12. SMOOTH SECTION PROGRESS (SCROLLSPY INDICATOR) ────────
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #38bdf8, #a78bfa);
    transform-origin: left; z-index: 9999;
    width: 0%; transition: width 0.1s linear;
  `;
  document.body.prepend(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop   = window.scrollY;
    const docHeight   = document.documentElement.scrollHeight - window.innerHeight;
    const progress    = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }, { passive: true });
}

initScrollProgress();

// ── 13. KEYBOARD NAVIGATION ACCESSIBILITY ────────────────────
document.addEventListener('keydown', (e) => {
  // Escape closes mobile nav
  if (e.key === 'Escape') {
    const hamburger = document.getElementById('nav-hamburger');
    const navLinks  = document.getElementById('nav-links');
    if (hamburger && navLinks) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  }
});

// ── 14. PROJECT CASE — EXPAND ON MOBILE ───────────────────────
(function initProjectToggle() {
  // On mobile, project case blocks are all visible by default (no toggle needed at desktop)
  // But add a smooth focus outline for keyboard users
  document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        link.click();
      }
    });
  });
})();

// ── 15. COPY EMAIL ON FOOTER CLICK ───────────────────────────
(function initEmailCopy() {
  const emailBtn = document.getElementById('footer-email-btn');
  if (!emailBtn) return;

  emailBtn.addEventListener('click', (e) => {
    const email = 'gowtham@example.com'; // Replace with real email
    if (navigator.clipboard) {
      e.preventDefault();
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard! ✓', 'success');
      }).catch(() => {
        // Fallback: just follow the mailto link
      });
    }
  });
})();

// ── 16. HERO ENTRANCE ANIMATION (staggered) ──────────────────
(function initHeroEntrance() {
  const heroElements = [
    '.terminal-bar',
    '.terminal-prompt',
    '.hero-headline',
    '.hero-value-prop',
    '.hero-value-prop-secondary',
    '.hero-badges',
    '.hero-actions',
    '.scroll-cue',
  ];

  heroElements.forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease, transform 0.6s ease`;

    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200 + i * 120);
  });
})();

// ── 17. UTILITY FUNCTIONS ────────────────────────────────────
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── 18. CONSOLE EASTER EGG ───────────────────────────────────
console.log(`
%c ╔══════════════════════════════════════╗
%c ║   Hey there, fellow developer! 👋    ║
%c ║   Gowtham's portfolio is open source ║  
%c ║   github.com/Gowtham614941         ║
%c ╚══════════════════════════════════════╝
`,
  'color:#38bdf8; font-family: monospace;',
  'color:#f0f6fc; font-family: monospace;',
  'color:#f0f6fc; font-family: monospace;',
  'color:#38bdf8; font-family: monospace;',
  'color:#38bdf8; font-family: monospace;'
);
