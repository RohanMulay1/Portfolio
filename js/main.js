// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const dot    = document.getElementById('cursor-dot');
let mx = 0, my = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
});

(function animateCursor() {
  cx += (mx - cx) * 0.12;
  cy += (my - cy) * 0.12;
  cursor.style.left = cx + 'px';
  cursor.style.top  = cy + 'px';
  requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button, .project-card, .exp-card, .skill-group, .about-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width       = '60px';
    cursor.style.height      = '60px';
    cursor.style.borderColor = 'var(--accent)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width       = '40px';
    cursor.style.height      = '40px';
    cursor.style.borderColor = 'var(--accent2)';
  });
});

// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== TYPING EFFECT =====
const roles = [
  'AI/ML Engineer',
  'Full-Stack Developer',
  'Computer Vision Engineer',
  'LLM & GenAI Builder',
  'Edge AI Specialist',
];
let ri = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const word = roles[ri];
  if (!deleting) {
    typedEl.textContent = word.slice(0, ci + 1);
    ci++;
    if (ci === word.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = word.slice(0, ci - 1);
    ci--;
    if (ci === 0) {
      deleting = false;
      ri = (ri + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 55 : 90);
}
setTimeout(type, 1600);

// ===== TECH STACK MARQUEE =====
const stackRow1 = [
  { icon: 'devicon-python-plain colored',        label: 'Python',      url: 'https://www.python.org' },
  { icon: 'devicon-cplusplus-plain colored',     label: 'C++',         url: 'https://isocpp.org' },
  { icon: 'devicon-javascript-plain colored',    label: 'JavaScript',  url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { icon: 'devicon-java-plain colored',          label: 'Java',        url: 'https://www.java.com' },
  { icon: 'devicon-pytorch-plain colored',       label: 'PyTorch',     url: 'https://pytorch.org' },
  { icon: 'devicon-tensorflow-original colored', label: 'TensorFlow',  url: 'https://www.tensorflow.org' },
  { icon: 'devicon-fastapi-plain colored',       label: 'FastAPI',     url: 'https://fastapi.tiangolo.com' },
  { icon: 'devicon-nodejs-plain colored',        label: 'Node.js',     url: 'https://nodejs.org' },
  { icon: 'devicon-docker-plain colored',        label: 'Docker',      url: 'https://www.docker.com' },
  { icon: 'devicon-git-plain colored',           label: 'Git',         url: 'https://git-scm.com' },
  { icon: 'devicon-linux-plain',                 label: 'Linux',       url: 'https://www.linux.org' },
];
const stackRow2 = [
  { icon: 'devicon-postgresql-plain colored',    label: 'PostgreSQL',  url: 'https://www.postgresql.org' },
  { icon: 'devicon-opencv-plain colored',        label: 'OpenCV',      url: 'https://opencv.org' },
  { icon: 'devicon-html5-plain colored',         label: 'HTML5',       url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { icon: 'devicon-css3-plain colored',          label: 'CSS3',        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { icon: 'devicon-mongodb-plain colored',       label: 'MongoDB',     url: 'https://www.mongodb.com' },
  { icon: 'devicon-sqlite-plain colored',        label: 'SQL',         url: 'https://www.sqlite.org' },
  { icon: 'devicon-vscode-plain colored',        label: 'VS Code',     url: 'https://code.visualstudio.com' },
  { icon: 'devicon-jupyter-plain colored',       label: 'Jupyter',     url: 'https://jupyter.org' },
  { icon: 'devicon-anaconda-original colored',   label: 'Conda',       url: 'https://anaconda.org' },
  { plain: true, bg: '#76b900', text: 'NV',      label: 'CUDA',        url: 'https://developer.nvidia.com/cuda-zone' },
  { plain: true, bg: '#6236ff', text: 'LLM',     label: 'LangChain',   url: 'https://www.langchain.com' },
  { plain: true, bg: '#ff6b00', text: 'HF',      label: 'HuggingFace', url: 'https://huggingface.co' },
];

function buildRow(items, rowId) {
  const row = document.getElementById(rowId);
  [...items, ...items].forEach(item => {         // double for seamless loop
    const div = document.createElement('div');
    div.className = 'tech-item';
    div.innerHTML = item.plain
      ? `<div class="tech-icon-plain" style="background:${item.bg}">${item.text}</div><span>${item.label}</span>`
      : `<i class="${item.icon}"></i><span>${item.label}</span>`;

    div.addEventListener('click', e => {
      // ripple
      const rect   = div.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');
      ripple.className  = 'ripple';
      ripple.style.cssText =
        `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px`;
      div.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());

      // pop glow then open link
      div.classList.add('popped');
      setTimeout(() => {
        div.classList.remove('popped');
        if (item.url) window.open(item.url, '_blank', 'noopener');
      }, 300);
    });

    row.appendChild(div);
  });
}

buildRow(stackRow1, 'row1');
buildRow(stackRow2, 'row2');

// ===== SCROLL FADE-IN =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
