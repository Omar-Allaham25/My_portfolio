/* ========================================
   OMAR ALLAHAM PORTFOLIO v2
   Interactive Scripts — Static HTML Version
   ======================================== */

(function() {
  'use strict';

  // ========================================
  // UNIVERSE CANVAS - Particle Constellation
  // ========================================
  const canvas = document.getElementById('universe-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null };
  let animationId;
  let isActive = true;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.color = this.getRandomColor();
    }
    getRandomColor() {
      const colors = ['#00d4ff', '#a855f7', '#ec4899', '#f59e0b'];
      return colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (mouse.x != null && mouse.y != null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          this.x -= dx * force * 0.02;
          this.y -= dy * force * 0.02;
        }
      }
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function initParticles() {
    particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth * 0.08), 120);
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());
  }

  function drawConnections() {
    const maxDistance = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.15;
          ctx.beginPath();
          ctx.strokeStyle = '#00d4ff';
          ctx.globalAlpha = opacity;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
  }

  function animate() {
    if (!isActive) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    animationId = requestAnimationFrame(animate);
  }

  resizeCanvas();
  initParticles();
  animate();

  window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
  window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });
  window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { isActive = false; cancelAnimationFrame(animationId); }
    else { isActive = true; animate(); }
  });

  // ========================================
  // TYPING EFFECT
  // ========================================
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const phrases = ['Full-Stack Developer', 'Open Source Contributor', 'Problem Solver', 'Software Engineer'];
    let phraseIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 100;
    function type() {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }
      if (!isDeleting && charIndex === currentPhrase.length) { typingSpeed = 2000; isDeleting = true; }
      else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; typingSpeed = 500; }
      setTimeout(type, typingSpeed);
    }
    setTimeout(type, 1000);
  }

  // ========================================
  // NAVIGATION
  // ========================================
  const nav = document.getElementById('main-nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // ========================================
  // SCROLL PROGRESS
  // ========================================
  const scrollProgress = document.getElementById('scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.style.width = (scrollTop / docHeight * 100) + '%';
    });
  }

  // ========================================
  // SCROLL ANIMATIONS (Intersection Observer)
  // ========================================
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Animate skill nodes
        if (entry.target.classList.contains('skill-category')) {
          const nodes = entry.target.querySelectorAll('.skill-node');
          nodes.forEach((node, i) => {
            node.style.opacity = '0';
            node.style.transform = 'translateY(20px)';
            setTimeout(() => {
              node.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
              requestAnimationFrame(() => {
                node.style.opacity = '1';
                node.style.transform = 'translateY(0)';
              });
            }, i * 100);
          });
        }

        // Animate stat counters
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
          const target = parseInt(stat.dataset.target);
          if (target) animateCounter(stat, target);
        });

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-animate], .hero-stats, .about-block, .credential-card, .timeline-item, .project-showcase, .skills-intro, .skills-practice, .social-section, .contact-terminal, .contact-form-wrapper').forEach(el => {
    observer.observe(el);
  });

  function animateCounter(element, target) {
    const duration = 2000;
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * target);
      element.textContent = current.toLocaleString() + (target >= 1000 ? '+' : '');
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ========================================
  // SKILL NODES - Level Bars
  // ========================================
  document.querySelectorAll('.skill-node').forEach(node => {
    const level = node.dataset.level;
    if (level && level > 0) {
      setTimeout(() => { node.style.setProperty('--level', level + '%'); }, 300);
    }
  });

  // ========================================
  // PROJECT FILTERING
  // ========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectShowcases = document.querySelectorAll('.project-showcase');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      projectShowcases.forEach(project => {
        const category = project.dataset.category;
        if (filter === 'all' || category === filter) {
          project.style.display = 'grid';
          project.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          project.style.display = 'none';
        }
      });
    });
  });

  // ========================================
  // CONTACT FORM
  // ========================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      // If using Formspree, let it submit normally
      // Otherwise show a demo message
      const action = contactForm.getAttribute('action');
      if (!action || action.includes('YOUR_FORM_ID')) {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Configure Formspree to enable sending!</span>';
        btn.style.background = 'var(--accent-amber)';
        setTimeout(() => { btn.innerHTML = originalText; btn.style.background = ''; }, 3000);
      }
    });
  }

  // ========================================
  // PARALLAX EFFECT ON HERO
  // ========================================
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroContent = heroSection.querySelector('.hero-content');
      const heroVisual = heroSection.querySelector('.hero-visual');
      if (scrolled < window.innerHeight) {
        if (heroContent) {
          heroContent.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
          heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
        if (heroVisual) heroVisual.style.transform = 'translateY(' + (scrolled * 0.15) + 'px)';
      }
    });
  }

  // ========================================
  // 3D TILT EFFECT ON CARDS
  // ========================================
  document.querySelectorAll('.project-card-inner, .credential-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ========================================
  // MAGNETIC BUTTON EFFECT
  // ========================================
  document.querySelectorAll('.btn-primary, .social-link').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = 'translate(' + (x * 0.2) + 'px, ' + (y * 0.2) + 'px)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  // ========================================
  // GLITCH EFFECT ON PHOTO
  // ========================================
  const photoGlitch = document.querySelector('.photo-glitch');
  if (photoGlitch) {
    setInterval(() => {
      photoGlitch.style.animation = 'none';
      setTimeout(() => { photoGlitch.style.animation = 'glitch 5s ease-in-out infinite'; }, 10);
    }, 8000);
  }

  // ========================================
  // PAGE LOAD FADE-IN
  // ========================================
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => { document.body.style.opacity = '1'; });
  });

})();
