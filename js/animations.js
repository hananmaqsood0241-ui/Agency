/* ============================================
   ZEPTIVO Digital — GSAP Animations
   ScrollTrigger reveals, counters, parallax,
   magnetic buttons
   ============================================ */

const Animations = (() => {
  function init() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    initScrollProgress();
    heroEntrance();
    scrollReveals();
    counterAnimation();
    processAnimation();
    magneticButtons();
    customCursor();
  }

  /* ----- Scroll Progress ----- */
  function initScrollProgress() {
    gsap.to('#scroll-progress', {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    });
  }

  /* ----- Hero entrance ----- */
  function heroEntrance() {
    const tl = gsap.timeline({ delay: 2.8 }); // Wait for preloader

    tl.to('.hero-title .word', {
      y: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power4.out'
    })
    .from('.hero-badge', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.8')
    .from('.hero-subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-actions', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6');
  }

  /* ----- Scroll reveal ----- */
  function scrollReveals() {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      observer.observe(el);
    });
  }

  /* ----- Counter animation ----- */
  function counterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      
      ScrollTrigger.create({
        trigger: counter,
        start: 'top 90%',
        onEnter: () => {
          let obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2.5,
            ease: 'power2.out',
            onUpdate: () => {
              counter.innerText = Math.ceil(obj.val);
            }
          });
        },
        once: true
      });
    });
  }

  /* ----- Process Animation ----- */
  function processAnimation() {
    const steps = document.querySelectorAll('.process-step');
    if (!steps.length) return;

    gsap.from(steps, {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#process',
        start: 'top 70%'
      }
    });
  }

  /* ----- Magnetic buttons ----- */
  function magneticButtons() {
    if (window.innerWidth < 1024) return;
    const btns = document.querySelectorAll('.magnetic-btn');
    btns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      });
    });
  }

  /* ----- Custom Cursor ----- */
  function customCursor() {
    if (window.innerWidth < 1024) return;
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    
    document.addEventListener('mousemove', (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 });
    });

    const links = document.querySelectorAll('a, button, .service-card, .portfolio-card');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        gsap.to(follower, { scale: 1.5, duration: 0.3 });
      });
      link.addEventListener('mouseleave', () => {
        document.body.classList.add('cursor-hover');
        gsap.to(follower, { scale: 1, duration: 0.3 });
      });
    });
  }

  return { init };
})();
