/* ============================================
   ZEPTIVO Digital — GSAP Animations
   ScrollTrigger reveals, counters, parallax,
   magnetic buttons
   ============================================ */

const Animations = (() => {
  function init() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    heroEntrance();
    scrollReveals();
    counterAnimation();
    parallaxEffects();
    magneticButtons();
  }

  /* ----- Hero entrance ----- */
  function heroEntrance() {
    // Split text
    const lines = document.querySelectorAll('.split-text');
    lines.forEach(line => {
      const walkNode = (node) => {
        if (node.nodeType === 3) { // Text node
          const text = node.nodeValue;
          const fragment = document.createDocumentFragment();
          for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === ' ') {
              fragment.appendChild(document.createTextNode(' '));
            } else {
              const span = document.createElement('span');
              span.className = 'char';
              span.innerText = char;
              fragment.appendChild(span);
            }
          }
          node.parentNode.replaceChild(fragment, node);
        } else {
          Array.from(node.childNodes).forEach(walkNode);
        }
      };
      Array.from(line.childNodes).forEach(walkNode);
      line.classList.add('animate');
    });

    const tl = gsap.timeline({ delay: 2.2 });
    tl.from('.hero-tag', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
      .from('.char', { opacity: 0, y: 40, duration: 0.6, stagger: 0.03, ease: 'power3.out' }, '-=0.4')
      .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.2')
      .from('.hero-actions', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.3');
  }

  /* ----- Scroll reveal ----- */
  function scrollReveals() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    reveals.forEach(el => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        onEnter: () => el.classList.add('revealed'),
        once: true
      });
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
        once: true,
        onEnter: () => {
          const suffix = counter.nextElementSibling && counter.nextElementSibling.classList.contains('suffix') 
                        ? counter.nextElementSibling.innerText 
                        : '';
          gsap.to(counter, {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            onUpdate() {
              counter.textContent = Math.round(parseFloat(counter.textContent));
            },
            onComplete() {
              counter.textContent = target; // Ensure exact final value
            }
          });
        }
      });
    });
  }

  /* ----- Parallax ----- */
  function parallaxEffects() {
    // Service icons float on scroll
    gsap.utils.toArray('.service-icon').forEach(icon => {
      gsap.to(icon, {
        y: -15,
        scrollTrigger: {
          trigger: icon,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });

    // Section headers slight parallax
    gsap.utils.toArray('.section-header').forEach(header => {
      gsap.to(header, {
        y: -30,
        scrollTrigger: {
          trigger: header,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      });
    });

    // Stats row scale in
    const statsRow = document.querySelector('.stats-row');
    if (statsRow) {
      gsap.from(statsRow, {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: statsRow,
          start: 'top 85%',
          once: true
        }
      });
    }
  }

  /* ----- Magnetic buttons ----- */
  function magneticButtons() {
    if (window.innerWidth < 769) return;
    const btns = document.querySelectorAll('.magnetic-btn');
    btns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

  return { init };
})();
