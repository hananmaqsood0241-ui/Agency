/* ============================================
   ZEPTIVO Digital — Navigation
   Navbar, mobile menu, scroll progress, cursor
   ============================================ */

const Navigation = (() => {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const progressBar = document.getElementById('scroll-progress');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta-btn)');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursorFollower');
  const spotlight = document.getElementById('heroSpotlight');

  function init() {
    setupScroll();
    setupMobile();
    setupCursor();
    setupSpotlight();
    setupSmoothScroll();
    highlightActiveLink();
  }

  /* ----- Scroll behaviour ----- */
  function setupScroll() {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  function onScroll() {
    const scrollY = window.scrollY;
    // Navbar shrink
    if (navbar) navbar.classList.toggle('scrolled', scrollY > 60);
    // Progress bar
    if (progressBar) {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (scrollY / docH * 100) + '%';
    }
    highlightActiveLink();
  }

  function highlightActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 200;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const h = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollY >= top && scrollY < top + h) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }

  /* ----- Mobile menu ----- */
  function setupMobile() {
    if (!hamburger || !mobileMenu) return;
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ----- Custom cursor ----- */
  function setupCursor() {
    if (!cursor || !cursorFollower || window.innerWidth < 769) return;
    let cx = 0, cy = 0, fx = 0, fy = 0;

    document.addEventListener('mousemove', (e) => {
      cx = e.clientX; cy = e.clientY;
      cursor.style.transform = `translate(${cx - 6}px, ${cy - 6}px)`;
    });

    (function followLoop() {
      fx += (cx - fx) * 0.12;
      fy += (cy - fy) * 0.12;
      cursorFollower.style.transform = `translate(${fx - 20}px, ${fy - 20}px)`;
      requestAnimationFrame(followLoop);
    })();

    // Hover states
    const hovers = document.querySelectorAll('a, button, .service-card, .portfolio-card, .filter-btn, input, textarea, select');
    hovers.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* ----- Spotlight ----- */
  function setupSpotlight() {
    if (!spotlight) return;
    const hero = document.getElementById('hero');
    if (!hero) return;
    hero.addEventListener('mousemove', (e) => {
      spotlight.style.left = e.clientX + 'px';
      spotlight.style.top = e.clientY + 'px';
    });
  }

  /* ----- Smooth scroll ----- */
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          const offset = navbar ? navbar.offsetHeight : 0;
          const y = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    });
  }

  return { init };
})();
