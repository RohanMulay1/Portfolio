/* ---- THEME ---- */
const html   = document.documentElement;
const tBtn   = document.getElementById('themeBtn');
const tIcon  = document.getElementById('tIcon');
const tLabel = document.getElementById('tLabel');
let dark = (localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark';
tIcon.textContent  = dark ? '◐' : '◑';
tLabel.textContent = dark ? 'Light' : 'Dark';

tBtn.addEventListener('click', () => {
  dark = !dark;
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  localStorage.setItem('theme', dark ? 'dark' : 'light');
  tIcon.textContent  = dark ? '◐' : '◑';
  tLabel.textContent = dark ? 'Light' : 'Dark';
});

/* ---- CURSOR (Miro-style) - desktop/mouse only ---- */
if (window.matchMedia('(pointer: fine)').matches) {
  const cursorEl = document.getElementById('cursor');

  document.addEventListener('mousemove', e => {
    cursorEl.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursorEl.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => { cursorEl.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursorEl.style.opacity = '1'; });

  document.querySelectorAll('a, button, .pcard:not(.pcard--static)').forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('is-hovering');
      const t = document.getElementById('cursorLabelText');
      if (t && el.dataset.cursor === 'hi') {
        t.style.opacity = '0';
        setTimeout(() => { t.textContent = 'Say hi! 👋'; t.style.opacity = '1'; }, 120);
      }
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('is-hovering');
      const t = document.getElementById('cursorLabelText');
      if (t && t.textContent !== 'Guest') {
        t.style.opacity = '0';
        setTimeout(() => { t.textContent = 'Guest'; t.style.opacity = '1'; }, 120);
      }
    });
  });
}

/* ---- PRELOADER ---- */
const preloader = document.getElementById('preloader');
const plBar     = document.getElementById('plBar');
const plName    = document.querySelector('.pl-name span');

gsap.registerPlugin(ScrollTrigger);

if (sessionStorage.getItem('rm_visited')) {
  preloader.style.display = 'none';
  heroIn();
} else {
  sessionStorage.setItem('rm_visited', '1');
  gsap.to(plName, { y: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 });
  setTimeout(() => { plBar.style.width = '100%'; }, 150);
  setTimeout(() => {
    gsap.to(preloader, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power3.inOut',
      onComplete: () => {
        preloader.style.display = 'none';
        heroIn();
      }
    });
  }, 1300);
}

/* ---- HERO ENTRANCE ---- */
function heroIn() {
  gsap.set('.nav-logo', { opacity: 0 });
  gsap.set('.nav-right', { opacity: 0 });
  gsap.set('.pill', { opacity: 0, x: 32 });

  gsap.to(['.nav-logo', '.nav-right'], {
    opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out'
  });
  gsap.to('.hero-title .tl span', {
    y: 0, duration: 1.05, stagger: 0.1, ease: 'power3.out', delay: 0.05
  });
  gsap.to('.hero-eyebrow span', {
    y: 0, duration: 0.75, ease: 'power3.out', delay: 0.5
  });
  gsap.set('.hero-desc', { opacity: 0, y: 16 });
  gsap.to('.hero-desc', { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out', delay: 0.65 });
  gsap.to('.pill', {
    x: 0, opacity: 1, duration: 0.55, stagger: 0.1,
    ease: 'power2.out', delay: 0.75
  });
  gsap.to('.scroll-hint', { opacity: 1, duration: 0.6, delay: 1.2 });

  initScroll();
}

/* ---- SCROLL ANIMATIONS ---- */
function initScroll() {
  gsap.set('.pcard:not(.pcard--static)', { opacity: 0, y: 40 });
  gsap.set('.pdf-strip', { opacity: 0, y: 24 });
  gsap.set('.exp-card', { opacity: 0, y: 32 });
  gsap.set('.edu-block', { opacity: 0, y: 24 });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.pcard:not(.pcard--static), .pdf-strip, .exp-card, .edu-block').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  gsap.utils.toArray('.s-title').forEach(el => {
    const spans = el.querySelectorAll('.tl span');
    gsap.to(spans, {
      y: 0, duration: 1.05, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  gsap.utils.toArray('.pcard:not(.pcard--static)').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.75, ease: 'power2.out',
      delay: i * 0.06,
      scrollTrigger: { trigger: el, start: 'top 90%' }
    });
  });

  gsap.to('.pdf-strip', {
    opacity: 1, y: 0, duration: 0.65, ease: 'power2.out',
    scrollTrigger: { trigger: '.pdf-strip', start: 'top 88%' }
  });

  gsap.utils.toArray('.exp-card').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      delay: i * 0.1,
      scrollTrigger: { trigger: el, start: 'top 90%' }
    });
  });

  gsap.utils.toArray('.edu-block').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.65, ease: 'power2.out',
      delay: i * 0.12,
      scrollTrigger: { trigger: el, start: 'top 90%' }
    });
  });

  gsap.utils.toArray('.contact-headline .tl span').forEach((el, i) => {
    gsap.fromTo(el,
      { y: '110%' },
      { y: '0%', duration: 0.9, delay: i * 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%' }
      }
    );
  });

  gsap.fromTo('.contact-footer',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: '.contact-footer', start: 'top 90%' }
    }
  );

  setTimeout(() => ScrollTrigger.refresh(), 400);
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

/* ---- NAV SCROLL STATE ---- */
const navEl = document.getElementById('nav');
let navScrolled = false;
window.addEventListener('scroll', () => {
  const shouldScroll = window.scrollY > 60;
  if (shouldScroll === navScrolled) return;
  navScrolled = shouldScroll;
  navEl.classList.toggle('scrolled', shouldScroll);
}, { passive: true });

/* ---- SMOOTH ANCHOR SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---- COPY EMAIL ---- */
const copyBtn = document.getElementById('copyEmailBtn');
if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('rohanm1307@gmail.com').then(() => {
      copyBtn.classList.add('copied');
      copyBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L11 3"/></svg>';
      setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyBtn.innerHTML = '<svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="4.5" width="7" height="7" rx="1.2"/><path d="M1.5 8.5V2.5a1 1 0 0 1 1-1h6"/></svg>';
      }, 2000);
    });
  });
}
