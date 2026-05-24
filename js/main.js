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

/* ---- CURSOR ---- */
if (window.matchMedia('(pointer: fine)').matches) {
  const cursorEl = document.getElementById('cursor');

  document.addEventListener('mousemove', e => {
    cursorEl.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursorEl.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => { cursorEl.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursorEl.style.opacity = '1'; });

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('is-hovering');
      const t = document.getElementById('cursorLabelText');
      if (t && el.dataset.cursor === 'hi') {
        t.style.opacity = '0';
        setTimeout(() => { t.textContent = 'Say hi!'; t.style.opacity = '1'; }, 120);
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
  gsap.set('.pill', { opacity: 0, x: 24 });

  gsap.to(['.nav-logo', '.nav-right'], { opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out' });
  gsap.to('.hero-title .tl span', { y: 0, duration: 1.05, stagger: 0.1, ease: 'power3.out', delay: 0.05 });
  gsap.to('.hero-eyebrow span', { y: 0, duration: 0.75, ease: 'power3.out', delay: 0.5 });
  gsap.set('.hero-desc', { opacity: 0, y: 14 });
  gsap.to('.hero-desc', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.6 });
  gsap.to('.pill', { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.7 });
  gsap.to('.scroll-hint', { opacity: 1, duration: 0.6, delay: 1.1 });

  initScroll();
}

/* ---- SCROLL ANIMATIONS ---- */
function initScroll() {
  gsap.set('.pcard', { opacity: 0, y: 28 });
  gsap.set('.tl-item', { opacity: 0, y: 20 });
  gsap.set('.aside-block', { opacity: 0, y: 16 });
  gsap.set('.pdf-strip', { opacity: 0, y: 16 });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.pcard, .tl-item, .aside-block, .pdf-strip').forEach(el => {
      el.style.opacity = '1'; el.style.transform = 'none';
    });
    return;
  }

  /* Section titles */
  gsap.utils.toArray('.s-title').forEach(el => {
    gsap.to(el.querySelectorAll('.tl span'), {
      y: 0, duration: 1, stagger: 0.07, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  /* Project cards — stagger by row */
  gsap.utils.toArray('.pcard').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      delay: (i % 2) * 0.08,
      scrollTrigger: { trigger: el, start: 'top 92%' }
    });
  });

  /* Resume strip */
  gsap.to('.pdf-strip', {
    opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
    scrollTrigger: { trigger: '.pdf-strip', start: 'top 90%' }
  });

  /* Timeline items */
  gsap.utils.toArray('.tl-item').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.55, ease: 'power2.out',
      delay: i * 0.07,
      scrollTrigger: { trigger: el, start: 'top 92%' }
    });
  });

  /* Aside blocks */
  gsap.utils.toArray('.aside-block').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.55, ease: 'power2.out',
      delay: i * 0.1,
      scrollTrigger: { trigger: el, start: 'top 92%' }
    });
  });

  /* Contact headline */
  gsap.utils.toArray('.contact-headline .tl span').forEach((el, i) => {
    gsap.fromTo(el,
      { y: '110%' },
      { y: '0%', duration: 0.9, delay: i * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%' }
      }
    );
  });

  gsap.fromTo('.contact-footer',
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out',
      scrollTrigger: { trigger: '.contact-footer', start: 'top 92%' }
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
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
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
