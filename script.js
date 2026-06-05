// ===========================
// PatunganPohon – script.js
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  // ----- NAVBAR SCROLL EFFECT -----
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // ----- MOBILE NAV TOGGLE -----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('mobile-open'));
  });

  // ----- SMOOTH SCROLL TO HERO CTA -----
  const heroCtaBtn = document.getElementById('heroCtaBtn');
  if (heroCtaBtn) {
    heroCtaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('donasi');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // ----- SCROLL REVEAL ANIMATION -----
  const revealElements = document.querySelectorAll(
    '.step-card, .gallery-card, .tracker-stat, .donasi-card, .section-header'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Staggered delay for sibling elements
        const siblings = Array.from(entry.target.parentElement.children)
          .filter(c => c.classList.contains('reveal'));
        const index = siblings.indexOf(entry.target);
        const delay = index * 120;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ----- ANIMATED COUNTERS FOR HERO STATS -----
  const counters = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(el) {
    const rawText = el.textContent.trim();
    // Extract numeric part
    const match = rawText.match(/[\d.,]+/);
    if (!match) return;
    const targetRaw = match[0].replace(/\./g, '').replace(',', '.');
    const target = parseFloat(targetRaw);
    if (isNaN(target)) return;

    const prefix = rawText.slice(0, rawText.indexOf(match[0]));
    const suffix = rawText.slice(rawText.indexOf(match[0]) + match[0].length);

    const duration = 1500;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(eased * target);

      let displayVal = current.toLocaleString('id-ID');
      el.textContent = prefix + displayVal + suffix;

      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = rawText; // restore original
    };

    requestAnimationFrame(update);
  }

  // ----- TRACKER COUNTER ANIMATION -----
  const trackerNums = document.querySelectorAll('.t-num');
  const trackerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        trackerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  trackerNums.forEach(el => trackerObserver.observe(el));

  // ----- SAWERIA BUTTON RIPPLE EFFECT -----
  const saweriaBtn = document.getElementById('saweriaDonateBtn');
  if (saweriaBtn) {
    saweriaBtn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255,255,255,0.3);
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
        transform: scale(0);
        animation: rippleAnim 0.6s ease-out;
        pointer-events: none;
      `;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  }

  // Add ripple keyframes dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleAnim {
      to { transform: scale(2.5); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // ----- ACTIVE NAV LINK HIGHLIGHT ON SCROLL -----
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

});
